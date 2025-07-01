<template>
  <div class="rating-scale-table-container">
    <!-- Toast 방식 저장 상태 표시 -->
    <Teleport to="body">
      <Transition
        name="save-toast"
        enter-active-class="save-toast-enter-active"
        leave-active-class="save-toast-leave-active"
        enter-from-class="save-toast-enter-from"
        leave-to-class="save-toast-leave-to"
      >
        <div
          v-if="showSaveToast"
          class="save-toast"
          :class="saveStatus.class"
          role="alert"
          aria-live="polite"
        >
          <div class="save-toast-icon">
            <div v-if="saveStatus.type === 'saving'" class="loading-spinner"></div>
            <svg
              v-else-if="saveStatus.type === 'saved'"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <svg
              v-else-if="saveStatus.type === 'error'"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <div class="save-toast-content">
            <div class="save-toast-message">{{ saveStatus.message }}</div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <UiTable
      v-model="ratingScaleGroupData"
      title="등급척도 그룹"
      editable
      sortable
      scrollable
      max-height="calc(100vh - 200px)"
    >
      <!-- 컬럼 너비 설정 -->
      <template #colgroup>
        <col style="width: 40px" />
        <col style="width: auto" />
        <col style="width: 80px" />
      </template>

      <!-- 테이블 헤더 -->
      <template #header="{ selectAll, isAllSelected }">
        <th>
          <UiCheckbox
            size="large"
            @click.stop
            :modelValue="isAllSelected"
            @update:modelValue="selectAll"
          />
        </th>
        <th v-for="header in tableHeaders" :key="header.key">
          {{ header.title }}
        </th>
      </template>

      <!-- 테이블 바디 -->
      <template
        #body="{
          rows,
          toggleRowSelection,
          isRowSelected,
          handleDragStart,
          handleDragOver,
          handleDrop,
          handleDragEnd,
          sortable
        }"
      >
        <tr
          v-for="(row, index) in rows"
          :key="row.id"
          :draggable="sortable"
          @dragstart="event => handleDragStart(event, index)"
          @dragover="handleDragOver"
          @drop="event => handleDrop(event, index)"
          @dragend="handleDragEnd"
          :class="{ 'sortable-row': sortable }"
          @click="handleEditRatingCount(row)"
          style="cursor: pointer"
        >
          <!-- 체크박스 컬럼 -->
          <td>
            <UiCheckbox
              size="large"
              @click.stop
              :modelValue="isRowSelected(row)"
              @update:modelValue="() => toggleRowSelection(row)"
            />
          </td>

          <!-- 등급척도명 입력 컬럼 -->
          <td>
            <div
              v-if="editingCell.rowId === row.id && editingCell.field === 'name'"
              class="editing-wrapper"
            >
              <UiInput
                ref="editInput"
                v-model="row.name"
                placeholder="등급척도명을 입력하세요"
                @blur="stopEditing"
                @keyup.enter="stopEditing"
                @keyup.escape="cancelEditing"
                @input="handleInputChange"
              />
            </div>
            <div v-else class="text-display-container">
              <span class="text-content">
                {{ row.name || '등급척도명을 입력하세요' }}
              </span>
              <button class="edit-icon-btn" @click.stop="startEditing(row.id, 'name')" title="편집">
                <!-- 편집 아이콘 (펜 모양) -->
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
            </div>
          </td>

          <!-- 평가등급수 표시/편집 컬럼 -->
          <td class="text-center">
            {{ row.ratingCount }}
          </td>
        </tr>
      </template>
    </UiTable>
  </div>
</template>

