<template>
  <button
    class="ui-button"
    :class="[
      `ui-button--${variant}`,
      `ui-button--${size}`,
      { 'ui-button--block': block, 'ui-button--icon-only': iconOnly, 'ui-button--radius0': radius0 }
    ]"
    :disabled="disabled || loading"
    :type="type"
    @click="$emit('click', $event)"
  >
    <div class="ui-button__content" :class="{ 'ui-button__content--loading': loading }">
      <Icon
        v-if="icon && iconPosition === 'left'"
        :name="icon"
        class="ui-button__icon ui-button__icon--left"
      />
      <span v-if="!iconOnly" class="ui-button__text"><slot></slot></span>
      <span v-if="iconOnly" class="ui-button__icon-only">
        <slot></slot>
      </span>
      <Icon
        v-if="icon && iconPosition === 'right'"
        :name="icon"
        class="ui-button__icon ui-button__icon--right"
      />
    </div>
    <div v-if="loading" class="ui-button__loader">
      <span class="ui-button__loader-dot"></span>
      <span class="ui-button__loader-dot"></span>
      <span class="ui-button__loader-dot"></span>
    </div>
  </button>
</template>

<script setup>
  defineProps({
    variant: {
      type: String,
      default: 'primary',
      validator: value =>
        [
          'primary',
          'secondary',
          'primary-line',
          'secondary-line',
          'tertiary',
          'danger',
          'ghost',
          'white',
          'info'
        ].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large', 'xlarge'].includes(value)
    },
    icon: {
      type: String,
      default: ''
    },
    iconPosition: {
      type: String,
      default: 'left',
      validator: value => ['left', 'right'].includes(value)
    },
    iconOnly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    radius0: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'button',
      validator: value => ['button', 'submit', 'reset'].includes(value)
    }
  })

  defineEmits(['click'])
</script>
<style lang="scss" scoped>
  @use 'sass:color';

  .ui-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-weight: 400;
    cursor: pointer;
    transition: all $transition-normal ease;
    border: none;
    outline: none;
    overflow: hidden;
    color: $text-light-color;

    &__text {
      white-space: nowrap;
      display: flex;
      gap: 7px;
      align-items: center;
    }

    &__content {
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity $transition-normal;

      &--loading {
        opacity: 0;
      }
    }

    &__icon-only {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__icon {
      flex-shrink: 0;

      &--left {
        margin-right: $spacing-sm;
      }

      &--right {
        margin-left: $spacing-sm;
      }
    }

    &__loader {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: $spacing-xs;
    }

    &__loader-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: currentColor;
      opacity: 0.7;
      animation: loader-dot 1s infinite ease-in-out;

      &:nth-child(1) {
        animation-delay: 0s;
      }

      &:nth-child(2) {
        animation-delay: 0.2s;
      }

      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }

    // Variants
    &--white {
      background-color: white;
      border: 1px solid #555;
      color: #555;

      &:hover:not(:disabled) {
        background-color: #555;
        color: white;
      }

      &:active:not(:disabled) {
        background-color: #555;
        color: white;
      }
    }

    &--primary {
      background-color: #00aaff;
      color: $text-light-color;

      &:hover:not(:disabled) {
        background-color: #0088cc;
      }

      &:active:not(:disabled) {
        background-color: #006699;
      }
    }

    &--secondary {
      background-color: #58616a;
      color: $text-light-color;

      &:hover:not(:disabled) {
        background-color: #464c53;
      }

      &:active:not(:disabled) {
        background-color: #33363d;
      }
    }

    &--primary-line {
      background-color: #fff;
      border: 1px solid #00aaff;
      color: #00aaff;

      &:hover:not(:disabled) {
        background-color: #e5f6ff;
      }

      &:active:not(:disabled) {
        background-color: #cceeff;
      }
    }

    &--secondary-line {
      background-color: #fff;
      border: 1px solid #58616a;
      color: #58616a;

      &:hover:not(:disabled) {
        background-color: #f4f5f6;
      }

      &:active:not(:disabled) {
        background-color: #e6e8ea;
      }
    }

    &--tertiary {
      background-color: $tertiary-color;
      color: #000;

      &:hover:not(:disabled) {
        background-color: $tertiary-hover-color;
      }

      &:active:not(:disabled) {
        background-color: $tertiary-active-color;
      }
    }

    &--danger {
      background-color: $danger-color;
      color: $text-light-color;

      &:hover:not(:disabled) {
        background-color: $danger-hover-color;
      }

      &:active:not(:disabled) {
        background-color: $danger-active-color;
      }
    }

    &--ghost {
      background-color: transparent;
      color: $text-color;

      &:hover:not(:disabled) {
        background-color: $ghost-hover-color;
      }

      &:active:not(:disabled) {
        background-color: $ghost-active-color;
      }
    }

    // Sizes
    &--small {
      display: inline-flex;
      height: 28px;
      padding: 3px 9px;
      justify-content: center;
      align-items: center;
      @include font-style($body-xsmall-bold);

      &.ui-button--icon-only {
        width: 28px;
        padding: 3px;
      }
    }

    &--medium {
      display: inline-flex;
      height: 32px;
      padding: 5px 12px;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      @include font-style($body-small-bold);

      &.ui-button--icon-only {
        width: 32px;
        padding: 5px;
      }
    }

    &--large {
      display: inline-flex;
      height: 34px;
      padding: 3px 12px;
      justify-content: center;
      align-items: center;
      @include font-style($body-small-bold);

      &.ui-button--icon-only {
        width: 34px;
        padding: 3px;
      }
    }

    &--xlarge {
      display: inline-flex;
      height: 44px;
      padding: 4px 16px;
      justify-content: center;
      align-items: center;
      @include font-style($head-xxsmall);

      &.ui-button--icon-only {
        width: 44px;
        padding: 4px;
      }
    }

    // Block
    &--block {
      display: flex;
      width: 100%;
    }

    // Radius0
    &--radius0 {
      border-radius: 0;
    }

    // Disabled state
    &:disabled {
      background-color: #e6e8ea;
      color: #a0a4a8;
      border-color: #cdd1d5;
      cursor: not-allowed;
      opacity: 1;
    }
  }

  @keyframes loader-dot {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }

  @media (max-width: 768px) {
    .ui-button {
      &--small {
        padding: 4px 10px;
      }

      &--medium {
        height: 32px;
        padding: 6px 14px;
      }

      &--large {
        padding: 4px 14px;
      }

      &--xlarge {
        padding: 5px 18px;
      }
    }
  }
</style>
