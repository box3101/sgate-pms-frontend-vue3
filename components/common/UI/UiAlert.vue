<template>
  <div
    class="ui-alert"
    :class="[
      `ui-alert--${type}`,
      `ui-alert--${size}`,
      { 'ui-alert--closable': closable }
    ]"
    v-if="modelValue"
  >
    <div class="ui-alert__icon" v-if="showIcon">
      <Icon :name="iconName" />
    </div>
    <div class="ui-alert__content">
      <div class="ui-alert__title" v-if="title">{{ title }}</div>
      <div class="ui-alert__message">
        <slot>{{ message }}</slot>
      </div>
    </div>
    <button
      v-if="closable"
      class="ui-alert__close"
      @click="$emit('update:modelValue', false)"
      type="button"
      aria-label="알림 닫기"
    >
      <span class="ui-alert__close-icon"></span>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

/**
 * UiAlert 컴포넌트
 *
 * 사용자에게 중요한 정보를 알려주는 알림 컴포넌트입니다.
 * 다양한 타입(정보, 성공, 경고, 에러)과 크기를 지원합니다.
 */
const props = defineProps({
  // 알림 표시 여부 (v-model)
  modelValue: {
    type: Boolean,
    default: true
  },
  // 알림 타입 (info, success, warning, error)
  type: {
    type: String,
    default: 'info',
    validator: value => ['info', 'success', 'warning', 'error'].includes(value)
  },
  // 알림 크기 (small, medium, large)
  size: {
    type: String,
    default: 'medium',
    validator: value => ['small', 'medium', 'large'].includes(value)
  },
  // 알림 제목
  title: {
    type: String,
    default: ''
  },
  // 알림 메시지
  message: {
    type: String,
    default: ''
  },
  // 아이콘 표시 여부
  showIcon: {
    type: Boolean,
    default: true
  },
  // 닫기 버튼 표시 여부
  closable: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])

// 알림 타입에 따른 아이콘 이름 계산
const iconName = computed(() => {
  switch (props.type) {
    case 'success':
      return 'check-circle'
    case 'warning':
      return 'warning'
    case 'error':
      return 'error'
    case 'info':
    default:
      return 'info'
  }
})
</script>

<style lang="scss">
@use "sass:color";

.ui-alert {
  display: flex;
  align-items: flex-start;
  width: 100%;
  border-radius: 4px;
  padding: 12px 16px;
  position: relative;
  margin-bottom: 16px;

  // 아이콘 스타일
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    flex-shrink: 0;
  }

  // 콘텐츠 영역 스타일
  &__content {
    flex: 1;
    min-width: 0;
  }

  // 제목 스타일
  &__title {
    font-weight: 700;
    margin-bottom: 4px;
  }

  // 메시지 스타일
  &__message {
    @include font-style($body-small);
  }

  // 닫기 버튼 스타일
  &__close {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    &:focus {
      outline: none;
    }
  }

  // 닫기 아이콘 스타일
  &__close-icon {
    position: relative;
    display: inline-block;
    width: 12px;
    height: 12px;

    &:before,
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 1.5px;
      background-color: currentColor;
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

  // 크기 변형
  &--small {
    padding: 8px 12px;

    .ui-alert__title {
      @include font-style($body-small-bold);
    }

    .ui-alert__message {
      @include font-style($body-xsmall);
    }

    .ui-alert__icon {
      font-size: 16px;
    }
  }

  &--medium {
    padding: 12px 16px;

    .ui-alert__title {
      @include font-style($body-medium-bold);
    }

    .ui-alert__message {
      @include font-style($body-small);
    }

    .ui-alert__icon {
      font-size: 20px;
    }
  }

  &--large {
    padding: 16px 20px;

    .ui-alert__title {
      @include font-style($body-large-bold);
    }

    .ui-alert__message {
      @include font-style($body-medium);
    }

    .ui-alert__icon {
      font-size: 24px;
    }
  }

  // 타입 변형
  &--info {
    background-color: rgba($info-color, 0.1);
    border-left: 4px solid $info-color;
    color: $text-default-color;

    .ui-alert__icon {
      color: $info-color;
    }
  }

  &--success {
    background-color: rgba($success-color, 0.1);
    border-left: 4px solid $success-color;
    color: $text-default-color;

    .ui-alert__icon {
      color: $success-color;
    }
  }

  &--warning {
    background-color: rgba($system-yellow, 0.1);
    border-left: 4px solid $system-yellow;
    color: $text-default-color;

    .ui-alert__icon {
      color: $system-yellow;
    }
  }

  &--error {
    background-color: rgba($danger-color, 0.1);
    border-left: 4px solid $danger-color;
    color: $text-default-color;

    .ui-alert__icon {
      color: $danger-color;
    }
  }

  // 닫기 버튼이 있을 때 패딩 조정
  &--closable {
    padding-right: 40px;
  }
}
</style>
