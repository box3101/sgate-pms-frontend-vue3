<template>
  <div class="guide-container">
    <h1 class="guide-title">SGATE 퍼블리싱 가이드</h1>
    <div class="guide-content">
      <div class="guide-row">
        <!-- 업무 체크리스트 섹션 -->
        <div class="guide-column">
          <div class="guide-table task-check-section">
            <h2>내 업무 체크리스트</h2>
            <div class="task-list">
              <!-- 업무 카테고리 -->
              <div
                v-for="(category, catIndex) in taskCategories"
                :key="'cat-' + catIndex"
                class="task-category"
              >
                <div class="category-header" @click="toggleCategory(catIndex)">
                  <div class="category-icon">
                    <Icon
                      :name="category.expanded ? 'mdi:chevron-down' : 'mdi:chevron-right'"
                      size="18"
                    />
                  </div>
                  <h3 class="category-title">{{ category.title }}</h3>
                  <span class="task-count"
                    >{{ getCompletedTaskCount(category.tasks) }}/{{ category.tasks.length }}</span
                  >
                </div>

                <!-- 카테고리 내 업무 목록 -->
                <div v-if="category.expanded" class="category-tasks">
                  <div
                    v-for="(task, taskIndex) in category.tasks"
                    :key="'task-' + catIndex + '-' + taskIndex"
                    class="task-item"
                  >
                    <input
                      type="checkbox"
                      :id="'task-' + catIndex + '-' + taskIndex"
                      v-model="task.completed"
                      @change="saveTaskState"
                    />
                    <label :for="'task-' + catIndex + '-' + taskIndex">{{ task.title }}</label>
                    <div class="task-actions">
                      <button
                        class="delete-btn"
                        @click.stop="deleteTask(catIndex, taskIndex)"
                        title="삭제"
                      >
                        <Icon name="mdi:delete-outline" size="16" />
                      </button>
                    </div>
                  </div>

                  <!-- 하위 업무 그룹 -->
                  <div
                    v-for="(subgroup, subIndex) in category.subgroups"
                    :key="'sub-' + catIndex + '-' + subIndex"
                    class="task-subgroup"
                  >
                    <div class="subgroup-header" @click="toggleSubgroup(catIndex, subIndex)">
                      <div class="subgroup-icon">
                        <Icon
                          :name="subgroup.expanded ? 'mdi:chevron-down' : 'mdi:chevron-right'"
                          size="16"
                        />
                      </div>
                      <h4 class="subgroup-title">{{ subgroup.title }}</h4>
                      <span class="task-count"
                        >{{ getCompletedTaskCount(subgroup.tasks) }}/{{
                          subgroup.tasks.length
                        }}</span
                      >
                    </div>

                    <!-- 하위 그룹 내 업무 목록 -->
                    <div v-if="subgroup.expanded" class="subgroup-tasks">
                      <div
                        v-for="(subtask, subtaskIndex) in subgroup.tasks"
                        :key="'subtask-' + catIndex + '-' + subIndex + '-' + subtaskIndex"
                        class="subtask-item"
                      >
                        <input
                          type="checkbox"
                          :id="'subtask-' + catIndex + '-' + subIndex + '-' + subtaskIndex"
                          v-model="subtask.completed"
                          @change="saveTaskState"
                        />
                        <label :for="'subtask-' + catIndex + '-' + subIndex + '-' + subtaskIndex">{{
                          subtask.title
                        }}</label>
                        <div class="task-actions">
                          <button
                            class="delete-btn"
                            @click.stop="deleteSubtask(catIndex, subIndex, subtaskIndex)"
                            title="삭제"
                          >
                            <Icon name="mdi:delete-outline" size="16" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 새 업무 추가 -->
              <div class="add-task">
                <input
                  type="text"
                  v-model="newTask"
                  placeholder="새 업무 추가"
                  @keyup.enter="addTask"
                />
                <select v-model="selectedCategory" class="category-select">
                  <option v-for="(category, index) in taskCategories" :key="index" :value="index">
                    {{ category.title }}
                  </option>
                </select>
                <button @click="addTask" class="add-btn">추가</button>
              </div>
            </div>
          </div>
        </div>

        <!-- UI 컴포넌트 섹션 -->
        <div class="guide-column">
          <div class="guide-table component-section">
            <h2>UI 컴포넌트</h2>
            <p class="section-description">
              SGATE에서 사용되는 UI 컴포넌트 목록입니다. 각 컴포넌트를 클릭하면 상세 페이지로
              이동합니다.
            </p>

            <div class="component-grid">
              <NuxtLink to="/components/Button" class="component-card">
                <div class="component-icon">
                  <Icon name="mdi:button-cursor" size="24" />
                </div>
                <div class="component-info">
                  <h3 class="component-title">버튼</h3>
                  <p class="component-desc">다양한 스타일과 크기의 버튼 컴포넌트</p>
                </div>
              </NuxtLink>

              <NuxtLink to="/components/Input" class="component-card">
                <div class="component-icon">
                  <Icon name="mdi:form-textbox" size="24" />
                </div>
                <div class="component-info">
                  <h3 class="component-title">인풋</h3>
                  <p class="component-desc">텍스트 입력을 위한 인풋 컴포넌트</p>
                </div>
              </NuxtLink>

              <NuxtLink to="/components/Select" class="component-card">
                <div class="component-icon">
                  <Icon name="mdi:form-dropdown" size="24" />
                </div>
                <div class="component-info">
                  <h3 class="component-title">셀렉트</h3>
                  <p class="component-desc">드롭다운 선택 컴포넌트</p>
                </div>
              </NuxtLink>

              <NuxtLink to="/components/Textarea" class="component-card">
                <div class="component-icon">
                  <Icon name="mdi:form-textarea" size="24" />
                </div>
                <div class="component-info">
                  <h3 class="component-title">텍스트영역</h3>
                  <p class="component-desc">여러 줄 텍스트 입력 컴포넌트</p>
                </div>
              </NuxtLink>

              <NuxtLink to="/components/DatePicker" class="component-card">
                <div class="component-icon">
                  <Icon name="mdi:calendar" size="24" />
                </div>
                <div class="component-info">
                  <h3 class="component-title">날짜 선택기</h3>
                  <p class="component-desc">날짜 및 기간 선택 컴포넌트</p>
                </div>
              </NuxtLink>

              <NuxtLink to="/components/Tooltip" class="component-card">
                <div class="component-icon">
                  <Icon name="mdi:tooltip-text" size="24" />
                </div>
                <div class="component-info">
                  <h3 class="component-title">툴팁</h3>
                  <p class="component-desc">마우스 오버 시 추가 정보를 제공하는 툴팁 컴포넌트</p>
                </div>
              </NuxtLink>

              <NuxtLink to="/components/Popup" class="component-card">
                <div class="component-icon">
                  <Icon name="mdi:window-maximize" size="24" />
                </div>
                <div class="component-info">
                  <h3 class="component-title">팝업</h3>
                  <p class="component-desc">모달 및 팝업 컴포넌트</p>
                </div>
              </NuxtLink>

              <NuxtLink to="/components/Checkbox" class="component-card">
                <div class="component-icon">
                  <Icon name="mdi:checkbox-marked" size="24" />
                </div>
                <div class="component-info">
                  <h3 class="component-title">체크박스</h3>
                  <p class="component-desc">선택/해제 입력 컴포넌트</p>
                </div>
              </NuxtLink>

              <NuxtLink to="/components/Radio" class="component-card">
                <div class="component-icon">
                  <Icon name="mdi:radio-button-checked" size="24" />
                </div>
                <div class="component-info">
                  <h3 class="component-title">라디오</h3>
                  <p class="component-desc">단일 선택 라디오 컴포넌트</p>
                </div>
              </NuxtLink>

              <NuxtLink to="/components/Accordion" class="component-card">
                <div class="component-icon">
                  <Icon name="mdi:chevron-down" size="24" />
                </div>
                <div class="component-info">
                  <h3 class="component-title">아코디언</h3>
                  <p class="component-desc">접었다 펼치는 아코디언 컴포넌트</p>
                </div>
              </NuxtLink>

              <NuxtLink to="/components/Layout" class="component-card">
                <div class="component-icon">
                  <Icon name="mdi:view-grid-plus" size="24" />
                </div>
                <div class="component-info">
                  <h3 class="component-title">레이아웃</h3>
                  <p class="component-desc">레이아웃 및 그리드 시스템</p>
                </div>
              </NuxtLink>

              <NuxtLink to="/components/Tag" class="component-card">
                <div class="component-icon">
                  <Icon name="mdi:tag" size="24" />
                </div>
                <div class="component-info">
                  <h3 class="component-title">태그</h3>
                  <p class="component-desc">라벨 및 태그 컴포넌트</p>
                </div>
              </NuxtLink>

              <NuxtLink to="/components/TableDefault" class="component-card">
                <div class="component-icon">
                  <Icon name="mdi:table" size="24" />
                </div>
                <div class="component-info">
                  <h3 class="component-title">기본 테이블</h3>
                  <p class="component-desc">데이터를 행과 열로 기본 표시하는 테이블 컴포넌트</p>
                </div>
              </NuxtLink>

              <NuxtLink to="/components/EditUiTable" class="component-card">
                <div class="component-icon">
                  <Icon name="mdi:table-edit" size="24" />
                </div>
                <div class="component-info">
                  <h3 class="component-title">편집 테이블</h3>
                  <p class="component-desc">데이터를 행과 열로 편집 가능한 테이블 컴포넌트</p>
                </div>
              </NuxtLink>

              <NuxtLink to="/components/Alert" class="component-card">
                <div class="component-icon">
                  <Icon name="mdi:alert" size="24" />
                </div>
                <div class="component-info">
                  <h3 class="component-title">알림</h3>
                  <p class="component-desc">사용자 알림 메시지 컴포넌트</p>
                </div>
              </NuxtLink>

              <NuxtLink to="/components/Confirm" class="component-card">
                <div class="component-icon">
                  <Icon name="mdi:help-circle" size="24" />
                </div>
                <div class="component-info">
                  <h3 class="component-title">확인</h3>
                  <p class="component-desc">사용자 확인 다이얼로그 컴포넌트</p>
                </div>
              </NuxtLink>

              <NuxtLink to="/components/MultiSelector" class="component-card">
                <div class="component-icon">
                  <Icon name="mdi:checkbox-multiple-marked" size="24" />
                </div>
                <div class="component-info">
                  <h3 class="component-title">멀티셀렉터</h3>
                  <p class="component-desc">여러 항목을 선택할 수 있는 멀티셀렉터 컴포넌트</p>
                </div>
              </NuxtLink>

              <NuxtLink to="/components/Switch" class="component-card">
                <div class="component-icon">
                  <Icon name="mdi:toggle-switch" size="24" />
                </div>
                <div class="component-info">
                  <h3 class="component-title">스위치</h3>
                  <p class="component-desc">ON/OFF 토글 스위치 컴포넌트</p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- 퍼블리싱 진척도 섹션 -->
        <div class="guide-column">
          <div class="guide-table">
            <h2>SGATE 퍼블리싱 진척도</h2>
            <div class="guide-categories">
              <!-- 1단계: 메인 카테고리 -->
              <div
                v-for="category in guideData.categories"
                :key="category.id"
                class="guide-category"
              >
                <div class="category-header" @click="toggleGuideCategory(category.id)">
                  <div class="category-icon">
                    <Icon
                      :name="
                        expandedCategories[category.id] ? 'mdi:chevron-down' : 'mdi:chevron-right'
                      "
                      size="20"
                    />
                  </div>
                  <h3>{{ category.title }}</h3>
                  <div class="status-badges">
                    <div class="status-badge" :style="getStatusBadgeStyle(category.status)">
                      {{ statusInfo[category.status].label }}
                    </div>
                    <div class="category-progress">
                      {{ calculateCategoryStatus(category).completed }}/{{
                        calculateCategoryStatus(category).total
                      }}
                    </div>
                  </div>
                </div>

                <!-- 2단계: 서브 카테고리 -->
                <div v-if="expandedCategories[category.id]" class="subcategories">
                  <div
                    v-for="subcategory in category.subcategories"
                    :key="subcategory.id"
                    class="subcategory"
                  >
                    <div
                      class="subcategory-header"
                      @click="toggleGuideSubcategory(category.id, subcategory.id)"
                    >
                      <div class="subcategory-icon">
                        <Icon
                          :name="
                            getSubcategoryExpandedState(category.id, subcategory.id)
                              ? 'mdi:chevron-down'
                              : 'mdi:chevron-right'
                          "
                          size="18"
                        />
                      </div>
                      <h4>{{ subcategory.title }}</h4>
                      <div class="status-badge" :style="getStatusBadgeStyle(subcategory.status)">
                        {{ statusInfo[subcategory.status].label }}
                      </div>
                    </div>

                    <!-- 3단계: 세부 항목 -->
                    <div
                      v-if="getSubcategoryExpandedState(category.id, subcategory.id)"
                      class="guide-items"
                    >
                      <a
                        v-for="item in subcategory.items"
                        :key="item.id"
                        :href="item.url"
                        class="guide-item"
                        target="_blank"
                      >
                        <div class="item-icon">
                          <Icon :name="item.icon" size="16" />
                        </div>
                        <div class="item-content">
                          <div class="item-title">{{ item.title }}</div>
                          <div class="item-description">{{ item.description }}</div>
                        </div>
                        <div class="item-status">
                          <div class="status-badge" :style="getStatusBadgeStyle(item.status)">
                            {{ statusInfo[item.status].label }}
                          </div>
                          <div class="item-action">
                            <Icon name="mdi:arrow-right" size="16" />
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, reactive } from 'vue'

  // 업무 체크리스트 데이터
  const taskCategories = ref([
    {
      title: '공통',
      expanded: true,
      tasks: [
        { title: '로그인 화면 완료', completed: true },
        { title: '사용자 필터 기능 완료', completed: true },
        { title: '사용자 알림 기능 완료', completed: true },
        { title: '사용자 전체메뉴 완료', completed: true }
      ],
      subgroups: []
    },
    {
      title: '모달',
      expanded: true,
      tasks: [
        { title: '비밀번호 찾기 모달 완료', completed: true },
        { title: '공지사항 모달 완료', completed: true },
        { title: '사용자 필터 모달 완료', completed: true },
        { title: '사용자 알림 모달 완료', completed: true },
        { title: '사용자 전체메뉴 모달 완료', completed: true },
        { title: '카드 추가 모달 완료', completed: true },
        { title: '담당자 선택 모달 완료', completed: true }
      ],
      subgroups: []
    },
    {
      title: '업무/협업',
      expanded: true,
      tasks: [{ title: '홈 화면 UX 변경 필요', completed: false }],
      subgroups: [
        {
          title: '보드',
          expanded: true,
          tasks: [
            { title: '4가지 UX, UI 변경 필요', completed: false },
            { title: '보드 추가 완료', completed: true },
            { title: '검색필터 완료', completed: true },
            { title: '협업 완료', completed: true },
            { title: '대댓글 기능 추가 대기중', completed: false }
          ]
        }
      ]
    },
    {
      title: '일일 주간보고',
      expanded: true,
      tasks: [{ title: '보고서 작성 페이지 완료', completed: true }],
      subgroups: [
        {
          title: '보고서 설정',
          expanded: true,
          tasks: [
            { title: 'AI 취합 보고서 생성 완료', completed: true },
            { title: '취합대상 보고서 선택 완료', completed: true },
            { title: '보고서 작성 완료', completed: true },
            { title: '활동 추가 완료', completed: true },
            { title: 'AI 요약 전후 비교 완료', completed: true }
          ]
        }
      ]
    },
    {
      title: '업무 인수인계',
      expanded: true,
      tasks: [{ title: '업무 인수인계 페이지 완료', completed: true }],
      subgroups: []
    },
    {
      title: 'HR 인사평가',
      expanded: true,
      tasks: [
        { title: '평가대상확인 페이지 완료', completed: true },
        { title: '평가기본항목관리 페이지 완료', completed: true },
        { title: '평가항목관리 페이지 완료', completed: true },
        { title: '진행현황 페이지 완료', completed: true }
      ],
      subgroups: [
        {
          title: '기타 HR 페이지',
          expanded: true,
          tasks: [
            { title: '역량항목관리 페이지', completed: false },
            { title: '성과기술서작성 페이지', completed: false },
            { title: '평가조정 페이지', completed: false },
            { title: '기타항목관리 페이지', completed: false }
          ]
        }
      ]
    }
  ])

  // 새 업무 추가 관련 상태
  const newTask = ref('')
  const selectedCategory = ref(0)

  // 가이드 데이터 구조화
  const guideData = reactive({
    categories: [
      {
        id: 'common',
        title: '공통',
        status: 'completed',
        subcategories: [
          {
            id: 'login',
            title: '로그인',
            status: 'completed',
            items: [
              {
                id: 'login-screen',
                title: '로그인 화면',
                description: '사용자 로그인 화면',
                icon: 'mdi:login',
                url: './ispark-sgate/login',
                status: 'completed'
              }
            ]
          },
          {
            id: 'common-modal',
            title: '공통 모달',
            status: 'completed',
            items: [
              {
                id: 'find-password',
                title: '비밀번호 찾기 모달',
                description: '비밀번호 찾기 모달',
                icon: 'mdi:lock-reset',
                url: './ispark-sgate/login2/forgot-password',
                status: 'completed'
              },
              {
                id: 'filter-modal',
                title: '사용자 필터 모달',
                description: '사용자 필터 모달',
                icon: 'mdi:filter',
                url: './ispark-sgate/',
                status: 'completed'
              },
              {
                id: 'notification-modal',
                title: '사용자 알림 모달',
                description: '사용자 알림 모달',
                icon: 'mdi:bell-alert',
                url: './ispark-sgate/',
                status: 'completed'
              },
              {
                id: 'menu-modal',
                title: '사용자 전체메뉴 모달',
                description: '사용자 전체메뉴 모달',
                icon: 'mdi:menu',
                url: './ispark-sgate/',
                status: 'completed'
              }
            ]
          }
        ]
      },
      {
        id: 'task',
        title: '업무/협업',
        status: 'in-progress',
        subcategories: [
          {
            id: 'home',
            title: '업무: 홈',
            status: 'completed',
            items: [
              {
                id: 'task-home',
                title: '업무 홈',
                description: '업무 메인 대시보드 페이지',
                icon: 'mdi:home',
                url: './ispark-sgate/Task/home',
                status: 'completed'
              }
            ]
          },
          {
            id: 'board',
            title: '업무: 보드/협업',
            status: 'completed',
            items: [
              {
                id: 'task-collaboration',
                title: '협업 보드',
                description: '업무 협업 및 보드 관리',
                icon: 'mdi:view-dashboard',
                url: './ispark-sgate/Task/collaboration',
                status: 'completed'
              }
            ]
          },
          {
            id: 'task-modal',
            title: '업무 모달',
            status: 'completed',
            items: [
              {
                id: 'board-add',
                title: '보드 추가',
                description: '보드 추가 기능',
                icon: 'mdi:plus-box',
                url: './ispark-sgate/Task/collaboration',
                status: 'completed'
              },
              {
                id: 'search-filter',
                title: '검색필터',
                description: '검색 및 필터 기능',
                icon: 'mdi:filter',
                url: './ispark-sgate/Task/collaboration',
                status: 'completed'
              },
              {
                id: 'collaboration',
                title: '협업',
                description: '협업 기능',
                icon: 'mdi:account-group',
                url: './ispark-sgate/Task/collaboration',
                status: 'completed'
              },
              {
                id: 'file-attachment',
                title: '파일 첨부',
                description: '활동에 파일 첨부 기능',
                icon: 'mdi:file-upload',
                url: './ispark-sgate/Task/collaboration',
                status: 'completed'
              }
            ]
          }
        ]
      },
      {
        id: 'report',
        title: '일일 주간보고',
        status: 'completed',
        subcategories: [
          {
            id: 'report-write',
            title: '보고서 작성',
            status: 'completed',
            items: [
              {
                id: 'report-create',
                title: '보고서 작성 페이지',
                description: '보고서 작성 페이지',
                icon: 'mdi:file-document-edit',
                url: './ispark-sgate/Task/reports/create',
                status: 'completed'
              },
              {
                id: 'report-view',
                title: '보고서 조회 페이지',
                description: '보고서 조회 및 상세보기',
                icon: 'mdi:file-document',
                url: './ispark-sgate/Task/reports/view',
                status: 'completed'
              }
            ]
          },
          {
            id: 'report-modal',
            title: '보고서 모달',
            status: 'completed',
            items: [
              {
                id: 'activity-add',
                title: '활동 추가',
                description: '활동 추가 기능',
                icon: 'mdi:plus-circle',
                url: './ispark-sgate/Task/reports/create',
                status: 'completed'
              },
              {
                id: 'ai-summary',
                title: 'AI 요약 전후 비교',
                description: 'AI 요약 비교 기능',
                icon: 'mdi:compare',
                url: './ispark-sgate/Task/reports/create',
                status: 'completed'
              },
              {
                id: 'ai-report',
                title: 'AI 취합 보고서 생성',
                description: 'AI를 활용한 보고서 취합',
                icon: 'mdi:robot',
                url: './ispark-sgate/Task/reports/create',
                status: 'completed'
              },
              {
                id: 'report-config',
                title: '보고서 설정',
                description: '보고서 설정 및 구성',
                icon: 'mdi:cog',
                url: './ispark-sgate/Task/reports/create',
                status: 'completed'
              }
            ]
          }
        ]
      },
      {
        id: 'handover',
        title: '업무 인수인계',
        status: 'completed',
        subcategories: [
          {
            id: 'handover-page',
            title: '인수인계 페이지',
            status: 'completed',
            items: [
              {
                id: 'handover-main',
                title: '업무 인수인계 페이지',
                description: '업무 인수인계 메인 페이지',
                icon: 'mdi:transfer',
                url: './ispark-sgate/Task/handover',
                status: 'completed'
              }
            ]
          },
          {
            id: 'handover-modal',
            title: '인수인계 모달',
            status: 'completed',
            items: [
              {
                id: 'manager-selection',
                title: '담당자 선택 모달',
                description: '담당자 선택 모달',
                icon: 'mdi:account-multiple',
                url: './ispark-sgate/Task/handover',
                status: 'completed'
              }
            ]
          }
        ]
      },
      {
        id: 'hr-evaluation',
        title: 'HR 인사평가',
        status: 'in-progress',
        subcategories: [
          {
            id: 'hr-main',
            title: '평가 메인',
            status: 'completed',
            items: [
              {
                id: 'evaluation-targets',
                title: '평가대상확인',
                description: '평가대상자 확인 및 관리',
                icon: 'mdi:account-check',
                url: './ispark-sgate/hr-evaluation/targets',
                status: 'completed'
              },
              {
                id: 'evaluation-progress',
                title: '진행현황',
                description: '평가 진행현황 관리',
                icon: 'mdi:chart-line',
                url: './ispark-sgate/hr-evaluation/progress',
                status: 'completed'
              }
            ]
          },
          {
            id: 'hr-basic',
            title: '기본 항목 관리',
            status: 'completed',
            items: [
              {
                id: 'basic-items',
                title: '평가기본항목관리',
                description: '등급척도 및 기본항목 관리',
                icon: 'mdi:format-list-bulleted',
                url: './ispark-sgate/hr-evaluation/basic-items',
                status: 'completed'
              },
              {
                id: 'performance-items',
                title: '평가항목관리',
                description: '성과평가 항목 관리',
                icon: 'mdi:clipboard-list',
                url: './ispark-sgate/hr-evaluation/performance-items',
                status: 'completed'
              }
            ]
          },
          {
            id: 'hr-advanced',
            title: '고급 관리 기능',
            status: 'in-progress',
            items: [
              {
                id: 'competency-items',
                title: '역량항목관리',
                description: '역량평가 항목 관리',
                icon: 'mdi:star-outline',
                url: './ispark-sgate/hr-evaluation/competency-items',
                status: 'in-progress'
              },
              {
                id: 'competency-dictionary',
                title: '역량사전관리',
                description: '역량사전 및 정의 관리',
                icon: 'mdi:book-open-variant',
                url: './ispark-sgate/hr-evaluation/competency-dictionary',
                status: 'in-progress'
              },
              {
                id: 'performance-template',
                title: '성과평가서식관리',
                description: '성과평가 서식 템플릿 관리',
                icon: 'mdi:file-document-edit',
                url: './ispark-sgate/hr-evaluation/performance-template',
                status: 'in-progress'
              },
              {
                id: 'job-template',
                title: '직무평가서식관리',
                description: '직무평가 서식 템플릿 관리',
                icon: 'mdi:briefcase',
                url: './ispark-sgate/hr-evaluation/job-template',
                status: 'waiting'
              }
            ]
          },
          {
            id: 'hr-evaluation-process',
            title: '평가 프로세스',
            status: 'waiting',
            items: [
              {
                id: 'performance-description',
                title: '성과기술서작성',
                description: '성과기술서 작성 및 관리',
                icon: 'mdi:file-edit',
                url: './ispark-sgate/hr-evaluation/performance-description',
                status: 'waiting'
              },
              {
                id: 'performance-description-status',
                title: '성과기술서작성현황',
                description: '성과기술서 작성현황 관리',
                icon: 'mdi:file-chart',
                url: './ispark-sgate/hr-evaluation/performance-description-status',
                status: 'waiting'
              },
              {
                id: 'job-description',
                title: '직무기술서관리',
                description: '직무기술서 관리',
                icon: 'mdi:file-outline',
                url: './ispark-sgate/hr-evaluation/job-description',
                status: 'waiting'
              }
            ]
          },
          {
            id: 'hr-calculation',
            title: '평가 계산 및 결과',
            status: 'waiting',
            items: [
              {
                id: 'calculation',
                title: '개인별산출',
                description: '개인별 평가 결과 산출',
                icon: 'mdi:calculator',
                url: './ispark-sgate/hr-evaluation/calculation',
                status: 'waiting'
              },
              {
                id: 'org-calculation',
                title: '조직별산출',
                description: '조직별 평가 결과 산출',
                icon: 'mdi:domain',
                url: './ispark-sgate/hr-evaluation/org-calculation',
                status: 'waiting'
              },
              {
                id: 'total-calculation',
                title: '종합산출',
                description: '종합 평가 결과 산출',
                icon: 'mdi:chart-box',
                url: './ispark-sgate/hr-evaluation/total-calculation',
                status: 'waiting'
              },
              {
                id: 'adjustment',
                title: '평가조정',
                description: '평가 결과 조정',
                icon: 'mdi:tune',
                url: './ispark-sgate/hr-evaluation/adjustment',
                status: 'waiting'
              }
            ]
          },
          {
            id: 'hr-results',
            title: '최종 결과',
            status: 'waiting',
            items: [
              {
                id: 'final-results',
                title: '최종결과',
                description: '최종 평가 결과',
                icon: 'mdi:trophy',
                url: './ispark-sgate/hr-evaluation/final-results',
                status: 'waiting'
              },
              {
                id: 'total-results',
                title: '종합결과',
                description: '종합 평가 결과',
                icon: 'mdi:chart-pie',
                url: './ispark-sgate/hr-evaluation/total-results',
                status: 'waiting'
              },
              {
                id: 'grade-distribution',
                title: '등급분포관리',
                description: '등급분포 관리 및 분석',
                icon: 'mdi:chart-histogram',
                url: './ispark-sgate/hr-evaluation/grade-distribution',
                status: 'waiting'
              }
            ]
          }
        ]
      },
      {
        id: 'components',
        title: 'UI 컴포넌트',
        status: 'completed',
        subcategories: [
          {
            id: 'basic-components',
            title: '기본 컴포넌트',
            status: 'completed',
            items: [
              {
                id: 'button-component',
                title: '버튼 컴포넌트',
                description: '다양한 스타일의 버튼',
                icon: 'mdi:button-cursor',
                url: './ispark-sgate/components/Button',
                status: 'completed'
              },
              {
                id: 'input-component',
                title: '인풋 컴포넌트',
                description: '텍스트 입력 컴포넌트',
                icon: 'mdi:form-textbox',
                url: './ispark-sgate/components/Input',
                status: 'completed'
              },
              {
                id: 'select-component',
                title: '셀렉트 컴포넌트',
                description: '드롭다운 선택 컴포넌트',
                icon: 'mdi:form-dropdown',
                url: './ispark-sgate/components/Select',
                status: 'completed'
              },
              {
                id: 'textarea-component',
                title: '텍스트영역 컴포넌트',
                description: '여러 줄 텍스트 입력',
                icon: 'mdi:form-textarea',
                url: './ispark-sgate/components/Textarea',
                status: 'completed'
              }
            ]
          },
          {
            id: 'advanced-components',
            title: '고급 컴포넌트',
            status: 'completed',
            items: [
              {
                id: 'table-component',
                title: '테이블 컴포넌트',
                description: '데이터 테이블 컴포넌트',
                icon: 'mdi:table',
                url: './ispark-sgate/components/TableDefault',
                status: 'completed'
              },
              {
                id: 'modal-component',
                title: '모달 컴포넌트',
                description: '팝업 및 모달 컴포넌트',
                icon: 'mdi:window-maximize',
                url: './ispark-sgate/components/Popup',
                status: 'completed'
              },
              {
                id: 'layout-component',
                title: '레이아웃 컴포넌트',
                description: '레이아웃 및 그리드 시스템',
                icon: 'mdi:view-grid-plus',
                url: './ispark-sgate/components/Layout',
                status: 'completed'
              }
            ]
          }
        ]
      }
    ]
  })

  // 가이드 카테고리 확장 상태 관리
  const expandedCategories = reactive({})

  // 가이드 서브카테고리 확장 상태 관리
  const expandedSubcategories = reactive({})

  // 상태별 색상 및 라벨 정보
  const statusInfo = {
    waiting: { color: '#9e9e9e', label: '대기중' },
    'in-progress': { color: '#ff9800', label: '진행중' },
    completed: { color: '#4caf50', label: '완료' }
  }

  // 상태 배지 스타일 계산 함수
  const getStatusBadgeStyle = status => {
    return {
      backgroundColor: statusInfo[status].color,
      color: '#fff',
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 'bold'
    }
  }

  // 카테고리 진행 상태 계산 함수
  const calculateCategoryStatus = category => {
    let completed = 0
    let total = 0

    category.subcategories.forEach(sub => {
      sub.items.forEach(item => {
        total++
        if (item.status === 'completed') {
          completed++
        }
      })
    })

    return { completed, total }
  }

  onMounted(() => {
    // 로컬 스토리지에서 체크리스트 상태 불러오기
    const savedTasks = localStorage.getItem('taskChecklist')
    if (savedTasks) {
      taskCategories.value = JSON.parse(savedTasks)
    }

    // 카테고리 확장 상태 초기화
    guideData.categories.forEach(category => {
      expandedCategories[category.id] = category.id === 'common' // 공통 카테고리만 기본 확장

      expandedSubcategories[category.id] = {}
      category.subcategories.forEach(subcategory => {
        expandedSubcategories[category.id][subcategory.id] = false
      })
    })

    // 기본적으로 첫 번째 서브카테고리 확장
    if (guideData.categories.length > 0 && guideData.categories[0].subcategories.length > 0) {
      expandedSubcategories[guideData.categories[0].id][
        guideData.categories[0].subcategories[0].id
      ] = true
    }
  })

  // 카테고리 토글
  const toggleCategory = categoryIndex => {
    taskCategories.value[categoryIndex].expanded = !taskCategories.value[categoryIndex].expanded
  }

  // 하위 그룹 토글
  const toggleSubgroup = (categoryIndex, subgroupIndex) => {
    taskCategories.value[categoryIndex].subgroups[subgroupIndex].expanded =
      !taskCategories.value[categoryIndex].subgroups[subgroupIndex].expanded
  }

  // 완료된 업무 카운트 계산
  const getCompletedTaskCount = tasks => {
    return tasks.filter(task => task.completed).length
  }

  // 새 업무 추가
  const addTask = () => {
    if (newTask.value.trim() === '') return

    const category = taskCategories.value[selectedCategory.value]
    category.tasks.push({
      title: newTask.value,
      completed: false
    })

    newTask.value = ''
    saveTaskState()
  }

  // 업무 상태 저장
  const saveTaskState = () => {
    localStorage.setItem('taskChecklist', JSON.stringify(taskCategories.value))
  }

  // 가이드 카테고리 토글 함수
  const toggleGuideCategory = category => {
    // 카테고리가 존재하지 않으면 초기화
    if (expandedCategories[category] === undefined) {
      expandedCategories[category] = true
    } else {
      expandedCategories[category] = !expandedCategories[category]
    }
  }

  // 가이드 서브카테고리 토글 함수
  const toggleGuideSubcategory = (category, subcategory) => {
    // 카테고리가 존재하지 않으면 초기화
    if (!expandedSubcategories[category]) {
      expandedSubcategories[category] = {}
    }

    // 서브카테고리가 존재하지 않으면 초기화
    if (expandedSubcategories[category][subcategory] === undefined) {
      expandedSubcategories[category][subcategory] = true
    } else {
      expandedSubcategories[category][subcategory] = !expandedSubcategories[category][subcategory]
    }
  }

  // 서브카테고리 확장 상태 가져오기 (undefined 방지)
  const getSubcategoryExpandedState = (categoryId, subcategoryId) => {
    if (!expandedSubcategories[categoryId]) return false
    return !!expandedSubcategories[categoryId][subcategoryId]
  }

  // 가이드 카테고리 ID로 찾기
  const findCategoryById = id => {
    return guideData.categories.find(cat => cat.id === id)
  }

  // 가이드 서브카테고리 찾기
  const findSubcategoryById = (categoryId, subcategoryId) => {
    const category = findCategoryById(categoryId)
    if (category) {
      return category.subcategories.find(sub => sub.id === subcategoryId)
    }
    return null
  }

  // 업무 삭제
  const deleteTask = (categoryIndex, taskIndex) => {
    taskCategories.value[categoryIndex].tasks.splice(taskIndex, 1)
    saveTaskState()
  }

  // 하위 업무 삭제
  const deleteSubtask = (categoryIndex, subgroupIndex, subtaskIndex) => {
    taskCategories.value[categoryIndex].subgroups[subgroupIndex].tasks.splice(subtaskIndex, 1)
    saveTaskState()
  }
