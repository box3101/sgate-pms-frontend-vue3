<template>
  <div v-if="modelValue" class="ui-popup">
    <div v-if="!noDim" class="ui-popup__backdrop" @click="closeOnBackdropClick && $emit('update:modelValue', false)"></div>
    <div
      class="ui-popup__content"
      :class="[
        `ui-popup--${size}`,
        { 'ui-popup--centered': centered },
        { 'ui-popup--right': position === 'right' },
        { 'ui-popup--no-dim': noDim }
      ]"
    >
      <div v-if="position === 'right'" class="ui-popup__resize-handle"></div>
      <div class="ui-popup__header">
        <h3 class="ui-popup__title">{{ title }}</h3>
        <button
          v-if="showCloseButton"
          class="ui-popup__close"
          @click="$emit('update:modelValue', false)"
        >
          <Icon name="heroicons:x-mark" />
        </button>
      </div>
      <div class="ui-popup__body">
        <slot></slot>
      </div>
      <div v-if="$slots.footer" class="ui-popup__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "medium",
    validator: (value) => ["small", "medium", "large", "full"].includes(value),
  },
  centered: {
    type: Boolean,
    default: true,
  },
  showCloseButton: {
    type: Boolean,
    default: true,
  },
  closeOnBackdropClick: {
    type: Boolean,
    default: true,
  },
  position: {
    type: String,
    default: "center",
    validator: (value) => ["center", "right"].includes(value),
  },
  noDim: {
    type: Boolean,
    default: false,
  }
});

defineEmits(["update:modelValue"]);

let isResizing = false;
let startX = 0;
let startWidth = 0;
let modalElement = null;

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
});

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
});

function handleResizeStart(e) {
  if (props.position !== 'right') return;

  isResizing = true;
  startX = e.clientX;
  modalElement = e.target.closest('.ui-popup__content');
  startWidth = modalElement.offsetWidth;

  document.body.style.cursor = 'ew-resize';
  e.preventDefault();
}

function handleMouseMove(e) {
  if (!isResizing) return;

  const width = startWidth - (e.clientX - startX);
  const maxWidth = 1000;
  const minWidth = 300;

  if (width >= minWidth && width <= maxWidth) {
    modalElement.style.width = `${width}px`;
  }
}

function handleMouseUp() {
  isResizing = false;
  document.body.style.cursor = '';
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
  overflow-y: auto;

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
    justify-content: space-between;
    padding: $spacing-lg;
    border-bottom: 1px solid $border-color;
  }

  &__title {
    margin: 0;
    font-size: $font-size-lg;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__close {
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
  }

  &__body {
    padding: $spacing-lg;
    overflow-y: auto;
    flex-grow: 1;
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
    max-width: 400px;
  }

  &--medium {
    max-width: 600px;
  }

  &--large {
    max-width: 800px;
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
    width: 400px;
    max-width: 1000px;
    height: 100vh;
    max-height: 100vh;
    animation: slide-in-right $transition-normal forwards;
  }

  &--no-dim {
    z-index: 1000;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
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
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .ui-popup {
    &__content {
      margin: $spacing-md;
      max-height: calc(100vh - #{$spacing-md * 2});
    }

    &--small,
    &--medium,
    &--large {
      max-width: calc(100vw - #{$spacing-md * 2});
    }

    &--right {
      max-width: 80vw;
      margin: 0;
    }
  }
}
</style>