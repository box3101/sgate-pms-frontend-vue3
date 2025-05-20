<template>
  <div
    class="ui-select ui-searchable-select"
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

    <!-- 드롭다운 부분 (검색창 + 옵션 목록) -->
    <div v-show="isOpen" class="ui-select__dropdown">
      <!-- 검색 입력창 -->
      <div class="ui-select__search-container">
        <input
          ref="searchInput"
          v-model="searchQuery"
          type="text"
          class="ui-select__search-input"
          placeholder="검색어를 입력하세요"
          @click.stop
        />
      </div>

      <!-- 옵션 목록 -->
      <div class="ui-select__options" role="listbox">
        <div
          v-for="option in filteredOptions"
          :key="option.value"
          class="ui-select__option"
          :class="{ 'ui-select__option--selected': selectedValue === option.value }"
          role="option"
          :aria-selected="selectedValue === option.value"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </div>
        <div v-if="filteredOptions.length === 0" class="ui-select__no-results">
          검색 결과가 없습니다
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

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
        { value: '6', label: '옵션 6' },
        { value: '7', label: '옵션 7' },
        { value: '8', label: '옵션 8' },
        { value: '9', label: '옵션 9' },
        { value: '10', label: '옵션 10' }
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
      validator: value => ['small', 'medium', 'large', 'xlarge'].includes(value)
    },
    width: {
      type: [String, Number],
      default: '150px'
    }
  })

  const emit = defineEmits(['update:modelValue', 'change'])

  // 상태 관리
  const isOpen = ref(false)
  const searchQuery = ref('')
  const selectedValue = ref(props.modelValue)
  const searchInput = ref(null)
  const uniqueId = ref(`select-${Math.random().toString(36).substr(2, 9)}`)

  // 선택된 옵션 객체
  const selectedOption = computed(() => {
    return props.options.find(option => option.value === selectedValue.value)
  })

  // 검색 필터링된 옵션
  const filteredOptions = computed(() => {
    if (!searchQuery.value) return props.options

    return props.options.filter(option =>
      option.label.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })

  // 드롭다운 토글
  const toggleDropdown = () => {
    if (props.disabled || props.viewOnly) return

    if (!isOpen.value) {
      // 다른 셀렉트 드롭다운을 닫기 위해 이벤트 발생
      window.dispatchEvent(
        new CustomEvent('select-dropdown-toggle', {
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
    searchQuery.value = ''
  }

  // 다른 셀렉트가 열릴 때 현재 셀렉트를 닫는 이벤트 핸들러
  const handleOtherSelectOpen = event => {
    if (event.detail.id !== uniqueId.value && isOpen.value) {
      isOpen.value = false
      searchQuery.value = ''
    }
  }

  // 외부 클릭 감지
  const handleClickOutside = event => {
    const select = event.target.closest('.ui-searchable-select')
    if (!select && isOpen.value) {
      isOpen.value = false
      searchQuery.value = ''
    }
  }

  // 드롭다운 열릴 때 검색창에 포커스
  watch(isOpen, newValue => {
    if (newValue) {
      setTimeout(() => {
        searchInput.value?.focus()
      }, 50)
    }
  })

  // 이벤트 리스너 등록 및 해제
  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    window.addEventListener('select-dropdown-toggle', handleOtherSelectOpen)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    window.removeEventListener('select-dropdown-toggle', handleOtherSelectOpen)
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

  .ui-select {
    height: $ui-height-md; // 36px
    position: relative;
    font-family: Pretendard;
    border-radius: 4px;
    border: 1px solid var(--color-gray-40, #8a949e);
    background: var(--color-gray-0, #fff);
    color: var(--color-gray-40, #8a949e);
    transition: all 0.2s ease;
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
      font-weight: 500;
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
      max-height: 300px;
      display: flex;
      flex-direction: column;
    }

    // 검색 컨테이너 스타일
    &__search-container {
      padding: 8px;
      border-bottom: 1px solid var(--color-gray-20, #cdd1d5);
      position: sticky;
      top: 0;
      background: #fff;
      z-index: 2;
    }

    // 검색 인풋 스타일
    &__search-input {
      width: 100%;
      border: 1px solid var(--color-gray-20, #cdd1d5);
      border-radius: 4px;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
      box-sizing: border-box;
      padding: 6px 8px;
      font-size: 14px;

      &:focus {
        border-color: var(--color-system-b30, #0084ff);
        box-shadow: 0 0 0 2px rgba(0, 132, 255, 0.1);
      }
    }

    // 옵션 스타일
    &__options {
      overflow-y: auto;
      max-height: 240px;
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
      padding: 12px;
      text-align: center;
      color: var(--color-gray-40, #8a949e);
      font-size: 16px;
      font-weight: 500;
    }

    // 크기 변형 - Small (32px)
    &--small {
      height: $ui-height-sm; // 32px
      
      .ui-select__header {
        height: $ui-height-sm; // 32px
        padding: 3px 9px;
      }

      .ui-select__option {
        padding: 3px 9px;
        font-size: 14px;
      }

      .ui-select__selected-text,
      .ui-select__placeholder {
        font-size: 14px;
      }

      .ui-select__search-input {
        padding: 3px 6px;
        font-size: 14px;
      }
    }

    // 크기 변형 - Medium (36px)
    &--medium {
      height: $ui-height-md; // 36px
      
      .ui-select__header {
        height: $ui-height-md; // 36px
        padding: 5px 12px;
      }

      .ui-select__option {
        padding: 5px 12px;
        font-size: 16px;
      }

      .ui-select__selected-text,
      .ui-select__placeholder {
        font-size: 16px;
        font-weight: 300;
      }

      .ui-select__search-input {
        padding: 5px 8px;
        font-size: 14px;
      }
    }

    // 크기 변형 - Large (40px)
    &--large {
      height: $ui-height-lg; // 40px
      
      .ui-select__header {
        height: $ui-height-lg; // 40px
        padding: 3px 12px;
      }

      .ui-select__option {
        padding: 6px 12px;
        font-size: 16px;
      }

      .ui-select__selected-text,
      .ui-select__placeholder {
        font-size: 16px;
      }

      .ui-select__search-input {
        padding: 6px 10px;
        font-size: 16px;
      }
    }

    // 크기 변형 - XLarge (40px)
    &--xlarge {
      height: $ui-height-lg; // 40px
      
      .ui-select__header {
        height: $ui-height-lg; // 40px
        padding: 4px 16px;
        border-radius: 4px;
      }

      .ui-select__option {
        padding: 8px 16px;
        font-size: 18px;
      }

      .ui-select__selected-text,
      .ui-select__placeholder {
        font-size: 18px;
      }

      .ui-select__search-input {
        padding: 8px 12px;
        font-size: 18px;
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

        .ui-select__search-input {
          padding: 5px 8px;
        }
      }

      &--medium {
        .ui-select__header {
          padding: 6px 12px;
        }

        .ui-select__search-input {
          padding: 6px 10px;
        }
      }

      &--large {
        .ui-select__header {
          padding: 8px 14px;
        }

        .ui-select__search-input {
          padding: 8px 12px;
        }
      }

      &--xlarge {
        .ui-select__header {
          padding: 10px 16px;
        }

        .ui-select__search-input {
          padding: 10px 14px;
        }
      }

      .ui-select__option {
        padding: 10px 12px;
        min-height: 44px;
      }
    }
  }
</style>
