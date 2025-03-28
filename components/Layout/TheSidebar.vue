<template>
  <aside class="sidebar" @mouseleave="closeAllMenus">
    <div class="sidebar-container">
      <!-- 사이드바 메뉴 목록 -->
      <ul class="menu-list">
        <template v-for="(section, index) in menuSections" :key="index">
          <li
            class="menu-item"
            :class="{
              'has-submenu':
                section.items.length > 0 ||
                (section.submenus && section.submenus.length > 0),
            }"
          >
            <!-- 메인 메뉴 아이템 -->
            <div class="menu-link" @click="toggleSubmenu(index)">
              <div class="menu-icon">
                <Icon :name="section.icon" size="24" />
              </div>
              <div class="menu-text">{{ section.title }}</div>
              <div
                class="menu-arrow"
                v-if="
                  section.items.length > 0 ||
                  (section.submenus && section.submenus.length > 0)
                "
              >
                <Icon
                  :name="
                    section.expanded
                      ? 'heroicons:chevron-up'
                      : 'heroicons:chevron-down'
                  "
                  size="16"
                />
              </div>
            </div>

            <!-- 1단계 서브메뉴 - 직접 메뉴 아이템 -->
            <ul
              v-if="section.expanded && section.items.length > 0"
              class="submenu"
            >
              <li
                v-for="(item, itemIndex) in section.items"
                :key="itemIndex"
                class="submenu-item"
              >
                <NuxtLink :to="item.path" class="submenu-link">
                  <span class="submenu-bullet">•</span>
                  <div class="menu-text">{{ item.name }}</div>
                </NuxtLink>
              </li>
            </ul>

            <!-- 2단계 서브메뉴 - 서브메뉴 섹션 -->
            <div
              v-if="
                section.expanded &&
                section.submenus &&
                section.submenus.length > 0
              "
              class="submenu-sections"
            >
              <div
                v-for="(submenu, submenuIndex) in section.submenus"
                :key="submenuIndex"
                class="submenu-section"
              >
                <div class="submenu-section-title">
                  <span class="section-indicator">›</span>
                  {{ submenu.title }}
                </div>
                <ul class="nested-submenu">
                  <li
                    v-for="(submenuItem, submenuItemIndex) in submenu.items"
                    :key="submenuItemIndex"
                    class="nested-submenu-item"
                  >
                    <NuxtLink
                      :to="submenuItem.path"
                      class="nested-submenu-link"
                    >
                      <span class="nested-submenu-bullet">·</span>
                      <div class="menu-text">{{ submenuItem.name }}</div>
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </aside>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// 메뉴 섹션 정의
const menuSections = reactive([
  {
    title: "대시보드",
    icon: "mdi:view-dashboard",
    expanded: false,
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
    expanded: false,
    items: [
      {
        name: "업무/협업",
        path: "/task",
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
    submenus: [],
  },
  {
    title: "PMS",
    icon: "mdi:chart-timeline-variant",
    expanded: false,
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
    expanded: false,
    items: [
      { name: "KPI", path: "/performance/kpi", icon: "mdi:target" },
      {
        name: "개인개발계획",
        path: "/performance/development",
        icon: "mdi:account-cog-outline",
      },
      { name: "OKR", path: "/performance/okr", icon: "mdi:bullseye-arrow" },
    ],
    submenus: [],
  },
  {
    title: "조직성과",
    icon: "mdi:domain",
    expanded: false,
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
    expanded: false,
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
    submenus: [],
  },
  {
    title: "인사평가",
    icon: "mdi:account-check",
    expanded: false,
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
    expanded: false,
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
    expanded: false,
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
    expanded: false,
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
    expanded: false,
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
    expanded: false,
    items: [
      {
        name: "문의하기",
        path: "/support/inquiry",
        icon: "mdi:message-question-outline",
      },
    ],
    submenus: [],
  },
  {
    title: "가이드",
    icon: "mdi:book-open-outline",
    expanded: false,
    items: [
      {
        name: "기능 가이드",
        path: "/guide",
        icon: "mdi:information-outline",
      },
    ],
    submenus: [],
  },
]);

// 메뉴 토글 함수
const toggleSubmenu = (index) => {
  menuSections[index].expanded = !menuSections[index].expanded;
};

const toggleNestedSubmenu = (parentIndex, childIndex) => {
  menuSections[parentIndex].children[childIndex].expanded =
    !menuSections[parentIndex].children[childIndex].expanded;
};

const closeAllMenus = () => {
  menuSections.forEach((section) => {
    section.expanded = false;
    if (section.children) {
      section.children.forEach((child) => {
        if (child.children) {
          child.expanded = false;
        }
      });
    }
  });
};

// 현재 경로에 따라 활성화된 메뉴 자동 확장
const initActiveMenu = () => {
  const currentPath = route.path;

  menuSections.forEach((section, index) => {
    // 메인 아이템 확인
    const mainItemMatch =
      section.items &&
      section.items.some((item) => currentPath.startsWith(item.path));

    // 서브메뉴 아이템 확인
    const submenuItemMatch =
      section.submenus &&
      section.submenus.some((submenu) =>
        submenu.items.some((item) => currentPath.startsWith(item.path))
      );

    if (mainItemMatch || submenuItemMatch) {
      section.expanded = true;
    }
  });
};

// 컴포넌트 마운트 시 활성 메뉴 초기화
onMounted(() => {
  initActiveMenu();
});
</script>

<style lang="scss" scoped>
.sidebar {
  margin-top: 72px;
  width: 60px;
  height: 100vh;
  background-color: #ffff;
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;
  transition: width 0.3s;
  overflow: hidden;
  border-right: 1px solid #aaa;
}

.sidebar:hover {
  width: 240px;
  overflow-y: auto;
}

.sidebar-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #fff;
}

.menu-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.menu-item {
  width: 100%;
  margin-bottom: 4px;
  border-bottom: 1px solid #fff;
}

.menu-link {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  text-decoration: none;
  color: $text-color;
  white-space: nowrap;
  transition: all 0.2s;
  border-left: 2px solid #fff;
  cursor: pointer;
}

.menu-link:hover {
  background-color: #4a5568;
  color: white;
  span {
    background: #fff;
  }
}

.menu-icon {
  min-width: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
}

.menu-text {
  flex: 1;
  font-size: 14px;
}

.menu-arrow {
  margin-left: 8px;
}

.submenu {
  list-style-type: none;
  padding: 0;
  margin: 0 0 0 40px;
  overflow: hidden;
}

.submenu-item {
  margin-bottom: 4px;
}

.submenu-link {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  text-decoration: none;
  color: $text-color;
  white-space: nowrap;
  transition: all 0.2s;
  border-radius: 4px;
  position: relative;
}

.submenu-bullet {
  display: inline-block;
  margin-right: 8px;
  font-size: 18px;
  color: $primary-color;
  line-height: 1;
}

.submenu-link:hover {
  background-color: rgba($primary-color, 0.1);
  color: $primary-color;
  
  .submenu-bullet {
    color: $primary-color;
  }
}

.submenu-link.router-link-active {
  background-color: rgba($primary-color, 0.1);
  color: $primary-color;
  font-weight: 500;
  
  .submenu-bullet {
    color: $primary-color;
  }
}

.submenu-sections {
  margin-left: 40px;
  margin-top: 8px;
  margin-bottom: 8px;
}

.submenu-section {
  margin-bottom: 12px;
}

.submenu-section-title {
  font-size: 13px;
  font-weight: 600;
  color: $text-color;
  padding: 4px 16px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.section-indicator {
  color: $primary-color;
  margin-right: 6px;
  font-size: 16px;
  font-weight: bold;
}

.nested-submenu {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.nested-submenu-item {
  margin-bottom: 2px;
}

.nested-submenu-link {
  display: flex;
  align-items: center;
  padding: 6px 16px 6px 24px;
  text-decoration: none;
  color: $text-color;
  white-space: nowrap;
  transition: all 0.2s;
  border-radius: 4px;
  font-size: 13px;
  position: relative;
}

.nested-submenu-bullet {
  display: inline-block;
  margin-right: 8px;
  color: #666;
  font-size: 16px;
  line-height: 1;
}

.nested-submenu-link:hover {
  background-color: rgba($primary-color, 0.1);
  color: $primary-color;
  
  .nested-submenu-bullet {
    color: $primary-color;
  }
}

.nested-submenu-link.router-link-active {
  background-color: rgba($primary-color, 0.1);
  color: $primary-color;
  font-weight: 500;
  
  .nested-submenu-bullet {
    color: $primary-color;
  }
}
</style>
