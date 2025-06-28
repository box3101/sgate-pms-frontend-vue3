<template>
  <div class="container-large">
    <PageHeader />

    <div class="flex-container">
      <div class="w-40p">
        <EvaluationGroup @row-selected="handleRowSelect" />
      </div>
      <div class="w-60p" v-if="selectedRow">
        <EvaluationDetail />
      </div>
      <div class="w-60p" v-else>
        <Empty />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import PageHeader from './comp/PageHeader.vue'
  import EvaluationGroup from './comp/EvaluationGroup.vue'
  import EvaluationDetail from './comp/EvaluationDetail.vue'

  // 선택된 행 데이터
  const selectedRow = ref(null)

  /**
   * 선택된 행 데이터
   * 목적: 테이블에서 선택된 행의 데이터를 관리
   */
  const handleRowSelect = row => {
    selectedRow.value = row
    console.log('선택된 행:', row)
  }
</script>
