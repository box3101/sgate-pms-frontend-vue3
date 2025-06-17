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
  <UiModal v-model="reportViewerModal" size="xlarge" height="90vh" :showFooter="false">
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
            <i class="icon icon-xlg icon-user icon-white"></i>
            <span>{{ currentReport.extendedProps.author }}</span>
          </div>
          <div class="report-actions">
            <div class="left-actions">
              <UiTooltip position="left">
                <template #trigger>
                  제출대상
                  <i class="icon-md icon-user" style="position: relative; top: 2px"></i>
                </template>
                <p>{{ currentReport.extendedProps.submitTarget }} 외 10명</p>
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

          <!-- 의견/기타 -->
          <div class="mt-20">
            <div class="report-section">
              <h2 class="report-section-title">의견/기타</h2>
              <div class="content-body">
                {{ currentReport.extendedProps.etcContent || '특별한 의견 없음' }}
              </div>
            </div>
          </div>

          <!-- 첨부파일 -->
          <div class="mt-20">
            <div class="report-section">
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
              <div class="content-body">
                <!-- 기존 피드백 목록 -->
                <div
                  v-if="currentReport.extendedProps.feedbacks?.length"
                  class="existing-feedbacks"
                >
                  <div
                    v-for="feedback in currentReport.extendedProps.feedbacks"
                    :key="feedback.id"
                    class="feedback-item"
                  >
                    <div class="feedback-header">
                      <div class="feedback-author-info">
                        <strong>{{ feedback.author }}</strong>
                        <span class="feedback-date">{{ formatDateTime(feedback.createdAt) }}</span>
                      </div>
                      <div class="feedback-actions">
                        <UiButton
                          v-if="feedback.author === getCurrentUser()"
                          variant="ghost"
                          iconOnly
                          @click="editFeedback(feedback)"
                          title="수정"
                        >
                          <i class="icon icon-pencil icon-md"></i>
                        </UiButton>
                        <UiButton
                          v-if="feedback.author === getCurrentUser()"
                          variant="ghost"
                          iconOnly
                          @click="deleteFeedback(feedback.id)"
                          title="삭제"
                        >
                          <i class="icon icon-delete icon-md"></i>
                        </UiButton>
                        <UiButton
                          variant="ghost"
                          iconOnly
                          @click="toggleReplyInput(feedback.id)"
                          title="댓글"
                        >
                          <i class="icon icon-reply icon-md"></i>
                        </UiButton>
                      </div>
                    </div>

                    <!-- 피드백 내용 (수정 모드) -->
                    <div v-if="editingFeedbackId === feedback.id" class="feedback-edit-form">
                      <UiTextarea
                        v-model="editingFeedbackContent"
                        :rows="3"
                        :maxRows="5"
                        placeholder="피드백을 수정해주세요."
                      />
                      <div class="feedback-edit-actions">
                        <UiButton iconOnly variant="secondary" @click="cancelEditFeedback">
                          취소
                        </UiButton>
                        <UiButton iconOnly variant="primary" @click="saveFeedbackEdit(feedback.id)">
                          저장
                        </UiButton>
                      </div>
                    </div>

                    <!-- 피드백 내용 (일반 모드) -->
                    <div v-else class="feedback-content">{{ feedback.content }}</div>

                    <!-- 댓글 목록 -->
                    <div v-if="feedback.replies?.length" class="feedback-replies">
                      <div v-for="reply in feedback.replies" :key="reply.id" class="reply-item">
                        <div class="reply-header">
                          <div class="reply-author-info">
                            <strong>{{ reply.author }}</strong>
                            <span class="reply-date">{{ formatDateTime(reply.createdAt) }}</span>
                          </div>
                          <div class="reply-actions">
                            <UiButton
                              v-if="reply.author === getCurrentUser()"
                              variant="ghost"
                              iconOnly
                              @click="editReply(reply)"
                              title="수정"
                            >
                              <i class="icon icon-pencil icon-md"></i>
                            </UiButton>
                            <UiButton
                              v-if="reply.author === getCurrentUser()"
                              variant="ghost"
                              iconOnly
                              @click="deleteReply(feedback.id, reply.id)"
                              title="삭제"
                            >
                              <i class="icon icon-delete icon-md"></i>
                            </UiButton>
                          </div>
                        </div>

                        <!-- 댓글 내용 (수정 모드) -->
                        <div v-if="editingReplyId === reply.id" class="reply-edit-form">
                          <UiTextarea
                            v-model="editingReplyContent"
                            :rows="2"
                            :maxRows="3"
                            placeholder="댓글을 수정해주세요."
                          />
                          <div class="reply-edit-actions">
                            <UiButton
                              size="small"
                              iconOnly
                              variant="secondary"
                              @click="cancelEditReply"
                            >
                              취소
                            </UiButton>
                            <UiButton
                              size="small"
                              iconOnly
                              variant="primary"
                              @click="saveReplyEdit(feedback.id, reply.id)"
                            >
                              저장
                            </UiButton>
                          </div>
                        </div>

                        <!-- 댓글 내용 (일반 모드) -->
                        <div v-else class="reply-content">{{ reply.content }}</div>
                      </div>
                    </div>

                    <!-- 댓글 입력 폼 -->
                    <div v-if="showReplyInput === feedback.id" class="reply-input-form">
                      <UiTextarea
                        v-model="replyContent"
                        :rows="2"
                        :maxRows="3"
                        placeholder="댓글을 입력해주세요."
                      />
                      <div class="reply-input-actions">
                        <UiButton iconOnly variant="secondary" @click="cancelReply">
                          취소
                        </UiButton>
                        <UiButton iconOnly variant="primary" @click="submitReply(feedback.id)">
                          댓글 등록
                        </UiButton>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 새 피드백 입력 -->
                <div class="new-feedback-form">
                  <UiTextarea
                    v-model="feedback"
                    :rows="5"
                    :maxRows="5"
                    placeholder="피드백을 입력해주세요."
                  />
                  <div class="flex justify-end">
                    <UiButton class="mt-10" size="large" variant="primary" @click="submitFeedback">
                      등록
                    </UiButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 선택된 보고서가 없을 때 -->
      <div v-else class="no-report">선택된 보고서가 없습니다.</div>
    </div>
  </UiModal>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import Calendar from '~/components/common/UI/Calendar.vue'

  // 반응형 상태
  const selectedDate = ref(null)
  const dailyReport = ref(true)
  const weeklyReport = ref(true)
  const dateGbnType = ref('w')
  const reportViewerModal = ref(false)
  const currentReportIndex = ref(0)
  const feedback = ref('')
  const replyContent = ref('')
  const showReplyInput = ref(null)

  // 피드백 수정 관련 상태
  const editingFeedbackId = ref(null)
  const editingFeedbackContent = ref('')

  // 댓글 수정 관련 상태
  const editingReplyId = ref(null)
  const editingReplyContent = ref('')

  const dateGbnOptions = [
    { value: 'w', label: '작성일 기준' },
    { value: 'r', label: '보고일 기준' }
  ]

  const calendarOptions = {
    dayMaxEvents: false,
    moreLinkClick: 'popover',
    eventDisplay: 'block'
  }

  // 보고서 데이터
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
        feedbacks: [
          {
            id: 1,
            author: '한성진',
            content: '수고하셨습니다. 다음 주 일정 조율이 필요할 것 같습니다.',
            createdAt: '2025-05-16T16:30:00',
            replies: [
              {
                id: 101,
                author: '이찬용',
                content: '네, 알겠습니다. 월요일에 미팅 잡겠습니다.',
                createdAt: '2025-05-16T17:00:00'
              }
            ]
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

  // 작성자 태그 클릭 핸들러
  function selectReport(index) {
    if (index >= 0 && index < selectedDateReports.value.length) {
      currentReportIndex.value = index
    }
  }

  // 피드백 제출
  function submitFeedback() {
    if (!feedback.value.trim() || !currentReport.value) return

    const newFeedback = {
      id: Date.now(),
      author: getCurrentUser(),
      content: feedback.value,
      createdAt: new Date().toISOString(),
      replies: []
    }

    if (!currentReport.value.extendedProps.feedbacks) {
      currentReport.value.extendedProps.feedbacks = []
    }

    currentReport.value.extendedProps.feedbacks.push(newFeedback)
    feedback.value = ''
  }

  // 현재 사용자 정보 (실제로는 인증 시스템에서 가져옴)
  function getCurrentUser() {
    return '현재사용자' // 실제로는 로그인한 사용자 정보
  }

  // 피드백 수정 시작
  function editFeedback(feedback) {
    editingFeedbackId.value = feedback.id
    editingFeedbackContent.value = feedback.content
  }

  // 피드백 수정 취소
  function cancelEditFeedback() {
    editingFeedbackId.value = null
    editingFeedbackContent.value = ''
  }

  // 피드백 수정 저장
  function saveFeedbackEdit(feedbackId) {
    const feedback = currentReport.value.extendedProps.feedbacks.find(f => f.id === feedbackId)
    if (feedback && editingFeedbackContent.value.trim()) {
      feedback.content = editingFeedbackContent.value
      feedback.updatedAt = new Date().toISOString()
      cancelEditFeedback()
    }
  }

  // 피드백 삭제
  function deleteFeedback(feedbackId) {
    if (confirm('정말로 이 피드백을 삭제하시겠습니까?')) {
      const index = currentReport.value.extendedProps.feedbacks.findIndex(f => f.id === feedbackId)
      if (index > -1) {
        currentReport.value.extendedProps.feedbacks.splice(index, 1)
      }
    }
  }

  // 댓글 입력 토글
  function toggleReplyInput(feedbackId) {
    if (showReplyInput.value === feedbackId) {
      showReplyInput.value = null
      replyContent.value = ''
    } else {
      showReplyInput.value = feedbackId
      replyContent.value = ''
    }
  }

  // 댓글 취소
  function cancelReply() {
    showReplyInput.value = null
    replyContent.value = ''
  }

  // 댓글 제출
  function submitReply(feedbackId) {
    if (!replyContent.value.trim()) return

    const feedback = currentReport.value.extendedProps.feedbacks.find(f => f.id === feedbackId)
    if (feedback) {
      if (!feedback.replies) {
        feedback.replies = []
      }

      const newReply = {
        id: Date.now(),
        author: getCurrentUser(),
        content: replyContent.value,
        createdAt: new Date().toISOString()
      }

      feedback.replies.push(newReply)
      cancelReply()
    }
  }

  // 댓글 수정 시작
  function editReply(reply) {
    editingReplyId.value = reply.id
    editingReplyContent.value = reply.content
  }

  // 댓글 수정 취소
  function cancelEditReply() {
    editingReplyId.value = null
    editingReplyContent.value = ''
  }

  // 댓글 수정 저장
  function saveReplyEdit(feedbackId, replyId) {
    const feedback = currentReport.value.extendedProps.feedbacks.find(f => f.id === feedbackId)
    if (feedback && feedback.replies) {
      const reply = feedback.replies.find(r => r.id === replyId)
      if (reply && editingReplyContent.value.trim()) {
        reply.content = editingReplyContent.value
        reply.updatedAt = new Date().toISOString()
        cancelEditReply()
      }
    }
  }

  // 댓글 삭제
  function deleteReply(feedbackId, replyId) {
    if (confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      const feedback = currentReport.value.extendedProps.feedbacks.find(f => f.id === feedbackId)
      if (feedback && feedback.replies) {
        const index = feedback.replies.findIndex(r => r.id === replyId)
        if (index > -1) {
          feedback.replies.splice(index, 1)
        }
      }
    }
  }

  // 유틸리티 함수
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

  function formatDateTime(dateTimeString) {
    return new Intl.DateTimeFormat('ko-KR', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateTimeString))
  }

  function formatContent(content) {
    if (!content) return ''
    return content.replace(/\n/g, '<br>')
  }

  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // 키보드 이벤트 핸들러
  function handleKeydown(event) {
    if (!reportViewerModal.value) return

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        if (currentReportIndex.value > 0) {
          currentReportIndex.value--
        }
        break
      case 'ArrowRight':
        event.preventDefault()
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
  }

  .author-tag:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  .author-tag.active {
    opacity: 1;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .author-tag.weekly {
    background-color: #0084ff;
  }

  .author-tag.daily {
    background-color: #00b248;
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
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
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

  .existing-feedbacks {
    margin-bottom: 16px;
  }

  .feedback-item {
    padding: 12px;
    border: 1px solid #e9ecef;
    border-radius: 6px;
    margin-bottom: 8px;
    background-color: #f8f9fa;
  }

  .feedback-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .feedback-author-info {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .feedback-actions {
    display: flex;
  }

  .feedback-action-btn {
    padding: 4px;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s;
  }

  .feedback-action-btn:hover {
    background-color: #f8f9fa;
  }

  .feedback-edit-form {
    margin-top: 8px;
  }

  .feedback-edit-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 8px;
  }

  .feedback-replies {
    margin-top: 12px;
    padding-left: 20px;
    border-left: 2px solid #e9ecef;
  }

  .reply-item {
    padding: 8px 12px;
    margin-bottom: 8px;
    background-color: #ffffff;
    border: 1px solid #e9ecef;
    border-radius: 4px;
  }

  .reply-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }

  .reply-author-info {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.875rem;
  }

  .reply-actions {
    display: flex;
    gap: 2px;
  }

  .reply-action-btn {
    padding: 2px;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 2px;
    transition: background-color 0.2s;
  }

  .reply-action-btn:hover {
    background-color: #f8f9fa;
  }

  .reply-date {
    color: #6c757d;
    font-size: 0.75rem;
  }

  .reply-content {
    font-size: 0.875rem;
    line-height: 1.4;
  }

  .reply-edit-form {
    margin-top: 6px;
  }

  .reply-edit-actions {
    display: flex;
    justify-content: flex-end;
    gap: 6px;
    margin-top: 6px;
  }

  .reply-input-form {
    margin-top: 12px;
    padding: 12px;
    background-color: #f8f9fa;
    border-radius: 6px;
    border: 1px solid #e9ecef;
  }

  .reply-input-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 8px;
  }

  .new-feedback-form {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #e9ecef;
  }

  .feedback-date {
    color: #6c757d;
    font-size: 0.875rem;
  }

  .feedback-content {
    line-height: 1.5;
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
</style>
