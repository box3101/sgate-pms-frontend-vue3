<template>
  <div class="page-header">
    <div class="header-left">
      <div class="select-group">
        <div class="select-item">
          <span class="select-label">기준년도</span>
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
        <UiTooltip title="등급척도그룹 가져오기">
          <template #trigger>
            <UiButton
              type="button"
              variant="secondary-line"
              size="medium"
              @click="handleOpenImportModal"
            >
              등급척도그룹 가져오기
              <i class="icon-md icon-get"></i>
            </UiButton>
          </template>
          <p>현 기존년도의 등급척도 그룹 중 하나를 선택하여 복사합니다.</p>
        </UiTooltip>
        <UiButton type="button" variant="primary-line" size="medium" class="ml-2">
          전년도 데이터 복사
          <i class="icon-md icon-copy icon-primary"></i>
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup>
  // Emits 정의
  const emit = defineEmits(['open-import-modal'])

  // 기준년도 선택 옵션
  const selectedYear = ref('2025')
  const yearOptions = ref([
    { value: '2025', label: '2025년' },
    { value: '2024', label: '2024년' },
    { value: '2023', label: '2023년' }
  ])

  const groupOptions = ref([
    { value: 'group1', label: '등급배분그룹 1' },
    { value: 'group2', label: '등급배분그룹 2' },
    { value: 'group3', label: '등급배분그룹 3' }
  ])

  /**
   * 가져오기 모달 열기 처리
   * 목적: 부모 컴포넌트에 모달 열기 이벤트 전달
   */
  const handleOpenImportModal = () => {
    emit('open-import-modal')
  }
</script>
