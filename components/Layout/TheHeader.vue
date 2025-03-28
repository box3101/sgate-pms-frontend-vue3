<template>
  <header class="header">
    <div class="header-container">
      <!-- 로고 부분 -->
      <div class="logo">
        <NuxtLink to="/guide">
          <img
            src="@/assets/images/sgate_bot_icon.png"
            class="w-50"
            alt="SGate Logo"
          />
        </NuxtLink>
        <!-- 타이틀 부분 -->
        <div class="title-area">
          <h1 class="title">{{ logoText }}</h1>
          
          <a v-if="hasLink" href="javascript:void(0);">
            <i :class="hasLinkIcon"></i>
          </a>
        </div>
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
            <Icon name="heroicons:user-circle" size="30" />
          </button>
          <UiFilterModal
            v-model="isFilterModalOpen"
            :size="'small'"
            :targetRef="filterButton"
            position="right"
            :title="'장호영(isap136)'"
            :showFooter="true"
            :bgColor="'#eee'"
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
                <UiButton
                  variant="tertiary"
                  icon="heroicons:arrow-right"
                  icon-position="right"
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
            <template #footerActions>
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
          <div class="notifications-container">
            <a
              href="#none"
              style="display: block"
              v-for="(notification, index) in notifications"
              :key="index"
              :class="[
                'notification-card',
                `notification-status-${notification.status}`,
              ]"
            >
              <div class="notification-header">
                <div class="notification-sender">
                  <i class="icon-user-gray icon-xl"></i>
                  <span class="sender-name">{{ notification.sender }}</span>
                </div>
                <span class="notification-time">{{ notification.time }}</span>
              </div>
              <p
                class="notification-title"
                :class="`notification-status-${notification.status}`"
              >
                {{ notification.title }}
              </p>

              <div class="notification-content">
                {{ notification.content }}
              </div>
              <div class="notification-actions">
                <UiButton
                  variant="ghost"
                  size="small"
                  iconOnly
                  @click.stop.prevent="deleteNotification(notification.id)"
                >
                  <Icon name="mdi:delete-outline" size="20" />
                </UiButton>
              </div>
            </a>

            <!-- 알림 예시 -->
            <div v-if="notifications.length === 0" class="no-notifications">
              알림이 없습니다.
            </div>
          </div>
        </UiModal>

        <button class="icon-button" @click="isFullMenuModalOpen = true">
          <i class="icon icon-eye icon-lg"></i>
        </button>

        <UiModal v-model="isFullMenuModalOpen" :size="'full'">
          <template #title>
            전체 메뉴
            <span class="menu-description"
              >(메뉴를 클릭하면 해당 메뉴로 이동합니다)</span
            >
          </template>

          <div class="full-menu-grid">
            <div
              v-for="(section, sectionIndex) in menuSections"
              :key="sectionIndex"
              class="menu-section"
            >
              <div class="flex align-center gap-5">
                <Icon :name="section.icon" size="32" />
                <h3 class="menu-section-title">{{ section.title }}</h3>
              </div>
              <div class="menu-items-grid">
                <router-link
                  v-for="(item, itemIndex) in section.items"
                  :key="itemIndex"
                  :to="item.path"
                  class="menu-item"
                  @click="isFullMenuModalOpen = false"
                >
                  <span class="menu-item-name">{{ item.name }}</span>
                </router-link>
              </div>
              <div v-if="section.submenus" class="submenu-grid">
                <div
                  v-for="(submenu, submenuIndex) in section.submenus"
                  :key="submenuIndex"
                  class="submenu-section"
                >
                  <h4 class="submenu-section-title">{{ submenu.title }}</h4>
                  <div class="submenu-items-grid">
                    <router-link
                      v-for="(submenuItem, submenuItemIndex) in submenu.items"
                      :key="submenuItemIndex"
                      :to="submenuItem.path"
                      class="submenu-item"
                      @click="isFullMenuModalOpen = false"
                    >
                      <span class="submenu-item-name">{{
                        submenuItem.name
                      }}</span>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UiModal>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, ref, defineProps } from "vue";
