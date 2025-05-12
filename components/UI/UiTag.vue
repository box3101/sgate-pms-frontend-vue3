<template>
  <span
    class="ui-tag"
    :class="[`ui-tag--${size}`, `ui-tag--${variant}`, { 'ui-tag--closable': closable }]"
    :style="customStyles"
  >
    <slot>{{ text }}</slot>
    <button
      v-if="closable"
      class="ui-tag__close"
      type="button"
      @click.stop="$emit('close')"
      aria-label="태그 삭제"
    >
      <span class="ui-tag__close-icon"></span>
    </button>
  </span>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    text: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'default',
      validator: value =>
        [
          'default',
          'primary',
          'collaboration',
          'shared',
          'name',
          'completed',
          'deadline',
          'custom'
        ].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['xsmall', 'small', 'medium', 'large'].includes(value)
    },
    closable: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: ''
    },
    textColor: {
      type: String,
      default: ''
    },
    borderColor: {
      type: String,
      default: ''
    }
  })

  defineEmits(['close'])

  const customStyles = computed(() => {
    if (props.variant === 'custom') {
      return {
        backgroundColor: props.backgroundColor,
        color: props.textColor,
        borderColor: props.borderColor || props.backgroundColor
      }
    }
    return {}
  })
</script>

<style lang="scss">
  .ui-tag {
    display: inline-flex;
    align-items: center;
    border-radius: 4px;
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    transition: all 0.2s ease;
    user-select: none;
    color: #fff;

    &--small {
      padding: 2px 4px;
      @include font-style($body-xsmall-bold);
    }

    &--medium {
      padding: 2px 4px;
      @include font-style($body-xsmall-bold);
    }

    &--large {
      padding: 3px 4px;
      @include font-style($body-small-bold);
    }

    // 색상 변형
    &--default {
      background-color: var(--color-gray-10);
      border: 1px solid var(--border-color);
    }

    &--primary {
      background-color: $tag-primary; // 디자인
    }

    &--collaboration {
      background-color: $tag-secondary; // 공유
    }

    &--shared {
      background-color: $tag-secondary; // 공유
    }

    &--name {
      background-color: $tag-tertiary; // 이름
    }

    &--completed {
      background-color: $tag-success; // 완료
    }

    &--deadline {
      background-color: $tag-info; // 마감
    }

    &--closable {
      padding-right: 4px;
    }

    // 닫기 버튼
    &__close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-left: 4px;
      width: 16px;
      height: 16px;
      min-width: 16px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.2);
      border: none;
      cursor: pointer;
      padding: 0;
      color: var(--color-gray-0);
      position: relative;

      &:hover {
        background-color: rgba(0, 0, 0, 0.3);
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
      }
    }

    &__close-icon {
      position: relative;
      display: inline-block;
      width: 8px;
      height: 8px;

      &:before,
      &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: var(--color-gray-0);
        top: 50%;
        left: 0;
      }

      &:before {
        transform: rotate(45deg);
      }

      &:after {
        transform: rotate(-45deg);
      }
    }
  }

  // 태그 그룹 스타일
  .tags-group {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;

    &--vertical {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
