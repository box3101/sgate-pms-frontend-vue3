<template>
  <div class="report-page">
    <!-- 컨트롤 패널 -->
    <div class="report-controls">
      <div class="checkbox-group">
        <UiCheckbox size="large" v-model="dailyReport" label="일간보고" value="d" />
        <UiCheckbox size="large" v-model="weeklyReport" label="주간보고" value="w" />
      </div>
      <div class="select-group">
        <UiSelect class="w-150" v-model="dateGbnType" :options="dateGbnOptions" />
      </div>
    </div>

    <!-- 캘린더 컴포넌트 -->
    <Calendar
      v-model="selectedDate"
      :events="filteredReportEvents"
      @date-click="handleDateClick"
      @event-click="handleEventClick"
      :useViewportHeight="true"
      :viewportHeight="85"
      :customOptions="calendarOptions"
    />
  </div>

  <!-- 보고서 뷰어 모달 -->
  <UiModal
    v-model="reportViewerModal"
    :title="reportViewerTitle"
    size="xlarge"
    :showFooter="false"
    class="report-viewer-modal"
  >
    <div class="report-viewer-container">
      <!-- 단일 보기 모드 -->
      <div class="single-view">
        <!-- 다중 보고서 네비게이션 -->
        <div v-if="selectedDateReports.length > 1" class="navigation-bar">
          <button
            @click="prevReport"
            :disabled="currentReportIndex === 0"
            class="nav-button"
            :class="{ disabled: currentReportIndex === 0 }"
          >
            <i class="icon-chevron-left"></i>
            이전
          </button>

          <!-- 보고서 인디케이터 -->
          <div class="progress-nav">
            <div class="report-indicators">
              <button
                v-for="(report, index) in selectedDateReports"
                :key="report.id"
                @click="jumpToReport(index)"
                :class="['indicator-button', { active: index === currentReportIndex }]"
                :title="getReportTooltip(report)"
              >
                {{ index + 1 }}
              </button>
            </div>

            <!-- 작성자 정보 -->
            <div class="author-preview">
              <span
                v-for="(report, index) in selectedDateReports"
                :key="report.id"
                :class="['author-name', { active: index === currentReportIndex }]"
              >
                {{ report.extendedProps.author
                }}{{ index < selectedDateReports.length - 1 ? ',' : '' }}
              </span>
            </div>
          </div>

          <button
            @click="nextReport"
            :disabled="currentReportIndex === selectedDateReports.length - 1"
            class="nav-button"
            :class="{ disabled: currentReportIndex === selectedDateReports.length - 1 }"
          >
            다음
            <i class="icon-chevron-right"></i>
          </button>
        </div>

        <!-- 현재 보고서 상세 -->
        <div v-if="currentReport" class="report-detail">
          <ReportDetailCard :report="currentReport" />
        </div>
      </div>
    </div>
  </UiModal>
</template>

