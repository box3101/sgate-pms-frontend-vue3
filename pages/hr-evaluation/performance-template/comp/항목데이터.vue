<template>
  <div v-if="selectedTemplate">
    <h3>{{ selectedTemplate.name }} 편집 중</h3>
    <p>타입: {{ selectedTemplate.type }}</p>
    <p>ID: {{ selectedTemplate.id }}</p>
    <!-- 편집 폼이나 상세 내용 -->
  </div>
  <div v-else>
    <p>편집할 템플릿을 선택해주세요.</p>
  </div>
</template>

<script setup>
  defineProps(['selectedTemplate'])
</script>
