<template>
  <div class="task-board-page">
    <!-- 헤더 컴포넌트 사용 -->
    <TaskBoardHeader />

    <!-- 보드 컨텐츠 -->
    <div class="board-content">
      <div class="categories-container">
        <!-- 첫 번째 카테고리 컬럼 -->
        <div class="category-column">
          <div class="category-header">
            <h3 class="category-title">카테고리명이 들어가는 공간입니다.</h3>
            <div class="category-actions">
              <UiButton
                variant="tertiary"
                size="small"
                icon="heroicons:plus"
                @click="isModalOpen = true"
              >
                보드 추가</UiButton
              >
              <button class="category-menu-btn">
                <Icon name="mdi:dots-vertical" size="16" />
              </button>
            </div>
          </div>

          <!-- 카드 목록 -->
          <div class="cards-container">
            <!-- 카드 1 -->
            <div class="task-card">
              <div class="card-tags">
                <span class="card-tag">태그1</span>
                <span class="card-tag">태그2</span>
                <span class="card-tag">태그3</span>
              </div>

              <div class="card-content">
                <p class="card-title">
                  업무명이 들어가는 공간입니다. 길어지면 잘려지면 어떨까요?
                </p>
              </div>

              <div class="card-footer">
                <span class="card-date">2023.03.12 - 2023.03.14</span>
                <div class="card-stats">
                  <span class="card-comments">
                    <Icon name="mdi:comment-outline" size="14" />
                    2
                  </span>
                  <span class="card-attachments">
                    <Icon name="mdi:paperclip" size="14" />
                    3
                  </span>
                </div>
              </div>
            </div>

            <!-- 카드 2 -->
            <div class="task-card">
              <div class="card-content">
                <p class="card-title">
                  업무명이 들어가는 공간입니다. 길어지면 잘려지면 어떨까요?
                </p>
              </div>

              <div class="card-footer">
                <span class="card-date">2023.03.12 - 2023.03.14</span>
                <div class="card-stats">
                  <span class="card-comments">
                    <Icon name="mdi:comment-outline" size="14" />
                    2
                  </span>
                  <span class="card-attachments">
                    <Icon name="mdi:paperclip" size="14" />
                    3
                  </span>
                </div>
              </div>
            </div>

            <!-- 카드 3 -->
            <div class="task-card">
              <div class="card-content">
                <p class="card-title">
                  업무명이 들어가는 공간입니다. 길어지면 잘려지면 어떨까요?
                </p>
              </div>

              <div class="card-footer">
                <span class="card-date">2023.03.12 - 2023.03.14</span>
                <div class="card-stats">
                  <span class="card-comments">
                    <Icon name="mdi:comment-outline" size="14" />
                    2
                  </span>
                  <span class="card-attachments">
                    <Icon name="mdi:paperclip" size="14" />
                    3
                  </span>
                </div>
              </div>
            </div>

            <!-- 카드 4 -->
            <div class="task-card">
              <div class="card-content">
                <p class="card-title">
                  업무명이 들어가는 공간입니다. 길어지면 잘려지면 어떨까요?
                </p>
              </div>

              <div class="card-footer">
                <span class="card-date">2023.03.12 - 2023.03.14</span>
                <div class="card-stats">
                  <span class="card-comments">
                    <Icon name="mdi:comment-outline" size="14" />
                    2
                  </span>
                  <span class="card-attachments">
                    <Icon name="mdi:paperclip" size="14" />
                    3
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 두 번째 카테고리 컬럼 - 빈 카드 + 추가 버튼 -->
        <div class="category-column">
          <div class="category-header">
            <h3 class="category-title">카테고리명이 들어가는 공간입니다.</h3>
            <div class="category-actions">
              <button class="card-add-btn">
                <Icon name="mdi:plus" size="16" />
              </button>
              <button class="category-menu-btn">
                <Icon name="mdi:dots-vertical" size="16" />
              </button>
            </div>
          </div>

          <div class="cards-container">
            <div class="empty-category">
              <div class="add-card-placeholder">
                <div class="add-placeholder-icon">
                  <Icon name="mdi:plus" size="24" />
                </div>
                <p>새 카드 추가하기</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 세 번째 카테고리 컬럼 -->
        <div class="category-column">
          <div class="category-header">
            <h3 class="category-title">카테고리명이 들어가는 공간입니다.</h3>
            <div class="category-actions">
              <button class="card-add-btn">
                <Icon name="mdi:plus" size="16" />
              </button>
              <button class="category-menu-btn">
                <Icon name="mdi:dots-vertical" size="16" />
              </button>
            </div>
          </div>

          <div class="cards-container">
            <!-- 카드 1 -->
            <div class="task-card">
              <div class="card-content">
                <p class="card-title">
                  업무명이 들어가는 공간입니다. 길어지면 잘려지면 어떨까요?
                </p>
              </div>

              <div class="card-footer">
                <span class="card-date">2023.03.12 - 2023.03.14</span>
                <div class="card-stats">
                  <span class="card-comments">
                    <Icon name="mdi:comment-outline" size="14" />
                    2
                  </span>
                  <span class="card-attachments">
                    <Icon name="mdi:paperclip" size="14" />
                    3
                  </span>
                </div>
              </div>
            </div>

            <!-- 카드 2 -->
            <div class="task-card">
              <div class="card-content">
                <p class="card-title">
                  업무명이 들어가는 공간입니다. 길어지면 잘려지면 어떨까요?
                </p>
              </div>

              <div class="card-footer">
                <span class="card-date">2023.03.12 - 2023.03.14</span>
                <div class="card-stats">
                  <span class="card-comments">
                    <Icon name="mdi:comment-outline" size="14" />
                    2
                  </span>
                  <span class="card-attachments">
                    <Icon name="mdi:paperclip" size="14" />
                    3
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 네 번째 카테고리 컬럼 -->
        <div class="category-column">
          <div class="category-header">
            <h3 class="category-title">카테고리명이 들어가는 공간입니다.</h3>
            <div class="category-actions">
              <button class="card-add-btn">
                <Icon name="mdi:plus" size="16" />
              </button>
              <button class="category-menu-btn">
                <Icon name="mdi:dots-vertical" size="16" />
              </button>
            </div>
          </div>

          <div class="cards-container">
            <!-- 카드 1 -->
            <div class="task-card">
              <div class="card-content">
                <p class="card-title">
                  업무명이 들어가는 공간입니다. 길어지면 잘려지면 어떨까요?
                </p>
              </div>

              <div class="card-footer">
                <span class="card-date">2023.03.12 - 2023.03.14</span>
                <div class="card-stats">
                  <span class="card-comments">
                    <Icon name="mdi:comment-outline" size="14" />
                    2
                  </span>
                  <span class="card-attachments">
                    <Icon name="mdi:paperclip" size="14" />
                    3
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 카테고리 추가 버튼 -->
        <div class="add-category-column">
          <div class="add-category-btn">
            <Icon name="mdi:plus" size="24" />
            <span>카테고리 추가</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 보드 추가 모달 -->
    <Modal
      v-model="isModalOpen"
      :title="modalTitle"
      @close="closeModal"
      position="right"
      noDim="true"
    >
      <UiInput v-model="modalTitle" label="보드 이름" />
    </Modal>
  </div>
