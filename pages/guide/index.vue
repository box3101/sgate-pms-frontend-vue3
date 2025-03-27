<template>
  <div class="guide-container">
    <h1 class="guide-title">SGATE 가이드</h1>

    <div class="guide-content">
      <div class="task-check-section">
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
                  :name="
                    category.expanded ? 'mdi:chevron-down' : 'mdi:chevron-right'
                  "
                  size="18"
                />
              </div>
              <h3 class="category-title">{{ category.title }}</h3>
              <span class="task-count"
                >{{ getCompletedTaskCount(category.tasks) }}/{{
                  category.tasks.length
                }}</span
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
                <label :for="'task-' + catIndex + '-' + taskIndex">{{
                  task.title
                }}</label>
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
                <div
                  class="subgroup-header"
                  @click="toggleSubgroup(catIndex, subIndex)"
                >
                  <div class="subgroup-icon">
                    <Icon
                      :name="
                        subgroup.expanded
                          ? 'mdi:chevron-down'
                          : 'mdi:chevron-right'
                      "
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
                    :key="
                      'subtask-' +
                      catIndex +
                      '-' +
                      subIndex +
                      '-' +
                      subtaskIndex
                    "
                    class="subtask-item"
                  >
                    <input
                      type="checkbox"
                      :id="
                        'subtask-' +
                        catIndex +
                        '-' +
                        subIndex +
                        '-' +
                        subtaskIndex
                      "
                      v-model="subtask.completed"
                      @change="saveTaskState"
                    />
                    <label
                      :for="
                        'subtask-' +
                        catIndex +
                        '-' +
                        subIndex +
                        '-' +
                        subtaskIndex
                      "
                      >{{ subtask.title }}</label
                    >
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
              <option
                v-for="(category, index) in taskCategories"
                :key="index"
                :value="index"
              >
                {{ category.title }}
              </option>
            </select>
            <button @click="addTask" class="add-btn">추가</button>
          </div>
        </div>
      </div>

      <div class="guide-table">
        <h2>SGATE 퍼블리싱 진척도</h2>
        <div class="guide-categories">
          <!-- 1단계: 메인 카테고리 -->
          <div
            v-for="category in guideData.categories"
            :key="category.id"
            class="guide-category"
          >
            <div
              class="category-header"
              @click="toggleGuideCategory(category.id)"
            >
              <div class="category-icon">
                <Icon
                  :name="
                    expandedCategories[category.id]
                      ? 'mdi:chevron-down'
                      : 'mdi:chevron-right'
                  "
                  size="20"
                />
              </div>
              <h3>{{ category.title }}</h3>
              <div class="status-badges">
                <div
                  class="status-badge"
                  :style="getStatusBadgeStyle(category.status)"
                >
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
                  <div
                    class="status-badge"
                    :style="getStatusBadgeStyle(subcategory.status)"
                  >
                    {{ statusInfo[subcategory.status].label }}
                  </div>
                </div>

                <!-- 3단계: 세부 항목 -->
                <div
                  v-if="
                    getSubcategoryExpandedState(category.id, subcategory.id)
                  "
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
                      <div
                        class="status-badge"
                        :style="getStatusBadgeStyle(item.status)"
                      >
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
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";

// 업무 체크리스트 데이터
const taskCategories = ref([
  {
    title: "공통",
    expanded: true,
    tasks: [
      { title: "로그인 화면 모바일 확인 작업", completed: false },
      { title: "공통 header 상단 프로필 메뉴, 알림, 전체메뉴 디자인 작업", completed: false },
    ],
  },
]);

// 새 업무 추가 관련 상태
const newTask = ref("");
const selectedCategory = ref(0);

// 가이드 데이터 구조화
const guideData = reactive({
  categories: [
    {
      id: "common",
      title: "공통",
      status: "completed", // 'waiting', 'in-progress', 'completed'
      subcategories: [
        {
          id: "login",
          title: "로그인",
          status: "completed",
          items: [
            {
              id: "login-screen",
              title: "로그인 화면",
              description: "사용자 로그인 화면",
              icon: "mdi:login",
              url: "/ispark-sgate/login",
              status: "completed",
            },
            {
              id: "find-password",
              title: "비밀 번호 찾기",
              description: "비밀번호 찾기 클릭",
              icon: "mdi:login",
              url: "/ispark-sgate/login",
              status: "completed",
            },
            {
              id: "notice-screen",
              title: "공지사항 화면",
              description: "공지사항 리스트 클릭",
              icon: "mdi:login",
              url: "/ispark-sgate/login",
              status: "completed",
            },
          ],
        },
        {
          id: "header",
          title: "공통 HEADER 상단",
          status: "in-progress",
          items: [
            {
              id: "profile-menu",
              title: "프로필 메뉴",
              description: "사용자 프로필 클릭",
              icon: "heroicons:user-circle",
              url: "/ispark-sgate/",
              status: "completed",
            },
            {
              id: "notification",
              title: "알림",
              description: "시스템 알림 메뉴",
              icon: "heroicons:bell-alert",
              url: "/ispark-sgate/",
              status: "completed",
            },
            {
              id: "full-menu",
              title: "전체메뉴",
              description: "시스템 전체 메뉴 보기",
              icon: "heroicons:bars-3",
              url: "/ispark-sgate/",
              status: "in-progress",
            },
          ],
        },
      ],
    },
    {
      id: "task",
      title: "업무 관리",
      status: "in-progress",
      subcategories: [
        {
          id: "home",
          title: "업무: 홈",
          status: "waiting",
          items: [
            {
              id: "task-home",
              title: "업무 홈",
              description: "업무 홈 화면",
              icon: "mdi:home",
              url: "/ispark-sgate/task",
              status: "waiting",
            },
          ],
        },
        {
          id: "board",
          title: "업무: 보드",
          status: "in-progress",
          items: [
            {
              id: "task-board",
              title: "업무 보드",
              description: "업무 보드 화면",
              icon: "mdi:view-dashboard",
              url: "/ispark-sgate/task/collaboration/board",
              status: "in-progress",
            },
          ],
        },
      ],
    },
  ],
});

