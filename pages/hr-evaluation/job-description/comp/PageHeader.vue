<template>
  <div class="page-header">
    <div class="header-left">
      <div class="select-group">
        <div class="select-item">
          <span class="select-label">기준년도</span>
          <UiSelect
            v-model="selectedValue"
            :options="options"
            size="medium"
            placeholder="선택"
            width="150px"
          />
        </div>
        <div class="user-info flex items-center gap-5">
          <i class="icon-user icon-xl"></i>
          <span class="user-name">이찬용</span>
        </div>
      </div>
    </div>
    <div class="header-right">
      <div class="button-group">
        <UiButton type="button" variant="secondary-line" size="medium" @click="handlePdfDownload">
          <i class="icon-md icon-file"></i>
          PDF 다운로드
        </UiButton>
        <UiButton type="button" variant="secondary-line" size="medium" @click="downloadTemplate">
          <i class="icon-md icon-template"></i>
          양식파일 다운로드
        </UiButton>
        <UiButton type="button" variant="secondary-line" size="medium" @click="loadTemplate">
          <i class="icon-md icon-import"></i>
          양식 불러오기
        </UiButton>
        <UiButton type="button" variant="primary" size="medium" @click="handleSave">
          <i class="icon-md icon-save"></i>
          저장
        </UiButton>
        <UiButton type="button" variant="primary" size="medium" @click="handleMySearch">
          <i class="icon-md icon-user"></i>
          MY
        </UiButton>
        <UiButton
          type="button"
          variant="secondary-line"
          size="medium"
          icon-only
          title="설정"
          @click="openSettings"
        >
          <i class="icon-md icon-setting"></i>
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const selectedValue = ref('기본값')
  const options = ref([{ value: 'value1', label: '라벨1' }])

  const handlePdfDownload = () => {
    console.log('PDF 다운로드')
  }

  const downloadTemplate = () => {
    console.log('양식파일 다운로드')
  }

  const loadTemplate = () => {
    console.log('양식 불러오기')
  }

  const handleSave = () => {
    console.log('저장')
  }

  const handleMySearch = () => {
    console.log('MY')
  }

  const openSettings = () => {
    console.log('설정')
  }
</script>
