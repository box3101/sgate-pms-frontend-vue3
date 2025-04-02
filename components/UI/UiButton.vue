<template>
  <button
    :class="['ui-button', size, { 'is-active': active, 'is-loading': loading }]"
    :disabled="disabled"
    :loading="loading"
    :icon="icon"
  >
    <div v-if="loading"></div>
    <div v-else-if="icon">
      <Icon name="uil:clipboard-notes" size="24"></Icon>
      <slot></slot>
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </button>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: "size-md",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  icon:{
    type: Boolean,
    default: false,
  },
  iconName: {
    type: String,
    default: "uil:clipboard-notes",
  },
});
</script>

<style scoped>
.ui-button {
  background-color: #4a5568;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &.size-sm {
    padding: 4px 8px;
    font-size: 12px;
  }
  &.size-md {
    padding: 8px 16px;
    font-size: 14px;
  }
  &.size-lg {
    padding: 12px 24px;
    font-size: 16px;
  }

  &.is-loading {
    cursor: wait;
    opacity: 0.2;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: calc(50% - 8px);
      left: calc(50% - 8px);
      width: 16px;
      height: 16px;
      border: 2px solid transparent;
      border-top-color: #fff;
      border-radius: 50%;
      animation: spinner 0.8s linear infinite;
    }
  }

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
}

.ui-button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.ui-button.is-active {
  background-color: red;
}
</style>
