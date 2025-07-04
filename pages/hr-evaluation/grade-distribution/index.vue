<template>
  <div class="container-large">
    <PageHeader @open-import-modal="showImportModal = true" />
    <div class="flex-container">
      <div class="w-40p">
        <GradeAdmin />
      </div>

      <div class="w-60p">
        <GradeDistributionManager @download-template="showDownloadModal = true" />
      </div>
    </div>
  </div>

  <!-- 등급배분표 가져오기 모달 -->
  <GradeDistributionImportModal v-model="showImportModal" />

  <!-- 등급 배분표 양식 다운로드 모달-->
  <GradeDistributionDownloadModal v-model="showDownloadModal" />
</template>

<script setup>
  import PageHeader from './comp/PageHeader.vue'
  import GradeAdmin from './comp/GradeAdmin.vue'
  import GradeDistributionManager from './comp/GradeDistributionManager.vue'
  import GradeDistributionImportModal from './comp/modals/GradeDistributionImportModal.vue'
  import GradeDistributionDownloadModal from './comp/modals/GradeDistributionDownloadModal.vue'

  const showImportModal = ref(false)
  const showDownloadModal = ref(false)
</script>