</template>

<script setup>
import TaskBoardHeader from "~/components/Task/TaskBoardHeader.vue";
import UiButton from "~/components/UI/UiButton.vue";
import UiInput from "~/components/UI/UiInput.vue";
import Modal from "~/components/UI/UiModal.vue";

const isModalOpen = ref(false);
const modalTitle = ref("모달 제목");
</script>

<style scoped>
.task-board-page {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.board-content {
  flex: 1;
  overflow-x: auto;
}

.categories-container {
  display: flex;
  gap: 16px;
  min-height: calc(100vh - 160px);
}

.category-column {
  min-width: 350px;
  width: 350px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  max-height: 100%;
}

.category-header {
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  background-color: #f1f3f4;
}

.category-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #3c4043;
}

.category-actions {
  display: flex;
  gap: 4px;
}

.cards-container {
  padding: 8px;
  overflow-y: auto;
  flex: 1;
}

.task-card {
  background-color: white;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 8px;
}

.card-tag {
  background-color: #e8f0fe;
  color: #1a73e8;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
}

.card-content {
  margin-bottom: 8px;
}

.card-title {
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
  color: #202124;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #5f6368;
}

.card-stats {
  display: flex;
  gap: 8px;
}

.card-comments,
.card-attachments {
  display: flex;
  align-items: center;
  gap: 4px;
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
  justify-content: center;
  cursor: pointer;
  color: #5f6368;
  padding: 16px;
  border: 2px dashed #dadce0;
  border-radius: 8px;
  width: 100%;
  text-align: center;
}

.add-placeholder-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f1f3f4;
  margin-bottom: 8px;
}

.add-card-placeholder:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.add-category-column {
  min-width: 280px;
  width: 280px;
  display: flex;
  align-items: flex-start;
}

.add-category-btn {
  background-color: #f1f3f4;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  width: 100%;
  color: #5f6368;
  font-size: 14px;
}

.add-category-btn:hover {
  background-color: #e8eaed;
}
</style>
