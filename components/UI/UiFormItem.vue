<template>
  <li class="ui-form-item">
    <div class="ui-form-item__label">{{ label }}</div>
    <div class="ui-form-item__content">
      <slot></slot>
    </div>
  </li>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  }
});
</script>

<style lang="scss" scoped>

.ui-form-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 44px;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }

  &__label {
    width: 90px;
    flex-shrink: 0;
    font-size: 14px;
    font-weight: 500;
  }

  &__content {
    flex: 1;
    min-width: 0; /* 내용 넘침 방지 */
  }

  &__actions {
    display: flex;
    gap: 8px;
    margin-left: 16px;
  }
}
</style>