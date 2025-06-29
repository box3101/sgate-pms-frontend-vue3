<!-- 공통 템플릿 에디터 래퍼 - 수정 버전 -->
<template>
  <div class="template-editor-container">
    <!-- 공통 헤더 -->
    <div class="editor-header">
      <div class="header-left">
        <h2>{{ template.name }} 편집</h2>
        <span :class="['template-type', typeClass]">{{ template.type }}</span>
      </div>
      <div class="header-actions">
        <UiButton variant="secondary-line" @click="handlePreview">
          <i class="icon-md icon-eye"></i>
          미리보기
        </UiButton>
        <UiButton variant="secondary-line" @click="handleCopy">
          <i class="icon-md icon-copy"></i>
          복사
        </UiButton>
        <UiButton variant="primary" @click="handleSave">
          <i class="icon-md icon-save"></i>
          저장
        </UiButton>
      </div>
    </div>

    <!-- 공통 상단 고정 영역 -->
    <div class="period-header">
      <div class="period-content">
        <div class="period-section">
          <h3>성과기술서 작성기간 :</h3>
          <div class="date-range">
            <UiDatePicker v-model="startDate" placeholder="시작일" />
            <span class="date-separator">~</span>
            <UiDatePicker v-model="endDate" placeholder="종료일" />
          </div>
        </div>
      </div>
    </div>

    <!-- 에디터 컨텐츠 영역 -->
    <div class="editor-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'

  const props = defineProps({
    template: {
      type: Object,
      required: true
    }
  })

  const emit = defineEmits(['close', 'save', 'preview', 'copy'])

  // 공통 상태 관리
  const startDate = ref('')
  const endDate = ref('')

  // 템플릿 타입별 스타일 클래스
  const typeClass = computed(() => {
    return props.template.type === '항목정의' ? 'template-type--table' : 'template-type--form'
  })

  // 저장 데이터 준비
  const saveData = computed(() => ({
    templateId: props.template.id,
    startDate: startDate.value,
    endDate: endDate.value
  }))

  // 공통 액션 핸들러들
  const handleSave = () => {
    console.log('저장:', props.template.name)
    emit('save', saveData.value)
  }

  const handlePreview = () => {
    console.log('미리보기:', props.template.name)
    emit('preview', props.template)
  }

  const handleCopy = () => {
    console.log('복사:', props.template.name)
    emit('copy', props.template)
  }
</script>

<style scoped>
  .template-editor-container {
    display: flex;
    flex-direction: column;
    background: #ffffff;
  }

  .editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid #e5e7eb;
    background: #f9fafb;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .header-left h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #374151;
  }

  .template-type {
    padding: 4px 8px;
    color: white;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
  }

  .template-type--form {
    background: #3b82f6;
  }

  .template-type--table {
    background: #10b981;
  }

  .header-actions {
    display: flex;
    gap: 8px;
  }

  .period-header {
    border-bottom: 1px solid #e5e7eb;
    background: #ffffff;
  }

  .period-content {
    padding: 12px;
  }

  .period-section {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .period-section h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: #374151;
    white-space: nowrap;
  }

  .date-range {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .date-separator {
    color: #6b7280;
    font-weight: 500;
  }

  .editor-content {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 768px) {
    .editor-header {
      flex-direction: column;
      gap: 12px;
      align-items: stretch;
    }

    .header-actions {
      justify-content: flex-end;
    }

    .period-section {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }

    .period-content {
      padding: 16px;
    }
  }
</style>
