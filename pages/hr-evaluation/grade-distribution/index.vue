<template>
  <div class="container-large">
    <PageHeader @open-import-modal="showImportModal = true" />
    <div class="flex-container">
      <div class="w-40p">
        <GradeAdmin />
      </div>

      <div class="w-60p">
        <GradeDistributionManager />
      </div>
    </div>
  </div>

  <!-- 등급배분표 가져오기 모달 -->
  <GradeDistributionImportModal v-model="showImportModal" />
</template>

<script setup>
  import PageHeader from './comp/PageHeader.vue'
  import GradeAdmin from './comp/GradeAdmin.vue'
  import GradeDistributionManager from './comp/GradeDistributionManager.vue'
  import GradeDistributionImportModal from './comp/modals/GradeDistributionImportModal.vue'

  const showImportModal = ref(false)
</script>
