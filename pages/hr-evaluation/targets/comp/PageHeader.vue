<template>
  <div class="page-header">
    <div class="header-left">
      <div class="select-group flex items-center gap-10">
        <div class="select-item">
          <span class="select-label">기준년도</span>
          <UiSelect
            v-model="selectedValue"
            :options="options"
            size="medium"
            placeholder="선택"
            width="150px"
          />
        </div>
        <div class="user-info flex items-center gap-5">
          <i class="icon-user icon-xl"></i>
          <span class="user-name">이찬용</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const selectedValue = ref('기본값')
  const options = ref([{ value: 'value1', label: '라벨1' }])
</script>
