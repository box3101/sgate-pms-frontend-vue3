<template>
  <div class="filter-container">
    <div v-if="isFilterModalOpen" class="filter-overlay" @click="closeFilterModal"></div>
    <div
      v-if="isFilterModalOpen"
      class="filter-dropdown"
      :style="filterPosition"
      :class="{
        'right-aligned': position === 'right',
        'left-aligned': position === 'left',
        'filter-dropdown--small': size === 'small',
        'filter-dropdown--medium': size === 'medium',
        'filter-dropdown--large': size === 'large',
      }"
    >
      <div v-if="!hideHeader" class="filter-header">
        <h3>{{ title }}</h3>
        <button class="close-button" @click="closeFilterModal">×</button>
      </div>

      <div class="filter-body">
        <slot />
      </div>

      <div v-if="showFooter" class="filter-footer">
        <slot name="footerActions" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, watch } from "vue";

const isFilterModalOpen = ref(false);
const filterPosition = ref({});

const props = defineProps({
  title: {
    type: String,
    default: "검색 필터",
  },
  position: {
    type: String,
    default: "left",
    validator: (value) => ["left", "right"].includes(value),
  },
  showFooter: {
    type: Boolean,
    default: false,
  },
  hideHeader: {
    type: Boolean,
    default: false,
  },
  targetRef: {
    type: Object,
    default: null,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "medium",
    validator: (value) => ["small", "medium", "large"].includes(value),
  },
});

const emit = defineEmits(["reset", "apply", "update:modelValue"]);

// v-model 지원을 위한 양방향 바인딩
watch(
  () => props.modelValue,
  (newValue) => {
    isFilterModalOpen.value = newValue;
    if (newValue) {
      updatePosition();
    }
  }
);

watch(isFilterModalOpen, (newValue) => {
  emit("update:modelValue", newValue);
});

function toggleFilterModal() {
  isFilterModalOpen.value = !isFilterModalOpen.value;

  if (isFilterModalOpen.value) {
    updatePosition();
  }
}

function updatePosition() {
  if (!props.targetRef) return;

  nextTick(() => {

    if (props.position === "right") {
      // 오른쪽 정렬일 경우
      filterPosition.value = {
        top: `10px`,
        right: `0`,
      };
    } else {
      // 왼쪽 정렬일 경우 (기본값)
      filterPosition.value = {
        top: `10px`,
        left: `0`,
      };
    }
  });
}

function closeFilterModal() {
  isFilterModalOpen.value = false;
}

function resetFilters() {
  emit("reset");
  closeFilterModal();
}

function applyFilters() {
  emit("apply");
  closeFilterModal();
}

// 외부에서 접근 가능한 메소드 노출
defineExpose({
  toggleFilterModal,
  closeFilterModal,
});
</script>

<style>
.filter-wrp {
  display: inline-block;
}
</style>
<style scoped>
.filter-container {
  position: relative;
}
.filter-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
}
.filter-dropdown {
  position: absolute;
  top: 100%;
  min-width: 400px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.filter-dropdown--small {
  min-width: 300px;
}

.filter-dropdown--medium {
  min-width: 400px;
}

.filter-dropdown--large {
  min-width: 700px;
}

.left-aligned {
  left: 0;
}

.right-aligned {
  right: 0;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
}

.filter-body {
  padding: 16px;
}

.filter-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid #eee;
}

/* 삼각형 화살표 추가 (선택사항) */
.filter-dropdown.left-aligned::before {
  content: "";
  position: absolute;
  top: -8px;
  left: 3px; /* 왼쪽 정렬일 때 화살표 위치 */
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid white;
}

.filter-dropdown.right-aligned::before {
  content: "";
  position: absolute;
  top: -8px;
  right: 3px; /* 오른쪽 정렬일 때 화살표 위치 */
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid white;
}
</style>
