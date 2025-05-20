<template>
  <div class="ui-switch-container">
    <label :for="id" class="ui-switch-label" v-if="label">{{ label }}</label>
    <div
      class="ui-switch"
      :class="{ 'ui-switch--active': modelValue, 'ui-switch--disabled': disabled }"
      @click="updateValue"
    >
      <input
        :id="id"
        type="checkbox"
        class="ui-switch-input"
        :checked="modelValue"
        :disabled="disabled"
        @change="updateValue"
      />
      <div class="ui-switch-slider">
        <div class="ui-switch-button"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: () => `switch-${Math.random().toString(36).substring(2, 9)}`
    }
  })

  const emit = defineEmits(['update:modelValue'])

  const updateValue = event => {
    if (!props.disabled) {
      emit('update:modelValue', !props.modelValue)
    }
  }
</script>

<style scoped>
  .ui-switch-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .ui-switch-label {
    font-size: 14px;
    color: #333;
  }

  .ui-switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 22px;
    cursor: pointer;
  }

  .ui-switch--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .ui-switch-input {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
  }

  .ui-switch-slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #8a949e;
    border-radius: 34px;
    transition: 0.3s;
  }

  .ui-switch-button {
    position: absolute;
    content: '';
    height: 18px;
    width: 18px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    border-radius: 50%;
    transition: 0.3s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .ui-switch--active .ui-switch-slider {
    background-color: #00aaff;
  }

  .ui-switch--active .ui-switch-button {
    transform: translateX(18px);
  }
</style>
