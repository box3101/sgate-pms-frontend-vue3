<template>
  <div :class="['ui-radio', `ui-radio--${size}`]" @click="handleClick">
    <input
      :id="id"
      type="radio"
      class="ui-radio__input"
      :checked="modelValue === value"
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
      validator: size => ['small', 'medium', 'large'].includes(size)
    }
  })

  const emit = defineEmits(['update:modelValue'])

  // 클릭 이벤트 핸들러 추가
  const handleClick = event => {
    // 비활성화 상태이거나 이미 선택된 상태면 무시
    if (props.disabled || props.modelValue === props.value) {
      return
    }

    // 라디오 버튼 값 업데이트
    emit('update:modelValue', props.value)
  }
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
        margin-right: 5px;
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
          width: 64%;
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
      font-size: $font-size-md;
    }

    // 비활성화 상태일 때 커서 스타일 변경
    &:has(.ui-radio__input:disabled) {
      cursor: not-allowed;
      opacity: 0.7;
    }
  }
</style>
