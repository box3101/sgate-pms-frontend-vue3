<template>
  <div class="report-creation-container" ref="containerRef">
    <!-- 헤더 컴포넌트 -->
    <ReportsHeader
      v-model:searchDateRange="searchDateRange"
      @search-reports="handleSearchReports"
      @export-excel="handleExportToExcel"
      @open-config-modal="openReportConfigModal"
    />

    <!-- 메인 컨텐츠 영역 -->
    <div class="report-content mt-20">
      <div class="flex-container">
        <!-- 좌측: 보고서 리스트 -->
        <div class="w-30p">
          <ReportsList
            v-model:selectedIndex="selectedReportIndex"
            :reportList="reportList"
            @row-click="handleReportRowClick"
            @open-update-modal="openReportUpdateModal"
          />
        </div>

        <!-- 우측: 보고서 상세 -->
        <div class="w-70p">
          <ReportsDetail
            :selectedReport="selectedReportData"
            :reportDetailData="reportDetailData"
            :miscContent="miscContent"
            :attachmentFiles="attachmentFiles"
            :feedbackList="feedbackList"
            @download-file="handleDownloadFile"
          />
        </div>
      </div>
    </div>

    <!-- 모달들 -->
    <ReportConfigModal
      v-model="isReportConfigModalOpen"
      :configData="configData"
      @create-report="openReportCreateModal"
    />

    <ReportCreateModal
      v-model="isReportCreateModalOpen"
      :createData="createData"
      @submit-report="handleSubmitReport"
      @open-activity-modal="openActivityAddModal"
      @open-ai-summary="openAiSummaryConfirm"
    />

    <ActivityAddModal
      v-model="isActivityAddModalOpen"
      :activityList="activityList"
      @add-activities="handleAddSelectedActivities"
    />

    <AiSummaryModal
      v-model="isAiSummaryModalOpen"
      :originalContent="originalContent"
      :aiSummaryContent="aiSummaryContent"
    />

    <!-- 보고서 수정 모달 -->
    <ReportUpdateModal v-model="isReportUpdateModalOpen" />
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, nextTick, inject } from 'vue'
  import ReportsHeader from './comp/ReportsHeader.vue'
  import ReportsList from './comp/ReportsList.vue'
  import ReportsDetail from './comp/ReportsDetail.vue'
  import ReportConfigModal from './comp/modals/ReportConfigModal.vue'
  import ReportCreateModal from './comp/modals/ReportCreateModal.vue'
  import ActivityAddModal from './comp/modals/ActivityAddModal.vue'
  import AiSummaryModal from './comp/modals/AiSummaryModal.vue'
  import ReportUpdateModal from './comp/modals/ReportUpdateModal.vue'

  // 로고 텍스트 설정
  const logoText = inject('logoText')
  logoText.value = '일일/주간보고'

  // DOM 참조
  const containerRef = ref(null)

  // 모달 상태
  const isReportConfigModalOpen = ref(false)
  const isReportCreateModalOpen = ref(false)
  const isActivityAddModalOpen = ref(false)
  const isAiSummaryModalOpen = ref(false)
  const isReportUpdateModalOpen = ref(false)

  // 검색 및 필터링
  const searchDateRange = ref([null, null])

  // 보고서 리스트 관련
  const selectedReportIndex = ref(0)
  const reportList = ref([
    { date: '2025-05-22', type: '일간보고', status: '대기', feedbackCount: 1 },
    { date: '2025-05-21', type: '일간보고', status: '제출', feedbackCount: 2 },
    { date: '2025-05-20', type: '주간보고', status: '승인', feedbackCount: 3 },
    { date: '2025-05-18', type: '분기보고', status: '제출', feedbackCount: 5 },
    { date: '2025-05-17', type: '일간보고', status: '대기', feedbackCount: 1 }
  ])

  // 선택된 보고서 데이터 (computed)
  const selectedReportData = computed(() => ({
    type:
      selectedReportIndex.value >= 0
        ? reportList.value[selectedReportIndex.value]?.type
        : '주간보고',
    date:
      selectedReportIndex.value >= 0
        ? reportList.value[selectedReportIndex.value]?.date
        : '2025.05.20',
    status:
      selectedReportIndex.value >= 0
        ? reportList.value[selectedReportIndex.value]?.status
        : '미설정',
    target: '이은영'
  }))

  // 보고서 상세 데이터
  const reportDetailData = ref([
    {
      weeklyAchievement:
        'Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...',
      nextWeekPlan: 'lorem1000...'
    }
  ])
  const miscContent = ref(
    'Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet...'
  )
  const attachmentFiles = ref([
    { id: 1, name: '보고서_첨부자료.pdf' },
    { id: 2, name: '회의록_20240601.docx' }
  ])
  const feedbackList = ref([
    {
      id: 1,
      author: '홍길동',
      createdAt: '2024-06-01 14:30',
      content: '보고서 내용이 매우 명확하게 작성되었습니다...'
    }
  ])

  // 설정 데이터
  const configData = ref({
    reportType: '일간보고',
    reportDate: null,
    includeKPI: false,
    includeOKR: false
    // ... 기타 설정 데이터
  })

  // 생성 데이터
  const createData = ref({
    currentUserName: '김윤기',
    reportType: '일간보고',
    reportDate: '2025.04.04',
    submitTargets: [],
    weeklyAchievementInput: '',
    nextWeekPlanInput: '',
    miscInput: '',
    uploadedFiles: []
  })

  // 활동 관련 데이터
  const activityList = ref([
    {
      id: 1,
      board: '클라우드 서비스',
      task: '시스템 모니터링',
      activityDate: '2025-04-27',
      content: '클라우드 서버 성능 모니터링 및 로그 분석',
      author: '김개발',
      createdAt: '2025-04-27'
    }
  ])

  // AI 요약 관련
  const originalContent = ref('현 프로세스 분석 및 문제점 파악...')
  const aiSummaryContent = ref('현 프로세스 분석 및 문제점 파악...')

  // 이벤트 핸들러들
  const handleSearchReports = () => {
    console.log('보고서 검색:', searchDateRange.value)
  }

  const handleExportToExcel = () => {
    console.log('엑셀 다운로드')
  }

  const handleReportRowClick = (row, index) => {
    selectedReportIndex.value = index
    console.log('보고서 선택됨:', row, index)
  }

  const handleDownloadFile = file => {
    console.log('파일 다운로드:', file.name)
  }

  const handleSubmitReport = () => {
    console.log('보고서 제출')
    isReportCreateModalOpen.value = false
  }

  const handleAddSelectedActivities = () => {
    console.log('선택된 활동 추가')
    isActivityAddModalOpen.value = false
  }

  // 모달 열기 함수들
  const openReportConfigModal = () => {
    isReportConfigModalOpen.value = true
  }

  const openReportCreateModal = () => {
    isReportConfigModalOpen.value = false
    isReportCreateModalOpen.value = true
  }

  const openReportUpdateModal = () => {
    isReportUpdateModalOpen.value = true
  }

  const openActivityAddModal = () => {
    isActivityAddModalOpen.value = true
  }

  const openAiSummaryConfirm = () => {
    isAiSummaryModalOpen.value = true
  }

  // 테이블 높이 계산
  const calculateTableHeight = async () => {
    await nextTick()
    if (containerRef.value) {
      reportListHeight.value = '725px'
    }
  }

  onMounted(() => {
    calculateTableHeight()
  })
</script>

<style lang="scss" scoped>
  .report-creation-container {
    .w-30p tr {
      cursor: pointer;
    }
  }
</style>
