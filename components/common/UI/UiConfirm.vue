<template>
  <Teleport to="body">
    <div v-if="modelValue" class="ui-confirm">
      <div class="ui-confirm__backdrop" @click="closeOnBackdropClick && $emit('update:modelValue', false)"></div>
      <div
        class="ui-confirm__content"
        :class="[
          `ui-confirm--${size}`,
          `ui-confirm--${type}`
        ]"
      >
        <div class="ui-confirm__header">
          <!-- <div class="ui-confirm__icon" v-if="showIcon">
            <Icon :name="iconName" />
          </div> -->
          <h3 class="ui-confirm__title">
            <slot name="title">{{ title }}</slot>
          </h3>
        </div>
        <div class="ui-confirm__body">
          <slot>
            <div v-html="message"></div>
          </slot>
        </div>
        <div class="ui-confirm__footer">
          <slot name="footer">
            <UiButton
              v-if="showCancelButton"
              :variant="cancelButtonVariant"
              :size="buttonSize"
              @click="handleCancel"
            >
              {{ cancelButtonText }}
            </UiButton>
            <UiButton
              v-if="showConfirmButton"
              :variant="confirmButtonVariant"
              :size="buttonSize"
              @click="handleConfirm"
            >
              {{ confirmButtonText }}
            </UiButton>
          </slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'

/**
 * UiConfirm 컴포넌트
 *
 * 사용자에게 확인/취소 선택을 요청하는 모달 대화상자 컴포넌트입니다.
 * 다양한 타입(정보, 성공, 경고, 에러)과 크기를 지원합니다.
 */
const props = defineProps({
  // 모달 표시 여부 (v-model)
  modelValue: {
    type: Boolean,
    default: false
  },
  // 모달 타입 (info, success, warning, error)
  type: {
    type: String,
    default: 'info',
    validator: value => ['info', 'success', 'warning', 'error'].includes(value)
  },
  // 모달 크기 (small, medium, large)
  size: {
    type: String,
    default: 'medium',
    validator: value => ['small', 'medium', 'large'].includes(value)
  },
  // 모달 제목
  title: {
    type: String,
    default: '확인'
  },
  // 모달 메시지
  message: {
    type: String,
    default: '계속 진행하시겠습니까?'
  },
  // 아이콘 표시 여부
  showIcon: {
    type: Boolean,
    default: true
  },
  // 배경 클릭 시 닫기 여부
  closeOnBackdropClick: {
    type: Boolean,
    default: true
  },
  // 확인 버튼 표시 여부
  showConfirmButton: {
    type: Boolean,
    default: true
  },
  // 취소 버튼 표시 여부
  showCancelButton: {
    type: Boolean,
    default: true
  },
  // 확인 버튼 텍스트
  confirmButtonText: {
    type: String,
    default: '확인'
  },
  // 취소 버튼 텍스트
  cancelButtonText: {
    type: String,
    default: '취소'
  },
  // 확인 버튼 스타일 변형
  confirmButtonVariant: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary', 'primary-line', 'secondary-line'].includes(value)
  },
  // 취소 버튼 스타일 변형
  cancelButtonVariant: {
    type: String,
    default: 'secondary-line',
    validator: value => ['primary', 'secondary', 'primary-line', 'secondary-line'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

// 버튼 크기 계산
const buttonSize = computed(() => {
  switch (props.size) {
    case 'small':
      return 'small'
    case 'large':
      return 'large'
    case 'medium':
    default:
      return 'medium'
  }
})

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

// 확인 버튼 클릭 핸들러
const handleConfirm = () => {
  emit('confirm')
  emit('update:modelValue', false)
}

// 취소 버튼 클릭 핸들러
const handleCancel = () => {
  emit('cancel')
  emit('update:modelValue', false)
}
</script>

<style lang="scss">
@use "sass:color";

.ui-confirm {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  // 배경 딤 효과
  &__backdrop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    animation: fade-in 0.2s ease;
  }

  // 컨텐츠 영역
  &__content {
    position: relative;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    max-width: 90%;
    width: 400px;
    display: flex;
    flex-direction: column;
    animation: scale-in 0.2s ease;
    z-index: 1001;
    overflow: hidden;
  }

  // 헤더 영역
  &__header {
    display: flex;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid $border-color;
  }

  // 아이콘 스타일
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    font-size: 24px;
    flex-shrink: 0;
  }

  // 제목 스타일
  &__title {
    @include font-style($body-large-bold);
    margin: 0;
    flex: 1;
  }

  // 본문 영역
  &__body {
    padding: 20px;
    @include font-style($body-medium-bold);
    color: $text-default-color;
    line-height: 1.5;
  }

  // 푸터 영역
  &__footer {
    padding: 12px 20px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    border-top: 1px solid $border-color;
  }

  // 크기 변형
  &--small {
    width: 320px;

    .ui-confirm__header {
      padding: 12px 16px;
    }

    .ui-confirm__body {
      padding: 16px;
    }

    .ui-confirm__footer {
      padding: 8px 16px;
    }

    .ui-confirm__icon {
      font-size: 20px;
    }

    .ui-confirm__title {
      @include font-style($body-small-bold);
    }
  }

  &--medium {
  }

  &--large {
    width: 500px;

    .ui-confirm__header {
      padding: 20px 24px;
    }

    .ui-confirm__body {
      padding: 24px;
    }

    .ui-confirm__footer {
      padding: 16px 24px;
    }

    .ui-confirm__icon {
      font-size: 28px;
    }

    .ui-confirm__title {
      @include font-style($body-large-bold);
    }
  }

  // 타입 변형
  &--info {
    .ui-confirm__icon {
      color: $info-color;
    }
  }

  &--success {
    .ui-confirm__icon {
      color: $success-color;
    }
  }

  &--warning {
    .ui-confirm__icon {
      color: $system-yellow;
    }
  }

  &--error {
    .ui-confirm__icon {
      color: $danger-color;
    }
  }
}

// 애니메이션
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scale-in {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
