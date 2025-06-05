<template>
  <Teleport to="body">
    <Transition
      name="toast"
      enter-active-class="toast-enter-active"
      leave-active-class="toast-leave-active"
      enter-from-class="toast-enter-from"
      leave-to-class="toast-leave-to"
    >
      <div
        v-if="visible"
        class="ui-toast"
        :class="[
          `ui-toast--${type}`,
          `ui-toast--${position}`,
          `ui-toast--${size}`,
          { 'ui-toast--closable': closable }
        ]"
        role="alert"
        aria-live="polite"
      >
        <div class="toast-icon" v-if="showIcon">
          <Icon :name="iconName" :size="iconSize" />
        </div>

        <div class="toast-content">
          <div v-if="title" class="toast-title">{{ title }}</div>
          <div class="toast-message">
            <slot>{{ message }}</slot>
          </div>
        </div>

        <button v-if="closable" class="toast-close" @click="handleClose" aria-label="닫기">
          <Icon name="heroicons:x-mark" :size="16" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
  import { computed, onMounted, onUnmounted } from 'vue'

  const props = defineProps({
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'info',
      validator: value => ['success', 'error', 'warning', 'info'].includes(value)
    },
    position: {
      type: String,
      default: 'top-right',
      validator: value =>
        [
          'top-left',
          'top-center',
          'top-right',
          'bottom-left',
          'bottom-center',
          'bottom-right'
        ].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 3000
    },
    closable: {
      type: Boolean,
      default: true
    },
    showIcon: {
      type: Boolean,
      default: true
    }
  })

  const emit = defineEmits(['close', 'update:visible'])

  let timer = null

  const iconName = computed(() => {
    const icons = {
      success: 'heroicons:check-circle',
      error: 'heroicons:x-circle',
      warning: 'heroicons:exclamation-triangle',
      info: 'heroicons:information-circle'
    }
    return icons[props.type]
  })

  const iconSize = computed(() => {
    const sizes = {
      small: 16,
      medium: 20,
      large: 24
    }
    return sizes[props.size]
  })

  function handleClose() {
    emit('update:visible', false)
    emit('close')
  }

  function startTimer() {
    if (props.duration > 0) {
      timer = setTimeout(() => {
        handleClose()
      }, props.duration)
    }
  }

  function clearTimer() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  onMounted(() => {
    if (props.visible) {
      startTimer()
    }
  })

  onUnmounted(() => {
    clearTimer()
  })

  // visible 변경 감지
  watch(
    () => props.visible,
    newVal => {
      if (newVal) {
        startTimer()
      } else {
        clearTimer()
      }
    }
  )
</script>

<style lang="scss" scoped>
  .ui-toast {
    position: fixed;
    z-index: 9999;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    min-width: 300px;
    max-width: 500px;
    padding: 16px;
    border-radius: 8px;
    background: var(--color-gray-0, #fff);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border: 1px solid var(--color-gray-20, #cdd1d5);

    // 타입별 스타일
    &--success {
      border-left: 4px solid #10b981;

      .toast-icon {
        color: #10b981;
      }
    }

    &--error {
      border-left: 4px solid #ef4444;

      .toast-icon {
        color: #ef4444;
      }
    }

    &--warning {
      border-left: 4px solid #f59e0b;

      .toast-icon {
        color: #f59e0b;
      }
    }

    &--info {
      border-left: 4px solid var(--color-primary-50, #00aaff);

      .toast-icon {
        color: var(--color-primary-50, #00aaff);
      }
    }

    // 위치별 스타일
    &--top-left {
      top: 20px;
      left: 20px;
    }

    &--top-center {
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
    }

    &--top-right {
      top: 20px;
      right: 20px;
    }

    &--bottom-left {
      bottom: 20px;
      left: 20px;
    }

    &--bottom-center {
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
    }

    &--bottom-right {
      bottom: 20px;
      right: 20px;
    }

    // 사이즈별 스타일
    &--small {
      min-width: 250px;
      padding: 12px;
      gap: 8px;

      .toast-title {
        font-size: 14px;
        line-height: 16px;
      }

      .toast-message {
        font-size: 12px;
        line-height: 14px;
      }
    }

    &--medium {
      // 기본 스타일 유지
    }

    &--large {
      min-width: 400px;
      padding: 20px;
      gap: 16px;

      .toast-title {
        font-size: 18px;
        line-height: 20px;
      }

      .toast-message {
        font-size: 16px;
        line-height: 18px;
      }
    }

    &--closable {
      padding-right: 40px;
    }
  }

  .toast-icon {
    flex-shrink: 0;
    margin-top: 2px;
  }

  .toast-content {
    flex: 1;
    min-width: 0;
  }

  .toast-title {
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    color: var(--color-gray-90, #1f2937);
    margin-bottom: 4px;
  }

  .toast-message {
    font-size: 14px;
    line-height: 16px;
    color: var(--color-gray-70, #4b5563);
    word-break: break-word;
  }

  .toast-close {
    position: absolute;
    top: 12px;
    right: 12px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-gray-50, #6b7280);
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-gray-70, #4b5563);
    }
  }

  // 애니메이션
  .toast-enter-active,
  .toast-leave-active {
    transition: all 0.3s ease;
  }

  .toast-enter-from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }

  .toast-leave-to {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }

  // top 위치 애니메이션
  .ui-toast--top-left,
  .ui-toast--top-center,
  .ui-toast--top-right {
    &.toast-enter-from {
      transform: translateY(-20px) scale(0.95);
    }

    &.toast-leave-to {
      transform: translateY(-20px) scale(0.95);
    }
  }

  // top-center 추가 변환
  .ui-toast--top-center {
    &.toast-enter-from {
      transform: translateX(-50%) translateY(-20px) scale(0.95);
    }

    &.toast-leave-to {
      transform: translateX(-50%) translateY(-20px) scale(0.95);
    }
  }

  // bottom 위치 애니메이션
  .ui-toast--bottom-left,
  .ui-toast--bottom-center,
  .ui-toast--bottom-right {
    &.toast-enter-from {
      transform: translateY(20px) scale(0.95);
    }

    &.toast-leave-to {
      transform: translateY(20px) scale(0.95);
    }
  }

  // bottom-center 추가 변환
  .ui-toast--bottom-center {
    &.toast-enter-from {
      transform: translateX(-50%) translateY(20px) scale(0.95);
    }

    &.toast-leave-to {
      transform: translateX(-50%) translateY(20px) scale(0.95);
    }
  }
</style>
