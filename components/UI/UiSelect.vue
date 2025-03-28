<template>
  <div class="simple-select" :class="{ 'is-open': isOpen, 'size-small': size === 'small', 'size-medium': size === 'medium', 'size-large': size === 'large' }">
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
        <span v-else class="placeholder">{{ placeholder }}</span>
      </div>
      <Icon
        :name="isOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'"
        class="select-icon"
        aria-hidden="true"
      />
    </div>

    <!-- 드롭다운 부분 (옵션 목록) -->
    <div v-show="isOpen" class="select-dropdown">
      <!-- 옵션 목록 -->
      <div class="options-container" role="listbox">
        <div
          v-for="option in options"
          :key="option.value"
          class="option-item"
          :class="{ 'is-selected': selectedValue === option.value }"
          role="option"
          :aria-selected="selectedValue === option.value"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </div>
        <div v-if="options.length === 0" class="no-results">
          옵션이 없습니다
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

// 전역 이벤트 버스 생성 (다른 셀렉트 컴포넌트와 통신하기 위함)
const SELECT_EVENT_KEY = 'select-dropdown-toggle';

const props = defineProps({
  placeholder: {
    type: String,
    default: '선택하세요'
  },
  options: {
    type: Array,
    default: () => [
      { value: '1', label: '옵션 1' },
      { value: '2', label: '옵션 2' },
      { value: '3', label: '옵션 3' },
      { value: '4', label: '옵션 4' },
      { value: '5', label: '옵션 5' },
    ]
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  }
});

const emit = defineEmits(['update:modelValue', 'change']);

// 상태 관리
const isOpen = ref(false);
const selectedValue = ref(props.modelValue);
const uniqueId = ref(`select-${Math.random().toString(36).substr(2, 9)}`);

// 선택된 옵션 객체
const selectedOption = computed(() => {
  return props.options.find(option => option.value === selectedValue.value);
});

// 드롭다운 토글
const toggleDropdown = () => {
  if (props.disabled) return;

  if (!isOpen.value) {
    // 다른 셀렉트 드롭다운을 닫기 위해 이벤트 발생
    window.dispatchEvent(new CustomEvent(SELECT_EVENT_KEY, {
      detail: { id: uniqueId.value }
    }));
  }

  isOpen.value = !isOpen.value;
};

// 옵션 선택
const selectOption = (option) => {
  selectedValue.value = option.value;
  emit('update:modelValue', option.value);
  emit('change', option);
  isOpen.value = false;
};

// 다른 셀렉트가 열릴 때 현재 셀렉트를 닫는 이벤트 핸들러
const handleOtherSelectOpen = (event) => {
  if (event.detail.id !== uniqueId.value && isOpen.value) {
    isOpen.value = false;
  }
};

// 외부 클릭 감지
const handleClickOutside = (event) => {
  const select = event.target.closest('.simple-select');
  if (!select && isOpen.value) {
    isOpen.value = false;
  }
};

// 이벤트 리스너 등록 및 해제
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener(SELECT_EVENT_KEY, handleOtherSelectOpen);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener(SELECT_EVENT_KEY, handleOtherSelectOpen);
});

// modelValue 변경 감지
watch(() => props.modelValue, (newValue) => {
  selectedValue.value = newValue;
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
.simple-select {
  position: relative;
  width: 100%;

  // 사이즈 변형
  &.size-small {
    .select-header {
      padding: 4px 8px;
      font-size: 0.875rem;
    }

    .option-item {
      padding: 4px 8px;
      font-size: 0.875rem;
    }

    .select-icon {
      width: 14px;
      height: 14px;
    }
  }

  &.size-medium {
    .select-header {
      padding: 7px 12px;
      font-size: 1rem;
    }

    .option-item {
      padding: 7px 12px;
      font-size: 1rem;
    }
  }

  &.size-large {
    .select-header {
      padding: 12px 16px;
      font-size: 1.125rem;
    }

    .option-item {
      padding: 12px 16px;
      font-size: 1.125rem;
    }

    .select-icon {
      width: 18px;
      height: 18px;
    }
  }

  // 헤더 스타일
  .select-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:hover {
      border-color: #bbb;
    }

    &:focus {
      outline: none;
      border-color: #2196f3;
      box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
    }
  }

  // 오픈 상태일 때 헤더 스타일
  &.is-open .select-header {
    border-color: #2196f3;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
  }

  // 값 영역 스타일
  .select-value {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #333;
  }

  // 플레이스홀더 스타일
  .placeholder {
    color: #999;
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
    color: #666;
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
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 100;
    max-height: 300px;
    display: flex;
    flex-direction: column;
    opacity: 0;
    transform: translateY(-10px);
    animation: dropdownFadeIn 0.2s ease forwards;
    overflow: hidden;
  }

  // 옵션 컨테이너 스타일
  .options-container {
    overflow-y: auto;
    max-height: 240px;
    overscroll-behavior: contain;
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: #ccc transparent;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ccc;
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
      background-color: #f5f5f5;
    }

    &:active {
      background-color: #eee;
    }

    &.is-selected {
      background-color: #e3f2fd;
      color: #2196f3;
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
    color: #999;
    font-style: italic;
  }

  // 비활성화 상태 스타일
  &.disabled {
    .select-header {
      background-color: #f5f5f5;
      cursor: not-allowed;
      opacity: 0.7;
    }
  }
}

// 반응형 디자인
@media (max-width: 768px) {
  .simple-select {
    .select-header {
      padding: 10px;
    }

    .option-item {
      padding: 12px;
    }
  }
}

// 터치 디바이스 최적화
@media (hover: none) {
  .simple-select {
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
        top: 50%;
        transform: translateY(-50%);
        width: 16px;
        height: 16px;