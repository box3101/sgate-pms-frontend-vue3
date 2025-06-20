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

        <div class="report-counter" v-if="currentAuthorReports.length > 0">
          {{ currentAuthorReportIndex + 1 }} / {{ currentAuthorReports.length }}
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
              <span>{{ currentReport.extendedProps.group }}1</span>
            </div>
          </div>
          <div class="report-actions">
            <div class="left-actions">
              <UiTooltip position="bottom">
                <template #trigger>
                  <div class="report-submit-target">
                    제출대상
                    <i class="icon-md icon-user" style="position: relative; top: 2px"></i>
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
        feedbacks: [
          {
            id: 1,
            author: '한성진',
            content: '수고하셨습니다. 다음 주 일정 조율이 필요할 것 같습니다.',
            createdAt: '2025-06-16T16:30:00',
            replies: [
              {
                id: 101,
                author: '이찬용',
                content: '네, 알겠습니다. 월요일에 미팅 잡겠습니다.',
                createdAt: '2025-06-16T17:00:00'
              }
            ]
          }
        ],
        summary: '프로젝트 A 1차 개발 완료',
        createTime: '09:30'
      }
    },

    // 👇 이찬용 추가 보고서들 (다른 날짜)
    {
      id: '5',
      title: '[이찬용] 프로젝트 B 기획',
      start: '2025-06-18',
      allDay: true,
      backgroundColor: '#00B248',
      borderColor: '#00B248',
      extendedProps: {
        reportType: 'daily',
        author: '이찬용',
        submitTarget: '한성진',
        group: 'UX/UI 팀',
        actualContent: `신규 프로젝트 기획서 작성
- 요구사항 분석 완료
- 기술 스택 검토 (Vue.js, Nuxt.js)
- 일정 계획 수립
- 팀 역할 분담 논의`,
        planContent: `내일 계획:
- 프로젝트 킥오프 미팅
- 개발 환경 설정
- 초기 구조 설계
- 디자인 시스템 구축`,
        etcContent: '기획 단계 순조롭게 진행되고 있습니다.',
        attachments: [{ id: 7, name: '프로젝트B_기획서.pdf', size: 1234567 }],
        feedbacks: [],
        summary: '프로젝트 B 기획 완료',
        createTime: '16:30'
      }
    },

    {
      id: '6',
      title: '[이찬용] 코드 리뷰 및 최적화',
      start: '2025-06-14',
      allDay: true,
      backgroundColor: '#0AF',
      borderColor: '#0AF',
      extendedProps: {
        reportType: 'weekly',
        author: '이찬용',
        submitTarget: '한성진',
        group: 'UX/UI 팀',
        actualContent: `기존 코드 리뷰 및 최적화 작업
- 성능 개선사항 적용 (로딩 속도 30% 향상)
- 코드 품질 향상 (ESLint 규칙 적용)
- 테스트 커버리지 증가 (85% 달성)
- 컴포넌트 재사용성 개선`,
        planContent: `차주 계획:
- 추가 최적화 작업 진행
- 새로운 기능 개발 시작
- 디자인 시스템 업데이트
- 문서화 작업`,
        etcContent: '코드 품질이 크게 향상되었습니다. 팀 내 코드 리뷰 문화도 정착되고 있습니다.',
        attachments: [
          { id: 8, name: '성능최적화_보고서.pdf', size: 567890 },
          { id: 9, name: '테스트_커버리지_리포트.html', size: 123456 }
        ],
        feedbacks: [
          {
            id: 2,
            author: '한성진',
            content: '성능 개선이 눈에 띄게 좋아졌네요. 좋은 작업이었습니다.',
            createdAt: '2025-06-14T18:00:00',
            replies: []
          }
        ],
        summary: '코드 리뷰 및 최적화 완료',
        createTime: '14:00'
      }
    },

    {
      id: '7',
      title: '[이찬용] 회의 및 협업',
      start: '2025-06-13',
      allDay: true,
      backgroundColor: '#00B248',
      borderColor: '#00B248',
      extendedProps: {
        reportType: 'daily',
        author: '이찬용',
        submitTarget: '한성진',
        group: 'UX/UI 팀',
        actualContent: `팀 회의 참석 및 협업 작업
- 주간 스프린트 회의 참석
- 디자인팀과 UI/UX 협업
- 백엔드팀과 API 규격 논의
- QA팀과 테스트 시나리오 검토`,
        planContent: `내일 계획:
- API 연동 작업 진행
- UI 컴포넌트 개발
- 반응형 레이아웃 구현
- 크로스 브라우징 테스트`,
        etcContent: '팀 협업이 원활하게 진행되고 있으며, 소통이 많이 개선되었습니다.',
        attachments: [{ id: 10, name: '회의록_0513.docx', size: 67890 }],
        feedbacks: [],
        summary: '팀 회의 및 협업 활동',
        createTime: '17:15'
      }
    },

    {
      id: '8',
      title: '[이찬용] 신기술 학습 및 적용',
      start: '2025-06-10',
      allDay: true,
      backgroundColor: '#0AF',
      borderColor: '#0AF',
      extendedProps: {
        reportType: 'weekly',
        author: '이찬용',
        submitTarget: '한성진',
        group: 'UX/UI 팀',
        actualContent: `신기술 학습 및 프로젝트 적용
- Vue 3 Composition API 심화 학습
- TypeScript 도입 검토 및 테스트
- Vite 빌드 도구 성능 테스트
- 모던 CSS 기법 연구 (Container Queries)`,
        planContent: `차주 계획:
- TypeScript 점진적 도입
- Vite 빌드 시스템 적용
- 모던 CSS 기법 적용
- 팀 내 기술 공유 세션`,
        etcContent:
          '새로운 기술들이 프로젝트에 도움이 될 것 같습니다. 점진적으로 적용해 나가겠습니다.',
        attachments: [
          { id: 11, name: 'TypeScript_도입_계획서.pdf', size: 234567 },
          { id: 12, name: 'Vite_성능_테스트_결과.xlsx', size: 345678 }
        ],
        feedbacks: [
          {
            id: 3,
            author: '한성진',
            content: '신기술 학습에 적극적이시네요. 팀에도 공유 부탁드립니다.',
            createdAt: '2025-06-10T19:30:00',
            replies: [
              {
                id: 102,
                author: '이찬용',
                content: '네, 다음 주에 기술 공유 세션을 진행하겠습니다.',
                createdAt: '2025-06-10T20:00:00'
              }
            ]
          }
        ],
        summary: '신기술 학습 및 적용 연구',
        createTime: '18:45'
      }
    },

    {
      id: '9',
      title: '[이찬용] 사용자 피드백 반영',
      start: '2025-06-09',
      allDay: true,
      backgroundColor: '#00B248',
      borderColor: '#00B248',
      extendedProps: {
        reportType: 'daily',
        author: '이찬용',
        submitTarget: '한성진',
        group: 'UX/UI 팀',
        actualContent: `사용자 피드백 분석 및 개선사항 적용
- 사용자 인터페이스 개선 (버튼 크기, 색상 조정)
- 접근성 향상 (키보드 네비게이션, 스크린 리더 지원)
- 모바일 반응형 이슈 수정
- 로딩 성능 개선`,
        planContent: `내일 계획:
- 추가 피드백 수집
- A/B 테스트 설계
- 사용성 테스트 진행
- 개선사항 문서화`,
        etcContent: '사용자 만족도가 크게 향상되었습니다. 지속적인 개선이 필요합니다.',
        attachments: [{ id: 13, name: '사용자_피드백_분석.pdf', size: 456789 }],
        feedbacks: [],
        summary: '사용자 피드백 반영 완료',
        createTime: '15:20'
      }
    },

    // 기존 다른 작성자들 보고서
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
        feedbacks: [],
        summary: '생산라인 품질관리 점검 완료',
        createTime: '16:45'
      }
    },

    {
      id: '3',
      title: '[정수민] 회계 업무 처리',
      start: '2025-06-16',
      allDay: true,
      backgroundColor: '#00B248',
      borderColor: '#00B248',
      extendedProps: {
        reportType: 'daily',
        author: '정수민',
        submitTarget: '최팀장',
        group: '회계 팀',
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
      start: '2025-06-16',
      allDay: true,
      backgroundColor: '#00B248',
      borderColor: '#00B248',
      extendedProps: {
        reportType: 'daily',
        author: '박민수',
        submitTarget: '이부장, 김영희, 홍길동, 김민수, 김정민',
        group: '마케팅 팀',
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

  const currentAuthorReports = computed(() => {
    if (!currentReport.value) return []

    const currentAuthor = currentReport.value.extendedProps.author

    return filteredReportEvents.value
      .filter(event => event.extendedProps.author === currentAuthor)
      .sort((a, b) => new Date(a.start) - new Date(b.start)) // 🔄 변경: 오래된 순서로 정렬
  })
  const currentAuthorReportIndex = computed(() => {
    if (!currentReport.value || currentAuthorReports.value.length === 0) return 0

    return currentAuthorReports.value.findIndex(report => report.id === currentReport.value.id)
  })

  const canGoToPrevious = computed(() => {
    return currentAuthorReportIndex.value > 0
  })

  const canGoToNext = computed(() => {
    return currentAuthorReportIndex.value < currentAuthorReports.value.length - 1
  })

  // 이벤트 핸들러

  // 👇 이 함수들 추가
  function goToPreviousReport() {
    if (!canGoToPrevious.value) return

    const previousReport = currentAuthorReports.value[currentAuthorReportIndex.value - 1]
    if (previousReport) {
      selectedDate.value = new Date(previousReport.start)

      const targetDate = formatDateForComparison(previousReport.start)
      const dateReports = filteredReportEvents.value.filter(event => {
        const eventDate = formatDateForComparison(event.start)
        return eventDate === targetDate
      })

      const reportIndex = dateReports.findIndex(r => r.id === previousReport.id)
      currentReportIndex.value = reportIndex >= 0 ? reportIndex : 0
    }
  }

  function goToNextReport() {
    if (!canGoToNext.value) return

    const nextReport = currentAuthorReports.value[currentAuthorReportIndex.value + 1]
    if (nextReport) {
      selectedDate.value = new Date(nextReport.start)

      const targetDate = formatDateForComparison(nextReport.start)
      const dateReports = filteredReportEvents.value.filter(event => {
        const eventDate = formatDateForComparison(event.start)
        return eventDate === targetDate
      })

      const reportIndex = dateReports.findIndex(r => r.id === nextReport.id)
      currentReportIndex.value = reportIndex >= 0 ? reportIndex : 0
    }
  }

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
  // 👇 기존 handleKeydown 함수를 이렇게 수정
  function handleKeydown(event) {
    if (!reportViewerModal.value) return

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        goToPreviousReport() // ← 이전 보고서 (더 오래된)
        break
      case 'ArrowRight':
        event.preventDefault()
        goToNextReport() // → 다음 보고서 (더 최근)
        break
      case 'ArrowUp':
        event.preventDefault()
        // 🆕 추가: 같은 날짜 내에서 이전 작성자
        if (currentReportIndex.value > 0) {
          currentReportIndex.value--
        }
        break
      case 'ArrowDown':
        event.preventDefault()
        // 🆕 추가: 같은 날짜 내에서 다음 작성자
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
      left: calc(50vw - 850px); /* 🔄 변경: 화면 중앙에서 850px 뺀 위치 */

      /* 반응형 조정 */
      @media (max-width: 1400px) {
        left: 2vw; /* 작은 화면에서는 2% 여백 */
      }

      @media (max-width: 768px) {
        left: 16px; /* 모바일에서는 고정값 */
      }
    }

    .swiper-button-next {
      right: calc(50vw - 850px); /* 🔄 변경: 화면 중앙에서 900px 뺀 위치 */

      /* 반응형 조정 */
      @media (max-width: 1400px) {
        right: 2vw; /* 작은 화면에서는 2% 여백 */
      }

      @media (max-width: 768px) {
        right: 16px; /* 모바일에서는 고정값 */
      }
    }
    .swiper-button-disabled {
      opacity: 0.3;
      cursor: not-allowed;
      pointer-events: none;
    }
  }
</style>
