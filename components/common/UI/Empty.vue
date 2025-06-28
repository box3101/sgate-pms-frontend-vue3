<template>
  <div class="empty-state">
    <h3 class="empty-state__title">{{ title }}</h3>
    <p class="empty-state__description" v-html="description"></p>
  </div>
</template>

<script setup>
  const props = defineProps({
    title: {
      type: String,
      default: '데이터가 없습니다'
    },
    description: {
      type: String,
      default: '표시할 내용이 없습니다.'
    },
    scrollable: {
      type: Boolean,
      default: false
    }
  })
</script>

<style lang="scss" scoped>
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    padding: 40px 20px;
    text-align: center;
    height: 100%;

    &__title {
      font-size: 18px;
      font-weight: 600;
      color: #374151;
      margin-bottom: 8px;
    }

    &__description {
      font-size: 14px;
      color: #6b7280;
      line-height: 1.5;
    }

    &__username {
      font-weight: 500;
      color: #111827;
    }
  }
</style>
