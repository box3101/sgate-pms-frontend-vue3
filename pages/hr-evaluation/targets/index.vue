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
    <div class="flex-container">
      <div class="w-65p">
        <!-- 평가대상자 -->
        <UiCard class="mb-4">
          <ul class="target-list">
            <li
              v-for="target in evaluationTargets"
              :key="target.id"
              :class="{ active: target.isActive }"
              :data-eval_target_id="target.id"
            >
              <a href="#" class="wp100">
                <div class="flex items-center justify-between">
                  <div class="target-info flex items-center">
                    <div class="profile-image mr-2">
                      <img
                        :src="target.profileImage || '/css/ui/img/profileChr-M.svg'"
                        onerror="this.src='/css/ui/img/profileChr-M.svg'"
                        class="profileImg rounded-full"
                        :alt="target.name"
                      />
                    </div>
                    <div class="target-details">
                      <div class="flex items-center mb-1">
                        <span class="subj font-medium text-base mr-2">{{ target.name }}</span>
                        <span class="pds tag tag-rank mr-1">{{ target.rank }}</span>
                        <span class="pds tag tag-position mr-1">{{ target.position }}</span>
                        <span class="pds tag tag-department">{{ target.department }}</span>
                      </div>
                      <div class="evaluators text-sm text-gray-600">
                        <span
                          class="evaluator mr-2"
                          v-for="(evaluator, index) in target.evaluators"
                          :key="index"
                        >
                          {{ index + 1 }}차: {{ evaluator }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="evaluation-results mt-3">
                  <div class="evaluation-item flex items-center mb-2">
                    <span class="tag tag-evaluation mr-2">성과평가</span>
                    <span class="text-gray-700"
                      >결과: <strong>{{ target.performanceResult }}</strong></span
                    >
                  </div>

                  <div class="evaluation-item flex items-center">
                    <span class="tag tag-evaluation mr-2">역량평가</span>
                    <span class="text-gray-700">{{ target.competencyResult }}</span>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </UiCard>
      </div>
      <div class="w-35p">4</div>
    </div>
  </div>
</template>

<script setup>
  const logoText = inject('logoText')
  logoText.value = '평가대상확인(부서장)'

  const selectedYear = ref('2025')
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
      evaluators: ['장호영', '조정수', '오승현'],
      performanceResult: '70%',
      competencyResult: '리더쉽 3개 25%,직무 1개 50%'
    }
  ])
</script>

<style scoped>
  .target-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .target-list li {
    padding: 15px;
    border-bottom: 1px solid #e5e7eb;
    transition: background-color 0.2s ease;
  }

  .target-list li:last-child {
    border-bottom: none;
  }

  .target-list li.active {
    background-color: #f3f4f6;
    border-left: 3px solid #3b82f6;
  }

  .wp100 {
    width: 100%;
    display: block;
    text-decoration: none;
    color: inherit;
  }

  .profile-image img {
    width: 48px;
    height: 48px;
    object-fit: cover;
  }

  .tag {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
  }

  .tag-rank {
    background-color: #e0f2fe;
    color: #0369a1;
  }

  .tag-position {
    background-color: #dcfce7;
    color: #15803d;
  }

  .tag-department {
    background-color: #f3e8ff;
    color: #7e22ce;
  }

  .tag-evaluation {
    background-color: #fef3c7;
    color: #92400e;
  }

  .evaluation-results {
    border-top: 1px dashed #e5e7eb;
    padding-top: 10px;
  }
</style>
