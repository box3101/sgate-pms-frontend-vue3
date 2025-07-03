<template>
  <div class="container-large">
    <PageHeader @open-import-modal="openImportModal" />

    <div class="flex-container scrollable-minus-10">
      <div class="w-40p">
        <RatingGroup @row-selected="handleRowSelect" />
      </div>

      <div class="w-60p" v-if="selectedRow">
        <RatingPanel :selected-row="selectedRow" />
      </div>
      <div class="w-60p" v-else>
        <Empty />
      </div>
    </div>

    <!-- 등급척도그룹 가져오기 모달 -->
    <RatingGroupImportModal v-model="showImportModal" />
  </div>
</template>

<script setup>
  import PageHeader from './comp/PageHeader.vue'
  import RatingGroup from './comp/RatingGroup.vue'
  import RatingPanel from './comp/RatingPanel.vue'
  import RatingGroupImportModal from './comp/modals/RatingGroupImportModal.vue'

  const logoText = inject('logoText')
  logoText.value = '평가기본항목관리'

  /**
   * 선택된 행 데이터
   * 목적: 테이블에서 선택된 행의 데이터를 관리
   */
  const selectedRow = ref(null)

  /**
   * 모달 표시 상태
   * 목적: 등급척도그룹 가져오기 모달의 표시/숨김 상태 관리
   */
  const showImportModal = ref(false)

  /**
   * 행 선택 처리
   * 목적: 테이블에서 선택된 행의 데이터를 업데이트
   * @param {object} row - 선택된 행 데이터
   */
  const handleRowSelect = row => {
    selectedRow.value = row
    console.log('선택된 행:', row)
  }

  /**
   * 가져오기 모달 열기
   * 목적: 등급척도그룹 가져오기 모달을 표시
   */
  const openImportModal = () => {
    showImportModal.value = true
  }

  /**
   * 등급척도그룹 가져오기 처리
   * 목적: 모달에서 선택된 등급척도그룹 데이터를 처리
   * @param {object} data - 가져온 등급척도그룹 데이터
   */
  const handleImportRatingGroup = data => {
    console.log('가져온 등급척도그룹:', data)

    // 실제 구현 시 API 호출 등의 로직 추가
    // 예: await importRatingGroupAPI(data)

    // 성공 메시지 표시
    alert(`${data.group.name} 등급척도그룹을 가져왔습니다.`)

    // 모달 닫기는 모달 컴포넌트에서 자동으로 처리됨
  }
</script>
