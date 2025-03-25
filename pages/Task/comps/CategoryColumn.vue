<template>
  <li class="category-column">
    <div class="category-header">
      <h3 class="category-title">{{ title }}</h3>
      <div class="category-actions">
        <UiButton
          v-if="showAddButton"
          variant="tertiary"
          size="small"
          icon="heroicons:plus"
          @click="$emit('add-board')"
        >
          카드 추가
        </UiButton>
        <div>
          <button class="category-menu-btn" @click="openCategoryModal">
            <Icon name="mdi:dots-vertical" size="16" />
          </button>
          <!-- 카테고리 모달 -->
          <UiFilterModal
            v-model="isCategoryModalOpen"
            position="right"
            size="small"
            title="카테고리 추가"
            :hideHeader="true"
          >
            <UiAccordionMenu :menuItems="menuItems">
              <template #content-1>
                <UiSelect placeholder="제조공정" />
                <UiButton
                  class="mt-5"
                  variant="tertiary"
                  icon="heroicons:arrow-right"
                  icon-position="right"
                  block
                >
                  이동
                </UiButton>
              </template>

              <template #content-3>
                <div class="flex gap-5">
                  <UiInput
                    placeholder="조회 및 선택하세요"
                    icon="heroicons:magnifying-glass"
                  />
                  <UiButton variant="tertiary" icon-only>
                    <Icon name="heroicons:magnifying-glass" size="20" />
                  </UiButton>
                </div>
                <UiButton class="mt-5" variant="tertiary" block>
                  전달
                </UiButton>
              </template>
            </UiAccordionMenu>
          </UiFilterModal>
          <!-- 카테고리 모달 EEE -->
        </div>
      </div>
    </div>

    <!-- 카드 목록 -->
    <div class="cards-container">
      <slot></slot>
    </div>
  </li>
</template>

<script setup>
import UiButton from "~/components/UI/UiButton.vue";
import UiFilterModal from "~/components/UI/UiFilterModal.vue";
import UiAccordionMenu from "~/components/UI/UiAccordionMenu.vue";

// Props 정의
const props = defineProps({
  title: {
    type: String,
    default: "카테고리명이 들어가는 공간입니다.",
  },
  showAddButton: {
    type: Boolean,
    default: true,
  },
});

// 이벤트 정의
defineEmits(["add-board", "add-card", "open-menu"]);

// 아코디언 메뉴
const menuItems = [
  {
    title: "카테고리 이동",
    isAccordion: true,
    icon: "icon-name",
    action: () => {},
  },
  {
    title: "카테고리 삭제",
    isAccordion: false,
    icon: "icon-name",
    action: () => {},
  },
  {
    title: "카테고리 이동",
    isAccordion: true,
    icon: "icon-name",
    action: () => {},
  },
];

// 카테고리 모달
const isCategoryModalOpen = ref(false);

// 카테고리 모달 열기
function openCategoryModal() {
  isCategoryModalOpen.value = true;
}
</script>

<style scoped>
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
  width: 100%;
}

.category-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #3c4043;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.category-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.cards-container {
  overflow-y: auto;
  flex: 1;
}

.card-add-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.card-add-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.category-menu-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.category-menu-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
