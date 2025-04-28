<!-- layouts/default.vue -->
<template>
  <div class="app-layout">
    <TheHeader :logoText="logoText" :hasLink="hasLink" />
    <div class="content-wrapper">
      <TheSidebar @toggle-expanded="toggleExpanded" />
      <main class="main-content" :key="$route.path" :class="{ expanded: isExpanded }">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
  // 명시적 임포트 사용
  import TheHeader from '~/components/Layout/TheHeader.vue'
  import TheSidebar from '~/components/Layout/TheSidebar.vue'
  import { ref, provide, onMounted } from 'vue'
  import AOS from 'aos'

  // 로고 텍스트 상태 관리
  const logoText = ref('개인성과')
  const hasLink = ref(false)
  // 사이드바 확장 상태 관리
  const isExpanded = ref(false)

  // 자식 컴포넌트에서 접근할 수 있도록 provide
  provide('logoText', logoText)
  provide('hasLink', hasLink)
  provide('isExpanded', isExpanded)

  // 사이드바 확장 상태 토글 함수
  const toggleExpanded = () => {
    isExpanded.value = !isExpanded.value
  }

  // 애니메이션 초기화
  onMounted(() => {
    AOS.init({
      once: true, // 애니메이션이 한 번만 실행되도록 설정
      duration: 800 // 기본 지속 시간
    })
  })
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
    padding-left: 95px; /* 사이드바 기본 너비 */
    padding-right: 16px;
    padding-top: 95px; /* 헤더 높이 */
    box-sizing: border-box; /* 패딩이 너비에 포함되도록 설정 */
    width: 100%;
    min-width: 1200px;
    animation: fade-in 0.3s ease-out;
    overflow-y: auto;
    height: calc(100vh);

    &.expanded {
      padding-left: 290px; /* 핀 고정 시 사이드바 너비(80px) + 서브메뉴 너비(200px) */
    }
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
