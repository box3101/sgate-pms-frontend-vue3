<template>
  <div :class="['ui-radio', `ui-radio--${size}`]">
    <input 
      :id="id" 
      type="radio" 
      class="ui-radio__input" 
      :checked="modelValue" 
      :disabled="disabled"
      :name="name"
      :value="value"
      @change="$emit('update:modelValue', value)"
    />
    <label :for="id" class="ui-radio__label">
      <slot>{{ label }}</slot>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: null
  },
  value: {
    type: [String, Number, Boolean],
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: () => `radio-${Math.random().toString(36).substring(2, 9)}`
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'medium',
    validator: (size) => ['small', 'medium', 'large'].includes(size)
  }
});

defineEmits(['update:modelValue']);
</script>

<style scoped lang="scss">
.ui-radio {
  display: flex;
  align-items: center;
  cursor: pointer;

  &--small {
    font-size: 12px;

    .ui-radio__input {
      width: 14px;
      height: 14px;
      margin-right: 6px;
    }
  }

  &--medium {
    font-size: 14px;

    .ui-radio__input {
      width: 18px;
      height: 18px;
      margin-right: 8px;
    }
  }

  &--large {
    font-size: $font-size-sm;

    .ui-radio__input {
      width: 22px;
      height: 22px;
      margin-right: 10px;
    }
  }

  &__input {
    appearance: none;
    -webkit-appearance: none;
    border: 1.5px solid #ccc;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
    transition: all 0.2s ease;

    &:checked {
      border-color: $primary-color;
      
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60%;
        height: 60%;
        border-radius: 50%;
        background-color: $primary-color;
      }
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__label {
    color: #333;
    cursor: pointer;
    user-select: none;
  }
}
</style>
