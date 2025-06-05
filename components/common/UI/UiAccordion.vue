<template>
  <div class="ui-accordion" :class="[{ 'is-active': modelValue }, `ui-accordion--${size}`]">
    <div class="accordion-header" @click="toggleAccordion">
      <div class="accordion-title">{{ title }}</div>
      <div class="accordion-icon" :class="{ 'accordion-icon--open': modelValue }">
        <Icon name="heroicons:chevron-down" size="16" />
      </div>
    </div>
    <div v-show="modelValue" class="accordion-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    }
  })

  const emit = defineEmits(['update:modelValue'])

  function toggleAccordion() {
    emit('update:modelValue', !props.modelValue)
  }
</script>

<style lang="scss" scoped>
  .ui-accordion {
    border-radius: 8px;
    border: 2px solid var(--color-gray-20, #cdd1d5);
    background: var(--color-gray-0, #fff);
    margin-bottom: 8px;

    // 활성화 상태 스타일
    &.is-active {
      .accordion-title {
        color: var(--color-primary-50, #00aaff);
      }
      .iconify {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' stroke='%2300aaff' stroke-linecap='round' stroke-linejoin='round' stroke-width='10' d='m19.5 8.25l-7.5 7.5l-7.5-7.5'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: center;
      }
      border: 2px solid #9df;
    }

    // 사이즈별 스타일 정의
    &--small {
      .accordion-header {
        padding: 8px 12px;
      }

      .accordion-title {
        font-size: 14px;
        line-height: 16px;
      }

      .accordion-content {
        padding: 8px 12px;
      }

      .accordion-icon {
        .iconify {
          width: 14px;
          height: 14px;
        }
      }
    }

    &--medium {
      // 기본 스타일 유지
    }

    &--large {
      .accordion-header {
        padding: 16px 20px;
      }

      .accordion-title {
        font-size: 22px;
        line-height: 24px;
      }

      .accordion-content {
        padding: 16px 20px;
      }
    }
  }

  .accordion-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    cursor: pointer;
    user-select: none;
    border-radius: 8px;
    position: relative;

    // &::before {
    //   content: '';
    //   position: absolute;
    //   left: 12px;
    //   top: 50%;
    //   transform: translateY(-50%);
    //   width: 6px;
    //   height: 6px;
    //   border-radius: 50%;
    //   background: var(--color-primary-50, #6d7882);
    //   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    // }

    // 기본 불릿 스타일 공통 속성
    &.accordion-title-with-bullet {
      position: relative;
      padding-left: 28px; // 여유 공간 조금 더 확보

      // 1. 기본 원형 불릿 (그라데이션 효과 추가)
      &.bullet-circle::before {
        content: '';
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--color-primary-50, #6d7882);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }
    }

    // 아코디언 활성화 상태에 따른 불릿 스타일 변화
    &.active {
      &.accordion-title-with-bullet {
        &.bullet-circle::before {
          background: linear-gradient(135deg, #34e89e, #0f3443);
        }

        &.bullet-arrow::before {
          content: '⌄';
          transform: translateY(-50%) rotate(0deg);
          transition: transform 0.3s ease;
        }
      }
    }
  }

  .accordion-header:hover {
    background-color: var(--color-gray-10, #f1f1f1);
  }

  .accordion-title {
    color: #6d7882;
    font-size: var(--font_size-font_S-title, 20px);
    font-weight: 700;
    line-height: 20px;
  }

  .accordion-icon {
    transition: transform 0.3s ease;
  }

  .accordion-icon--open {
    transform: rotate(180deg);
  }

  .accordion-content {
    padding: 12px 16px;
    background-color: var(--color-gray-0, #fff);
    border-radius: 8px;
  }
</style>