<script setup>
  import { ref, nextTick } from 'vue'

  const emit = defineEmits(['row-selected'])

  /**
   * Toast 표시 상태 관리
   * 목적: Toast가 언제 보여질지 제어
   */
  const showSaveToast = ref(false)
  let toastTimeout = null

  /**
   * 저장 상태 관리
   * 목적: 자동 저장 상태를 사용자에게 시각적으로 표시
   */
  const saveStatus = ref({
    type: 'saved',
    message: '모든 변경사항이 저장되었습니다',
    class: 'save-toast--saved'
  })

  let saveTimeout = null

  /**
   * 인라인 편집 상태 관리
   * 목적: 어떤 셀이 현재 편집 모드인지 추적
   */
  const editingCell = ref({
    rowId: null,
    field: null
  })

  const editInput = ref(null)
  const originalValue = ref('')

  /**
   * Toast 표시 함수
   * 목적: 저장 상태 변경 시 Toast 표시 및 자동 숨김 처리
   * @param {string} type - 저장 상태 타입
   * @param {string} message - 표시할 메시지
   * @param {number} duration - 표시 시간 (밀리초)
   */
  const showToast = (type, message, duration = 3000) => {
    // 기존 타이머 클리어
    if (toastTimeout) {
      clearTimeout(toastTimeout)
    }

    saveStatus.value = {
      type,
      message,
      class: `save-toast--${type}`
    }

    showSaveToast.value = true

    // 자동 숨김 (저장 중이 아닐 때만)
    if (type !== 'saving' && duration > 0) {
      toastTimeout = setTimeout(() => {
        showSaveToast.value = false
      }, duration)
    }
  }

  /**
   * 입력 변경 시 자동 저장 트리거
   * 목적: 사용자가 타이핑할 때마다 디바운싱된 자동 저장 실행
   */
  const handleInputChange = () => {
    // 이전 타이머 취소
    if (saveTimeout) {
      clearTimeout(saveTimeout)
    }

    // 저장 중 상태로 변경
    showToast('saving', '저장 중...', 0)

    // 2초 후 자동 저장 실행
    saveTimeout = setTimeout(() => {
      autoSave()
    }, 2000)
  }

  /**
   * 자동 저장 함수
   * 목적: 백그라운드에서 서버에 데이터 저장
   */
  const autoSave = async () => {
    try {
      // 실제 환경에서는 API 호출
      // await api.saveRatingScaleData(ratingScaleGroupData.value)

      // 시뮬레이션: 저장 완료
      await new Promise(resolve => setTimeout(resolve, 500))

      showToast('saved', '자동 저장 완료', 3000)
    } catch (error) {
      showToast('error', '저장 실패. 다시 시도해주세요.', 5000)
    }
  }

  /**
   * 편집 모드 시작
   * 목적: 텍스트 클릭 시 input으로 전환하고 포커스
   * @param {number} rowId - 편집할 행의 ID
   * @param {string} field - 편집할 필드명
   */
  const startEditing = async (rowId, field) => {
    // 현재 값을 백업 (취소 시 복원용)
    const currentRow = ratingScaleGroupData.value.find(row => row.id === rowId)
    originalValue.value = currentRow[field]

    editingCell.value = { rowId, field }

    // DOM 업데이트 후 input에 포커스
    await nextTick()
    if (editInput.value?.[0]) {
      editInput.value[0].focus()
    }
  }

  /**
   * 편집 모드 종료
   * 목적: 편집 완료 시 텍스트 모드로 복귀
   */
  const stopEditing = () => {
    editingCell.value = { rowId: null, field: null }
  }

  /**
   * 편집 취소
   * 목적: ESC 키 입력 시 원래 값으로 복원하고 편집 모드 종료
   */
  const cancelEditing = () => {
    const currentRow = ratingScaleGroupData.value.find(row => row.id === editingCell.value.rowId)
    if (currentRow && editingCell.value.field) {
      currentRow[editingCell.value.field] = originalValue.value
    }
    stopEditing()
  }

  const handleEditRatingCount = row => {
    emit('row-selected', row) // 부모에게 선택된 행 전달
  }

  /**
   * 테이블 헤더 정의
   * 목적: 테이블의 컬럼 구조와 표시할 제목 정의
   */
  const tableHeaders = ref([
    { key: 'name', title: '등급척도' },
    { key: 'ratingCount', title: '평가등급수' }
  ])

  /**
   * 등급척도 그룹 데이터
   * 목적: 등급척도별 평가등급수 정보를 관리하는 테이블 데이터
   */
  const ratingScaleGroupData = ref([
    { id: 1, name: '등급척도', ratingCount: 0 },
    { id: 2, name: '평가등급수', ratingCount: 0 },
    { id: 3, name: '평가항목', ratingCount: 0 },
    { id: 4, name: '역량평가', ratingCount: 0 },
    { id: 5, name: '성과평가', ratingCount: 3 },
    { id: 6, name: '다면평가', ratingCount: 5 },
    { id: 7, name: '리더십평가', ratingCount: 4 },
    { id: 8, name: '업적평가', ratingCount: 3 },
    { id: 9, name: '핵심가치평가', ratingCount: 0 },
    { id: 10, name: '직무역량평가', ratingCount: 4 },
    { id: 11, name: '업무성과평가', ratingCount: 3 },
    { id: 12, name: '행동역량평가', ratingCount: 0 },
    { id: 13, name: '종합평가', ratingCount: 4 },
    { id: 14, name: '직무수행평가', ratingCount: 5 },
    { id: 15, name: '팀워크평가', ratingCount: 3 },
    { id: 16, name: '소통역량평가', ratingCount: 4 },
    { id: 17, name: '목표달성평가', ratingCount: 5 },
    { id: 18, name: '기여도평가', ratingCount: 3 },
    { id: 19, name: '전문성평가', ratingCount: 4 },
    { id: 20, name: '혁신역량평가', ratingCount: 5 }
  ])
