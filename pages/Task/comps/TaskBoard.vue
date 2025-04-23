<template>
  <div class="task-board-page">
    <!-- 업무 보드 헤더 -->
    <TaskBoardHeader />

    <!-- 카테고리 및 카드 목록 -->
    <section class="board-content">
      <ul class="categories-container">
        <!-- 카테고리 없는 경우 -->
        <div v-if="isFirstVisit" class="empty-category full">
          <div class="welcome-message">
            <p>환영합니다.</p>
            <p>업무등록을 위한 보드를 생성해보세요.</p>
            <UiButton variant="primary" class="create-board-btn" @click="isFirstVisit = false">
              업무 보드 생성하기
            </UiButton>
          </div>
        </div>

        <!-- 카테고리 있는 경우 -->
        <CategoryColumn
          v-for="category in categories"
          :key="category.id"
          :title="category.title"
          @add-board="handleAddCard(category.id)"
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
              :cardId="card.id"
              @click="handleOpenCardDetail(card)"
              @openInNewWindow="detachCardModal(card)"
            />
          </div>
          <!-- 카드가 없는 경우 -->
          <div v-else>
            <div class="empty-category">
              <div class="add-card-placeholder" @click="handleAddCard(category.id)">
                <div class="add-placeholder-icon">
                  <Icon name="mdi:plus" size="50" />
                </div>
                <p>
                  해당 카테고리의 <br />
                  첫 업무카드를 등록해보세요.
                </p>
              </div>
            </div>
          </div>
        </CategoryColumn>

        <!-- 카테고리 추가 버튼 (카테고리가 1개 이상일 때만) -->
        <li class="category-column" v-if="!isFirstVisit">
          <div class="category-header">
            <div class="category-actions w-full gap-24">
              <UiInput class="w-full" placeholder="카테고리명을 입력하세요." />
              <UiButton variant="ghost" icon-only="" @click="addNewCategory">
                <i class="icon icon-md icon-plus"></i>
              </UiButton>
            </div>
          </div>
        </li>
      </ul>
    </section>

    <!-- ================== 공통 모달 매니저 ================== -->
    <!-- 카드 추가/상세/첨부/직원찾기 팝업 모두 포함 -->
    <!-- <CommonModal ref="modalRef" @save-card="handleSaveCard" /> -->
  </div>
</template>

<script setup>
  /**
   * TaskBoard 업무 보드 페이지
   * - 카테고리, 카드 목록 및 각종 모달(카드 추가/상세/첨부/직원찾기) 제어
   * - 공통 모달 매니저([pages/common/modal.vue])를 import하여 모든 모달을 통합 관리
   * - 퍼블리셔 중심 상세 주석 및 SCSS 구조
   */
  import { ref } from 'vue'
  // UI 및 도메인 컴포넌트 import
  import TaskBoardHeader from './TaskBoardHeader.vue'
  import CategoryColumn from './CategoryColumn.vue'
  import CategoryCard from './CategoryCard.vue'
  import UiButton from '@/components/UI/UiButton.vue'
  import CommonModal from '~/pages/modal/modal.vue' // 공통 모달 매니저 import

  // ================== 상태 변수 ==================
  // 카테고리 목록 데이터 (예시)
  const isFirstVisit = ref(true)
  const categories = ref([
    // 예시 데이터: 실제로는 API 연동 또는 상위에서 관리
    // {
    //   id: 1,
    //   title: '예시 카테고리',
    //   cards: [
    //     { id: 1, title: '카드1', tags: ['중요'], date: '2025-04-17', comments: 2, attachments: 1 }
    //   ]
    // }
  ])
  // 라이프 사이클 변화때 마다 보고싶어
  console.log('카테고리 상태 변화:', categories.value)

  // 공통 모달 매니저 ref
  const modalRef = ref(null)

  // ================== 함수 ==================

  // 새 카테고리 추가
  function addNewCategory() {
    categories.value.push({
      id: categories.value.length + 1,
      title: '카테고리 ' + (categories.value.length + 1),
      cards: []
    })
  }

  // 이미 있는 handleSaveCard 함수 수정
  function handleSaveCard(cardData) {
    // cardData에서 필요한 정보 추출
    const { categoryId, title, tags, date } = cardData

    // 해당 카테고리 찾기
    const categoryIndex = categories.value.findIndex(cat => cat.id === categoryId)

    if (categoryIndex !== -1) {
      // 해당 카테고리에 카드 추가
      categories.value[categoryIndex].cards.push({
        id: Date.now(), // 임시 ID
        title: title,
        tags: tags || [],
        date: date || new Date().toISOString().split('T')[0],
        comments: 0,
        attachments: 0
      })
    }
  }

  // 카드 추가(카드 추가 모달 열기)
  function handleAddCard(categoryId) {
    // 공통 모달 매니저의 openCardModal 함수 호출
    modalRef.value.openCardModal({ categoryId })
  }

  // 카드 상세(카드 상세 모달 열기)
  function handleOpenCardDetail(card) {
    modalRef.value.openCardDetail(card)
  }
</script>

<style lang="scss" scoped>
  :deep(.modal-buttons) {
    display: none !important;
  }
  .task-board-page {
    min-height: calc(100vh - 132px);
  }
  .board-content {
    margin-top: 24px;
  }
  .categories-container {
    display: flex;
    gap: 24px;
    list-style: none;
    padding: 0;
  }
  .empty-category.full {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  }
  .welcome-message {
    text-align: center;
    color: #888;
    p {
      margin: 0 0 8px 0;
    }
  }
  .create-board-btn {
    margin-top: 16px;
  }
  .add-card-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 32px 0;
    color: #bbb;
    border-radius: 4px;
    border: 1px solid var(--color-gray-20, #cdd1d5);
    background: var(--color-gray-0, #fff);
    .add-placeholder-icon {
      margin-bottom: 8px;
    }
    &:hover {
      color: #333;
    }
  }
</style>
