<!-- 양식 타입 에디터 (TinyMCE) - 수정 버전 -->
<template>
  <div class="form-editor-content">
    <div class="tinymce-wrapper">
      <TinyEditor :height="'calc(100vh - 320px)'" />
    </div>
  </div>
</template>

<script setup>
  import TinyEditor from '~/components/common/UI/TinyEditor.vue'

  const props = defineProps({
    template: {
      type: Object,
      required: true
    }
  })
</script>

<style scoped>
  .form-editor-content {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }

  .tinymce-wrapper {
    flex: 1;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    overflow: hidden;
  }
</style>