import { useRoute } from "vue-router";


import UiFilterModal from "../UI/UiFilterModal.vue";
import UiFormLayout from "../UI/UiFormLayout.vue";
import UiFormItem from "../UI/UiFormItem.vue";
import UiSegment from "../UI/UiSegment.vue";
import UiModal from "../UI/UiModal.vue";

// props 정의
const props = defineProps({
  logoText: {
    type: String,
    default: "개인성과",
  },
  hasLink: {
    type: Boolean,
    default: false,
  },
  hasLinkIcon: {
    type: String,
    default: "",
  },
});

// hasLink
const hasLink = ref(false);
const hasLinkIcon = ref("");

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
  // 업무 섹션 탭
  tasks: [
    { name: "업무/협업", path: "/task" },
    { name: "보드", path: "/task/collaboration/board" },
    { name: "Timeline", path: "/task/timeline" },
    { name: "요약", path: "/task/summary" },
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

// 메뉴 섹션 정의
const menuSections = [
  {
    title: "대시보드",
    icon: "mdi:view-dashboard",
    items: [
      {
        name: "개인대시보드",
        path: "/dashboard/personal",
        icon: "mdi:account-circle",
      },
      {
        name: "개인타임라인",
        path: "/dashboard/timeline",
        icon: "mdi:timeline",
      },
      {
        name: "매니저대시보드",
        path: "/dashboard/manager",
        icon: "mdi:account-supervisor",
      },
      {
        name: "Total Align",
        path: "/dashboard/total-align",
        icon: "mdi:align-horizontal-left",
      },
    ],
    submenus: [
      {
        title: "고객사 사용현황",
        items: [
          {
            name: "일반 사용현황",
            path: "/dashboard/usage/general",
            icon: "mdi:chart-bar",
          },
          {
            name: "모듈별 사용현황",
            path: "/dashboard/usage/module",
            icon: "mdi:chart-pie",
          },
        ],
      },
      {
        title: "리포트",
        items: [
          {
            name: "개인별 평가종합 리포트",
            path: "/dashboard/evaluation-report",
            icon: "mdi:file-document",
          },
        ],
      },
    ],
  },
  {
    title: "업무",
    icon: "mdi:briefcase-outline",
    items: [
      {
        name: "업무/협업",
        path: "/task/collaboration",
        icon: "mdi:account-group",
      },
      {
        name: "일일/주간보고",
        path: "/task/reports",
        icon: "mdi:file-document-outline",
      },
      {
        name: "업무 인수인계",
        path: "/task/handover",
        icon: "mdi:swap-horizontal",
      },
    ],
  },
  {
    title: "PMS",
    icon: "mdi:chart-timeline-variant",
    items: [],
    submenus: [
      {
        title: "설정",
        items: [
          {
            name: "기본설정",
            path: "/pms/settings/basic",
            icon: "mdi:cog-outline",
          },
          {
            name: "표준템플릿",
            path: "/pms/settings/template",
            icon: "mdi:file-outline",
          },
        ],
      },
      {
        title: "프로젝트",
        items: [
          {
            name: "My Project",
            path: "/pms/my-project",
            icon: "mdi:folder-outline",
          },
        ],
      },
      {
        title: "현황조회",
        items: [
          {
            name: "전체진행현황",
            path: "/pms/status/overall",
            icon: "mdi:chart-box-outline",
          },
          {
            name: "부서별현황",
            path: "/pms/status/department",
            icon: "mdi:account-group-outline",
          },
          {
            name: "이슈현황",
            path: "/pms/status/issues",
            icon: "mdi:alert-circle-outline",
          },
        ],
      },
    ],
  },
  {
    title: "개인성과",
    icon: "mdi:account-star-outline",
    items: [
      { name: "KPI", path: "/performance/kpi", icon: "mdi:target" },
      {
        name: "개인개발계획",
        path: "/performance/development",
        icon: "mdi:account-cog-outline",
      },
      { name: "OKR", path: "/performance/okr", icon: "mdi:bullseye-arrow" },
    ],
  },
  {
    title: "조직성과",
    icon: "mdi:domain",
    items: [
      {
        name: "부서KPI관리",
        path: "/org-performance/department-kpi",
        icon: "mdi:office-building-outline",
      },
      {
        name: "목표/실적관리",
        path: "/org-performance/goals",
        icon: "mdi:flag-outline",
      },
      {
        name: "진행현황",
        path: "/org-performance/progress",
        icon: "mdi:progress-check",
      },
    ],
    submenus: [
      {
        title: "모니터링",
        items: [
          {
            name: "조직성과도",
            path: "/org-performance/dashboard",
            icon: "mdi:chart-areaspline",
          },
          {
            name: "KPI연계도",
            path: "/org-performance/kpi-link",
            icon: "mdi:link-variant",
          },
          {
            name: "조직성과요약",
            path: "/org-performance/summary",
            icon: "mdi:file-chart-outline",
          },
          {
            name: "조직성과상세",
            path: "/org-performance/detail",
            icon: "mdi:file-document-outline",
          },
          {
            name: "부진사유/대책",
            path: "/org-performance/measures",
            icon: "mdi:alert-outline",
          },
          {
            name: "평가군비교",
            path: "/org-performance/comparison",
            icon: "mdi:compare",
          },
          {
            name: "연계KPI비교",
            path: "/org-performance/kpi-comparison",
            icon: "mdi:compare-horizontal",
          },
        ],
      },
    ],
  },
  {
    title: "조직평가",
    icon: "mdi:account-group",
    items: [
      {
        name: "조직평가설정",
        path: "/org-evaluation/settings",
        icon: "mdi:cog-outline",
      },
      {
        name: "평가자평가",
        path: "/org-evaluation/evaluator",
        icon: "mdi:account-check-outline",
      },
      {
        name: "평가조정",
        path: "/org-evaluation/adjustment",
        icon: "mdi:tune-vertical",
      },
      {
        name: "진행현황",
        path: "/org-evaluation/progress",
        icon: "mdi:progress-check",
      },
      {
        name: "평가결과산출",
        path: "/org-evaluation/results",
        icon: "mdi:calculator-variant-outline",
      },
      {
        name: "최종결과조회",
        path: "/org-evaluation/final-results",
        icon: "mdi:file-document-outline",
      },
      {
        name: "기타평가항목 설정",
        path: "/org-evaluation/other-settings",
        icon: "mdi:cog-outline",
      },
    ],
  },
  {
    title: "인사평가",
    icon: "mdi:account-check",
    items: [
      {
        name: "평가하기",
        path: "/hr-evaluation/evaluate",
        icon: "mdi:clipboard-check-outline",
      },
      {
        name: "평가진행현황",
        path: "/hr-evaluation/progress",
        icon: "mdi:progress-check",
      },
      {
        name: "조정평가",
        path: "/hr-evaluation/adjustment",
        icon: "mdi:tune-vertical",
      },
      {
        name: "내평가결과",
        path: "/hr-evaluation/my-results",
        icon: "mdi:account-details-outline",
      },
      {
        name: "평가정합성 진단",
        path: "/hr-evaluation/diagnosis",
        icon: "mdi:stethoscope",
      },
      {
        name: "이의신청관리",
        path: "/hr-evaluation/objections",
        icon: "mdi:hand-back-right-outline",
      },
    ],
    submenus: [
      {
        title: "평가설정",
        items: [
          {
            name: "평가기본항목관리",
            path: "/hr-evaluation/basic-items",
            icon: "mdi:format-list-bulleted",
          },
          {
            name: "인사평가설정",
            path: "/hr-evaluation/settings",
            icon: "mdi:cog-outline",
          },
          {
            name: "평가대상확인(부서장)",
            path: "/hr-evaluation/targets",
            icon: "mdi:account-supervisor-outline",
          },
        ],
      },
      {
        title: "기술서작성",
        items: [
          {
            name: "업무기술서 템플릿",
            path: "/hr-evaluation/job-template",
            icon: "mdi:file-outline",
          },
          {
            name: "업무기술서",
            path: "/hr-evaluation/job-description",
            icon: "mdi:file-document-outline",
          },
          {
            name: "성과기술서템플릿",
            path: "/hr-evaluation/performance-template",
            icon: "mdi:file-outline",
          },
          {
            name: "성과기술서 작성",
            path: "/hr-evaluation/performance-description",
            icon: "mdi:file-edit-outline",
          },
        ],
      },
      {
        title: "평가산출",
        items: [
          {
            name: "인사평가산출",
            path: "/hr-evaluation/calculation",
            icon: "mdi:calculator-variant-outline",
          },
          {
            name: "조직점수산출",
            path: "/hr-evaluation/org-calculation",
            icon: "mdi:calculator-variant-outline",
          },
          {
            name: "평가종합산출",
            path: "/hr-evaluation/total-calculation",
            icon: "mdi:calculator-variant-outline",
          },
        ],
      },
      {
        title: "평가결과",
        items: [
          {
            name: "평가결과조회",
            path: "/hr-evaluation/results",
            icon: "mdi:file-search-outline",
          },
          {
            name: "평가종합결과조회",
            path: "/hr-evaluation/total-results",
            icon: "mdi:file-search-outline",
          },
          {
            name: "평가레포트",
            path: "/hr-evaluation/report",
            icon: "mdi:file-chart-outline",
          },
        ],
      },
    ],
  },
  {
    title: "온보딩",
    icon: "mdi:account-plus-outline",
    items: [
      {
        name: "Welcome Aboard",
        path: "/onboarding/welcome",
        icon: "mdi:hand-wave",
      },
      {
        name: "Support Board",
        path: "/onboarding/support",
        icon: "mdi:lifebuoy",
      },
      {
        name: "기본설정",
        path: "/onboarding/settings",
        icon: "mdi:cog-outline",
      },
    ],
    submenus: [
      {
        title: "온보딩관리",
        items: [
          {
            name: "입사환영 메일",
            path: "/onboarding/welcome-mail",
            icon: "mdi:email-outline",
          },
          {
            name: "FAQ",
            path: "/onboarding/faq",
            icon: "mdi:frequently-asked-questions",
          },
          {
            name: "물품/교육자료",
            path: "/onboarding/materials",
            icon: "mdi:bookshelf",
          },
          {
            name: "피드백항목",
            path: "/onboarding/feedback-items",
            icon: "mdi:message-text-outline",
          },
          {
            name: "활동 및 일정",
            path: "/onboarding/activities",
            icon: "mdi:calendar-outline",
          },
          {
            name: "온보딩대상자",
            path: "/onboarding/targets",
            icon: "mdi:account-outline",
          },
          {
            name: "Aboard 광고",
            path: "/onboarding/ads",
            icon: "mdi:advertisement",
          },
          {
            name: "온보딩현황",
            path: "/onboarding/status",
            icon: "mdi:chart-box-outline",
          },
          {
            name: "피드백 결과 조회",
            path: "/onboarding/feedback-results",
            icon: "mdi:message-text-outline",
          },
        ],
      },
    ],
  },
  {
    title: "인사관리",
    icon: "mdi:account-cog-outline",
    items: [
      {
        name: "경력관리",
        path: "/hr-management/career",
        icon: "mdi:briefcase-outline",
      },
      {
        name: "연봉관리",
        path: "/hr-management/salary",
        icon: "mdi:cash-multiple",
      },
    ],
    submenus: [
      {
        title: "모니터링",
        items: [
          {
            name: "직원조회",
            path: "/hr-management/employees",
            icon: "mdi:account-search-outline",
          },
          {
            name: "직원상세조회",
            path: "/hr-management/employee-details",
            icon: "mdi:account-details-outline",
          },
        ],
      },
      {
        title: "기본정보관리",
        items: [
          {
            name: "내정보",
            path: "/hr-management/my-info",
            icon: "mdi:account-outline",
          },
          {
            name: "조직관리",
            path: "/hr-management/organization",
            icon: "mdi:sitemap",
          },
          {
            name: "직원관리",
            path: "/hr-management/employee-management",
            icon: "mdi:account-multiple-outline",
          },
        ],
      },
    ],
  },
  {
    title: "커뮤니티",
    icon: "mdi:forum-outline",
    items: [],
    submenus: [
      {
        title: "공지및자료실",
        items: [
          {
            name: "공지사항",
            path: "/community/notices",
            icon: "mdi:bullhorn-outline",
          },
          {
            name: "게시판",
            path: "/community/board",
            icon: "mdi:clipboard-text-outline",
          },
          {
            name: "Q & A",
            path: "/community/qna",
            icon: "mdi:help-circle-outline",
          },
          {
            name: "자료실",
            path: "/community/resources",
            icon: "mdi:folder-open-outline",
          },
        ],
      },
    ],
  },
  {
    title: "설정관리",
    icon: "mdi:cog-outline",
    items: [
      { name: "목표/활동설정", path: "/settings/goals", icon: "mdi:target" },
      {
        name: "조직성과설정",
        path: "/settings/org-performance",
        icon: "mdi:domain",
      },
      {
        name: "회사정보관리",
        path: "/settings/company-info",
        icon: "mdi:office-building-outline",
      },
      { name: "코드관리", path: "/settings/codes", icon: "mdi:code-tags" },
    ],
    submenus: [
      {
        title: "메뉴및권한",
        items: [
          {
            name: "직원권한관리",
            path: "/settings/employee-permissions",
            icon: "mdi:account-key-outline",
          },
          {
            name: "메뉴권한관리",
            path: "/settings/menu-permissions",
            icon: "mdi:menu",
          },
        ],
      },
      {
        title: "패스워드 변경",
        items: [
          {
            name: "비밀번호변경",
            path: "/settings/change-password",
            icon: "mdi:lock-outline",
          },
        ],
      },
    ],
  },
  {
    title: "고객지원",
    icon: "mdi:headset",
    items: [
      {
        name: "문의하기",
        path: "/support/inquiry",
        icon: "mdi:message-question-outline",
      },
    ],
  },
];

// 알림 관련 상태
const notifications = ref([
  {
    id: 1,
    sender: "시스템",
    title: "시스템 업데이트",
    time: "10분 전",
    content:
      "시스템이 성공적으로 업데이트되었습니다. 새로운 기능이 추가되었으니 확인해보세요. 문제가 있으면 관리자에게 문의하세요.",
    read: false,
    status: "info",
  },
  {
    id: 2,
    sender: "홍길동",
    title: "새로운 활동",
    time: "1시간 전",
    content:
      "홍길동님으로부터 새 메시지가 도착했습니다. 프로젝트 진행 상황에 대한 피드백입니다.",
    read: false,
    status: "success",
  },
  {
    id: 3,
    sender: "일정관리",
    title: "일정 알림",
    time: "3시간 전",
    content:
      "내일 오전 10시 회의가 예정되어 있습니다. 회의실 A동 302호에서 진행됩니다. 필요한 자료를 준비해주세요.",
    read: true,
    status: "warning",
  },
  {
    id: 4,
    sender: "김윤기",
    title: "디자인 피드백",
    time: "5시간 전",
    content:
      "디자인 시스템 초안에 대한 피드백이 있습니다. 컬러 팔레트 조정이 필요합니다.",
    read: false,
    status: "info",
  },
  {
    id: 5,
    sender: "프로젝트 관리",
    title: "마감일 임박",
    time: "어제",
    content: "프로젝트 마감일이 3일 남았습니다. 진행 상황을 확인해주세요.",
    read: false,
    status: "danger",
  },
  {
    id: 6,
    sender: "이지은",
    title: "문서 공유",
    time: "어제",
    content: "요청하신 문서가 공유되었습니다. 확인 후 의견 부탁드립니다.",
    read: true,
    status: "success",
  },
  {
    id: 7,
    sender: "보안 시스템",
    title: "로그인 알림",
    time: "2일 전",
    content:
      "새로운 기기에서 로그인이 감지되었습니다. 본인이 아닐 경우 관리자에게 문의하세요.",
    read: true,
    status: "danger",
  },
  {
    id: 8,
    sender: "최수진",
    title: "설문조사 요청",
    time: "3일 전",
    content:
      "사용자 경험 개선을 위한 설문조사에 참여해주세요. 5분이면 충분합니다.",
    read: true,
    status: "info",
  },
  {
    id: 9,
    sender: "시스템",
    title: "백업 완료",
    time: "4일 전",
    content: "시스템 데이터 백업이 성공적으로 완료되었습니다.",
    read: true,
    status: "success",
  },
  {
    id: 10,
    sender: "박서버",
    title: "API 업데이트",
    time: "1주일 전",
    content: "인증 API가 업데이트되었습니다. 개발 가이드를 확인해주세요.",
    read: true,
    status: "warning",
  },
]);

// 알림 삭제 함수
const deleteNotification = (id) => {
  notifications.value = notifications.value.filter(
    (notification) => notification.id !== id
  );
};

// 현재 경로에 맞는 탭 메뉴 결정
const currentTabMenu = computed(() => {
  // 경로 기반으로 섹션 결정
  if (
    route.path === "/task" ||
    route.path.startsWith("/task/collaboration") ||
    route.path.startsWith("/task/collaboration/board") ||
    route.path.startsWith("/task/timeline") ||
    route.path.startsWith("/task/summary")
  ) {
    hasLink.value = true;
    hasLinkIcon.value = "icon icon-youtube icon-lg";
    return tabMenus.tasks;
  } else if (route.path.startsWith("/projects")) {
    return tabMenus.projects;
  } else {
    // 해당하는 탭 메뉴가 없으면 빈 배열 반환
    hasLink.value = false;
    hasLinkIcon.value = "";
    return tabMenus.default;
  }
});

// 현재 경로 기준 활성 탭 확인 함수
const isActive = (path) => {
  // 정확히 일치하거나 하위 경로일 경우 활성화
  return route.path === path;
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
  padding: 0 9px;
  height: 100%;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  margin-right: 5px;

  .title-area {
    display: flex;
    align-items: center;
  }

  .title {
    margin: 0 14px;
    font-size: $font-size-xxl;
    font-weight: 700;
  }
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
  font-weight: 500;
  position: relative;
  transition: color 0.2s;
}

.tab:hover {
  color: #333;
}

.tab.active {
  color: $primary-color;
  font-weight: 800;
}

.tab.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: $primary-color;
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
  background-color: #e8e8e8;
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
  font-size: $font-size-xs;
  color: $text-color;
  padding: 0 8px;

  &__item {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 12px;
    gap: 8px;
  }

  &__time {
    flex: 1;
    border-right: 1px solid $border-color;
    padding-right: 12px;
    display: flex;
    align-items: center;
  }

  &__action {
    justify-content: center;
    flex: 1;
    cursor: pointer;
    transition: background-color 0.2s ease;
    display: flex;
    align-items: center;
  }

  &__icon {
    display: flex;
    align-items: center;
    margin-right: 6px;
    color: $icon-color;
  }

  &__text {
    font-weight: 400;
  }

  &__time-text {
    letter-spacing: 0.5px;
  }

  &__action-text {
    font-weight: 500;
  }
}

