<template>
  <span
    class="ui-tag"
    :class="[`ui-tag--${size}`, `ui-tag--${variant}`, { 'ui-tag--closable': closable }]"
    :style="
      variant === 'custom'
        ? {
            backgroundColor: backgroundColor,
            color: textColor,
            borderColor: borderColor || backgroundColor
          }
        : {}
    "
  >
    <slot>{{ text }}</slot>
    <button
      v-if="closable"
      class="ui-tag__close"
      type="button"
      @click.stop="$emit('close')"
      aria-label="태그 삭제"
    >
      ×
    </button>
  </span>
</template>

<script setup>
  defineProps({
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
      validator: value => ['small', 'medium', 'large'].includes(value)
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
    }
  })

  defineEmits(['close'])
</script>

<style lang="scss">
  .tags-group {
    display: flex;
    gap: 4px;
  }
  .ui-tag {
    display: inline-flex;
    align-items: center;
    border-radius: 4px;
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;

    // 크기 변형
    &--small {
      color: var(--color-gray-0, #fff);
      font-size: 12px;
      padding: 4px 6px;
      height: 22px;
      line-height: 1;

      .ui-tag__close {
        font-size: 12px;
        margin-left: 4px;
        color: var(--color-gray-0, #fff);
      }
    }

    &--medium {
      font-size: $font-size-md;
      padding: 4px 8px;

      .ui-tag__close {
        font-size: 16px;
        margin-left: 4px;
      }
    }

    &--large {
      font-size: $font-size-sm;
      padding: 6px 10px;

      .ui-tag__close {
        font-size: 18px;
        margin-left: 6px;
      }
    }

    // 색상 변형
    &--default {
      background-color: #f0f0f0;
      color: $text-color;
      border: 1px solid $border-color;
    }

    &--primary {
      background: var(--color-primary-50, #0af);
    }

    // 협업, 공유 등의 특수 태그
    &--collaboration {
      background: var(--color-primary-70, #069);
    }

    // 공유
    &--shared {
      background: var(--color-primary-90, #023);
    }

    // 이름
    &--name {
      background: var(--color-system-g40, #008033);
    }

    // 완료
    &--completed {
      background: var(--color-system-b30, #0084ff);
    }

    // 마감
    &--deadline {
      background: var(--color-gray-30, #b1b8be);
    }

    // 닫기 버튼
    &__close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      color: var(--color-gray-0, #fff);
      opacity: 0.7;
      line-height: 1;

      &:hover {
        opacity: 1;
      }
    }
  }
</style>
