<template>
  <TasksBoard />
</template>

<script setup>
import TasksBoard from '../comps/TaskBoard.vue';   
import { inject } from 'vue';

// 로고 텍스트 접근
const logoText = inject('logoText');

// 원하는 시점에 로고 텍스트 변경
logoText.value = '업무/협업';
</script>