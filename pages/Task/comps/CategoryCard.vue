<template>
  <div class="task-card">
    <div v-if="tags && tags.length > 0" class="card-tags">
      <UiTag
        v-for="(tag, index) in tags"
        :key="index"
        :text="tag"
        v-bind="getTagProps(tag)"
        size="small"
      />
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
import UiTag from "~/components/UI/UiTag.vue";

defineProps({
  title: {
    type: String,
    default: "업무명이 들어가는 공간입니다.",
  },
  tags: {
    type: Array,
    default: () => [],
  },
  date: {
    type: String,
    default: "",
  },
  comments: {
    type: Number,
    default: 0,
  },
  attachments: {
    type: Number,
    default: 0,
  },
});

// 태그 내용에 따라 다른 색상 속성을 반환하는 함수
function getTagProps(tag) {
  // 태그 내용에 따라 다른 색상 변형 적용
  const tagLower = tag.toLowerCase();
  
  // 기본 변형 사용
  if (tagLower.includes('디자인')) return { variant: 'primary' };
  if (tagLower.includes('ui') || tagLower.includes('ux')) return { variant: 'info' };
  if (tagLower.includes('테스트')) return { variant: 'warning' };
  if (tagLower.includes('버그') || tagLower.includes('오류')) return { variant: 'danger' };
  if (tagLower.includes('완료') || tagLower.includes('성공')) return { variant: 'success' };
  
  // 커스텀 색상 사용
  if (tagLower.includes('프론트엔드')) {
    return {
      variant: 'custom',
      backgroundColor: '#61dafb',
      textColor: '#003545',
      borderColor: '#61dafb'
    };
  }
  
  if (tagLower.includes('백엔드')) {
    return {
      variant: 'custom',
      backgroundColor: '#6c5ce7',
      textColor: 'white',
      borderColor: '#6c5ce7'
    };
  }
  
  if (tagLower.includes('모바일')) {
    return {
      variant: 'custom',
      backgroundColor: '#fdcb6e',
      textColor: '#805b00',
      borderColor: '#fdcb6e'
    };
  }
  
  if (tagLower.includes('시스템')) {
    return {
      variant: 'custom',
      backgroundColor: '#00b894',
      textColor: 'white',
      borderColor: '#00b894'
    };
  }
  
  // 기본값
  return { variant: 'default' };
}
</script>

<style lang="scss" scoped>
.task-card {
  margin-top: 10px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #fff;
  
  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 8px;
  }
  
  .card-title {
    font-weight: 500;
    margin: 8px 0;
    line-height: 1.4;
  }
  
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    font-size: 12px;
    color: #6b7280;
  }
  
  .card-stats {
    display: flex;
    gap: 8px;
  }
  
  .card-comments,
  .card-attachments {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  .card-date {
    font-size: 11px;
  }
}
</style>
