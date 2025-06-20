<template>
  <div
    class="ui-textarea"
    :class="[
      `ui-textarea--${size}`,
      {
        'ui-textarea--disabled': disabled,
        'ui-textarea--error': error,
        'ui-textarea--resizable': resizable,
        'ui-textarea--block': block,
        'ui-textarea--has-value': textareaHasValue
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
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
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
  import { defineProps, defineEmits, ref } from 'vue'

  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    rows: {
      type: [String, Number],
      default: 4
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large', 'xlarge'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ''
    },
    helperText: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: () => `ui-textarea-${Math.random().toString(36).substring(2, 9)}`
    },
    name: {
      type: String,
      default: ''
    },
    maxlength: {
      type: [String, Number],
      default: undefined
    },
    showCount: {
      type: Boolean,
      default: false
    },
    resizable: {
      type: Boolean,
      default: true
    }
  })

  const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'change'])

  // 내부 상태로 입력값 추적
  const textareaHasValue = ref(false)

  // 이벤트 핸들러 함수들
  const handleInput = event => {
    const newValue = event.target.value
    textareaHasValue.value = newValue.length > 0
    emit('update:modelValue', newValue)
  }

  const handleFocus = event => {
    emit('focus', event)
  }

  const handleBlur = event => {
    emit('blur', event)
  }

  const handleChange = event => {
    emit('change', event)
  }
</script>

<style lang="scss" scoped>
  .ui-textarea {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;

    // 값이 입력되었을 때 스타일
    &--has-value {
      .ui-textarea__field {
        border: 1px solid $border-color-filled;
      }
    }

    &__label {
      font-size: $font-size-sm;
      font-weight: 500;
      color: var(--color-gray-70, #464c53);
      margin-bottom: 4px;
    }

    &__required {
      color: var(--color-system-r30, #f30);
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
      border: 1px solid var(--color-gray-20, #cdd1d5);
      border-radius: 6px;
      background-color: var(--color-gray-0, #fff);
      font-size: $font-size-sm;
      color: var(--color-gray-70, #464c53);
      resize: none;
      transition: all $transition-normal ease;
      line-height: 1.5;
      min-height: 100px;

      &:focus {
        outline: none !important;
        border-color: var(--color-system-b30, #0084ff);
        box-shadow: none;
      }

      &::placeholder {
        color: $placeholder-color;
        font-family: $placeholder-font-family;
        font-size: $ui-font-md;
        font-style: normal;
        font-weight: $placeholder-font-weight;
        line-height: $placeholder-line-height;
      }
    }

    &__counter {
      position: absolute;
      bottom: $spacing-xs;
      right: $spacing-xs;
      font-size: $font-size-xs;
      color: var(--color-gray-40, #8a949e);
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
      color: var(--color-system-r30, #f30);
    }

    &__helper {
      color: var(--color-gray-60, #58616a);
    }

    // 크기 변형 - Small
    &--small {
      .ui-textarea__field {
        padding: $ui-padding-sm;
        font-size: $ui-font-sm;
        min-height: 80px;

        &::placeholder {
          font-size: $ui-font-sm;
        }
      }
      .ui-textarea__label {
        @include font-style($body-small);
      }
    }

    // 크기 변형 - Medium
    &--medium {
      .ui-textarea__field {
        padding: $ui-padding-sm;
        font-size: $ui-font-md;
        min-height: 100px;

        &::placeholder {
          font-size: $ui-font-md;
        }
      }
      .ui-textarea__label {
        @include font-style($body-medium);
      }
    }

    // 크기 변형 - Large
    &--large {
      .ui-textarea__field {
        padding: $ui-padding-lg;
        font-size: $ui-font-lg;
        min-height: 120px;

        &::placeholder {
          font-size: $ui-font-lg;
        }
      }
      .ui-textarea__label {
        @include font-style($body-large-bold);
      }
    }

    // 크기 변형 - XLarge
    &--xlarge {
      .ui-textarea__field {
        padding: $ui-padding-xl;
        font-size: $ui-font-xl;
        min-height: 140px;
        border-radius: 4px;

        &::placeholder {
          font-size: $ui-font-xl;
        }
      }
      .ui-textarea__label {
        @include font-style($body-xlarge-bold);
        font-size: $font-size-xxl;
      }
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

    // 상태 변형
    &--disabled {
      .ui-textarea__field {
        border: 1px solid var(--color-gray-20, #cdd1d5);
        background: var(--color-gray-10, #e6e8ea);
        color: var(--color-gray-30, #b1b8be);
        cursor: not-allowed;
      }
    }

    &--error {
      .ui-textarea__field {
        border: 1px solid var(--color-system-r30, #f30);
        color: var(--color-gray-70, #464c53);

        &:focus {
          outline: none;
          border-color: var(--color-system-r30, #f30);
        }
      }
    }
  }
</style>
