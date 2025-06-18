<template>
  <div class="page-container">
    <UiTabs :tabs="tabsData" v-model="activeTabId" @change="handleTabChange">
      <!-- 첫 번째 탭 - 평가 관리 -->
      <template #tab1>
        <div class="evaluation-container">
          <!-- 왼쪽 매니저 현황 -->
          <div class="manager-section w-30p">
            <div class="section-header">
              <h3>매니저현황</h3>
              <UiButton class="batch-complete-btn">일괄완료</UiButton>
            </div>

            <!-- 미등록 항목 -->
            <div class="unregistered-item">
              <div class="manager-info">
                <span class="manager-name"><strong>미등록</strong></span>
                <span class="manager-detail">전체</span>
              </div>
              <UiButton size="small" variant="ghost" icon-only>
                <i class="icon-md icon-search" />
              </UiButton>
            </div>
            <!-- 매니저 목록 테이블 -->
            <div class="manager-list">
              <div class="manager-header">
                <span class="manager-title">매니저</span>
                <div class="manager-stats">
                  <span class="stat-all">전체 {{ totalManagers }}</span>
                  <span class="stat-complete">완료 {{ completedManagers }}</span>
                  <span class="stat-incomplete">미완료 {{ incompleteManagers }}</span>
                </div>
                <UiButton size="small" variant="ghost" icon-only>
                  <i class="icon-md icon-search" />
                </UiButton>
              </div>

              <UiTable
                v-model="managers"
                :row-clickable="true"
                :row-click-cursor="true"
                @row-click="selectManager"
                class="manager-table"
              >
                <template #header>
                  <tr>
                    <th style="width: 120px">매니저</th>
                    <th>부서</th>
                    <th style="width: auto">건수</th>
                    <th style="width: 50px">상태</th>
                    <th style="width: 50px">조회</th>
                  </tr>
                </template>

                <template #body="{ rows, handleRowClick }">
                  <tr
                    v-for="(row, index) in rows"
                    :key="row.id"
                    :class="{ 'selected-row': selectedManagerId === row.id }"
                    @click="handleRowClick(row, index, $event)"
                  >
                    <td>
                      <span class="manager-name">{{ row.name }}</span>
                    </td>
                    <td>
                      <div class="manager-department" :title="row.department">
                        {{ row.department }}
                      </div>
                    </td>
                    <td class="text-center">{{ row.count }}</td>
                    <td class="text-center">
                      <span class="status-badge">{{ row.status }}</span>
                    </td>
                    <td class="text-center">
                      <UiButton size="small" variant="ghost" icon-only>
                        <i class="icon-md icon-search" />
                      </UiButton>
                    </td>
                  </tr>
                </template>
              </UiTable>
            </div>
          </div>

          <!-- 오른쪽 대상자 현황 -->
          <div class="target-section">
            <div class="section-header">
              <h3>대상자현황</h3>
              <UiButton class="excel-download-btn">엑셀다운로드</UiButton>
            </div>

            <!-- 필터 섹션 -->
            <div class="filter-section">
              <div class="filter-grid">
                <div class="filter-item">
                  <label>평가군</label>
                  <UiSelect
                    v-model="filters.evalGroup"
                    :options="evalGroupOptions"
                    placeholder="전체"
                  />
                </div>
                <div class="filter-item">
                  <label>미설정구분</label>
                  <UiSelect
                    v-model="filters.notSetType"
                    :options="notSetTypeOptions"
                    placeholder="선택안함"
                  />
                </div>
                <div class="filter-item">
                  <label>부서</label>
                  <UiSelect
                    v-model="filters.departments"
                    :options="departmentOptions"
                    multiple
                    placeholder="조회 및 선택 하세요"
                  />
                </div>
                <div class="filter-item">
                  <label>직위</label>
                  <UiSelect
                    v-model="filters.positions"
                    :options="positionOptions"
                    multiple
                    placeholder="조회 및 선택 하세요"
                  />
                </div>
                <div class="filter-item">
                  <label>직급</label>
                  <UiSelect
                    v-model="filters.grades"
                    :options="gradeOptions"
                    multiple
                    placeholder="조회 및 선택 하세요"
                  />
                </div>
                <div class="filter-item">
                  <label>직원</label>
                  <UiSelect
                    v-model="filters.employees"
                    :options="employeeOptions"
                    multiple
                    placeholder="조회 및 선택 하세요"
                  />
                </div>
              </div>

              <div class="filter-actions">
                <UiButton variant="primary" class="search-btn" @click="searchTargets">
                  <i class="ico ico-search"></i>
                  검색
                </UiButton>
              </div>
            </div>
            <!-- 대상자 테이블 -->
            <div class="target-table-container">
              <!-- 대상자 테이블 -->
              <div class="target-table-container">
                <UiTable
                  v-model="evaluationTargets"
                  :scrollable="true"
                  :max-height="'calc(100vh - 400px)'"
                  class="target-table"
                >
                  <template #header>
                    <tr>
                      <th style="width: 200px">평가대상</th>
                      <th style="width: 300px">부서</th>
                      <th style="width: 100px">매니저</th>
                      <th style="width: 100px">평가군</th>
                      <th style="width: 100px">1차 상급자 평가</th>
                      <th style="width: 100px">2차 상급자 평가</th>
                      <th style="width: 100px">3차 상급자 평가</th>
                      <th style="width: 100px">동료평가</th>
                      <th style="width: 100px">부하(상향) 평가</th>
                      <th style="width: 100px">성과평가비율</th>
                      <th style="width: 250px">역량평가비율</th>
                    </tr>
                  </template>

                  <template #body="{ rows }">
                    <tr v-for="(row, index) in rows" :key="row.id">
                      <td>
                        <span :title="row.name">{{ row.name }}</span>
                      </td>
                      <td>{{ row.department }}</td>
                      <td>{{ row.manager }}</td>
                      <td>{{ row.evalGroup }}</td>
                      <td>{{ row.firstEvaluator || '' }}</td>
                      <td>{{ row.secondEvaluator || '' }}</td>
                      <td>{{ row.thirdEvaluator || '' }}</td>
                      <td>{{ row.peerEvaluator || '' }}</td>
                      <td>{{ row.subordinateEvaluator || '' }}</td>
                      <td>
                        <div v-if="row.performanceRate" class="rate-info">
                          <div class="rate-badge rate-result">
                            <i class="ico ico-trending-up"></i>
                            결과
                          </div>
                          <div class="rate-value">{{ row.performanceRate }}%</div>
                        </div>
                      </td>
                      <td>
                        <div v-if="row.competencyRates" class="competency-info">
                          <div
                            v-for="rate in row.competencyRates"
                            :key="rate.type"
                            class="competency-item"
                          >
                            <div class="rate-badge rate-competency">
                              <i class="ico ico-star"></i>
                              {{ rate.type }}
                            </div>
                            <div class="rate-details">
                              <span class="rate-label">비율</span>
                              <span class="rate-value primary">{{ rate.ratio }}%</span>
                              <span class="rate-label">항목수</span>
                              <span class="rate-value secondary">{{ rate.itemCount }}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </template>
                </UiTable>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #tab2>
        <div class="tab-content">
          <h3>하반기 평가</h3>
          <p>하반기 평가 내용이 여기에 들어갑니다.</p>
        </div>
      </template>
    </UiTabs>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue'

  // 탭 데이터
  const tabsData = [
    { id: 'tab1', label: '상반기' },
    { id: 'tab2', label: '하반기' }
  ]

  const activeTabId = ref('tab1')

  // 선택된 매니저
  const selectedManagerId = ref('isp123')

  // 필터 상태
  const filters = ref({
    evalGroup: '',
    notSetType: '',
    departments: [],
    positions: [],
    grades: [],
    employees: []
  })

  // 매니저 테이블 컬럼 정의
  const managerColumns = [
    {
      key: 'name',
      title: '매니저',
      width: '80px',
      align: 'left'
    },
    {
      key: 'department',
      title: '부서',
      width: '*',
      align: 'left'
    },
    {
      key: 'count',
      title: '건수',
      width: '50px',
      align: 'center'
    },
    {
      key: 'status',
      title: '상태',
      width: '50px',
      align: 'center'
    },
    {
      key: 'actions',
      title: '',
      width: '50px',
      align: 'center'
    }
  ]

  // 대상자 테이블 컬럼 정의
  const targetColumns = [
    {
      key: 'name',
      title: '평가대상',
      width: '82px',
      align: 'left'
    },
    {
      key: 'department',
      title: '부서',
      width: '160px',
      align: 'left'
    },
    {
      key: 'manager',
      title: '매니저',
      width: '73px',
      align: 'left'
    },
    {
      key: 'evalGroup',
      title: '평가군',
      width: '165px',
      align: 'left'
    },
    {
      key: 'firstEvaluator',
      title: '1차 상급자 평가',
      width: '100px',
      align: 'left'
    },
    {
      key: 'secondEvaluator',
      title: '2차 상급자 평가',
      width: '100px',
      align: 'left'
    },
    {
      key: 'thirdEvaluator',
      title: '3차 상급자 평가',
      width: '100px',
      align: 'left'
    },
    {
      key: 'peerEvaluator',
      title: '동료평가',
      width: '100px',
      align: 'left'
    },
    {
      key: 'subordinateEvaluator',
      title: '부하(상향) 평가',
      width: '100px',
      align: 'left'
    },
    {
      key: 'performanceRate',
      title: '성과평가비율',
      width: '100px',
      align: 'left'
    },
    {
      key: 'competencyRate',
      title: '역량평가비율',
      width: '250px',
      align: 'left'
    }
  ]

  // 매니저 데이터
  const managers = ref([
    {
      id: 'isp123',
      name: '오승현',
      department: '(주)이즈파크',
      count: 4,
      status: '미완료'
    },
    {
      id: 'isp130',
      name: '김경수',
      department: '(주)이즈파크',
      count: 3,
      status: '미완료'
    },
    {
      id: 'isp131',
      name: '마진석',
      department: '(주)이즈파크',
      count: 3,
      status: '미완료'
    },
    {
      id: 'isp132',
      name: '오현정',
      department: '(주)이즈파크',
      count: 3,
      status: '미완료'
    },
    {
      id: 'isp134',
      name: '장호영',
      department: '경영지원팀>인사팀',
      count: 14,
      status: '미완료'
    },
    {
      id: 'isp135',
      name: '김도현',
      department: 'ESM 고객관리팀>공공클라우드 영업팀',
      count: 11,
      status: '미완료'
    },
    {
      id: 'isp136',
      name: '경영지원 팀장',
      department: '경영지원팀>내부경영지원부서',
      count: 2,
      status: '미완료'
    },
    {
      id: 'isp137',
      name: '도프로젝트기획',
      department: 'ESM 고객관리팀>영업1팀',
      count: 1,
      status: '미완료'
    },
    {
      id: 'isp138',
      name: '도강혁',
      department: 'OEM 생산부>신기술개발팀',
      count: 7,
      status: '미완료'
    },
    {
      id: 'isp139',
      name: '정프로젝트',
      department: 'OEM 생산부>프로젝트팀2',
      count: 1,
      status: '미완료'
    },
    {
      id: 'isp140',
      name: '곽디자인',
      department: 'OEM 생산부>프로젝트팀2',
      count: 1,
      status: '미완료'
    }
  ])

  // 평가 대상자 데이터
  const evaluationTargets = ref([
    {
      id: 'isp130',
      name: '김경수',
      department: '(주)이즈파크',
      manager: '오승현',
      evalGroup: '이즈파크 - 팀원',
      firstEvaluator: '김도현',
      secondEvaluator: '송기준',
      thirdEvaluator: '마진석',
      peerEvaluator: '',
      subordinateEvaluator: '',
      performanceRate: 70,
      competencyRates: [
        { type: '리더쉽', ratio: 25, itemCount: 2 },
        { type: '직무', ratio: 50, itemCount: 2 }
      ]
    },
    {
      id: 'isp147',
      name: '오현정',
      department: '(주)이즈파크',
      manager: '오승현',
      evalGroup: '이즈파크 - 팀원',
      firstEvaluator: '오승현',
      secondEvaluator: '',
      thirdEvaluator: '',
      peerEvaluator: '',
      subordinateEvaluator: '',
      performanceRate: 70,
      competencyRates: [
        { type: '리더쉽', ratio: 25, itemCount: 2 },
        { type: '직무', ratio: 50, itemCount: 2 }
      ]
    },
    {
      id: 'kjsong3',
      name: '송기준',
      department: '(주)이즈파크',
      manager: '오승현',
      evalGroup: '이즈파크 - 팀원',
      firstEvaluator: '오승현',
      secondEvaluator: '',
      thirdEvaluator: '',
      peerEvaluator: '',
      subordinateEvaluator: '',
      performanceRate: null,
      competencyRates: null
    },
    {
      id: 'isp133',
      name: '경영지원 팀장',
      department: '내부경영지원부서',
      manager: '오승현',
      evalGroup: '',
      firstEvaluator: '',
      secondEvaluator: '',
      thirdEvaluator: '',
      peerEvaluator: '',
      subordinateEvaluator: '',
      performanceRate: null,
      competencyRates: null
    }
  ])

  // 셀렉트 옵션들
  const evalGroupOptions = [
    { value: '', label: '전체' },
    { value: 'G000024', label: '이즈파크 - 영업' },
    { value: 'G000025', label: '이즈파크 - 팀원' },
    { value: 'G000026', label: '이즈파크 - 팀징' },
    { value: 'G000058', label: 'DSV 테스트' }
  ]

  const notSetTypeOptions = [
    { value: '', label: '선택안함' },
    { value: 'fir', label: '1차 상급자 평가' },
    { value: 'sec', label: '2차 상급자 평가' },
    { value: 'thr', label: '3차 상급자 평가' },
    { value: 'mate', label: '동료평가' },
    { value: 'jnr', label: '부하(상향) 평가' },
    { value: 'performRate', label: '성과평과비율 미설정' },
    { value: 'capaRate', label: '역량평가비율 미설정' },
    { value: 'capaItem', label: '역량평가항목 미설정' }
  ]

  const departmentOptions = ref([])
  const positionOptions = ref([])
  const gradeOptions = ref([])
  const employeeOptions = ref([])

  // 계산된 속성
  const totalManagers = computed(() => managers.value.length)
  const completedManagers = computed(() => managers.value.filter(m => m.status === '완료').length)
  const incompleteManagers = computed(
    () => managers.value.filter(m => m.status === '미완료').length
  )

  // 메서드
  const handleTabChange = tabId => {
    activeTabId.value = tabId
  }

  const selectManager = row => {
    selectedManagerId.value = row.id
    // 선택된 매니저에 따라 대상자 목록 필터링 로직 추가
  }

  const searchTargets = () => {
    // 검색 로직 구현
    console.log('검색 실행:', filters.value)
  }

  // 컴포넌트 마운트 시 초기 데이터 로드
  onMounted(() => {
    // 부서, 직위, 직급, 직원 옵션 데이터 로드
  })
