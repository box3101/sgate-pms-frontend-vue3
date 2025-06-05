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
        'ui-input--with-suffix-icon': suffixIcon,
        'ui-input--has-value': inputHasValue,
        'ui-input--focused': isFocused
      }
    ]"
  >
    <label v-if="label" class="ui-input__label" :for="id">
      {{ label }}
      <span v-if="required" class="ui-input__required">*</span>
    </label>

    <div class="ui-input__wrapper">
      <div v-if="prefix" class="ui-input__prefix">{{ prefix }}</div>
      <i
        v-if="prefixIcon"
        :class="`icon icon-${prefixIcon} icon-md`"
        class="ui-input__prefix-icon"
      ></i>
      <i v-if="icon" :class="`icon icon-${icon} icon-md`" class="ui-input__icon"></i>

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
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      />

      <i
        v-if="suffixIcon"
        :class="`icon icon-${suffixIcon} icon-md`"
        class="ui-input__suffix-icon"
      ></i>
      <div v-if="suffix" class="ui-input__suffix">{{ suffix }}</div>
      <i
        v-if="clearable && modelValue && isFocused"
        class="icon icon-x-circle icon-md ui-input__clear"
        @click="clearInput"
      ></i>
    </div>

    <div v-if="error" class="ui-input__error">{{ errorMessage }}</div>
    <div v-else-if="helperText" class="ui-input__helper">{{ helperText }}</div>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits, ref } from 'vue'

  const props = defineProps({
    modelValue: {
      type: [String, Number],
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
    type: {
      type: String,
      default: 'text',
      validator: value =>
        [
          'text',
          'password',
          'email',
          'number',
          'tel',
          'url',
          'search',
          'date',
          'time',
          'datetime-local'
        ].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large', 'xlarge'].includes(value)
    },
    icon: {
      type: String,
      default: ''
    },
    prefixIcon: {
      type: String,
      default: ''
    },
    suffixIcon: {
      type: String,
      default: ''
    },
    prefix: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: ''
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
    clearable: {
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
      default: () => `ui-input-${Math.random().toString(36).substring(2, 9)}`
    },
    name: {
      type: String,
      default: ''
    },
    maxlength: {
      type: [String, Number],
      default: undefined
    },
    min: {
      type: [String, Number],
      default: undefined
    },
    max: {
      type: [String, Number],
      default: undefined
    },
    step: {
      type: [String, Number],
      default: undefined
    },
    autocomplete: {
      type: String,
      default: 'off'
    }
  })

  const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'change'])

  // 내부 상태로 입력값 추적
  const inputHasValue = ref(false)

  // focus 상태 추적을 위한 새로운 ref 추가
  const isFocused = ref(true)

  const clearInput = () => {
    emit('update:modelValue', '')
    inputHasValue.value = false
    isFocused.value = true

    // input 요소에 focus 설정
    const inputEl = document.querySelector(`#${props.id}`)
    if (inputEl) {
      inputEl.focus()
      isFocused.value = true
    }
  }

  // 이벤트 핸들러 함수들
  const handleInput = event => {
    const newValue = event.target.value
    inputHasValue.value = newValue.length > 0
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
  @use 'sass:color';

  .ui-input {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;

    // 값이 입력되었을 때 스타일
    &--has-value {
      .ui-input__wrapper {
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
      align-items: center;
      border-radius: $border-radius-sm;
      border: 1px solid $border-color-light;
      background: var(--color-gray-0, #fff);
      transition: all $transition-normal ease;
      box-sizing: border-box;

      &:focus-within {
        border: 1px solid var(--color-system-b30, #0084ff);
        color: var(--color-gray-70, #464c53);
      }
    }

    &__prefix-icon {
      color: var(--color-gray-40, #8a949e);
      font-size: $font-size-xl;
      margin-right: 10px;
      filter: invert(91%) sepia(4%) saturate(129%) hue-rotate(184deg) brightness(94%) contrast(88%);
    }

    &__suffix-icon {
      color: var(--color-gray-40, #8a949e);
      font-size: $font-size-xl;
      margin-left: 5px;
    }

    &__field {
      width: 100%;
      border: none;
      background: transparent;
      font-size: $font-size-sm;
      color: var(--color-gray-70, #464c53);
      outline: none;
      height: 100%;

      &::placeholder {
        color: var(--color-gray-30, #b1b8be);
        font-family: Pretendard;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
      }

      &--with-prefix-icon {
        padding-left: 6px;
      }
    }

    &__icon,
    &__clear {
      flex-shrink: 0;
      color: var(--color-gray-70, #464c53);
    }

    &__clear {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      margin-right: $spacing-sm;
      cursor: pointer;
      transition: color $transition-normal ease;

      &:hover {
        color: var(--color-gray-70, #464c53);
      }
    }

    &__prefix,
    &__suffix {
      color: var(--color-gray-70, #464c53);
      font-size: $font-size-sm;
      padding-right: $spacing-sm;
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

    // 크기 변형 - Small (32px)
    &--small {
      .ui-input__wrapper {
        height: $ui-height-sm; // 32px
        padding: 3px 9px;
      }
      .ui-input__field {
        font-size: $font-size-sm;
      }
      .ui-input__label {
        @include font-style($body-small);
      }
    }

    // 크기 변형 - Medium (36px)
    &--medium {
      .ui-input__wrapper {
        height: $ui-height-md + 4; // 36px
        padding: 5px 12px;
      }
      .ui-input__field {
        font-size: $font-size-lg;
      }
      .ui-input__label {
        @include font-style($body-medium);
      }
    }

    // 크기 변형 - Large
    &--large {
      .ui-input__wrapper {
        height: $ui-height-lg;
        padding: 3px 12px;
      }
      .ui-input__field {
        font-size: $font-size-lg;
        @include font-style($body-medium);
      }
      .ui-input__label {
        @include font-style($body-medium);
      }
    }

    // 크기 변형 - XLarge (40px)
    &--xlarge {
      .ui-input__wrapper {
        height: $ui-height-xlg; // 40px
        padding: 4px 16px;
        border-radius: 4px;
      }
      .ui-input__field {
        font-size: $font-size-xl;
      }
      .ui-input__label {
        @include font-style($body-xlarge-bold);
        font-size: $font-size-xxl;
      }
    }

    // Block
    &--block {
      .ui-input__wrapper {
        width: 100%;
      }
    }

    // 상태 변형
    &--disabled {
      .ui-input__wrapper {
        border: 1px solid var(--color-gray-20, #cdd1d5);
        background: var(--color-gray-10, #e6e8ea);
        color: var(--color-gray-30, #b1b8be);
        cursor: not-allowed;
      }

      .ui-input__field {
        cursor: not-allowed;
        color: var(--color-gray-30, #b1b8be);
      }
    }

    &--error {
      .ui-input__wrapper {
        border: 1px solid var(--color-system-r30, #f30);
        color: var(--color-gray-70, #464c53);

        &:focus-within {
          box-shadow: 0 0 0 2px rgba(255, 51, 0, 0.1);
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

  // 반응형 스타일
  @media (max-width: 768px) {
    .ui-input {
      &--small {
        .ui-input__wrapper {
          padding: 5px 10px;
        }
      }

      &--medium {
        .ui-input__wrapper {
          padding: 6px 12px;
        }
      }

      &--large {
        .ui-input__wrapper {
          padding: 8px 14px;
        }
      }

      &--xlarge {
        .ui-input__wrapper {
          padding: 10px 16px;
        }
      }
    }
  }
</style>
