<template>
  <button
    class="ui-button"
    :class="[
      `ui-button--${variant}`,
      `ui-button--${size}`,
      { 'ui-button--block': block, 'ui-button--icon-only': iconOnly, 'ui-button--radius0': radius0 },
    ]"
    :disabled="disabled || loading"
    :type="type"
    @click="$emit('click', $event)"
  >
    <div
      class="ui-button__content"
      :class="{ 'ui-button__content--loading': loading }"
    >
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
    default: "primary",
    validator: (value) =>
      ["primary", "secondary", "tertiary", "danger", "ghost", "white","info"].includes(value),
  },
  size: {
    type: String,
    default: "medium",
    validator: (value) => ["small", "medium", "large", "xlarge"].includes(value),
  },
  icon: {
    type: String,
    default: "",
  },
  iconPosition: {
    type: String,
    default: "left",
    validator: (value) => ["left", "right"].includes(value),
  },
  iconOnly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
  radius0: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "button",
    validator: (value) => ["button", "submit", "reset"].includes(value),
  },
});

defineEmits(["click"]);
</script>
<style lang="scss" scoped>
@use "sass:color";

.ui-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-weight: 400;
  cursor: pointer;
  transition: all $transition-normal ease;
  border: none;
  outline: none;
  overflow: hidden;

  &__text{
    white-space: nowrap;
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
    background-color: $primary-color;
    color: white;

    &:hover:not(:disabled) {
      background-color: $primary-hover-color;
    }

    &:active:not(:disabled) {
      background-color: $primary-active-color;
    }
  }

  &--secondary {
    background-color: $secondary-color;
    color: $primary-color;

    &:hover:not(:disabled) {
      background-color: $secondary-hover-color;
    }

    &:active:not(:disabled) {
      background-color: $secondary-active-color;
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
    color: white;

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
    height: 32px;
    padding: 0 $spacing-sm;
    font-size: $font-size-sm;

    &.ui-button--icon-only {
      width: 32px;
      padding: 0;
    }
  }

  &--medium {
    height: 40px;
    padding: 0 $spacing-lg;
    font-size: $font-size-sm;

    &.ui-button--icon-only {
      width: 40px;
    }
  }

  &--large {
    height: 48px;
    padding: 0 $spacing-xl;
    font-size: $font-size-md;

    &.ui-button--icon-only {
      width: 48px;
      padding: 0;
    }
  }

  &--xlarge {
    height: 56px;
    padding: 0 $spacing-xl;
    font-size: $font-size-md;
    font-weight: bold;
    border: 1px solid #ccc;

    &.ui-button--icon-only {
      width: 60px;
      padding: 0;
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
    opacity: 0.5;
    cursor: not-allowed;
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
      height: 36px;
    }

    &--medium {
      height: 44px;
    }

    &--large {
      height: 52px;
    }
    &--xlarge {
      height: 60px;
    }
  }
}
</style>
