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
        'ui-multi-select--view': viewOnly,
        'ui-multi-select--focused': isFocused
      }
    ]"
    :style="{ width }"
  >
    <!-- Selectize 스타일 입력 영역 -->
    <div class="ui-multi-select__control" @click="focusInput">
      <!-- 선택된 협업자 태그들 -->
      <div class="ui-multi-select__tags">
        <div v-for="option in selectedOptions" :key="option.value" class="ui-multi-select__tag">
          <div class="ui-multi-select__tag-avatar">
            <img
              v-if="option.avatar"
              :src="option.avatar"
              :alt="option.label"
              class="ui-multi-select__avatar-image"
            />
          </div>
          <span class="ui-multi-select__tag-label">{{ option.label }}</span>
          <button
            v-if="!disabled && !viewOnly"
            class="ui-multi-select__tag-remove"
            @click.stop="removeOption(option)"
            type="button"
          >
            ×
          </button>
        </div>

        <!-- 검색 입력 필드 -->
        <div class="ui-multi-select__input-wrapper">
          <input
            ref="searchInput"
            v-model="searchQuery"
            class="ui-multi-select__input"
            :placeholder="selectedOptions.length === 0 ? placeholder : ''"
            :disabled="disabled || viewOnly"
            @focus="handleFocus"
            @keydown="handleKeydown"
            @input="handleInput"
            @keyup="handleInput"
            @compositionupdate="handleInput"
            autocomplete="off"
          />
        </div>
      </div>

      <!-- 로딩 스피너 또는 드롭다운 아이콘 -->
      <div class="ui-multi-select__indicators">
        <div v-if="loading" class="ui-multi-select__spinner"></div>
        <i
          v-else
          class="ui-multi-select__icon"
          :class="{ 'ui-multi-select__icon--up': isOpen }"
        ></i>
      </div>
    </div>

    <!-- 드롭다운 메뉴 -->
    <div v-show="isOpen" class="ui-multi-select__dropdown">
      <!-- 검색 결과가 없을 때 -->
      <div v-if="filteredOptions.length === 0 && searchQuery" class="ui-multi-select__no-results">
        <div class="ui-multi-select__no-results-icon">🔍</div>
        <div class="ui-multi-select__no-results-text">
          "{{ searchQuery }}"에 대한 검색 결과가 없습니다
        </div>
      </div>

      <!-- 옵션이 없을 때 -->
      <div v-else-if="options.length === 0 && !searchQuery" class="ui-multi-select__empty">
        <div class="ui-multi-select__empty-icon">👥</div>
        <div class="ui-multi-select__empty-text">협업자를 추가해보세요</div>
      </div>

      <!-- 협업자 옵션 목록 -->
      <div v-else class="ui-multi-select__options">
        <div
          v-for="(option, index) in filteredOptions"
          :key="option.value"
          class="ui-multi-select__option"
          :class="{
            'ui-multi-select__option--selected': isSelected(option),
            'ui-multi-select__option--highlighted': highlightedIndex === index
          }"
          @click.stop="toggleOption(option)"
          @mouseenter="highlightedIndex = index"
        >
          <!-- 협업자 정보 -->
          <div class="ui-multi-select__option-info">
            <div class="ui-multi-select__option-name">{{ option.label }}</div>
            <div v-if="option.email" class="ui-multi-select__option-email">{{ option.email }}</div>
            <div v-if="option.department" class="ui-multi-select__option-department">
              {{ option.department }}
            </div>
          </div>

          <!-- 선택 체크박스 -->
          <div class="ui-multi-select__option-checkbox">
            <div
              class="ui-multi-select__checkbox"
              :class="{ 'ui-multi-select__checkbox--checked': isSelected(option) }"
            >
              <svg
                v-if="isSelected(option)"
                viewBox="0 0 16 16"
                class="ui-multi-select__check-icon"
              >
                <path
                  d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'

  const props = defineProps({
    options: {
      type: Array,
      default: () => []
      // 각 옵션은 { value: 'value', label: '이름', email: '이메일', department: '부서' } 형태
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: '협업자 이름을 입력해주세요'
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
    loading: {
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

  const emit = defineEmits(['update:modelValue', 'search', 'focus', 'blur'])

  const isOpen = ref(false)
  const isFocused = ref(false)
  const selectedValues = ref([...props.modelValue])
  const searchQuery = ref('')
  const highlightedIndex = ref(-1)
  const searchInput = ref(null)
  const uniqueId = ref(`multi-select-${Math.random().toString(36).substr(2, 9)}`)

  // 선택된 옵션들을 계산
  const selectedOptions = computed(() => {
    return props.options.filter(option => selectedValues.value.includes(option.value))
  })

  // 필터링된 옵션들을 계산
  const filteredOptions = computed(() => {
    if (!searchQuery.value) return props.options

    const query = searchQuery.value.toLowerCase()
    return props.options.filter(option => {
      return (
        option.label.toLowerCase().includes(query) ||
        (option.email && option.email.toLowerCase().includes(query)) ||
        (option.department && option.department.toLowerCase().includes(query))
      )
    })
  })

  // 이니셜 생성 함수
  const getInitials = name => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2)
  }

  // 옵션이 선택되었는지 확인
  const isSelected = option => {
    return selectedValues.value.includes(option.value)
  }

  // 옵션 토글 (선택/해제)
  const toggleOption = option => {
    if (props.disabled || props.viewOnly) return

    const index = selectedValues.value.indexOf(option.value)
    if (index === -1) {
      selectedValues.value.push(option.value)
    } else {
      selectedValues.value.splice(index, 1)
    }
    emit('update:modelValue', selectedValues.value)

    // 검색어 초기화 및 포커스 유지
    searchQuery.value = ''
    nextTick(() => {
      searchInput.value?.focus()
    })
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

  // 입력 필드에 포커스
  const focusInput = () => {
    if (props.disabled || props.viewOnly) return
    searchInput.value?.focus()
  }

  // 포커스 핸들러
  const handleFocus = () => {
    isFocused.value = true
    isOpen.value = true
    highlightedIndex.value = -1
    emit('focus')

    // 다른 셀렉트 드롭다운 닫기
    window.dispatchEvent(
      new CustomEvent('select-dropdown-toggle', {
        detail: { id: uniqueId.value }
      })
    )
  }

  // 입력 핸들러
  const handleInput = e => {
    searchQuery.value = e.target.value
    emit('search', searchQuery.value)
    highlightedIndex.value = -1
  }

  // 키보드 네비게이션
  const handleKeydown = event => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        if (highlightedIndex.value < filteredOptions.value.length - 1) {
          highlightedIndex.value++
        }
        break
      case 'ArrowUp':
        event.preventDefault()
        if (highlightedIndex.value > 0) {
          highlightedIndex.value--
        }
        break
      case 'Enter':
        event.preventDefault()
        if (highlightedIndex.value >= 0 && filteredOptions.value[highlightedIndex.value]) {
          toggleOption(filteredOptions.value[highlightedIndex.value])
        }
        break
      case 'Escape':
        isOpen.value = false
        searchInput.value?.blur()
        break
      case 'Backspace':
        if (!searchQuery.value && selectedOptions.value.length > 0) {
          removeOption(selectedOptions.value[selectedOptions.value.length - 1])
        }
        break
    }
  }

  // 다른 셀렉트가 열릴 때 현재 셀렉트를 닫는 이벤트 핸들러
  const handleOtherSelectOpen = event => {
    if (event.detail.id !== uniqueId.value && isOpen.value) {
      isOpen.value = false
      isFocused.value = false
    }
  }

  // 외부 클릭 시 드롭다운 닫기
  const closeDropdown = event => {
    const multiSelect = event.target.closest('.ui-multi-select')
    if (!multiSelect && isOpen.value) {
      isOpen.value = false
      isFocused.value = false
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
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .ui-multi-select {
    position: relative;
    width: v-bind('width');
    font-family: $font-family;

    // 컨트롤 영역 (Selectize 스타일)
    &__control {
      display: flex;
      align-items: center;
      // height: $ui-height-md; // 36px
      border: 1px solid $border-color-light;
      border-radius: $border-radius-sm;
      background: var(--color-gray-0, #fff);
      cursor: text;
      transition: all $transition-normal ease;
      padding-left: 7px;
      box-sizing: border-box;

      &:hover {
        border-color: $border-color;
      }
    }

    // 태그 영역
    &__tags {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      flex: 1;
      gap: 4px;
      padding: 2px 4px;
      min-height: 30px;
    }

    // 협업자 태그 스타일
    &__tag {
      display: inline-flex;
      align-items: center;
      background: var(--color-system-b10, #e6f3ff);
      border: 1px solid var(--color-system-b20, #b3d9ff);
      border-radius: 16px;
      padding: 4px 8px;
      font-size: $font-size-xs;
      color: var(--color-system-b40, #0066cc);
      gap: 4px;
      max-width: 200px;

      &:hover {
        background: var(--color-system-b15, #d9ecff);
      }
    }

    // 태그 라벨
    &__tag-label {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 500;
      font-size: 13px;
    }

    // 태그 제거 버튼
    &__tag-remove {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      border: none;
      background: transparent;
      color: var(--color-system-b30, #0084ff);
      cursor: pointer;
      border-radius: 50%;
      font-size: 14px;
      line-height: 1;
      transition: all 0.2s ease;

      &:hover {
        background: var(--color-system-b20, #b3d9ff);
        color: var(--color-system-b50, #004499);
      }
    }

    // 검색 입력 필드
    &__input-wrapper {
      flex: 1;
      min-width: 100px;
    }

    &__input {
      border: none;
      outline: none;
      background: transparent;
      font-size: $ui-font-md;
      color: var(--color-gray-70, #464c53);
      width: 100%;
      min-width: 50px;

      &::placeholder {
        color: $placeholder-color;
        font-family: $placeholder-font-family;
        font-size: $ui-font-md;
        font-style: normal;
        font-weight: $placeholder-font-weight;
        line-height: $placeholder-line-height;
      }
    }

    // 인디케이터 영역
    &__indicators {
      display: flex;
      align-items: center;
      padding: 0 8px;
    }

    // 로딩 스피너
    &__spinner {
      width: 16px;
      height: 16px;
      border: 2px solid var(--color-gray-20, #cdd1d5);
      border-top: 2px solid var(--color-system-b30, #0084ff);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    // 드롭다운 아이콘
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

    // 드롭다운 메뉴
    &__dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 1000;
      background: #fff;
      border: 1px solid var(--color-gray-20, #cdd1d5);
      border-radius: $border-radius-sm;
      margin-top: 4px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      animation: dropdownFadeIn 0.2s ease;
      max-height: 300px;
      overflow-y: auto;
    }

    // 옵션 목록
    &__options {
      padding: 4px 0;
    }

    // 개별 옵션 (협업자)
    &__option {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      cursor: pointer;
      transition: background-color 0.2s ease;
      gap: 12px;

      &:hover,
      &--highlighted {
        background-color: var(--color-gray-5, #f5f6f7);
      }

      &--selected {
        background-color: var(--color-system-b5, #f0f8ff);

        .ui-multi-select__option-name {
          color: var(--color-system-b40, #0066cc);
          font-weight: 600;
        }
      }
    }

    // 옵션 정보
    &__option-info {
      flex: 1;
      min-width: 0;
    }

    &__option-name {
      font-size: $font-size-md;
      font-weight: 500;
      color: var(--color-gray-70, #464c53);
      margin-bottom: 2px;
    }

    &__option-email {
      font-size: $font-size-xs;
      color: var(--color-gray-40, #8a949e);
      margin-bottom: 2px;
    }

    &__option-department {
      font-size: $font-size-xs;
      color: var(--color-gray-30, #b1b8be);
    }

    // 체크박스
    &__option-checkbox {
      flex-shrink: 0;
    }

    &__checkbox {
      width: 18px;
      height: 18px;
      border: 2px solid var(--color-gray-20, #cdd1d5);
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;

      &--checked {
        background: var(--color-system-b30, #0084ff);
        border-color: var(--color-system-b30, #0084ff);
      }
    }

    &__check-icon {
      width: 12px;
      height: 12px;
      fill: white;
    }

    // 빈 상태 메시지
    &__empty,
    &__no-results {
      padding: 24px;
      text-align: center;
      color: var(--color-gray-40, #8a949e);
    }

    &__empty-icon,
    &__no-results-icon {
      font-size: 24px;
      margin-bottom: 8px;
    }

    &__empty-text,
    &__no-results-text {
      font-size: $font-size-md;
      font-weight: 500;
    }

    // 상태별 스타일
    &--focused {
      .ui-multi-select__control {
        border-color: var(--color-system-b30, #0084ff);
        box-shadow: 0 0 0 3px rgba(0, 132, 255, 0.1);
      }
    }

    &--error {
      .ui-multi-select__control {
        border-color: var(--color-system-r30, #f30);
        box-shadow: 0 0 0 3px rgba(255, 51, 0, 0.1);
      }
    }

    &--disabled {
      .ui-multi-select__control {
        background: var(--color-gray-10, #e6e8ea);
        border-color: var(--color-gray-20, #cdd1d5);
        cursor: not-allowed;
      }

      .ui-multi-select__input {
        color: var(--color-gray-30, #b1b8be);
      }
    }

    &--view {
      .ui-multi-select__control {
        background: var(--color-gray-5, #f5f6f7);
        border-color: var(--color-gray-20, #cdd1d5);
        cursor: default;
      }

      .ui-multi-select__tag-remove {
        display: none;
      }
    }

    // 크기 변형
    &--small {
      .ui-multi-select__control {
        height: $ui-height-sm; // 32px
        box-sizing: border-box;
      }

      .ui-multi-select__input {
        font-size: $ui-font-sm;

        &::placeholder {
          font-size: $ui-font-sm;
        }
      }

      .ui-multi-select__tag {
        padding: 2px 6px;
        font-size: 13px;
      }

      .ui-multi-select__option {
        padding: 8px 12px;
      }
    }

    &--medium {
      .ui-multi-select__control {
        // height: $ui-height-md; // 36px
        box-sizing: border-box;
        padding: 5px 10px;
      }

      .ui-multi-select__input {
        font-size: $ui-font-md;

        &::placeholder {
          font-size: $ui-font-md;
        }
      }

      .ui-multi-select__tag {
        padding: 4px 8px;
        font-size: $font-size-xs;
      }

      .ui-multi-select__option {
        padding: 10px 12px;
      }
    }

    &--large {
      .ui-multi-select__control {
        height: $ui-height-lg; // 48px
        box-sizing: border-box;
      }

      .ui-multi-select__input {
        font-size: $ui-font-lg;

        &::placeholder {
          font-size: $ui-font-lg;
        }
      }

      .ui-multi-select__tag {
        padding: 6px 10px;
        font-size: $font-size-sm;
      }

      .ui-multi-select__option {
        padding: 12px 16px;
      }
    }

    &--xlarge {
      .ui-multi-select__control {
        height: $ui-height-xl; // 56px
        box-sizing: border-box;
      }

      .ui-multi-select__input {
        font-size: $ui-font-xl;

        &::placeholder {
          font-size: $ui-font-xl;
        }
      }

      .ui-multi-select__tag {
        padding: 8px 12px;
        font-size: $font-size-md;
      }

      .ui-multi-select__option {
        padding: 14px 20px;
      }
    }

    // 모바일 최적화
    @media (max-width: 768px) {
      &__dropdown {
        max-height: 250px;
      }

      &__option {
        padding: 12px;
        min-height: 56px;
      }

      &__tag {
        max-width: 150px;
      }
    }
  }
</style>
