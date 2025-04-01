<template>
  <div class="task-card-wrapper">
    <!-- 딤 배경 -->
    <div
      v-if="showFilterMenu"
      class="dim-background"
      @click.stop="closeFilterMenu"
    ></div>

    <div
      class="task-card"
      @click="handleCardClick"
      @contextmenu.prevent="showContextMenu"
    >
      <!-- 카드 상단 액션 버튼 영역 추가 -->
      <div class="card-actions">
        <button class="action-btn favorite-btn" @click.stop="toggleFavorite">
          <Icon
            :name="isFavorite ? 'mdi:star' : 'mdi:star-outline'"
            size="16"
            :class="{ 'star-active': isFavorite }"
          />
        </button>
        <button class="action-btn filter-btn" @click.stop="openFilterModal">
          <Icon name="mdi:dots-vertical" size="16" />
        </button>
      </div>

      <!-- 필터 모달 -->
      <UiFilterModal
        v-model="showFilterMenu"
        position="right"
        size="small"
        title="업무 메뉴"
        :hideHeader="true"
        @click.stop
      >
        <div @click.stop>
          <UiAccordionMenu :menuItems="menuItems">
            <template #content-1>
              <div @click.stop>
                <UiSelect placeholder="제조공정" />
                <UiSelect class="mt-5" placeholder="업무유형" />
                <UiButton
                  class="mt-5"
                  variant="tertiary"
                  icon="heroicons:arrow-right"
                  icon-position="right"
                  block
                  @click.stop
                >
                  이동
                </UiButton>
              </div>
            </template>

            <template #content-2>
              <div @click.stop>
                <div class="flex gap-5">
                  <UiInput
                    placeholder="조회 및 선택하세요"
                    icon="heroicons:magnifying-glass"
                  />
                  <UiButton variant="tertiary" icon-only @click.stop>
                    <Icon name="heroicons:magnifying-glass" size="20" />
                  </UiButton>
                </div>
                <UiButton class="mt-5" variant="tertiary" block @click.stop>
                  전달
                </UiButton>
              </div>
            </template>

            <template #content-3>
              <div @click.stop>
                <p class="mb-9">업무 합치기 대상 선택</p>
                <UiSelect placeholder="업무" />
                <UiSelect class="mt-5" placeholder="업무2" />
                <UiSelect class="mt-5" placeholder="업무3" />
                <UiButton class="mt-5" variant="tertiary" block @click.stop>
                  합치기
                </UiButton>
              </div>
            </template>
          </UiAccordionMenu>
        </div>
      </UiFilterModal>

      <div v-if="tags && tags.length > 0" class="card-tags">
        <UiTag
          v-for="(tag, index) in tags"
          :key="index"
          :text="tag"
          v-bind="getTagProps(tag)"
          size="small"
        />
      </div>

      <div class="card-content">
        <p class="card-title">{{ title }}</p>
      </div>

      <div class="card-footer">
        <div class="card-stats">
          <span class="card-comments">
            <Icon name="mdi:comment-outline" size="14" />
            {{ comments || 0 }}
          </span>
          <span class="card-attachments">
            <Icon name="mdi:paperclip" size="14" />
            {{ attachments || 0 }}
          </span>
        </div>
        <span class="card-date">{{ date }}</span>
      </div>

      <!-- 컨텍스트 메뉴 -->
      <div v-if="showMenu" class="card-context-menu" :style="menuPosition">
        <div class="menu-item" @click.stop="openInNewWindow">
          <Icon name="mdi:open-in-new" size="16" />
          <span>새 창으로 열기</span>
        </div>
        <div class="menu-item" @click.stop="closeMenu">
          <Icon name="mdi:close" size="16" />
          <span>닫기</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import UiTag from "~/components/UI/UiTag.vue";
import UiAccordion from "~/components/UI/UiAccordion.vue";
import UiAccordionMenu from "~/components/UI/UiAccordionMenu.vue";
import UiFilterModal from "~/components/UI/UiFilterModal.vue";
import UiButton from "~/components/UI/UiButton.vue";
import UiInput from "~/components/UI/UiInput.vue";
import UiSelect from "~/components/UI/UiSelect.vue";
import UiFormLayout from "~/components/UI/UiFormLayout.vue";
import UiFormItem from "~/components/UI/UiFormItem.vue";
import { ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "업무명이 들어가는 공간입니다.",
  },
  tags: {
    type: Array,
    default: () => [],
  },
  date: {
    type: String,
    default: "",
  },
  comments: {
    type: Number,
    default: 0,
  },
  attachments: {
    type: Number,
    default: 0,
  },
  cardId: {
    type: [Number, String],
    required: true,
  },
  // 즐겨찾기 상태 prop 추가
  favorite: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "click",
  "openInNewWindow",
  "toggleFavorite",
  "taskAction",
]);

// 컨텍스트 메뉴 관련 상태
const showMenu = ref(false);
const menuPosition = ref({ top: "0px", left: "0px" });

// 즐겨찾기 상태 추적
const isFavorite = ref(props.favorite);

// 필터 메뉴 상태
const showFilterMenu = ref(false);

