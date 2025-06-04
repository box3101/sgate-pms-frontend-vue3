<template>
  <div class="page-container container-large">
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
        <div class="w-70p">
          <TinyEditor v-model="content" :height="700" />
        </div>
        <div class="w-30p">
          <h2 class="mb-10">업무기술서</h2>
          <UiTabs v-model="activeTab" :tabs="sidebarTabs">
            <template #default="{ activeTab }">
              <div class="tab-content">
                <FeedbackTab v-if="activeTab === 'feedback'" />
                <ActivityTab v-else-if="activeTab === 'activity'" />
              </div>
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

  const sidebarTabs = [
    { value: 'feedback', label: '피드백' },
    { value: 'activity', label: '활동' }
  ]
</script>
