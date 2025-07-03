<template>
  <UiModal title="AI 요약 전후 비교" v-model="isOpen" :size="'mlarge'">
    <UiFormLayout>
      <div class="flex flex-col">
        <!-- 비교 헤더 -->
        <ul class="flex flex-wrap w-full fx-header">
          <li class="flex justify-center items-center w-half">
            <span>금일실적</span>
          </li>
          <li class="flex justify-center items-center w-half">
            <span>AI 요약 금일 실적</span>
          </li>
        </ul>

        <!-- 비교 내용 -->
        <ul class="flex flex-wrap w-full h-100p fx-body">
          <li class="flex justify-center w-half border-right">
            <div class="content-area">
              {{ originalContent }}
            </div>
          </li>
          <li class="flex justify-center w-half">
            <div class="content-area">
              {{ aiSummaryContent }}
            </div>
          </li>
        </ul>
      </div>
    </UiFormLayout>
  </UiModal>
</template>

<script setup>
  import { computed } from 'vue'

  // Props
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    originalContent: {
      type: String,
      default: ''
    },
    aiSummaryContent: {
      type: String,
      default: ''
    }
  })

  // Emits
  const emit = defineEmits(['update:modelValue'])

  // v-model 처리
  const isOpen = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value)
  })
</script>
