<template>
  <!-- Table Type2: 두 개의 입력필드를 가진 편집 테이블 -->
  <UiTable
    v-model="ratingPanelData"
    title="평가등급 설정"
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
  import { ref } from 'vue'

  /**
   * 테이블 헤더 정의
   * 목적: 평가등급 테이블의 컬럼 구조와 표시할 제목 정의
   */
  const tableHeaders = ref([
    { key: 'gradeName', title: '평가등급' },
    { key: 'gradeScore', title: '평가등급점수' }
  ])

  /**
   * 평가등급 데이터
   * 목적: 평가등급명과 해당 점수를 관리하는 테이블 데이터
   */
  const ratingPanelData = ref([
    { id: 1, gradeName: 'S등급', gradeScore: '95' },
    { id: 2, gradeName: 'A등급', gradeScore: '85' },
    { id: 3, gradeName: 'B등급', gradeScore: '75' },
    { id: 4, gradeName: 'C등급', gradeScore: '65' },
    { id: 5, gradeName: 'D등급', gradeScore: '55' },
    { id: 6, gradeName: '', gradeScore: '' },
    { id: 7, gradeName: '', gradeScore: '' },
    { id: 8, gradeName: '', gradeScore: '' },
    { id: 9, gradeName: '', gradeScore: '' },
    { id: 10, gradeName: '', gradeScore: '' },
    { id: 11, gradeName: '', gradeScore: '' },
    { id: 12, gradeName: '', gradeScore: '' },
    { id: 13, gradeName: '', gradeScore: '' },
    { id: 14, gradeName: '', gradeScore: '' },
    { id: 15, gradeName: '', gradeScore: '' },
    { id: 16, gradeName: '', gradeScore: '' },
    { id: 17, gradeName: '', gradeScore: '' },
    { id: 18, gradeName: '', gradeScore: '' }
  ])
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
