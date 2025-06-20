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
                :scrollable="true"
                :max-height="'calc(100vh - 300px)'"
              >
                <template #colgroup>
                  <colgroup>
                    <col style="width: 120px" />
                    <col style="width: auto" />
                    <col style="width: 60px" />
                    <col style="width: 50px" />
                  </colgroup>
                </template>

                <template #header>
                  <tr>
                    <th>매니저</th>
                    <th>부서</th>
                    <th>건수</th>
                    <th>상태</th>
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
              <div class="filter-header">
                <h3 class="filter-title">검색 조건</h3>
                <div class="filter-toggle">
                  <UiButton variant="ghost" size="small" @click="toggleExpanded">
                    <i
                      class="icon-sm"
                      :class="isExpanded ? 'icon-chevron-up' : 'icon-chevron-down'"
                    ></i>
                    {{ isExpanded ? '접기' : '더보기' }}
                  </UiButton>
                </div>
              </div>

              <div class="filter-grid" v-show="isExpanded">
                <div class="filter-item">
                  <label>직위</label>
                  <UiSelect
                    v-model="filters.positions"
                    :options="positionOptions"
                    multiple
                    placeholder="조회 및 선택 하세요"
                    size="small"
                  />
                </div>
                <div class="filter-item">
                  <label>직급</label>
                  <UiSelect
                    v-model="filters.grades"
                    :options="gradeOptions"
                    multiple
                    placeholder="조회 및 선택 하세요"
                    size="small"
                  />
                </div>
                <div class="filter-item">
                  <label>직무</label>
                  <UiSelect
                    v-model="filters.jobs"
                    :options="jobOptions"
                    multiple
                    placeholder="조회 및 선택 하세요"
                    size="small"
                  />
                </div>
                <div class="filter-item">
                  <label>부서</label>
                  <UiSelect
                    v-model="filters.departments"
                    :options="departmentOptions"
                    multiple
                    placeholder="조회 및 선택 하세요"
                    size="small"
                  />
                </div>
                <div class="filter-item">
                  <label>직원</label>
                  <UiSelect
                    v-model="filters.employees"
                    :options="employeeOptions"
                    multiple
                    placeholder="조회 및 선택 하세요"
                    size="small"
                  />
                </div>
              </div>

              <div class="filter-actions">
                <div class="filter-result-info">
                  <span class="result-count">총 {{ totalCount }}건</span>
                  <span class="active-filters" v-if="activeFilterCount > 0">
                    ({{ activeFilterCount }}개 조건 적용)
                  </span>
                </div>
                <div class="button-group">
                  <UiButton variant="secondary-line" size="medium" @click="handleReset">
                    <i class="icon-sm icon-refresh"></i>
                    초기화
                  </UiButton>
                  <UiButton variant="primary" size="medium" @click="handleSearch">
                    <i class="icon-sm icon-search icon-white"></i>
                    검색
                  </UiButton>
                </div>
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
                  <template #colgroup>
                    <colgroup>
                      <col style="width: 200px" />
                      <col style="width: 300px" />
                      <col style="width: 100px" />
                      <col style="width: 100px" />
                      <col style="width: 100px" />
                      <col style="width: 100px" />
                      <col style="width: 100px" />
                      <col style="width: 100px" />
                      <col style="width: 100px" />
                      <col style="width: 100px" />
                      <col style="width: 250px" />
                    </colgroup>
                  </template>

                  <template #header>
                    <tr>
                      <th>평가대상</th>
                      <th>부서</th>
                      <th>매니저</th>
                      <th>평가군</th>
                      <th>1차 상급자 평가</th>
                      <th>2차 상급자 평가</th>
                      <th>3차 상급자 평가</th>
                      <th>동료평가</th>
                      <th>부하(상향) 평가</th>
                      <th>성과평가비율</th>
                      <th>역량평가비율</th>
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
    },
    {
      id: 'isp141',
      name: '이영희',
      department: '마케팅팀>디지털마케팅팀',
      count: 8,
      status: '완료'
    },
    {
      id: 'isp142',
      name: '박민수',
      department: '개발팀>프론트엔드팀',
      count: 12,
      status: '미완료'
    },
    {
      id: 'isp143',
      name: '최지원',
      department: '개발팀>백엔드팀',
      count: 9,
      status: '완료'
    },
    {
      id: 'isp144',
      name: '정수연',
      department: '디자인팀>UI/UX팀',
      count: 6,
      status: '미완료'
    },
    {
      id: 'isp145',
      name: '김태현',
      department: '품질관리팀>QA팀',
      count: 5,
      status: '완료'
    },
    {
      id: 'isp146',
      name: '송미영',
      department: '고객서비스팀>CS팀',
      count: 10,
      status: '미완료'
    },
    {
      id: 'isp147',
      name: '윤성호',
      department: '영업팀>기업영업팀',
      count: 15,
      status: '미완료'
    },
    {
      id: 'isp148',
      name: '한지수',
      department: '재무팀>회계팀',
      count: 4,
      status: '완료'
    },
    {
      id: 'isp149',
      name: '조현우',
      department: '법무팀>계약관리팀',
      count: 3,
      status: '미완료'
    },
    {
      id: 'isp150',
      name: '신예린',
      department: '전략기획팀>사업기획팀',
      count: 7,
      status: '완료'
    },
    {
      id: 'isp151',
      name: '강동훈',
      department: '운영팀>시스템운영팀',
      count: 11,
      status: '미완료'
    },
    {
      id: 'isp152',
      name: '임소희',
      department: '교육팀>인재개발팀',
      count: 6,
      status: '완료'
    },
    {
      id: 'isp153',
      name: '배준호',
      department: '보안팀>정보보안팀',
      count: 8,
      status: '미완료'
    },
    {
      id: 'isp154',
      name: '류지은',
      department: '구매팀>자재구매팀',
      count: 5,
      status: '완료'
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
    },
    {
      id: 'emp001',
      name: '이영희',
      department: '마케팅팀>디지털마케팅팀',
      manager: '박민수',
      evalGroup: '마케팅 - 팀원',
      firstEvaluator: '박민수',
      secondEvaluator: '최지원',
      thirdEvaluator: '',
      peerEvaluator: '정수연',
      subordinateEvaluator: '',
      performanceRate: 85,
      competencyRates: [
        { type: '창의성', ratio: 30, itemCount: 3 },
        { type: '커뮤니케이션', ratio: 40, itemCount: 4 }
      ]
    },
    {
      id: 'emp002',
      name: '박민수',
      department: '개발팀>프론트엔드팀',
      manager: '최지원',
      evalGroup: '개발 - 팀장',
      firstEvaluator: '최지원',
      secondEvaluator: '김태현',
      thirdEvaluator: '송미영',
      peerEvaluator: '정수연',
      subordinateEvaluator: '이영희',
      performanceRate: 90,
      competencyRates: [
        { type: '기술역량', ratio: 50, itemCount: 5 },
        { type: '리더쉽', ratio: 30, itemCount: 3 }
      ]
    },
    {
      id: 'emp003',
      name: '최지원',
      department: '개발팀>백엔드팀',
      manager: '윤성호',
      evalGroup: '개발 - 팀장',
      firstEvaluator: '윤성호',
      secondEvaluator: '한지수',
      thirdEvaluator: '',
      peerEvaluator: '박민수',
      subordinateEvaluator: '정수연',
      performanceRate: 88,
      competencyRates: [
        { type: '기술역량', ratio: 45, itemCount: 4 },
        { type: '문제해결', ratio: 35, itemCount: 3 }
      ]
    },
    {
      id: 'emp004',
      name: '정수연',
      department: '디자인팀>UI/UX팀',
      manager: '김태현',
      evalGroup: '디자인 - 팀원',
      firstEvaluator: '김태현',
      secondEvaluator: '송미영',
      thirdEvaluator: '',
      peerEvaluator: '이영희',
      subordinateEvaluator: '',
      performanceRate: 82,
      competencyRates: [
        { type: '창의성', ratio: 40, itemCount: 4 },
        { type: '협업', ratio: 30, itemCount: 3 }
      ]
    },
    {
      id: 'emp005',
      name: '김태현',
      department: '품질관리팀>QA팀',
      manager: '송미영',
      evalGroup: '품질관리 - 팀장',
      firstEvaluator: '송미영',
      secondEvaluator: '윤성호',
      thirdEvaluator: '한지수',
      peerEvaluator: '최지원',
      subordinateEvaluator: '정수연',
      performanceRate: 87,
      competencyRates: [
        { type: '분석력', ratio: 35, itemCount: 3 },
        { type: '꼼꼼함', ratio: 40, itemCount: 4 }
      ]
    },
    {
      id: 'emp006',
      name: '송미영',
      department: '고객서비스팀>CS팀',
      manager: '윤성호',
      evalGroup: '고객서비스 - 팀장',
      firstEvaluator: '윤성호',
      secondEvaluator: '한지수',
      thirdEvaluator: '조현우',
      peerEvaluator: '김태현',
      subordinateEvaluator: '신예린',
      performanceRate: 91,
      competencyRates: [
        { type: '고객지향', ratio: 45, itemCount: 5 },
        { type: '커뮤니케이션', ratio: 35, itemCount: 3 }
      ]
    },
    {
      id: 'emp007',
      name: '윤성호',
      department: '영업팀>기업영업팀',
      manager: '한지수',
      evalGroup: '영업 - 팀장',
      firstEvaluator: '한지수',
      secondEvaluator: '조현우',
      thirdEvaluator: '신예린',
      peerEvaluator: '송미영',
      subordinateEvaluator: '강동훈',
      performanceRate: 93,
      competencyRates: [
        { type: '영업력', ratio: 50, itemCount: 5 },
        { type: '협상력', ratio: 30, itemCount: 3 }
      ]
    },
    {
      id: 'emp008',
      name: '한지수',
      department: '재무팀>회계팀',
      manager: '조현우',
      evalGroup: '재무 - 팀원',
      firstEvaluator: '조현우',
      secondEvaluator: '신예린',
      thirdEvaluator: '',
      peerEvaluator: '윤성호',
      subordinateEvaluator: '',
      performanceRate: 86,
      competencyRates: [
        { type: '정확성', ratio: 45, itemCount: 4 },
        { type: '분석력', ratio: 35, itemCount: 3 }
      ]
    },
    {
      id: 'emp009',
      name: '조현우',
      department: '법무팀>계약관리팀',
      manager: '신예린',
      evalGroup: '법무 - 팀원',
      firstEvaluator: '신예린',
      secondEvaluator: '강동훈',
      thirdEvaluator: '',
      peerEvaluator: '한지수',
      subordinateEvaluator: '',
      performanceRate: 84,
      competencyRates: [
        { type: '전문성', ratio: 40, itemCount: 4 },
        { type: '신중함', ratio: 35, itemCount: 3 }
      ]
    },
    {
      id: 'emp010',
      name: '신예린',
      department: '전략기획팀>사업기획팀',
      manager: '강동훈',
      evalGroup: '기획 - 팀장',
      firstEvaluator: '강동훈',
      secondEvaluator: '임소희',
      thirdEvaluator: '배준호',
      peerEvaluator: '조현우',
      subordinateEvaluator: '류지은',
      performanceRate: 89,
      competencyRates: [
        { type: '기획력', ratio: 40, itemCount: 4 },
        { type: '통찰력', ratio: 35, itemCount: 3 }
      ]
    },
    {
      id: 'emp011',
      name: '강동훈',
      department: '운영팀>시스템운영팀',
      manager: '임소희',
      evalGroup: '운영 - 팀장',
      firstEvaluator: '임소희',
      secondEvaluator: '배준호',
      thirdEvaluator: '류지은',
      peerEvaluator: '신예린',
      subordinateEvaluator: '이영희',
      performanceRate: 88,
      competencyRates: [
        { type: '안정성', ratio: 45, itemCount: 4 },
        { type: '효율성', ratio: 30, itemCount: 3 }
      ]
    },
    {
      id: 'emp012',
      name: '임소희',
      department: '교육팀>인재개발팀',
      manager: '배준호',
      evalGroup: '교육 - 팀원',
      firstEvaluator: '배준호',
      secondEvaluator: '류지은',
      thirdEvaluator: '',
      peerEvaluator: '강동훈',
      subordinateEvaluator: '',
      performanceRate: 85,
      competencyRates: [
        { type: '교육역량', ratio: 40, itemCount: 4 },
        { type: '소통능력', ratio: 35, itemCount: 3 }
      ]
    },
    {
      id: 'emp013',
      name: '배준호',
      department: '보안팀>정보보안팀',
      manager: '류지은',
      evalGroup: '보안 - 팀원',
      firstEvaluator: '류지은',
      secondEvaluator: '이영희',
      thirdEvaluator: '',
      peerEvaluator: '임소희',
      subordinateEvaluator: '',
      performanceRate: 92,
      competencyRates: [
        { type: '보안전문성', ratio: 50, itemCount: 5 },
        { type: '위험관리', ratio: 30, itemCount: 3 }
      ]
    },
    {
      id: 'emp014',
      name: '류지은',
      department: '구매팀>자재구매팀',
      manager: '이영희',
      evalGroup: '구매 - 팀원',
      firstEvaluator: '이영희',
      secondEvaluator: '박민수',
      thirdEvaluator: '',
      peerEvaluator: '배준호',
      subordinateEvaluator: '',
      performanceRate: 83,
      competencyRates: [
        { type: '협상력', ratio: 35, itemCount: 3 },
        { type: '비용관리', ratio: 40, itemCount: 4 }
      ]
    }
  ])

  const isExpanded = ref(true)
  const totalCount = ref(0)
  const activeFilterCount = ref(0)

  const filters = ref({
    positions: [],
    grades: [],
    jobs: [],
    departments: [],
    employees: []
  })

  const positionOptions = ref([
    { value: 'p1', label: '사원' },
    { value: 'p2', label: '대리' },
    { value: 'p3', label: '과장' },
    { value: 'p4', label: '차장' },
    { value: 'p5', label: '부장' }
  ])

  const gradeOptions = ref([
    { value: 'g1', label: '1급' },
    { value: 'g2', label: '2급' },
    { value: 'g3', label: '3급' },
    { value: 'g4', label: '4급' },
    { value: 'g5', label: '5급' }
  ])

  const jobOptions = ref([
    { value: 'j1', label: '영업' },
    { value: 'j2', label: '마케팅' },
    { value: 'j3', label: '인사' },
    { value: 'j4', label: '개발' },
    { value: 'j5', label: '디자인' }
  ])

  const departmentOptions = ref([
    { value: 'd1', label: '영업부' },
    { value: 'd2', label: '마케팅부' },
    { value: 'd3', label: '인사부' },
    { value: 'd4', label: 'IT부서' }
  ])

  const employeeOptions = ref([
    { value: 'e1', label: '홍길동' },
    { value: 'e2', label: '김철수' },
    { value: 'e3', label: '이영희' }
  ])

  const toggleExpanded = () => {
    isExpanded.value = !isExpanded.value
  }

  const handleSearch = () => {
    // 검색 로직 구현
    totalCount.value = 15
    activeFilterCount.value = Object.values(filters.value).filter(val =>
      Array.isArray(val) ? val.length > 0 : !!val
    ).length
  }

  const handleReset = () => {
    Object.keys(filters.value).forEach(key => {
      filters.value[key] = []
    })
    activeFilterCount.value = 0
  }
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
  /* 대상자 섹션 */
  .target-section {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .excel-download-btn {
    margin-left: auto;
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
