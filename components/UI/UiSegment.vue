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
    required: true,
  },
  options: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every((option) => "value" in option && "label" in option);
    },
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (value) => {
  emit("update:modelValue", value);
};
</script>
<style lang="scss" scoped>
.ui-segment-control {
  display: inline-flex;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid $border-color;
  background-color: $background-color;
  width: 100%;
  max-width: 131px;
}

.segment-button {
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  background: transparent;
  font-size: $font-size-sm;
  transition: all $transition-normal ease;
  flex: 1;
  text-align: center;
  color: $text-color;
  position: relative;
  white-space: nowrap;
}

.segment-button.active {
  background-color: $primary-color;
  color: white;
  font-weight: 500;
}

.segment-button:hover:not(.active) {
  background-color: darken(#f5f5f5, 5%);
}

.segment-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba($primary-color, 0.2);
}
</style>
