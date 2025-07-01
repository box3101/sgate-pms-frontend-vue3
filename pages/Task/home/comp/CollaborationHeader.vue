<template>
  <div class="page-header">
    <div class="header-left">
      <div class="select-group">
        <div class="flex gap-8 items-center">
          <UiDatePicker
            v-model="dateRange"
            :isRange="true"
            startPlaceholder="시작일"
            endPlaceholder="종료일"
            class="min-w-260"
          />
          <UiSelect
            v-model="selectedBoard"
            :options="boardOptions"
            placeholder="보드를 선택해주세요"
            class="w-200"
          />
          <UiInput placeholder="업무를 입력하세요" class="w-200" />
          <UiButton variant="primary" size="medium" iconOnly>
            <i class="icon-md icon-search icon-white"></i>
          </UiButton>
        </div>
      </div>
    </div>
    <div class="header-right">
      <div class="button-group">
        <UiButton type="button" variant="ghost" size="medium" class="arrow-btn">
          상세 필터
          <i class="icon-md icon-arrow-down"></i>
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup>
  const dateRange = ref([])
  const selectedBoard = ref('')
  const boardOptions = ref([
    { label: '보드1', value: 'board1' },
    { label: '보드2', value: 'board2' },
    { label: '보드3', value: 'board3' }
  ])
</script>
