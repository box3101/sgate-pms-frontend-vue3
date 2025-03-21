<template>
  <div
    class="ui-textarea"
    :class="[
      {
        'ui-textarea--disabled': disabled,
        'ui-textarea--error': error,
        'ui-textarea--resizable': resizable,
        'ui-textarea--block': block,
      }
    ]"
  >
    <label v-if="label" class="ui-textarea__label" :for="id">
      {{ label }}
      <span v-if="required" class="ui-textarea__required">*</span>
    </label>

    <div class="ui-textarea__wrapper">
      <textarea
        :id="id"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :readonly="readonly"
        :maxlength="maxlength"
        :rows="rows"
        :name="name"
        class="ui-textarea__field"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        @change="$emit('change', $event)"
      ></textarea>

      <div v-if="maxlength && showCount" class="ui-textarea__counter">
        {{ modelValue?.length || 0 }}/{{ maxlength }}
      </div>
    </div>

    <div v-if="error" class="ui-textarea__error">{{ errorMessage }}</div>
    <div v-else-if="helperText" class="ui-textarea__helper">{{ helperText }}</div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  modelValue: {
    type: String,
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
  rows: {
    type: [String, Number],
    default: 4,
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
    default: () => `ui-textarea-${Math.random().toString(36).substring(2, 9)}`,
  },
  name: {
    type: String,
    default: '',
  },
  maxlength: {
    type: [String, Number],
    default: undefined,
  },
  showCount: {
    type: Boolean,
    default: false,
  },
  resizable: {
    type: Boolean,
    default: true,
  },
});

defineEmits(['update:modelValue', 'focus', 'blur', 'change']);
</script>

<style lang="scss" scoped>
.ui-textarea {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
  font-family: inherit;

  &__label {
    font-size: $font-size-sm;
    font-weight: 500;
    color: $text-color;
  }

  &__required {
    color: $error-color;
    margin-left: 2px;
  }

  &__wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
  }

  &__field {
    width: 100%;
    padding: $spacing-sm;
    border: 1px solid $border-color;
    border-radius: 6px;
    background-color: white;
    font-size: $font-size-sm;
    color: $text-color;
    resize: none;
    transition: all $transition-normal ease;
    font-family: inherit;
    line-height: 1.5;
    min-height: 100px;

    &:focus {
      outline: none;
      border-color: $primary-color;
      box-shadow: 0 0 0 2px rgba($primary-color, 0.2);
    }

    &::placeholder {
      color: #aaa;
    }
  }

  &__counter {
    position: absolute;
    bottom: $spacing-xs;
    right: $spacing-xs;
    font-size: $font-size-xs;
    color: #aaa;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 2px 4px;
    border-radius: 4px;
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
    color: #aaa;
  }

  // 수정자
  &--block {
    width: 100%;
  }

  &--resizable {
    .ui-textarea__field {
      resize: vertical;
    }
  }

  &--disabled {
    opacity: 0.5;

    .ui-textarea__field {
      background-color: #f0f0f0;
      cursor: not-allowed;
    }
  }

  &--error {
    .ui-textarea__field {
      border-color: $error-color;

      &:focus {
        box-shadow: 0 0 0 2px rgba($error-color, 0.2);
      }
    }
  }
}
</style>