</script>

<style lang="scss" scoped>
  .rating-scale-table-container {
    position: relative;
  }

  // Toast 방식 저장 상태 표시
  .save-toast {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 300px;
    max-width: 400px;
    padding: 16px;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border: 1px solid #e5e7eb;

    &--saving {
      border-left: 4px solid #f59e0b;

      .save-toast-icon {
        color: #f59e0b;
      }
    }

    &--saved {
      border-left: 4px solid #10b981;

      .save-toast-icon {
        color: #10b981;
      }
    }

    &--error {
      border-left: 4px solid #ef4444;

      .save-toast-icon {
        color: #ef4444;
      }
    }

    .save-toast-icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;

      .loading-spinner {
        width: 20px;
        height: 20px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .save-toast-content {
      flex: 1;
      min-width: 0;

      .save-toast-message {
        font-size: 14px;
        font-weight: 500;
        color: #374151;
        line-height: 1.4;
      }
    }
  }

  // Toast 애니메이션 (상단 중앙용)
  .save-toast-enter-active,
  .save-toast-leave-active {
    transition: all 0.3s ease;
  }

  .save-toast-enter-from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px) scale(0.95);
  }

  .save-toast-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px) scale(0.95);
  }

  // 정렬 가능한 행 스타일
  .sortable-row {
    &:hover {
      background-color: rgba(241, 245, 249, 0.8);
    }
  }

  // 인라인 편집 스타일
  .text-display-container {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    min-height: 40px;
    border-radius: 4px;
    transition: background-color 0.2s ease;
    position: relative;

    .text-content {
      color: #374151;

      // 빈 값일 때 placeholder 스타일
      &:empty::before {
        content: '등급척도명을 입력하세요';
        color: #9ca3af;
      }
    }

    .edit-icon-btn {
      opacity: 0;
      visibility: hidden;
      background: none;
      border: none;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
      color: #6b7280;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      margin-left: 6px;
      flex-shrink: 0;

      &:hover {
        background-color: rgba(59, 130, 246, 0.1);
        color: #2563eb;
      }

      svg {
        width: 14px;
        height: 14px;
      }
    }

    &:hover {
      background-color: rgba(59, 130, 246, 0.05);

      .edit-icon-btn {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  .editing-wrapper {
    padding: 4px;

    .ui-input {
      border: 2px solid $primary-color;

      input {
        font-size: 14px;
      }
    }
  }

  // 애니메이션
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
