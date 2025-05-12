<template>
  <div
    class="ui-multi-select"
    :class="[
      `ui-multi-select--${size}`,
      {
        'ui-multi-select--open': isOpen,
        'ui-multi-select--selected': selectedValues.length > 0,
        'ui-multi-select--error': error,
        'ui-multi-select--disabled': disabled,
        'ui-multi-select--view': viewOnly
      }
    ]"
    :style="{ width }"
  >
    <!-- 선택된 태그들 표시 영역 -->
    <div
      class="ui-multi-select__header"
      @click="toggleDropdown"
      :tabindex="disabled || viewOnly ? -1 : 0"
    >
      <div class="ui-multi-select__tags-container">
        <template v-if="selectedOptions.length > 0">
          <UiTag
            v-for="option in selectedOptions"
            :key="option.value"
            :text="option.label"
            :variant="tagVariant"
            size="small"
            closable
            @close="removeOption(option)"
          />
        </template>
        <div v-else class="ui-multi-select__placeholder">
          {{ placeholder }}
        </div>
      </div>
      <i class="ui-multi-select__icon" :class="{ 'ui-multi-select__icon--up': isOpen }"></i>
    </div>

    <!-- 드롭다운 메뉴 -->
    <div v-show="isOpen" class="ui-multi-select__dropdown">
      <div class="ui-multi-select__options">
        <div
          v-for="option in options"
          :key="option.value"
          class="ui-multi-select__option"
          :class="{ 'ui-multi-select__option--selected': isSelected(option) }"
          @click.stop="toggleOption(option)"
        >
          <span class="ui-multi-select__checkbox">
            <input type="checkbox" :checked="isSelected(option)" @click.stop />
            <span class="ui-multi-select__checkmark"></span>
          </span>
          {{ option.label }}
        </div>
        <div v-if="options.length === 0" class="ui-multi-select__no-results">옵션이 없습니다</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

  const props = defineProps({
    options: {
      type: Array,
      default: () => []
      // 각 옵션은 { value: 'value', label: '표시될 텍스트' } 형태
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: '선택하세요'
    },
    tagVariant: {
      type: String,
      default: 'primary'
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
      default: '100%'
    }
  })

  const emit = defineEmits(['update:modelValue'])

  const isOpen = ref(false)
  const selectedValues = ref([...props.modelValue])
  const uniqueId = ref(`multi-select-${Math.random().toString(36).substr(2, 9)}`)

  // 선택된 옵션들을 계산
  const selectedOptions = computed(() => {
    return props.options.filter(option => selectedValues.value.includes(option.value))
  })

  // 옵션이 선택되었는지 확인
  const isSelected = option => {
    return selectedValues.value.includes(option.value)
  }

  // 옵션 토글 (선택/해제)
  const toggleOption = option => {
    if (props.disabled || props.viewOnly) return

    const index = selectedValues.value.indexOf(option.value)
    if (index === -1) {
      // 선택되지 않은 경우 추가
      selectedValues.value.push(option.value)
    } else {
      // 이미 선택된 경우 제거
      selectedValues.value.splice(index, 1)
    }
    emit('update:modelValue', selectedValues.value)
  }

  // 옵션 제거
  const removeOption = option => {
    if (props.disabled || props.viewOnly) return

    const index = selectedValues.value.indexOf(option.value)
    if (index !== -1) {
      selectedValues.value.splice(index, 1)
      emit('update:modelValue', selectedValues.value)
    }
  }

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

  // 다른 셀렉트가 열릴 때 현재 셀렉트를 닫는 이벤트 핸들러
  const handleOtherSelectOpen = event => {
    if (event.detail.id !== uniqueId.value && isOpen.value) {
      isOpen.value = false
    }
  }

  // 외부 클릭 시 드롭다운 닫기
  const closeDropdown = event => {
    const multiSelect = event.target.closest('.ui-multi-select')
    if (!multiSelect && isOpen.value) {
      isOpen.value = false
    }
  }

  // 모델 값 변경 시 내부 상태 업데이트
  watch(
    () => props.modelValue,
    newValue => {
      selectedValues.value = [...newValue]
    },
    { deep: true }
  )

  // 컴포넌트 마운트 시 이벤트 리스너 추가
  onMounted(() => {
    document.addEventListener('click', closeDropdown)
    window.addEventListener('select-dropdown-toggle', handleOtherSelectOpen)
  })

  // 컴포넌트 언마운트 시 이벤트 리스너 제거
  onBeforeUnmount(() => {
    document.removeEventListener('click', closeDropdown)
    window.removeEventListener('select-dropdown-toggle', handleOtherSelectOpen)
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

  .ui-multi-select {
    position: relative;
    width: v-bind('width');
    font-family: $font-family;
    border-radius: $border-radius-sm;
    border: 1px solid var(--color-gray-40, #8a949e);
    background: var(--color-gray-0, #fff);
    color: var(--color-gray-40, #8a949e);
    transition: all $transition-normal ease;
    box-sizing: border-box;
    height: max-content;

    // 아이콘 스타일
    &__icon {
      width: 12px;
      height: 8px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M11 1.5L6 6.5L1 1.5' stroke='%23464C53' stroke-width='2'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: center;
      transition: transform 0.2s ease;
      margin-left: 8px;

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

    // 태그 컨테이너 스타일
    &__tags-container {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      gap: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    // 플레이스홀더 스타일
    &__placeholder {
      color: var(--color-gray-30, #B1B8BE);
      font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%;
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
      display: flex;
      align-items: center;
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

    // 체크박스 스타일
    &__checkbox {
      position: relative;
      display: inline-flex;
      align-items: center;
      margin-right: 8px;

      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }

      .ui-multi-select__checkmark {
        position: relative;
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 1px solid var(--color-gray-30, #b1b8be);
        border-radius: 2px;
        background-color: #fff;

        &:after {
          content: '';
          position: absolute;
          display: none;
          left: 5px;
          top: 2px;
          width: 4px;
          height: 8px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
      }

      input:checked ~ .ui-multi-select__checkmark {
        background-color: var(--color-system-b30, #0084ff);
        border-color: var(--color-system-b30, #0084ff);

        &:after {
          display: block;
        }
      }
    }

    // 결과 없음 메시지 스타일
    &__no-results {
      padding: 12px;
      text-align: center;
      color: var(--color-gray-40, #8a949e);
      font-size: $font-size-md;
      font-weight: 500;
    }

    // 크기 변형 - Small (32px)
    &--small {
      .ui-multi-select__header {
        min-height: $ui-height-sm; // 32px
        padding: 3px 9px;
      }

      .ui-multi-select__option {
        padding: 3px 9px;
        font-size: $font-size-xs;
      }

      .ui-multi-select__placeholder {
        @include font-style($body-small);
      }
    }

    // 크기 변형 - Medium (36px)
    &--medium {
      .ui-multi-select__header {
        height: $ui-height-md - 2px; // 36px
        padding: 3px 12px;
        // box-sizing: border-box;
      }

      .ui-multi-select__option {
        padding: 3px 12px;
        font-size: $font-size-md;
      }

      .ui-multi-select__placeholder {
        position: relative;
        top: -1px;
        @include font-style($body-small);
      }
    }

    // 크기 변형 - Large (40px)
    &--large {
      .ui-multi-select__header {
        min-height: $ui-height-lg; // 40px
        padding: 3px 12px;
      }

      .ui-multi-select__option {
        padding: 6px 12px;
        font-size: $font-size-md;
      }

      .ui-multi-select__placeholder {
        @include font-style($body-large-bold);
      }
    }

    // 크기 변형 - XLarge (40px)
    // 크기 변형 - Large
    &--large {
      .ui-multi-select__header {
        height: $ui-height-lg;
        padding: 3px 12px;
      }
      
      .ui-multi-select__option {
        padding: 6px 12px;
        font-size: $font-size-lg;
      }
      
      .ui-multi-select__placeholder,
      .ui-multi-select__tags-container {
        @include font-style($body-medium);
      }
    }
    
    &--xlarge {
      .ui-multi-select__header {
        height: $ui-height-lg; // 40px
        padding: 4px 16px;
        border-radius: 4px;
      }

      .ui-multi-select__option {
        padding: 8px 16px;
        font-size: $font-size-lg;
      }

      .ui-multi-select__placeholder {
        @include font-style($body-xlarge-bold);
        font-size: $font-size-xl;
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
      box-shadow: 0 0 0 4px rgba(255, 51, 0, 0.1);
    }

    &--disabled {
      border: 1px solid var(--color-gray-20, #cdd1d5);
      background: var(--color-gray-10, #e6e8ea);
      color: var(--color-gray-30, #b1b8be);
      cursor: not-allowed;

      .ui-multi-select__header {
        pointer-events: none;
      }
    }

    &--view {
      border: 1px solid var(--color-gray-20, #cdd1d5);
      background: var(--color-gray-10, #e6e8ea);
      color: var(--color-gray-70, #464c53);
      cursor: default;

      .ui-multi-select__header {
        pointer-events: none;
      }
    }

    // 모바일 스타일 최적화
    @media (max-width: 768px) {
      &--small {
        .ui-multi-select__header {
          padding: 3px 10px;
        }
      }

      &--medium {
        .ui-multi-select__header {
          padding: 6px 12px;
        }
      }

      &--large,
      &--xlarge {
        .ui-multi-select__header {
          padding: 8px 16px;
        }
      }

      .ui-multi-select__option {
        padding: 12px;
        min-height: 44px;
      }
    }
  }
</style>
