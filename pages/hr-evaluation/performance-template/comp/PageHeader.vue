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
        <UiButton
          type="button"
          variant="secondary-line"
          size="medium"
          @click="handleSearch"
          :loading="isSearching"
        >
          <i class="icon-md icon-search"></i>
          조회
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup>
  const selectedYear = ref('')
  const yearOptions = ref([
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' }
  ])

  const handleSearch = () => {
    console.log('Search clicked')
  }
</script>