<script setup>
  import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
  import Calendar from '~/components/common/UI/Calendar.vue'
  import ReportDetailCard from '~/components/domain/Report/ReportDetailCard.vue'

  // 반응형 상태
  const selectedDate = ref(null)
  const dailyReport = ref(true)
  const weeklyReport = ref(true)
  const dateGbnType = ref('w')
  const reportViewerModal = ref(false)
  const currentReportIndex = ref(0)

  const dateGbnOptions = [
    { value: 'w', label: '작성일 기준' },
    { value: 'r', label: '보고일 기준' }
  ]

  const calendarOptions = {
    dayMaxEvents: false,
    moreLinkClick: 'popover',
    eventDisplay: 'block'
  }

  // 보고서 데이터 (실제 환경에서는 API에서 가져와야 함)
  const reportEvents = ref([
    {
      id: '1',
      title: '[이찬용] 프로젝트 A 진행상황',
      start: '2025-05-16',
      allDay: true,
      backgroundColor: '#0AF',
      borderColor: '#0AF',
      extendedProps: {
        reportType: 'weekly',
        author: '이찬용',
        submitTarget: '한성진',
        actualContent:
          '리타게팅 랜딩페이지 수정\n우체국뱅킹 ui/ux 개선 퍼블리싱 작업\n\nSgate 아카데미 퍼블리싱',
        planContent:
          '리타게팅 랜딩페이지 수정\n우체국뱅킹 ui/ux 개선 퍼블리싱 작업\nSgate 아카데미 퍼블리싱\n\nsgate 인사평가 퍼블리싱',
        etcContent: '특별한 의견 없음',
        attachments: [
          { id: 1, name: '프로젝트_진행현황.xlsx', size: 15234 },
          { id: 2, name: '화면설계서.pdf', size: 3421567 }
        ],
        feedbacks: [
          {
            id: 1,
            author: '한성진',
            content: '수고하셨습니다. 다음 주 일정 조율이 필요할 것 같습니다.',
            createdAt: '2025-05-16T16:30:00'
          }
        ],
        summary: '프로젝트 A 1차 개발 완료',
        createTime: '09:30'
      }
    },
    {
      id: '2',
      title: '[김영희] 품질관리 점검',
      start: '2025-05-16',
      allDay: true,
      backgroundColor: '#00B248',
      borderColor: '#00B248',
      extendedProps: {
        reportType: 'daily',
        author: '김영희',
        submitTarget: '이부장',
        actualContent:
          '생산라인 전체 점검 완료\n- 1라인: 정상 가동\n- 2라인: 미세 조정 필요\n- 3라인: 정상 가동',
        planContent:
          '내일 계획:\n- 2라인 미세 조정 작업\n- 월간 품질 보고서 작성\n- 신규 장비 점검',
        etcContent: '전반적으로 양호한 상태',
        attachments: [{ id: 3, name: '품질점검표.pdf', size: 892345 }],
        feedbacks: [],
        summary: '생산라인 품질관리 점검 완료',
        createTime: '16:45'
      }
    },
    {
      id: '3',
      title: '[정수민] 회계 업무 처리',
      start: '2025-05-16',
      allDay: true,
      backgroundColor: '#00B248',
      borderColor: '#00B248',
      extendedProps: {
        reportType: 'daily',
        author: '정수민',
        submitTarget: '최팀장',
        actualContent: '월간 회계 마감 완료\n- 매출/매입 정리\n- 비용 분석\n- 예산 대비 실적 검토',
        planContent: '내일 계획:\n- 분기 보고서 작성\n- 예산 수정안 검토\n- 세무사 미팅 준비',
        etcContent: '예산 대비 105% 달성',
        attachments: [
          { id: 5, name: '월간정산서.xlsx', size: 234567 },
          { id: 6, name: '예산분석표.pdf', size: 445566 }
        ],
        feedbacks: [],
        summary: '월간 회계 마감 및 실적 분석',
        createTime: '11:30'
      }
    },
    {
      id: '4',
      title: '[박민수] 마케팅 활동 보고',
      start: '2025-05-16',
      allDay: true,
      backgroundColor: '#00B248',
      borderColor: '#00B248',
      extendedProps: {
        reportType: 'daily',
        author: '박민수',
        submitTarget: '김과장',
        actualContent:
          '고객사 3곳 방문 완료\n- A사: 제품 데모 진행\n- B사: 계약 조건 협의\n- C사: 추가 요구사항 청취',
        planContent: '내일 계획:\n- A사 후속 미팅 준비\n- B사 계약서 검토\n- 신규 고객사 발굴',
        etcContent: '전반적으로 긍정적인 반응',
        attachments: [],
        feedbacks: [],
        summary: '고객사 방문 및 제품 소개',
        createTime: '14:20'
      }
    }
  ])

  // 계산된 속성
  const filteredReportEvents = computed(() => {
    return reportEvents.value.filter(event => {
      const isDailyIncluded = dailyReport.value && event.extendedProps.reportType === 'daily'
      const isWeeklyIncluded = weeklyReport.value && event.extendedProps.reportType === 'weekly'
      return isDailyIncluded || isWeeklyIncluded
    })
  })

  const selectedDateReports = computed(() => {
    if (!selectedDate.value) return []
    const targetDate = formatDateForComparison(selectedDate.value)
    return filteredReportEvents.value.filter(event => {
      const eventDate = formatDateForComparison(event.start)
      return eventDate === targetDate
    })
  })

  const currentReport = computed(() => {
    return selectedDateReports.value[currentReportIndex.value] || null
  })

  const reportViewerTitle = computed(() => {
    if (!selectedDate.value) return '보고서 뷰어'
    const date = formatDate(selectedDate.value)
    const count = selectedDateReports.value.length
    return `${date} 보고서 (${count}건)`
  })

  // 이벤트 핸들러
  function handleDateClick(info) {
    selectedDate.value = info.date
    currentReportIndex.value = 0
    reportViewerModal.value = true
  }

  function handleEventClick(info) {
    selectedDate.value = info.event.start
    const reportIndex = selectedDateReports.value.findIndex(r => r.id === info.event.id)
    currentReportIndex.value = reportIndex >= 0 ? reportIndex : 0
    reportViewerModal.value = true
  }

  function nextReport() {
    if (currentReportIndex.value < selectedDateReports.value.length - 1) {
      currentReportIndex.value++
    }
  }

  function prevReport() {
    if (currentReportIndex.value > 0) {
      currentReportIndex.value--
    }
  }

  function jumpToReport(index) {
    currentReportIndex.value = index
  }

  // 유틸리티 함수
  function getReportTooltip(report) {
    return `${report.extendedProps.author} - ${report.extendedProps.createTime}`
  }

  function formatDate(date) {
    if (!date) return ''
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date(date))
  }

  function formatDateForComparison(date) {
    if (!date) return ''
    const d = new Date(date)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
      d.getDate()
    ).padStart(2, '0')}`
  }

  // 키보드 이벤트 핸들러
  function handleKeydown(event) {
    if (!reportViewerModal.value) return

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        prevReport()
        break
      case 'ArrowRight':
        event.preventDefault()
        nextReport()
        break
      case 'Escape':
        event.preventDefault()
        reportViewerModal.value = false
        break
    }
  }

  // 라이프사이클 훅
  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
</script>

<style scoped>
  .report-controls {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
    align-items: center;
    position: absolute;
    margin-top: 30px;
    margin-left: 23px;
  }

  .checkbox-group {
    display: flex;
    gap: 10px;
  }

  .report-viewer-modal {
    --modal-width: 90vw;
    --modal-max-width: 1400px;
  }

  .report-viewer-container {
    min-height: 600px;
  }

  .navigation-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    padding: 16px;
    background-color: #f9fafb;
    border-radius: 8px;
  }

  .nav-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background-color: white;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nav-button:hover:not(.disabled) {
    background-color: #f9fafb;
  }

  .nav-button.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .progress-nav {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .report-indicators {
    display: flex;
    gap: 8px;
  }

  .indicator-button {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    background-color: white;
    border: 1px solid #d1d5db;
    color: #6b7280;
  }

  .indicator-button:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .indicator-button.active {
    background-color: #2563eb;
    color: white;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
  }

  .author-preview {
    font-size: 14px;
    color: #6b7280;
  }

  .author-name {
    margin: 0 4px;
  }

  .author-name.active {
    font-weight: 600;
    color: #2563eb;
  }

  .report-detail {
    animation: fadeIn 0.3s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
