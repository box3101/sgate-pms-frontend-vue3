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
          @add-board="openCardModal(category.id)"
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
              @click="openCardDetail"
            />
          </div>
          <!-- 카드가 없는 경우 -->
          <div v-else>
            <div class="empty-category">
              <div class="add-card-placeholder" @click="openCardModal(category.id)">
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

    <!-- ================== 카드 추가 모달 ================== -->
    <UiModal v-model="isCardModalOpen" position="right" title="카드 추가">
      <template #headerActions>
        <button class="edit-title-btn">
          <Icon name="mdi:pencil" size="16" />
        </button>
      </template>
      <UiAccordionMenu :menuItems="menuItems" inline>
        <!-- 카드 기본 정보 -->
        <template #content-1>
          <UiFormLayout :showFooter="true">
            <UiFormItem label="카테고리">
              <UiSelect placeholder="업무 보드명입니다." v-model="selectedCategoryId" />
            </UiFormItem>
            <UiFormItem label="실행기간">
              <UiDatePicker isRange v-model="executePeriod" />
            </UiFormItem>
            <UiFormItem label="협업">
              <div class="flex gap-5">
                <UiMultiSelect
                  placeholder="협업자 이름을 입력해주세요"
                  :options="departmentOptions"
                  v-model="selectedCooperators"
                />
                <UiButton variant="secondary" icon-only @click="openOrganizationUserSelector">
                  <Icon name="heroicons:user" size="20" />
                </UiButton>
                <UiButton variant="secondary" icon-only>
                  <Icon name="heroicons:magnifying-glass" size="20" />
                </UiButton>
              </div>
            </UiFormItem>
            <UiFormItem label="공유">
              <div class="flex gap-5">
                <UiMultiSelect
                  placeholder="공유자 이름을 입력해주세요"
                  :options="departmentOptions"
                  v-model="selectedSharers"
                />
                <UiButton variant="secondary" icon-only>
                  <Icon name="heroicons:user" size="20" />
                </UiButton>
                <UiButton variant="secondary" icon-only>
                  <Icon name="heroicons:magnifying-glass" size="20" />
                </UiButton>
              </div>
            </UiFormItem>
            <UiFormItem label="내용">
              <UiTextarea
                placeholder="업무에 대한 구체적인 내용을 입력해주세요."
                v-model="cardContent"
              />
            </UiFormItem>
            <template #footerActions>
              <div class="flex gap-5 justify-end">
                <UiButton @click="saveCard">등록</UiButton>
                <UiButton variant="secondary" @click="isCardModalOpen = false">취소</UiButton>
              </div>
            </template>
          </UiFormLayout>
        </template>
        <!-- 활동 내용 -->
        <template #content-2>
          <div class="activity-content">
            <div class="flex justify-between gap-5 mb-4">
              <div class="flex gap-10 items-center">
                <p class="flex-none">일자</p>
                <UiDatePicker placeholder="날짜 선택" v-model="activityDate" />
              </div>
              <div class="flex gap-20 items-center">
                <p class="flex-none">업무상태</p>
                <UiSelect placeholder="선택하세요" class="w-200" v-model="activityStatus" />
                <p class="flex-none">진행만족도</p>
                <UiSelect placeholder="선택하세요" class="w-200" v-model="activitySatisfaction" />
              </div>
            </div>
            <div
              class="editor-container mt-10 my-4"
              style="height: 200px; border: 1px solid #141212"
            ></div>
            <div
              class="flex justify-between items-center mt-20 pt-10"
              style="border-top: 1px solid #eee"
            >
              <button class="attachment-btn" @click="openAttachmentModal">
                <Icon name="heroicons:paper-clip" size="20" />
              </button>
              <UiButton variant="primary" @click="saveCard">저장</UiButton>
            </div>
          </div>
        </template>
      </UiAccordionMenu>
    </UiModal>

    <!-- ================== 카드 상세 모달 ================== -->
    <UiModal v-model="isCardDetailOpen" position="right" title="카드 상세" size="medium">
      <template #headerActions>
        <button class="edit-title-btn">
          <Icon name="mdi:pencil" size="16" />
        </button>
      </template>
      <UiAccordionMenu :menuItems="menuItems">
        <!-- 카드 기본 정보 -->
        <template #content-1>
          <UiFormLayout :showFooter="true">
            <UiFormItem label="카테고리">
              <UiSelect placeholder="업무 보드명입니다." />
            </UiFormItem>
            <UiFormItem label="실행기간">
              <UiDatePicker isRange />
            </UiFormItem>
            <UiFormItem label="협업">
              <div class="flex gap-5">
                <UiMultiSelect
                  placeholder="협업자 이름을 입력해주세요"
                  :options="[
                    { label: '마케팅팀', value: 'marketing' },
                    { label: '개발팀', value: 'development' },
                    { label: '디자인팀', value: 'design' }
                  ]"
                />
                <UiButton variant="secondary" icon-only @click="openOrganizationUserSelector">
                  <Icon name="heroicons:user" size="20" />
                </UiButton>
                <UiButton variant="secondary" icon-only>
                  <Icon name="heroicons:magnifying-glass" size="20" />
                </UiButton>
              </div>
            </UiFormItem>
            <UiFormItem label="공유">
              <div class="flex gap-5">
                <UiMultiSelect
                  placeholder="공유자 이름을 입력해주세요"
                  :options="[
                    { label: '마케팅팀', value: 'marketing' },
                    { label: '개발팀', value: 'development' },
                    { label: '디자인팀', value: 'design' }
                  ]"
                />
                <UiButton variant="secondary" icon-only>
                  <Icon name="heroicons:user" size="20" />
                </UiButton>
                <UiButton variant="secondary" icon-only>
                  <Icon name="heroicons:magnifying-glass" size="20" />
                </UiButton>
              </div>
            </UiFormItem>
            <UiFormItem label="내용">
              <UiTextarea placeholder="업무에 대한 구체적인 내용을 입력해주세요." />
            </UiFormItem>
            <template #footerActions>
              <div class="flex gap-5 justify-end">
                <UiButton @click="saveCard">등록</UiButton>
                <UiButton variant="secondary" @click="isCardModalOpen = false">취소</UiButton>
              </div>
            </template>
          </UiFormLayout>
        </template>
        <!-- 활동 내용 -->
        <template #content-2>
          <div class="activity-content">
            <div class="flex justify-between gap-5 mb-4">
              <div class="flex gap-10 items-center">
                <p class="flex-none">일자</p>
                <UiDatePicker placeholder="날짜 선택" />
              </div>
              <div class="flex gap-20 items-center">
                <p class="flex-none">업무상태</p>
                <UiSelect
                  placeholder="선택하세요"
                  class="w-200"
                  :options="[
                    { label: '시작 전', value: 'not_started' },
                    { label: '진행 중', value: 'in_progress' },
                    { label: '완료', value: 'completed' }
                  ]"
                />
                <p class="flex-none">진행만족도</p>
                <UiSelect
                  placeholder="선택하세요"
                  class="w-200"
                  :options="[
                    { label: '매우 만족', value: 'very_satisfied' },
                    { label: '만족', value: 'satisfied' },
                    { label: '보통', value: 'neutral' },
                    { label: '불만족', value: 'dissatisfied' }
                  ]"
                />
              </div>
            </div>
            <div
              class="editor-container mt-10 my-4"
              style="height: 200px; border: 1px solid #141212"
            ></div>
            <div
              class="flex justify-between items-center mt-20 pt-10"
              style="border-top: 1px solid #eee"
            >
              <button class="attachment-btn" @click="openAttachmentModal">
                <Icon name="heroicons:paper-clip" size="20" />
              </button>
              <UiButton variant="primary" @click="saveCard">저장</UiButton>
            </div>
          </div>
        </template>
      </UiAccordionMenu>
    </UiModal>

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

  // ================== 상태 변수 ==================
  // 카테고리 목록 데이터 (예시)
  const isFirstVisit = ref(true)
  const isCardModalOpen = ref(false)
  const isCardDetailOpen = ref(false)
  const selectedCategoryId = ref(0)
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

  // 아코디언 메뉴
  const menuItems = [
    {
      title: '속성',
      isAccordion: true,
      initialOpen: false,
      items: [],
      action: () => {}
    },
    {
      title: '활동',
      isAccordion: true,
      initialOpen: true,
      items: [],
      action: () => {}
    }
  ]

  // ================== 함수 ==================

  // 새 카테고리 추가
  function addNewCategory() {
    categories.value.push({
      id: categories.value.length + 1,
      title: '카테고리 ' + (categories.value.length + 1),
      cards: []
    })
  }

  // 카드 열기
  function openCardModal(categoryId) {
    selectedCategoryId.value = categoryId - 1
    isCardModalOpen.value = true
  }

  // 카드 저장
  function saveCard() {
    categories.value[selectedCategoryId.value].cards.push({
      id: categories.value[selectedCategoryId.value].cards.length + 1,
      title:
        '테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자',
      tags: ['중요'],
      date: '2025-04-17',
      comments: 2,
      attachments: 1
    })
    isCardModalOpen.value = false
  }

  // 카드 상세 열기
  function openCardDetail() {
    isCardDetailOpen.value = true
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
