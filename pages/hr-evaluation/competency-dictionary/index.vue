<template>
  <div class="page-container">
    <PageHeader />
    <div class="flex-container">
      <div class="w-25p">
        <CompetencyGroupSidebar />
      </div>
      <div class="w-75p">
        <CompetencyDetailManager />
      </div>
    </div>
  </div>
</template>

<script setup>
  import PageHeader from './comp/PageHeader.vue'
  import CompetencyGroupSidebar from './comp/CompetencyGroupSidebar.vue'
  import CompetencyDetailManager from './comp/CompetencyDetailManager.vue'
</script>
