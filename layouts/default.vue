<!-- layouts/default.vue -->
<template>
  <div class="app-layout">
    <TheHeader :logoText="logoText" />
    <div class="content-wrapper">
      <TheSidebar />
      <main class="main-content" :key="$route.path">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
// 명시적 임포트 사용
import TheHeader from '~/components/Layout/TheHeader.vue';
import TheSidebar from '~/components/Layout/TheSidebar.vue';
import { ref, provide, onMounted } from 'vue';
import AOS from 'aos';

// 로고 텍스트 상태 관리
const logoText = ref('개인성과');

// 자식 컴포넌트에서 접근할 수 있도록 provide
provide('logoText', logoText);

// 애니메이션 초기화
onMounted(() => {
  AOS.init({
    once: true, // 애니메이션이 한 번만 실행되도록 설정
    duration: 800, // 기본 지속 시간
  });
});

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
  width: 100%;
}

.main-content {
  margin-left: 78px; /* 사이드바 기본 너비 */
  padding-right: 16px;
  margin-top: 95px; /* 헤더 높이 */
  padding-bottom: 16px;
  box-sizing: border-box; /* 패딩이 너비에 포함되도록 설정 */
  max-width: calc(100% - 60px); /* 사이드바 너비를 고려한 최대 너비 */
  width: 100%;
  min-width: 1200px;
  animation: fade-in 0.3s ease-out;
  height: calc(100vh - 95px);

}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>