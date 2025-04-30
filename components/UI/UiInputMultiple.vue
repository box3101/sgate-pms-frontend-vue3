<template>
  <div
    class="ui-input-multiple"
    :class="[
      `ui-input-multiple--${size}`,
      {
        'ui-input-multiple--disabled': disabled,
        'ui-input-multiple--error': error,
        'ui-input-multiple--block': block
      }
    ]"
  >
    <label v-if="label" class="ui-input-multiple__label" :for="id">
      {{ label }}
      <span v-if="required" class="ui-input-multiple__required">*</span>
    </label>

    <div class="ui-input-multiple__items">
      <div v-for="(item, index) in items" :key="index" class="ui-input-multiple__item">
        <div class="ui-input-multiple__wrapper">
          <i
            v-if="prefixIcon"
            :class="`icon icon-${prefixIcon} icon-md`"
            class="ui-input-multiple__prefix-icon"
          ></i>

          <input
            :id="id + '-' + index"
            :type="type"
            v-model="items[index]"
            :placeholder="placeholder"
            :disabled="disabled"
            :required="required"
            :readonly="readonly"
            :maxlength="maxlength"
            :name="name ? name + '-' + index : ''"
            class="ui-input-multiple__field"
            @input="updateModelValue"
            @focus="$emit('focus', $event, index)"
            @blur="$emit('blur', $event, index)"
            @change="$emit('change', $event, index)"
          />

          <button
            type="button"
            class="ui-input-multiple__remove-btn"
            @click="removeItem(index)"
            :disabled="disabled || readonly || items.length <= 1"
          >
            <i class="icon icon-x-circle icon-md"></i>
          </button>
        </div>
      </div>
    </div>

    <button
      type="button"
      class="ui-input-multiple__add-btn"
      @click="addItem"
      :disabled="disabled || readonly || (maxItems && items.length >= maxItems)"
    >
      <i class="icon icon-plus icon-sm"></i>
      <span>{{ addButtonText }}</span>
    </button>

    <div v-if="error" class="ui-input-multiple__error">{{ errorMessage }}</div>
    <div v-else-if="helperText" class="ui-input-multiple__helper">{{ helperText }}</div>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits, ref, watch } from 'vue'

  const props = defineProps({
    modelValue: {
      type: Array,
      default: () => ['']
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
      default: 'text'
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
      default: () => `ui-input-multiple-${Math.random().toString(36).substring(2, 9)}`
    },
    name: {
      type: String,
      default: ''
    },
    maxlength: {
      type: [String, Number],
      default: undefined
    },
    prefixIcon: {
      type: String,
      default: ''
    },
    maxItems: {
      type: Number,
      default: undefined
    },
    addButtonText: {
      type: String,
      default: '항목 추가'
    }
  })

  const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'change', 'add', 'remove'])

  const items = ref([...props.modelValue])

  // 모델 값이 변경되면 내부 아이템 배열 업데이트
  watch(
    () => props.modelValue,
    newValue => {
      if (JSON.stringify(newValue) !== JSON.stringify(items.value)) {
        items.value = [...newValue]
      }
    },
    { deep: true }
  )

  // 내부 아이템 배열이 변경되면 모델 값 업데이트
  const updateModelValue = () => {
    emit('update:modelValue', [...items.value])
  }

  // 새 항목 추가
  const addItem = () => {
    items.value.push('')
    updateModelValue()
    emit('add', items.value.length - 1)
  }

  // 항목 제거
  const removeItem = index => {
    if (items.value.length > 1) {
      items.value.splice(index, 1)
      updateModelValue()
      emit('remove', index)
    }
  }
</script>

