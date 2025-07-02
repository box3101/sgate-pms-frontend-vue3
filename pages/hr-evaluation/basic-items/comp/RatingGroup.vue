<template>
  <div class="rating-scale-table-container">
    <UiTable
      v-model="ratingScaleGroupData"
      title="등급척도 그룹"
      editable
      sortable
      scrollable
      max-height="calc(100vh - 200px)"
      :canSave="false"
      @add-row="handleAddRow"
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
   * 자동저장 시스템 (백그라운드에서 조용히 실행)
   * 목적: 사용자가 인지하지 못하게 데이터 저장
   */
  let autoSaveTimeout = null

  /**
   * 디바운스 함수
   * 목적: 연속 편집 시 불필요한 API 호출 방지
   */
  const debounce = (func, delay) => {
    return (...args) => {
      clearTimeout(autoSaveTimeout)
      autoSaveTimeout = setTimeout(() => func(...args), delay)
    }
  }

  /**
   * 조용한 자동저장 (UI 변화 없음)
   * 목적: 백그라운드에서 데이터만 저장, 사용자에게 알리지 않음
   */
  const saveDataSilently = async () => {
    try {
      // 실제 API 호출
      // await $fetch('/api/rating-scales', {
      //   method: 'PUT',
      //   body: ratingScaleGroupData.value
      // })

      // 개발용 로그 (프로덕션에서는 제거)
      console.log('✅ 자동저장 완료')
    } catch (error) {
      console.error('❌ 저장 실패:', error)
      // 오류 시에도 UI는 건드리지 않음
      // 필요하다면 작은 토스트 하나 정도만
    }
  }

  /**
   * 2초 디바운스 자동저장
   * 목적: 편집 후 잠시 멈추면 자동 저장
   */
  const debouncedAutoSave = debounce(saveDataSilently, 2000)

  /**
   * 인라인 편집 상태 관리
   */
  const editingCell = ref({
    rowId: null,
    field: null
  })

  const editInput = ref(null)
  const originalValue = ref('')

  /**
   * 입력 변경 시 자동저장 트리거
   */
  const handleInputChange = () => {
    debouncedAutoSave()
  }

  /**
   * 편집 시작
   */
  const startEditing = async (rowId, field) => {
    const currentRow = ratingScaleGroupData.value.find(row => row.id === rowId)
    originalValue.value = currentRow[field]

    editingCell.value = { rowId, field }

    await nextTick()
    if (editInput.value?.[0]) {
      editInput.value[0].focus()
    }
  }

  const handleAddRow = async newRow => {
    // DOM 업데이트 대기
    await nextTick()

    // 새로 추가된 행을 바로 편집 모드로 전환
    if (newRow && newRow.id) {
      startEditing(newRow.id, 'name')
    }
  }

  /**
   * 편집 종료 (즉시 저장)
   */
  const stopEditing = () => {
    editingCell.value = { rowId: null, field: null }
    // 편집 완료 시 디바운스 무시하고 즉시 저장
    saveDataSilently()
  }

  /**
   * 편집 취소
   */
  const cancelEditing = () => {
    const currentRow = ratingScaleGroupData.value.find(row => row.id === editingCell.value.rowId)
    if (currentRow && editingCell.value.field) {
      currentRow[editingCell.value.field] = originalValue.value
    }
    editingCell.value = { rowId: null, field: null }
  }

  const handleEditRatingCount = row => {
    emit('row-selected', row)
  }

  /**
   * 테이블 헤더 정의
   */
  const tableHeaders = ref([
    { key: 'name', title: '등급척도' },
    { key: 'ratingCount', title: '평가등급수' }
  ])

  /**
   * 등급척도 그룹 데이터
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
      border: 1px solid #2563eb;

      input {
        font-size: 14px;
      }
    }
  }
</style>
