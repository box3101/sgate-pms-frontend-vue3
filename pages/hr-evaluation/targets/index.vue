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
              @update:modelValue="handleYearChange"
            />
          </div>
        </div>
        <div class="flex items-center">
          <i class="icon-md icon-user mr-2"></i>
          <span>홍길동</span>
        </div>
      </div>
    </div>

    <div class="flex-container">
      <!-- 평가대상자 목록 -->
      <div class="w-65p">
        <div class="evaluation-panel">
          <div class="panel-header">
            <h3 class="panel-title">평가대상자</h3>
            <div class="header-actions">
              <div class="target-count">{{ evaluationTargets.length }}명</div>
              <!-- 검색 기능 -->
              <div class="search-box">
                <UiInput v-model="searchQuery" placeholder="이름으로 검색" width="150px">
                  <template #suffix>
                    <i class="icon-sm icon-search"></i>
                  </template>
                </UiInput>
              </div>
            </div>
          </div>

          <div class="target-list-container scrollable-minus-14">
            <ul class="target-list">
              <li
                v-for="target in filteredTargets"
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

            <!-- 검색 결과 없음 -->
            <div v-if="filteredTargets.length === 0" class="no-results">
              <i class="icon-search icon-lg"></i>
              <p>검색 결과가 없습니다</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 평가자 설정 및 상세 정보 -->
      <div class="w-35p">
        <div class="config-panel">
          <div class="panel-header">
            <h3 class="panel-title">평가자 설정</h3>
          </div>

          <div class="config-content scrollable-minus-14" v-if="selectedTargetData">
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
            <UiTable
              class="mt-20"
              v-model="selectedTargetData"
              layout="horizontal"
              isThLeft
              title="평가자"
            >
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
            <UiTable
              class="mt-20"
              v-model="selectedTargetData"
              layout="horizontal"
              isThLeft
              title="성과평가"
            >
              <template #body>
                <tr>
                  <th>결과</th>
                  <td>비율 : {{ selectedTargetData.performanceResult }}</td>
                </tr>
              </template>
            </UiTable>

            <UiTable
              class="mt-20"
              v-model="selectedTargetData"
              layout="horizontal"
              isThLeft
              title="역량평가"
            >
              <template #body>
                <tr v-for="(category, index) in competencyCategories" :key="index">
                  <th>{{ category.name }}</th>
                  <td>
                    {{ category.percentage }}%
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
              <p class="empty-help">
                좌측 목록에서 대상자를 클릭하면<br />상세 정보를 확인할 수 있습니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- UiConfirm 컴포넌트 -->
    <UiConfirm
      v-model="showConfirm"
      :type="confirmConfig.type"
      :title="confirmConfig.title"
      :message="confirmConfig.message"
      :show-cancel-button="false"
      :confirm-button-text="'확인'"
      @confirm="handleConfirm"
    />
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
  const searchQuery = ref('')

  // 확인 다이얼로그 상태
  const showConfirm = ref(false)
  const confirmConfig = ref({
    type: 'info',
    title: '데모 기능',
    message: ''
  })

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

  const filteredTargets = computed(() => {
    if (!searchQuery.value.trim()) {
      return evaluationTargets.value
    }
    return evaluationTargets.value.filter(target =>
      target.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
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

  const handleYearChange = newYear => {
    // 실제로는 API 호출
    showDemo(`${newYear}년 데이터 조회`)
  }

  const showDemo = action => {
    confirmConfig.value = {
      type: 'info',
      title: '🎯 데모 기능',
      message: `"${action}" 기능을 클릭하셨습니다.<br>실제 기능은 API 연동 후 구현됩니다.`
    }
    showConfirm.value = true
  }

  const handleConfirm = () => {
    // 확인 버튼 클릭 시 특별한 처리 없음
  }
</script>

<style scoped>
  /* 기존 스타일 유지 + 추가 스타일 */

  .header-right {
    display: flex;
    gap: 8px;
  }

  /* 패널 헤더 개선 */
  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    background: #f8fafc;
    border-bottom: 1px solid #e5e7eb;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  /* 검색 박스 */
  .search-box {
    display: flex;
    align-items: center;
  }

  /* 검색 결과 없음 */
  .no-results {
    text-align: center;
    padding: 60px 20px;
    color: #9ca3af;
  }

  .no-results .icon-lg {
    font-size: 48px;
    margin-bottom: 12px;
    opacity: 0.5;
  }

  .no-results p {
    margin: 0;
    font-size: 16px;
  }

  /* Empty state 개선 */
  .empty-help {
    margin-top: 8px;
    font-size: 14px;
    color: #6b7280;
    line-height: 1.4;
  }

  /* 기존 스타일들... (동일하게 유지) */
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

  .evaluation-panel,
  .config-panel {
    background: #ffffff;
    border: 1px solid #e5e7eb;
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

  .selected-target-info {
    padding-bottom: 20px;
    border-bottom: 1px solid #f3f4f6;
  }

  .selected-profile {
    display: flex;
    align-items: center;
    gap: 16px;
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
</style>
