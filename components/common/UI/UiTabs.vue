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
        <span v-if="isBadge" class="badge">{{ badge[index] }}</span>
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
  import { ref, watch, onMounted, onUnmounted } from 'vue'

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
    },
    badge: {
      type: Array,
      default: () => []
    },
    isBadge: {
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
  // 기본 색상 변수
  $primary-color: #00aaff;

  $gray-5: #f9f9f9;
  $gray-10: #e5e5e5;
  $gray-30: #999;
  $gray-50: #666;
  $gray-70: #333;

  .ui-tabs {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .ui-tabs__nav {
    display: flex;
    border-bottom: 1px solid $gray-10;
    background: #fff;
  }

  .ui-tabs__nav-item {
    flex: 1;
    padding: 8px 20px;
    @include font-style($body-medium);
    color: $gray-30;
    position: relative;

    // 모든 상태에서 동일한 높이 유지
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;

    .badge {
      position: absolute;
      top: 11px;
      right: 74px;
      background-color: #f30;
      color: white;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      line-height: 1;
      font-weight: 600;
      transition: none !important;
      pointer-events: none;
      z-index: 1;
    }

    &:hover {
      background-color: $primary-color;
      color: #fff;
    }

    &:focus {
      outline: 2px solid $primary-color;
      outline-offset: -2px;
    }

    &--active {
      // 🔥 폰트 크기는 그대로 유지, 굵기만 변경
      font-weight: 700;
      border-bottom: 3px solid $primary-color;
      color: $gray-90;

      // 🔥 또는 transform으로 크기 변경 (레이아웃 영향 없음)
      // transform: scale(1.05);
      // transform-origin: center;
    }
  }

  .ui-tabs__content {
    background: #fff;

    &.is-scroll {
      max-height: 400px;
      overflow-y: auto;
    }
  }

  .ui-tabs__panel {
    display: none;

    &--active {
      display: block;
    }
  }

  // 반응형
  @media (max-width: 768px) {
    .ui-tabs__nav {
      overflow-x: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .ui-tabs__nav-item {
      white-space: nowrap;
      flex-shrink: 0;
      min-width: 100px;
      padding: 10px 16px;
      font-size: 13px;
    }

    .ui-tabs__panel {
      padding: 16px;
    }
  }
</style>
