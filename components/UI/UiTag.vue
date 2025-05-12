<!-- TagComponent.vue -->
<template>
  <span class="ui-tag" :class="tagClasses" :style="tagStyles" :data-testid="testId">
    <slot>{{ text }}</slot>
    <button
      v-if="closable"
      class="ui-tag__close"
      type="button"
      @click.stop="handleClose"
      aria-label="태그 삭제"
    >
      <span class="sr-only">삭제</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        class="ui-tag__close-icon"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  </span>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    text: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'default',
      validator: value =>
        [
          'default',
          'primary',
          'collaboration',
          'shared',
          'name',
          'completed',
          'deadline',
          'custom'
        ].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['xsmall', 'small', 'medium', 'large'].includes(value)
    },
    closable: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: ''
    },
    textColor: {
      type: String,
      default: ''
    },
    borderColor: {
      type: String,
      default: ''
    },
    testId: {
      type: String,
      default: 'ui-tag'
    }
  })

  const emit = defineEmits(['close'])

  const handleClose = event => {
    emit('close', event)
  }

  const tagClasses = computed(() => {
    return [
      `ui-tag--${props.size}`,
      `ui-tag--${props.variant}`,
      { 'ui-tag--closable': props.closable }
    ]
  })

  const tagStyles = computed(() => {
    if (props.variant === 'custom') {
      return {
        backgroundColor: props.backgroundColor,
        color: props.textColor,
        borderColor: props.borderColor || props.backgroundColor
      }
    }
    return {}
  })
</script>

<style lang="scss">
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .tags-group {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .ui-tag {
    display: inline-flex;
    align-items: center;
    border-radius: 4px;
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    transition: all 0.2s ease;
    gap: 4px;

    // 크기 변형
    &--xsmall {
      color: var(--color-gray-0, #fff);
      font-size: 12px;
      padding: 3px 4px;
      height: 20px;
      line-height: 1;
    }

    &--small {
      color: var(--color-gray-0, #fff);
      font-size: 12px;
      padding: 4px 6px;
      height: 22px;
      line-height: 1;
    }

    &--medium {
      font-size: 14px;
      padding: 4px 8px;
      height: 28px;
    }

    &--large {
      font-size: 16px;
      padding: 6px 10px;
      height: 32px;
    }

    // 색상 변형
    &--default {
      background-color: #f0f0f0;
      color: #333;
      border: 1px solid #e0e0e0;
    }

    &--primary {
      background-color: var(--color-primary-50, #0af);
      color: #fff;
    }

    &--collaboration {
      background-color: var(--color-primary-70, #069);
      color: #fff;
    }

    &--shared {
      background-color: var(--color-primary-90, #023);
      color: #fff;
    }

    &--name {
      background-color: var(--color-system-g40, #008033);
      color: #fff;
    }

    &--completed {
      background-color: var(--color-system-b30, #0084ff);
      color: #fff;
    }

    &--deadline {
      background-color: var(--color-gray-30, #b1b8be);
      color: #fff;
    }

    &--closable {
      padding-right: 4px;
    }

    // 닫기 버튼
    &__close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.2);
      border: none;
      cursor: pointer;
      padding: 0;
      color: var(--color-gray-0, #fff);
      border-radius: 50%;
      width: 16px;
      height: 16px;
      min-width: 16px;
      min-height: 16px;
      transition: background-color 0.2s ease;

      &:hover,
      &:focus {
        background-color: rgba(0, 0, 0, 0.3);
        outline: none;
      }

      &:focus-visible {
        box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
      }
    }

    &__close-icon {
      width: 12px;
      height: 12px;
    }
  }
</style>
