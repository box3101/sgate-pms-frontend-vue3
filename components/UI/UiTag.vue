<template>
  <span
    class="ui-tag"
    :class="[`ui-tag--${size}`, `ui-tag--${variant}`, { 'ui-tag--closable': closable }]"
    :style="customStyles"
  >
    <slot>{{ text }}</slot>
    <button
      v-if="closable"
      class="ui-tag__close"
      type="button"
      @click.stop="$emit('close')"
      aria-label="태그 삭제"
    >
      <span class="ui-tag__close-icon"></span>
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
    }
  })

  defineEmits(['close'])

  const customStyles = computed(() => {
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
  :root {
    // 색상 변수 정의
    --color-gray-0: #ffffff;
    --color-gray-10: #f5f5f5;
    --color-gray-20: #e0e0e0;
    // 마감
    --color-gray-30: #b1b8be;
    --color-gray-60: #666666;
    --color-gray-80: #333333;

    // 기본
    --color-primary-50: #00aaff;
    // 디자인
    --color-primary-70: #0066cc;
    // 공유
    --color-primary-90: #002233;
    // 이름
    --color-system-g40: #008033;
    // 완료
    --color-system-b30: #0084ff;

    // 텍스트 색상
    --text-color: #333333;
    --border-color: #e0e0e0;

    // 글꼴 크기
    --font-size-xs: 12px;
    --font-size-sm: 14px;
    --font-size-md: 16px;
    --font-size-lg: 18px;
  }

  .ui-tag {
    display: inline-flex;
    align-items: center;
    border-radius: 4px;
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    transition: all 0.2s ease;
    user-select: none;

    &--small {
      padding: 2px 4px;
      @include font-style($body-xsmall-bold);
    }

    &--medium {
      padding: 2px 4px;
      @include font-style($body-xsmall-bold);
    }

    &--large {
      padding: 3px 4px;
      @include font-style($body-small-bold);
    }

    // 색상 변형
    &--default {
      background-color: var(--color-gray-10);
      color: var(--text-color);
      border: 1px solid var(--border-color);
    }

    &--primary {
      background-color: var(--color-primary-50);
      color: var(--color-gray-0);
    }

    &--collaboration {
      background-color: var(--color-primary-70);
      color: var(--color-gray-0);
    }

    &--shared {
      background-color: var(--color-primary-90);
      color: var(--color-gray-0);
    }

    &--name {
      background-color: var(--color-system-g40);
      color: var(--color-gray-0);
    }

    &--completed {
      background-color: var(--color-system-b30);
      color: var(--color-gray-0);
    }

    &--deadline {
      background-color: var(--color-gray-30);
      color: var(--color-gray-0);
    }

    &--closable {
      padding-right: 4px;
    }

    // 닫기 버튼
    &__close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-left: 4px;
      width: 16px;
      height: 16px;
      min-width: 16px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.2);
      border: none;
      cursor: pointer;
      padding: 0;
      color: var(--color-gray-0);
      position: relative;

      &:hover {
        background-color: rgba(0, 0, 0, 0.3);
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
      }
    }

    &__close-icon {
      position: relative;
      display: inline-block;
      width: 8px;
      height: 8px;

      &:before,
      &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: var(--color-gray-0);
        top: 50%;
        left: 0;
      }

      &:before {
        transform: rotate(45deg);
      }

      &:after {
        transform: rotate(-45deg);
      }
    }
  }

  // 태그 그룹 스타일
  .tags-group {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;

    &--vertical {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
