<template>
  <div class="task-card">
    <div v-if="tags && tags.length > 0" class="card-tags">
      <span v-for="(tag, index) in tags" :key="index" class="card-tag">{{ tag }}</span>
    </div>

    <div class="card-content">
      <p class="card-title">{{ title }}</p>
    </div>

    <div class="card-footer">
      <div class="card-stats">
        <span class="card-comments">
          <Icon name="mdi:comment-outline" size="14" />
          {{ comments || 0 }}
        </span>
        <span class="card-attachments">
          <Icon name="mdi:paperclip" size="14" />
          {{ attachments || 0 }}
        </span>
      </div>
      <span class="card-date">{{ date }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '업무명이 들어가는 공간입니다.'
  },
  tags: {
    type: Array,
    default: () => []
  },
  date: {
    type: String,
    default: ''
  },
  comments: {
    type: Number,
    default: 0
  },
  attachments: {
    type: Number,
    default: 0
  }
});
</script>

<style lang="scss" scoped>
.task-card {
  margin-top: 10px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #fff;
}
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}
.card-stats {
  display: flex;
  gap: 8px;
}
</style>
