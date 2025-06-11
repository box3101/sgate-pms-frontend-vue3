<template>
  <PageHeader />

  <div class="flex-container flex gap-15">
    <div class="w-25p">
      <EvaluationGroupManager />
    </div>
    <div class="w-75p">
      <CompetencyInfoPanel />
    </div>
  </div>
</template>
<script setup>
  import { ref, computed } from 'vue'
  import EvaluationGroupManager from './comp/EvaluationGroupManager.vue'
  import CompetencyInfoPanel from './comp/CompetencyInfoPanel.vue'
  import PageHeader from './comp/PageHeader.vue'
</script>

<style scoped></style>
