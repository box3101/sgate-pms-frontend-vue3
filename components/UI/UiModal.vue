<template>
  <div
    v-if="modelValue"
    class="ui-popup"
    :class="{ 'ui-popup--content-only': allowBackgroundInteraction }"
  >
    <div
      v-if="!noDim"
      class="ui-popup__backdrop"
      @click="closeOnBackdropClick && $emit('update:modelValue', false)"
    ></div>
    <div
      class="ui-popup__content"
      :class="[
        `ui-popup--${size}`,
        { 'ui-popup--centered': centered && !isFullscreen },
        { 'ui-popup--right': position === 'right' && !isFullscreen },
        { 'ui-popup--no-dim': noDim },
        { 'ui-popup--fullscreen': isFullscreen },
        { 'ui-popup--no-scroll': isScroll }
      ]"
      :style="modalStyle"
    >
      <div
        v-if="position === 'right' && !isFullscreen"
        :class="`ui-popup__resize-handle`"
        @mousedown="handleResizeStart"
      ></div>
      <div
        class="ui-popup__header"
        :class="{ 'ui-popup__header--draggable': allowFloating }"
        @mousedown="allowFloating && handleDragStart($event)"
      >
        <div class="flex items-center gap-5">
          <slot name="headerActions-left"></slot>
          <h3 class="ui-popup__title">
            <slot name="title">
              {{ title }}
            </slot>
          </h3>
          <slot name="headerActions"></slot>
        </div>
        <div class="ui-popup__header-actions">
          <slot name="headerActions-right"></slot>
          <div class="ui-popup__actions flex gap-5">
            <button
              v-if="allowFloating && isFloating"
              class="ui-popup__pin-btn"
              @click="togglePinned"
              title="고정 모드로 전환"
            >
              <Icon name="heroicons:map-pin" size="18" />
            </button>
            <button
              v-if="position === 'right' && showSizeButtons"
              class="ui-popup__size-btn"
              :class="{ active: sizeMode === 'default' && !isFullscreen }"
              @click="changeSize('default')"
              title="기본 크기 (1/3)"
            >
              <Icon name="heroicons:window" size="18" />
            </button>

            <button
              v-if="position === 'right' && showSizeButtons"
              class="ui-popup__size-btn"
              :class="{ active: sizeMode === 'half' && !isFullscreen }"
              @click="changeSize('half')"
              title="넓은 크기 (1/2)"
            >
              <Icon name="heroicons:view-columns" size="18" />
            </button>

            <button
              class="ui-popup__fullscreen"
              :class="{ active: isFullscreen }"
              @click="toggleFullscreen"
              title="전체화면"
            >
              <Icon
                :name="
                  isFullscreen ? 'heroicons:arrows-pointing-in' : 'heroicons:arrows-pointing-out'
                "
                size="18"
              />
            </button>

            <button
              v-if="showCloseButton"
              class="ui-popup__close"
              @click="$emit('update:modelValue', false)"
            >
              <Icon name="heroicons:x-mark" size="20" />
            </button>
          </div>
        </div>
      </div>
      <div
        class="ui-popup__body"
        :style="{
          padding: `${
            size === 'small'
              ? '0px'
              : size === 'xmedium'
              ? '12px'
              : size === 'medium'
              ? '16px'
              : size === 'large'
              ? '20px'
              : size === 'xlarge'
              ? '24px'
              : '24px'
          }`
        }"
      >
        <slot></slot>
      </div>
      <div v-if="showFooter" class="ui-popup__footer">
        <slot name="footerActions"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'medium',
      validator: value =>
        ['small', 'xmedium', 'medium', 'large', 'mlarge', 'xlarge', 'full'].includes(value)
    },
    centered: {
      type: Boolean,
      default: true
    },
    showCloseButton: {
      type: Boolean,
      default: true
    },
    closeOnBackdropClick: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'center',
      validator: value => ['center', 'right'].includes(value)
    },
    noDim: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean,
      default: false
    },
    isScroll: {
      type: Boolean,
      default: false
    },
    showSizeButtons: {
      type: Boolean,
      default: false
    },
    allowBackgroundInteraction: {
      type: Boolean,
      default: false
    },
    allowFloating: {
      type: Boolean,
      default: false
    }
  })

  defineEmits(['update:modelValue'])

  const isFullscreen = ref(false)
  const customWidth = ref(null)
  const sizeMode = ref('default') // 'default', 'half', 'full'
  const isFloating = ref(false)
  const dragPosition = ref({ x: 0, y: 0 })

  const screenWidth = ref(window.innerWidth)

  const handleResize = () => {
    screenWidth.value = window.innerWidth
  }

  const modalStyle = computed(() => {
    if (isFullscreen.value) {
      return {}
    }

    if (isFloating.value) {
      return {
        position: 'fixed',
        top: `${dragPosition.value.y}px`,
        left: `${dragPosition.value.x}px`,
        transform: 'none',
        width: props.position === 'right' ? `${screenWidth.value / 3}px` : undefined
      }
    }

    if (customWidth.value && props.position === 'right') {
      return { width: `${customWidth.value}px` }
    }

    if (props.position === 'right') {
      if (sizeMode.value === 'half') {
        return { width: `${screenWidth.value / 2}px` }
      } else if (sizeMode.value === 'default') {
        return { width: `${screenWidth.value / 3}px` }
      }
    }

    return {}
  })

  let isResizing = false
  let startX = 0
  let startWidth = 0
  let modalElement = null

  watch(
    () => props.modelValue,
    newValue => {
      if (newValue) {
        document.documentElement.style.overflowY = 'hidden'
        document.body.style.overflowY = 'hidden'
      } else {
        document.documentElement.style.overflowY = ''
        document.body.style.overflowY = ''
      }
    },
    { immediate: true }
  )

  onMounted(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('resize', handleResize)

    if (props.modelValue) {
      document.documentElement.style.overflowY = 'hidden'
      document.body.style.overflowY = 'hidden'
    }

    const savedSizeMode = localStorage.getItem('modalSizeMode')
    if (savedSizeMode) {
      sizeMode.value = savedSizeMode
    }
  })

  onUnmounted(() => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    window.removeEventListener('resize', handleResize)

    document.documentElement.style.overflowY = ''
    document.body.style.overflowY = ''
  })

  function toggleFullscreen() {
    isFullscreen.value = !isFullscreen.value

    if (isFullscreen.value) {
      customWidth.value = null
      sizeMode.value = 'full'
      saveUserPreference()
    } else {
      sizeMode.value = 'default'
      saveUserPreference()
    }
  }

  function changeSize(mode) {
    if (isFullscreen.value && mode !== 'full') {
      isFullscreen.value = false
    }

    sizeMode.value = mode
    customWidth.value = null

    saveUserPreference()
  }

  function saveUserPreference() {
    localStorage.setItem('modalSizeMode', sizeMode.value)
  }

  function handleResizeStart(e) {
    if (props.position !== 'right' || isFullscreen.value) return

    isResizing = true
    startX = e.clientX
    modalElement = e.target.closest('.ui-popup__content')
    startWidth = modalElement.offsetWidth

    document.body.style.cursor = 'ew-resize'
    e.preventDefault()
  }

  function handleMouseMove(e) {
    if (!isResizing) return

    const width = startWidth - (e.clientX - startX)
    const maxWidth = window.innerWidth
    const minWidth = 300

    if (width >= minWidth && width <= maxWidth) {
      customWidth.value = width
      sizeMode.value = 'custom'
    }
  }

  function handleMouseUp() {
    isResizing = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    document.body.style.cursor = ''

    if (sizeMode.value === 'custom') {
      saveUserPreference()
    }
  }
  // 드래그 관련 변수
  let isDragging = false
  let startDragX = 0
  let startDragY = 0
  let offsetX = 0
  let offsetY = 0
  let initialModalPosition = { x: 0, y: 0 }

  // 드래그 시작 핸들러
  function handleDragStart(e) {
    // 헤더의 버튼 클릭 시 드래그 방지
    if (e.target.closest('.ui-popup__actions')) return

    // 드래그 중 상태로 변경
    isDragging = true

    // 현재 모달의 위치 저장
    const modalRect = e.currentTarget.getBoundingClientRect()
    initialModalPosition = {
      x: modalRect.left,
      y: modalRect.top
    }

    // 마우스 포인터 위치와 모달 위치의 차이 계산 (오프셋)
    offsetX = e.clientX - modalRect.left
    offsetY = e.clientY - modalRect.top

    // 이미 플로팅 모드인 경우
    if (isFloating.value) {
      // 현재 dragPosition을 기준으로 시작점 계산
      startDragX = e.clientX - dragPosition.value.x
      startDragY = e.clientY - dragPosition.value.y
    } else {
      // 고정 모드에서는 현재 모달 위치를 기준으로 시작점 계산
      startDragX = e.clientX - initialModalPosition.x
      startDragY = e.clientY - initialModalPosition.y
    }

    // 이벤트 리스너 등록
    document.addEventListener('mousemove', handleDragMove)
    document.addEventListener('mouseup', handleDragEnd)
    document.body.style.cursor = 'move'
  }

  // 드래그 이동 핸들러
  function handleDragMove(e) {
    if (!isDragging) return

    // 오프셋을 고려한 위치 계산
    const newX = e.clientX - startDragX
    const newY = e.clientY - startDragY

    // 오른쪽 가장자리 근처로 드래그 시 고정 모드로 전환
    if (newX > screenWidth.value - 700 && props.position === 'right') {
      // 플로팅 모드 해제 및 오른쪽 팝업으로 복귀
      isFloating.value = false
      isDragging = false
      dragPosition.value = { x: 0, y: 0 } // 위치 초기화

      // 오른쪽 팝업으로 복귀
      sizeMode.value = 'default'
      customWidth.value = null

      document.removeEventListener('mousemove', handleDragMove)
      document.removeEventListener('mouseup', handleDragEnd)
      document.body.style.cursor = ''
      return
    }

    // 위치 업데이트
    dragPosition.value = { x: newX, y: newY }

    // 플로팅 모드로 전환 (왼쪽으로 50px 이상 드래그 시)
    if (!isFloating.value && initialModalPosition.x - e.clientX > 50) {
      isFloating.value = true
    }
  }
  // 드래그 종료 핸들러
  function handleDragEnd() {
    isDragging = false
    document.removeEventListener('mousemove', handleDragMove)
    document.removeEventListener('mouseup', handleDragEnd)
    document.body.style.cursor = ''
  }

  // 고정 모드 전환
  function togglePinned() {
    isFloating.value = false
    dragPosition.value = { x: 0, y: 0 }
  }
