<template>
  <div class="searchable-select" :class="{ 'is-open': isOpen }">
    <!-- 셀렉트 헤더 부분 (선택된 값 표시) -->
    <div
      class="select-header"
      @click="toggleDropdown"
      :tabindex="0"
      @keydown.enter="toggleDropdown"
      @keydown.space.prevent="toggleDropdown"
      role="combobox"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
    >
      <div class="select-value">
        <span v-if="selectedOption" class="selected-text">{{ selectedOption.label }}</span>
        <span v-else class="placeholder">옵션을 선택하세요</span>
      </div>
      <Icon
        :name="isOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'"
        class="select-icon"
        aria-hidden="true"
      />
    </div>

    <!-- 드롭다운 부분 (검색창 + 옵션 목록) -->
    <div v-show="isOpen" class="select-dropdown">
      <!-- 검색 입력창 -->
      <div class="search-container">
        <input
          ref="searchInput"
          v-model="searchQuery"
          type="text"
          class="search-input"
          placeholder="검색어를 입력하세요"
          @click.stop
        />
      </div>

      <!-- 옵션 목록 -->
      <div class="options-container" role="listbox">
        <div
          v-for="option in filteredOptions"
          :key="option.value"
          class="option-item"
          :class="{ 'is-selected': selectedValue === option.value }"
          role="option"
          :aria-selected="selectedValue === option.value"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </div>
        <div v-if="filteredOptions.length === 0" class="no-results">
          검색 결과가 없습니다
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

// 샘플 옵션 데이터
const options = [
  { value: '1', label: '옵션 1' },
  { value: '2', label: '옵션 2' },
  { value: '3', label: '옵션 3' },
  { value: '4', label: '옵션 4' },
  { value: '5', label: '옵션 5' },
  { value: '6', label: '옵션 6' },
  { value: '7', label: '옵션 7' },
  { value: '8', label: '옵션 8' },
  { value: '9', label: '옵션 9' },
  { value: '10', label: '옵션 10' },
];

// 상태 관리
const isOpen = ref(false);
const searchQuery = ref('');
const selectedValue = ref('');
const searchInput = ref(null);

// 선택된 옵션 객체
const selectedOption = computed(() => {
  return options.find(option => option.value === selectedValue.value);
});

// 검색 필터링된 옵션
const filteredOptions = computed(() => {
  if (!searchQuery.value) return options;

  return options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// 드롭다운 토글
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// 옵션 선택
const selectOption = (option) => {
  selectedValue.value = option.value;
  isOpen.value = false;
  searchQuery.value = '';
};

// 외부 클릭 감지
const handleClickOutside = (event) => {
  const select = event.target.closest('.searchable-select');
  if (!select && isOpen.value) {
    isOpen.value = false;
    searchQuery.value = '';
  }
};

// 드롭다운 열릴 때 검색창에 포커스
watch(isOpen, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      searchInput.value?.focus();
    }, 50);
  }
});

// 이벤트 리스너 등록 및 해제
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style lang="scss" scoped>
// 애니메이션 키프레임
@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// 기본 컴포넌트 스타일
.searchable-select {
  position: relative;
  width: 100%;

  // 헤더 스타일
  .select-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    border: 1px solid $border-color;
    border-radius: 4px;
    background-color: $background-color;
    cursor: pointer;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:hover {
      border-color: $border-hover-color;
    }

    &:focus {
      outline: none;
      border-color: $primary-color;
      box-shadow: 0 0 0 2px $primary-shadow;
    }
  }

  // 오픈 상태일 때 헤더 스타일
  &.is-open .select-header {
    border-color: $primary-color;
    box-shadow: 0 0 0 2px $primary-shadow;
  }

  // 값 영역 스타일
  .select-value {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: $text-color;
  }

  // 플레이스홀더 스타일
  .placeholder {
    color: $placeholder-color;
  }

  // 선택된 텍스트 스타일
  .selected-text {
    font-weight: 500;
  }

  // 아이콘 스타일
  .select-icon {
    width: 16px;
    height: 16px;
    margin-left: 8px;
    color: $icon-color;
    transition: transform 0.2s ease;
  }

  // 오픈 상태일 때 아이콘 회전
  &.is-open .select-icon {
    transform: rotate(180deg);
  }

  // 드롭다운 스타일
  .select-dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    width: 100%;
    background-color: $background-color;
    border: 1px solid $border-color;
    border-radius: 4px;
    box-shadow: 0 4px 12px $shadow-color;
    z-index: 100;
    max-height: 300px;
    display: flex;
    flex-direction: column;
    opacity: 0;
    transform: translateY(-10px);
    animation: dropdownFadeIn 0.2s ease forwards;
    overflow: hidden;
  }

  // 검색 컨테이너 스타일
  .search-container {
    padding: 8px;
    border-bottom: 1px solid $border-color;
    position: sticky;
    top: 0;
    background: $background-color;
    z-index: 2;
  }

  // 검색 인풋 스타일
  .search-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid $border-color;
    border-radius: 4px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:focus {
      border-color: $primary-color;
      box-shadow: 0 0 0 2px rgba($primary-color, 0.1);
    }
  }

  // 옵션 컨테이너 스타일
  .options-container {
    overflow-y: auto;
    max-height: 240px;
    overscroll-behavior: contain;
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: $scrollbar-color transparent;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: $scrollbar-color;
      border-radius: 6px;
    }
  }

  // 옵션 아이템 스타일
  .option-item {
    padding: 8px 12px;
    cursor: pointer;
    transition: background-color 0.15s;
    user-select: none;
    position: relative;

    &:hover {
      background-color: $hover-background;
    }

    &:active {
      background-color: $active-background;
    }

    &.is-selected {
      background-color: $selected-background;
      color: $primary-color;
      font-weight: 500;

      &:after {
        content: '';
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        width: 16px;
        height: 16px;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232196f3'%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z'/%3E%3C/svg%3E");
        background-size: contain;
        background-repeat: no-repeat;
      }
    }
  }

  // 결과 없음 메시지 스타일
  .no-results {
    padding: 16px;
    text-align: center;
    color: $placeholder-color;
    font-style: italic;
  }

  // 에러 상태 스타일
  &.error {
    .select-header {
      border-color: $error-color;
    }

    &:focus-within .select-header {
      box-shadow: 0 0 0 2px $error-shadow;
    }
  }

  // 비활성화 상태 스타일
  &.disabled {
    .select-header {
      background-color: $hover-background;
      cursor: not-allowed;
      opacity: 0.7;
    }
  }
}

// 반응형 디자인
@media (max-width: 768px) {
  .searchable-select {
    .select-header {
      padding: 10px;
    }

    .search-input {
      padding: 10px;
    }

    .option-item {
      padding: 12px;
    }
  }
}

// 터치 디바이스 최적화
@media (hover: none) {
  .searchable-select {
    .option-item {
      padding: 12px;
      min-height: 44px;
    }

    .options-container {
      max-height: 300px;
    }
  }
}
</style>