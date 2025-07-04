<template>
  <PageHeader @get-competency-group="showImportModal = true" />

  <div class="flex-container flex gap-15">
    <div class="w-25p">
      <EvaluationGroupManager />
    </div>
    <div class="w-75p">
      <CompetencyInfoPanel />
    </div>
  </div>

  <!-- 평가항목그룹 가져오기 모달 -->
  <CompetencyGroupImportModal v-model="showImportModal" />
</template>
<script setup>
  import EvaluationGroupManager from './comp/EvaluationGroupManager.vue'
  import CompetencyInfoPanel from './comp/CompetencyInfoPanel.vue'
  import PageHeader from './comp/PageHeader.vue'
  import CompetencyGroupImportModal from './comp/modals/CompetencyGroupImportModal.vue'

  const showImportModal = ref(false)
</script>
