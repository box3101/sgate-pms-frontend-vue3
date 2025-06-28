<template>
  <div
    class="competency-group-table-wrapper"
    :class="[
      bordered && 'bordered',
      striped && 'striped',
      hover && 'hover',
      scrollable && 'scrollable',
      isDragging && 'dragging',
      editable && 'editable'
    ]"
    :style="scrollable ? { maxHeight: maxHeight } : {}"
  >
    <!-- 헤더 섹션 -->
    <div class="section-header">
      <div class="flex items-center justify-between gap-5">
        <div class="flex items-center gap-10">
          <h2 class="heading-4">{{ title }}</h2>
          <slot name="header-action-left"></slot>
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
                @click="addGroup"
                title="그룹 추가"
              >
                <i class="icon-md icon-plus icon-black"></i>
              </UiButton>
              <UiButton
                type="button"
                variant="secondary-line"
                icon-only
                @click="deleteSelected"
                :disabled="selectedItems.length === 0"
                title="선택 항목 삭제"
              >
                <i class="icon-md icon-delete"></i>
              </UiButton>
              <UiButton
                v-if="canSort"
                type="button"
                variant="secondary-line"
                icon-only
                @click="toggleSortMode"
                :class="{ active: sortMode }"
                title="정렬 모드"
              >
                <i class="icon-md icon-sort"></i>
              </UiButton>
              <UiButton v-if="canSave" type="button" variant="primary" @click="saveChanges">
                저장
              </UiButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 정렬 모드 안내 메시지 -->
    <div v-if="sortMode && editable" class="sort-mode-message">
      그룹 헤더를 드래그하여 순서를 변경할 수 있습니다. <br />완료 후 정렬 버튼을 다시 클릭하세요.
    </div>

    <!-- 빈 상태 표시 -->
    <div v-if="isEmpty" class="empty-state">
      <div class="empty-content">
        <div class="empty-icon">
          <i class="icon-xxl icon-table"></i>
        </div>
        <h3 class="empty-title">{{ emptyTitle }}</h3>
        <p class="empty-description">{{ emptyDescription }}</p>
        <div v-if="editable && canAddRow" class="empty-actions">
          <UiButton variant="primary" @click="addGroup">
            <i class="icon-sm icon-plus"></i>
            첫 번째 그룹 추가
          </UiButton>
        </div>
      </div>
    </div>

    <!-- 스크롤 가능한 테이블 -->
    <div v-else-if="scrollable" class="table-scroll-container">
      <table class="competency-table">
        <colgroup>
          <col style="width: 40px" />
          <col style="width: 200px" />
          <col style="width: 100px" />
          <col style="width: auto" />
          <col style="width: 100px" />
          <col style="width: 100px" />
          <col style="width: 40px" />
        </colgroup>

        <thead class="sticky-header">
          <tr>
            <th>
              <UiCheckbox
                size="large"
                :modelValue="isAllSelected"
                @update:modelValue="toggleSelectAll"
              />
            </th>
            <th>역량정의/역량항목</th>
            <th>구분</th>
            <th>행동기준/행동수준/역량정의</th>
            <th>수준/점수</th>
            <th>가중</th>
            <th>수정</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(row, index) in flattenedData"
            :key="row.uniqueKey"
            :class="getRowClasses(row)"
            :draggable="isDraggable(row)"
            @dragstart="event => handleDragStart(event, index, row)"
            @dragover="handleDragOver"
            @drop="event => handleDrop(event, index)"
            @dragend="handleDragEnd"
            @click="event => handleRowClick(row, event)"
          >
            <!-- 체크박스 -->
            <td
              v-if="shouldShowCell(row, 'checkbox')"
              :rowspan="getRowspan(row, 'checkbox')"
              class="text-center"
            >
              <UiCheckbox
                size="large"
                :modelValue="isItemSelected(row)"
                @update:modelValue="() => toggleItemSelection(row)"
                @click.stop
              />
            </td>

            <!-- 역량정의/역량항목 -->
            <td
              v-if="shouldShowCell(row, 'definition')"
              :rowspan="getRowspan(row, 'definition')"
              class="vertical-middle"
            >
              <div v-if="row.type === 'group-header'" class="definition-content">
                <strong>[{{ row.competencyName }}]</strong><br />
                {{ row.definition }}
              </div>
              <div v-else class="category-content">
                <span class="category-badge" :class="getCategoryClass(row.category)">
                  {{ row.category }}
                </span>
              </div>
            </td>

            <!-- 구분 -->
            <td
              v-if="shouldShowCell(row, 'type')"
              :rowspan="getRowspan(row, 'type')"
              class="text-center"
            >
              {{ row.categoryType }}
            </td>

            <!-- 행동기준 -->
            <td class="pd-trl10 br behavior-cell">
              <div :class="row.type === 'group-item' ? 'behavior-group' : 'behavior-single'">
                {{ row.behavior }}
              </div>
            </td>

            <!-- 수준/점수 -->
            <td class="text-center">
              {{ row.level }}
            </td>

            <!-- 가중 -->
            <td class="text-center">
              {{ row.weight }}
            </td>

            <!-- 수정 버튼 -->
            <td
              v-if="shouldShowCell(row, 'actions')"
              :rowspan="getRowspan(row, 'actions')"
              class="text-center"
            >
              <UiButton variant="ghost" size="small" @click="handleEdit(row)">
                <i class="icon icon-md icon-edit"></i>
              </UiButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 일반 테이블 (scrollable이 아닌 경우) -->
    <table v-else-if="!isEmpty" class="competency-table">
      <colgroup>
        <col style="width: 40px" />
        <col style="width: 200px" />
        <col style="width: 100px" />
        <col style="width: auto" />
        <col style="width: 100px" />
        <col style="width: 100px" />
        <col style="width: 40px" />
      </colgroup>

      <thead class="sticky-header">
        <tr>
          <th>
            <UiCheckbox
              size="large"
              :modelValue="isAllSelected"
              @update:modelValue="toggleSelectAll"
            />
          </th>
          <th>역량정의/역량항목</th>
          <th>구분</th>
          <th>행동기준/행동수준/역량정의</th>
          <th>수준/점수</th>
          <th>가중</th>
          <th>수정</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(row, index) in flattenedData"
          :key="row.uniqueKey"
          :class="getRowClasses(row)"
          :draggable="isDraggable(row)"
          @dragstart="event => handleDragStart(event, index, row)"
          @dragover="handleDragOver"
          @drop="event => handleDrop(event, index)"
          @dragend="handleDragEnd"
          @click="event => handleRowClick(row, event)"
        >
          <!-- 체크박스 -->
          <td
            v-if="shouldShowCell(row, 'checkbox')"
            :rowspan="getRowspan(row, 'checkbox')"
            class="text-center"
          >
            <UiCheckbox
              size="large"
              :modelValue="isItemSelected(row)"
              @update:modelValue="() => toggleItemSelection(row)"
              @click.stop
            />
          </td>

          <!-- 역량정의/역량항목 -->
          <td
            v-if="shouldShowCell(row, 'definition')"
            :rowspan="getRowspan(row, 'definition')"
            class="vertical-middle"
          >
            <div v-if="row.type === 'group-header'" class="definition-content">
              <strong>[{{ row.competencyName }}]</strong><br />
              {{ row.definition }}
            </div>
            <div v-else class="category-content">
              <span class="category-badge" :class="getCategoryClass(row.category)">
                {{ row.category }}
              </span>
            </div>
          </td>

          <!-- 구분 -->
          <td
            v-if="shouldShowCell(row, 'type')"
            :rowspan="getRowspan(row, 'type')"
            class="text-center"
          >
            {{ row.categoryType }}
          </td>

          <!-- 행동기준 -->
          <td class="pd-trl10 br behavior-cell">
            <div :class="row.type === 'group-item' ? 'behavior-group' : 'behavior-single'">
              {{ row.behavior }}
            </div>
          </td>

          <!-- 수준/점수 -->
          <td class="text-center">
            {{ row.level }}
          </td>

          <!-- 가중 -->
          <td class="text-center">
            {{ row.weight }}
          </td>

          <!-- 수정 버튼 -->
          <td
            v-if="shouldShowCell(row, 'actions')"
            :rowspan="getRowspan(row, 'actions')"
            class="text-center"
          >
            <UiButton variant="ghost" size="small" @click="handleEdit(row)">
              <i class="icon icon-md icon-edit"></i>
            </UiButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { ref, computed, watch } from 'vue'

  // 이벤트 정의
  const emit = defineEmits([
    'update:modelValue',
    'group-added',
    'items-deleted',
    'item-edited',
    'order-changed',
    'save'
  ])

  // Props 정의
  const props = defineProps({
    title: {
      type: String,
      default: '역량항목 구분'
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    bordered: {
      type: Boolean,
      default: true
    },
    striped: {
      type: Boolean,
      default: true
    },
    hover: {
      type: Boolean,
      default: true
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: String,
      default: 'calc(100vh - 200px)'
    },
    editable: {
      type: Boolean,
      default: true
    },
    canAddRow: {
      type: Boolean,
      default: true
    },
    canSort: {
      type: Boolean,
      default: true
    },
    canSave: {
      type: Boolean,
      default: true
    },
    emptyTitle: {
      type: String,
      default: '역량 데이터가 없습니다'
    },
    emptyDescription: {
      type: String,
      default: '새로운 역량 그룹을 추가해주세요.'
    }
  })

  // 반응형 상태
  const selectedItems = ref([])
  const sortMode = ref(false)
  const isDragging = ref(false)
  const draggedIndex = ref(null)

  // 계산된 속성들
  const isEmpty = computed(() => {
    return !props.modelValue || props.modelValue.length === 0
  })

  // 데이터를 평면화하여 렌더링용으로 변환
  const flattenedData = computed(() => {
    const result = []

    props.modelValue.forEach((item, groupIndex) => {
      if (item.type === 'group') {
        // 그룹 데이터를 개별 행으로 변환
        item.behaviors.forEach((behavior, behaviorIndex) => {
          result.push({
            uniqueKey: `${item.id}_${behaviorIndex}`,
            originalGroupIndex: groupIndex,
            groupId: item.id,
            behaviorIndex: behaviorIndex,
            type: behaviorIndex === 0 ? 'group-header' : 'group-item',
            isGroupHeader: behaviorIndex === 0,

            // 그룹 정보
            competencyName: item.competencyName,
            definition: item.definition,
            categoryType: item.category,

            // 행동 정보
            behavior: behavior.behavior,
            level: behavior.level,
            weight: behavior.weight,

            // rowspan 정보
            totalGroupSize: item.behaviors.length,

            // 원본 데이터 참조
            originalGroup: item,
            originalBehavior: behavior
          })
        })
      } else {
        // 단일 항목
        result.push({
          uniqueKey: item.id,
          originalGroupIndex: groupIndex,
          type: 'single',
          isGroupHeader: false,

          category: item.category,
          categoryType: item.categoryType || item.type,
          behavior: item.behavior,
          level: item.level,
          weight: item.weight,

          totalGroupSize: 1,

          // 원본 데이터 참조
          originalGroup: item
        })
      }
    })

    return result
  })

  // 전체 선택 상태
  const isAllSelected = computed(() => {
    if (flattenedData.value.length === 0) return false

    // 선택 가능한 아이템들 (헤더나 단일 항목)
    const selectableItems = flattenedData.value.filter(
      item => item.isGroupHeader || item.type === 'single'
    )

    return (
      selectableItems.length > 0 &&
      selectableItems.every(item => selectedItems.value.includes(item.uniqueKey))
    )
  })

  // 헬퍼 함수들
  const shouldShowCell = (row, cellType) => {
    if (row.type === 'single') return true

    switch (cellType) {
      case 'checkbox':
      case 'definition':
      case 'type':
      case 'actions':
        return row.isGroupHeader
      default:
        return true
    }
  }

  const getRowspan = (row, cellType) => {
    if (row.type === 'single' || !row.isGroupHeader) return 1

    switch (cellType) {
      case 'checkbox':
      case 'definition':
      case 'type':
      case 'actions':
        return row.totalGroupSize
      default:
        return 1
    }
  }

  const getRowClasses = row => {
    const classes = []

    if (row.type === 'group-header') {
      classes.push('group-header')
    } else if (row.type === 'group-item') {
      classes.push('group-item')
    } else {
      classes.push('single-item')
    }

    if (isItemSelected(row)) {
      classes.push('selected')
    }

    return classes.join(' ')
  }

  const getCategoryClass = category => {
    switch (category) {
      case '핵심역량':
        return 'category-core'
      case '직무역량':
        return 'category-job'
      default:
        return 'category-default'
    }
  }

  const isDraggable = row => {
    if (!sortMode.value) return false
    // 그룹 헤더나 단일 항목만 드래그 가능
    return row.isGroupHeader || row.type === 'single'
  }

  // 선택 관련 함수들
  const isItemSelected = row => {
    return selectedItems.value.includes(row.uniqueKey)
  }

  const toggleItemSelection = row => {
    if (sortMode.value) return

    // 그룹 헤더나 단일 항목만 선택 가능
    if (!row.isGroupHeader && row.type !== 'single') return

    const index = selectedItems.value.indexOf(row.uniqueKey)
    if (index === -1) {
      selectedItems.value.push(row.uniqueKey)
    } else {
      selectedItems.value.splice(index, 1)
    }
  }

  const toggleSelectAll = () => {
    if (isAllSelected.value) {
      selectedItems.value = []
    } else {
      selectedItems.value = flattenedData.value
        .filter(item => item.isGroupHeader || item.type === 'single')
        .map(item => item.uniqueKey)
    }
  }

  // 액션 함수들
  const addGroup = () => {
    const newGroup = {
      id: `group_${Date.now()}`,
      type: 'group',
      competencyName: '새 역량',
      definition: '새로운 역량 정의를 입력하세요.',
      category: 'BARS',
      behaviors: [
        {
          behavior: '새로운 행동 기준을 입력하세요.',
          level: '3/60',
          weight: '10'
        }
      ],
      sortOrder: props.modelValue.length + 1
    }

    const updatedData = [...props.modelValue, newGroup]
    emit('update:modelValue', updatedData)
    emit('group-added', newGroup)
  }

  const deleteSelected = () => {
    if (selectedItems.value.length === 0) return

    const itemsToDelete = []
    const updatedData = [...props.modelValue]

    // 선택된 항목들을 분석하여 삭제할 그룹/항목 파악
    selectedItems.value.forEach(uniqueKey => {
      const row = flattenedData.value.find(item => item.uniqueKey === uniqueKey)
      if (row) {
        if (row.type === 'group-header') {
          // 그룹 헤더 선택 시 전체 그룹 삭제
          itemsToDelete.push({
            type: 'group',
            groupIndex: row.originalGroupIndex,
            data: row.originalGroup
          })
        } else if (row.type === 'single') {
          // 단일 항목 삭제
          itemsToDelete.push({
            type: 'single',
            groupIndex: row.originalGroupIndex,
            data: row.originalGroup
          })
        }
      }
    })

    // 인덱스 역순으로 정렬하여 삭제 (뒤에서부터 삭제)
    itemsToDelete
      .sort((a, b) => b.groupIndex - a.groupIndex)
      .forEach(item => {
        updatedData.splice(item.groupIndex, 1)
      })

    emit('update:modelValue', updatedData)
    emit('items-deleted', itemsToDelete)
    selectedItems.value = []
  }

  const handleEdit = row => {
    emit('item-edited', row)
  }

  const handleRowClick = (row, event) => {
    // 체크박스나 버튼 클릭은 제외
    if (event.target.closest('.ui-checkbox') || event.target.closest('button')) {
      return
    }

    // 편집 모드에서는 행 클릭으로 선택 토글
    if (props.editable && (row.isGroupHeader || row.type === 'single')) {
      toggleItemSelection(row)
    }
  }

  // 정렬 관련 함수들
  const toggleSortMode = () => {
    sortMode.value = !sortMode.value
    if (!sortMode.value) {
      selectedItems.value = []
    }
  }

  // 드래그 앤 드롭 핸들러들
  const handleDragStart = (event, index, row) => {
    if (!sortMode.value || !isDraggable(row)) {
      event.preventDefault()
      return false
    }

    draggedIndex.value = index
    isDragging.value = true
    event.dataTransfer.effectAllowed = 'move'

    // 드래그 중인 행에 클래스 추가
    event.target.closest('tr')?.classList.add('dragging-source')
  }

  const handleDragOver = event => {
    if (!sortMode.value) return

    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (event, targetIndex) => {
    if (!sortMode.value || draggedIndex.value === null) return

    event.preventDefault()

    const draggedRow = flattenedData.value[draggedIndex.value]
    const targetRow = flattenedData.value[targetIndex]

    // 같은 위치에 드롭하면 무시
    if (draggedIndex.value === targetIndex) {
      draggedIndex.value = null
      isDragging.value = false
      return
    }

    // 그룹 내 아이템은 드래그 불가
    if (!isDraggable(draggedRow) || !isDraggable(targetRow)) {
      draggedIndex.value = null
      isDragging.value = false
      return
    }

    // 실제 데이터 순서 변경
    const updatedData = [...props.modelValue]
    const draggedItem = updatedData[draggedRow.originalGroupIndex]

    // 원본 배열에서 제거
    updatedData.splice(draggedRow.originalGroupIndex, 1)

    // 타겟 위치에 삽입
    const adjustedTargetIndex =
      draggedRow.originalGroupIndex < targetRow.originalGroupIndex
        ? targetRow.originalGroupIndex - 1
        : targetRow.originalGroupIndex

    updatedData.splice(adjustedTargetIndex, 0, draggedItem)

    emit('update:modelValue', updatedData)
    emit('order-changed', {
      from: draggedRow.originalGroupIndex,
      to: adjustedTargetIndex,
      item: draggedItem
    })

    draggedIndex.value = null
    isDragging.value = false
  }

  const handleDragEnd = () => {
    draggedIndex.value = null
    isDragging.value = false

    // 드래그 클래스 제거
    document.querySelectorAll('.dragging-source').forEach(el => {
      el.classList.remove('dragging-source')
    })
  }

  const saveChanges = () => {
    emit('save', props.modelValue)
    sortMode.value = false
  }

  // 데이터 변경 감시
  watch(
    () => props.modelValue,
    () => {
      // 선택된 항목들이 여전히 존재하는지 확인
      selectedItems.value = selectedItems.value.filter(uniqueKey =>
        flattenedData.value.some(item => item.uniqueKey === uniqueKey)
      )
    },
    { deep: true }
  )
</script>

<style scoped>
  .competency-group-table-wrapper {
    position: relative;
    overflow: hidden;
    width: 100%;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;
  }

  .section-header {
    flex-shrink: 0;
    margin-bottom: 10px;
    padding: 0 5px;
  }

  .table-scroll-container {
    flex: 1;
    overflow-y: auto;
    overflow-x: auto;
  }

  .competency-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border: 1px solid #e2e8f0;
  }

  .competency-table th {
    background-color: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    border-right: 1px solid #e2e8f0;
    padding: 10px;
    text-align: center;
    font-weight: 600;
    white-space: nowrap;
  }

  .competency-table td {
    border-bottom: 1px solid #e2e8f0;
    border-right: 1px solid #e2e8f0;
    padding: 8px 10px;
    vertical-align: middle;
  }

  .bordered .competency-table th:last-child,
  .bordered .competency-table td:last-child {
    border-right: none;
  }

  .striped .competency-table tbody tr:nth-child(2n) {
    background-color: rgba(248, 250, 252, 0.7);
  }

  .hover .competency-table tbody tr:hover {
    background-color: #f1f5f9;
  }

  .dragging .competency-table tbody tr {
    transition: all 0.3s ease;
  }

  .competency-table tbody tr[draggable='true'] {
    cursor: grab;
  }

  .competency-table tbody tr[draggable='true']:active {
    cursor: grabbing;
  }

  .competency-table tbody tr.selected {
    background-color: #e3f2fd !important;
  }

  .competency-table tbody tr.selected td {
    background-color: #e3f2fd !important;
  }

  .competency-table tbody tr.selected td:first-child {
    border-left: 3px solid #1976d2;
  }

  .group-header {
    border-top: 2px solid #e2e8f0;
  }

  .definition-content {
    padding: 4px 0;
    line-height: 1.4;
  }

  .empty-content {
    text-align: center;
    max-width: 400px;
  }

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
</style>
