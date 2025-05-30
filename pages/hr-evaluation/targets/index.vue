<template>
  <div class="container-large">
    <div class="page-header">
      <div class="header-left flex items-center gap-10">
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
        <div class="flex items-center">
          <i class="icon-md icon-user mr-2"></i>
          <span>홍길동</span>
        </div>
      </div>
    </div>

    <!-- <div class="tab-container">
      <UiTabs v-model="activePeriod" class="mb-4">
        <UiTab name="first" label="상반기" />
        <UiTab name="second" label="하반기" />
      </UiTabs>
    </div> -->

    <div class="flex-container">
      <!-- 평가대상자 목록 -->
      <div class="w-65p">
        <div class="evaluation-panel">
          <div class="panel-header">
            <h3 class="panel-title">평가대상자</h3>
            <div class="target-count">{{ evaluationTargets.length }}명</div>
          </div>

          <div class="target-list-container scrollable-minus-7">
            <ul class="target-list">
              <li
                v-for="target in evaluationTargets"
                :key="target.id"
                :class="{ active: selectedTarget === target.id }"
                @click="selectTarget(target.id)"
                class="target-item"
              >
                <div class="target-content">
                  <!-- 기본 정보 -->
                  <div class="target-main">
                    <div class="profile-section">
                      <div class="profile-image">
                        <i class="icon-xl icon-user"></i>
                      </div>
                      <div class="target-info">
                        <div class="target-name">{{ target.name }}</div>
                        <div class="target-tags">
                          <span class="tag tag-rank">{{ target.rank }}</span>
                          <span class="tag tag-position">{{ target.position }}</span>
                          <span class="tag tag-department">{{ target.department }}</span>
                        </div>
                      </div>
                    </div>

                    <!-- 평가자 정보 -->
                    <div class="evaluators-section">
                      <div class="evaluator-item">
                        <span class="evaluator-label">1차:</span>
                        <span class="evaluator-name">{{ target.evaluators.first }}</span>
                      </div>
                      <div class="evaluator-item">
                        <span class="evaluator-label">2차:</span>
                        <span class="evaluator-name">{{ target.evaluators.second }}</span>
                      </div>
                      <div class="evaluator-item">
                        <span class="evaluator-label">3차:</span>
                        <span class="evaluator-name">{{ target.evaluators.third }}</span>
                      </div>
                      <div v-if="target.peerCount" class="evaluator-item">
                        <span class="evaluator-label">동료:</span>
                        <span class="evaluator-name">{{ target.peerCount }}명</span>
                      </div>
                    </div>
                  </div>

                  <!-- 평가 결과 -->
                  <div class="evaluation-results">
                    <div class="result-row">
                      <div class="result-badge performance">
                        <i class="icon-performance"></i>
                        성과평가
                      </div>
                      <div class="result-value">
                        결과: <strong>{{ target.performanceResult }}</strong>
                      </div>
                    </div>

                    <div class="result-row">
                      <div class="result-badge competency">
                        <i class="icon-competency"></i>
                        역량평가
                      </div>
                      <div class="result-value" v-if="target.competencyResult">
                        {{ target.competencyResult }}
                      </div>
                      <div class="result-value empty" v-else>미완료</div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 평가자 설정 및 상세 정보 -->
      <div class="w-35p">
        <div class="config-panel">
          <div class="panel-header">
            <h3 class="panel-title">평가자 설정</h3>
          </div>

          <div class="config-content scrollable-minus-7" v-if="selectedTargetData">
            <!-- 선택된 대상자 정보 -->
            <div class="selected-target-info">
              <div class="selected-profile">
                <i class="icon-user icon-xl"></i>
                <div class="selected-details">
                  <h4 class="selected-name">{{ selectedTargetData.name }}</h4>
                  <div class="selected-meta">
                    {{ selectedTargetData.rank }} · {{ selectedTargetData.position }} ·
                    {{ selectedTargetData.department }}
                  </div>
                </div>
              </div>
            </div>
            <!-- 평가자 설정 테이블 -->
            <UiTable class="mt-20" layout="horizontal" isThLeft title="평가자 ">
              <template #body>
                <tr>
                  <th>1차 상급자 평가</th>
                  <td>{{ selectedTargetData.evaluators.first }}</td>
                </tr>
                <tr>
                  <th>2차 상급자 평가</th>
                  <td>{{ selectedTargetData.evaluators.second }}</td>
                </tr>
                <tr>
                  <th>3차 상급자 평가</th>
                  <td>{{ selectedTargetData.evaluators.third }}</td>
                </tr>
                <tr>
                  <th>동료평가</th>
                  <td>{{ selectedTargetData.peerCount || 0 }}명</td>
                </tr>
                <tr>
                  <th>부하(상향) 평가</th>
                  <td>3명</td>
                </tr>
              </template>
            </UiTable>

            <!-- 평가 상세 정보 -->
            <UiTable class="mt-20" layout="horizontal" isThLeft title="성과평가">
              <template #body>
                <tr>
                  <th>결과</th>
                  <td>비율 : {{ selectedTargetData.performanceResult }}</td>
                </tr>
              </template>
            </UiTable>

            <UiTable class="mt-20" layout="horizontal" isThLeft title="역량평가">
              <template #body>
                <tr v-for="(category, index) in competencyCategories" :key="index">
                  <th>{{ category.name }}</th>
                  <td>
                    {{ category.percentage }} %
                    <ul v-if="category.items.length > 0" class="mt-1 pl-4 text-sm">
                      <li v-for="(item, itemIndex) in category.items" :key="itemIndex">
                        - {{ item }}
                      </li>
                    </ul>
                  </td>
                </tr>
              </template>
            </UiTable>
          </div>

          <div class="config-content empty" v-else>
            <div class="empty-state">
              <i class="icon-user-check icon-lg"></i>
              <p>평가대상자를 선택해주세요</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, inject } from 'vue'

  // 로고 텍스트 설정
  const logoText = inject('logoText')
  logoText.value = '평가대상확인(부서장)'

  // 반응형 데이터
  const selectedYear = ref('2025')
  const selectedTarget = ref('isp144')

  const yearOptions = ref([
    { value: '2025', label: '2025년' },
    { value: '2024', label: '2024년' },
    { value: '2023', label: '2023년' }
  ])

  const evaluationTargets = ref([
    {
      id: 'isp144',
      name: '고지훈',
      rank: '차장',
      position: '팀원',
      department: '인사팀',
      evaluators: {
        first: '장호영',
        second: '조정수',
        third: '오승현'
      },
      performanceResult: '70%',
      competencyResult: '직무 1개 50%, 리더쉽 3개 25%',
      profileImage: null
    },
    {
      id: 'isp143',
      name: '조정수',
      rank: '차장',
      position: '팀장',
      department: '인사팀',
      evaluators: {
        first: '장호영',
        second: '마진석',
        third: '오승현'
      },
      performanceResult: '70%',
      competencyResult: '',
      profileImage: null
    },
    {
      id: 'isp145',
      name: '정승현',
      rank: '과장',
      position: '팀원',
      department: '인사팀',
      evaluators: {
        first: '장호영',
        second: '마진석',
        third: '오승현'
      },
      performanceResult: '70%',
      competencyResult: '',
      profileImage: null
    },
    {
      id: 'isp164',
      name: '황연지',
      rank: '대리',
      position: '팀원',
      department: '인사팀',
      evaluators: {
        first: '장호영',
        second: '조정수',
        third: '오승현'
      },
      performanceResult: '70%',
      competencyResult: '근태 0개 40%, 리더쉽 2개 30%, 직무 2개 40%',
      profileImage: null
    },
    {
      id: 'isp165',
      name: '신지유',
      rank: '주임',
      position: '팀원',
      department: '인사팀',
      evaluators: {
        first: '장호영',
        second: '조정수',
        third: '오승현'
      },
      performanceResult: '100%',
      competencyResult: '리더쉽 2개 30%, 직무 2개 40%, 근태 2개 30%',
      profileImage: null
    }
  ])

  // 계산된 속성
  const selectedTargetData = computed(() => {
    return evaluationTargets.value.find(target => target.id === selectedTarget.value)
  })

  const competencyCategories = computed(() => {
    if (!selectedTargetData.value || selectedTargetData.value.id !== 'isp144') {
      return []
    }

    return [
      { name: 'DSV-부서지표', percentage: 0, items: [] },
      { name: 'DSV-공통역량', percentage: 0, items: [] },
      { name: 'DSV-직무역량', percentage: 0, items: [] },
      {
        name: '리더쉽',
        percentage: 25,
        items: ['협조성', '지도/육성', '조직몰입']
      },
      { name: '근태', percentage: 0, items: [] },
      {
        name: '직무',
        percentage: 50,
        items: ['다양한 채널을 통하여 전문 노하우를 습득하고, 이를 활용하며, 조직 전체에 전파한다.']
      },
      { name: '공통', percentage: 0, items: [] }
    ]
  })

  // 메서드
  const selectTarget = targetId => {
    selectedTarget.value = targetId
  }

  const handleImageError = event => {
    event.target.src = '/images/default-profile.svg'
  }

  const openPeerSearch = () => {
    // 동료평가자 검색 모달 열기
    console.log('동료평가자 검색')
  }

  const openSubordinateSearch = () => {
    // 부하평가자 검색 모달 열기
    console.log('부하평가자 검색')
  }
