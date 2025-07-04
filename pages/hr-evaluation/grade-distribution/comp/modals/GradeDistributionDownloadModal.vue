<template>
  <!-- 등급 배분표 양식 다운로드 모달 -->
  <UiModal v-model="showDownloadModal" title="등급배분표 양식 다운로드" showFooter size="large">
    <UiAttachment v-model="uploadedFiles" />
    <template #footerActions>
      <UiButton size="medium" variant="primary" @click="handleDownload"> 첨부완료 </UiButton>
    </template>
  </UiModal>
</template>

<script setup>
  import UiAttachment from '../../../../../components/common/UI/UiAttachment.vue'

  // Props
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    }
  })

  // Emits
  const emit = defineEmits(['update:modelValue', 'download'])

  // 모달 표시 상태
  const showDownloadModal = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value)
  })
</script>
