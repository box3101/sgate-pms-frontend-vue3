<template>
  <button
    class="ui-button"
    :class="[
      `ui-button--${size}`,
      `ui-button--${variant}`,
      {
        'ui-button--disabled': disabled,
        'ui-button--block': block,
        'ui-button--with-icon': icon,
        'ui-button--icon-only': iconOnly
      }
    ]"
    :disabled="disabled"
    :type="nativeType"
    @click="$emit('click', $event)"
  >
    <Icon v-if="icon" :name="icon" class="ui-button__icon" />
    <span v-if="$slots.default" class="ui-button__text">
      <slot />
    </span>
  </button>
</template>

<script setup>
  import { defineProps, defineEmits } from 'vue'

  // 버튼 컴포넌트의 속성 정의
  defineProps({
    // 버튼 크기 (small, medium, large, xlarge)
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large', 'xlarge'].includes(value)
    },
    // 버튼 스타일 변형 (primary, secondary, primary-line, secondary-line)
    variant: {
      type: String,
      default: 'primary',
      validator: value =>
        ['primary', 'secondary', 'primary-line', 'secondary-line', 'ghost'].includes(value)
    },
    // 버튼에 표시할 아이콘 이름
    icon: {
      type: String,
      default: ''
    },
    // 아이콘만 표시할지 여부
    iconOnly: {
      type: Boolean,
      default: false
    },
    // 버튼 비활성화 여부
    disabled: {
      type: Boolean,
      default: false
    },
    // 버튼을 블록 레벨 요소로 표시할지 여부
    block: {
      type: Boolean,
      default: false
    },
    // 버튼의 HTML type 속성 (button, submit, reset)
    nativeType: {
      type: String,
      default: 'button',
      validator: value => ['button', 'submit', 'reset'].includes(value)
    }
  })

  // 클릭 이벤트 발생 시 상위 컴포넌트에 전달
  defineEmits(['click'])
</script>

<style lang="scss" scoped>
  .ui-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 2px;
    border-radius: $border-radius-sm;
    transition: all $transition-normal ease;
    cursor: pointer;
    border: none;
    outline: none;
    flex-shrink: 0;

    // 아이콘 스타일
    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    // 텍스트 스타일
    &__text {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
    }

    // 크기 변형
    &--small {
      height: 30px;
      display: inline-flex;
      padding: 3px 9px;
      justify-content: center;
      align-items: center;
      gap: 2px;
      @include font-style($body-small-bold);
    }

    &--medium {
      height: 30px;
      padding: 5px 12px;
      justify-content: center;
      align-items: center;
      gap: 2px;
      flex-shrink: 0;
      @include font-style($body-small-bold);
    }

    &--icon-only {
      &.ui-button--medium {
        padding: 0 6px;
      }
    }

    &--large {
      height: 32px;
      padding: 3px 12px;
      justify-content: center;
      align-items: center;
      gap: 2px;
      @include font-style($body-large-bold);
    }

    &--xlarge {
      height: 42px;
      border-radius: 4px;
      padding: 4px 16px;
      justify-content: center;
      align-items: center;
      gap: 2px;
      @include font-style($body-large-bold);
      font-size: $font-size-xxl;
    }

    // 색상 변형
    &--primary {
      background-color: #00aaff;
      color: #fff;

      &:hover:not(:disabled) {
        background-color: #0088cc;
      }

      &:active:not(:disabled) {
        background-color: #006699;
      }

      &:disabled {
        background-color: #e6e8ea;
        color: var(--color-gray-40, #8a949e);
        cursor: not-allowed;
      }
    }

    &--secondary {
      background-color: #58616a;
      color: #fff;

      &:hover:not(:disabled) {
        background-color: #464c53;
      }

      &:active:not(:disabled) {
        background-color: #33363d;
      }

      &:disabled {
        background-color: #e6e8ea;
        color: var(--color-gray-40, #8a949e);
        cursor: not-allowed;
      }
    }

    &--primary-line {
      border: 1px solid var(--color-primary-50, #00aaff);
      background: var(--color-gray-0, #fff);
      color: var(--color-primary-50, #00aaff);

      &:hover:not(:disabled) {
        border: 1px solid var(--color-primary-50, #00aaff);
        background: var(--color-primary-5, #e5f6ff);
      }

      &:active:not(:disabled) {
        border: 1px solid var(--color-primary-50, #00aaff);
        background: var(--color-primary-10, #cceeff);
      }

      &:disabled {
        border: 1px solid var(--color-gray-20, #cdd1d5);
        background: var(--color-gray-0, #fff);
        color: var(--color-gray-40, #8a949e);
        cursor: not-allowed;
      }
    }

    &--secondary-line {
      border: 1px solid var(--color-gray-60, #58616a);
      background: var(--color-gray-0, #fff);
      color: var(--color-gray-60, #58616a);

      &:hover:not(:disabled) {
        border: 1px solid var(--color-gray-60, #58616a);
        background: var(--color-gray-5, #f4f5f6);
      }

      &:active:not(:disabled) {
        border: 1px solid var(--color-gray-60, #58616a);
        background: var(--color-gray-10, #e6e8ea);
      }

      &:disabled {
        border: 1px solid var(--color-gray-20, #cdd1d5);
        background: var(--color-gray-0, #fff);
        color: var(--color-gray-40, #8a949e);
        cursor: not-allowed;
      }
    }

    &--ghost {
      background: transparent;
      color: var(--color-gray-60, #58616a);
      transition: all 0.2s ease-in-out;

      &:hover:not(:disabled) {
        background: var(--color-gray-10, #e6e8ea); // 더 진한 회색으로 변경
        color: var(--color-gray-60, #58616a);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // 음영 효과 추가
      }

      &:active:not(:disabled) {
        background: var(--color-gray-15, #d9dbde); // 활성 상태 색상 조정
        color: var(--color-gray-60, #58616a);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); // 눌렀을 때 약간 작아지는 효과
      }

      &:disabled {
        background: transparent;
        color: var(--color-gray-40, #8a949e);
        cursor: not-allowed;
      }
    }

    // 수정자
    &--block {
      display: flex;
      width: 100%;
    }

    // 아이콘만 버튼
    &--icon-only {
      .ui-button__icon {
        margin-right: 0;
      }
    }

    // 반응형 스타일
    @media (max-width: 768px) {
      &--small {
        padding: 5px 10px;
      }

      &--medium {
        height: 32px;
        padding: 6px 12px;
      }

      &--large {
        height: 38px;
        padding: 8px 16px;
      }

      &--xlarge {
        height: 44px;
        padding: 10px 20px;
      }
    }
  }
</style>
