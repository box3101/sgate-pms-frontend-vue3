<template>
  <div class="edit-ui-table">
    <!-- 테이블 상단 컨트롤 영역 -->
    <div class="table-controls">
      <!-- View 모드 버튼 -->
      <div v-if="!isEditMode" class="view-controls">
        <button @click="startEdit" class="btn btn-primary">
          <Icon name="mdi:pencil" size="16" />
          편집
        </button>
      </div>

      <!-- Edit 모드 버튼 -->
      <div v-else class="edit-controls">
        <div class="edit-actions">
          <button @click="cancelEdit" class="btn btn-secondary">
            <Icon name="mdi:close" size="16" />
            취소
          </button>
          <button @click="saveEdit" class="btn btn-success">
            <Icon name="mdi:check" size="16" />
            저장
          </button>
        </div>

        <div class="row-actions">
          <button @click="addRow" class="btn btn-icon" title="행 추가">
            <Icon name="mdi:plus" size="16" />
          </button>
          <button
            @click="deleteSelectedRows"
            class="btn btn-icon btn-danger"
            :disabled="selectedRows.length === 0"
            title="선택된 행 삭제"
          >
            <Icon name="mdi:trash-can" size="16" />
          </button>
        </div>
      </div>
    </div>

    <!-- 기본 테이블 컴포넌트 사용 -->
    <div class="ui-table-wrapper-default">
      <table class="ui-table-default" :class="tableClasses">
        <!-- 컬럼 그룹 정의 -->
        <colgroup>
          <col v-if="isEditMode" style="width: 40px" />
          <!-- 체크박스 -->
          <col v-if="isEditMode" style="width: 30px" />
          <!-- 드래그 핸들 -->
          <col v-for="col in columns" :key="col.key" :style="{ width: col.width }" />
        </colgroup>

        <!-- 테이블 헤더 -->
        <thead class="ui-table-default__header">
          <tr>
            <th v-if="isEditMode" class="checkbox-column">
              <input
                type="checkbox"
                :checked="isAllSelected"
                @change="toggleAllSelection"
                class="table-checkbox"
              />
            </th>
            <th v-if="isEditMode" class="drag-column"></th>
            <th v-for="col in columns" :key="col.key">
              {{ col.label }}
            </th>
          </tr>
        </thead>

        <!-- 테이블 바디 -->
        <tbody class="ui-table-default__body" ref="tableBody">
          <tr
            v-for="(row, index) in editableData"
            :key="row.id || index"
            :class="{
              selected: selectedRows.includes(row.id || index),
              dragging: draggedRowIndex === index
            }"
            @dragstart="handleDragStart(index, $event)"
            @dragover.prevent="handleDragOver(index, $event)"
            @drop="handleDrop(index, $event)"
            @dragend="handleDragEnd"
            :draggable="isEditMode"
          >
            <!-- 체크박스 컬럼 -->
            <td v-if="isEditMode" class="checkbox-column">
              <input
                type="checkbox"
                :checked="selectedRows.includes(row.id || index)"
                @change="toggleRowSelection(row.id || index)"
                class="table-checkbox"
              />
            </td>

            <!-- 드래그 핸들 컬럼 -->
            <td v-if="isEditMode" class="drag-column">
              <div class="drag-handle">
                <Icon name="mdi:drag-vertical" size="16" />
              </div>
            </td>

            <!-- 데이터 컬럼들 -->
            <td v-for="col in columns" :key="col.key" class="data-cell">
              <!-- View 모드 -->
              <span v-if="!isEditMode" class="cell-content">
                {{ getDisplayValue(row, col) }}
              </span>

              <!-- Edit 모드 -->
              <div v-else class="cell-edit">
                <!-- 텍스트 타입 -->
                <input
                  v-if="col.type === 'text' || !col.type"
                  v-model="row[col.key]"
                  type="text"
                  class="edit-input"
                  :placeholder="col.placeholder || ''"
                />

                <!-- 숫자 타입 -->
                <input
                  v-else-if="col.type === 'number'"
                  v-model.number="row[col.key]"
                  type="number"
                  class="edit-input"
                  :placeholder="col.placeholder || ''"
                />

                <!-- 이메일 타입 -->
                <input
                  v-else-if="col.type === 'email'"
                  v-model="row[col.key]"
                  type="email"
                  class="edit-input"
                  :placeholder="col.placeholder || ''"
                />

                <!-- 날짜 타입 -->
                <input
                  v-else-if="col.type === 'date'"
                  v-model="row[col.key]"
                  type="date"
                  class="edit-input"
                />

                <!-- 선택 타입 -->
                <select
                  v-else-if="col.type === 'select'"
                  v-model="row[col.key]"
                  class="edit-select"
                >
                  <option value="">선택하세요</option>
                  <option v-for="option in col.options" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>
            </td>
          </tr>

          <!-- 빈 상태 -->
          <tr v-if="editableData.length === 0" class="ui-table-default__empty">
            <td :colspan="totalColumnCount" class="text-center">
              <div class="empty-state">
                <Icon name="mdi:table-remove" size="48" class="empty-icon" />
                <p class="empty-message">데이터가 없습니다.</p>
                <button v-if="isEditMode" @click="addRow" class="btn btn-primary">
                  첫 번째 행 추가
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch } from 'vue'

  /**
   * 컴포넌트 Props 정의
   */
  const props = defineProps({
    /**
     * 테이블 데이터 배열
     * @type {Array}
     */
    modelValue: {
      type: Array,
      default: () => []
    },

    /**
     * 테이블 컬럼 설정
     * @type {Array}
     */
    columns: {
      type: Array,
      required: true
    },

    /**
     * 테이블 크기
     * @type {String}
     */
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },

    /**
     * 테두리 표시 여부
     * @type {Boolean}
     */
    bordered: {
      type: Boolean,
      default: true
    },

    /**
     * 줄무늬 스타일 적용
     * @type {Boolean}
     */
    striped: {
      type: Boolean,
      default: true
    }
  })

  /**
   * 컴포넌트 Emits 정의
   */
  const emit = defineEmits(['update:modelValue', 'save', 'cancel'])

  /**
   * 반응형 데이터
   */
  // 편집 모드 상태
  const isEditMode = ref(false)

  // 편집 가능한 데이터 (원본 복사본)
  const editableData = ref([])

  // 선택된 행들
  const selectedRows = ref([])

  // 드래그 상태
  const draggedRowIndex = ref(-1)

  // 테이블 바디 참조
  const tableBody = ref(null)

  /**
   * 계산된 속성들
   */
  // 기본 테이블 스타일 클래스 사용
  const tableClasses = computed(() => {
    return [
      `ui-table-default--${props.size}`,
      {
        'ui-table-default--bordered': props.bordered,
        'ui-table-default--striped': props.striped,
        'ui-table-default--hover': true, // 기본적으로 호버 효과 활성화
        'ui-table-default--edit-mode': isEditMode.value
      }
    ]
  })

  // 전체 선택 상태
  const isAllSelected = computed(() => {
    return editableData.value.length > 0 && selectedRows.value.length === editableData.value.length
  })

  // 전체 컬럼 수 (체크박스, 드래그 핸들 포함)
  const totalColumnCount = computed(() => {
    let count = props.columns.length
    if (isEditMode.value) {
      count += 2 // 체크박스 + 드래그 핸들
    }
    return count
  })

  /**
   * 데이터 초기화
   */
  const initializeData = () => {
    editableData.value = JSON.parse(JSON.stringify(props.modelValue))
  }

  /**
   * 편집 모드 시작
   */
  const startEdit = () => {
    isEditMode.value = true
    initializeData()
    selectedRows.value = []
  }

  /**
   * 편집 취소
   */
  const cancelEdit = () => {
    isEditMode.value = false
    selectedRows.value = []
    initializeData() // 원본 데이터로 복원
    emit('cancel')
  }

  /**
   * 편집 저장
   */
  const saveEdit = () => {
    isEditMode.value = false
    selectedRows.value = []
    emit('update:modelValue', [...editableData.value])
    emit('save', [...editableData.value])
  }

  /**
   * 행 추가
   */
  const addRow = () => {
    const newRow = {}
    props.columns.forEach(col => {
      newRow[col.key] = col.defaultValue || ''
    })
    newRow.id = Date.now() // 임시 ID 생성
    editableData.value.push(newRow)
  }

  /**
   * 선택된 행들 삭제
   */
  const deleteSelectedRows = () => {
    if (selectedRows.value.length === 0) return

    if (confirm(`선택된 ${selectedRows.value.length}개 행을 삭제하시겠습니까?`)) {
      editableData.value = editableData.value.filter((row, index) => {
        const rowId = row.id || index
        return !selectedRows.value.includes(rowId)
      })
      selectedRows.value = []
    }
  }

  /**
   * 행 선택 토글
   * @param {string|number} rowId - 행 ID
   */
  const toggleRowSelection = rowId => {
    const index = selectedRows.value.indexOf(rowId)
    if (index > -1) {
      selectedRows.value.splice(index, 1)
    } else {
      selectedRows.value.push(rowId)
    }
  }

  /**
   * 전체 선택 토글
   */
  const toggleAllSelection = () => {
    if (isAllSelected.value) {
      selectedRows.value = []
    } else {
      selectedRows.value = editableData.value.map((row, index) => row.id || index)
    }
  }

  /**
   * 셀 표시 값 가져오기
   * @param {Object} row - 행 데이터
   * @param {Object} col - 컬럼 정의
   * @returns {string} 표시할 값
   */
  const getDisplayValue = (row, col) => {
    const value = row[col.key]

    if (col.type === 'select' && col.options) {
      const option = col.options.find(opt => opt.value === value)
      return option ? option.label : value
    }

    return value || ''
  }

  /**
   * 드래그 앤 드롭 핸들러들
   */
  const handleDragStart = (index, event) => {
    draggedRowIndex.value = index
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/html', event.target.outerHTML)
  }

  const handleDragOver = (index, event) => {
    if (draggedRowIndex.value !== index) {
      event.preventDefault()
      event.dataTransfer.dropEffect = 'move'
    }
  }

  const handleDrop = (index, event) => {
    event.preventDefault()

    if (draggedRowIndex.value !== -1 && draggedRowIndex.value !== index) {
      const draggedItem = editableData.value.splice(draggedRowIndex.value, 1)[0]
      editableData.value.splice(index, 0, draggedItem)
    }
  }

  const handleDragEnd = () => {
    draggedRowIndex.value = -1
  }

  /**
   * 데이터 변경 감지
   */
  watch(
    () => props.modelValue,
    () => {
      if (!isEditMode.value) {
        initializeData()
      }
    },
    { deep: true, immediate: true }
  )
</script>
