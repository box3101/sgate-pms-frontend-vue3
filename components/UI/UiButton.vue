<template>
  <button 
  :class="['ui-button', size ,{'is-active': active}]"
  :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: 'size-md',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
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
  &.size-md{
    padding: 8px 16px;
    font-size: 14px;
  }
  &.size-lg{
    padding: 12px 24px;
    font-size: 16px;
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