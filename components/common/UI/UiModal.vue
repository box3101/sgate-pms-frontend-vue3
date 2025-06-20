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
        { 'ui-popup--no-scroll': isScroll },
        { 'ui-popup--floating': isFloating } // 플로팅 모달 전용 클래스 추가
      ]"
      :style="modalStyle"
      @click="isFloating && emit('activate-modal')"
    >
      <!-- 왼쪽 리사이즈 핸들러 (오른쪽 고정 모드) -->
      <div
        v-if="position === 'right' && !isFullscreen && !isFloating"
        class="ui-popup__resize-handle ui-popup__resize-handle--left"
        @mousedown="e => handleResizeStart('left', e)"
      ></div>

      <!-- 플로팅 모드 리사이즈 핸들러들 -->
      <template v-if="isFloating && !isFullscreen">
        <!-- 오른쪽 리사이즈 핸들러 -->
        <div
          class="ui-popup__resize-handle ui-popup__resize-handle--right"
          @mousedown="e => handleResizeStart('right', e)"
        ></div>
        <!-- 아래쪽 리사이즈 핸들러 -->
        <div
          class="ui-popup__resize-handle ui-popup__resize-handle--bottom"
          @mousedown="e => handleResizeStart('bottom', e)"
        ></div>
        <!-- 오른쪽 아래 모서리 리사이즈 핸들러 -->
        <div
          class="ui-popup__resize-handle ui-popup__resize-handle--corner"
          @mousedown="e => handleResizeStart('corner', e)"
        ></div>
      </template>
      <div
        class="ui-popup__header"
        :class="{ 'ui-popup__header--draggable': allowFloating }"
        @mousedown="allowFloating && handleDragStart($event)"
      >
        <div class="flex items-center gap-5">
          <h3 class="ui-popup__title">
            <slot name="title">
              {{ title }}
            </slot>
          </h3>
        </div>
        <div class="ui-popup__header-actions">
          <slot name="headerActions-right"></slot>
          <div class="ui-popup__actions flex gap-5">
            <template v-if="true">
              <button class="ui-popup__fullscreen" @click="toggleFullscreen" title="전체화면">
                <Icon name="heroicons:arrows-pointing-out" size="18" />
              </button>
              <!-- 플로팅 모드일 때 크기 버튼 추가 -->
              <button
                v-if="position === 'right' && showSizeButtons && !isFloating"
                class="ui-popup__size-btn"
                :class="{ active: sizeMode === 'half' && !isFullscreen }"
                @click="changeSize('half')"
                title="넓은 크기 (1/2)"
              >
                <!-- 사용자 정의 SVG - 2개로 분할된 화면, 왼쪽만 강조됨 -->
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2" y="4" width="9" height="16" fill="currentColor" />
                  <rect
                    x="13"
                    y="4"
                    width="9"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                </svg>
              </button>
              <button
                v-if="position === 'right' && showSizeButtons && !isFloating"
                class="ui-popup__size-btn"
                :class="{ active: sizeMode === 'default' && !isFullscreen }"
                @click="changeSize('default')"
                title="기본 크기 (1/3)"
              >
                <!-- 사용자 정의 SVG - 3개로 분할된 화면, 왼쪽만 채워짐, 회색 -->
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="text-gray-400"
                >
                  <rect x="2" y="4" width="6" height="16" fill="currentColor" />
                  <rect
                    x="10"
                    y="4"
                    width="6"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                  <rect
                    x="18"
                    y="4"
                    width="4"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                </svg>
              </button>
              <button
                v-if="showCloseButton || isFloating"
                class="ui-popup__close"
                @click="$emit('update:modelValue', false)"
              >
                <Icon name="heroicons:x-mark" size="20" />
              </button>
            </template>
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
  import { ref, onMounted, onUnmounted, computed, watch, inject, provide } from 'vue'

  // 플로팅 팝업 카운터 관리 - 전역 상태로 사용하기 위해 기본값을 제공
  const floatingPopupCount = inject('floatingPopupCount', ref(0))

  // 고정 팝업 카운터 관리 - 전역 상태로 사용하기 위해 기본값을 제공
  const fixedPopupCount = inject('fixedPopupCount', ref(0))

  // 현재 팝업이 플로팅 상태인지 추적
  const isThisPopupFloating = ref(false)

  // 현재 팝업의 플로팅 상태를 다른 컴포넌트에서 사용할 수 있도록 제공
  provide('isModalFloating', isThisPopupFloating)

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
        ['small', 'xmedium', 'medium', 'large', 'mlarge', 'xlarge', 'xxlarge', 'full'].includes(
          value
        )
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
    },
    height: {
      type: [String, Number],
      default: null
    }
  })

  const emit = defineEmits(['update:modelValue', 'floating-changed', 'activate-modal'])

  const isFullscreen = ref(false)
  const customWidth = ref(null)
  const customHeight = ref(null)
  const sizeMode = ref('default') // 'default', 'half', 'full'
  const isFloating = ref(false)
  const dragPosition = ref({ x: 0, y: 0 })

  // isFloating watch 추가
  watch(isFloating, newValue => {
    isThisPopupFloating.value = newValue
    emit('floating-changed', newValue)
  })

  const screenWidth = ref(window.innerWidth)

  const handleResize = () => {
    screenWidth.value = window.innerWidth
  }

  const modalStyle = computed(() => {
    if (isFullscreen.value) {
      return {}
    }

    if (isFloating.value) {
      const style = {
        position: 'fixed',
        top: `${dragPosition.value.y}px`,
        left: `${dragPosition.value.x}px`,
        transform: 'none',
        maxHeight: '600px', // 플로팅 팝업의 초기 최대 높이 설정
        minWidth: 'auto'
      }

      // 너비가 설정된 경우
      if (customWidth.value) {
        style.width = `${customWidth.value}px`
      } else {
        style.width = props.position === 'right' ? `${screenWidth.value / 3}px` : undefined
      }

      // 높이가 설정된 경우
      if (customHeight.value) {
        style.height = `${customHeight.value}px`
        style.maxHeight = `${customHeight.value}px`
      }

      return style
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

    const style = {}

    // 높이 설정
    if (props.height) {
      const heightValue = typeof props.height === 'number' ? `${props.height}px` : props.height
      style.height = heightValue
      style.maxHeight = heightValue
    }

    return style
  })

  let isResizing = false
  let resizeDirection = null
  let startX = 0
  let startY = 0
  let startWidth = 0
  let startHeight = 0
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

  function handleResizeStart(direction = 'left', e) {
    if (isFullscreen.value) return

    isResizing = true
    resizeDirection = direction
    startX = e.clientX
    startY = e.clientY
    modalElement = e.target.closest('.ui-popup__content')
    startWidth = modalElement.offsetWidth
    startHeight = modalElement.offsetHeight

    // 이벤트 리스너 추가
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    // 커서 스타일 설정
    if (direction === 'left' || direction === 'right') {
      document.body.style.cursor = 'ew-resize'
    } else if (direction === 'bottom') {
      document.body.style.cursor = 'ns-resize'
    } else if (direction === 'corner') {
      document.body.style.cursor = 'nwse-resize'
    }

    e.preventDefault()
  }

  function handleMouseMove(e) {
    if (!isResizing) return

    const maxWidth = window.innerWidth
    const maxHeight = window.innerHeight
    const minWidth = 300
    const minHeight = 200

    // 리사이즈 방향에 따라 처리
    if (resizeDirection === 'left') {
      // 왼쪽 핸들 (오른쪽 고정 모드)
      const width = startWidth - (e.clientX - startX)
      if (width >= minWidth && width <= maxWidth) {
        customWidth.value = width
        sizeMode.value = 'custom'
      }
    } else if (resizeDirection === 'right') {
      // 오른쪽 핸들 (플로팅 모드)
      const width = startWidth + (e.clientX - startX)
      if (width >= minWidth && width <= maxWidth) {
        customWidth.value = width
      }
    } else if (resizeDirection === 'bottom') {
      // 아래쪽 핸들 (플로팅 모드)
      const height = startHeight + (e.clientY - startY)
      if (height >= minHeight && height <= maxHeight) {
        customHeight.value = height
      }
    } else if (resizeDirection === 'corner') {
      // 모서리 핸들 (플로팅 모드) - 너비와 높이 동시 조절
      const width = startWidth + (e.clientX - startX)
      const height = startHeight + (e.clientY - startY)

      if (width >= minWidth && width <= maxWidth) {
        customWidth.value = width
      }

      if (height >= minHeight && height <= maxHeight) {
        customHeight.value = height
      }
    }
  }

  function handleMouseUp() {
    isResizing = false
    resizeDirection = null
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    document.body.style.cursor = ''

    if (sizeMode.value === 'custom') {
      saveUserPreference()
    }

    // 콘솔에 디버깅 정보 출력
    console.log('Resize complete', {
      width: customWidth.value,
      height: customHeight.value,
      floating: isFloating.value
    })
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

    // 모달 활성화 이벤트 발생 (z-index 올리기 위해)
    emit('activate-modal')

    // 기존 코드는 그대로 유지
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
    if (
      newX > screenWidth.value - 700 &&
      props.position === 'right' &&
      fixedPopupCount.value == 0
    ) {
      // 플로팅 모드 해제 및 오른쪽 팝업으로 복귀
      isFloating.value = false
      isDragging = false
      dragPosition.value = { x: 0, y: 0 } // 위치 초기화

      // 이벤트 발생
      emit('floating-changed', false)

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

      // 이벤트 발생
      emit('floating-changed', true)
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

    // 이벤트 발생
    emit('floating-changed', false)
  }

  // 플로팅 모드에서 오른쪽 팝업으로 붙이는 함수
  function dockToRight(mode) {
    // 플로팅 모드 해제
    isFloating.value = false

    // 위치 초기화
    dragPosition.value = { x: 0, y: 0 }

    // 오른쪽 팝업으로 설정
    sizeMode.value = mode
    customWidth.value = null

    // 이벤트 발생
    emit('floating-changed', false)

    // 사용자 설정 저장
    saveUserPreference()
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

    &--floating {
      animation: none !important; // 애니메이션 제거
      transition: none !important; // 전환 효과 제거

      // 플로팅 모달의 기본 스타일 설정
      position: fixed !important;
      z-index: 1100 !important;

      // 고정 위치를 갖도록 설정
      top: auto;
      right: auto;
      bottom: auto;
      left: auto;

      // 모서리 둥글게
      border-radius: 8px !important;
    }

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
        &:has([style*='height']) {
          .ui-popup__body {
            overflow-y: auto;
            height: 0;
            flex-grow: 1;
          }
        }
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
      overflow: auto; // 리사이즈 시 콘텐츠 넘치지 않도록 설정
    }

    &__resize-handle {
      position: absolute;
      z-index: 10;

      &--left {
        left: 0;
        top: 0;
        bottom: 0;
        width: 5px;
        cursor: ew-resize;
      }

      &--right {
        right: 0;
        top: 0;
        bottom: 0;
        width: 5px;
        cursor: ew-resize;
      }

      &--bottom {
        left: 0;
        right: 0;
        bottom: 0;
        height: 5px;
        cursor: ns-resize;
      }

      &--corner {
        right: 0;
        bottom: 0;
        width: 15px;
        height: 15px;
        cursor: nwse-resize;
        &::before {
          content: '';
          position: absolute;
          right: 0;
          bottom: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 0 15px 15px;
          border-color: transparent transparent rgba(0, 0, 0, 0.2) transparent;
        }
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);

        &.ui-popup__resize-handle--corner {
          background-color: transparent;
          &::before {
            border-color: transparent transparent rgba(0, 0, 0, 0.3) transparent;
          }
        }
      }

      &:active {
        background-color: rgba(0, 0, 0, 0.2);

        &.ui-popup__resize-handle--corner {
          background-color: transparent;
          &::before {
            border-color: transparent transparent rgba(0, 0, 0, 0.4) transparent;
          }
        }
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
      max-width: 500px; // 추천값
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
    // Sizes - 모든 해상도 대응 비율 기반
    &--small {
      width: min(400px, max(30vw, 320px));
      max-width: min(400px, 90vw);
    }

    &--xmedium {
      width: min(440px, max(35vw, 360px));
      max-width: min(440px, 85vw);
    }

    &--medium {
      width: min(640px, max(40vw, 480px));
      max-width: min(640px, 80vw);
    }

    &--large {
      width: min(800px, max(50vw, 600px));
      max-width: min(800px, 75vw);
    }

    &--mlarge {
      width: min(1100px, max(60vw, 800px));
      max-width: min(1100px, 70vw);
    }

    &--xlarge {
      width: min(1400px, max(70vw, 1000px));
      max-width: min(1400px, 85vw);
    }

    &--xxlarge {
      width: min(1600px, max(80vw, 1200px));
      max-width: min(1600px, 95vw);
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
