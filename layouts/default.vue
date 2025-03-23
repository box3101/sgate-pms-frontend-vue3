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
  width: 100%;
  overflow-x: hidden; /* 가로 스크롤 방지 */
}

.content-wrapper {
  display: flex;
  flex: 1;
  width: 100%;
}

.main-content {
  margin-left: 78px; /* 사이드바 기본 너비 */
  margin-right: 40px;
  margin-top: 68px; /* 헤더 높이 */
  box-sizing: border-box; /* 패딩이 너비에 포함되도록 설정 */
  max-width: calc(100% - 60px); /* 사이드바 너비를 고려한 최대 너비 */
  min-width: 1200px; /* 최소 너비 추가 - 화면이 작아져도 컨텐츠 영역이 유지됨 */
  flex: 1;
  overflow-x: auto; /* 화면이 작을 때 가로 스크롤 허용 */
}
</style>