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
      editable && 'editable',
      alignTop && 'align-top',
      rowClickCursor && 'row-clickable' // 새로 추가
    ]"
    :style="scrollable ? { maxHeight: maxHeight } : {}"
  >
    <!-- 헤더 섹션 -->
    <div class="section-header" :class="fixHeader && 'sticky-header-btn'">
      <div class="flex items-center justify-between gap-5">
        <div class="flex items-center gap-10">
          <div class="flex items-center gap-10">
            <h2 class="heading-4">{{ title }}</h2>
            <slot name="header-action-left"></slot>
          </div>
          <div v-if="gradeRangeControls" class="grade-range-controls flex items-center gap-5 mr-5">
            <div>
              <UiCheckbox label="구간대 설정"></UiCheckbox>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-5">
          <slot name="header-action-right"></slot>
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
                <i class="icon-md icon-plus icon-black"></i>
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
                v-if="canAddSortableButton"
                type="button"
                variant="secondary-line"
                icon-only
                @click="toggleSortable"
                :class="{ active: sortable }"
                title="정렬 모드"
              >
                <i class="icon-md icon-sort"></i>
              </UiButton>
              <slot name="action-button" v-if="canSave">
                <UiButton type="button" variant="primary" @click="saveChanges">저장</UiButton>
              </slot>
            </div>
          </div>
        </div>
        <!-- 편집 가능한 테이블 액션 버튼들 -->
        <!-- 엑셀 컨트롤 버튼들 -->
        <div v-if="excelControls" class="excel-controls flex items-center gap-5 mr-5">
          <UiButton variant="secondary-line" size="medium">
            <i class="icon-md icon-excel"></i>
            {{ excelDownloadLabel }}
          </UiButton>
          <UiButton variant="secondary-line" size="medium">
            <i class="icon-md icon-excel"></i>
            {{ excelUploadLabel }}
          </UiButton>
        </div>
      </div>
    </div>

    <!-- 정렬 모드 안내 메시지 -->
    <div v-if="sortable && editable" class="sort-mode-message">
      행을 드래그하여 순서를 변경할 수 있습니다. <br />완료 후 정렬 버튼을 다시 클릭하세요.
    </div>

    <!-- 빈 상태 표시 -->
    <div v-if="isEmpty" class="empty-state">
      <slot name="empty" :add-row="addRow" :editable="editable">
        <div class="empty-content">
          <!-- 메인 아이콘 -->
          <div class="empty-icon">
            <i class="icon-xxl icon-table"></i>
            <!-- 또는 다른 아이콘들 -->
            <!-- <i class="icon-xxl icon-file-text"></i> -->
            <!-- <i class="icon-xxl icon-database"></i> -->
            <!-- <i class="icon-xxl icon-grid"></i> -->
          </div>

          <h3 class="empty-title">{{ emptyTitle }}</h3>
          <p class="empty-description">{{ emptyDescription }}</p>

          <div v-if="editable && canAddRow" class="empty-actions">
            <UiButton variant="primary" @click="addRow">
              <i class="icon-sm icon-plus"></i>
              첫 번째 항목 추가
            </UiButton>
          </div>
        </div>
      </slot>
    </div>

    <!-- 스크롤 가능한 테이블 -->
    <div v-else-if="scrollable" class="table-scroll-container">
      <table class="ui-table" :class="{ 'th-left': isThLeft }">
        <colgroup v-if="$slots.colgroup">
          <slot name="colgroup"></slot>
        </colgroup>
        <thead v-if="$slots.header && layout !== 'horizontal'" class="sticky-header">
          <slot
            name="header"
            :select-all="selectAll"
            :is-all-selected="isAllSelected"
            :editable="editable"
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
            :handle-row-click="handleRowClick"
            :sortable="sortable"
            :editable="editable"
          ></slot>
        </tbody>
        <tfoot v-if="$slots.footer">
          <slot name="footer"></slot>
        </tfoot>
      </table>
    </div>

    <!-- 일반 테이블 -->
    <table v-else-if="!isEmpty" class="ui-table" :class="{ 'th-left': isThLeft }">
      <colgroup v-if="$slots.colgroup">
        <slot name="colgroup"></slot>
      </colgroup>
      <thead v-if="$slots.header && layout !== 'horizontal'" class="sticky-header">
        <slot
          name="header"
          :select-all="selectAll"
          :is-all-selected="isAllSelected"
          :editable="editable"
        ></slot>
      </thead>
      <thead v-if="layout === 'horizontal'">
        <slot name="header"></slot>
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
    'row-click',
    'order-changed'
  ])

  const props = defineProps({
    title: {
      type: String,
      default: ''
    },
    bordered: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: true
    },
    hover: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    layout: {
      type: String,
      default: 'vertical',
      validator: value => ['vertical', 'horizontal'].includes(value)
    },
    isThLeft: {
      type: Boolean,
      default: false
    },
    alignTop: {
      type: Boolean,
      default: false
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: String,
      default: '400px'
    },
    fixHeader: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    editable: {
      type: Boolean,
      default: false
    },
    excelControls: {
      type: Boolean,
      default: false
    },
    excelDownloadLabel: {
      type: String,
      default: '엑셀 다운로드'
    },
    excelUploadLabel: {
      type: String,
      default: '엑셀 업로드'
    },
    defaultRowData: {
      type: Object,
      default: () => ({})
    },
    sortableOption: {
      type: Boolean,
      default: false
    },
    canAddRow: {
      type: Boolean,
      default: true
    },
    canSave: {
      type: Boolean,
      default: true
    },
    canAddSortableButton: {
      type: Boolean,
      default: true
    },
    gradeRangeControls: {
      type: Boolean,
      default: false
    },
    emptyTitle: {
      type: String,
      default: '데이터가 없습니다'
    },
    emptyDescription: {
      type: String,
      default: '표시할 항목이 없습니다.'
    },
    forceEmpty: {
      type: Boolean,
      default: false
    },
    rowClickable: {
      type: Boolean,
      default: false
    },
    // 새로 추가할 prop
    rowClickCursor: {
      type: Boolean,
      default: false
    }
  })

  // 상태 관리
  const selectedRows = ref([])
  const sortable = ref(props.sortableOption)
  const isDragging = ref(false)
  const draggedRowIndex = ref(null)

  // 계산된 속성
  const isEmpty = computed(() => {
    return props.forceEmpty || !props.modelValue || props.modelValue.length === 0
  })

  const isAllSelected = computed(() => {
    return props.modelValue.length > 0 && selectedRows.value.length === props.modelValue.length
  })

  // 행 선택 관련 함수들
  const selectAll = () => {
    if (isAllSelected.value) {
      selectedRows.value = []
    } else {
      selectedRows.value = [...props.modelValue]
    }
  }

  const toggleRowSelection = row => {
    if (sortable.value) return

    const index = selectedRows.value.findIndex(item => item === row)
    if (index === -1) {
      selectedRows.value.push(row)
    } else {
      selectedRows.value.splice(index, 1)
    }
  }

  const isRowSelected = row => {
    return selectedRows.value.includes(row)
  }

  // 행 추가/삭제 함수들
  const createDefaultRow = () => {
    const generateId = () => {
      return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }

    return {
      id: generateId(),
      ...props.defaultRowData
    }
  }

  const addRow = () => {
    const newRow = createDefaultRow()
    const updatedRows = [...props.modelValue, newRow]
    emit('update:modelValue', updatedRows)
    emit('row-added', newRow)
  }

  const deleteSelectedRows = () => {
    if (selectedRows.value.length === 0) return

    const deletedRows = [...selectedRows.value]
    const updatedRows = props.modelValue.filter(row => !selectedRows.value.includes(row))
    emit('update:modelValue', updatedRows)
    selectedRows.value = []
    emit('row-deleted', deletedRows)
  }

  // 정렬 관련 함수들
  const toggleSortable = () => {
    sortable.value = !sortable.value
    if (!sortable.value) {
      selectedRows.value = []
    }
  }

  // 드래그 앤 드롭 핸들러들
  const handleDragStart = (event, index) => {
    if (!sortable.value) return

    draggedRowIndex.value = index
    isDragging.value = true
    event.dataTransfer.effectAllowed = 'move'

    try {
      const dragRow = event.target.closest('tr')
      if (dragRow) {
        event.dataTransfer.setDragImage(dragRow, 0, 0)
      }
    } catch (e) {
      console.warn('Drag image not supported in this browser', e)
    }
  }

  const handleDragOver = event => {
    if (!sortable.value) return

    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (event, targetIndex) => {
    if (!sortable.value || draggedRowIndex.value === null) return
    event.preventDefault()

    if (draggedRowIndex.value !== targetIndex) {
      const updatedRows = [...props.modelValue]
      const draggedItem = updatedRows[draggedRowIndex.value]

      updatedRows.splice(draggedRowIndex.value, 1)
      updatedRows.splice(targetIndex, 0, draggedItem)

      emit('update:modelValue', updatedRows)
      emit('order-changed', {
        from: draggedRowIndex.value,
        to: targetIndex,
        rows: updatedRows
      })
    }

    draggedRowIndex.value = null
    isDragging.value = false
  }

  const handleDragEnd = () => {
    draggedRowIndex.value = null
    isDragging.value = false
  }

  // 행 클릭 핸들러
  const handleRowClick = (row, index, event) => {
    if (!props.rowClickable) return

    // 체크박스나 버튼 클릭 시에는 행 클릭 이벤트 무시
    if (
      event.target.closest('.ui-checkbox') ||
      event.target.closest('button') ||
      event.target.closest('.drag-handle')
    ) {
      return
    }

    emit('row-click', { row, index, event })
  }

  // 저장 함수
  const saveChanges = () => {
    emit('save', props.modelValue)
    sortable.value = false
  }

  // 감시자들
  watch(
    () => props.modelValue,
    () => {
      selectedRows.value = selectedRows.value.filter(selected =>
        props.modelValue.some(row => row === selected)
      )
    }
  )

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
  .ui-table-wrapper {
    position: relative;
    overflow: hidden;
    width: 100%;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
    &.dragging {
      .ui-table {
        tbody tr {
          transition: all 0.3s ease;
          position: relative;

          // 드래그 가능한 행 기본 스타일 강화
          &[draggable='true'] {
            cursor: grab;
            border: 2px solid transparent;
            border-radius: 4px;

            // 드래그 가능한 행에 미묘한 배경색
            background-color: rgba(59, 130, 246, 0.02);

            &:hover:not(.dragging-source):not(.drag-over) {
              background-color: #f1f5f9 !important;
              border-left: 5px solid #3b82f6;
              transform: translateX(3px);
              box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
              transition: all 0.2s ease;
            }

            &:active {
              cursor: grabbing;
            }
          }

          // 드래그 중인 행 스타일 더 강화
          &.dragging-source {
            opacity: 0.8;
            background: linear-gradient(135deg, #3b82f6, #1e40af) !important;
            color: white;
            transform: scale(1.05) rotate(2deg);
            box-shadow: 0 12px 35px rgba(59, 130, 246, 0.4);
            z-index: 1000;
            border: 3px solid #1e40af;
            border-radius: 8px;

            td {
              border-color: #1e40af;
              color: white;
              font-weight: 500;
            }

            // 드래그 중인 행에 펄스 효과
            &::after {
              content: '';
              position: absolute;
              top: -3px;
              left: -3px;
              right: -3px;
              bottom: -3px;
              background: linear-gradient(45deg, #3b82f6, #1e40af);
              border-radius: 8px;
              z-index: -1;
              animation: dragPulse 2s infinite;
            }
          }

          // 드롭 타겟 hover 스타일 더 강화
          &.drag-over {
            background: linear-gradient(135deg, #dbeafe, #bfdbfe) !important;
            border: 3px solid #3b82f6;
            border-radius: 6px;
            transform: translateY(-2px) scale(1.01);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.6);

            td {
              background-color: inherit;
              border-color: #93c5fd;
              color: #1e40af;
              font-weight: 500;
            }

            // 상단 드롭 인디케이터 더 강화
            &::before {
              content: '↓ 여기에 놓기 ↓';
              position: absolute;
              left: 50%;
              top: -25px;
              transform: translateX(-50%);
              background: linear-gradient(90deg, #3b82f6, #1e40af, #3b82f6);
              color: white;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
              z-index: 100;
              animation: dropIndicator 1.2s infinite;
              box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            }

            // 하단 드롭 라인
            &::after {
              content: '';
              position: absolute;
              left: 0;
              right: 0;
              bottom: -2px;
              height: 4px;
              background: linear-gradient(
                90deg,
                transparent,
                #3b82f6 20%,
                #1e40af 50%,
                #3b82f6 80%,
                transparent
              );
              border-radius: 2px;
              animation: dragIndicator 1s infinite;
            }
          }
        }
      }
    }

    &.row-clickable {
      .ui-table {
        tbody tr {
          cursor: pointer;

          &:hover {
            background-color: #f4f5f6;
          }
        }
      }
    }

    .ui-table {
      width: 100%;
      border-collapse: separate;
      border-bottom: 1px solid #e2e8f0;
      position: relative;
      z-index: 0;
      &.sortable-active {
        border: 2px dashed #cbd5e1;
        border-radius: 8px;
        background-color: rgba(248, 250, 252, 0.5);

        tbody tr {
          border: 1px solid transparent;
          transition: all 0.2s ease;
          margin: 2px 0;

          &:hover:not(.dragging-source):not(.drag-over) {
            background-color: #f8fafc !important;
            border-color: #3b82f6;
            box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
            transform: translateX(2px);
          }

          // 드래그 핸들 스타일
          .drag-handle {
            opacity: 0.6;
            transition: all 0.2s ease;
            color: #64748b;
            font-size: 18px;

            &:hover {
              opacity: 1;
              color: #3b82f6;
              transform: scale(1.2);
            }
          }
        }
      }

      th {
        background-color: $gray-5;
        border-top: 1px solid #6d7882;
      }
    }

    &.scrollable {
      height: 100%;

      .section-header {
        flex-shrink: 0;
        position: sticky;
        top: 0;
        z-index: 20;
        background-color: #fff;
      }

      .table-scroll-container {
        flex: 1;
        overflow-y: auto;
        overflow-x: auto;
      }
    }

    &.bordered {
      .ui-table {
        border-right: 0.5px solid $gray-20;
        th {
          border-left: 0.5px solid $gray-20;

          &:first-child {
            border-left: 1px solid $gray-20;
          }
        }

        td {
          border-left: 0.5px solid $gray-20;
          border-bottom: 0.5px solid $gray-20;
        }

        tbody tr:last-child td {
          border-bottom: 0.5px solid $gray-20;
        }
      }
    }

    &.striped {
      .ui-table {
        tbody tr:nth-child(2n) {
          background-color: rgba(248, 250, 252, 0.7);
        }
      }
    }

    &.hover {
      .ui-table {
        tbody tr {
          transition: background-color 0.15s ease;

          &:hover {
            background-color: #f4f5f6;
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
          word-break: break-word;
        }
      }
    }

    &.medium {
      .ui-table {
        font-size: 1rem;

        .ui-checkbox--large .ui-checkbox__input {
          margin-right: 0 !important;
        }

        .row-checkbox {
          width: 20px !important;
        }

        th {
          padding: 10px 7px;
        }

        td {
          padding: 7px;
          font-size: 15px;
          word-break: break-word;
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
        td {
          word-break: break-word;
        }
      }
    }

    &.horizontal {
      .ui-table {
        display: table;
        width: 100%;
        thead {
          display: none;
        }

        tbody {
          tr {
            display: table-row;
            &:first-child {
              td,
              th {
                border-top: 1px solid #6d7882;
              }
            }

            th {
              display: table-cell;
              width: 20%;
              background-color: #f8fafc;
              font-weight: 600;
              padding: 10px;
              vertical-align: middle;
              white-space: nowrap;
              border: 1px solid #e2e8f0;
              border-bottom: none;
            }

            td {
              display: table-cell;
              width: 80%;
              padding: 10px;
              vertical-align: top;
              border: 1px solid #e2e8f0;
              border-bottom: none;
            }

            &:last-child {
              th,
              td {
                border-bottom: none;
              }
            }
          }
        }
      }
    }

    .selected-row {
      background-color: #e3f2fd !important;

      td:first-child {
        border-left: 3px solid $primary-color;
      }

      &:hover {
        background-color: #bbdefb !important;
      }
    }

    &.editable {
      .ui-table {
        tbody tr {
          &.selected {
            background-color: rgba(203, 213, 225, 0.3);
          }
        }
      }
    }

    &.dragging {
      .ui-table tbody tr {
        transition: transform 0.2s ease;
      }
    }

    &.align-top {
      .ui-table {
        td {
          vertical-align: top;
        }
      }
    }
  }

  .ui-table {
    tr {
      &.sortable-row {
        &:hover {
          background-color: rgba(241, 245, 249, 0.8);
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
      z-index: 1;
      white-space: nowrap;
      font-size: 1rem;
      padding: 0.75rem 1rem;
      text-align: center;
    }

    td {
      &.text-center {
        text-align: center;
      }
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

  .textUnderLine {
    text-decoration: underline;
    text-underline-offset: 2px;
    cursor: pointer;
    color: $primary-color !important;
  }

  .sticky-header {
    th {
      position: sticky;
      top: 0;
      z-index: 10;
      background-color: #f8fafc;

      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 1px;
        background-color: #6d7882;
        z-index: 1;
      }
    }
  }

  .sort-mode-message {
    background: #fef3c7;
    border-left: 4px solid #f59e0b;
    padding: 12px;
    text-align: left;
    font-size: 14px;
    font-weight: 500;
    color: #92400e;
    z-index: 10;
    margin-bottom: 5px;
  }

  .empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    padding: 2rem;
    background-color: #fafafa;
    border: 1px solid #e2e8f0;

    .empty-content {
      text-align: center;
      max-width: 400px;

      .empty-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #374151;
        margin-bottom: 0.5rem;
      }

      .empty-description {
        font-size: 0.875rem;
        color: #6b7280;
        margin-bottom: 1.5rem;
        line-height: 1.5;
      }

      .empty-actions {
        display: flex;
        justify-content: center;
        gap: 0.75rem;
      }
    }
  }

  .ui-button {
    &:disabled {
      cursor: not-allowed;
      border: 1px solid $system-red !important;
    }
  }

  // 키프레임 애니메이션 정의
  @keyframes dragIndicator {
    0%,
    100% {
      opacity: 0.6;
      transform: scaleX(1);
    }
    50% {
      opacity: 1;
      transform: scaleX(1.05);
    }
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: 0.3;
    }
  }

  // 드래그 중 글로벌 스타일
  .dragging-active {
    * {
      cursor: grabbing !important;
    }

    // 드래그 중에는 텍스트 선택 방지
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  // 드롭 존 표시를 위한 추가 스타일
  .drop-zone-indicator {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: -10px;
      right: -10px;
      top: -2px;
      height: 4px;
      background: #3b82f6;
      border-radius: 2px;
      z-index: 100;
      animation: dropZoneIndicator 0.8s infinite alternate;
    }
  }

  @keyframes dropZoneIndicator {
    0% {
      opacity: 0.6;
      box-shadow: 0 0 0 rgba(59, 130, 246, 0.4);
    }
    100% {
      opacity: 1;
      box-shadow: 0 0 8px rgba(59, 130, 246, 0.6);
    }
  }

  // 또는 SCSS 루프 사용
  .ui-table {
    tr {
      &:hover {
        background-color: #f1f5f9 !important;
      }
    }
    // 체크박스가 체크된 행 자체
    tr:has(.ui-checkbox__input:checked) {
      background-color: #e3f2fd !important;

      td {
        background-color: #e3f2fd !important;
      }

      td:first-child {
        border-left: 3px solid #1976d2;
      }
    }
  }

  .ui-table tbody {
    tr.group-header:has(.ui-checkbox__input:checked) {
      background-color: #e3f2fd !important;
      td {
        background-color: #e3f2fd !important;
      }
      td[rowspan] {
        background-color: #e3f2fd !important;
      }

      // 연속된 형제 선택자 체인
      $selector: '';
      @for $i from 1 through 5 {
        // 최대 5개 하위 행 가정
        $selector: $selector + ' + tr.rowspan-group:not(.group-header)';

        #{$selector} {
          background-color: #e3f2fd !important;
          td {
            background-color: #e3f2fd !important;
          }
        }
      }
    }
  }
</style>
