<template>
  <div class="container-large">
    <PageHeader />

    <div class="flex-container">
      <div class="w-40p">
        <EvaluationGroup />
      </div>
      <div class="w-60p">
        <EvaluationDetail />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import PageHeader from './comp/PageHeader.vue'
  import EvaluationGroup from './comp/EvaluationGroup.vue'
  import EvaluationDetail from './comp/EvaluationDetail.vue'
</script>