// 가이드 카테고리 확장 상태 관리
const expandedCategories = reactive({});

// 가이드 서브카테고리 확장 상태 관리
const expandedSubcategories = reactive({});

// 상태별 색상 및 라벨 정보
const statusInfo = {
  waiting: { color: "#9e9e9e", label: "대기중" },
  "in-progress": { color: "#ff9800", label: "진행중" },
  completed: { color: "#4caf50", label: "완료" },
};

// 상태 배지 스타일 계산 함수
const getStatusBadgeStyle = (status) => {
  return {
    backgroundColor: statusInfo[status].color,
    color: "#fff",
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "bold",
  };
};

// 카테고리 진행 상태 계산 함수
const calculateCategoryStatus = (category) => {
  let completed = 0;
  let total = 0;

  category.subcategories.forEach((sub) => {
    sub.items.forEach((item) => {
      total++;
      if (item.status === "completed") {
        completed++;
      }
    });
  });

  return { completed, total };
};

onMounted(() => {
  // 로컬 스토리지에서 체크리스트 상태 불러오기
  const savedTasks = localStorage.getItem("taskChecklist");
  if (savedTasks) {
    taskCategories.value = JSON.parse(savedTasks);
  }

  // 카테고리 확장 상태 초기화
  guideData.categories.forEach((category) => {
    expandedCategories[category.id] = category.id === "common"; // 공통 카테고리만 기본 확장

    expandedSubcategories[category.id] = {};
    category.subcategories.forEach((subcategory) => {
      expandedSubcategories[category.id][subcategory.id] = false;
    });
  });

  // 기본적으로 첫 번째 서브카테고리 확장
  if (
    guideData.categories.length > 0 &&
    guideData.categories[0].subcategories.length > 0
  ) {
    expandedSubcategories[guideData.categories[0].id][
      guideData.categories[0].subcategories[0].id
    ] = true;
  }
});

// 카테고리 토글
const toggleCategory = (categoryIndex) => {
  taskCategories.value[categoryIndex].expanded =
    !taskCategories.value[categoryIndex].expanded;
};

// 하위 그룹 토글
const toggleSubgroup = (categoryIndex, subgroupIndex) => {
  taskCategories.value[categoryIndex].subgroups[subgroupIndex].expanded =
    !taskCategories.value[categoryIndex].subgroups[subgroupIndex].expanded;
};

// 완료된 업무 카운트 계산
const getCompletedTaskCount = (tasks) => {
  return tasks.filter((task) => task.completed).length;
};

// 새 업무 추가
const addTask = () => {
  if (newTask.value.trim() === "") return;

  const category = taskCategories.value[selectedCategory.value];
  category.tasks.push({
    title: newTask.value,
    completed: false,
  });

  newTask.value = "";
  saveTaskState();
};

// 업무 상태 저장
const saveTaskState = () => {
  localStorage.setItem("taskChecklist", JSON.stringify(taskCategories.value));
};

// 가이드 카테고리 토글 함수
const toggleGuideCategory = (category) => {
  // 카테고리가 존재하지 않으면 초기화
  if (expandedCategories[category] === undefined) {
    expandedCategories[category] = true;
  } else {
    expandedCategories[category] = !expandedCategories[category];
  }
};

// 가이드 서브카테고리 토글 함수
const toggleGuideSubcategory = (category, subcategory) => {
  // 카테고리가 존재하지 않으면 초기화
  if (!expandedSubcategories[category]) {
    expandedSubcategories[category] = {};
  }

  // 서브카테고리가 존재하지 않으면 초기화
  if (expandedSubcategories[category][subcategory] === undefined) {
    expandedSubcategories[category][subcategory] = true;
  } else {
    expandedSubcategories[category][subcategory] =
      !expandedSubcategories[category][subcategory];
  }
};

// 서브카테고리 확장 상태 가져오기 (undefined 방지)
const getSubcategoryExpandedState = (categoryId, subcategoryId) => {
  if (!expandedSubcategories[categoryId]) return false;
  return !!expandedSubcategories[categoryId][subcategoryId];
};

// 가이드 카테고리 ID로 찾기
const findCategoryById = (id) => {
  return guideData.categories.find((cat) => cat.id === id);
};

// 가이드 서브카테고리 찾기
const findSubcategoryById = (categoryId, subcategoryId) => {
  const category = findCategoryById(categoryId);
  if (category) {
    return category.subcategories.find((sub) => sub.id === subcategoryId);
  }
  return null;
};

// 업무 삭제
const deleteTask = (categoryIndex, taskIndex) => {
  taskCategories.value[categoryIndex].tasks.splice(taskIndex, 1);
  saveTaskState();
};

// 하위 업무 삭제
const deleteSubtask = (categoryIndex, subgroupIndex, subtaskIndex) => {
  taskCategories.value[categoryIndex].subgroups[subgroupIndex].tasks.splice(subtaskIndex, 1);
  saveTaskState();
};
</script>

<style lang="scss" scoped>
.guide-container {
  max-width: 1200px;
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
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.task-check-section {
  background-color: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

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

      input[type="checkbox"] {
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

.guide-table {
  background-color: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #333;
    border-bottom: 2px solid #eaeaea;
    padding-bottom: 10px;
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
}

.status-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  margin-left: 10px;
}
</style>