<style lang="scss" scoped>
  .ui-input-multiple {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;

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

    &__items {
      display: flex;
      flex-direction: column;
      gap: $spacing-xs;
    }

    &__item {
      display: flex;
      width: 100%;
    }

    &__wrapper {
      position: relative;
      display: flex;
      align-items: center;
      border-radius: $border-radius-sm;
      border: 1px solid var(--color-gray-40, #8a949e);
      background: var(--color-gray-0, #fff);
      transition: all $transition-normal ease;
      box-sizing: border-box;
      width: 100%;

      &:focus-within {
        border: 1px solid var(--color-system-b30, #0084ff);
        color: var(--color-gray-70, #464c53);
      }
    }

    &__prefix-icon {
      color: var(--color-gray-40, #8a949e);
      font-size: $font-size-xl;
      margin-right: 5px;
      filter: invert(91%) sepia(4%) saturate(129%) hue-rotate(184deg) brightness(94%) contrast(88%);
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
        color: var(--color-gray-40, #8a949e);
      }
    }

    &__remove-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      color: var(--color-gray-40, #8a949e);
      cursor: pointer;
      padding: 0 $spacing-xs;
      height: 100%;
      transition: color $transition-normal ease;

      &:hover {
        color: var(--color-system-r30, #f30);
      }

      &:disabled {
        color: var(--color-gray-30, #b1b8be);
        cursor: not-allowed;
      }
    }

    &__add-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: $spacing-xs;
      background: transparent;
      border: 1px dashed var(--color-gray-40, #8a949e);
      color: var(--color-gray-60, #58616a);
      cursor: pointer;
      padding: $spacing-xs;
      border-radius: $border-radius-sm;
      margin-top: $spacing-xs;
      transition: all $transition-normal ease;

      &:hover {
        background: var(--color-gray-10, #e6e8ea);
        border-color: var(--color-system-b30, #0084ff);
        color: var(--color-system-b30, #0084ff);
      }

      &:disabled {
        border-color: var(--color-gray-30, #b1b8be);
        color: var(--color-gray-30, #b1b8be);
        cursor: not-allowed;
      }
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
      .ui-input-multiple__wrapper {
        height: 30px;
        padding: 3px 9px;
      }
      .ui-input-multiple__field {
        font-size: $font-size-sm;
      }
      .ui-input-multiple__label {
        @include font-style($body-small);
      }
      .ui-input-multiple__add-btn {
        padding: 4px 8px;
        font-size: $font-size-xs;
      }
    }

    // 크기 변형 - Medium
    &--medium {
      .ui-input-multiple__wrapper {
        height: 30px;
        padding: 5px 12px;
      }
      .ui-input-multiple__field {
        font-size: $font-size-md;
      }
      .ui-input-multiple__label {
        @include font-style($body-medium);
      }
      .ui-input-multiple__add-btn {
        padding: 6px 10px;
        font-size: $font-size-sm;
      }
    }

    // 크기 변형 - Large
    &--large {
      .ui-input-multiple__wrapper {
        height: 32px;
        padding: 3px 12px;
      }
      .ui-input-multiple__field {
        font-size: $font-size-lg;
      }
      .ui-input-multiple__label {
        @include font-style($body-large-bold);
      }
      .ui-input-multiple__add-btn {
        padding: 8px 12px;
        font-size: $font-size-md;
      }
    }

    // 크기 변형 - XLarge
    &--xlarge {
      .ui-input-multiple__wrapper {
        height: 34px;
        padding: 4px 16px;
        border-radius: 4px;
      }
      .ui-input-multiple__field {
        font-size: $font-size-xl;
      }
      .ui-input-multiple__label {
        @include font-style($body-xlarge-bold);
        font-size: $font-size-xxl;
      }
      .ui-input-multiple__add-btn {
        padding: 10px 14px;
        font-size: $font-size-lg;
        border-radius: 4px;
      }
    }

    // Block
    &--block {
      width: 100%;
    }

    // 상태 변형
    &--disabled {
      .ui-input-multiple__wrapper {
        border: 1px solid var(--color-gray-20, #cdd1d5);
        background: var(--color-gray-10, #e6e8ea);
        color: var(--color-gray-30, #b1b8be);
        cursor: not-allowed;
      }

      .ui-input-multiple__field {
        cursor: not-allowed;
        color: var(--color-gray-30, #b1b8be);
      }
    }

    &--error {
      .ui-input-multiple__wrapper {
        border: 1px solid var(--color-system-r30, #f30);
        color: var(--color-gray-70, #464c53);

        &:focus-within {
          box-shadow: 0 0 0 2px rgba(255, 51, 0, 0.1);
        }
      }
    }
  }
</style>
