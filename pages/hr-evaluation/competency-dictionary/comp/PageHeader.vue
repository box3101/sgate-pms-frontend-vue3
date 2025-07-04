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
        <div class="select-item flex items-center">
          <span class="select-label">등급배분그룹</span>
          <UiSelect
            v-model="selectedGroup"
            :options="groupOptions"
            placeholder="선택"
            width="150px"
          />
          <div class="button-group ml-4 flex items-center gap-4">
            <UiButton variant="primary" icon-only>
              <i class="icon-md icon-plus icon-white"></i>
            </UiButton>
            <UiButton variant="secondary" icon-only>
              <i class="icon-md icon-pencil icon-white"></i>
            </UiButton>
            <UiButton variant="secondary-line" icon-only>
              <i class="icon-md icon-delete"></i>
            </UiButton>
          </div>
        </div>
      </div>
    </div>
    <div class="header-right">
      <div class="button-group">
        <UiTooltip title="등급배분표 그룹 가져오기">
          <template #trigger>
            <UiButton
              type="button"
              variant="secondary-line"
              size="medium"
              @click="$emit('get-grade-distribution-group')"
            >
              등급배분표 그룹 가져오기
              <i class="icon-md icon-get"></i>
            </UiButton>
          </template>
          <p>현 기존년도의 등급배분표 그룹 중 하나를 선택하여 복사합니다.</p>
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
  import { ref } from 'vue'

  const selectedYear = ref('2025')
  const yearOptions = ref([
    { value: '2025', label: '2025년' },
    { value: '2024', label: '2024년' },
    { value: '2023', label: '2023년' }
  ])

  const selectedGroup = ref('')
  const groupOptions = ref([
    { value: 'group1', label: '등급배분그룹 1' },
    { value: 'group2', label: '등급배분그룹 2' },
    { value: 'group3', label: '등급배분그룹 3' }
  ])
</script>
