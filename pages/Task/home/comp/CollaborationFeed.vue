<template>
  <div class="page-title">
    <div class="page-title__icon">
      <i class="icon-md icon-list icon-white"></i>
    </div>
    <div class="page-title__text">활동</div>
  </div>
  <div class="search-container mb-12">
    <div class="flex gap-8 items-center">
      <UiDatePicker
        v-model="dateRange"
        :isRange="true"
        startPlaceholder="시작일"
        endPlaceholder="종료일"
        size="medium"
        class="w-260"
      />
      <UiInput placeholder="검색어를 입력하세요" class="w-200" />
      <UiButton variant="primary" size="medium" iconOnly>
        <i class="icon-md icon-search icon-white"></i>
      </UiButton>
    </div>
  </div>
  <ul class="scrollable-minus-12">
    <li v-for="item in 20" :key="item">
      <CollaborationItem />
    </li>
  </ul>
</template>

<script setup>
  import CollaborationItem from './CollaborationItem.vue'
</script>

<style scoped lang="scss">
  li {
    margin-bottom: 8px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
