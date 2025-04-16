<template>
  <div :class="['ui-checkbox', `ui-checkbox--${size}`]" @click="handleClick">
    <input
      :id="id"
      type="checkbox"
      class="ui-checkbox__input"
      :checked="modelValue"
      :disabled="disabled"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <label :for="id" class="ui-checkbox__label">
      <slot>{{ label }}</slot>
    </label>
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
    id: {
      type: String,
      default: () => `checkbox-${Math.random().toString(36).substring(2, 9)}`
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium',
      validator: size => ['small', 'medium', 'large'].includes(size)
    }
  })

  const emit = defineEmits(['update:modelValue'])

  const handleClick = event => {
    if (event.target === event.currentTarget && !props.disabled) {
      emit('update:modelValue', !props.modelValue)
    }
  }
</script>

<style scoped lang="scss">
  .ui-checkbox {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: fit-content;

    &--small {
      font-size: 12px;

      .ui-checkbox__input {
        width: 14px;
        height: 14px;
        margin-right: 6px;
      }

      .ui-checkbox__input:checked::after {
        left: 3px;
        top: 1px;
        width: 3px;
        height: 6px;
      }
    }

    &--medium {
      font-size: 14px;

      .ui-checkbox__input {
        width: 18px;
        height: 18px;
        margin-right: 8px;
      }

      .ui-checkbox__input:checked::after {
        left: 5px;
        top: 2px;
        width: 5px;
        height: 10px;
      }
    }

    &--large {
      font-size: $font-size-sm;

      .ui-checkbox__input {
        width: 22px;
        height: 22px;
        margin-right: 5px;
      }

      .ui-checkbox__input:checked::after {
        left: 7px;
        top: 1px;
        width: 7px;
        height: 14px;
      }
    }

    &__input {
      appearance: none;
      -webkit-appearance: none;
      border: 1.5px solid #ccc;
      border-radius: 3px;
      position: relative;
      cursor: pointer;
      transition: all 0.2s ease;

      &:checked {
        background-color: $primary-color;
        border-color: $primary-color;

        &::after {
          content: '';
          position: absolute;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
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
      font-size: $font-size-md;
    }
  }
</style>
