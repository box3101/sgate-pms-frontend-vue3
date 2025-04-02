<template>
  <span 
    class="ui-tag" 
    :class="[
      `ui-tag--${size}`, 
      `ui-tag--${variant}`,
      { 'ui-tag--closable': closable }
    ]"
    :style="variant === 'custom' ? {
      backgroundColor: backgroundColor,
      color: textColor,
      borderColor: borderColor || backgroundColor
    } : {}"
  >
    <slot>{{ text }}</slot>
    <button 
      v-if="closable" 
      class="ui-tag__close" 
      type="button" 
      @click.stop="$emit('close')"
      aria-label="태그 삭제"
    >
      ×
    </button>
  </span>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'success', 'warning', 'danger', 'info', 'custom'].includes(value),
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value),
  },
  closable: {
    type: Boolean,
    default: false,
  },
  backgroundColor: {
    type: String,
    default: '',
  },
  textColor: {
    type: String,
    default: '',
  },
  borderColor: {
    type: String,
    default: '',
  },
});

defineEmits(['close']);
</script>

<style lang="scss" scoped>
.ui-tag {
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  
  // 크기 변형
  &--small {
    font-size: $font-size-xs;
    padding: 2px 6px;
    
    .ui-tag__close {
      font-size: 14px;
      margin-left: 2px;
    }
  }
  
  &--medium {
    font-size: $font-size-xs;
    padding: 4px 8px;
    
    .ui-tag__close {
      font-size: 16px;
      margin-left: 4px;
    }
  }
  
  &--large {
    font-size: $font-size-sm;
    padding: 6px 10px;
    
    .ui-tag__close {
      font-size: 18px;
      margin-left: 6px;
    }
  }
  
  // 색상 변형
  &--default {
    background-color: #f0f0f0;
    color: $text-color;
    border: 1px solid $border-color;
  }
  
  &--primary {
    background-color: rgba($primary-color, 0.1);
    color: $primary-color;
    border: 1px solid rgba($primary-color, 0.2);
  }
  
  &--success {
    background-color: rgba($success-color, 0.1);
    color: $success-color;
    border: 1px solid rgba($success-color, 0.2);
  }
  
  &--warning {
    background-color: rgba($warning-color, 0.1);
    color: $warning-color;
    border: 1px solid rgba($warning-color, 0.2);
  }
  
  &--danger {
    background-color: rgba($error-color, 0.1);
    color: $error-color;
    border: 1px solid rgba($error-color, 0.2);
  }
  
  &--info {
    background-color: rgba($info-color, 0.1);
    color: $info-color;
    border: 1px solid rgba($info-color, 0.2);
  }
  
  // 닫기 버튼
  &__close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    color: currentColor;
    opacity: 0.7;
    line-height: 1;
    
    &:hover {
      opacity: 1;
    }
  }
}
</style>