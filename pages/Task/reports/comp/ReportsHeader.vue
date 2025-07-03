<template>
  <header class="report-header com-header">
    <div class="ct-top flex justify-between items-center">
      <!-- 좌측: 날짜 검색 영역 -->
      <ul class="my_menu flex gap-23 items-center">
        <li class="tbl-btn flex gap-5">
          <UiDatePicker
            v-model="searchDateRange"
            isRange
            startPlaceholder="시작일"
            endPlaceholder="마지막날짜"
            size="medium"
          />
          <UiButton variant="secondary" size="medium" icon-only @click="handleSearch">
            <i class="icon icon-md icon-search icon-white"></i>
          </UiButton>
        </li>
      </ul>

      <!-- 우측: 액션 버튼 그룹 -->
      <div class="tbl-btn flex gap-5">
        <UiButton variant="secondary-line" @click="handleExportExcel">
          <i class="icon icon-md icon-excel"></i>
          <span>다운로드</span>
        </UiButton>
        <UiButton variant="primary" @click="handleOpenConfigModal">
          <i class="icon icon-md icon-create icon-white"></i>
          <span>보고서 작성</span>
        </UiButton>
      </div>
    </div>
  </header>
</template>

<script setup>
  // Props 정의
  const props = defineProps({
    searchDateRange: {
      type: Array,
      default: () => [null, null]
    }
  })

  // Emits 정의
  const emit = defineEmits([
    'update:searchDateRange',
    'search-reports',
    'export-excel',
    'open-config-modal'
  ])

  // v-model 처리
  const searchDateRange = computed({
    get: () => props.searchDateRange,
    set: value => emit('update:searchDateRange', value)
  })

  // 이벤트 핸들러
  const handleSearch = () => {
    emit('search-reports')
  }

  const handleExportExcel = () => {
    emit('export-excel')
  }

  const handleOpenConfigModal = () => {
    emit('open-config-modal')
  }
</script>