.notifications-container {
  overflow-y: auto;

  .notification-card {
    padding: 12px;
    background-color: #fff;
    border-bottom: 1px solid #e8e8e8;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f8f8f8;
    }

    .notification-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;

      .notification-sender {
        display: flex;
        align-items: center;
        gap: 6px;

        .sender-icon {
          color: #666;
        }

        .sender-name {
          font-weight: 700;
          font-size: $font-size-md;
          color: #333;
        }
      }

      .notification-time {
        font-size: 12px;
        color: #999;
      }
    }

    .notification-title {
      font-size: $font-size-md;
      font-weight: 700;
      color: #333;
      margin-bottom: 8px;
      &.notification-status-info {
        color: #3498db;
      }

      &.notification-status-success {
        color: #34a853;
        font-weight: 600;
      }

      &.notification-status-warning {
        color: #f39c12;
        font-weight: 600;
      }
    }

    .notification-content {
      font-size: $font-size-sm;
      color: $text-color;
      margin-bottom: 8px;
      font-weight: 500;
      line-height: 1.4;
    }

    .notification-actions {
      display: flex;
      justify-content: flex-end;
      gap: 4px;
    }
  }

  .no-notifications {
    padding: 24px;
    text-align: center;
    color: #999;
    font-size: $font-size-sm;
  }
}
// 전체메뉴
.full-menu-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  overflow-x: auto;
  max-width: 100%;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    min-width: 800px; // 최소 너비 설정
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    min-width: 500px; // 최소 너비 설정
  }
}

