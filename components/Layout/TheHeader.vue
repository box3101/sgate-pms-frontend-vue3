<template>
  <header class="header">
    <div class="header-container">
      <!-- 로고 부분 -->
      <div class="logo">
        <NuxtLink to="/">
          <Icon name="mdi:information-outline" class="logo-icon" />
          <span class="logo-text">개인성과</span>
        </NuxtLink>
      </div>

      <!-- 동적 탭 메뉴 부분 -->
      <div v-if="currentTabMenu.length > 0" class="tab-menu">
        <div class="tabs">
          <NuxtLink
            v-for="tab in currentTabMenu"
            :key="tab.name"
            :to="tab.path"
            class="tab"
            :class="{ active: isActive(tab.path) }"
          >
            {{ tab.name }}
          </NuxtLink>
        </div>
      </div>

      <!-- 우측 아이콘 메뉴 -->
      <div class="icon-menu">
        <button class="icon-button">
          <Icon name="mdi:information-outline" size="24" />
        </button>
        <button class="icon-button">
          <Icon name="mdi:bell-outline" size="24" />
        </button>
        <button class="icon-button">
          <Icon name="mdi:cog-outline" size="24" />
        </button>
        <button class="icon-button">
          <Icon name="mdi:account-circle-outline" size="24" />
        </button>
        <button class="icon-button">
          <Icon name="mdi:earth" size="24" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

// 현재 라우트 가져오기
const route = useRoute();

// 각 섹션별 탭 메뉴 정의
const tabMenus = {
  // 홈 섹션 탭
  home: [
    { name: "홈", path: "/" },
    { name: "보드", path: "/" },
    { name: "Timeline", path: "/" },
    { name: "요약", path: "/" },
  ],

  // 업무 섹션 탭
  tasks: [
    { name: "업무 목록", path: "/tasks" },
    { name: "보드", path: "/tasks/board" },
    { name: "Timeline", path: "/tasks/timeline" },
    { name: "요약", path: "/tasks/summary" },
  ],

  // 프로젝트 섹션 탭
  projects: [
    { name: "프로젝트 목록", path: "/projects" },
    { name: "간트 차트", path: "/projects/gantt" },
    { name: "마일스톤", path: "/projects/milestones" },
  ],

  // 기본값: 빈 배열 (탭 없음)
  default: [],
};

// 현재 경로에 맞는 탭 메뉴 결정
const currentTabMenu = computed(() => {
  // 경로 기반으로 섹션 결정
  if (
    route.path === "/cnt01" ||
    route.path.startsWith("/dashboard") ||
    route.path.startsWith("/notifications")
  ) {
    return tabMenus.home;
  } else if (route.path.startsWith("/tasks")) {
    return tabMenus.tasks;
  } else if (route.path.startsWith("/projects")) {
    return tabMenus.projects;
  } else {
    // 해당하는 탭 메뉴가 없으면 빈 배열 반환
    return tabMenus.default;
  }
});

// 현재 경로 기준 활성 탭 확인 함수
const isActive = (path) => {
  // 정확히 일치하거나 하위 경로일 경우 활성화
  if (path === "/") {
    return route.path === "/";
  } else {
    return route.path === path || (path !== "/" && route.path.startsWith(path));
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 70px;
  background-color: white;
  border-bottom: 1px solid #aaa;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 16px;
  max-width: 97%;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  min-width: 120px; /* 로고 영역 최소 너비 */
}

.logo a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
}

.logo-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.logo-text {
  font-weight: bold;
  font-size: 16px;
}

/* 탭 메뉴 스타일 */
.tab-menu {
  flex: 1;
  display: flex;
  height: 100%;
}

.tabs {
  display: flex;
  height: 100%;
}

.tab {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  color: #aaa;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  position: relative;
  transition: color 0.2s;
}

.tab:hover {
  color: #333;
}

.tab.active {
  color: #1a73e8;
  font-weight: 500;
}

.tab.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #1a73e8;
}

.icon-menu {
  display: flex;
  align-items: center;
  min-width: 180px; /* 아이콘 메뉴 영역 최소 너비 */
  justify-content: flex-end;
}

.icon-button {
  background: none;
  border: none;
  width: 32px;
  height: 32px;
  margin-left: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.icon-button:hover {
  background-color: #f5f5f5;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .tab-menu {
    overflow-x: auto;
    justify-content: flex-start;
  }

  .tab {
    padding: 0 12px;
    white-space: nowrap;
  }

  .icon-menu {
    min-width: auto;
  }
}
</style>
