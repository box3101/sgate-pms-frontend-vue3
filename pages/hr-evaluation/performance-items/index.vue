<template>
  <div class="container-large">
    <PageHeader @get-evaluation-group="showImportModal = true" />

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

  <!-- 평가항목그룹 가져오기 모달 -->
  <EvaluationGroupImportModal v-model="showImportModal" />
</template>

<script setup>
  import PageHeader from './comp/PageHeader.vue'
  import EvaluationGroup from './comp/EvaluationGroup.vue'
  import EvaluationDetail from './comp/EvaluationDetail.vue'
  import EvaluationGroupImportModal from './comp/modals/EvaluationGroupImportModal.vue'

  // 선택된 행 데이터
  const selectedRow = ref(null)

  // 모달 표시 상태
  const showImportModal = ref(false)

  /**
   * 선택된 행 데이터
   * 목적: 테이블에서 선택된 행의 데이터를 관리
   */
  const handleRowSelect = row => {
    selectedRow.value = row
    console.log('선택된 행:', row)
  }
</script>
