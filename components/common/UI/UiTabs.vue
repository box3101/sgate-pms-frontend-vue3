<!-- UiTabs.vue -->
<template>
  <div class="ui-tabs">
    <!-- Tab Navigation -->
    <div class="ui-tabs__nav" role="tablist">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.id"
        :id="`tab-${tab.id}`"
        :aria-controls="`panel-${tab.id}`"
        :aria-selected="activeTab === tab.id"
        :class="['ui-tabs__nav-item', { 'ui-tabs__nav-item--active': activeTab === tab.id }]"
        role="tab"
        @click="setActiveTab(tab.id)"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab Content -->
    <div class="ui-tabs__content" :class="{ 'is-scroll': isScroll }">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        :id="`panel-${tab.id}`"
        :aria-labelledby="`tab-${tab.id}`"
        :class="['ui-tabs__panel', { 'ui-tabs__panel--active': activeTab === tab.id }]"
        role="tabpanel"
        :tabindex="activeTab === tab.id ? 0 : -1"
      >
        <slot :name="tab.id" :tab="tab">
          {{ tab.content }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch } from 'vue'

  const props = defineProps({
    tabs: {
      type: Array,
      required: true,
      validator: tabs => tabs.every(tab => tab.id && tab.label)
    },
    defaultTab: {
      type: String,
      default: ''
    },
    modelValue: {
      type: String,
      default: ''
    },
    isScroll: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['update:modelValue', 'change'])

  const activeTab = ref(props.modelValue || props.defaultTab || props.tabs[0]?.id || '')

  const setActiveTab = tabId => {
    if (activeTab.value !== tabId) {
      activeTab.value = tabId
      emit('update:modelValue', tabId)
      emit('change', tabId)
    }
  }

  // v-model 지원
  watch(
    () => props.modelValue,
    newValue => {
      if (newValue && newValue !== activeTab.value) {
        activeTab.value = newValue
      }
    }
  )

  // 키보드 네비게이션
  const handleKeydown = event => {
    const currentIndex = props.tabs.findIndex(tab => tab.id === activeTab.value)
    let newIndex = currentIndex

    switch (event.key) {
      case 'ArrowLeft':
        newIndex = currentIndex > 0 ? currentIndex - 1 : props.tabs.length - 1
        break
      case 'ArrowRight':
        newIndex = currentIndex < props.tabs.length - 1 ? currentIndex + 1 : 0
        break
      case 'Home':
        newIndex = 0
        break
      case 'End':
        newIndex = props.tabs.length - 1
        break
      default:
        return
    }

    event.preventDefault()
    setActiveTab(props.tabs[newIndex].id)
  }

  // 탭 네비게이션에 키보드 이벤트 추가
  import { onMounted, onUnmounted } from 'vue'

  onMounted(() => {
    const navElement = document.querySelector('.ui-tabs__nav')
    navElement?.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    const navElement = document.querySelector('.ui-tabs__nav')
    navElement?.removeEventListener('keydown', handleKeydown)
  })
</script>

<style lang="scss" scoped>
  // 색상 변수들 (제공된 디자인 시스템 참조)
  $primary-color: #00aaff;
  $primary-50: #00aaff;
  $primary-60: #0088cc;
  $primary-70: #006699;

  $gray-5: #f4f5f6;
  $gray-10: #e6e8ea;
  $gray-30: #b1b8be;
  $gray-50: #6d7882;
  $gray-60: #58616a;
  $gray-70: #464c53;

  $border-radius-md: 6px;
  $border-radius-lg: 8px;
  $transition-normal: 0.2s;
  $transition-slow: 0.3s;

  .ui-tabs {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .ui-tabs__nav {
    display: flex;
    border-bottom: 2px solid $gray-10;
    background: $gray-5;
    border-radius: $border-radius-lg $border-radius-lg 0 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    flex-shrink: 0;
  }

  .ui-tabs__nav-item {
    flex: 1;
    padding: 1rem 1.5rem;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: $gray-60;
    border-bottom: 3px solid transparent;
    transition: all $transition-slow cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    text-align: center;
    min-width: 0;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba($primary-color, 0.1);
      opacity: 0;
      transition: opacity $transition-slow ease;
      border-radius: $border-radius-md $border-radius-md 0 0;
    }

    &:hover {
      color: $gray-70;
      background: rgba($primary-color, 0.05);
      transform: translateY(-1px);

      &::before {
        opacity: 1;
      }
    }

    &:focus {
      outline: none;
      box-shadow: inset 0 0 0 2px $primary-color;
      border-radius: $border-radius-md $border-radius-md 0 0;
    }

    &--active {
      color: #ffffff;
      border-bottom-color: $primary-color;
      background: $primary-color;
      box-shadow: 0 4px 12px rgba($primary-color, 0.3);
      transform: translateY(-2px);

      &::before {
        opacity: 0;
      }

      &:hover {
        background: $primary-60;
        transform: translateY(-2px);
      }
    }
  }

  .ui-tabs__content {
    flex: 1;
    background: #ffffff;
    border-radius: 0 0 $border-radius-lg $border-radius-lg;
    overflow: hidden;

    &.is-scroll {
      max-height: 400px;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-track {
        background: $gray-5;
        border-radius: 3px;
      }

      &::-webkit-scrollbar-thumb {
        background: $gray-30;
        border-radius: 3px;

        &:hover {
          background: $gray-50;
        }
      }
    }
  }

  .ui-tabs__panel {
    display: none;
    animation: fadeInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    height: 100%;
    box-sizing: border-box;

    &--active {
      display: block;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(12px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* 반응형 스타일 */
  @media (max-width: 768px) {
    .ui-tabs__nav {
      overflow-x: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
      border-radius: $border-radius-md $border-radius-md 0 0;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .ui-tabs__nav-item {
      white-space: nowrap;
      flex: none;
      min-width: 120px;
      padding: 0.875rem 1.25rem;
      font-size: 13px;

      &::before {
        border-radius: 4px 4px 0 0;
      }

      &:focus {
        border-radius: 4px 4px 0 0;
      }
    }

    .ui-tabs__panel {
      padding: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .ui-tabs__nav-item {
      min-width: 100px;
      padding: 0.75rem 1rem;
      font-size: 12px;
    }

    .ui-tabs__panel {
      padding: 1rem;
    }
  }
</style>
