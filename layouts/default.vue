<template>
  <div class="app-layout">
    <TheHeader :logoText="logoText" :hasLink="hasLink" />
    <div class="content-wrapper">
      <TheSidebar @toggle-expanded="toggleExpanded" />
      <main
        class="main-content"
        :key="$route.path"
        :class="{
          expanded: isExpanded,
          'overflow-hidden': shouldHideOverflow
        }"
      >
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
  import TheHeader from '~/components/Layout/TheHeader.vue'
  import TheSidebar from '~/components/Layout/TheSidebar.vue'
  import { ref, provide, onMounted, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import AOS from 'aos'

  // 현재 라우터 가져오기
  const route = useRoute()

  // 오버플로우를 숨길 페이지 목록
  const noOverflowPages = ['Task-collaboration-board']

  // 오버플로우를 숨길지 여부 계산
  const shouldHideOverflow = computed(() => noOverflowPages.includes(route.name))

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
    console.log('toggleExpanded 이후 값:', isExpanded.value)
  }
  // 컴포넌트 마운트 시 확장 상태 복원
  onMounted(() => {
    // localStorage에서 확장 상태 불러오기
    const savedExpanded = localStorage.getItem('sidebarExpanded')
    if (savedExpanded === 'true') {
      isExpanded.value = true
    }

    // 애니메이션 초기화
    AOS.init({
      once: true,
      duration: 800
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
    overflow-x: auto;
    height: calc(100vh);

    &.expanded {
      padding-left: 290px; /* 핀 고정 시 사이드바 너비(80px) + 서브메뉴 너비(200px) */
    }

    &.overflow-hidden {
      overflow: hidden;
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
