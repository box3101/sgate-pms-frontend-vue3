<template>
  <TaskBoard />
</template>

<script setup>
  import { inject } from 'vue'
  import TaskBoard from '~/components/domain/TaskBoard/TaskBoard.vue'

  // 로고 텍스트 접근
  const logoText = inject('logoText')

  // 원하는 시점에 로고 텍스트 변경
  logoText.value = '업무/협업'
</script>
