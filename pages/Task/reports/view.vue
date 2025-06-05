<template>
  <div class="report-page">
    <!-- 기존 컨트롤 유지 -->
    <div class="report-controls mt-20 com-header flex gap-10 mb-20">
      <div class="checkbox-group flex gap-10">
        <UiCheckbox size="large" v-model="dailyReport" label="일간보고" value="d" />
        <UiCheckbox size="large" v-model="weeklyReport" label="주간보고" value="w" />
      </div>
      <div class="select-group">
        <UiSelect
          v-model="dateGbnType"
          class="w-150"
          :options="[
            { value: 'w', label: '작성일 기준' },
            { value: 'r', label: '보고일 기준' }
          ]"
        />
      </div>
    </div>

    <!-- FullCalendar 컴포넌트 -->
    <Calendar
      v-model="selectedDate"
      :events="filteredReportEvents"
      @date-click="handleDateClick"
      @event-click="handleEventClick"
      :useViewportHeight="true"
      :viewportHeight="80"
      :customOptions="calendarOptions"
    />
  </div>

  <!-- 개선된 보고서 뷰어 모달 -->
  <UiModal
    v-model="reportViewerModal"
    :title="reportViewerTitle"
    size="xlarge"
    :showFooter="false"
    class="report-viewer-modal"
  >
    <div class="report-viewer-container">
      <!-- 뷰 모드 선택 탭 -->
      <div class="view-mode-tabs flex border-b mb-6">
        <button
          v-for="mode in viewModes"
          :key="mode.value"
          @click="currentViewMode = mode.value"
          :class="[
            'px-4 py-2 border-b-2 transition-colors',
            currentViewMode === mode.value
              ? 'border-blue-500 text-blue-600 bg-blue-50'
              : 'border-transparent text-gray-600 hover:text-gray-800'
          ]"
        >
          {{ mode.label }}
          <span
            v-if="mode.value === 'single' && selectedDateReports.length > 1"
            class="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
          >
            {{ currentReportIndex + 1 }}/{{ selectedDateReports.length }}
          </span>
        </button>
      </div>

      <!-- 단일 보기 + 네비게이션 -->
      <div v-if="currentViewMode === 'single'" class="single-view">
        <!-- 네비게이션 바 (여러 보고서가 있을 때만 표시) -->
        <div
          v-if="selectedDateReports.length > 1"
          class="navigation-bar flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg"
        >
          <button
            @click="prevReport"
            :disabled="currentReportIndex === 0"
            class="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <i class="icon-chevron-left"></i>
            이전
          </button>

          <!-- 진행 표시기 + 빠른 점프 -->
          <div class="progress-nav flex items-center gap-3">
            <div class="report-indicators flex gap-2">
              <button
                v-for="(report, index) in selectedDateReports"
                :key="report.id"
                @click="jumpToReport(index)"
                :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all transform hover:scale-110',
                  index === currentReportIndex
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white border border-gray-300 text-gray-600 hover:border-blue-400'
                ]"
                :title="`${report.extendedProps.author} - ${report.extendedProps.createTime}`"
              >
                {{ index + 1 }}
              </button>
            </div>

            <!-- 작성자 프리뷰 -->
            <div class="author-preview text-sm text-gray-600">
              <span
                v-for="(report, index) in selectedDateReports"
                :key="report.id"
                :class="{ 'font-semibold text-blue-600': index === currentReportIndex }"
                class="mx-1"
              >
                {{ report.extendedProps.author
                }}{{ index < selectedDateReports.length - 1 ? ',' : '' }}
              </span>
            </div>
          </div>

          <button
            @click="nextReport"
            :disabled="currentReportIndex === selectedDateReports.length - 1"
            class="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
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

      <!-- 타임라인 보기 -->
      <div v-else-if="currentViewMode === 'timeline'" class="timeline-view">
        <div class="timeline-container">
          <div
            v-for="(report, index) in sortedReportsByTime"
            :key="report.id"
            class="timeline-item flex gap-4 mb-6"
          >
            <div class="timeline-marker flex-shrink-0">
              <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
              <div
                v-if="index < sortedReportsByTime.length - 1"
                class="w-0.5 h-16 bg-gray-300 ml-1.5 mt-2"
              ></div>
            </div>
            <div class="timeline-content flex-1">
              <div class="time-header flex items-center gap-3 mb-2">
                <span class="font-semibold text-blue-600">{{
                  report.extendedProps.createTime
                }}</span>
                <span class="text-sm text-gray-500">{{ report.extendedProps.author }}</span>
                <span
                  :class="[
                    'px-2 py-1 rounded text-xs',
                    report.extendedProps.reportType === 'daily'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  ]"
                >
                  {{ report.extendedProps.reportType === 'daily' ? '일간' : '주간' }}
                </span>
              </div>
              <div
                class="report-preview p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                @click="viewSingleReport(selectedDateReports.findIndex(r => r.id === report.id))"
              >
                <h4 class="font-medium mb-2">{{ report.title }}</h4>
                <p class="text-sm text-gray-600 line-clamp-3">
                  {{ report.extendedProps.actualContent }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UiModal>
</template>

<script setup>
  import { ref, computed, reactive, watch } from 'vue'
  import Calendar from '~/components/common/UI/Calendar.vue'
  import ReportDetailCard from '~/components/domain/Report/ReportDetailCard.vue'

  // 기존 상태들
  const selectedDate = ref(null)
  const selectedReport = ref(null)
  const dailyReport = ref(true)
  const weeklyReport = ref(true)
  const dateGbnType = ref('w')

  // 새로운 뷰어 관련 상태
  const reportViewerModal = ref(false)
  const currentViewMode = ref('single') // 'single', 'timeline'
  const currentReportIndex = ref(0)

  // 뷰 모드 옵션
  const viewModes = [
    { value: 'single', label: '단일 보기' },
    { value: 'timeline', label: '타임라인' }
  ]

  // 보고서 데이터 (중복 제거 및 정리)
  const reportEvents = ref([
    {
      id: '1',
      title: '[이찬용] 프로젝트 A 진행상황',
      start: '2025-05-16',
      allDay: true,
      backgroundColor: '#0084ff',
      borderColor: '#0084ff',
      extendedProps: {
        reportType: 'weekly',
        author: '이찬용',
        submitTarget: '한성진',
        actualContent: `리타게팅 랜딩페이지 수정\n우체국뱅킹 ui/ux 개선 퍼블리싱 작업\n\nSgate 아카데미 퍼블리싱`,
        planContent: `리타게팅 랜딩페이지 수정\n우체국뱅킹 ui/ux 개선 퍼블리싱 작업\nSgate 아카데미 퍼블리싱\n\nsgate 인사평가 퍼블리싱`,
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
      backgroundColor: '#ff6b35',
      borderColor: '#ff6b35',
      extendedProps: {
        reportType: 'daily',
        author: '김영희',
        submitTarget: '이부장',
        actualContent: `생산라인 전체 점검 완료\n- 1라인: 정상 가동\n- 2라인: 미세 조정 필요\n- 3라인: 정상 가동`,
        planContent: `내일 계획:\n- 2라인 미세 조정 작업\n- 월간 품질 보고서 작성\n- 신규 장비 점검`,
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
      backgroundColor: '#6f42c1',
      borderColor: '#6f42c1',
      extendedProps: {
        reportType: 'daily',
        author: '정수민',
        submitTarget: '최팀장',
        actualContent: `월간 회계 마감 완료\n- 매출/매입 정리\n- 비용 분석\n- 예산 대비 실적 검토`,
        planContent: `내일 계획:\n- 분기 보고서 작성\n- 예산 수정안 검토\n- 세무사 미팅 준비`,
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
      backgroundColor: '#28a745',
      borderColor: '#28a745',
      extendedProps: {
        reportType: 'daily',
        author: '박민수',
        submitTarget: '김과장',
        actualContent: `고객사 3곳 방문 완료\n- A사: 제품 데모 진행\n- B사: 계약 조건 협의\n- C사: 추가 요구사항 청취`,
        planContent: `내일 계획:\n- A사 후속 미팅 준비\n- B사 계약서 검토\n- 신규 고객사 발굴`,
        etcContent: '전반적으로 긍정적인 반응',
        attachments: [],
        feedbacks: [],
        summary: '고객사 방문 및 제품 소개',
        createTime: '14:20'
      }
    }
  ])

  // 계산된 속성들
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

  const sortedReportsByTime = computed(() => {
    return [...selectedDateReports.value].sort((a, b) => {
      const timeA = a.extendedProps.createTime
      const timeB = b.extendedProps.createTime
      return timeA.localeCompare(timeB)
    })
  })

  const reportViewerTitle = computed(() => {
    if (!selectedDate.value) return '보고서 뷰어'

    const date = formatDate(selectedDate.value)
    const count = selectedDateReports.value.length
    return `${date} 보고서 (${count}건)`
  })

  // 캘린더 옵션
  const calendarOptions = {
    dayMaxEvents: false,
    moreLinkClick: 'popover',
    eventDisplay: 'block'
  }

  // 이벤트 핸들러들
  function handleDateClick(info) {
    selectedDate.value = info.date
    currentReportIndex.value = 0
    currentViewMode.value = 'single'
    reportViewerModal.value = true
  }

  function handleEventClick(info) {
    selectedDate.value = info.event.start
    const reportIndex = selectedDateReports.value.findIndex(r => r.id === info.event.id)
    currentReportIndex.value = reportIndex >= 0 ? reportIndex : 0
    currentViewMode.value = 'single'
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

  function viewSingleReport(index) {
    currentReportIndex.value = index
    currentViewMode.value = 'single'
  }

  // 키보드 단축키 지원
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

  // 라이프사이클
  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })

  // 뷰 모드 변경 시 분할 보기 인덱스 초기화
  watch(currentViewMode, newMode => {
    if (newMode === 'split' && selectedDateReports.value.length >= 2) {
      splitViewReportA.value = 0
      splitViewReportB.value = 1
    }
  })

  // 유틸리티 함수들
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
</script>

<style scoped>
  .report-viewer-modal {
    --modal-width: 90vw;
    --modal-max-width: 1400px;
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .report-item:hover {
    transform: translateY(-1px);
  }

  .timeline-marker {
    position: relative;
  }

  .timeline-content {
    animation: slideInRight 0.3s ease-out;
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .report-indicators button:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
</style>
