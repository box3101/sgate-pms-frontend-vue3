<template>
  <div v-if="modelValue" class="ui-popup">
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
      <div class="ui-popup__header">
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
    }
  })

  defineEmits(['update:modelValue'])

  const isFullscreen = ref(false)
  const customWidth = ref(null)
  const sizeMode = ref('default') // 'default', 'half', 'full'

  const screenWidth = ref(window.innerWidth)

  const handleResize = () => {
    screenWidth.value = window.innerWidth
  }

  const modalStyle = computed(() => {
    if (isFullscreen.value) {
      return {}
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
    document.body.style.cursor = ''

    if (sizeMode.value === 'custom') {
      saveUserPreference()
    }
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
    &__size-btn {
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
      max-width: 600px;
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
      max-width: 1200px;
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
