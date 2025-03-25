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
import TaskBoardHeader from "./TaskBoardHeader.vue";
import CategoryColumn from "./CategoryColumn.vue";
import CategoryCard from "./CategoryCard.vue";
import UiModal from "@/components/UI/UiModal.vue";

// 카테고리 카드
const categories = ref([
  {
    id: 1,
    title: "카테고리 엄청 길어지면~~~~~카테고리 엄청 길어지면~~~~~",
    cards: [
      {
        id: 1,
        title:
          "업무명이 들어가는공간입니다. 길어지면???업무명이 들어가는공간입니다. 길어지면???",
        tags: ["태그1", "태그2"],
        date: "2023-01-01 ~ 2023-01-02",
        comments: 0,
        attachments: 0,
      },
    ],
  },
  {
    id: 2,
    title: "카테고리 2",
    cards: [],
  },
  {
    id: 3,
    title: "카테고리 3",
    cards: [],
  },
]);

// 카드 모달
const isCardModalOpen = ref(false);

// 카드 모달 열기
function openCardModal() {
  isCardModalOpen.value = true;
}

// 새 카테고리 추가 함수
function addNewCategory() {
  // 새 카테고리 추가 로직
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
