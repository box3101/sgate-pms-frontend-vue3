<template>
  <div class="page-container">
    <!-- 헤더 영역 -->
    <PageHeader />

    <!-- 메인 컨텐츠 -->
    <div class="page-content">
      <div class="flex-container">
        <!-- 에디터 영역 -->
        <div class="w-60p">
          <TinyEditor v-model="content" :height="'calc(100vh - 200px)'" />
        </div>

        <!-- 사이드바 영역 -->
        <div class="w-40p">
          <div class="heading-3 mb-10">업무기술서</div>

          <UiTabs :tabs="tabs" v-model="activeTab">
            <!-- 피드백 탭 -->
            <template #feedback>
              <div class="feedback-section">
                <!-- 새 피드백 작성 -->
                <div class="feedback-form">
                  <UiTextarea
                    v-model="newFeedback"
                    placeholder="의견을 입력해주세요"
                    rows="3"
                    class="mb-3"
                  />

                  <div class="form-actions">
                    <UiRating v-model="newRating" :max="5" />
                    <UiButton variant="primary-line" size="medium" @click="addFeedback">
                      저장
                    </UiButton>
                  </div>

                  <p class="form-help">작성내용을 확인후 매니저 피드백을 작성해 주세요</p>
                </div>

                <!-- 피드백 목록 -->
                <div class="feedback-list scrollable-minus-26">
                  <div v-for="(feedback, index) in feedbackList" :key="index" class="feedback-card">
                    <div class="feedback-header">
                      <div class="user-info">
                        <i class="icon-md icon-user"></i>
                        <span class="user-name">{{ feedback.userName }}</span>
                        <span class="date">{{ feedback.date }}</span>
                        <UiRating :modelValue="feedback.rating" :max="5" readonly />
                      </div>
                      <div class="actions">
                        <UiButton variant="ghost" size="small" icon-only @click="showDemo('편집')">
                          <i class="icon-md icon-pencil"></i>
                        </UiButton>
                        <UiButton
                          variant="ghost"
                          size="small"
                          icon-only
                          @click="deleteFeedback(index)"
                        >
                          <i class="icon-md icon-delete"></i>
                        </UiButton>
                      </div>
                    </div>
                    <p class="feedback-content">{{ feedback.content }}</p>
                  </div>
                </div>
              </div>
            </template>

            <!-- 활동 탭 -->
            <template #activity>
              <div class="activity-section">
                <h4>공유 콘텐츠</h4>
                <p>공유 관련 내용이 여기에 표시됩니다.</p>

                <div class="activity-placeholder">
                  <div class="placeholder-icon">📊</div>
                  <p>활동 로그 및 공유 기능은<br />API 연동 후 구현됩니다</p>
                </div>
              </div>
            </template>
          </UiTabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, inject } from 'vue'
  import PageHeader from './comp/PageHeader.vue'

  // 로고 텍스트 설정
  const logoText = inject('logoText')
  logoText.value = '업무기술서'

  const content = ref('<p>업무기술서 내용을 작성해주세요...</p>')
  const activeTab = ref('feedback')

  const tabs = [
    { id: 'feedback', label: '피드백' },
    { id: 'activity', label: '활동' }
  ]

  // 피드백 관련 상태
  const newFeedback = ref('')
  const newRating = ref(0)

  // 데모용 피드백 데이터
  const feedbackList = ref([
    {
      userName: '김매니저',
      date: '2025-06-06',
      rating: 4,
      content:
        '업무 수행 내용이 상세하게 잘 작성되었습니다. 다음번에는 개선사항이나 학습한 내용도 추가해주시면 좋겠습니다.'
    },
    {
      userName: '이팀장',
      date: '2025-06-05',
      rating: 5,
      content: '프로젝트 진행 상황을 명확하게 파악할 수 있어서 좋습니다.'
    },
    {
      userName: '박부장',
      date: '2025-06-04',
      rating: 3,
      content: '전반적으로 양호하나, 성과 측정 지표를 좀 더 구체적으로 작성해주세요.'
    },
    {
      userName: '김매니저',
      date: '2025-06-06',
      rating: 4,
      content:
        '업무 수행 내용이 상세하게 잘 작성되었습니다. 다음번에는 개선사항이나 학습한 내용도 추가해주시면 좋겠습니다.'
    },
    {
      userName: '이팀장',
      date: '2025-06-05',
      rating: 5,
      content: '프로젝트 진행 상황을 명확하게 파악할 수 있어서 좋습니다.'
    },
    {
      userName: '박부장',
      date: '2025-06-04',
      rating: 3,
      content: '전반적으로 양호하나, 성과 측정 지표를 좀 더 구체적으로 작성해주세요.'
    }
  ])
</script>

<style scoped>
  /* 피드백 섹션 */
  .feedback-section {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  /* 피드백 폼 */
  .feedback-form {
    margin-top: 10px;
    background: white;
    border: 1px solid #e9ecef;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  }

  /* 폼 액션 */
  .form-actions {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  /* 폼 도움말 */
  .form-help {
    font-size: 0.875rem;
    color: #6c757d;
    margin: 0;
    line-height: 1.4;
  }

  /* 피드백 목록 */
  .feedback-list {
    flex: 1;
    overflow-y: auto;
    background: white;
    border: 1px solid #e9ecef;
    border-radius: 12px;
    padding: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  }

  /* 피드백 카드 */
  .feedback-card {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 12px;
    transition: all 0.2s ease;
  }

  .feedback-card:hover {
    background: #f1f3f4;
    border-color: #dee2e6;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .feedback-card:last-child {
    margin-bottom: 0;
  }

  /* 피드백 헤더 */
  .feedback-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  /* 사용자 정보 */
  .user-info {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
  }

  .user-name {
    font-weight: 600;
    color: #1a1a1a;
    font-size: 0.9rem;
  }

  .date {
    font-size: 0.8rem;
    color: #6c757d;
  }

  /* 액션 버튼 */
  .actions {
    display: flex;
    gap: 4px;
  }

  /* 피드백 내용 */
  .feedback-content {
    font-size: 0.9rem;
    line-height: 1.5;
    color: #495057;
    margin: 0;
    word-break: break-word;
  }

  /* 활동 섹션 */
  .activity-section {
    background: white;
    border: 1px solid #e9ecef;
    border-radius: 12px;
    padding: 12px;
    height: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  }

  .activity-section h4 {
    margin: 0 0 16px 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #1a1a1a;
  }

  .activity-section p {
    color: #6c757d;
    margin-bottom: 8px;
    line-height: 1.5;
  }

  /* 활동 플레이스홀더 */
  .activity-placeholder {
    text-align: center;
    padding: 40px 20px;
    background: #f8f9fa;
    border: 2px dashed #dee2e6;
    border-radius: 8px;
    margin-top: 8px;
  }

  .placeholder-icon {
    font-size: 3rem;
    margin-bottom: 8px;
    opacity: 0.7;
  }

  .activity-placeholder p {
    font-size: 0.9rem;
    color: #6c757d;
    margin: 0;
    line-height: 1.6;
  }
</style>
