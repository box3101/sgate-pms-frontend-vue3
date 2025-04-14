<!-- app.vue -->
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
  /* 모바일에서 하단 빈 여백 제거를 위한 전역 스타일 */
  html,
  body {
    height: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow-x: hidden;
  }

  body {
    position: relative;
    min-height: 100% !important;
  }

  #__nuxt {
    min-height: 100% !important;
    display: flex;
    flex-direction: column;
  }

  @media screen and (max-width: 768px) {
    html,
    body,
    #__nuxt {
      height: auto !important;
      min-height: 100% !important;
      max-height: none !important;
    }

    /* 빈 여백 제거를 위한 추가 스타일 */
    body::after {
      content: '';
      display: block;
      height: 0;
      clear: both;
    }
  }
</style>
