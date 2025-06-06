<template>
  <div class="page-container">
    <div class="page-header">
      <div class="header-left">
        <div class="select-group">
          <div class="select-item">
            <span class="select-label">기준년도</span>
            <UiSelect
              v-model="selectedYear"
              :options="yearOptions"
              size="medium"
              placeholder="선택"
              width="150px"
            />
          </div>
        </div>
      </div>
      <div class="header-right">
        <div class="button-group">
          <UiButton type="button" variant="secondary-line" size="medium">
            검색
            <i class="icon-md icon-search"></i>
          </UiButton>
        </div>
      </div>
    </div>

    <div class="flex-container">
      <!-- 왼쪽: 템플릿 목록 -->
      <div class="w-40p">
        <UiTable
          scrollable
          :max-height="'calc(100vh - 180px)'"
          title="성과기술서 템플릿"
          v-model="tableDataPerformance"
          editable
          hover
          @save="handleSave"
          :default-row-data="{
            name: '',
            type: '',
            startDate: '',
            endDate: '',
            isActive: true,
            isNewRow: true // 새 행 표시
          }"
        >
          <template #colgroup>
            <col style="width: 40px" v-if="useCheckbox" />
            <col style="width: auto" />
            <col style="width: 150px" />
            <col style="width: 80px" />
          </template>

          <template #header="{ selectAll, isAllSelected, sortable }">
            <tr>
              <th style="width: 40px" v-if="useCheckbox">
                <UiCheckbox
                  :modelValue="isAllSelected"
                  @update:modelValue="selectAll"
                  size="large"
                />
              </th>
              <th v-for="(column, index) in performanceColumns" :key="index">
                {{ column.title }}
              </th>
            </tr>
          </template>

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
              v-for="(item, index) in rows"
              :key="item.id"
              :class="{
                selected: isRowSelected(item) || selectedTemplate?.id === item.id,
                'sortable-row': sortable
              }"
              :draggable="sortable"
              @dragstart="e => handleDragStart(e, index)"
              @dragover="e => handleDragOver(e)"
              @drop="e => handleDrop(e, index)"
              @dragend="handleDragEnd"
            >
              <td v-if="useCheckbox">
                <div v-if="!sortable" class="row-checkbox">
                  <UiCheckbox
                    :modelValue="isRowSelected(item)"
                    @update:modelValue="toggleRowSelection(item)"
                    size="large"
                    @click.stop
                  />
                </div>
                <div v-else class="drag-handle">
                  <i class="icon-md icon-drag"></i>
                </div>
              </td>

              <td
                v-for="(column, colIndex) in performanceColumns"
                :key="colIndex"
                :class="column.align ? `text-${column.align}` : ''"
              >
                <UiInput
                  v-if="column.editable && column.type === 'input'"
                  v-model="item[column.key]"
                  size="large"
                  :placeholder="column.placeholder || ''"
                  @click.stop
                />
                <UiSelect
                  v-if="column.editable && column.type === 'select'"
                  v-model="item[column.key]"
                  size="large"
                  :options="templateTypeOptions"
                  :placeholder="column.placeholder || ''"
                  @click.stop
                />
                <UiButton
                  v-if="column.editable && column.type === 'button' && !item.isNewRow"
                  type="button"
                  variant="secondary-line"
                  icon-only
                  @click.stop="handleTemplateSelect(item)"
                >
                  <i class="icon-md icon-pencil icon-gray"></i>
                </UiButton>
              </td>
            </tr>
          </template>
        </UiTable>
      </div>

      <!-- 오른쪽: 선택된 템플릿 상세 또는 Empty State -->
      <div class="w-60p">
        <!-- 템플릿이 선택된 경우 -->
        <div v-if="selectedTemplate" class="template-detail">
          <div class="flex justify-between items-center mb-12">
            <div class="template-info">
              <h3>{{ selectedTemplate.name }}</h3>
            </div>
            <div class="action-buttons flex gap-8">
              <UiButton variant="secondary-line" size="large" @click="handlePreview">
                <i class="icon-md icon-eye"></i>
                미리보기
              </UiButton>
              <UiButton variant="secondary-line" size="large" @click="handleCopyTemplate">
                <i class="icon-md icon-copy"></i>
                템플릿 복사하기
              </UiButton>
              <UiButton variant="primary" size="large" @click="handleSaveTemplate">
                <i class="icon-md icon-save"></i>
                저장
              </UiButton>
            </div>
          </div>

          <!-- 템플릿 상세 내용 -->
          <div class="template-content scrollable-minus-14">
            <div class="content-section">
              <TinyEditor :height="'calc(100vh - 230px)'" />
            </div>
          </div>

          <!-- 성과기술서 작성기간 정보 섹션 -->
          <div class="writing-period-info mb-16 mt-16">
            <h4 class="text-md font-medium mb-2">성과기술서 작성기간</h4>
            <div class="period-dates flex items-center gap-2">
              <span class="date-label">{{ selectedTemplate.startDate }}</span>
              <span class="date-separator">~</span>
              <span class="date-label">{{ selectedTemplate.endDate }}</span>
              <UiTag variant="primary" size="small" class="ml-2">
                {{ selectedTemplate.isActive ? '진행중' : '마감' }}
              </UiTag>
            </div>
          </div>
        </div>

        <!-- Empty State: 템플릿이 선택되지 않은 경우 -->
        <div v-else class="empty-state">
          <div class="empty-content">
            <div class="empty-icon">
              <i class="icon-xl icon-document-text icon-gray-light"></i>
            </div>
            <h3 class="empty-title">템플릿을 선택해주세요</h3>
            <p class="empty-description">
              왼쪽 목록에서 성과기술서 템플릿을 선택하면<br />
              상세 정보와 편집 옵션을 확인할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'

  const logoText = inject('logoText')
  logoText.value = '성과기술서템플릿'

  // 반응형 데이터
  const useCheckbox = ref(true)
  const selectedTemplate = ref(null)
  const selectedYear = ref('')

  // 템플릿 타입 옵션
  const templateTypeOptions = [
    { value: '일반', label: '일반' },
    { value: '영업', label: '영업' },
    { value: '연구', label: '연구' }
  ]

  // 년도 옵션 (예시)
  const yearOptions = computed(() => {
    const currentYear = new Date().getFullYear()
    return Array.from({ length: 5 }, (_, i) => ({
      value: currentYear - i,
      label: `${currentYear - i}년`
    }))
  })

  // 테이블 컬럼 정의
  const performanceColumns = ref([
    {
      key: 'name',
      title: '성과기술서 템플릿',
      editable: true,
      type: 'input',
      align: '',
      placeholder: '템플릿명을 입력해주세요'
    },
    {
      key: 'type',
      title: '형식',
      editable: true,
      type: 'select',
      align: 'center',
      placeholder: '형식'
    },
    {
      key: 'edit',
      title: '편집',
      editable: true,
      type: 'button',
      align: 'center'
    }
  ])

  // 테이블 데이터 (실제로는 API에서 가져올 것)
  const tableDataPerformance = ref([
    {
      id: 1,
      name: '성과기술서 템플릿 1',
      type: '일반',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: true
    },
    {
      id: 2,
      name: '성과기술서 템플릿 2',
      type: '영업',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: false
    },
    {
      id: 3,
      name: '성과기술서 템플릿 3',
      type: '연구',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: false
    },
    {
      id: 4,
      name: '영업 성과 관리 템플릿',
      type: '영업',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: false
    },
    {
      id: 5,
      name: '연구개발 성과 평가 템플릿',
      type: '연구',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: false
    },
    {
      id: 6,
      name: '일반직무 성과평가 템플릿',
      type: '일반',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: false
    },
    // 추가 템플릿 데이터
    {
      id: 7,
      name: '프로젝트 성과 평가 템플릿',
      type: '일반',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: false
    },
    {
      id: 8,
      name: '관리자용 성과 평가 템플릿',
      type: '일반',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: false
    },
    {
      id: 9,
      name: '신입사원 성과 평가 템플릿',
      type: '일반',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: false
    },
    {
      id: 10,
      name: '해외 영업 성과 템플릿',
      type: '영업',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: false
    },
    {
      id: 11,
      name: '국내 영업 성과 템플릿',
      type: '영업',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: false
    },
    {
      id: 12,
      name: 'R&D 성과 평가 템플릿',
      type: '연구',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: false
    },
    {
      id: 13,
      name: '제품 개발 성과 평가 템플릿',
      type: '연구',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: false
    },
    {
      id: 14,
      name: '마케팅 성과 평가 템플릿',
      type: '일반',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: false
    },
    {
      id: 15,
      name: '인사팀 성과 평가 템플릿',
      type: '일반',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: false
    },
    {
      id: 16,
      name: '재무팀 성과 평가 템플릿',
      type: '일반',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: false
    },
    {
      id: 17,
      name: '고객 서비스 성과 평가 템플릿',
      type: '일반',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: false
    },
    {
      id: 18,
      name: '품질 관리 성과 평가 템플릿',
      type: '일반',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: false
    },
    {
      id: 19,
      name: '생산직 성과 평가 템플릿',
      type: '일반',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: false
    },
    {
      id: 20,
      name: '상품 기획 성과 평가 템플릿',
      type: '일반',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: false
    }
  ])

  const handleTemplateSelect = template => {
    selectedTemplate.value = template
  }

  // 초기 데이터 로딩 시 첫번째 템플릿 자동 선택
  const initializeSelection = () => {
    if (tableDataPerformance.value.length > 0 && !selectedTemplate.value) {
      console.log('초기 로딩: 첫번째 템플릿 자동 선택')
      handleTemplateSelect(tableDataPerformance.value[0])
    }
  }

  // 컴포넌트 마운트 후 초기화
  onMounted(() => {
    initializeSelection()
  })
</script>

<style scoped>
  .flex-container {
    display: flex;
    height: calc(100vh - 180px);
  }

  .w-40p {
    width: 40%;
  }

  .w-60p {
    width: 60%;
  }

  /* Empty State 스타일 */
  .empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: #fafafa;
    border-radius: 8px;
    border: 1px dashed #d1d5db;
  }

  .empty-content {
    text-align: center;
    max-width: 400px;
  }

  .empty-icon {
    margin-bottom: 1.5rem;
  }

  .empty-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
  }

  .empty-description {
    color: #6b7280;
    margin-bottom: 2rem;
    line-height: 1.5;
  }

  .empty-actions {
    display: flex;
    justify-content: center;
  }
</style>
