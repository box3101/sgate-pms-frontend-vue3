<template>
  <div class="rating-scale-table-container">
    <!-- 저장 알림 토스트 -->
    <Teleport to="body">
      <Transition
        name="save-toast"
        enter-active-class="save-toast-enter-active"
        leave-active-class="save-toast-leave-active"
        enter-from-class="save-toast-enter-from"
        leave-to-class="save-toast-leave-to"
      >
        <div v-if="showSaveReminder" class="save-reminder-toast" role="alert" aria-live="polite">
          <div class="toast-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div class="toast-content">
            <div class="toast-message">변경사항을 저장하려면 저장 버튼을 클릭하세요.</div>
          </div>
          <button class="toast-close" @click="closeSaveReminder" aria-label="닫기">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
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
   * 저장 알림 상태 관리
   * 목적: 사용자가 편집 후 저장하지 않으면 알림 표시
   */
  const showSaveReminder = ref(false)
  const hasUnsavedChanges = ref(false)
  let reminderTimeout = null

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
   * 입력 변경 시 처리
   * 목적: 사용자가 편집하면 미저장 상태로 표시하고 알림 스케줄링
   */
  const handleInputChange = () => {
    hasUnsavedChanges.value = true

    // 기존 타이머 클리어
    if (reminderTimeout) {
      clearTimeout(reminderTimeout)
    }

    // 5초 후 저장 알림 표시
    reminderTimeout = setTimeout(() => {
      if (hasUnsavedChanges.value) {
        showSaveReminder.value = true
      }
    }, 1000)
  }

  /**
   * 저장 알림 닫기
   * 목적: 사용자가 알림을 직접 닫을 수 있도록
   */
  const closeSaveReminder = () => {
    showSaveReminder.value = false
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

  // 저장 알림 토스트
  .save-reminder-toast {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 400px;
    max-width: 500px;
    padding: 16px;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border: 1px solid #e5e7eb;
    border-left: 4px solid #f59e0b;

    .toast-icon {
      flex-shrink: 0;
      color: #f59e0b;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .toast-content {
      flex: 1;
      min-width: 0;

      .toast-message {
        font-size: 14px;
        font-weight: 500;
        color: #374151;
        line-height: 1.4;
      }
    }

    .toast-close {
      flex-shrink: 0;
      background: none;
      border: none;
      cursor: pointer;
      color: #6b7280;
      padding: 4px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;

      &:hover {
        background-color: rgba(107, 114, 128, 0.1);
        color: #374151;
      }

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }

  // Toast 애니메이션
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
</style>
