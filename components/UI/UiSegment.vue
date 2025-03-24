<template>
  <div class="ui-segment-control">
    <button
      v-for="(option, index) in options"
      :key="index"
      class="segment-button"
      :class="{ active: modelValue === option.value }"
      @click="updateValue(option.value)"
      type="button"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    required: true
  },
  options: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(option => 'value' in option && 'label' in option);
    }
  }
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (value) => {
  emit('update:modelValue', value);
};
</script>

<style scoped>
.ui-segment-control {
  display: inline-flex;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  background-color: #f5f5f5;
}

.segment-button {
  padding: 8px 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  min-width: 60px;
  text-align: center;
  color: #666;
  position: relative;
}


.segment-button.active {
  background-color: #2196F3;
  color: white;
  font-weight: 500;
}

.segment-button:hover:not(.active) {
  background-color: #e8e8e8;
}

.segment-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.3);
}
</style>