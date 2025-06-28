<template>
  <div class="container-large">
    <PageHeader />

    <div class="flex-container scrollable-minus-10">
      <div class="w-40p">
        <RatingGroup @row-selected="handleRowSelect" />
      </div>

      <div class="w-60p" v-if="selectedRow">
        <RatingPanel />
      </div>
      <div class="w-60p" v-else>
        <Empty />
      </div>
    </div>
  </div>
</template>

<script setup>
  import PageHeader from './comp/PageHeader.vue'
  import RatingGroup from './comp/RatingGroup.vue'
  import RatingPanel from './comp/RatingPanel.vue'

  const logoText = inject('logoText')
  logoText.value = '평가기본항목관리'

  /**
   * 선택된 행 데이터
   * 목적: 테이블에서 선택된 행의 데이터를 관리
   */
  const selectedRow = ref(null)

  /**
   * 선택된 행 핸들러
   * 목적: 테이블에서 선택된 행의 데이터를 관리
   */
  const handleRowSelect = row => {
    selectedRow.value = row
    console.log('선택된 행:', row)
  }
</script>
