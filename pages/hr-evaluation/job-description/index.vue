<template>
  <div class="page-container">
    <div class="page-header">
      <div class="header-left">
        <div class="select-group">
          <div class="select-item">
            <span class="select-label flex items-center">
              <i class="icon-md icon-calendar"></i>
            </span>
            <UiSelect
              v-model="selectedYear"
              :options="yearOptions"
              size="medium"
              placeholder="선택"
              width="150px"
            />
          </div>
          <div class="select-item flex items-center">
            <span class="select-label flex items-center">
              <i class="icon-md icon-user"></i>
            </span>
            <span>홍길동</span>
          </div>
        </div>
      </div>
      <div class="header-right">
        <div class="button-group">
          <UiButton type="button" variant="secondary-line" size="medium" class="mr-2">
            PDF 다운로드
          </UiButton>
          <UiButton type="button" variant="secondary-line" size="medium" class="mr-2">
            양식파일 다운로드
          </UiButton>
          <UiButton type="button" variant="secondary-line" size="medium" class="mr-2">
            양식 불러오기
          </UiButton>
          <UiButton type="button" variant="secondary-line" size="medium" class="mr-2">
            저장
          </UiButton>
          <UiButton type="button" variant="secondary-line" size="medium" class="mr-2">
            파일첨부
          </UiButton>
          <UiButton type="button" variant="secondary-line" size="medium" class="mr-2">
            MY
            <i class="icon-md icon-user"></i>
          </UiButton>
          <UiButton type="button" variant="secondary-line" size="medium" class="mr-2">
            조회
            <i class="icon-md icon-search"></i>
          </UiButton>
          <UiButton type="button" variant="secondary-line" size="medium" icon-only>
            <i class="icon-md icon-setting"></i>
          </UiButton>
        </div>
      </div>
    </div>
    <div class="page-content">
      <div class="flex-container">
        <div class="w-60p">
          <TinyEditor v-model="content" :height="700" />
        </div>
        <div class="w-40p">
          <h2 class="mb-10">업무기술서</h2>
          <UiTabs :tabs="basicTabs">
            <template #feedback>
              <div class="feedback-container">
                <UiTextarea placeholder="의견을 입력해주세요" class="mb-4" v-model="feedbackText" />

                <div class="feedback-bottom flex gap-10 justify-end items-center">
                  <div class="rating">
                    <UiRating v-model="rating" :max="5" />
                  </div>
                  <UiButton
                    type="button"
                    variant="primary-line"
                    size="medium"
                    @click="saveFeedback"
                  >
                    저장
                  </UiButton>
                </div>

                <div class="info-text mt-3 mb-10">
                  작성내용을 확인후 매니저 피드백을 작성해 주세요
                </div>

                <div class="feedback-cards mt-4 scrollable-minus-27">
                  <div class="card mb-2" v-for="(item, index) in feedbackItems" :key="index">
                    <div class="flex justify-between items-center">
                      <div class="user-info">
                        <div class="flex items-center">
                          <i class="icon-md icon-user mr-2"></i>
                          <span class="user-name">{{ item.userName }}</span>
                          <span class="date ml-2 text-gray-500">{{ item.date }}</span>
                          <UiRating :modelValue="item.rating" :max="5" readonly class="ml-2" />
                        </div>
                        <p class="mt-2">{{ item.content }}</p>
                      </div>
                      <div class="actions flex gap-5">
                        <UiButton variant="secondary-line" size="small" icon-only>
                          <i class="icon-md icon-pencil"></i>
                        </UiButton>
                        <UiButton variant="secondary-line" size="small" icon-only>
                          <i class="icon-md icon-delete"></i>
                        </UiButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template #activity>
              <h4>공유3 콘텐츠</h4>
              <p>공유 관련 내용입니다.</p>
            </template>
          </UiTabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  // 로고 텍스트 설정
  const logoText = inject('logoText')
  logoText.value = '업무기술서'

  const selectedYear = ref('2025')
  const yearOptions = ref([
    { value: '2025', label: '2025년' },
    { value: '2024', label: '2024년' },
    { value: '2023', label: '2023년' }
  ])

  const activeTab = ref('feedback')

  // 폼 데이터
  const feedbackText = ref('')
  const rating = ref(0)

  // 기본 탭 데이터
  const basicTabs = [
    { id: 'feedback', label: '피드백' },
    { id: 'activity', label: '활동' }
  ]

  // 피드백 데이터
  const feedbackItems = ref([
    {
      userName: '홍길동',
      date: '2025-06-06',
      rating: 4,
      content:
        '이것이 피드백 내용입니다.이것이 피드백 내용입니다.이것이 피드백 내용입니다.이것이 피드백 내용입니다.이것이 피드백 내용입니다.이것이 피드백 내용입니다.이것이 피드백 내용입니다.이것이 피드백 내용입니다.이것이 피드백 내용입니다.이것이 피드백 내용입니다.이것이 피드백 내용입니다.이것이 피드백 내용입니다.이것이 피드백 내용입니다.이것이 피드백 내용입니다.'
    },
    {
      userName: '홍길동',
      date: '2025-06-06',
      rating: 4,
      content: '이것이 피드백 내용입니다.'
    },
    {
      userName: '홍길동',
      date: '2025-06-06',
      rating: 4,
      content:
        '이것이 피드백 내용입니다.이것이 피드백 내용입니다.이것이 피드백 내용입니다.이것이 피드백 내용입니다.이것이 피드백 내용입니다.이것이 피드백 내용입니다.이것이 피드백 내용입니다.이것이 피드백 내용입니다.이것이 피드백 내용입니다.이것이 피드백 내용입니다.이것이 피드백 내용입니다.이것이 피드백 내용입니다.이것이 피드백 내용입니다.이것이 피드백 내용입니다.'
    }
  ])

  const addFeedack = newFeedback => {
    feedbackItems.value = [newFeedback, ...feedbackItems.value]
  }

  const saveFeedback = formData => {
    const newFeedback = {
      userName: '홍길동',
      date: '2025-06-06',
      rating: rating.value,
      content: feedbackText.value
    }
    addFeedack(newFeedback)
  }
</script>

<style scoped lang="scss">
  .feedback-container {
    border-radius: 0.5rem;
    padding: 20px;
    background-color: #f9f9f9;

    .feedback-bottom {
      margin-top: 15px;
      border-top: 1px solidrgb(39, 39, 41);
      padding-top: 10px;
    }

    .feedback-cards {
      .card {
        background-color: #fff;
        border-radius: 0.375rem;
        border: 1px solid #e5e7eb;
        padding: 20px;

        &:hover {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .user-name {
          font-weight: 500;
        }
      }

      .info-text {
        color: #6b7280;
        font-size: 0.875rem;
      }

      .user-info {
        p {
          margin-top: 10px !important;
          max-width: 90%;
        }
      }
    }
  }
</style>
