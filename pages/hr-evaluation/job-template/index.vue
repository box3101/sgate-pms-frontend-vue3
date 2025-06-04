<template>
  <div class="page-container">
    <div class="page-header com-header">
      <div class="header-left">
        <div class="select-group">
          <div class="select-item flex items-center">
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
        </div>
      </div>
      <div class="header-right">
        <div class="button-group">
          <UiButton type="button" variant="secondary-line" size="medium" class="mr-2">
            첨부파일
            <i class="icon-md icon-excel"></i>
          </UiButton>
          <UiButton type="button" variant="primary-line" size="medium" @click="handleSave">
            저장
          </UiButton>
        </div>
      </div>
    </div>

    <!-- 컨텐츠 영역 -->
    <div class="page-content">
      <!-- TinyMCE 에디터 영역 -->
      <div class="editor-container">
        <div class="editor-wrapper">
          <Editor v-model="editorContent" :init="editorConfig" @init="onEditorInit" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import Editor from '@tinymce/tinymce-vue'

  const selectedYear = ref('2025')
  const yearOptions = ref([
    { value: '2025', label: '2025년' },
    { value: '2024', label: '2024년' },
    { value: '2023', label: '2023년' }
  ])

  // 에디터 상태 (변수명 통일)
  const editorContent = ref('<p>여기에 내용을 작성하세요.</p>')

  // TinyMCE 간단 설정
  const editorConfig = ref({
    height: 700,
    menubar: false, // 메뉴바 숨김
    plugins: 'lists link image table code',
    toolbar:
      'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image | code',
    toolbar_mode: 'floating',
    branding: false,
    language: 'ko_KR',
    content_style: `
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      line-height: 1.6;
      margin: 20px;
    }
  `
  })

  // 이벤트 핸들러
  const onEditorInit = () => {
    console.log('에디터 초기화 완료')
  }

  const handleSave = () => {
    const data = {
      year: selectedYear.value,
      content: editorContent.value
    }
    console.log('저장 데이터:', data)
    alert('저장되었습니다.')
  }
</script>

<style scoped>
  .editor-container {
    margin: 0 auto;
    width: 100%;
  }
</style>
