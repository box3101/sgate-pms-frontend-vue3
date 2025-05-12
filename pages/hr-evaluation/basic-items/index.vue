<template>
  <div class="basic-items-container container-medium">
    <div class="basic-items-content">23</div>
  </div>
</template>

<script setup>
  import { inject } from 'vue'

  // 로고 텍스트 접근
  const logoText = inject('logoText')

  // 원하는 시점에 로고 텍스트 변경
  logoText.value = '평가기본항목관리'
</script>
