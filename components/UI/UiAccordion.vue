<template>
  <div class="ui-accordion">
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
});

const emit = defineEmits(['update:modelValue']);

function toggleAccordion() {
  emit('update:modelValue', !props.modelValue);
}
</script>

<style scoped>
.ui-accordion {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 8px;
}

.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #f9f9f9;
  cursor: pointer;
  user-select: none;
}

.accordion-header:hover {
  background-color: #f1f1f1;
}

.accordion-title {
  font-weight: 500;
  font-size: 14px;
}

.accordion-icon {
  transition: transform 0.3s ease;
}

.accordion-icon--open {
  transform: rotate(180deg);
}

.accordion-content {
  padding: 12px 16px;
  border-top: 1px solid #e0e0e0;
  background-color: #ffffff;
}
</style>