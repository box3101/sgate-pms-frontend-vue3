<template>
  <div class="ui-tabs">
    <div class="tabs-nav">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        :class="['tab-button', { 'tab-button--active': modelValue === tab.value }]"
        @click="handleTabClick(tab.value)"
      >
        <i v-if="tab.icon" :class="tab.icon"></i>
        {{ tab.label }}
      </button>
    </div>
    <div class="tabs-content">
      <slot :active-tab="modelValue" />
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    modelValue: {
      type: String,
      required: true
    },
    tabs: {
      type: Array,
      required: true,
      validator: tabs => {
        return tabs.every(tab => typeof tab === 'object' && tab.value && tab.label)
      }
    }
  })

  const emit = defineEmits(['update:modelValue'])

  const handleTabClick = value => {
    emit('update:modelValue', value)
  }
</script>

<style scoped>
  .ui-tabs {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .tabs-nav {
    display: flex;
    border-bottom: 1px solid #e5e7eb;
    background-color: #f9fafb;
  }

  .tab-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 14px;
    color: #6b7280;
    transition: all 0.2s ease;
    border-bottom: 2px solid transparent;
  }

  .tab-button:hover {
    color: #374151;
    background-color: #f3f4f6;
  }

  .tab-button--active {
    color: #3b82f6;
    border-bottom-color: #3b82f6;
    background-color: #ffffff;
  }

  .tabs-content {
    flex: 1;
    overflow: hidden;
  }
</style>
