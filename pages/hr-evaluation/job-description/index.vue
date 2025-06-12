<template>
  <div class="page-container">
    <!-- 헤더 영역 -->
    <div class="page-header">
      <div class="header-left">
        <div class="select-group flex gap-10">
          <div class="select-item">
            <UiDatePicker v-model="selectedDate" />
          </div>
          <div class="select-item flex gap-1">
            <span class="select-label flex items-center">
              <i class="icon-lg icon-user"></i>
            </span>
            <span class="user-name">홍길동</span>
          </div>
        </div>
      </div>

      <div class="header-right">
        <div class="button-group">
          <UiButton variant="secondary-line" size="medium" @click="showDemo('PDF 다운로드')">
            PDF 다운로드
          </UiButton>
          <UiButton variant="secondary-line" size="medium" @click="showDemo('양식파일 다운로드')">
            양식파일 다운로드
          </UiButton>
          <UiButton variant="secondary-line" size="medium" @click="showDemo('양식 불러오기')">
            양식 불러오기
          </UiButton>
          <UiButton variant="secondary-line" size="medium" @click="showDemo('저장')">
            저장
          </UiButton>
          <UiButton variant="secondary-line" size="medium" @click="showDemo('파일첨부')">
            파일첨부
          </UiButton>
          <UiButton variant="secondary-line" size="medium" @click="showDemo('MY')">
            MY
            <i class="icon-md icon-user"></i>
          </UiButton>
          <UiButton variant="secondary-line" size="medium" @click="showDemo('조회')">
            조회
            <i class="icon-md icon-search"></i>
          </UiButton>
          <UiButton variant="secondary-line" size="medium" icon-only @click="showDemo('설정')">
            <i class="icon-md icon-setting"></i>
          </UiButton>
        </div>
      </div>
    </div>

    <!-- 메인 컨텐츠 -->
    <div class="page-content">
      <div class="flex-container">
        <!-- 에디터 영역 -->
        <div class="w-60p">
          <TinyEditor v-model="content" :height="700" />
        </div>

        <!-- 사이드바 영역 -->
        <div class="w-40p">
          <h2 class="sidebar-title">업무기술서</h2>

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
                <div class="feedback-list scrollable-minus-27">
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

    <!-- UiConfirm 컴포넌트 -->
    <UiConfirm
      v-model="showConfirm"
      :type="confirmConfig.type"
      :title="confirmConfig.title"
      :message="confirmConfig.message"
      :show-cancel-button="!!confirmConfig.action"
      :show-confirm-button="true"
      :confirm-button-text="confirmConfig.action ? '확인' : '닫기'"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup>
  import { ref, inject } from 'vue'

  // 로고 텍스트 설정
  const logoText = inject('logoText')
  logoText.value = '업무기술서'

  // 기본 데이터
  const selectedYear = ref('2025')
  const yearOptions = [
    { value: '2025', label: '2025년' },
    { value: '2024', label: '2024년' },
    { value: '2023', label: '2023년' }
  ]

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

  // 확인 다이얼로그 상태
  const showConfirm = ref(false)
  const confirmConfig = ref({
    type: 'info',
    title: '확인',
    message: '',
    action: null
  })

  // 함수들
  const addFeedback = () => {
    if (!newFeedback.value.trim()) {
      showAlert('warning', '알림', '피드백 내용을 입력해주세요')
      return
    }

    const feedback = {
      userName: '홍길동',
      date: new Date().toLocaleDateString(),
      rating: newRating.value,
      content: newFeedback.value
    }

    feedbackList.value.unshift(feedback)

    // 폼 초기화
    newFeedback.value = ''
    newRating.value = 0

    showAlert('success', '완료', '피드백이 추가되었습니다!')
  }

  const deleteFeedback = index => {
    confirmConfig.value = {
      type: 'warning',
      title: '삭제 확인',
      message: '선택한 피드백을 삭제하시겠습니까?<br>삭제된 피드백은 복구할 수 없습니다.',
      action: () => {
        feedbackList.value.splice(index, 1)
        showAlert('success', '완료', '피드백이 삭제되었습니다')
      }
    }
    showConfirm.value = true
  }

  const showDemo = action => {
    showAlert(
      'info',
      '🎯 데모 기능',
      `"${action}" 기능을 클릭하셨습니다.<br>실제 기능은 API 연동 후 구현됩니다.`
    )
  }

  const showAlert = (type, title, message) => {
    confirmConfig.value = {
      type,
      title,
      message,
      action: null
    }
    showConfirm.value = true
  }

  const handleConfirm = () => {
    if (confirmConfig.value.action) {
      confirmConfig.value.action()
    }
  }

  const handleCancel = () => {
    // 취소 시 특별한 처리 없음
  }
</script>

<style scoped lang="scss">
  .header-right {
    .button-group {
      display: flex;
      gap: 8px;
    }
  }

  .feedback-section {
    padding: 20px;
    background: #f9fafb;
    border-radius: 8px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .feedback-form {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e5e7eb;

    .form-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .form-help {
      margin: 0;
      font-size: 14px;
      color: #6b7280;
    }
  }

  .feedback-list {
    flex: 1;
    overflow-y: auto;
  }

  .feedback-card {
    background: #fff;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 12px;
    border: 1px solid #e5e7eb;

    &:hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
  }

  .feedback-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;

    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;

      .user-name {
        font-weight: 500;
      }

      .date {
        color: #6b7280;
      }
    }

    .actions {
      display: flex;
      gap: 4px;
    }
  }

  .feedback-content {
    margin: 0;
    color: #374151;
    line-height: 1.5;
  }

  .activity-section {
    padding: 20px;

    h4 {
      margin: 0 0 16px 0;
      font-size: 16px;
      font-weight: 600;
    }
  }

  .activity-placeholder {
    text-align: center;
    padding: 40px 20px;
    background: #f9fafb;
    border-radius: 8px;
    margin-top: 20px;

    .placeholder-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }

    p {
      margin: 0;
      color: #6b7280;
      line-height: 1.5;
    }
  }
</style>