</script>

<style lang="scss" scoped>
  .ui-popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;

    &--content-only {
      position: static;
      top: auto;
      left: auto;
      right: auto;
      bottom: auto;

      .ui-popup__backdrop {
        display: none;
      }

      .ui-popup__content {
        position: fixed;
        z-index: 1000;
      }
    }

    &::-webkit-scrollbar {
      display: none;
    }

    &__backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      animation: fade-in $transition-normal forwards;
    }

    &__content {
      position: relative;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      margin: $spacing-xl;
      animation: scale-in $transition-normal forwards;
      display: flex;
      flex-direction: column;
      max-height: calc(100vh - #{$spacing-xl * 2});
      width: 100%;
    }

    &__resize-handle {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 5px;
      cursor: ew-resize;
      z-index: 10;

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }

      &:active {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }

    &__header {
      display: flex;
      align-items: center;
      padding: $spacing-lg;
      border-bottom: 1px solid $border-color;

      &--draggable {
        cursor: move;
        position: relative;

        &:hover::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 4px;
          background-color: #ddd;
          border-radius: 2px;
          opacity: 0.7;
        }
      }
    }

    &__header-actions {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: $spacing-sm;
    }

    &__title {
      margin: 0;
      font-size: $font-size-xxl;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__close,
    &__fullscreen,
    &__size-btn,
    &__pin-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      background: transparent;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      color: #000;
      transition: background-color $transition-normal, color $transition-normal;

      &:hover {
        background-color: $hover-background;
        color: $text-color;
      }

      &.active {
        background-color: $hover-background;
        color: $primary-color;
      }
    }

    &__body {
      padding: $spacing-lg;
      flex-grow: 1;
      scrollbar-width: none;
      background-color: #fff;
      border-radius: 8px;
      overflow: auto;
      -webkit-overflow-scrolling: touch; /* 모바일 스크롤 개선 */

      &::-webkit-scrollbar {
        display: none;
      }
    }

    &__footer {
      padding: $spacing-lg;
      border-top: 1px solid $border-color;
      display: flex;
      justify-content: flex-end;
      gap: $spacing-md;
    }

    // Sizes
    &--small {
      width: 400px;
      max-width: 400px;
    }

    &--xmedium {
      max-width: 440px;
    }

    &--medium {
      width: 640px;
    }

    &--large {
      max-width: 800px;
    }

    &--mlarge {
      max-width: 1100px;
    }

    &--xlarge {
      max-width: 1400px;
    }

    &--full {
      max-width: calc(100vw - #{$spacing-xl * 2});
      height: calc(100vh - #{$spacing-xl * 2});
    }

    &--centered {
      margin: auto;
    }

    &--right {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      margin: 0;
      border-radius: 8px 0 0 8px;
      max-width: 100vw !important;
      min-width: 700px;
      height: 100vh;
      max-height: 100vh;
      animation: slide-in-right $transition-normal forwards;
    }

    &--no-dim {
      z-index: 1000;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
    }

    &--fullscreen {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0;
      border-radius: 0;
      max-width: 100vw;
      max-height: 100vh;
      width: 100vw;
      height: 100vh;
      animation: fade-in $transition-normal forwards;
    }

    &--no-scroll {
      overflow: hidden;
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes scale-in {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes slide-in-right {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @media (max-width: 768px) {
    .ui-popup {
      &__content {
        margin: $spacing-md;
        max-height: calc(100vh - #{$spacing-md * 2});
      }

      &--full {
        max-width: calc(100vw - #{$spacing-md * 2});
        height: calc(100vh - #{$spacing-md * 2});
      }
    }
  }
</style>
