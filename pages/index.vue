<template>
  <div>
    <h1> 홈페이지 메인 입니다.</h1>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log('메인 페이지 마운트됨')
  console.log('메인 페이지에서 localStorage 값:', localStorage.getItem('sidebarExpanded'))
  
  // 임시로 localStorage 초기화 (테스트용)
  // localStorage.removeItem('sidebarExpanded')
  // console.log('localStorage 초기화함')
})
</script>