<template>
  <div class="page-container">
    <UiTabs :tabs="tabsData" v-model="activeTabId" @change="handleTabChange">
      <!-- 각 탭에 대한 컨텐츠 -->
      <template #tab1>
        <div class="tab-content">
          <h3>첫 번째 탭 내용</h3>
          <p>여기에 첫 번째 탭의 내용을 작성합니다.</p>
        </div>
      </template>

      <template #tab2>
        <div class="tab-content">
          <h3>두 번째 탭 내용</h3>
          <p>여기에 두 번째 탭의 내용을 작성합니다.</p>
        </div>
      </template>

      <template #tab3>
        <div class="tab-content">
          <h3>세 번째 탭 내용</h3>
          <p>여기에 세 번째 탭의 내용을 작성합니다.</p>
        </div>
      </template>
    </UiTabs>
  </div>
</template>

<script setup>
  const tabsData = [
    { id: 'tab1', label: '상반기' },
    { id: 'tab2', label: '하반기' }
  ]
</script>

<style scoped>
  :deep(.ui-tabs__nav-item) {
    max-width: 100px;
  }
</style>
