<template>
  <UiTable
    v-model="ratingPanelData"
    @save="handleSave"
    editable
    sortable
    scrollable
    max-height="calc(100vh - 200px)"
  >
    <!-- 컬럼 너비 설정 -->
    <template #colgroup>
      <col style="width: 40px" />
      <col style="width: auto" />
      <col style="width: 150px" />
    </template>

    <!-- 테이블 헤더 -->
    <template #header="{ selectAll, isAllSelected }">
      <th>
        <UiCheckbox
          size="large"
          @click.stop
          :modelValue="isAllSelected"
          @update:modelValue="selectAll"
        />
      </th>
      <th v-for="header in tableHeaders" :key="header.key">
        {{ header.title }}
      </th>
    </template>

    <!-- 테이블 바디 -->
    <template
      #body="{
        rows,
        toggleRowSelection,
        isRowSelected,
        handleDragStart,
        handleDragOver,
        handleDrop,
        handleDragEnd,
        sortable,
        editable
      }"
    >
      <tr
        v-for="(row, index) in rows"
        :key="row.id"
        :draggable="sortable"
        @dragstart="event => handleDragStart(event, index)"
        @dragover="handleDragOver"
        @drop="event => handleDrop(event, index)"
        @dragend="handleDragEnd"
        :class="{ 'sortable-row': sortable }"
      >
        <!-- 체크박스 컬럼 -->
        <td>
          <UiCheckbox
            size="large"
            @click.stop
            :modelValue="isRowSelected(row)"
            @update:modelValue="() => toggleRowSelection(row)"
          />
        </td>

        <!-- 평가등급명 입력 컬럼 -->
        <td>
          <UiInput v-model="row.gradeName" placeholder="평가등급명을 입력하세요" />
        </td>

        <!-- 평가등급점수 입력 컬럼 -->
        <td>
          <UiInput v-model="row.gradeScore" placeholder="점수를 입력하세요" type="number" />
        </td>
      </tr>
    </template>
  </UiTable>
</template>

<script setup>
  import { ref, defineProps, watch } from 'vue'

  const props = defineProps({
    selectedRow: {
      type: Object,
      default: null
    }
  })

  /**
   * 테이블 헤더 정의
   * 목적: 평가등급 테이블의 컬럼 구조와 표시할 제목 정의
   */
  const tableHeaders = ref([
    { key: 'gradeName', title: '평가등급' },
    { key: 'gradeScore', title: '평가등급점수' }
  ])

  const ratingPanelData = ref([])

  /**
   * 선택된 행이 변경될 때 데이터 업데이트
   */
  watch(
    () => props.selectedRow,
    newRow => {
      if (!newRow) {
        ratingPanelData.value = []
        return
      }

      // ratingCount만큼 빈 행 생성
      const emptyRows = Array.from({ length: newRow.ratingCount }, (_, index) => ({
        id: Date.now() + index, // 고유 ID 생성
        gradeName: '',
        gradeScore: ''
      }))

      ratingPanelData.value = emptyRows
    },
    { immediate: true }
  )

  /**
   * 저장 버튼 클릭 이벤트 핸들러
   * 목적: 테이블 데이터를 저장하는 이벤트 핸들러
   */
  function handleSave(data) {
    alert('저장되었습니다.')
  }
</script>

<style lang="scss" scoped>
  // Table Type2 전용 스타일
  .sortable-row {
    &:hover {
      background-color: rgba(241, 245, 249, 0.8);
    }
  }

  // 입력 필드 스타일
  .ui-input {
    width: 100%;

    // 점수 입력 필드는 텍스트 중앙 정렬
    &[type='number'] {
      text-align: center;
    }
  }
</style>
