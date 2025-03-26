<template>
  <div class="task-board-page">
    <!-- 헤더 컴포넌트 사용 -->
    <TaskBoardHeader @add-category="addNewCategory" />

    <!-- 보드 컨텐츠 -->
    <section class="board-content">
      <ul class="categories-container">
        <!-- 빈 카테고리 -->
        <div v-if="categories.length === 0" class="empty-category">
          <div class="add-category-placeholder" @click="addNewCategory">
            <div class="add-placeholder-icon">
              <Icon name="mdi:plus" size="24" />
            </div>
            <p>새 카테고리 추가하기</p>
          </div>
        </div>
        <!-- 카테고리가 있는 경우 -->
        <CategoryColumn
          v-for="category in categories"
          :key="category.id"
          :title="category.title"
          @add-board="openCardModal"
          @open-menu="openCategoryMenu"
        >
          <!-- 카드가 있는 경우 -->
          <div v-if="category.cards.length > 0">
            <CategoryCard
              v-for="card in category.cards"
              :key="card.id"
              :title="card.title"
              :tags="card.tags"
              :date="card.date"
              :comments="card.comments"
              :attachments="card.attachments"
            />
          </div>
          <!-- 카드가 없는 경우 -->
          <div v-else>
            <div class="empty-category">
              <div class="add-card-placeholder" @click="openCardModal">
                <div class="add-placeholder-icon">
                  <Icon name="mdi:plus" size="24" />
                </div>
                <p>
                  해당 카테고리의 <br />
                  첫 업무카드를 등록해보세요.
                </p>
              </div>
            </div>
          </div>
        </CategoryColumn>
      </ul>
    </section>

    <!-- 카드 모달 -->
    <UiModal
      v-model="isCardModalOpen"
      position="right"
      title="카드 추가"
    >
      <template #headerActions>
        <button class="edit-title-btn">
          <Icon name="mdi:pencil" size="16" />
        </button>
      </template>
    </UiModal>
    <!-- 카드 모달 EEE -->
  </div>
</template>
<script setup>
import { ref } from "vue";
import TaskBoardHeader from "./TaskBoardHeader.vue";
import CategoryColumn from "./CategoryColumn.vue";
import CategoryCard from "./CategoryCard.vue";
import UiModal from "@/components/UI/UiModal.vue";

// 카테고리 목록 데이터 - 각 카테고리에는 ID, 제목, 카드 배열이 포함됨
const categories = ref([
  {
    id: 1,
    title: "카테고리 1",
    cards: [
      {
        id: 1,
        title: "디자인 리뉴얼 프로젝트",
        tags: ["디자인", "프론트엔드", "UX"],
        date: "2023-05-10 ~ 2023-06-15",
        comments: 5,
        attachments: 3,
      },
      {
        id: 2,
        title: "API 개발 및 연동",
        tags: ["백엔드", "API"],
        date: "2023-05-20 ~ 2023-06-15",
        comments: 12,
        attachments: 2,
      },
      {
        id: 3,
        title: "프로토타입 개발",
        tags: ["개발", "테스트"],
        date: "2023-04-15 ~ 2023-05-10",
        comments: 3,
        attachments: 1,
      },
      {
        id: 4,
        title: "기획서 작성",
        tags: ["기획", "문서"],
        date: "2023-04-01 ~ 2023-04-15",
        comments: 7,
        attachments: 4,
      },
      {
        id: 5,
        title: "기획서 작성",
        tags: ["기획", "문서"],
        date: "2023-04-01 ~ 2023-04-15",
        comments: 7,
        attachments: 4,
      },
      {
        id: 6,
        title: "기획서 작성",
        tags: ["기획", "문서"],
        date: "2023-04-01 ~ 2023-04-15",
        comments: 7,
        attachments: 4,
      },
    ]
  },
  {
    id: 2,
    title: "진행 중",
    cards: [
      {
        id: 3,
        title: "사용자 피드백 수집 및 분석",
        tags: ["리서치", "UX"],
        date: "2023-06-01 ~ 2023-06-30",
        comments: 8,
        attachments: 5,
      }
    ]
  },
  {
    id: 3,
    title: "완료",
    cards: [
      {
        id: 4,
        title: "프로토타입 개발",
        tags: ["개발", "테스트"],
        date: "2023-04-15 ~ 2023-05-10",
        comments: 3,
        attachments: 1,
      },
      {
        id: 5,
        title: "기획서 작성",
        tags: ["기획", "문서"],
        date: "2023-04-01 ~ 2023-04-15",
        comments: 7,
        attachments: 4,
      }
    ]
  }
]);

// 카드 모달 상태 관리 - 카드 추가/편집을 위한 모달 표시 여부
const isCardModalOpen = ref(false);

// 카드 모달 열기 함수 - 카드 추가 또는 편집 시 모달을 표시
function openCardModal() {
  isCardModalOpen.value = true;
}

// 새 카테고리 추가 함수 - 카테고리 목록에 새 카테고리를 추가
function addNewCategory() {
  // 새 카테고리 객체 생성 및 추가
  console.log("새 카테고리 추가");
  categories.value.push({
    id: categories.value.length + 1,
    title: "카테고리 " + (categories.value.length + 1),
    cards: [],
  });
}
</script>

<style lang="scss" scoped>
.categories-container {
  display: flex;
  gap: 16px;
  width: 100%;
  min-height: calc(100vh - 167px);
  overflow-x: auto;
  padding-bottom: 50px;
}

.empty-category {
  display: flex;
  justify-content: center;
  align-items: center;
}

.categories-container {
  display: flex;
  gap: 16px;
}

.empty-category {
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-card-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 16px;
  border-radius: 8px;
  border: 1px dashed #dadce0;
  width: 100%;
  p {
    text-align: center;
  }
}

.add-card-placeholder:hover {
  background-color: #f8f9fa;
}

.add-placeholder-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #e8f0fe;
  margin-bottom: 8px;
}

.add-category-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 16px;
  border-radius: 8px;
  border: 1px dashed #dadce0;
  width: 100%;
  height: 100%;
}

.add-category-placeholder:hover {
  background-color: #f8f9fa;
}

.add-category-placeholder-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #e8f0fe;
  margin-bottom: 8px;
}
</style>
