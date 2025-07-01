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
                section.items.length > 0 || (section.submenus && section.submenus.length > 0),
              'active-menu': activeIndex === index
            }"
            @mouseenter="hoverMenu(index)"
            @mouseleave="hoveringIndex = null"
            @click="clickMenu(index)"
          >
            <!-- 메인 메뉴 아이템 -->
            <div class="menu-link" :class="{ active: activeIndex === index }">
              <div class="menu-icon-container">
                <div class="menu-icon">
                  <img
                    :src="
                      hoveringIndex === index || activeIndex === index
                        ? `/ispark-sgate/images/${section.icon}-hover.svg`
                        : `/ispark-sgate/images/${section.icon}.svg`
                    "
                    alt="icon"
                  />
                </div>
                <div class="menu-text">{{ section.title }}</div>
              </div>
            </div>

            <!-- 통합 서브메뉴 섹션 - 수정: 호버링 상태도 함께 체크 -->
            <div
              v-show="hoveringIndex === index || (isExpanded && activeIndex === index)"
              class="submenu-sections"
              :class="{ 'pinned-submenu': isExpanded && index === activeIndex }"
            >
              <!-- 핀 버튼을 서브메뉴 우측 상단에 배치 -->
              <div class="pin-button-container">
                <button
                  class="pin-button"
                  :class="{ pinned: isExpanded }"
                  @click.stop="togglePinned"
                  title="사이드바 고정"
                >
                  <i v-if="!isExpanded" class="icon-md icon-pin"></i>
                  <i v-else class="icon-md icon-pin-pinned"></i>
                </button>
              </div>

              <!-- 직접 메뉴 아이템 -->
              <div v-if="section.items.length > 0" class="submenu-section">
                <div class="submenu-section-title">
                  <span class="section-indicator">›</span>
                  {{ section.title }}
                </div>
                <ul class="nested-submenu">
                  <li
                    v-for="(item, itemIndex) in section.items"
                    :key="itemIndex"
                    class="nested-submenu-item"
                  >
                    <NuxtLink :to="item.path" class="nested-submenu-link">
                      <span class="nested-submenu-bullet">•</span>
                      <div class="menu-text">{{ item.name }}</div>
                    </NuxtLink>
                  </li>
                </ul>
              </div>

              <!-- 기존 서브메뉴 섹션 -->
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
                    <NuxtLink :to="submenuItem.path" class="nested-submenu-link">
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
  import { ref, reactive, onMounted, inject, watch } from 'vue'
  import { useRoute } from 'vue-router'

  const emit = defineEmits(['toggle-expanded'])

  const route = useRoute()

  // 활성화된 메뉴 인덱스 추적
  const activeIndex = ref(null)
  // 호버 상태 추적
  const hoveringIndex = ref(null)

  // 레이아웃에서 확장 상태 공유
  const isExpanded = inject('isExpanded', ref(false))

  // 메뉴 호버 함수 - 핀 고정 상태와 관계없이 항상 호버 효과 활성화
  function hoverMenu(index) {
    hoveringIndex.value = index
  }

  // 메뉴 클릭 함수
  function clickMenu(index) {
    // 활성화된 메뉴 인덱스 설정
    activeIndex.value = index
  }

  // 핀 토글 함수 - 사이드바 전체 확장 상태만 토글
  function togglePinned() {
    // 확장 상태 토글
    isExpanded.value = !isExpanded.value

    // localStorage에 확장 상태 저장
    if (isExpanded.value) {
      localStorage.setItem('sidebarExpanded', 'true')
    } else {
      localStorage.removeItem('sidebarExpanded')
    }

    emit('toggle-expanded')
  }

  // 현재 경로에 따라 활성화된 메뉴 자동 설정
  const initActiveMenu = () => {
    const currentPath = route.path

    menuSections.forEach((section, index) => {
      // 메인 아이템 확인
      const mainItemMatch =
        section.items && section.items.some(item => currentPath.startsWith(item.path))

      // 서브메뉴 아이템 확인
      const submenuItemMatch =
        section.submenus &&
        section.submenus.some(submenu =>
          submenu.items.some(item => currentPath.startsWith(item.path))
        )

      if (mainItemMatch || submenuItemMatch) {
        activeIndex.value = index
      }
    })
  }

  // 라우트 변경 감지
  watch(
    () => route.path,
    () => {
      // 활성 메뉴 업데이트
      initActiveMenu()
    }
  )

  // 컴포넌트 마운트 시 초기화
  onMounted(() => {
    // 활성 메뉴 초기화
    initActiveMenu()

    // localStorage에서 확장 상태 불러오기
    const savedExpanded = localStorage.getItem('sidebarExpanded')
    if (savedExpanded === 'true') {
      isExpanded.value = true
    }
  })

  // 모든 메뉴 닫기 함수 - 핀 고정 상태와 관계없이 호버링 상태만 초기화
  const closeAllMenus = () => {
    hoveringIndex.value = null
  }

  // 메뉴 섹션 정의
  const menuSections = reactive([
    {
      title: '대시보드',
      icon: 'dashboard-icon',
      expanded: false,
      items: [
        {
          name: '개인대시보드',
          path: '/dashboard/personal',
          icon: 'mdi:account-circle'
        },
        {
          name: '개인타임라인',
          path: '/dashboard/timeline',
          icon: 'mdi:timeline'
        },
        {
          name: '매니저대시보드',
          path: '/dashboard/manager',
          icon: 'mdi:account-supervisor'
        },
        {
          name: 'Total Align',
          path: '/dashboard/total-align',
          icon: 'mdi:align-horizontal-left'
        }
      ],
      submenus: [
        {
          title: '고객사 사용현황',
          items: [
            {
              name: '일반 사용현황',
              path: '/dashboard/usage/general',
              icon: 'mdi:chart-bar'
            },
            {
              name: '모듈별 사용현황',
              path: '/dashboard/usage/module',
              icon: 'mdi:chart-pie'
            }
          ]
        },
        {
          title: '리포트',
          items: [
            {
              name: '개인별 평가종합 리포트',
              path: '/dashboard/evaluation-report',
              icon: 'mdi:file-document'
            }
          ]
        }
      ]
    },
    {
      title: '업무',
      icon: 'briefcase-icon',
      expanded: false,
      items: [
        {
          name: '업무/협업',
          path: '/task/home',
          icon: 'mdi:account-group'
        },
        {
          name: '일일/주간보고',
          path: '/task/reports/create',
          icon: 'mdi:file-document-outline'
        },
        {
          name: '업무 인수인계',
          path: '/task/handover',
          icon: 'mdi:swap-horizontal'
        }
      ],
      submenus: []
    },
    {
      title: 'PMS',
      icon: 'chart-icon',
      expanded: false,
      items: [],
      submenus: [
        {
          title: '설정',
          items: [
            {
              name: '기본설정',
              path: '/pms/settings/basic',
              icon: 'mdi:cog-outline'
            },
            {
              name: '표준템플릿',
              path: '/pms/settings/template',
              icon: 'mdi:file-outline'
            }
          ]
        },
        {
          title: '프로젝트',
          items: [
            {
              name: 'My Project',
              path: '/pms/my-project',
              icon: 'mdi:folder-outline'
            }
          ]
        },
        {
          title: '현황조회',
          items: [
            {
              name: '전체진행현황',
              path: '/pms/status/overall',
              icon: 'mdi:chart-box-outline'
            },
            {
              name: '부서별현황',
              path: '/pms/status/department',
              icon: 'mdi:account-group-outline'
            },
            {
              name: '이슈현황',
              path: '/pms/status/issues',
              icon: 'mdi:alert-circle-outline'
            }
          ]
        }
      ]
    },
    {
      title: '개인성과',
      icon: 'account-star-icon',
      expanded: false,
      items: [
        { name: 'KPI', path: '/performance/kpi', icon: 'mdi:target' },
        {
          name: '개인개발계획',
          path: '/performance/development',
          icon: 'mdi:account-cog-outline'
        },
        { name: 'OKR', path: '/performance/okr', icon: 'mdi:bullseye-arrow' }
      ],
      submenus: []
    },
    {
      title: '조직성과',
      icon: 'domain-icon',
      expanded: false,
      items: [
        {
          name: '부서KPI관리',
          path: '/org-performance/department-kpi',
          icon: 'mdi:office-building-outline'
        },
        {
          name: '목표/실적관리',
          path: '/org-performance/goals',
          icon: 'mdi:flag-outline'
        },
        {
          name: '진행현황',
          path: '/org-performance/progress',
          icon: 'mdi:progress-check'
        }
      ],
      submenus: [
        {
          title: '모니터링',
          items: [
            {
              name: '조직성과도',
              path: '/org-performance/dashboard',
              icon: 'mdi:chart-areaspline'
            },
            {
              name: 'KPI연계도',
              path: '/org-performance/kpi-link',
              icon: 'mdi:link-variant'
            },
            {
              name: '조직성과요약',
              path: '/org-performance/summary',
              icon: 'mdi:file-chart-outline'
            },
            {
              name: '조직성과상세',
              path: '/org-performance/detail',
              icon: 'mdi:file-document-outline'
            },
            {
              name: '부진사유/대책',
              path: '/org-performance/measures',
              icon: 'mdi:alert-outline'
            },
            {
              name: '평가군비교',
              path: '/org-performance/comparison',
              icon: 'mdi:compare'
            },
            {
              name: '연계KPI비교',
              path: '/org-performance/kpi-comparison',
              icon: 'mdi:compare-horizontal'
            }
          ]
        }
      ]
    },
    {
      title: '조직평가',
      icon: 'account-group-icon',
      expanded: false,
      items: [
        {
          name: '조직평가설정',
          path: '/org-evaluation/settings',
          icon: 'mdi:cog-outline'
        },
        {
          name: '평가자평가',
          path: '/org-evaluation/evaluator',
          icon: 'mdi:account-check-outline'
        },
        {
          name: '평가조정',
          path: '/org-evaluation/adjustment',
          icon: 'mdi:tune-vertical'
        },
        {
          name: '진행현황',
          path: '/org-evaluation/progress',
          icon: 'mdi:progress-check'
        },
        {
          name: '평가결과산출',
          path: '/org-evaluation/results',
          icon: 'mdi:calculator-variant-outline'
        },
        {
          name: '최종결과조회',
          path: '/org-evaluation/final-results',
          icon: 'mdi:file-document-outline'
        },
        {
          name: '기타평가항목 설정',
          path: '/org-evaluation/other-settings',
          icon: 'mdi:cog-outline'
        }
      ],
      submenus: []
    },
    {
      title: '인사평가',
      icon: 'account-check-icon',
      expanded: false,
      items: [],
      submenus: [
        {
          title: '평가설정',
          items: [
            {
              name: '평가기본항목관리',
              path: '/hr-evaluation/basic-items',
              icon: 'mdi:format-list-bulleted'
            },
            {
              name: '인사평가설정',
              path: '/hr-evaluation/settings',
              icon: 'mdi:cog-outline'
            },
            {
              name: '평가대상확인(부서장)',
              path: '/hr-evaluation/targets',
              icon: 'mdi:account-supervisor-outline'
            }
          ]
        },
        {
          title: '기술서작성',
          items: [
            {
              name: '업무기술서 템플릿',
              path: '/hr-evaluation/job-template',
              icon: 'mdi:file-outline'
            },
            {
              name: '업무기술서',
              path: '/hr-evaluation/job-description',
              icon: 'mdi:file-document-outline'
            },
            {
              name: '성과기술서템플릿',
              path: '/hr-evaluation/performance-template',
              icon: 'mdi:file-outline'
            },
            {
              name: '성과기술서 작성',
              path: '/hr-evaluation/performance-description',
              icon: 'mdi:file-edit-outline'
            },
            {
              name: '기술서 작성현황',
              path: '/hr-evaluation/performance-description-status',
              icon: 'mdi:file-edit-outline'
            }
          ]
        },
        {
          title: '평가하기',
          items: [
            {
              name: '평가하기',
              path: '/hr-evaluation/evaluate',
              icon: 'mdi:clipboard-check-outline'
            }
          ]
        },
        {
          title: '평가진행현황',
          items: [
            {
              name: '평가진행현황',
              path: '/hr-evaluation/progress',
              icon: 'mdi:progress-check'
            }
          ]
        },
        {
          title: '평가산출',
          items: [
            {
              name: '인사평가산출',
              path: '/hr-evaluation/calculation',
              icon: 'mdi:calculator-variant-outline'
            },
            {
              name: '조직점수산출',
              path: '/hr-evaluation/org-calculation',
              icon: 'mdi:calculator-variant-outline'
            },
            {
              name: '평가종합산출',
              path: '/hr-evaluation/other-items',
              icon: 'mdi:calculator-variant-outline'
            }
          ]
        },
        {
          title: '조정평가',
          items: [
            {
              name: '조정평가',
              path: '/hr-evaluation/adjustment',
              icon: 'mdi:tune-vertical'
            }
          ]
        },
        {
          title: '내평가결과',
          items: [
            {
              name: '내평가결과',
              path: '/hr-evaluation/my-results',
              icon: 'mdi:account-details-outline'
            }
          ]
        },
        {
          title: '평가결과',
          items: [
            {
              name: '평가결과조회',
              path: '/hr-evaluation/results',
              icon: 'mdi:file-search-outline'
            },
            {
              name: '평가종합결과조회',
              path: '/hr-evaluation/total-results',
              icon: 'mdi:file-search-outline'
            },
            {
              name: '평가레포트',
              path: '/hr-evaluation/report',
              icon: 'mdi:file-chart-outline'
            }
          ]
        },
        {
          title: '평가정합성 진단',
          items: [
            {
              name: '평가정합성 진단',
              path: '/hr-evaluation/diagnosis',
              icon: 'mdi:stethoscope'
            }
          ]
        },
        {
          title: '이의신청관리',
          items: [
            {
              name: '이의신청관리',
              path: '/hr-evaluation/objections',
              icon: 'mdi:hand-back-right-outline'
            }
          ]
        }
      ]
    },
    {
      title: '온보딩',
      icon: 'account-plus-icon',
      expanded: false,
      items: [
        {
          name: 'Welcome Aboard',
          path: '/onboarding/welcome',
          icon: 'mdi:hand-wave'
        },
        {
          name: 'Support Board',
          path: '/onboarding/support',
          icon: 'mdi:lifebuoy'
        },
        {
          name: '기본설정',
          path: '/onboarding/settings',
          icon: 'mdi:cog-outline'
        }
      ],
      submenus: [
        {
          title: '온보딩관리',
          items: [
            {
              name: '입사환영 메일',
              path: '/onboarding/welcome-mail',
              icon: 'mdi:email-outline'
            },
            {
              name: 'FAQ',
              path: '/onboarding/faq',
              icon: 'mdi:frequently-asked-questions'
            },
            {
              name: '물품/교육자료',
              path: '/onboarding/materials',
              icon: 'mdi:bookshelf'
            },
            {
              name: '피드백항목',
              path: '/onboarding/feedback-items',
              icon: 'mdi:message-text-outline'
            },
            {
              name: '활동 및 일정',
              path: '/onboarding/activities',
              icon: 'mdi:calendar-outline'
            },
            {
              name: '온보딩대상자',
              path: '/onboarding/targets',
              icon: 'mdi:account-outline'
            },
            {
              name: 'Aboard 광고',
              path: '/onboarding/ads',
              icon: 'mdi:advertisement'
            },
            {
              name: '온보딩현황',
              path: '/onboarding/status',
              icon: 'mdi:chart-box-outline'
            },
            {
              name: '피드백 결과 조회',
              path: '/onboarding/feedback-results',
              icon: 'mdi:message-text-outline'
            }
          ]
        }
      ]
    },
    {
      title: '인사관리',
      icon: 'account-cog-icon',
      expanded: false,
      items: [
        {
          name: '경력관리',
          path: '/hr-management/career',
          icon: 'mdi:briefcase-outline'
        },
        {
          name: '연봉관리',
          path: '/hr-management/salary',
          icon: 'mdi:cash-multiple'
        }
      ],
      submenus: [
        {
          title: '모니터링',
          items: [
            {
              name: '직원조회',
              path: '/hr-management/employees',
              icon: 'mdi:account-search-outline'
            },
            {
              name: '직원상세조회',
              path: '/hr-management/employee-details',
              icon: 'mdi:account-details-outline'
            }
          ]
        },
        {
          title: '기본정보관리',
          items: [
            {
              name: '내정보',
              path: '/hr-management/my-info',
              icon: 'mdi:account-outline'
            },
            {
              name: '조직관리',
              path: '/hr-management/organization',
              icon: 'mdi:sitemap'
            },
            {
              name: '직원관리',
              path: '/hr-management/employee-management',
              icon: 'mdi:account-multiple-outline'
            }
          ]
        }
      ]
    },
    {
      title: '가이드',
      icon: 'book-open-icon',
      expanded: false,
      items: [
        {
          name: '기능 가이드',
          path: '/guide',
          icon: 'mdi:information-outline'
        }
      ],
      submenus: []
    }
  ])
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/sidebar.scss';
</style>