</script>

<style scoped>
  .evaluation-container {
    display: flex;
    gap: 10px;
  }

  /* 매니저 섹션 */
  .manager-section {
    border-right: 1px solid #eaeaea;
    padding-right: 10px;
    display: flex;
    flex-direction: column;
  }

  .section-header {
    display: flex;
    justify-content: between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #eaeaea;
    margin-bottom: 10px;
  }

  .section-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
  }

  .batch-complete-btn {
    margin-left: auto;
  }

  .unregistered-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    background-color: #f6f7f9;
    margin-bottom: 15px;
  }

  .manager-info {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .manager-name {
    font-weight: bold;
    margin-bottom: 2px;
  }

  .manager-detail {
    font-size: 12px;
    color: #666;
  }

  .manager-list {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .manager-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    background-color: #f6f7f9;
    margin-bottom: 10px;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .manager-stats {
    display: flex;
    gap: 10px;
    font-size: 12px;
  }

  .stat-all {
    color: #666;
  }
  .stat-complete {
    color: #4caf50;
  }
  .stat-incomplete {
    color: #ff9800;
  }

  .manager-table {
    flex: 1;
    overflow: auto;
  }

  :deep(.manager-table .ui-table__row--selected) {
    background-color: #e3f2fd;
  }

  .manager-department {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 150px;
  }

  .status-badge {
    font-size: 12px;
    color: #ff9800;
  }

  /* 대상자 섹션 */
  .target-section {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .excel-download-btn {
    margin-left: auto;
  }

  /* 필터 섹션 */
  .filter-section {
    padding: 24px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 12px;
    margin-bottom: 16px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .filter-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px 12px;
    margin-bottom: 20px;
  }

  .filter-item {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .filter-item--wide {
    grid-column: span 2;
  }

  .filter-item label {
    font-size: 15px;
    font-weight: 500;
    color: #202124;
    margin-bottom: 4px;
    flex: none;
    /* width 제거 */
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
    margin-right: 8px; /* 라벨과 셀렉트 간격 조정 */
  }

  .filter-actions {
    display: flex;
    justify-content: flex-end;
    padding-top: 16px;
    border-top: 1px solid #e0e0e0;
  }

  .search-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 500;
    box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3);
    transition: all 0.2s ease;
    min-width: 100px;
    justify-content: center;
  }

  .search-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(25, 118, 210, 0.4);
  }

  /* Select 컴포넌트 전체 크기 조정 */
  :deep(.filter-section .ui-select) {
    width: 100%;
    font-size: 14px;
  }

  :deep(.filter-section .ui-select__control) {
    min-height: 42px;
    font-size: 14px;
  }

  :deep(.filter-section .ui-select__placeholder) {
    font-size: 14px;
  }

  :deep(.filter-section .ui-select__single-value) {
    font-size: 14px;
  }

  /* 반응형 필터 그리드 */
  @media (max-width: 1400px) {
    .filter-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px 20px;
    }

    .filter-item--wide {
      grid-column: span 1;
    }
  }

  @media (max-width: 1000px) {
    .filter-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .filter-item--wide {
      grid-column: span 1;
    }
  }
  /* 대상자 테이블 */
  .target-table-container {
    flex: 1;
    overflow: auto;
  }

  /* 테이블 내 컨텐츠 스타일 */
  .rate-info {
    line-height: 1.8;
  }

  .rate-info .label {
    background-color: #e3f2fd;
    padding: 2px 4px;
    border-radius: 2px;
    font-size: 11px;
    margin-right: 4px;
  }

  .rate-info .value {
    font-weight: bold;
  }

  .competency-info {
    line-height: 1.8;
  }

  .rate-item {
    margin-bottom: 4px;
  }

  .rate-item .label {
    background-color: #e3f2fd;
    padding: 2px 4px;
    border-radius: 2px;
    font-size: 11px;
    margin-right: 4px;
  }

  .rate-item .text {
    font-size: 11px;
    color: #666;
    margin: 0 2px;
  }

  .rate-item .value {
    color: #1976d2;
    font-weight: bold;
    margin-right: 4px;
  }

  .no-eval-group {
    color: #aaa;
    font-style: italic;
  }

  /* 탭 컨텐츠 커스터마이징 */
  :deep(.ui-tabs__content) {
    padding: 20px;
    padding-left: 0;
    padding-right: 0;
    overflow: hidden;
  }

  :deep(.ui-tabs__nav-item) {
    max-width: 100px;
  }
</style>
