<template>
  <div
    class="ui-table-wrapper"
    :class="[
      bordered && 'bordered',
      striped && 'striped',
      hover && 'hover',
      size,
      layout,
      scrollable && 'scrollable',
      isDragging && 'dragging',
      editable && 'editable'
    ]"
    :style="scrollable ? { maxHeight: maxHeight } : {}"
  >
    <div class="section-header flex items-center justify-between">
      <div class="flex items-center gap-10">
        <h2 class="heading-4">{{ title }}</h2>
        <div v-if="gradeRangeControls" class="grade-range-controls flex items-center gap-5 mr-5">
          <div>
            <UiCheckbox label="구간대 설정"></UiCheckbox>
          </div>
        </div>
      </div>
      <div v-if="editable" class="table-actions">
        <div class="button-group flex items-center gap-5">
          <UiButton
            v-if="canAddRow"
            type="button"
            variant="secondary-line"
            icon-only
            @click="addRow"
            title="행 추가"
          >
            <i class="icon-md icon-plus"></i>
          </UiButton>
          <UiButton
            type="button"
            variant="secondary-line"
            icon-only
            @click="deleteSelectedRows"
            :disabled="selectedRows.length === 0"
            title="선택한 행 삭제"
          >
            <i class="icon-md icon-delete"></i>
          </UiButton>
          <UiButton
            type="button"
            variant="secondary-line"
            icon-only
            @click="toggleSortable"
            :class="{ active: sortable }"
            title="정렬 모드"
          >
            <i class="icon-md icon-sort"></i>
          </UiButton>
          <UiButton type="button" variant="primary" @click="saveChanges">저장</UiButton>
        </div>
      </div>
      <div v-if="excelControls" class="excel-controls flex items-center gap-5 mr-5">
        <UiButton variant="secondary-line" size="medium">
          <i class="icon-md icon-excel"></i>
          엑셀 다운로드
        </UiButton>
        <UiButton variant="secondary-line" size="medium">
          <i class="icon-md icon-excel"></i>
          엑셀 업로드
        </UiButton>
      </div>
    </div>

    <div v-if="sortable && editable" class="sort-mode-message">
      행을 드래그하여 순서를 변경할 수 있습니다. 완료 후 정렬 버튼을 다시 클릭하세요.
    </div>

    <table class="ui-table" :class="{ 'th-left': isThLeft }">
      <colgroup v-if="$slots.colgroup">
        <slot name="colgroup"></slot>
      </colgroup>
      <thead
        v-if="$slots.header && layout !== 'horizontal'"
        :class="{ 'sticky-header': scrollable }"
      >
        <slot
          name="header"
          :select-all="selectAll"
          :is-all-selected="isAllSelected"
          :editable="editable"
          :sortable="sortable"
        ></slot>
      </thead>
      <tbody v-if="$slots.body">
        <slot
          name="body"
          :rows="modelValue"
          :selected-rows="selectedRows"
          :toggle-row-selection="toggleRowSelection"
          :is-row-selected="isRowSelected"
          :handle-drag-start="handleDragStart"
          :handle-drag-over="handleDragOver"
          :handle-drop="handleDrop"
          :handle-drag-end="handleDragEnd"
          :sortable="sortable"
          :editable="editable"
        ></slot>
      </tbody>
      <tfoot v-if="$slots.footer">
        <slot name="footer"></slot>
      </tfoot>
    </table>
  </div>
</template>

