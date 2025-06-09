<template>
  <div class="container-large">
    <PageHeader />
    <div class="flex-container">
      <div class="w-40p">
        <GradeAdmin />
      </div>

      <div class="w-60p">
        <GradeDistributionManager />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import PageHeader from './comp/PageHeader.vue'
  import GradeAdmin from './comp/GradeAdmin.vue'
  import GradeDistributionManager from './comp/GradeDistributionManager.vue'
</script>
