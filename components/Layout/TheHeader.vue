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
        <div>
          <button class="icon-button" @click="openFilter">
            <Icon name="heroicons:user" size="24" />
          </button>
          <UiFilterModal
            v-model="isFilterModalOpen"
            :size="'small'"
            :targetRef="filterButton"
            position="right"
            :title="'장호영(isap136)'"
            :showFooter="true"
          >
            <UiFormLayout>
              <UiFormItem label="언어">
                <UiSegment
                  v-model="language"
                  :options="[
                    { value: 'ko', label: '한국어' },
                    { value: 'en', label: 'English' },
                  ]"
                />
              </UiFormItem>
              <UiFormItem label="메인페이지">
                <UiButton variant="tertiary" icon="heroicons:arrow-right"
                  >부진사유/대책</UiButton
                >
              </UiFormItem>
              <UiFormItem label="이메일 알림">
                <UiSegment
                  v-model="emailNotification"
                  :options="[
                    { value: 'on', label: 'ON' },
                    { value: 'off', label: 'OFF' },
                  ]"
                />
              </UiFormItem>
              <UiFormItem label="푸시 알림">
                <UiSegment
                  v-model="pushNotification"
                  :options="[
                    { value: 'on', label: 'ON' },
                    { value: 'off', label: 'OFF' },
                  ]"
                />
              </UiFormItem>
              <UiFormItem label="슬랙 알림">
                <UiSegment
                  v-model="slackNotification"
                  :options="[
                    { value: 'on', label: 'ON' },
                    { value: 'off', label: 'OFF' },
                  ]"
                />
              </UiFormItem>
            </UiFormLayout>

            <!-- 이렇게 푸터 슬롯을 타겟팅합니다 -->
            <template #footer>
              <div class="status-bar">
                <div class="status-bar__time">
                  <span class="status-bar__icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </span>
                  <span class="status-bar__time-text">Time : 12:12:03</span>
                </div>
                <div class="status-bar__action">
                  <span class="status-bar__icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                  </span>
                  <span class="status-bar__action-text">로그아웃</span>
                </div>
              </div>
            </template>
          </UiFilterModal>
        </div>

        <button class="icon-button" @click="isNotificationModalOpen = true">
          <Icon name="mdi:bell-outline" size="24" />
        </button>
        <UiModal
          title="알림"
          v-model="isNotificationModalOpen"
          position="right"
          :size="'small'"
        >
          <template #headerActions>
            <div
              class="flex gap-5 mr-10 mr-20 modal-header-actions align-center"
            >
              <UiButton variant="ghost" iconOnly title="새로 고침">
                <Icon name="mdi:refresh" size="20" />
              </UiButton>
              <UiButton variant="ghost" iconOnly title="모두 읽기">
                <Icon name="mdi:check-all" size="20" />
              </UiButton>
              <UiButton variant="ghost" iconOnly title="모두 삭제">
                <Icon name="mdi:delete-outline" size="20" />
              </UiButton>
            </div>
          </template>

          오승현
        </UiModal>

        <button class="icon-button" @click="isFullMenuModalOpen = true">
          <Icon name="mdi:cog-outline" size="24" />
        </button>

        <UiModal title="전체 메뉴" v-model="isFullMenuModalOpen" :size="'full'">
        </UiModal>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import UiInput from "../UI/UiInput.vue";
import UiFilterModal from "../UI/UiFilterModal.vue";
import UiFormLayout from "../UI/UiFormLayout.vue";
import UiFormItem from "../UI/UiFormItem.vue";
import UiSegment from "../UI/UiSegment.vue";
import UiModal from "../UI/UiModal.vue";

// 필터 모달 관련 상태
const filterButton = ref(null);
const isFilterModalOpen = ref(false);

// 사용자 환경설정 관련 상태
const language = ref("ko");
const emailNotification = ref("on");
const pushNotification = ref("on");
const slackNotification = ref("on");

// 알림 모달 관련 상태
const isNotificationModalOpen = ref(false);

// 전체 메뉴 모달 관련 상태
const isFullMenuModalOpen = ref(false);

function openFilter() {
  isFilterModalOpen.value = !isFilterModalOpen.value;
}

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

<style lang="scss" scoped>
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
.status-bar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  border-bottom: 1px solid $border-color;
  font-size: $font-size-xs;
  color: $text-color;
  background-color: #fafafa;

  &__time {
    display: flex;
    align-items: center;
    padding: 0 12px;
    height: 100%;
    border-right: 1px solid $border-color;
  }

  &__action {
    display: flex;
    align-items: center;
    padding: 0 12px;
    height: 100%;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: $hover-background;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    margin-right: 6px;
    color: $icon-color;
  }

  &__time-text {
    font-family: "Consolas", monospace;
    letter-spacing: 0.5px;
  }

  &__action-text {
    font-weight: 500;
  }
}

:deep(.ui-form-item__content) {
  display: flex;
  justify-content: flex-end;
}
</style>
