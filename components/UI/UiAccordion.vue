<template>
  <div class="ui-accordion" :class="{ 'is-active': modelValue }">
    <div class="accordion-header" @click="toggleAccordion">
      <div class="accordion-title">{{ title }}</div>
      <div class="accordion-icon" :class="{ 'accordion-icon--open': modelValue }">
        <Icon name="heroicons:chevron-down" size="16" />
      </div>
    </div>
    <div v-show="modelValue" class="accordion-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    modelValue: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['update:modelValue'])

  function toggleAccordion() {
    emit('update:modelValue', !props.modelValue)
  }
</script>

<style scoped>
  .ui-accordion {
    border-radius: 8px;
    border: 2px solid var(--color-gray-20, #cdd1d5);
    background: var(--color-gray-0, #fff);
    margin-bottom: 8px;
    &.is-active {
      .accordion-title {
        color: var(--color-primary-50, #00aaff);
      }
      .iconify {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='%2300aaff' stroke-linecap='round' stroke-linejoin='round' stroke-width='10' d='m19.5 8.25l-7.5 7.5l-7.5-7.5'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: center;
      }
      border: 2px solid #9df;
    }
  }

  .accordion-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    cursor: pointer;
    user-select: none;
    border-radius: 8px;
  }

  .accordion-header:hover {
    background-color: var(--color-gray-10, #f1f1f1);
  }

  .accordion-title {
    color: var(--color-primary-50, #00aaff);
    font-size: var(--font_size-font_S-title, 20px);
    font-weight: 700;
    line-height: 20px;
  }

  .accordion-icon {
    transition: transform 0.3s ease;
  }

  .accordion-icon--open {
    transform: rotate(180deg);
  }

  .accordion-content {
    padding: 12px 16px;
    background-color: var(--color-gray-0, #fff);
    border-radius: 8px;
  }
</style>
