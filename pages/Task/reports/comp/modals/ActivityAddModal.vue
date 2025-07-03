<template>
  <UiModal title="활동추가" v-model="isOpen" size="xlarge">
    <template #headerActions-right>
      <UiButton variant="primary" @click="handleAddActivities">
        <i class="icon icon-md icon-create icon-white"></i>
        추가
      </UiButton>
    </template>

    <!-- 활동 필터 헤더 -->
    <div class="activity-header com-header flex gap-30 items-center">
      <!-- 날짜 선택 영역 -->
      <div class="activity-header__date-section">
        <UiDatePicker v-model="activityDateRange" isRange />
      </div>

      <!-- 라디오 버튼 영역 -->
      <div class="activity-header__radio-section">
        <div class="activity-header__radio-group flex gap-10">
          <UiRadio
            v-model="activityFilterType"
            value="activity"
            label="활동일"
            name="activityFilter"
          />
          <UiRadio
            v-model="activityFilterType"
            value="created"
            label="작성일"
            name="activityFilter"
          />
        </div>
      </div>

      <!-- 체크박스 필터 영역 -->
      <div class="activity-header__checkbox-section flex gap-10">
        <UiCheckbox v-model="filterMyActivitiesOnly">나의 활동만 가져오기</UiCheckbox>
        <UiCheckbox v-model="filterIncludeFeedback">피드백도 포함해서 가져오기</UiCheckbox>
      </div>
    </div>

    <!-- 활동 목록 테이블 -->
    <div class="activity-content mt-20">
      <UiTable
        title="업무 활동 목록"
        v-model="localActivityList"
        hover
        striped
        scrollable
        bordered
        :cursor-pointer="true"
        maxHeight="calc(100vh - 220px)"
      >
        <template #colgroup>
          <col style="width: 40px" />
          <col
            v-for="(column, index) in activityColumns"
            :key="index"
            :style="column.width ? `width: ${column.width}` : ''"
          />
        </template>

        <!-- 테이블 헤더: 전체 선택 체크박스 포함 -->
        <template #header>
          <tr>
            <th class="text-center" style="width: 40px">
              <UiCheckbox
                :modelValue="isAllSelected"
                @update:modelValue="handleSelectAll"
                size="large"
              />
            </th>
            <th
              v-for="(column, index) in activityColumns"
              :key="index"
              :class="column.align ? `text-${column.align}` : 'text-center'"
            >
              {{ column.title }}
            </th>
          </tr>
        </template>

        <!-- 테이블 바디: 개별 선택 기능 -->
        <template #body="{ rows }">
          <tr
            v-for="(item, index) in rows"
            :key="item.id"
            @click="handleRowClick(item)"
            :class="{ selected: selectedItems.includes(item.id) }"
          >
            <td class="text-center">
              <UiCheckbox
                :modelValue="selectedItems.includes(item.id)"
                @update:modelValue="handleItemSelect(item)"
                size="large"
                @click.stop
              />
            </td>
            <td
              v-for="(column, colIndex) in activityColumns"
              :key="colIndex"
              :class="column.align ? `text-${column.align}` : 'text-center'"
            >
              <span class="cell-content">{{ item[column.key] }}</span>
            </td>
          </tr>
        </template>
      </UiTable>
    </div>
  </UiModal>
</template>

<script setup>
  import { ref, computed, watch } from 'vue'

  // Props
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    activityList: {
      type: Array,
      required: true
    }
  })

  // Emits
  const emit = defineEmits(['update:modelValue', 'add-activities'])

  // v-model 처리
  const isOpen = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value)
  })

  // 로컬 활동 목록
  const localActivityList = ref([...props.activityList])

  // 필터 데이터
  const activityDateRange = ref([null, null])
  const activityFilterType = ref('activity')
  const filterMyActivitiesOnly = ref(false)
  const filterIncludeFeedback = ref(false)

  // 선택된 아이템들
  const selectedItems = ref([])

  // 활동 목록 테이블 컬럼 설정
  const activityColumns = ref([
    { key: 'board', title: '보드', width: '150px', align: 'center' },
    { key: 'task', title: '업무', width: 'auto', align: 'center' },
    { key: 'activityDate', title: '활동일자', width: '120px', align: 'center' },
    { key: 'content', title: '활동내용', width: 'auto', align: 'left' },
    { key: 'author', title: '작성자', width: '80px', align: 'center' },
    { key: 'createdAt', title: '작성일자', width: '120px', align: 'center' }
  ])

  // 전체 선택 상태 계산
  const isAllSelected = computed(() => {
    return (
      localActivityList.value.length > 0 &&
      selectedItems.value.length === localActivityList.value.length
    )
  })

  // 이벤트 핸들러
  const handleSelectAll = isSelected => {
    if (isSelected) {
      selectedItems.value = localActivityList.value.map(item => item.id)
    } else {
      selectedItems.value = []
    }
  }

  const handleItemSelect = item => {
    const index = selectedItems.value.indexOf(item.id)
    if (index > -1) {
      selectedItems.value.splice(index, 1)
    } else {
      selectedItems.value.push(item.id)
    }
  }

  const handleRowClick = item => {
    handleItemSelect(item)
  }

  const handleAddActivities = () => {
    const selectedActivities = localActivityList.value.filter(item =>
      selectedItems.value.includes(item.id)
    )
    emit('add-activities', selectedActivities)
  }

  // props 변경 감지
  watch(
    () => props.activityList,
    newList => {
      localActivityList.value = [...newList]
      selectedItems.value = [] // 목록 변경 시 선택 초기화
    },
    { deep: true }
  )
</script>

<style lang="scss" scoped>
  /**
 * 활동추가 모달 스타일
 * 목적: 테이블과 필터 UI의 시각적 일관성 제공
 */
  .activity-header {
    background-color: #f8fafc;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #e2e8f0;

    &__date-section {
      flex-shrink: 0;
    }

    &__radio-section {
      flex-shrink: 0;
    }

    &__checkbox-section {
      flex: 1;
      justify-content: flex-start;
    }

    &__radio-group {
      align-items: center;
    }
  }

  .activity-content {
    // 테이블 내용 영역 기본 스타일

    :deep(.ui-table) {
      // 체크박스 컬럼 스타일
      .row-checkbox {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      }

      // 셀 내용 스타일
      .cell-content {
        display: inline-block;
        word-break: break-word;
        line-height: 1.4;
      }

      // 선택된 행 스타일 강화
      tr.selected {
        background-color: #e3f2fd !important;

        td {
          background-color: #e3f2fd !important;
        }

        &:hover {
          background-color: #bbdefb !important;

          td {
            background-color: #bbdefb !important;
          }
        }
      }

      // 헤더 정렬 강화
      th {
        &.text-center {
          text-align: center;
        }
        &.text-left {
          text-align: left;
        }
        &.text-right {
          text-align: right;
        }
      }

      // 데이터 셀 정렬 강화
      td {
        &.text-center {
          text-align: center;
        }
        &.text-left {
          text-align: left;
        }
        &.text-right {
          text-align: right;
        }
      }
    }
  }

  // 반응형 스타일
  @media (max-width: 768px) {
    .activity-header {
      flex-direction: column;
      gap: 1rem !important;
      align-items: stretch !important;

      &__date-section,
      &__radio-section,
      &__checkbox-section {
        width: 100%;
      }

      &__checkbox-section {
        flex-direction: column;
        gap: 0.5rem;
      }
    }
  }
</style>
