<template>
  <div
    class="ui-select"
    :class="[
      `size-${size}`,
      {
        'is-open': isOpen,
        'is-selected': selectedValue,
        'is-error': error,
        'is-disabled': disabled,
        'is-view': viewOnly
      }
    ]"
  >
    <!-- 셀렉트 헤더 부분 (선택된 값 표시) -->
    <div
      class="select-header"
      @click="toggleDropdown"
      :tabindex="disabled || viewOnly ? -1 : 0"
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
      <i :class="['select-icon', { 'select-icon-up': isOpen }]"></i>
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
        <div v-if="options.length === 0" class="no-results">옵션이 없습니다</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

  // 전역 이벤트 버스 생성 (다른 셀렉트 컴포넌트와 통신하기 위함)
  const SELECT_EVENT_KEY = 'select-dropdown-toggle'

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
        { value: '5', label: '옵션 5' }
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
    viewOnly: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    width: {
      type: [String, Number],
      default: '150px'
    }
  })

  const emit = defineEmits(['update:modelValue', 'change'])

  // 상태 관리
  const isOpen = ref(false)
  const selectedValue = ref(props.modelValue)
  const uniqueId = ref(`select-${Math.random().toString(36).substr(2, 9)}`)

  // 선택된 옵션 객체
  const selectedOption = computed(() => {
    return props.options.find(option => option.value === selectedValue.value)
  })

  // 드롭다운 토글
  const toggleDropdown = () => {
    if (props.disabled || props.viewOnly) return

    if (!isOpen.value) {
      // 다른 셀렉트 드롭다운을 닫기 위해 이벤트 발생
      window.dispatchEvent(
        new CustomEvent(SELECT_EVENT_KEY, {
          detail: { id: uniqueId.value }
        })
      )
    }

    isOpen.value = !isOpen.value
  }

  // 옵션 선택
  const selectOption = option => {
    if (props.disabled || props.viewOnly) return

    selectedValue.value = option.value
    emit('update:modelValue', option.value)
    emit('change', option)
    isOpen.value = false
  }

  // 다른 셀렉트가 열릴 때 현재 셀렉트를 닫는 이벤트 핸들러
  const handleOtherSelectOpen = event => {
    if (event.detail.id !== uniqueId.value && isOpen.value) {
      isOpen.value = false
    }
  }

  // 외부 클릭 감지
  const handleClickOutside = event => {
    const select = event.target.closest('.ui-select')
    if (!select && isOpen.value) {
      isOpen.value = false
    }
  }

  // 이벤트 리스너 등록 및 해제
  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    window.addEventListener(SELECT_EVENT_KEY, handleOtherSelectOpen)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    window.removeEventListener(SELECT_EVENT_KEY, handleOtherSelectOpen)
  })

  // modelValue 변경 감지
  watch(
    () => props.modelValue,
    newValue => {
      selectedValue.value = newValue
    }
  )
</script>

<style lang="scss" scoped>
  @use 'sass:color';

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

  .select-icon {
    width: 12px !important;
    height: 8px !important;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M11 1.5L6 6.5L1 1.5' stroke='%23464C53' stroke-width='2'/%3E%3C/svg%3E");
    transition: transform 0.2s ease;
  }

  .select-icon-up {
    transform: rotate(180deg);
  }

  .ui-select {
    position: relative;
    width: v-bind('width');
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
    border-radius: 4px;
    border: 1px solid var(--color-gray-40, #8a949e);
    background: var(--color-gray-0, #fff);
    color: var(--color-gray-40, #8a949e);

    // 사이즈별 스타일
    &.size-small {
      .select-header {
        display: flex;
        width: 100%;
        padding: 3px 8px;
        justify-content: space-between;
        align-items: center;
      }

      .option-item {
        padding: 3px 8px;
        font-size: 14px;
      }
    }

    &.size-medium {
      .select-header {
        display: flex;
        width: 100%;
        height: 30px;
        padding: 4px 8px;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;
      }

      .option-item {
        padding: 4px 8px;
        font-size: 16px;
      }
    }

    &.size-large {
      .select-header {
        display: flex;
        width: 100%;
        padding: 8px;
        justify-content: space-between;
        align-items: center;
      }

      .select-icon {
        width: 18px;
        height: 18px;
      }

      .option-item {
        padding: 8px;
        font-size: 16px;
      }
    }

    // 상태별 스타일
    &.is-selected {
      border: 1px solid var(--color-gray-60, #58616a);
      color: var(--color-gray-70, #464c53);
    }

    &.is-open {
      border: 1px solid var(--color-system-b30, #0084ff);
      color: var(--color-gray-70, #464c53);
    }

    &.is-error {
      border: 1px solid var(--color-system-r30, #f30);
      color: var(--color-gray-70, #464c53);
    }

    &.is-disabled {
      border: 1px solid var(--color-gray-20, #cdd1d5);
      background: var(--color-gray-10, #e6e8ea);
      color: var(--color-gray-30, #b1b8be);
      cursor: not-allowed;

      .select-header {
        pointer-events: none;
      }
    }

    &.is-view {
      border: 1px solid var(--color-gray-20, #cdd1d5);
      background: var(--color-gray-10, #e6e8ea);
      color: var(--color-gray-70, #464c53);
      cursor: default;

      .select-header {
        pointer-events: none;
      }
    }
  }

  // 셀렉트 헤더 스타일
  .select-header {
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--color-system-b30, #0084ff);
    }
  }

  // 선택된 값 및 플레이스홀더 스타일
  .select-value {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .placeholder {
    color: var(--color-gray-40, #8a949e);
    font-size: $font-size-md;
  }

  .selected-text {
    color: var(--color-gray-70, #464c53);
    font-size: $font-size-md;
  }

  // 드롭다운 스타일
  .select-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 100;
    background: #fff;
    border: 1px solid var(--color-gray-20, #cdd1d5);
    border-radius: 4px;
    margin-top: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    animation: dropdownFadeIn 0.2s ease;
    max-height: 200px;
    overflow-y: auto;
  }

  // 옵션 컨테이너 스타일
  .options-container {
    width: 100%;
  }

  // 옵션 아이템 스타일
  .option-item {
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: var(--color-gray-10, #e6e8ea);
    }

    &.is-selected {
      background-color: var(--color-gray-10, #e6e8ea);
      color: var(--color-system-b30, #0084ff);
      font-weight: 500;
    }
  }

  // 결과 없음 메시지 스타일
  .no-results {
    padding: 8px;
    text-align: center;
    color: var(--color-gray-40, #8a949e);
  }

  // 모바일 스타일 최적화
  @media (hover: none) {
    .ui-select {
      .option-item {
        padding: 12px;
        min-height: 44px;
      }
    }
  }
</style>