.menu-section {
  display: flex;
  flex-direction: column;
  padding: 12px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  min-width: 180px; // 최소 너비 설정

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  }

  .flex.align-center.gap-5 {
    margin-bottom: 10px;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 5px;
  }
  .menu-section-title {
    font-size: $font-size-md;
    font-weight: 600;
    color: #333;
    display: flex;
    align-items: center;

    .title-icon {
      margin-right: 8px;
      color: #3b82f6;
    }
  }

  .menu-items-grid {
    display: grid;
    grid-template-columns: 1fr;
  }

  .menu-item {
    padding: 3px;
    border-radius: 6px;
    text-decoration: none;
    transition: all 0.2s;
    display: flex;
    align-items: center;

    &:hover {
      background-color: #f0f7ff;
      color: #2563eb;
    }

    .menu-item-icon {
      margin-right: 8px;
      color: #6b7280;
    }

    .menu-item-name {
      font-size: $font-size-sm;
      color: #4b5563;
      font-weight: 500;
      &::before {
        content: "· ";
        font-size: 16px;
        color: #6b7280;
        margin-right: 4px;
      }
    }
  }
}

.submenu-grid {
  margin-top: 12px;
}

.submenu-section {
  display: flex;
  flex-direction: column;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  background-color: #f9fafb;

  .submenu-section-title {
    font-size: $font-size-sm;
    font-weight: 500;
    color: #4b5563;
    margin: 4px 0 8px;
    display: flex;
    align-items: center;

    .title-icon {
      margin-right: 6px;
      color: #6b7280;
    }
  }
  .submenu-items-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    
    & > :last-child:nth-child(odd) {
      grid-column: 1 / -1; // 홀수 개수일 때 마지막 항목만 전체 너비를 차지하도록 설정
    }
  }

  .submenu-item {
    padding: 4px 0px;
    border-radius: 4px;
    text-decoration: none;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    word-break: keep-all;

    &:hover {
      background-color: #e0edff;
      color: #2563eb;
    }

    .submenu-item-icon {
      margin-right: 6px;
      color: #6b7280;
    }

    .submenu-item-name {
      font-size: 13px;
      color: #4b5563;
      &::before {
        content: "· ";
        font-size: 14px;
        color: #6b7280;
        margin-right: 3px;
      }
    }
  }
}

:deep(.ui-form-item__content) {
  display: flex;
  justify-content: flex-end;
}
:deep(.filter-footer) {
  padding: 4px 16px;
}
:deep(.ui-button--medium) {
  height: 36px;
}
:deep(.ui-form-layout .ui-button .iconify) {
  animation: moveRight 1.7s ease-in-out infinite;
}
.ui-popup__title span {
  font-size: smaller;
  color: #666;
}
</style>