// 아코디언 메뉴 아이템 정의
const menuItems = [
  {
    title: "업무 이동",
    isAccordion: true,
  },
  {
    title: "업무 전달",
    isAccordion: true,
  },
  {
    title: "업무 합치기",
    isAccordion: true,
  },
  {
    title: "업무 삭제",
    isAccordion: false,
    icon: "mdi:delete-outline",
    action: () => handleTaskAction("delete"),
  },
];

// 카드 클릭 핸들러
function handleCardClick(event) {
  // 필터 메뉴가 열려있으면 클릭 이벤트 무시
  if (showFilterMenu.value) {
    return;
  }

  // Shift 키를 누른 상태로 클릭하면 새 창으로 열기
  if (event.shiftKey) {
    openInNewWindow();
    return;
  }

  // 일반 클릭은 부모 컴포넌트에 이벤트 전달
  emit("click", props.cardId);
}

// 컨텍스트 메뉴 표시
function showContextMenu(event) {
  // 메뉴 위치 설정
  menuPosition.value = {
    top: `${event.offsetY}px`,
    left: `${event.offsetX}px`,
  };

  // 메뉴 표시
  showMenu.value = true;

  // 문서 클릭 시 메뉴 닫기 이벤트 리스너 추가
  document.addEventListener("click", closeMenu, { once: true });

  // 기본 컨텍스트 메뉴 방지
  event.preventDefault();
}

// 메뉴 닫기
function closeMenu() {
  showMenu.value = false;
}

// 새 창으로 열기
function openInNewWindow() {
  emit("openInNewWindow", props.cardId);
  closeMenu();
}

// 즐겨찾기 토글 함수
function toggleFavorite() {
  isFavorite.value = !isFavorite.value;
  emit("toggleFavorite", props.cardId, isFavorite.value);
}

// 필터 메뉴 열기
function openFilterModal() {
  showFilterMenu.value = true;
}

// 필터 메뉴 닫기
function closeFilterMenu() {
  showFilterMenu.value = false;
}

// 업무 액션 처리 함수
function handleTaskAction(action, subAction = null) {
  emit("taskAction", {
    cardId: props.cardId,
    action,
    subAction,
  });
  closeFilterMenu();
}

// 태그 내용에 따라 다른 색상 속성을 반환하는 함수
function getTagProps(tag) {
  // 태그 내용에 따라 다른 색상 변형 적용
  const tagLower = tag.toLowerCase();

  // 기본 변형 사용
  if (tagLower.includes("디자인")) return { variant: "primary" };
  if (tagLower.includes("ui") || tagLower.includes("ux"))
    return { variant: "info" };
  if (tagLower.includes("테스트")) return { variant: "warning" };
  if (tagLower.includes("버그") || tagLower.includes("오류"))
    return { variant: "danger" };
  if (tagLower.includes("완료") || tagLower.includes("성공"))
    return { variant: "success" };

  // 커스텀 색상 사용
  if (tagLower.includes("프론트엔드")) {
    return {
      variant: "custom",
      backgroundColor: "#61dafb",
      textColor: "#003545",
      borderColor: "#61dafb",
    };
  }

  if (tagLower.includes("백엔드")) {
    return {
      variant: "custom",
      backgroundColor: "#6c5ce7",
      textColor: "white",
      borderColor: "#6c5ce7",
    };
  }

  if (tagLower.includes("모바일")) {
    return {
      variant: "custom",
      backgroundColor: "#fdcb6e",
      textColor: "#805b00",
      borderColor: "#fdcb6e",
    };
  }

  if (tagLower.includes("시스템")) {
    return {
      variant: "custom",
      backgroundColor: "#00b894",
      textColor: "white",
      borderColor: "#00b894",
    };
  }

  // 기본값
  return { variant: "default" };
}
</script>

<style lang="scss" scoped>
@use "sass:color";

.task-card-wrapper {
  position: relative;
}

.task-card {
  margin-top: 10px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #fff;
  position: relative;
  cursor: pointer;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  // 카드 액션 버튼 스타일
  .card-actions {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    gap: 4px;
    z-index: 99;

    .action-btn {
      background: none;
      border: none;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6b7280;
      transition: all 0.2s ease;

      &:hover {
        background-color: #f3f4f6;
        color: #374151;
      }

      &.favorite-btn {
        &:hover {
          color: #f59e0b;
        }

        .star-active {
          color: #f59e0b;
        }
      }
    }

    // 필터 메뉴 스타일
    .filter-menu {
      position: absolute;
      top: 100%;
      right: 0;
      width: 240px;
      background-color: white;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      padding: 8px;
      z-index: 9999;
    }
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 8px;
  }

  .card-title {
    font-weight: 500;
    margin: 8px 0;
    line-height: 1.4;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    font-size: 12px;
    color: #6b7280;
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

  .card-date {
    font-size: 11px;
  }

  // 컨텍스트 메뉴 스타일
  .card-context-menu {
    position: absolute;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    z-index: 9999;
    min-width: 150px;

    .menu-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      cursor: pointer;

      &:hover {
        background-color: #f3f4f6;
      }
    }
  }
}

// 딤 배경 스타일
.dim-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 998;
}

:deep(.task-card .right-aligned) {
  right: -9px;
  top: 21px;
}
</style>
