<template>
  <div class="page-container container-large">
    <!-- 페이지 헤더 -->
    <div class="page-header">
      <div class="header-controls flex gap-10 items-center">
        <!-- 기준년도 선택 -->
        <div class="year-selector flex gap-10 items-center">
          <label class="selector-label flex-none">기준년도</label>
          <UiSelect
            v-model="selectedYear"
            :options="yearOptions"
            placeholder="2025년"
            class="w-150"
          />
        </div>
      </div>
    </div>

    <!-- 탭 메뉴 -->
    <div class="tab-container">
      <UiTabs v-model="activeTab" :tabs="tabItems" scrollable />
    </div>

    <!-- 메인 콘텐츠 -->
    <div class="page-content">
      <div class="content-layout">
        <!-- 좌측: 평가대상자 목록 -->
        <section class="employee-section scrollable-minus-13">
          <div class="section-header">
            <div class="heading-4">평가대상자</div>
          </div>

          <div class="employee-list-container">
            <div class="employee-list">
              <div
                v-for="employee in employees"
                :key="employee.id"
                class="employee-card"
                :class="{ active: selectedEmployeeId === employee.id }"
                @click="handleEmployeeSelect(employee)"
              >
                <!-- 직원 기본 정보 -->
                <div class="employee-header flex items-center gap-5">
                  <div class="employee-main-info">
                    <div class="employee-avatar flex items-center">
                      <i class="icon-lg icon-user" />
                    </div>
                    <span class="employee-name">{{ employee.name }}</span>
                  </div>
                  <div class="employee-details flex items-center gap-5">
                    <span class="employee-position">{{ employee.position }}</span>
                    <span class="employee-role">{{ employee.role }}</span>
                    <span class="employee-department">{{ employee.department }}</span>
                  </div>
                </div>

                <!-- 평가자 배지 -->
                <div class="evaluator-badges">
                  <div
                    v-for="evaluator in employee.evaluators"
                    :key="evaluator.level"
                    class="evaluator-badge"
                  >
                    {{ evaluator.level }} | {{ evaluator.name }}
                  </div>
                </div>

                <!-- 평가 결과 -->
                <div class="evaluation-results">
                  <div class="result-item">
                    <span class="result-badge performance-badge">성과평가</span>
                    <span class="result-text">{{ employee.performanceResult.result }}</span>
                  </div>
                  <div class="result-item">
                    <span class="result-badge competency-badge">역량평가</span>
                    <span class="result-text">{{ employee.competencyResult.result }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 우측: 평가 정보 -->
        <section class="evaluation-section">
          <!-- 평가자 정보 -->
          <div class="heading-4">평가자</div>
          <div class="scrollable-minus-14">
            <div class="evaluation-block">
              <UiTable v-model="evaluatorData" layout="vertical">
                <template #colgroup>
                  <col style="width: 200px" />
                  <col style="width: auto" />
                </template>
                <template #body="{ rows }">
                  <tr v-for="row in rows" :key="row.id">
                    <th>{{ row.name }}</th>
                    <td>{{ row.value }}</td>
                  </tr>
                </template>
              </UiTable>
            </div>

            <!-- 성과평가 정보 -->
            <div class="evaluation-block mt-20">
              <h3 class="block-title">성과평가</h3>
              <UiTable v-model="performanceData" layout="vertical">
                <template #body="{ rows }">
                  <tr v-for="row in rows" :key="row.id">
                    <th>{{ row.name }}</th>
                    <td>{{ row.value }}</td>
                  </tr>
                </template>
              </UiTable>
            </div>

            <!-- 역량평가 정보 -->
            <div class="evaluation-block mt-20">
              <h3 class="block-title">역량평가</h3>
              <UiTable v-model="competencyData" layout="vertical">
                <template #body="{ rows }">
                  <tr v-for="row in rows" :key="row.id">
                    <th>{{ row.name }}</th>
                    <td>{{ row.value }}</td>
                  </tr>
                </template>
              </UiTable>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
  /**
   * 평가대상확인(부서장) 페이지
   * 목적: 부서장이 평가대상자들의 평가 현황을 확인하는 화면
   */

  // 페이지 타이틀 설정
  const logoText = inject('logoText')
  logoText.value = '평가대상확인(부서장)'

  /**
   * 탭 관련 데이터
   */
  const activeTab = ref('tab1')
  const tabItems = ref([
    { id: 'tab1', label: '상반기' },
    { id: 'tab2', label: '하반기' },
    { id: 'tab3', label: '중간평가' },
    { id: 'tab4', label: '신규입사자 평가' },
    { id: 'tab5', label: '그냥평가' },
    { id: 'tab6', label: '또 평가' },
    { id: 'tab7', label: '또 평가' },
    { id: 'tab8', label: '특별평가' },
    { id: 'tab9', label: '프로젝트평가' },
    { id: 'tab10', label: '인턴평가' },
    { id: 'tab11', label: '승진평가' },
    { id: 'tab12', label: '연말평가' },
    { id: 'tab13', label: '분기평가' },
    { id: 'tab14', label: '동료평가' },
    { id: 'tab15', label: '자기평가' },
    { id: 'tab16', label: '외부평가' },
    { id: 'tab17', label: '종합평가' }
  ])

  /**
   * 년도 선택 관련 데이터
   */
  const selectedYear = ref('2025')
  const yearOptions = ref([
    { value: '2025', label: '2025년' },
    { value: '2024', label: '2024년' },
    { value: '2023', label: '2023년' }
  ])

  /**
   * 직원 선택 관련 데이터
   */
  const selectedEmployeeId = ref('isp144')

  /**
   * 직원 목록 데이터
   */
  const employees = ref([
    {
      id: 'isp144',
      name: '안창주',
      position: '선임',
      role: '팀원',
      department: 'UXUI팀',
      evaluators: [
        { level: '1차', name: '장호영' },
        { level: '2차', name: '조정수' },
        { level: '3차', name: '오승현' }
      ],
      performanceResult: { label: '성과평가', result: '결과 : 70%' },
      competencyResult: { label: '역량평가', result: '리더쉽 3개 25%, 직무 1개 50%' }
    },
    {
      id: 'isp145',
      name: '고지훈',
      position: '차장',
      role: '팀원',
      department: '인사팀',
      evaluators: [
        { level: '1차', name: '장호영' },
        { level: '2차', name: '마진석' },
        { level: '3차', name: '오승현' }
      ],
      performanceResult: { label: '성과평가', result: '결과 : 85%' },
      competencyResult: { label: '역량평가', result: '직무 2개 60%, 리더쉽 2개 40%' }
    },
    {
      id: 'isp146',
      name: '김민수',
      position: '과장',
      role: '팀원',
      department: '개발팀',
      evaluators: [
        { level: '1차', name: '장호영' },
        { level: '2차', name: '조정수' },
        { level: '3차', name: '오승현' }
      ],
      performanceResult: { label: '성과평가', result: '결과 : 92%' },
      competencyResult: { label: '역량평가', result: '직무 1개 70%, 공통 1개 30%' }
    },
    {
      id: 'isp147',
      name: '이영희',
      position: '대리',
      role: '팀원',
      department: '기획팀',
      evaluators: [
        { level: '1차', name: '장호영' },
        { level: '2차', name: '마진석' },
        { level: '3차', name: '오승현' }
      ],
      performanceResult: { label: '성과평가', result: '결과 : 78%' },
      competencyResult: { label: '역량평가', result: '리더쉽 1개 30%, 직무 2개 70%' }
    },
    {
      id: 'isp148',
      name: '박준호',
      position: '주임',
      role: '팀원',
      department: '마케팅팀',
      evaluators: [
        { level: '1차', name: '장호영' },
        { level: '2차', name: '조정수' },
        { level: '3차', name: '오승현' }
      ],
      performanceResult: { label: '성과평가', result: '결과 : 65%' },
      competencyResult: { label: '역량평가', result: '직무 1개 50%, 공통 2개 50%' }
    }
  ])

  /**
   * 테이블 데이터
   */
  // 평가자 정보
  const evaluatorData = ref([
    { id: 1, name: '1차 상급자 평가', value: '장호영' },
    { id: 2, name: '2차 상급자 평가', value: '마진석' },
    { id: 3, name: '3차 상급자 평가', value: '오승현' },
    { id: 4, name: '동료평가', value: '-' },
    { id: 5, name: '부하(상향)평가', value: '-' }
  ])

  // 성과평가 정보
  const performanceData = ref([{ id: 1, name: '결과', value: '비율 : 70%' }])

  // 역량평가 정보
  const competencyData = ref([
    { id: 1, name: 'DSV-부서지표', value: '0%' },
    { id: 2, name: 'DSV-공통역량', value: '0%' },
    { id: 3, name: 'DSV-직무역량', value: '0%' },
    { id: 4, name: '리더쉽', value: '0%' },
    { id: 5, name: '근태', value: '0%' },
    { id: 6, name: '직무', value: '0%' },
    { id: 7, name: '공통', value: '0%' }
  ])

  /**
   * 직원 선택 핸들러
   * @param {Object} employee - 선택된 직원 정보
   */
  const handleEmployeeSelect = employee => {
    selectedEmployeeId.value = employee.id
  }
</script>

<style lang="scss" scoped>
  .page-content {
    // 메인 콘텐츠 영역
    flex: 1;
    overflow: hidden;

    .content-layout {
      // 콘텐츠 레이아웃 - 좌우 2분할
      width: 100%;
      display: flex;
      height: 100%;
      gap: 12px;
      padding: 20px 0;
    }
  }

  .employee-section {
    // 좌측 직원 목록 섹션
    flex: 1;
    display: flex;
    flex-direction: column;

    .section-header {
      // 섹션 헤더
      margin-bottom: 16px;
    }

    .employee-list-container {
      // 직원 목록 컨테이너
      flex: 1;
      position: relative;
      overflow: hidden;

      .employee-list {
        // 직원 목록 스크롤 영역
        height: 100%;
        overflow-y: auto;
        padding-right: 8px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
    }
  }

  .employee-card {
    // 직원 카드 스타일
    background-color: $bg-white;
    border: 1px solid $border-color;
    border-radius: 8px;
    padding: 16px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: $primary-color;
      box-shadow: 0 2px 8px rgba($primary-color, 0.1);
    }

    &.active {
      border-color: $primary-color;
      box-shadow: 0 4px 12px rgba($primary-color, 0.15);
    }

    .employee-header {
      // 직원 기본 정보 헤더
      margin-bottom: 12px;

      .employee-main-info {
        // 아바타와 이름
        display: flex;
        align-items: center;
        gap: 8px;

        .employee-name {
          color: var(--color-gray-90, #1e2124);
          font-size: 16px;
          font-weight: 700;
          margin-right: 10px;
        }
      }

      .employee-details {
        // 직책, 역할, 부서 정보
        display: flex;

        span {
          font-size: 13px;
          color: $text-secondary;

          &:not(:last-child)::after {
            content: '·';
            margin-left: 8px;
            color: $text-tertiary;
          }
        }
      }
    }

    .evaluator-badges {
      // 평가자 배지 영역
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 12px;

      .evaluator-badge {
        border-radius: 18px;
        background: var(--color-gray-30, #b1b8be);
        color: $bg-white;
        font-size: 13px;
        padding: 4px 8px;
        white-space: nowrap;
      }
    }

    .evaluation-results {
      // 평가 결과 영역
      display: flex;
      flex-direction: column;
      gap: 8px;

      .result-item {
        // 개별 평가 결과 아이템
        display: flex;
        align-items: center;
        gap: 8px;

        .result-badge {
          // 평가 구분 배지
          flex: none;
          font-size: 14px;
          padding: 4px 8px;
          border-radius: 18px;
          color: $bg-white;

          &.performance-badge {
            background: var(--color-primary-50, #0af);
          }

          &.competency-badge {
            background: #1bc32f;
          }
        }

        .result-text {
          // 평가 결과 텍스트
          flex: 1;
          font-size: 16px;
          color: $text-secondary;
          line-height: 1.4;
        }
      }
    }
  }

  .evaluation-section {
    // 우측 평가 정보 섹션
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
</style>
