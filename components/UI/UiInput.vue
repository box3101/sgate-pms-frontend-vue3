<template>
  <div
    class="ui-input"
    :class="[
      `ui-input--${size}`,
      {
        'ui-input--disabled': disabled,
        'ui-input--error': error,
        'ui-input--block': block,
        'ui-input--with-icon': icon,
        'ui-input--with-prefix': prefix,
        'ui-input--with-suffix': suffix,
        'ui-input--with-prefix-icon': prefixIcon,
        'ui-input--with-suffix-icon': suffixIcon
      }
    ]"
  >
    <label v-if="label" class="ui-input__label" :for="id">
      {{ label }}
      <span v-if="required" class="ui-input__required">*</span>
    </label>

    <div class="ui-input__wrapper">
      <div v-if="prefix" class="ui-input__prefix">{{ prefix }}</div>
      <Icon v-if="prefixIcon" :name="prefixIcon" class="ui-input__prefix-icon" />
      <Icon v-if="icon" :name="icon" class="ui-input__icon" />

      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :readonly="readonly"
        :maxlength="maxlength"
        :min="min"
        :max="max"
        :step="step"
        :name="name"
        :autocomplete="autocomplete"
        class="ui-input__field"
        :class="{ 'ui-input__field--with-prefix-icon': prefixIcon }"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        @change="$emit('change', $event)"
      />

      <Icon v-if="suffixIcon" :name="suffixIcon" class="ui-input__suffix-icon" />
      <div v-if="suffix" class="ui-input__suffix">{{ suffix }}</div>
      <Icon v-if="clearable && modelValue" name="x-circle" class="ui-input__clear" @click="$emit('update:modelValue', '')" />
    </div>

    <div v-if="error" class="ui-input__error">{{ errorMessage }}</div>
    <div v-else-if="helperText" class="ui-input__helper">{{ helperText }}</div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) => [
      'text', 'password', 'email', 'number', 'tel', 'url', 'search', 'date', 'time', 'datetime-local'
    ].includes(value),
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value),
  },
  icon: {
    type: String,
    default: '',
  },
  prefixIcon: {
    type: String,
    default: '',
  },
  suffixIcon: {
    type: String,
    default: '',
  },
  prefix: {
    type: String,
    default: '',
  },
  suffix: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
  helperText: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: () => `ui-input-${Math.random().toString(36).substring(2, 9)}`,
  },
  name: {
    type: String,
    default: '',
  },
  maxlength: {
    type: [String, Number],
    default: undefined,
  },
  min: {
    type: [String, Number],
    default: undefined,
  },
  max: {
    type: [String, Number],
    default: undefined,
  },
  step: {
    type: [String, Number],
    default: undefined,
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
});

defineEmits(['update:modelValue', 'focus', 'blur', 'change']);
</script>

<style lang="scss" scoped>
.ui-input {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;

  &__label {
    font-size: $font-size-sm;
    font-weight: 500;
    color: #555;
    margin-bottom: 4px;
  }

  &__required {
    color: $error-color;
    margin-left: 2px;
  }

  &__wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background-color: white;
    border: 1px solid $border-color;
    border-radius: 6px;
    transition: all $transition-normal ease;

    &:focus-within {
      border-color: $primary-color;
      box-shadow: 0 0 0 2px rgba($primary-color, 0.2);
    }
  }

  &__prefix-icon {
    margin-left: 12px;
    color: #aaa;
    font-size: $font-size-xl;
    margin-right: 5px;
  }

  &__suffix-icon {
    margin-right: 12px;
    color: #aaa;
    font-size: $font-size-xl;
    margin-left: 5px;
  }

  &__field {
    width: 100%;
    border: none;
    background: transparent;
    font-size: $font-size-sm;
    color: $text-color;
    outline: none;
    padding: 0 12px;
    height: 100%;

    &::placeholder {
      color: #333;
    }

    &--with-prefix-icon {
      padding-left: 6px;
    }
  }

  &__icon,
  &__clear {
    flex-shrink: 0;
    color: #333;
  }

  &__icon {
    margin-left: $spacing-sm;
  }

  &__clear {
    margin-right: $spacing-sm;
    cursor: pointer;
    transition: color $transition-normal ease;

    &:hover {
      color: $text-color;
    }
  }

  &__prefix,
  &__suffix {
    color: #333;
    font-size: $font-size-sm;
  }

  &__prefix {
    padding-left: $spacing-sm;
  }

  &__suffix {
    padding-right: $spacing-sm;
  }

  &__error,
  &__helper {
    font-size: $font-size-xs;
    margin-top: 2px;
  }

  &__error {
    color: $error-color;
  }

  &__helper {
    color: #333;
  }

  // Sizes
  &--small {
    .ui-input__wrapper {
      height: 32px;
    }
    .ui-input__field {
      font-size: $font-size-xs;
    }
  }

  &--medium {
    .ui-input__wrapper {
      height: 40px;
    }
    .ui-input__field {
      font-size: $font-size-sm;
    }
  }

  &--large {
    .ui-input__wrapper {
      height: 48px;
    }
    .ui-input__field {
      font-size: $font-size-md;
    }
  }

  // Block
  &--block {
    .ui-input__wrapper {
      width: 100%;
    }
  }

  // States
  &--disabled {
    opacity: 0.5;

    .ui-input__wrapper {
      background-color: #f0f0f0;
      cursor: not-allowed;
    }

    .ui-input__field {
      cursor: not-allowed;
    }
  }

  &--error {
    .ui-input__wrapper {
      border-color: $error-color;

      &:focus-within {
        box-shadow: 0 0 0 2px rgba($error-color, 0.2);
      }
    }
  }

  // Modifiers
  &--with-icon,
  &--with-prefix,
  &--with-suffix,
  &--with-prefix-icon,
  &--with-suffix-icon {
    .ui-input__field {
      padding-left: 0;
    }
  }
}

@media (max-width: 768px) {
  .ui-input {
    &--small {
      .ui-input__wrapper {
        height: 36px;
      }
    }

    &--medium {
      .ui-input__wrapper {
        height: 44px;
      }
    }

    &--large {
      .ui-input__wrapper {
        height: 52px;
      }
    }
  }
}
</style>