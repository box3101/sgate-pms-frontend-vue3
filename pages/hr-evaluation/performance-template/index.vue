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
          @save="handleSaveClick"
          @row-added="handleRowAdded"
          :default-row-data="defaultRowData"
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
              @click="!sortable && toggleRowSelection(item)"
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

        <!-- UiConfirm 다이얼로그 -->
        <UiConfirm
          v-model="showSaveConfirm"
          type="info"
          title="저장 확인"
          message="변경사항을 저장하시겠습니까?<br/>새로 추가된 행도 함께 저장됩니다."
          confirm-button-text="저장"
          cancel-button-text="취소"
          @confirm="handleConfirmSave"
          @cancel="handleCancelSave"
        />
      </div>

      <!-- 오른쪽: 선택된 템플릿 상세 또는 Empty State -->
      <div class="w-60p">
        <!-- 템플릿이 선택된 경우  -->
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

          <!-- 템플릿 상세 내용 (상하반기(양식) or 상하반기(항목)) -->
          <div v-if="selectedTemplate.type === '양식'" class="template-content scrollable-minus-14">
            <div class="content-section">
              <TinyEditor :height="'calc(100vh - 230px)'" />
            </div>
          </div>

          <div v-else class="template-content">
            <div class="content-section">
              <UiTable
                v-model="currentTemplateItems"
                @update:model-value="updateCurrentTemplateItems"
                hover
                scrollable
                editable
                :max-height="'calc(100vh - 270px)'"
                :canSave="false"
                :default-row-data="{
                  name: '',
                  type: '',
                  isRequired: false,
                  guidance: ''
                }"
              >
                <template #header="{ selectAll, isAllSelected }">
                  <tr>
                    <th>
                      <UiCheckbox
                        :modelValue="isAllSelected"
                        @update:modelValue="selectAll"
                        size="large"
                      />
                    </th>
                    <th v-for="(column, index) in performanceColumnsItem" :key="index">
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
                  <tr v-for="(item, index) in rows" :key="index" @click="toggleRowSelection(item)">
                    <td>
                      <UiCheckbox :modelValue="isRowSelected(item)" size="large" />
                    </td>
                    <td v-for="(column, colIndex) in performanceColumnsItem" :key="colIndex">
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
                      <UiCheckbox
                        v-if="column.editable && column.type === 'checkbox'"
                        v-model="item[column.key]"
                        size="large"
                        @click.stop
                      />
                      <span v-if="!column.editable">{{ item[column.key] }}</span>
                    </td>
                  </tr>
                </template>
              </UiTable>
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
  const showSaveConfirm = ref(false)
  const pendingSaveData = ref(null)
  const hasNewRows = ref(false)

  // 기본 행 데이터
  const defaultRowData = {
    name: '',
    type: '',
    startDate: '',
    endDate: '',
    isActive: true,
    isNewRow: true // 새 행 표시용 플래그
  }

  // 템플릿 타입 옵션
  const templateTypeOptions = [
    { value: '양식', label: '양식' },
    { value: '항목정의', label: '항목정의' }
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

  // 상하반기(항목) 컬럼 정의
  const performanceColumnsItem = ref([
    {
      key: 'name',
      title: '항목명',
      editable: true,
      type: 'input',
      align: '',
      placeholder: '항목명을 입력해주세요'
    },
    {
      key: 'type',
      title: '입력형태',
      editable: true,
      type: 'select',
      align: 'center',
      placeholder: '입력형태'
    },
    {
      key: 'isRequired',
      title: '필수여부',
      editable: true,
      type: 'checkbox',
      align: 'center'
    },
    {
      key: 'guidance',
      title: '작성가이드',
      editable: true,
      type: 'input',
      align: '',
      placeholder: '작성가이드를 입력해주세요'
    }
  ])

  // 테이블 데이터 (실제로는 API에서 가져올 것)
  const tableDataPerformance = ref([
    {
      id: 1,
      name: '상하반기(양식)',
      type: '양식',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: true
    },
    {
      id: 2,
      name: '상하반기(항목)',
      type: '항목정의',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: false
    },
    {
      id: 3,
      name: '하반기(양식)',
      type: '양식',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: false
    },
    {
      id: 4,
      name: '영업 성과 관리 템플릿',
      type: '양식',
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
      name: '양식직무 성과평가 템플릿',
      type: '양식',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: false
    },
    // 추가 템플릿 데이터
    {
      id: 7,
      name: '프로젝트 성과 평가 템플릿',
      type: '양식',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      isActive: false
    },
    {
      id: 8,
      name: '관리자용 성과 평가 템플릿',
      type: '양식',
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

  // 템플릿별 항목 데이터 관리
  const templateItemsData = ref({
    // 템플릿 ID별로 데이터 저장
    1: [
      // 상하반기(양식) - ID 1
      {
        id: 1,
        name: '상반기 목표',
        type: '텍스트',
        isRequired: true,
        guidance: '상반기 목표를 입력하세요'
      },
      {
        id: 2,
        name: '하반기 목표',
        type: '텍스트',
        isRequired: true,
        guidance: '하반기 목표를 입력하세요'
      }
    ],
    2: [
      // 상하반기(항목) - ID 2
      {
        id: 1,
        name: '프로젝트 성과',
        type: '숫자',
        isRequired: true,
        guidance: '프로젝트 완료 건수'
      },
      { id: 2, name: '매출 성과', type: '숫자', isRequired: false, guidance: '매출 달성률(%)' }
    ],
    3: [
      // 하반기(양식) - ID 3
      {
        id: 1,
        name: '하반기 성과',
        type: '텍스트',
        isRequired: true,
        guidance: '하반기 성과를 입력하세요'
      }
    ]
    // 다른 템플릿들도 필요시 추가
  })

  // 현재 선택된 템플릿의 항목 데이터를 반환하는 computed
  const currentTemplateItems = computed(() => {
    if (!selectedTemplate.value || !selectedTemplate.value.id) {
      return []
    }

    // 해당 템플릿의 데이터가 없으면 빈 배열 반환
    return templateItemsData.value[selectedTemplate.value.id] || []
  })

  // 현재 템플릿의 항목 데이터 업데이트 함수
  const updateCurrentTemplateItems = newItems => {
    if (!selectedTemplate.value || !selectedTemplate.value.id) {
      return
    }

    templateItemsData.value[selectedTemplate.value.id] = newItems
  }

  // 새 템플릿이 선택될 때 데이터 초기화
  const handleTemplateSelect = template => {
    selectedTemplate.value = template

    // 해당 템플릿의 데이터가 없으면 기본 데이터 생성
    if (!templateItemsData.value[template.id]) {
      templateItemsData.value[template.id] = [
        {
          id: generateUniqueId(),
          name: '',
          type: '',
          isRequired: false,
          guidance: ''
        }
      ]
    }
  }

  // 템플릿별 항목 저장 함수
  const handleSaveTemplateItems = () => {
    if (!selectedTemplate.value) {
      alert('템플릿을 선택해주세요.')
      return
    }

    console.log(`템플릿 "${selectedTemplate.value.name}"의 항목 저장:`, currentTemplateItems.value)

    // 여기서 API 호출 등 실제 저장 로직 구현
    alert(`${selectedTemplate.value.name}의 항목이 저장되었습니다!`)
  }

  // 초기 데이터 로딩 시 첫번째 템플릿 자동 선택
  const initializeSelection = () => {
    if (tableDataPerformance.value.length > 0 && !selectedTemplate.value) {
      console.log('초기 로딩: 첫번째 템플릿 자동 선택')
      handleTemplateSelect(tableDataPerformance.value[0])
    }
  }

  // handleSaveClick
  const handleSaveClick = tableData => {
    console.log('handleSaveClick')

    // 저장할 데이터를 임시저장
    pendingSaveData.value = tableData

    // 확인 모달 표시
    showSaveConfirm.value = true
  }

  // 사용자가 저장
  const handleConfirmSave = () => {
    console.log('저장 확인됨:', pendingSaveData.value)

    // 새행 플로그 제거 (실제 저장된 것으로 처리)
    tableDataPerformance.value.forEach(row => {
      if (row.isNewRow === true) {
        delete row.isNewRow // 플래그 제거
        console.log('새 행 저장 완료:', row.name)
      }
    })

    // 상태 초기화
    showSaveConfirm.value = false
    pendingSaveData.value = null

    alert('저장이 완료되었습니다!')
  }

  // 새 행 추가 처리
  const handleRowAdded = newRow => {
    newRow.id = generateUniqueId()
    newRow.isNewRow = true

    const currentDate = new Date().toISOString().split('T')[0]
    newRow.startDate = newRow.startDate || currentDate
    newRow.endDate = newRow.endDate || `${new Date().getFullYear()}-12-31`

    console.log('새 행 추가됨:', newRow)
  }

  // 고유 ID 생성 함수
  const generateUniqueId = () => {
    return `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // 우측 상세 화면 버튼 핸들러들
  const handlePreview = () => {
    console.log('미리보기:', selectedTemplate.value)
  }

  const handleCopyTemplate = () => {
    const newTemplate = {
      ...selectedTemplate.value,
      id: generateUniqueId(),
      name: `${selectedTemplate.value.name} (복사본)`,
      isNewRow: true
    }
    tableDataPerformance.value.push(newTemplate)
    alert('템플릿이 복사되었습니다!')
  }

  const handleSaveTemplate = () => {
    console.log('템플릿 저장:', selectedTemplate.value)
    alert('템플릿 상세 내용이 저장되었습니다!')
  }

  const handleCancelSave = () => {
    console.log('저장 취소됨')

    // 상태만 초기화 (데이터는 변경하지 않음)
    showSaveConfirm.value = false
    pendingSaveData.value = null
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