</script>

<style lang="scss" scoped>
  // 툴팁 예시 스타일
  .tooltip-examples {
    .example-row {
      margin-bottom: 32px;
      border-bottom: 1px solid #eaeaea;
      padding-bottom: 24px;

      &:last-child {
        border-bottom: none;
        margin-bottom: 0;
      }
    }

    .example-title {
      font-size: 18px;
      margin-bottom: 16px;
      color: #333;
    }

    .example-content {
      margin-bottom: 16px;
      padding: 16px;
      background-color: #f9f9f9;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 80px;

      &.position-examples {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        gap: 16px;
      }
    }

    .example-button {
      padding: 8px 16px;
      background-color: #4a6cf7;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #3a5ce5;
      }
    }

    .example-code {
      background-color: #f0f0f0;
      border-radius: 4px;
      overflow: hidden;

      pre {
        margin: 0;
        padding: 16px;
        overflow-x: auto;

        code {
          font-family: 'Courier New', Courier, monospace;
          font-size: 14px;
          color: #333;
        }
      }
    }

    .tooltip-wrapper {
      display: inline-block;

      .icon-md {
        width: 24px;
        height: 24px;
        display: inline-block;
        cursor: pointer;
        background-color: #4a6cf7;
        border-radius: 50%;
        position: relative;

        &::before {
          content: '?';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-weight: bold;
        }
      }
    }
  }
  .guide-container {
    max-width: 100%;
    margin: 0 auto;
    padding: 40px 20px;
    background-color: #f5f7fa;
    min-height: 100vh;
  }

  .guide-title {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 40px;
    color: #333;
    text-align: center;
  }

  .guide-content {
    margin-top: 30px;
  }

  .guide-row {
    display: flex;
    margin: -10px;
    width: calc(100% + 20px);
    align-items: flex-start;
  }

  .guide-column {
    flex: 1 1 100%;
    min-width: 300px;
    margin: 10px;
  }

  .guide-table {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    padding: 20px;
    margin-bottom: 20px;
    overflow: auto;
  }

  .task-check-section {
    h2 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
      color: #333;
      border-bottom: 2px solid #eaeaea;
      padding-bottom: 10px;
    }

    .task-list {
      .task-category {
        margin-bottom: 16px;
        border: 1px solid #eaeaea;
        border-radius: 8px;
        overflow: hidden;

        .category-header {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          background-color: #f8fafc;
          cursor: pointer;

          &:hover {
            background-color: #edf2ff;
          }

          .category-icon {
            margin-right: 8px;
            display: flex;
            align-items: center;
          }

          .category-title {
            flex: 1;
            margin: 0;
            font-size: 16px;
            font-weight: 600;
            color: #333;
          }

          .task-count {
            font-size: 14px;
            color: #666;
            background-color: #eaeaea;
            padding: 2px 8px;
            border-radius: 12px;
          }
        }

        .category-tasks {
          padding: 8px 16px 16px;
        }
      }

      .task-subgroup {
        margin: 8px 0 8px 16px;
        border-left: 2px solid #eaeaea;

        .subgroup-header {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          cursor: pointer;

          &:hover {
            background-color: #f5f7fa;
          }

          .subgroup-icon {
            margin-right: 8px;
            display: flex;
            align-items: center;
          }

          .subgroup-title {
            flex: 1;
            margin: 0;
            font-size: 14px;
            font-weight: 500;
            color: #333;
          }

          .task-count {
            font-size: 12px;
            color: #666;
            background-color: #eaeaea;
            padding: 1px 6px;
            border-radius: 10px;
          }
        }

        .subgroup-tasks {
          padding: 4px 12px 4px 28px;
        }
      }

      .task-item,
      .subtask-item {
        display: flex;
        align-items: center;
        margin-bottom: 12px;

        input[type='checkbox'] {
          margin-right: 10px;
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        label {
          font-size: 14px;
          color: #333;
          cursor: pointer;
          flex: 1;

          &:hover {
            color: #3b82f6;
          }
        }

        .task-actions {
          display: flex;
          align-items: center;

          .delete-btn {
            background: none;
            border: none;
            color: #9ca3af;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.6;
            transition: all 0.2s;

            &:hover {
              color: #ef4444;
              opacity: 1;
              background-color: rgba(239, 68, 68, 0.1);
            }
          }
        }
      }

      .subtask-item {
        margin-bottom: 8px;

        label {
          font-size: 13px;
        }
      }

      .add-task {
        display: flex;
        margin-top: 20px;

        input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px 0 0 4px;
          font-size: 14px;

          &:focus {
            outline: none;
            border-color: #3b82f6;
          }
        }

        .category-select {
          padding: 10px;
          border: 1px solid #ddd;
          border-left: none;
          background-color: #f8fafc;
          font-size: 14px;

          &:focus {
            outline: none;
          }
        }

        .add-btn {
          padding: 10px 16px;
          background-color: #3b82f6;
          color: white;
          border: none;
          border-radius: 0 4px 4px 0;
          cursor: pointer;
          font-weight: 500;

          &:hover {
            background-color: #2563eb;
          }
        }
      }
    }
  }

  .section-description {
    color: var(--color-gray-60, #58616a);
    margin-bottom: 24px;
    font-size: 16px;
    line-height: 1.5;
  }

  .component-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    justify-content: center;
    margin: 0 auto;
    width: 100%;
  }

  .component-card {
    display: flex;
    align-items: center;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid var(--color-gray-20, #cdd1d5);
    background-color: var(--color-gray-5, #f5f6f7);
    transition: all 0.2s ease;
    text-decoration: none;
    color: inherit;
    height: 100%;

    &:hover {
      border-color: var(--color-system-b30, #0084ff);
      box-shadow: 0 2px 8px rgba(0, 132, 255, 0.1);
      transform: translateY(-2px);
    }
  }

  .component-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 8px;
    background-color: var(--color-system-b10, #e6f2ff);
    color: var(--color-system-b30, #0084ff);
    margin-right: 16px;
    flex-shrink: 0;
  }

  .component-info {
    flex: 1;
  }

  .component-title {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 4px;
    color: var(--color-gray-80, #2c3137);
  }

  .component-desc {
    font-size: 14px;
    color: var(--color-gray-60, #58616a);
    margin: 0;
  }

  @media (max-width: 1200px) {
    .guide-column {
      flex: 1 1 100%;
    }
  }

  @media (max-width: 768px) {
    .guide-column {
      flex: 1 1 100%;
    }

    .component-grid {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
  }

  .guide-categories {
    .guide-category {
      margin-bottom: 16px;
      border: 1px solid #eaeaea;
      border-radius: 8px;
      overflow: hidden;

      .category-header {
        display: flex;
        align-items: center;
        padding: 16px;
        background-color: #f8fafc;
        cursor: pointer;

        &:hover {
          background-color: #edf2ff;
        }

        .category-icon {
          margin-right: 12px;
          display: flex;
          align-items: center;
          color: #3b82f6;
        }

        h3 {
          flex: 1;
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }

        .status-badges {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .category-progress {
          font-size: 14px;
          color: #666;
        }
      }

      .subcategories {
        .subcategory {
          border-bottom: 1px solid #eaeaea;

          &:last-child {
            border-bottom: none;
          }

          .subcategory-header {
            display: flex;
            align-items: center;
            padding: 12px 16px 12px 32px;
            cursor: pointer;

            &:hover {
              background-color: #f5f7fa;
            }

            .subcategory-icon {
              margin-right: 8px;
              display: flex;
              align-items: center;
              color: #6b7280;
            }

            h4 {
              margin: 0;
              font-size: 16px;
              font-weight: 500;
              color: #4b5563;
              flex: 1;
            }
          }

          .guide-items {
            .guide-item {
              display: flex;
              align-items: center;
              padding: 12px 16px 12px 56px;
              text-decoration: none;
              color: #333;
              transition: background-color 0.2s;

              &:hover {
                background-color: #f5f7fa;
              }

              .item-icon {
                margin-right: 12px;
                color: #6b7280;
                display: flex;
                align-items: center;
              }

              .item-content {
                flex: 1;

                .item-title {
                  font-size: 14px;
                  font-weight: 500;
                  color: #333;
                  margin-bottom: 2px;
                }

                .item-description {
                  font-size: 12px;
                  color: #6b7280;
                }
              }

              .item-status {
                display: flex;
                align-items: center;
                gap: 12px;
              }

              .item-action {
                color: #9ca3af;
              }
            }
          }
        }
      }
    }
  }
</style>
