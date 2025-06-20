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
      flex: none;
    }

    // 크기 변형 - _variables.scss에 정의된 높이 변수 사용
    &--small {
      height: $ui-height-sm; // 32px
      display: inline-flex;
      padding: $ui-padding-sm;
      justify-content: center;
      align-items: center;
      gap: 2px;
      min-width: 64px;
      font-size: $ui-font-sm;
      @include font-style($body-small-bold);
    }

    &--medium {
      height: $ui-height-md; // 40px
      padding: $ui-padding-md;
      justify-content: center;
      align-items: center;
      gap: 2px;
      flex-shrink: 0;
      min-width: 72px;
      font-size: $ui-font-md;
      @include font-style($body-small-bold);
    }

    &--icon-only {
      min-width: auto;
      
      // 아이콘만 있는 버튼은 정사각형으로 설정
      &.ui-button--small {
        width: $ui-height-sm;
        height: $ui-height-sm;
        padding: 0;
      }
      
      &.ui-button--medium {
        width: $ui-height-md;
        height: $ui-height-md;
        padding: 0;
      }
      
      &.ui-button--large {
        width: $ui-height-lg;
        height: $ui-height-lg;
        padding: 0;
      }
      
      &.ui-button--xlarge {
        width: $ui-height-xl;
        height: $ui-height-xl;
        padding: 0;
      }
      
      .ui-button__icon {
        margin: 0;
      }
    }

    &--large {
      height: $ui-height-lg; // 48px
      padding: $ui-padding-lg;
      justify-content: center;
      align-items: center;
      gap: 2px;
      min-width: 88px;
      font-size: $ui-font-lg;
      @include font-style($body-medium);
    }

    &--xlarge {
      height: $ui-height-xl; // 56px
      border-radius: 4px;
      padding: $ui-padding-xl;
      justify-content: center;
      align-items: center;
      gap: 2px;
      font-size: $ui-font-xl;
      @include font-style($body-large-bold);
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
        opacity: 0.4;
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
      color: $gray-70;
      border: 1px solid transparent; // 테두리 추가로 더 명확하게
      transition: all 0.2s ease-in-out;

      &:hover:not(:disabled) {
        background: var(--color-gray-10, #e6e8ea);
        color: var(--color-gray-80, #33363d); // 더 진한 텍스트로 가독성 향상
        border-color: var(--color-gray-20, #cdd1d5); // 테두리로 경계 명확화
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12); // 더 강한 그림자
      }

      &:active:not(:disabled) {
        background: var(--color-gray-20, #cdd1d5); // 더 진한 배경
        color: var(--color-gray-80, #33363d);
        border-color: var(--color-gray-30, #b1b8be);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15); // 눌림 효과
      }

      &:disabled {
        background: transparent;
        color: var(--color-gray-30, #b1b8be); // 더 연한 색으로 비활성화 표시
        border-color: transparent;
        cursor: not-allowed;
        opacity: 0.6; // 투명도로 비활성화 강조
      }
    }

    // 수정자
    &--block {
      display: flex;
      width: 100%;
    }

    // 반응형 스타일
    @media (max-width: 768px) {
      &--small {
        height: $ui-height-sm;
        padding: $ui-padding-sm;
      }

      &--medium {
        height: $ui-height-md;
        padding: $ui-padding-md;
      }

      &--large {
        height: $ui-height-lg;
        padding: $ui-padding-lg;
      }

      &--xlarge {
        height: $ui-height-xl;
        padding: $ui-padding-xl;
      }
    }
  }
</style>
