<template>
  <div class="report-page">
    <!-- 체크박스와 셀렉트 박스 -->
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

  <!-- 보고서 상세 모달 -->
  <UiModal v-model="reportDetailModal" :title="reportDetailTitle" size="xlarge"> 3 </UiModal>
</template>

<script setup>
  import { ref, computed, reactive, watch } from 'vue'
  import Calendar from '~/components/common/UI/Calendar.vue'

  // 선택된 날짜와 보고서
  const selectedDate = ref(null)
  const selectedReport = ref(null)

  // 보고서 필터 상태
  const dailyReport = ref(true)
  const weeklyReport = ref(true)
  const dateGbnType = ref('w')

  // 모달 상태
  const reportListModal = ref(false)
  const reportDetailModal = ref(false)

  // 편집 모드
  const isEditMode = ref(false)

  // 피드백 내용
  const feedbackContent = ref('')

  // 보고서 폼 데이터
  const reportForm = reactive({
    type: 'daily',
    title: '',
    content: '',
    author: '현재사용자' // 실제로는 로그인한 사용자 정보
  })

  // 보고서 상세 모달 제목 계산
  const reportDetailTitle = computed(() => {
    if (!selectedReport.value) return '보고서 상세'

    const report = selectedReport.value
    const date = formatDate(report.start)
    const type = report.extendedProps.reportType === 'daily' ? '일간보고' : '주간보고'
    const author = report.extendedProps.author
    const target = report.extendedProps.submitTarget || '미지정'

    return `${date} ${type}[${author}] 제출대상 : ${target}`
  })

  // 캘린더 옵션 (같은 날짜에 여러 이벤트 표시)
  const calendarOptions = {
    dayMaxEvents: false, // 이벤트 개수 제한 없음
    moreLinkClick: 'popover', // 더보기 클릭시 팝오버 표시
    eventDisplay: 'block'
  }

  // 보고서 이벤트 데이터 (같은 날짜에 여러 개)
  const reportEvents = ref([
    {
      id: '7',
      title: '[김영희] 품질관리 점검',
      start: '2025-05-16',
      allDay: true,
      backgroundColor: '#ff6b35',
      borderColor: '#ff6b35',
      extendedProps: {
        reportType: 'daily',
        author: '김영희',
        submitTarget: '이부장',
        actualContent: `생산라인 전체 점검 완료
+- 1라인: 정상 가동
+- 2라인: 미세 조정 필요
+- 3라인: 정상 가동`,
        planContent: `내일 계획:
+- 2라인 미세 조정 작업
+- 월간 품질 보고서 작성
+- 신규 장비 점검`,
        etcContent: '전반적으로 양호한 상태',
        attachments: [{ id: 3, name: '품질점검표.pdf', size: 892345 }],
        feedbacks: [],
        summary: '생산라인 품질관리 점검 완료',
        createTime: '16:45'
      }
    },
    {
      id: '7',
      title: '[김영희] 품질관리 점검',
      start: '2025-05-16',
      allDay: true,
      backgroundColor: '#ff6b35',
      borderColor: '#ff6b35',
      extendedProps: {
        reportType: 'daily',
        author: '김영희',
        submitTarget: '이부장',
        actualContent: `생산라인 전체 점검 완료
- 1라인: 정상 가동
- 2라인: 미세 조정 필요
- 3라인: 정상 가동`,
        planContent: `내일 계획:
- 2라인 미세 조정 작업
- 월간 품질 보고서 작성
- 신규 장비 점검`,
        etcContent: '전반적으로 양호한 상태',
        attachments: [{ id: 3, name: '품질점검표.pdf', size: 892345 }],
        feedbacks: [],
        summary: '생산라인 품질관리 점검 완료',
        createTime: '16:45'
      }
    },
    {
      id: '6',
      title: '[김영희] 품질관리 점검',
      start: '2025-05-16',
      allDay: true,
      backgroundColor: '#ff6b35',
      borderColor: '#ff6b35',
      extendedProps: {
        reportType: 'daily',
        author: '김영희',
        submitTarget: '이부장',
        actualContent: `생산라인 전체 점검 완료
- 1라인: 정상 가동
- 2라인: 미세 조정 필요
- 3라인: 정상 가동`,
        planContent: `내일 계획:
- 2라인 미세 조정 작업
- 월간 품질 보고서 작성
- 신규 장비 점검`,
        etcContent: '전반적으로 양호한 상태',
        attachments: [{ id: 3, name: '품질점검표.pdf', size: 892345 }],
        feedbacks: [],
        summary: '생산라인 품질관리 점검 완료',
        createTime: '16:45'
      }
    },
    {
      id: '1',
      title: '[이찬용] 프로젝트 A 진행상황',
      start: '2025-05-09',
      allDay: true,
      backgroundColor: '#0084ff',
      borderColor: '#0084ff',
      extendedProps: {
        reportType: 'weekly',
        author: '이찬용',
        submitTarget: '한성진',
        actualContent: `리타게팅 랜딩페이지 수정
우체국뱅킹 ui/ux 개선 퍼블리싱 작업

Sgate 아카데미 퍼블리싱`,
        planContent: `리타게팅 랜딩페이지 수정
우체국뱅킹 ui/ux 개선 퍼블리싱 작업
Sgate 아카데미 퍼블리싱

sgate 인사평가 퍼블리싱`,
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
            createdAt: '2025-05-09T16:30:00'
          }
        ],
        summary: '프로젝트 A 1차 개발 완료',
        createTime: '09:30'
      }
    },
    {
      id: '2',
      title: '[박민수] 마케팅 활동 보고',
      start: '2025-05-09',
      allDay: true,
      backgroundColor: '#28a745',
      borderColor: '#28a745',
      extendedProps: {
        reportType: 'daily',
        author: '박민수',
        submitTarget: '김과장',
        actualContent: `고객사 3곳 방문 완료
- A사: 제품 데모 진행
- B사: 계약 조건 협의
- C사: 추가 요구사항 청취`,
        planContent: `내일 계획:
- A사 후속 미팅 준비
- B사 계약서 검토
- 신규 고객사 발굴`,
        etcContent: '전반적으로 긍정적인 반응',
        attachments: [],
        feedbacks: [],
        summary: '고객사 방문 및 제품 소개',
        createTime: '14:20'
      }
    },
    {
      id: '3',
      title: '[김영희] 품질관리 점검',
      start: '2025-05-09',
      allDay: true,
      backgroundColor: '#ff6b35',
      borderColor: '#ff6b35',
      extendedProps: {
        reportType: 'daily',
        author: '김영희',
        submitTarget: '이부장',
        actualContent: `생산라인 전체 점검 완료
- 1라인: 정상 가동
- 2라인: 미세 조정 필요
- 3라인: 정상 가동`,
        planContent: `내일 계획:
- 2라인 미세 조정 작업
- 월간 품질 보고서 작성
- 신규 장비 점검`,
        etcContent: '전반적으로 양호한 상태',
        attachments: [{ id: 3, name: '품질점검표.pdf', size: 892345 }],
        feedbacks: [],
        summary: '생산라인 품질관리 점검 완료',
        createTime: '16:45'
      }
    },
    {
      id: '4',
      title: '[이찬용] 개발팀 주간회의',
      start: '2025-05-16',
      allDay: true,
      backgroundColor: '#0084ff',
      borderColor: '#0084ff',
      extendedProps: {
        reportType: 'weekly',
        author: '이찬용',
        submitTarget: '한성진',
        actualContent: `개발팀 주간회의 진행
- 각 프로젝트 진행상황 점검
- 이슈 사항 논의 및 해결방안 도출
- 리소스 재배치 논의`,
        planContent: `다음 주 계획:
- 프로젝트 A 2차 개발 착수
- 프로젝트 B 요구사항 분석
- 신규 개발환경 구축`,
        etcContent: '팀원들의 적극적인 참여로 생산적인 회의였음',
        attachments: [{ id: 4, name: '회의록.docx', size: 156789 }],
        feedbacks: [],
        summary: '개발팀 주간회의 및 계획 수립',
        createTime: '10:00'
      }
    },
    {
      id: '5',
      title: '[정수민] 회계 업무 처리',
      start: '2025-05-16',
      allDay: true,
      backgroundColor: '#6f42c1',
      borderColor: '#6f42c1',
      extendedProps: {
        reportType: 'daily',
        author: '정수민',
        submitTarget: '최팀장',
        actualContent: `월간 회계 마감 완료
- 매출/매입 정리
- 비용 분석
- 예산 대비 실적 검토`,
        planContent: `내일 계획:
- 분기 보고서 작성
- 예산 수정안 검토
- 세무사 미팅 준비`,
        etcContent: '예산 대비 105% 달성',
        attachments: [
          { id: 5, name: '월간정산서.xlsx', size: 234567 },
          { id: 6, name: '예산분석표.pdf', size: 445566 }
        ],
        feedbacks: [],
        summary: '월간 회계 마감 및 실적 분석',
        createTime: '11:30'
      }
    }
  ])

  // 필터링된 보고서 이벤트
  const filteredReportEvents = computed(() => {
    return reportEvents.value.filter(event => {
      const isDailyIncluded = dailyReport.value && event.extendedProps.reportType === 'daily'
      const isWeeklyIncluded = weeklyReport.value && event.extendedProps.reportType === 'weekly'
      return isDailyIncluded || isWeeklyIncluded
    })
  })

  // 선택된 날짜의 보고서들
  const selectedDateReports = computed(() => {
    if (!selectedDate.value) return []

    const targetDate = formatDateForComparison(selectedDate.value)
    return filteredReportEvents.value.filter(event => {
      const eventDate = formatDateForComparison(event.start)
      return eventDate === targetDate
    })
  })

  // 이벤트 핸들러
  function handleDateClick(info) {
    selectedDate.value = info.date
    selectedReport.value = null
    reportListModal.value = true
  }

  function handleEventClick(info) {
    selectedDate.value = info.event.start
    viewReportDetail(info.event)
  }

  function viewReportDetail(report) {
    selectedReport.value = report
    reportListModal.value = false
    reportDetailModal.value = true
  }

  function openCreateModal() {
    isEditMode.value = false
    reportListModal.value = false
    reportCreateModal.value = true
  }

  function editReport() {
    if (!selectedReport.value) return

    isEditMode.value = true
    reportForm.type = selectedReport.value.extendedProps.reportType
    reportForm.title = selectedReport.value.title
    reportForm.content = selectedReport.value.extendedProps.content

    reportDetailModal.value = false
    reportCreateModal.value = true
  }

  function formatDate(date) {
    if (!date) return ''
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date(date))
  }

  function formatDateTime(dateTimeString) {
    if (!dateTimeString) return ''
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateTimeString))
  }

  function formatTime(time) {
    return time || ''
  }

  function formatFileSize(bytes) {
    if (!bytes) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  function formatDateForComparison(date) {
    if (!date) return ''
    const d = new Date(date)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
      d.getDate()
    ).padStart(2, '0')}`
  }

  function formatDateForCalendar(date) {
    if (!date) return ''
    return formatDateForComparison(date)
  }
</script>