<script setup>
  import { ref, computed, watch } from 'vue'

  const emit = defineEmits([
    'update:modelValue',
    'save',
    'row-added',
    'row-deleted',
    'order-changed'
  ])

  const props = defineProps({
    /**
     * 테이블 테두리 표시 여부
     */
    bordered: {
      type: Boolean,
      default: false
    },
    /**
     * 테이블 줄무늬 표시 여부
     */
    striped: {
      type: Boolean,
      default: false
    },
    /**
     * 테이블 행 호버 효과 적용 여부
     */
    hover: {
      type: Boolean,
      default: false
    },
    /**
     * 테이블 크기 (small, medium, large)
     */
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    /**
     * 테이블 레이아웃 (vertical, horizontal)
     * vertical: 기본 테이블 형태 (th가 위, td가 아래)
     * horizontal: th와 td가 좌우로 배치되는 형태 (th가 좌측, td가 우측)
     */
    layout: {
      type: String,
      default: 'vertical',
      validator: value => ['vertical', 'horizontal'].includes(value)
    },
    isThLeft: {
      type: Boolean,
      default: false
    },
    /**
     * 스크롤 가능 여부
     */
    scrollable: {
      type: Boolean,
      default: false
    },
    /**
     * 테이블 최대 높이 (스크롤 가능할 때만 적용)
     */
    maxHeight: {
      type: String,
      default: '400px'
    },
    /**
     * 테이블 데이터 (v-model로 바인딩)
     */
    modelValue: {
      type: Array,
      default: () => []
    },
    /**
     * 테이블 편집 가능 여부
     */
    editable: {
      type: Boolean,
      default: false
    },

    /**
     * 엑셀 컨트롤
     */
    excelControls: {
      type: Boolean,
      default: false
    },

    /**
     * 새 행 추가 시 기본 행 데이터
     */
    defaultRowData: {
      type: Object,
      default: () => ({})
    },
    /**
     * 정렬 옵션 활성화 여부
     */
    sortableOption: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    /**
     * 행 추가 버튼 표시 여부
     */
    canAddRow: {
      type: Boolean,
      default: true
    },

    gradeRangeControls: {
      type: Boolean,
      default: false
    }
  })

  // 선택된 행 관리
  const selectedRows = ref([])

  // 정렬 모드 상태
  const sortable = ref(props.sortableOption)
  const isDragging = ref(false)

  // 드래그 앤 드롭 관련 상태
  const draggedRowIndex = ref(null)

  // 모든 행이 선택되었는지 확인
  const isAllSelected = computed(() => {
    return props.modelValue.length > 0 && selectedRows.value.length === props.modelValue.length
  })

  /**
   * 모든 행 선택/해제
   */
  const selectAll = () => {
    if (isAllSelected.value) {
      selectedRows.value = []
    } else {
      selectedRows.value = [...props.modelValue]
    }
  }

  /**
   * 특정 행 선택/해제
   * @param {Object} row - 선택/해제할 행 데이터
   */
  const toggleRowSelection = row => {
    if (sortable.value) return

    const index = selectedRows.value.findIndex(item => item === row)
    if (index === -1) {
      selectedRows.value.push(row)
    } else {
      selectedRows.value.splice(index, 1)
    }
  }

  /**
   * 행이 선택되었는지 확인
   * @param {Object} row - 확인할 행 데이터
   * @returns {Boolean} 선택 여부
   */
  const isRowSelected = row => {
    return selectedRows.value.includes(row)
  }

  /**
   * 새 행 추가
   */
  const addRow = () => {
    // 고유 ID 생성 (실제 구현에서는 더 강력한 방법이 필요할 수 있음)
    const newId = Date.now()
    const newRow = {
      id: newId,
      ...props.defaultRowData
    }

    const updatedRows = [...props.modelValue, newRow]
    emit('update:modelValue', updatedRows)
    emit('row-added', newRow)
  }

  /**
   * 선택된 행 삭제
   */
  const deleteSelectedRows = () => {
    if (selectedRows.value.length === 0) return

    const deletedRows = [...selectedRows.value]
    const updatedRows = props.modelValue.filter(row => !selectedRows.value.includes(row))
    emit('update:modelValue', updatedRows)
    selectedRows.value = []
    emit('row-deleted', deletedRows)
  }

  /**
   * 정렬 모드 토글
   */
  const toggleSortable = () => {
    sortable.value = !sortable.value
    // 정렬 모드 비활성화 시 선택된 행 초기화
    if (!sortable.value) {
      selectedRows.value = []
    }
  }

  /**
   * 드래그 시작 핸들러
   * @param {Event} event - 드래그 이벤트
   * @param {Number} index - 드래그 시작한 행의 인덱스
   */
  const handleDragStart = (event, index) => {
    if (!sortable.value) return

    draggedRowIndex.value = index
    isDragging.value = true
    event.dataTransfer.effectAllowed = 'move'

    // 드래그 중인 요소의 고스트 이미지 설정
    try {
      const dragRow = event.target.closest('tr')
      if (dragRow) {
        event.dataTransfer.setDragImage(dragRow, 0, 0)
      }
    } catch (e) {
      // 브라우저가 지원하지 않는 경우 무시
      console.warn('Drag image not supported in this browser', e)
    }
  }

  /**
   * 드래그 오버 핸들러
   * @param {Event} event - 드래그 오버 이벤트
   */
  const handleDragOver = event => {
    if (!sortable.value) return

    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  /**
   * 드롭 핸들러
   * @param {Event} event - 드롭 이벤트
   * @param {Number} index - 드롭된 위치의 인덱스
   */
  const handleDrop = (event, index) => {
    if (!sortable.value || draggedRowIndex.value === null) return

    event.preventDefault()

    if (draggedRowIndex.value !== index) {
      const updatedRows = [...props.modelValue]
      const [movedRow] = updatedRows.splice(draggedRowIndex.value, 1)
      updatedRows.splice(index, 0, movedRow)
      emit('update:modelValue', updatedRows)
      emit('order-changed', {
        from: draggedRowIndex.value,
        to: index,
        rows: updatedRows
      })
    }

    draggedRowIndex.value = null
    isDragging.value = false
  }

  /**
   * 드래그 종료 핸들러
   */
  const handleDragEnd = () => {
    draggedRowIndex.value = null
    isDragging.value = false
  }

  /**
   * 변경사항 저장
   */
  const saveChanges = () => {
    emit('save', props.modelValue)
    sortable.value = false
  }

  // 모델 값이 변경될 때 선택된 행 초기화
  watch(
    () => props.modelValue,
    () => {
      // 이미 선택된 행 중 modelValue에 없는 행 제거
      selectedRows.value = selectedRows.value.filter(selected =>
        props.modelValue.some(row => row === selected)
      )
    }
  )

  // 편집 가능 상태가 변경될 때 정렬 모드 초기화
  watch(
    () => props.editable,
    newValue => {
      if (!newValue) {
        sortable.value = false
      }
    }
  )
</script>

<style lang="scss">
  @use 'sass:color';
  .ui-table-wrapper {
    position: relative;
    width: 100%;
    overflow-x: auto;
    transition: all 0.2s ease;

    .ui-table {
      border-top: 1px solid #6d7882;
    }

    &.scrollable {
      overflow-y: auto;
      position: relative;

      .sticky-header {
        position: sticky;
        top: 0;
        z-index: 1;
        background-color: #fff;
      }
    }

    &.bordered {
      .ui-table {
        border: 1px solid #e2e8f0;

        th,
        td {
          border: 1px solid #e2e8f0;
        }
      }
    }

    &.striped {
      .ui-table {
        tbody tr:nth-child(odd) {
          background-color: rgba(248, 250, 252, 0.7);
        }
      }
    }

    &.hover {
      .ui-table {
        tbody tr {
          transition: background-color 0.15s ease;
          &:hover {
            background-color: rgba(241, 245, 249, 0.8);
          }
        }
      }
    }

    &.small {
      .ui-table {
        font-size: 0.875rem;

        th,
        td {
          padding: 0.5rem 0.75rem;
        }
      }
    }

    &.medium {
      .ui-table {
        font-size: 1rem;

        th {
          padding: 10px 10px;
        }
        td {
          padding: 7px 10px;
        }
      }
    }

    &.large {
      .ui-table {
        font-size: 1.125rem;

        th,
        td {
          padding: 1rem 1.25rem;
        }
      }
    }

    &.horizontal {
      .ui-table {
        th {
          width: 21.5%;
          text-align: left;
          border-right: 2px solid #e2e8f0;
          border-bottom: 1px solid #e2e8f0;
          position: relative;
          white-space: nowrap;
        }

        td {
          width: 78.5%;
        }

        tr:last-child th {
          border-bottom: none;
        }

        thead {
          display: none;
        }
      }
    }

    &.editable {
      .ui-table {
        tbody tr {
          &.selected {
            background-color: rgba(203, 213, 225, 0.3);

            &:hover {
              background-color: rgba(203, 213, 225, 0.4);
            }
          }
        }
      }
    }

    &.dragging {
      .ui-table tbody tr {
        transition: transform 0.2s ease;
      }
    }
  }

  .ui-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    tr {
      &:hover {
        background-color: rgba(#718096, 0.05);
      }

      &.sortable-row {
        &:hover {
          background-color: rgba(241, 245, 249, 0.8);
        }

        &.dragging {
          opacity: 0.5;
          background-color: #e2e8f0;
        }

        .drag-handle {
          display: inline-block;
          width: 20px;
          height: 20px;
        }
      }
    }

    th,
    td {
      text-align: left;
      vertical-align: middle;
      line-height: 1.5;
    }

    th {
      font-weight: 600;
      background-color: #f8fafc;
      border-bottom: 2px solid #e2e8f0;
      position: sticky;
      top: 0;
      z-index: 1;
      white-space: nowrap;
      font-size: 1rem;
      padding: 0.75rem 1rem;
      text-align: center;
    }

    td {
      border-bottom: 1px solid #e2e8f0;
      &.text-center {
        text-align: center;
      }
    }

    tbody tr:last-child td {
      border-bottom: none;
    }

    thead tr:first-child th:first-child {
      border-top-left-radius: 6px;
    }

    thead tr:first-child th:last-child {
      border-top-right-radius: 6px;
    }

    &.th-left {
      th {
        text-align: left;
      }
    }

    .row-checkbox {
      width: 40px;
      text-align: center;
    }
  }

  .table-actions {
    display: flex;
    justify-content: flex-end;

    .button-group {
      .active {
        background-color: #e2e8f0;
        color: #1a202c;
      }
    }
  }

  .sort-mode-message {
    background-color: #ebf8ff;
    color: #2b6cb0;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    font-size: 0.875rem;
  }
  .textUnderLine {
    text-decoration: underline;
    text-underline-offset: 2px;
    cursor: pointer;
    color: $primary-color;
  }
</style>
