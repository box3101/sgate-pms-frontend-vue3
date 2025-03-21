<template>
  <div class="filter-container">
    <UiButton @click="toggleFilterModal" ref="filterButton">필터 모달 열기</UiButton>

    <div v-if="isFilterModalOpen" class="filter-dropdown" :style="filterPosition">
      <!-- 여기에 필터 내용 -->
      <div class="filter-header">
        <h3> {{ title }} </h3>
        <button class="close-button" @click="closeFilterModal">×</button>
      </div>

      <div class="filter-body">
        <!-- 필터 컨텐츠 -->
         <slot />
      </div>

      <div class="filter-footer">
        <UiButton variant="secondary" @click="resetFilters">초기화</UiButton>
        <UiButton variant="primary" @click="applyFilters">적용</UiButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const isFilterModalOpen = ref(false);
const filterButton = ref(null);
const filterPosition = ref({});

defineProps({
  title: {
    type: String,
    default: '검색 필터'
  }
});


function toggleFilterModal() {
  isFilterModalOpen.value = !isFilterModalOpen.value;

  if (isFilterModalOpen.value) {
    // 버튼 위치 기준으로 모달 위치 계산
    nextTick(() => {
      const buttonRect = filterButton.value.getBoundingClientRect();
      filterPosition.value = {
        top: `${buttonRect.bottom + window.scrollY}px`,
        left: `${buttonRect.left + window.scrollX}px`
      };
    });
  }
}

function closeFilterModal() {
  isFilterModalOpen.value = false;
}

</script>

<style scoped>
.filter-container {
  position: relative;
}

.filter-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 300px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1000;
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
.filter-dropdown::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 16px; /* 버튼 위치에 맞게 조정 */
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid white;
}
</style>