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
  <UiModal v-model="reportViewerModal" size="xxlarge" height="90vh" :showFooter="false">
    <template #title>
      <div class="modal-title">
        {{ formatDate(selectedDate) }} 보고서
        <div class="author-tags">
          <span
            v-for="(report, index) in selectedDateReports"
            :key="report.id"
            class="author-tag"
            :class="{
              weekly: report.extendedProps.reportType === 'weekly',
              daily: report.extendedProps.reportType === 'daily',
              active: index === currentReportIndex
            }"
            @click="selectReport(index)"
          >
            {{ report.extendedProps.author }}
          </span>
        </div>
      </div>
    </template>

    <div class="modal-content" style="position: relative; top: -15px">
      <!-- 현재 선택된 보고서가 있을 때만 표시 -->
      <div v-if="currentReport" class="report-container">
        <!-- 보고서 헤더 -->
        <div class="report-header">
          <div class="author-info">
            <i class="icon icon-md icon-user2"></i>
            <div class="author-info-text">
              <p>{{ currentReport.extendedProps.author }}</p>
              <span>{{ currentReport.extendedProps.group }}</span>
            </div>
          </div>
          <div class="report-actions">
            <div class="left-actions">
              <UiTooltip position="bottom">
                <template #trigger>
                  <div class="report-submit-target">
                    제출대상
                    <i class="icon-md icon-user"></i>
                  </div>
                </template>
                <p>{{ currentReport.extendedProps.submitTarget }}</p>
              </UiTooltip>
            </div>
          </div>
        </div>

        <!-- 보고서 본문 -->
        <div class="report-body">
          <!-- KPI 및 실적/계획 테이블 -->
          <div class="report-section">
            <div class="report-content-flex">
              <div class="report-content-item">
                <h3 class="report-section-title">
                  {{ currentReport.extendedProps.reportType === 'weekly' ? 'KPI' : 'KPI' }}
                </h3>
                <div
                  class="content-body"
                  v-html="formatContent(currentReport.extendedProps.actualContent)"
                ></div>
              </div>

              <div class="report-content-item">
                <h3 class="report-section-title">
                  {{
                    currentReport.extendedProps.reportType === 'weekly' ? '금주실적' : '금주실적'
                  }}
                </h3>
                <div
                  class="content-body"
                  v-html="formatContent(currentReport.extendedProps.actualContent)"
                ></div>
              </div>

              <div class="report-content-item">
                <h3 class="report-section-title">
                  {{
                    currentReport.extendedProps.reportType === 'weekly' ? '차주계획' : '차주계획'
                  }}
                </h3>
                <div
                  class="content-body"
                  v-html="formatContent(currentReport.extendedProps.planContent)"
                ></div>
              </div>
            </div>
          </div>

          <div class="flex mt-20 gap-20">
            <!-- 의견/기타 -->
            <div class="report-section flex-1">
              <h2 class="report-section-title">의견/기타</h2>
              <div class="content-body">
                {{ currentReport.extendedProps.etcContent || '특별한 의견 없음' }}
              </div>
            </div>

            <!-- 첨부파일 -->
            <div class="report-section flex-1">
              <h2 class="report-section-title">첨부파일</h2>
              <div class="content-body">
                <div
                  v-if="currentReport.extendedProps.attachments?.length"
                  class="attachments-list"
                >
                  <div
                    v-for="file in currentReport.extendedProps.attachments"
                    :key="file.id"
                    class="attachment-item"
                  >
                    <i class="icon icon-file"></i>
                    <span class="file-name">{{ file.name }}</span>
                    <span class="file-size">({{ formatFileSize(file.size) }})</span>
                  </div>
                </div>
                <div v-else class="no-attachments">첨부파일이 없습니다.</div>
              </div>
            </div>
          </div>

          <!-- 피드백 -->
          <div class="mt-20">
            <div class="report-section">
              <h2 class="report-section-title">피드백</h2>
            </div>
          </div>
        </div>
      </div>

      <!-- 선택된 보고서가 없을 때 -->
      <div v-else class="no-report">선택된 보고서가 없습니다.</div>
    </div>
  </UiModal>

  <!-- 스와이퍼 스타일 네비게이션 버튼들 -->
  <div v-if="reportViewerModal" class="swiper-navigation">
    <!-- 이전 버튼 (왼쪽) -->
    <button
      class="swiper-button swiper-button-prev"
      @click="goToPreviousReport"
      :disabled="!canGoToPrevious"
      :class="{ 'swiper-button-disabled': !canGoToPrevious }"
      title="이전 보고서"
    >
      <i class="icon icon-arrow-left icon-xxl"></i>
    </button>

    <!-- 다음 버튼 (오른쪽) -->
    <button
      class="swiper-button swiper-button-next"
      @click="goToNextReport"
      :disabled="!canGoToNext"
      :class="{ 'swiper-button-disabled': !canGoToNext }"
      title="다음 보고서"
    >
      <i class="icon icon-arrow-right icon-xxl"></i>
    </button>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import Calendar from '~/components/common/UI/Calendar.vue'

  // ========================================
  // 반응형 상태 정의
  // ========================================

  /**
   * 함수 목적: 선택된 날짜 상태 관리
   * @type {Ref<Date|null>}
   */
  const selectedDate = ref(null)

  /**
   * 함수 목적: 일간보고 필터 표시 여부
   * @type {Ref<boolean>}
   */
  const dailyReport = ref(true)

  /**
   * 함수 목적: 주간보고 필터 표시 여부
   * @type {Ref<boolean>}
   */
  const weeklyReport = ref(true)

  /**
   * 함수 목적: 날짜 구분 타입 설정 (작성일/보고일 기준)
   * @type {Ref<string>}
   */
  const dateGbnType = ref('w')

  /**
   * 함수 목적: 보고서 뷰어 모달 표시 상태
   * @type {Ref<boolean>}
   */
  const reportViewerModal = ref(false)

  /**
   * 함수 목적: 현재 선택된 보고서 인덱스
   * @type {Ref<number>}
   */
  const currentReportIndex = ref(0)

  // ========================================
  // 정적 데이터 및 옵션
  // ========================================

  /**
   * 함수 목적: 날짜 구분 선택 옵션 제공
   * @type {Array}
   */
  const dateGbnOptions = [
    { value: 'w', label: '작성일 기준' },
    { value: 'r', label: '보고일 기준' }
  ]

  /**
   * 함수 목적: 캘린더 컴포넌트 옵션 설정
   * @type {Object}
   */
  const calendarOptions = {
    dayMaxEvents: false,
    moreLinkClick: 'popover',
    eventDisplay: 'block'
  }

  /**
   * 함수 목적: 보고서 이벤트 데이터 저장
   * @type {Ref<Array>}
   */
  const reportEvents = ref([
    // 기존 5/16 이찬용 보고서
    {
      id: '1',
      title: '[이찬용] 프로젝트 A 진행상황',
      start: '2025-06-16',
      allDay: true,
      backgroundColor: '#0AF',
      borderColor: '#0AF',
      extendedProps: {
        reportType: 'weekly',
        author: '이찬용',
        submitTarget: '한성진',
        group: 'UX/UI 팀',
        actualContent: `리타게팅 랜딩페이지 수정
우체국뱅킹 ui/ux 개선 퍼블리싱 작업
Sgate 아카데미 퍼블리싱
Vue.js 컴포넌트 리팩토링
반응형 레이아웃 최적화`,
        planContent: `차주 계획:
- 리타게팅 랜딩페이지 최종 검수
- 우체국뱅킹 ui/ux 개선 완료
- Sgate 아카데미 퍼블리싱 마무리
- 신규 프로젝트 기획 참여`,
        etcContent: '전반적으로 계획대로 진행 중입니다.',
        attachments: [
          { id: 1, name: '프로젝트_진행현황.xlsx', size: 15234 },
          { id: 2, name: '화면설계서.pdf', size: 3421567 }
        ],
        summary: '프로젝트 A 1차 개발 완료',
        createTime: '09:30'
      }
    },
    {
      id: '2',
      title: '[김영희] 품질관리 점검',
      start: '2025-06-16',
      allDay: true,
      backgroundColor: '#00B248',
      borderColor: '#00B248',
      extendedProps: {
        reportType: 'daily',
        author: '김영희',
        submitTarget: '이부장, 김영희, 홍길동, 김민수, 김정민',
        group: '품질관리 팀',
        actualContent: `생산라인 전체 점검 완료
- 1라인: 정상 가동
- 2라인: 미세 조정 필요
- 3라인: 정상 가동`,
        planContent: `내일 계획:
- 2라인 미세 조정 작업
- 월간 품질 보고서 작성
- 신규 장비 점검`,
        etcContent: '전반적으로 양호한 상태입니다.',
        attachments: [{ id: 3, name: '품질점검표.pdf', size: 892345 }],
        summary: '생산라인 품질관리 점검 완료',
        createTime: '16:45'
      }
    },
    {
      id: '3',
      title: '[이찬용] 프로젝트 A 진행상황',
      start: '2025-06-16',
      allDay: true,
      backgroundColor: '#0AF',
      borderColor: '#0AF',
      extendedProps: {
        reportType: 'weekly',
        author: '이찬용',
        submitTarget: '한성진',
        group: 'UX/UI 팀',
        actualContent: `리타게팅 랜딩페이지 수정
우체국뱅킹 ui/ux 개선 퍼블리싱 작업
Sgate 아카데미 퍼블리싱
Vue.js 컴포넌트 리팩토링
반응형 레이아웃 최적화`,
        planContent: `차주 계획:
- 리타게팅 랜딩페이지 최종 검수
- 우체국뱅킹 ui/ux 개선 퍼블리싱
- Sgate 아카데미 퍼블리싱
- Vue.js 컴포넌트 리팩토링
- 반응형 레이아웃 최적화`,
        etcContent: '전반적으로 양호한 상태입니다.',
        attachments: [{ id: 3, name: '품질점검표.pdf', size: 892345 }],
        summary: '생산라인 품질관리 점검 완료',
        createTime: '16:45'
      }
    }
    // 추가 데이터는 필요시 확장 가능
  ])

  // ========================================
  // 계산된 속성 (Computed Properties)
  // ========================================

  /**
   * 함수 목적: 필터 조건에 맞는 보고서 이벤트 목록 반환
   * @returns {Array} 필터링된 보고서 목록
   */
  const filteredReportEvents = computed(() => {
    return reportEvents.value.filter(event => {
      const isDailyIncluded = dailyReport.value && event.extendedProps.reportType === 'daily'
      const isWeeklyIncluded = weeklyReport.value && event.extendedProps.reportType === 'weekly'
      return isDailyIncluded || isWeeklyIncluded
    })
  })

  /**
   * 함수 목적: 선택된 날짜의 보고서 목록 반환
   * @returns {Array} 선택된 날짜에 해당하는 보고서 배열
   */
  const selectedDateReports = computed(() => {
    if (!selectedDate.value) return []
    const targetDate = formatDateForComparison(selectedDate.value)
    return filteredReportEvents.value.filter(event => {
      const eventDate = formatDateForComparison(event.start)
      return eventDate === targetDate
    })
  })

  /**
   * 함수 목적: 현재 선택된 보고서 객체 반환
   * @returns {Object|null} 현재 선택된 보고서 객체 또는 null
   */
  const currentReport = computed(() => {
    return selectedDateReports.value[currentReportIndex.value] || null
  })

  /**
   * 함수 목적: 현재 작성자의 모든 보고서 목록 반환 (시간순 정렬)
   * @returns {Array} 작성자별 보고서 배열
   */
  const currentAuthorReports = computed(() => {
    if (!currentReport.value) return []

    const currentAuthor = currentReport.value.extendedProps.author
    return filteredReportEvents.value
      .filter(event => event.extendedProps.author === currentAuthor)
      .sort((a, b) => new Date(a.start) - new Date(b.start))
  })

  /**
   * 함수 목적: 현재 작성자 보고서 목록에서의 인덱스 반환
   * @returns {number} 현재 보고서의 인덱스 위치
   */
  const currentAuthorReportIndex = computed(() => {
    if (!currentReport.value || currentAuthorReports.value.length === 0) return 0
    return currentAuthorReports.value.findIndex(report => report.id === currentReport.value.id)
  })

  /**
   * 함수 목적: 이전 보고서로 이동 가능 여부 확인
   * @returns {boolean} 이동 가능 여부
   */
  const canGoToPrevious = computed(() => {
    return currentAuthorReportIndex.value > 0
  })

  /**
   * 함수 목적: 다음 보고서로 이동 가능 여부 확인
   * @returns {boolean} 이동 가능 여부
   */
  const canGoToNext = computed(() => {
    return currentAuthorReportIndex.value < currentAuthorReports.value.length - 1
  })

  // ========================================
  // 이벤트 핸들러 함수들
  // ========================================

  /**
   * 함수 목적: 같은 작성자의 이전 시간순 보고서로 이동
   * @description 현재 작성자의 이전 보고서가 있을 때만 이동 처리
   */
  function goToPreviousReport() {
    if (!canGoToPrevious.value) return

    const previousReport = currentAuthorReports.value[currentAuthorReportIndex.value - 1]
    if (previousReport) {
      selectedDate.value = new Date(previousReport.start)
      updateCurrentReportIndex(previousReport)
    }
  }

  /**
   * 함수 목적: 같은 작성자의 다음 시간순 보고서로 이동
   * @description 현재 작성자의 다음 보고서가 있을 때만 이동 처리
   */
  function goToNextReport() {
    if (!canGoToNext.value) return

    const nextReport = currentAuthorReports.value[currentAuthorReportIndex.value + 1]
    if (nextReport) {
      selectedDate.value = new Date(nextReport.start)
      updateCurrentReportIndex(nextReport)
    }
  }

  /**
   * 함수 목적: 캘린더 날짜 클릭 시 모달 열기
   * @param {Object} info - 클릭된 날짜 정보 객체
   */
  function handleDateClick(info) {
    selectedDate.value = info.date
    currentReportIndex.value = 0
    reportViewerModal.value = true
  }

  /**
   * 함수 목적: 캘린더 이벤트 클릭 시 해당 보고서로 이동
   * @param {Object} info - 클릭된 이벤트 정보 객체
   */
  function handleEventClick(info) {
    selectedDate.value = info.event.start
    const reportIndex = selectedDateReports.value.findIndex(r => r.id === info.event.id)
    currentReportIndex.value = reportIndex >= 0 ? reportIndex : 0
    reportViewerModal.value = true
  }

  /**
   * 함수 목적: 작성자 태그 클릭 시 해당 보고서 선택
   * @param {number} index - 선택할 보고서 인덱스
   */
  function selectReport(index) {
    if (index >= 0 && index < selectedDateReports.value.length) {
      currentReportIndex.value = index
    }
  }

  /**
   * 함수 목적: 키보드 단축키 처리 (화살표, ESC 키)
   * @param {KeyboardEvent} event - 키보드 이벤트 객체
   */
  function handleKeydown(event) {
    if (!reportViewerModal.value) return

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        goToPreviousReport()
        break
      case 'ArrowRight':
        event.preventDefault()
        goToNextReport()
        break
      case 'ArrowUp':
        event.preventDefault()
        // 같은 날짜 내에서 이전 작성자
        if (currentReportIndex.value > 0) {
          currentReportIndex.value--
        }
        break
      case 'ArrowDown':
        event.preventDefault()
        // 같은 날짜 내에서 다음 작성자
        if (currentReportIndex.value < selectedDateReports.value.length - 1) {
          currentReportIndex.value++
        }
        break
      case 'Escape':
        event.preventDefault()
        reportViewerModal.value = false
        break
    }
  }

  // ========================================
  // 유틸리티 함수들
  // ========================================

  /**
   * 함수 목적: 대상 보고서에 맞는 현재 인덱스 업데이트
   * @param {Object} targetReport - 대상 보고서 객체
   */
  function updateCurrentReportIndex(targetReport) {
    const targetDate = formatDateForComparison(targetReport.start)
    const dateReports = filteredReportEvents.value.filter(event => {
      const eventDate = formatDateForComparison(event.start)
      return eventDate === targetDate
    })

    const reportIndex = dateReports.findIndex(r => r.id === targetReport.id)
    currentReportIndex.value = reportIndex >= 0 ? reportIndex : 0
  }

  /**
   * 함수 목적: 날짜를 한국어 형식으로 포맷팅
   * @param {Date|string} date - 포맷할 날짜
   * @returns {string} YYYY.MM.DD 형식의 한국어 날짜 문자열
   */
  function formatDate(date) {
    if (!date) return ''
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date(date))
  }

  /**
   * 함수 목적: 날짜 비교를 위한 표준 형식으로 변환
   * @param {Date|string} date - 변환할 날짜
   * @returns {string} YYYY-MM-DD 형식 문자열
   */
  function formatDateForComparison(date) {
    if (!date) return ''
    const d = new Date(date)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
      d.getDate()
    ).padStart(2, '0')}`
  }

  /**
   * 함수 목적: 보고서 내용의 줄바꿈을 HTML br 태그로 변환
   * @param {string} content - 변환할 텍스트 내용
   * @returns {string} HTML 형식으로 변환된 내용
   */
  function formatContent(content) {
    if (!content) return ''
    return content.replace(/\n/g, '<br>')
  }

  /**
   * 함수 목적: 파일 크기를 사람이 읽기 쉬운 형식으로 변환
   * @param {number} bytes - 바이트 단위 파일 크기
   * @returns {string} KB, MB 등의 단위가 포함된 파일 크기 문자열
   */
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // ========================================
  // 라이프사이클 훅
  // ========================================

  /**
   * 함수 목적: 컴포넌트 마운트 시 키보드 이벤트 리스너 등록
   */
  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  /**
   * 함수 목적: 컴포넌트 언마운트 시 이벤트 리스너 해제
   */
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
</script>

<style lang="scss" scoped>
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

  .modal-title {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .author-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .author-tag {
    display: flex;
    padding: 6px 16px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    font-size: 0.875rem;
    font-weight: bold;
    border-radius: 20px;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    opacity: 0.5;

    &:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }

    &.active {
      opacity: 1;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    &.weekly {
      background-color: #0084ff;
    }

    &.daily {
      background-color: #00b248;
    }
  }

  .report-container {
    min-height: 500px;
  }

  .report-header {
    position: fixed;
    top: 63px;
    left: 23px;
    right: 23px;
    z-index: 1;
    margin-left: -23px;
    margin-right: -23px;
    padding-left: 23px;
    padding-right: 23px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    gap: 10px;
    padding: 16px;
    background-color: #f8f9fa;
    border-radius: 8px;
  }

  .author-info {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: bold;
  }

  .report-actions {
    display: flex;
    align-items: center;
  }

  .report-content-flex {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
  }

  .report-content-item {
    padding: 16px 0;
  }

  .report-section {
    position: relative;
    top: 56px;
    margin-top: 20px;
    margin-bottom: 24px;
  }

  .report-section-title {
    margin: 0 0 12px 0;
    font-size: 1.1rem;
    font-weight: bold;
    color: #495057;
    border-bottom: 2px solid #e9ecef;
    padding-bottom: 8px;
  }

  .content-body {
    line-height: 1.6;
    color: #6c757d;
  }

  .attachments-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .attachment-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background-color: #f8f9fa;
    border-radius: 4px;
  }

  .file-name {
    font-weight: 500;
  }

  .file-size {
    color: #6c757d;
    font-size: 0.875rem;
  }

  .no-attachments {
    color: #6c757d;
    font-style: italic;
  }

  .no-report {
    text-align: center;
    padding: 60px 20px;
    color: #6c757d;
    font-size: 1.1rem;
  }

  .mt-10 {
    margin-top: 10px;
  }

  .mt-20 {
    margin-top: 20px;
  }

  .flex {
    display: flex;
  }

  .justify-end {
    justify-content: flex-end;
  }

  .justify-between {
    justify-content: space-between;
  }

  .items-center {
    align-items: center;
  }

  .w-150 {
    width: 150px;
  }

  :deep(.ui-popup__title) {
    max-width: max-content !important;
  }

  .swiper-navigation {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    pointer-events: none;

    .swiper-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 50px !important;
      height: 50px !important;
      border-radius: 50% !important;
      background: #fff;
      z-index: 1000 !important;
      pointer-events: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
      transition: all 0.3s ease;

      &:hover:not(.swiper-button-disabled) {
        transform: translateY(-50%) scale(1.1);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      }

      .icon {
        color: #333;
      }
    }

    .swiper-button-prev {
      left: calc(50vw - 850px);

      @media (max-width: 1400px) {
        left: 2vw;
      }

      @media (max-width: 768px) {
        left: 16px;
      }
    }

    .swiper-button-next {
      right: calc(50vw - 850px);

      @media (max-width: 1400px) {
        right: 2vw;
      }

      @media (max-width: 768px) {
        right: 16px;
      }
    }

    .swiper-button-disabled {
      opacity: 0.3;
      cursor: not-allowed;
      pointer-events: none;
    }
  }

  .report-counter {
    font-size: 0.875rem;
    font-weight: 500;
    color: #6c757d;
  }

  .author-info-text {
    p {
      margin: 0;
      font-size: 1rem;
    }

    span {
      font-size: 0.875rem;
      color: #6c757d;
      font-weight: normal;
    }
  }

  .report-submit-target {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px 12px;
    background-color: #e9ecef;
    border-radius: 4px;
    font-size: 0.875rem;
    color: #495057;
    cursor: pointer;

    &:hover {
      background-color: #dee2e6;
    }
  }

  .report-body {
    margin-top: 20px;
  }

  .flex-1 {
    flex: 1;
  }

  .gap-20 {
    gap: 20px;
  }
</style>
