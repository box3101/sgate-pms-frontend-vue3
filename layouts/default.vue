<!-- layouts/default.vue -->
<template>
  <div class="app-layout">
    <TheHeader />
    <div class="content-wrapper">
      <TheSidebar />
      <main class="main-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
// 명시적 임포트 사용
import TheHeader from '~/components/Layout/TheHeader.vue';
import TheSidebar from '~/components/Layout/TheSidebar.vue';
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-wrapper {
  display: flex;
  flex: 1;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 40px; /* 헤더 높이 */
  flex: 1;
  padding: 16px;
}
</style>