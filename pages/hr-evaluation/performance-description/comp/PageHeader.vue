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
          <span class="select-label">성과보고서</span>
          <UiSelect
            v-model="selectedGroup"
            :options="groupOptions"
            placeholder="선택"
            width="150px"
          />
        </div>
      </div>
    </div>
    <div class="header-right">
      <div class="button-group">
        <UiButton variant="secondary-line"> MY </UiButton>
        <UiButton variant="secondary-line" size="medium" class="mr-2">
          조회
          <i class="icon-md icon-search"></i>
        </UiButton>
        <UiButton variant="secondary-line" size="medium" icon-only>
          <i class="icon-md icon-setting"></i>
        </UiButton>
      </div>
    </div>
  </div>
</template>