</script>

<style scoped>
  /* 기본 레이아웃 */
  .flex-container {
    display: flex;
    gap: 20px;
    margin-top: 20px;
  }

  .w-65p {
    flex: 0 0 65%;
  }

  .w-35p {
    flex: 0 0 calc(35% - 20px);
  }

  /* 패널 공통 스타일 */
  .evaluation-panel,
  .config-panel {
    background: #ffffff;
    border: 1px solid #e5e7eb;
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    background: #f8fafc;
    border-bottom: 1px solid #e5e7eb;
  }

  .panel-title {
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
  }

  .target-count {
    background: #3b82f6;
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
  }

  /* 평가대상자 목록 */
  .target-list-container {
    overflow-y: auto;
  }

  .target-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .target-item {
    padding: 0;
    border-bottom: 1px solid #f3f4f6;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .target-item:hover {
    background-color: #f8fafc;
  }

  .target-item.active {
    background-color: #eff6ff;
    border-left: 4px solid #3b82f6;
  }

  .target-item:last-child {
    border-bottom: none;
  }

  .target-content {
    padding: 15px 24px;
  }

  /* 대상자 기본 정보 */
  .target-main {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
  }

  .profile-section {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .profile-image img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #e5e7eb;
  }

  .target-info {
    flex: 1;
  }

  .target-name {
    font-size: 20px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 6px;
  }

  .target-tags {
    display: flex;
    gap: 6px;
  }

  .tag {
    display: inline-block;
    padding: 3px 8px;
    font-size: 12px;
    font-weight: 500;
  }

  .tag-rank {
    background-color: #dbeafe;
    color: #1e40af;
  }

  .tag-position {
    background-color: #dcfce7;
    color: #166534;
  }

  .tag-department {
    background-color: #f3e8ff;
    color: #7c3aed;
  }

  /* 평가자 정보 */
  .evaluators-section {
    display: flex;
    gap: 4px;
    min-width: 200px;
  }

  .evaluator-item {
    font-size: 13px;
    color: #6b7280;
  }

  .evaluator-label {
    font-weight: 500;
    margin-right: 6px;
  }

  .evaluator-name {
    color: #374151;
  }

  /* 평가 결과 */
  .evaluation-results {
    border-top: 1px dashed #e5e7eb;
    padding-top: 10px;
    display: flex;
    gap: 10px;
  }

  .result-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .result-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 500;
    min-width: 80px;
  }

  .result-badge.performance {
    background-color: #fef3c7;
    color: #92400e;
  }

  .result-badge.competency {
    background-color: #e0f2fe;
    color: #0369a1;
  }

  .result-value {
    font-size: 13px;
    color: #374151;
    flex: 1;
  }

  .result-value.empty {
    color: #9ca3af;
    font-style: italic;
  }

  /* 설정 패널 */
  .config-content {
    padding: 12px;
  }

  .config-content.empty {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
  }

  .empty-state {
    text-align: center;
    color: #9ca3af;
  }

  .empty-state .icon-lg {
    font-size: 48px;
    margin-bottom: 12px;
  }

  /* 선택된 대상자 정보 */
  .selected-target-info {
    padding-bottom: 20px;
    border-bottom: 1px solid #f3f4f6;
  }

  .selected-profile {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .selected-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #e5e7eb;
  }

  .selected-name {
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
    margin: 0 0 6px 0;
  }

  .selected-meta {
    font-size: 14px;
    color: #6b7280;
  }

  /* 평가자 설정 테이블 */
  .evaluator-config {
    margin-bottom: 24px;
  }

  .config-table {
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
  }

  .config-row {
    display: flex;
    align-items: center;
    min-height: 50px;
    border-bottom: 1px solid #f3f4f6;
  }

  .config-row:last-child {
    border-bottom: none;
  }

  .config-label {
    flex: 0 0 140px;
    padding: 12px 16px;
    background: #f8fafc;
    font-weight: 500;
    color: #374151;
    font-size: 14px;
    border-right: 1px solid #e5e7eb;
  }

  .config-value {
    flex: 1;
    padding: 12px 16px;
  }

  .evaluator-assigned {
    color: #1f2937;
    font-weight: 500;
  }

  .btn-search {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: #f3f4f6;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 13px;
    color: #374151;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-search:hover {
    background: #e5e7eb;
    border-color: #9ca3af;
  }

  /* 평가 상세 정보 */
  .evaluation-details {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .detail-section {
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
  }

  .detail-title {
    padding: 12px 16px;
    background: #f8fafc;
    border-bottom: 1px solid #e5e7eb;
    font-size: 15px;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
  }

  .detail-content {
    padding: 16px;
  }

  .performance-result {
    font-size: 14px;
    color: #374151;
  }

  .competency-categories {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .category-item {
    border-bottom: 1px solid #f3f4f6;
    padding-bottom: 12px;
  }

  .category-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .category-name {
    font-weight: 500;
    color: #374151;
    font-size: 14px;
  }

  .category-percentage {
    font-weight: 600;
    color: #3b82f6;
    font-size: 14px;
  }

  .category-items {
    padding-left: 12px;
  }

  .competency-item {
    font-size: 13px;
    color: #6b7280;
    line-height: 1.5;
    margin-bottom: 4px;
  }

  .competency-item:last-child {
    margin-bottom: 0;
  }

  /* 반응형 */
  @media (max-width: 1024px) {
    .flex-container {
      flex-direction: column;
    }

    .w-65p,
    .w-35p {
      flex: none;
      width: 100%;
    }

    .target-main {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }

    .evaluators-section {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    .target-content {
      padding: 16px 20px;
    }

    .config-content {
      padding: 20px;
    }

    .config-row {
      flex-direction: column;
      align-items: stretch;
      min-height: auto;
    }

    .config-label {
      flex: none;
      border-right: none;
      border-bottom: 1px solid #e5e7eb;
    }
  }
</style>
