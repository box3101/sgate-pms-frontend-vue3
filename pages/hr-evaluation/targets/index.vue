<template>
  <div class="container-large">
    <div class="page-header">
      <div class="header-left flex items-center gap-10">
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
        <div class="flex items-center">
          <i class="icon-md icon-user mr-2"></i>
          <span>홍길동</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const logoText = inject('logoText')
  logoText.value = '평가대상확인(부서장)'

  const selectedYear = ref('2025')
  const yearOptions = ref([
    { value: '2025', label: '2025년' },
    { value: '2024', label: '2024년' },
    { value: '2023', label: '2023년' }
  ])
</script>
