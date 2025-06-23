<template>
  <div class="page-header">
    <div class="header-left">
      <div class="select-group flex items-center gap-10">
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
        <div class="select-item">
          <span class="select-label">평가군</span>
          <UiSelect
            v-model="selectedGroup"
            :options="groupOptions"
            size="medium"
            placeholder="선택"
            width="150px"
          />
        </div>
        <div class="button-group flex items-center gap-5">
          <UiButton variant="primary" icon-only>
            <i class="icon-md icon-plus icon-white"></i>
          </UiButton>
          <UiButton variant="secondary-line" icon-only>
            <i class="icon-md icon-delete"></i>
          </UiButton>
          <UiButton variant="secondary" icon-only>
            <i class="icon-md icon-pencil icon-white"></i>
          </UiButton>
        </div>
      </div>
    </div>
  </div>
</template>
