<template>
  <div
    class="ui-select"
    :class="[
      `ui-select--${size}`,
      {
        'ui-select--open': isOpen,
        'ui-select--selected': selectedValue,
        'ui-select--error': error,
        'ui-select--disabled': disabled,
        'ui-select--view': viewOnly
      }
    ]"
    :style="{ width }"
    ref="selectRef"
  >
    <!-- 셀렉트 헤더 부분 (선택된 값 표시) -->
    <div
      class="ui-select__header"
      @click="toggleDropdown"
      :tabindex="disabled || viewOnly ? -1 : 0"
      role="combobox"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
    >
      <div class="ui-select__value">
        <span v-if="selectedOption" class="ui-select__selected-text">{{
          selectedOption.label
        }}</span>
        <span v-else class="ui-select__placeholder">{{ placeholder }}</span>
      </div>
      <i class="ui-select__icon" :class="{ 'ui-select__icon--up': isOpen }"></i>
    </div>

    <!-- 드롭다운 부분 (옵션 목록) -->
    <div v-show="isOpen" class="ui-select__dropdown">
      <div class="ui-select__options" role="listbox">
        <div
          v-for="option in options"
          :key="option.value"
          class="ui-select__option"
          :class="{ 'ui-select__option--selected': selectedValue === option.value }"
          role="option"
          :aria-selected="selectedValue === option.value"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </div>
        <div v-if="options.length === 0" class="ui-select__no-results">옵션이 없습니다</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'

  // 전역 이벤트 버스 생성 (다른 셀렉트 컴포넌트와 통신하기 위함)
  const SELECT_EVENT_KEY = 'select-dropdown-toggle'
  const uniqueId = ref(`select-${Math.random().toString(36).substr(2, 9)}`)
  const selectRef = ref(null)

  const props = defineProps({
    placeholder: {
      type: String,
      default: '선택하세요'
    },
    options: {
      type: Array,
      default: () => []
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
      validator: value => ['small', 'medium', 'large', 'xlarge'].includes(value)
    },
    width: {
      type: [String, Number],
      default: '100%'
    }
  })

  const emit = defineEmits(['update:modelValue', 'change'])

  // 상태 관리 (퍼블리싱 데모용)
  const isOpen = ref(false)
  const selectedValue = ref(props.modelValue)

  // 선택된 옵션 객체 (퍼블리싱 데모용)
  const selectedOption = computed(() => {
    return props.options.find(option => option.value === selectedValue.value)
  })

  // 드롭다운 토글 (퍼블리싱 데모용)
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

  // 옵션 선택 (퍼블리싱 데모용)
  const selectOption = option => {
    if (props.disabled || props.viewOnly) return
    selectedValue.value = option.value
    emit('update:modelValue', option.value)
    emit('change', option.value)
    isOpen.value = false
  }

  // 다른 셀렉트가 열릴 때 현재 셀렉트를 닫는 이벤트 핸들러
  const handleOtherSelectOpen = event => {
    if (event.detail.id !== uniqueId.value && isOpen.value) {
      isOpen.value = false
    }
  }

  // 문서 클릭 이벤트 핸들러 - 셀렉트 외부 클릭 시 드롭다운 닫기
  const handleDocumentClick = event => {
    // 셀렉트가 열려있고, 클릭된 요소가 현재 셀렉트 컴포넌트의 하위 요소가 아닌 경우
    if (isOpen.value && selectRef.value && !selectRef.value.contains(event.target)) {
      isOpen.value = false
    }
  }

  // 이벤트 리스너 등록 및 해제
  onMounted(() => {
    window.addEventListener(SELECT_EVENT_KEY, handleOtherSelectOpen)
    document.addEventListener('click', handleDocumentClick)
  })

  onUnmounted(() => {
    window.removeEventListener(SELECT_EVENT_KEY, handleOtherSelectOpen)
    document.removeEventListener('click', handleDocumentClick)
  })
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

  .ui-select {
    position: relative;
    font-family: $font-family;
    border-radius: $border-radius-sm;
    border: 1px solid var(--color-gray-40, #8a949e);
    background: var(--color-gray-0, #fff);
    color: var(--color-gray-40, #8a949e);
    transition: all $transition-normal ease;
    box-sizing: border-box;

    // 아이콘 스타일
    &__icon {
      width: 12px;
      height: 8px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M11 1.5L6 6.5L1 1.5' stroke='%23464C53' stroke-width='2'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: center;
      transition: transform 0.2s ease;

      &--up {
        transform: rotate(180deg);
      }
    }

    // 헤더 스타일
    &__header {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      box-sizing: border-box;

      &:focus {
        outline: none;
      }
    }

    // 값 스타일
    &__value {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__placeholder {
      color: var(--color-gray-40, #8a949e);
    }

    &__selected-text {
      color: var(--color-gray-70, #464c53);
    }

    // 드롭다운 스타일
    &__dropdown {
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

    // 옵션 스타일
    &__options {
      width: 100%;
    }

    &__option {
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: var(--color-gray-10, #e6e8ea);
      }

      &--selected {
        background-color: var(--color-gray-10, #e6e8ea);
        color: var(--color-system-b30, #0084ff);
        font-weight: 500;
      }
    }

    &__no-results {
      padding: 8px;
      text-align: center;
      color: var(--color-gray-40, #8a949e);
      font-size: $font-size-sm;
    }

    // 크기 변형 - Small (32px)
    &--small {
      .ui-select__header {
        height: $ui-height-sm; // 32px
        padding: 3px 9px;
      }

      .ui-select__option {
        padding: 3px 9px;
        font-size: $font-size-xs;
      }

      .ui-select__selected-text,
      .ui-select__placeholder {
        @include font-style($body-xsmall-bold);
      }
    }

    // 크기 변형 - Medium (36px)
    &--medium {
      .ui-select__header {
        height: $ui-height-md; // 36px
        padding: 5px 12px;
      }

      .ui-select__option {
        padding: 5px 12px;
        font-size: $font-size-md;
      }

      .ui-select__selected-text,
      .ui-select__placeholder {
        position: relative;
        top: -1px;
        @include font-style($body-small);
      }
    }

    // 크기 변형 - Large (40px)
    &--large {
      .ui-select__header {
        height: $ui-height-lg; // 40px
        padding: 3px 12px;
      }

      .ui-select__option {
        padding: 6px 12px;
        font-size: $font-size-md;
      }

      .ui-select__selected-text,
      .ui-select__placeholder {
        @include font-style($body-large-bold);
      }
    }

    // 크기 변형 - XLarge (40px)
    &--xlarge {
      .ui-select__header {
        height: $ui-height-lg; // 40px
        padding: 4px 16px;
        border-radius: 4px;
      }

      .ui-select__option {
        padding: 8px 16px;
        font-size: $font-size-lg;
      }

      .ui-select__selected-text,
      .ui-select__placeholder {
        @include font-style($body-large-bold);
        font-size: $font-size-xxl;
      }
    }

    // 상태 변형
    &--open {
      border: 1px solid var(--color-system-b30, #0084ff);
      color: var(--color-gray-70, #464c53);
    }

    &--selected {
      border: 1px solid var(--color-gray-60, #58616a);
      color: var(--color-gray-70, #464c53);
    }

    &--error {
      border: 1px solid var(--color-system-r30, #f30);
      color: var(--color-gray-70, #464c53);
    }

    &--disabled {
      border: 1px solid var(--color-gray-20, #cdd1d5);
      background: var(--color-gray-10, #e6e8ea);
      color: var(--color-gray-30, #b1b8be);
      cursor: not-allowed;

      .ui-select__header {
        pointer-events: none;
      }
    }

    &--view {
      border: 1px solid var(--color-gray-20, #cdd1d5);
      background: var(--color-gray-10, #e6e8ea);
      color: var(--color-gray-70, #464c53);
      cursor: default;

      .ui-select__header {
        pointer-events: none;
      }
    }

    // 반응형 스타일
    @media (max-width: 768px) {
      &--small {
        .ui-select__header {
          padding: 5px 10px;
        }
      }

      &--medium {
        .ui-select__header {
          padding: 6px 12px;
        }
      }

      &--large {
        .ui-select__header {
          padding: 8px 14px;
        }
      }

      &--xlarge {
        .ui-select__header {
          padding: 10px 16px;
        }
      }
    }
  }
</style>
