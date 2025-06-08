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

    <!-- Portal을 사용한 드롭다운 (body에 렌더링) -->
    <Teleport to="body" v-if="isOpen">
      <div
        class="ui-select__dropdown"
        :class="{ 'ui-select__dropdown--up': dropdownDirection === 'up' }"
        :style="dropdownStyles"
        ref="dropdownRef"
      >
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
    </Teleport>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'

  // 전역 이벤트 버스 생성
  const SELECT_EVENT_KEY = 'select-dropdown-toggle'
  const uniqueId = ref(`select-${Math.random().toString(36).substr(2, 9)}`)
  const selectRef = ref(null)
  const dropdownRef = ref(null)

  // 드롭다운 위치 관련 상태
  const dropdownDirection = ref('down')
  const dropdownStyles = ref({})

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
    },
    // 드롭다운 최대 높이 제어
    maxHeight: {
      type: [String, Number],
      default: 200
    },
    // 강제로 위쪽으로 열기
    forceUpward: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['update:modelValue', 'change'])

  // 상태 관리
  const isOpen = ref(false)
  const selectedValue = ref(props.modelValue)

  // 선택된 옵션 객체
  const selectedOption = computed(() => {
    return props.options.find(option => option.value === selectedValue.value)
  })

  // 드롭다운 위치 계산 함수
  const calculateDropdownPosition = () => {
    if (!selectRef.value) return

    const selectRect = selectRef.value.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const windowWidth = window.innerWidth

    // 예상 드롭다운 높이 계산
    const estimatedDropdownHeight = Math.min(
      props.options.length * 40 + 16, // 각 옵션 높이 + 패딩
      typeof props.maxHeight === 'number' ? props.maxHeight : parseInt(props.maxHeight)
    )

    // 아래쪽 공간과 위쪽 공간 계산
    const spaceBelow = windowHeight - selectRect.bottom - 8 // 8px 마진
    const spaceAbove = selectRect.top - 8 // 8px 마진

    // 드롭다운 방향 결정
    let direction = 'down'

    if (props.forceUpward) {
      direction = 'up'
    } else if (spaceBelow < estimatedDropdownHeight && spaceAbove > spaceBelow) {
      direction = 'up'
    }

    dropdownDirection.value = direction

    // 위치 스타일 계산
    const styles = {
      position: 'fixed',
      left: `${selectRect.left}px`,
      width: `${selectRect.width}px`,
      zIndex: 9999,
      maxHeight: `${props.maxHeight}px`
    }

    if (direction === 'up') {
      styles.bottom = `${windowHeight - selectRect.top + 4}px`
      styles.maxHeight = `${Math.min(
        spaceAbove,
        typeof props.maxHeight === 'number' ? props.maxHeight : parseInt(props.maxHeight)
      )}px`
    } else {
      styles.top = `${selectRect.bottom + 4}px`
      styles.maxHeight = `${Math.min(
        spaceBelow,
        typeof props.maxHeight === 'number' ? props.maxHeight : parseInt(props.maxHeight)
      )}px`
    }

    // 좌우 화면 벗어남 방지
    if (selectRect.right > windowWidth) {
      styles.right = '8px'
      delete styles.left
    }

    dropdownStyles.value = styles
  }

  // 드롭다운 토글
  const toggleDropdown = async () => {
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

    if (isOpen.value) {
      await nextTick()
      calculateDropdownPosition()

      // 윈도우 리사이즈 시 위치 재계산
      window.addEventListener('resize', calculateDropdownPosition)
      window.addEventListener('scroll', calculateDropdownPosition, true)
    } else {
      window.removeEventListener('resize', calculateDropdownPosition)
      window.removeEventListener('scroll', calculateDropdownPosition, true)
    }
  }

  // 옵션 선택
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

  // 문서 클릭 이벤트 핸들러
  const handleDocumentClick = event => {
    if (
      isOpen.value &&
      selectRef.value &&
      !selectRef.value.contains(event.target) &&
      dropdownRef.value &&
      !dropdownRef.value.contains(event.target)
    ) {
      isOpen.value = false
    }
  }

  // ESC 키로 드롭다운 닫기
  const handleKeydown = event => {
    if (event.key === 'Escape' && isOpen.value) {
      isOpen.value = false
      selectRef.value?.querySelector('.ui-select__header')?.focus()
    }
  }

  // modelValue 변경 감지
  watch(
    () => props.modelValue,
    newValue => {
      selectedValue.value = newValue
    }
  )

  // 드롭다운이 열릴 때마다 위치 재계산
  watch(isOpen, newValue => {
    if (newValue) {
      nextTick(() => calculateDropdownPosition())
    }
  })

  // 이벤트 리스너 등록 및 해제
  onMounted(() => {
    window.addEventListener(SELECT_EVENT_KEY, handleOtherSelectOpen)
    document.addEventListener('click', handleDocumentClick)
    document.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener(SELECT_EVENT_KEY, handleOtherSelectOpen)
    document.removeEventListener('click', handleDocumentClick)
    document.removeEventListener('keydown', handleKeydown)
    window.removeEventListener('resize', calculateDropdownPosition)
    window.removeEventListener('scroll', calculateDropdownPosition, true)
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

  @keyframes dropdownFadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
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
    border: 1px solid $border-color-light;
    background: var(--color-gray-0, #fff);
    color: var(--color-gray-40, #8a949e);
    transition: all $transition-normal ease;
    box-sizing: border-box;

    // 값이 입력되었을 때 스타일
    &--selected {
      border: 1px solid $border-color-filled;
    }

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
      color: var(--color-gray-30, #b1b8be);
      font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%;
    }

    &__selected-text {
      color: var(--color-gray-70, #464c53);
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

    // 크기 변형 - Small (32px)
    &--small {
      .ui-select__header {
        height: $ui-height-sm; // 32px
        padding: 3px 9px;
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

      .ui-select__selected-text,
      .ui-select__placeholder {
        position: relative;
        top: -1px;
        @include font-style($body-small);
      }
    }

    &--large {
      .ui-select__header {
        height: $ui-height-lg;
        padding: 3px 12px;
      }

      .ui-select__placeholder,
      .ui-select__selected-text {
        @include font-style($body-medium);
      }
    }

    // 크기 변형 - XLarge (40px)
    &--xlarge {
      .ui-select__header {
        height: $ui-height-lg; // 40px
        padding: 4px 16px;
        border-radius: 4px;
      }

      .ui-select__selected-text,
      .ui-select__placeholder {
        @include font-style($body-large-bold);
        font-size: $font-size-xxl;
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

<!-- 전역 스타일 (드롭다운은 body에 렌더링되므로 scoped 적용 안됨) -->
<style lang="scss">
  .ui-select__dropdown {
    background: #fff;
    border: 1px solid var(--color-gray-20, #cdd1d5);
    border-radius: 4px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    overflow-y: auto;
    animation: dropdownFadeIn 0.15s ease;

    &--up {
      animation: dropdownFadeInUp 0.15s ease;
    }

    // 스크롤바 스타일링
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 3px;

      &:hover {
        background: #a8a8a8;
      }
    }
  }

  .ui-select__options {
    width: 100%;
    padding: 4px 0;
  }

  .ui-select__option {
    padding: 8px 12px;
    cursor: pointer;
    transition: background-color 0.15s ease;
    font-size: 14px;
    line-height: 1.4;

    &:hover {
      background-color: var(--color-gray-10, #e6e8ea);
    }

    &--selected {
      background-color: var(--color-gray-10, #e6e8ea);
      color: var(--color-system-b30, #0084ff);
      font-weight: 500;
    }
  }

  .ui-select__no-results {
    padding: 12px;
    text-align: center;
    color: var(--color-gray-40, #8a949e);
    font-size: 14px;
    font-weight: 500;
  }
</style>
