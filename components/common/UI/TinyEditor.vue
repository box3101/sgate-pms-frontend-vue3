<!-- components/common/UI/TinyEditor.vue -->
<template>
  <div class="tinymce-editor-wrapper">
    <ClientOnly>
      <Editor
        :model-value="modelValue"
        @update:model-value="handleInput"
        :init="editorConfig"
        @init="handleInit"
        @change="handleChange"
      />
    </ClientOnly>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import Editor from '@tinymce/tinymce-vue'

  // Props 정의 (기본 옵션만)
  const props = defineProps({
    // v-model을 위한 props
    modelValue: {
      type: String,
      default: ''
    },

    // 에디터 높이 - CSS calc() 지원
    height: {
      type: [Number, String],
      default: 400
    },

    // 메뉴바 표시 여부
    showMenubar: {
      type: Boolean,
      default: true
    },

    // 읽기 전용
    readonly: {
      type: Boolean,
      default: false
    },

    // 툴바 표시 여부
    showToolbar: {
      type: Boolean,
      default: true
    }
  })

  // Emits 정의
  const emit = defineEmits(['update:modelValue', 'init', 'change'])

  // height 값 처리 함수
  const processHeight = height => {
    if (typeof height === 'string') {
      // CSS calc() 함수나 다른 CSS 단위가 포함된 경우
      if (
        height.includes('calc') ||
        height.includes('vh') ||
        height.includes('vw') ||
        height.includes('%')
      ) {
        return height
      }
      // 숫자 문자열인 경우
      if (!isNaN(height)) {
        return parseInt(height)
      }
      // 기타 CSS 단위 (px, em, rem 등)
      return height
    }
    // 숫자인 경우 그대로 반환 (TinyMCE가 px로 처리)
    return height
  }

  // 에디터 기본 설정
  const editorConfig = computed(() => ({
    height: processHeight(props.height),
    menubar: props.showMenubar,
    plugins: 'lists link image table code',
    toolbar: props.showToolbar
      ? 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image | code'
      : false,
    toolbar_mode: 'floating',
    branding: false,
    language: 'ko_KR',
    readonly: props.readonly,
    resize: 'vertical',
    content_style: `
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      line-height: 1.6;
      margin: 20px;
    }
  `
  }))

  // 이벤트 핸들러들
  const handleInput = value => {
    emit('update:modelValue', value)
  }

  const handleInit = (event, editor) => {
    console.log('TinyMCE 초기화 완료')
    emit('init', event, editor)
  }

  const handleChange = (event, editor) => {
    emit('change', event, editor)
  }
</script>

<style scoped>
  .tinymce-editor-wrapper {
    width: 100%;
  }

  /* TinyMCE 커스텀 스타일 */
  :deep(.tox-tinymce) {
    border: 1px solid #e5e7eb !important;
    border-radius: 6px;
  }

  :deep(.tox-toolbar__primary) {
    background: #f8fafc !important;
    border-bottom: 1px solid #e5e7eb !important;
  }

  :deep(.tox-tbtn) {
    margin: 2px 1px !important;
    border-radius: 4px !important;
  }

  :deep(.tox-tbtn:hover) {
    background-color: #e5e7eb !important;
  }

  :deep(.tox-edit-area__iframe) {
    background-color: #fff !important;
  }

  :deep(.tox-statusbar) {
    border-top: 1px solid #e5e7eb !important;
    background-color: #f8fafc !important;
  }
</style>
