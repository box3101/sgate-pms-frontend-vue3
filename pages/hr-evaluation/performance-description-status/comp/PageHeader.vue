<template>
  <div class="page-header">
    <div class="header-left">
      <div class="select-group flex gap-20">
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
          <span class="select-label">구분</span>
          <UiSelect
            v-model="selectedGroup"
            :options="groupOptions"
            size="medium"
            placeholder="선택"
            width="150px"
          />
        </div>
        <div class="select-item">
          <span class="select-label">작성여부</span>
          <UiSelect
            v-model="selectedGroup"
            :options="groupOptions"
            size="medium"
            placeholder="선택"
            width="150px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
