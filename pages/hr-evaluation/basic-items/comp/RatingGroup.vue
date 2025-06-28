<template>
  <!-- Table Type1: 기본 편집 가능한 테이블 -->
  <UiTable
    v-model="ratingScaleGroupData"
    title="등급척도 그룹"
    editable
    sortable
    scrollable
    max-height="calc(100vh - 200px)"
  >
    <!-- 컬럼 너비 설정 -->
    <template #colgroup>
      <col style="width: 40px" />
      <col style="width: auto" />
      <col style="width: 80px" />
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

        <!-- 등급척도명 입력 컬럼 -->
        <td>
          <UiInput v-model="row.name" placeholder="등급척도명을 입력하세요" />
        </td>

        <!-- 평가등급수 표시/편집 컬럼 -->
        <td class="text-center color-primary">
          <UiButton
            variant="ghost"
            icon-only
            @click="handleEditRatingCount(row)"
            :title="`${row.name} 평가등급수 수정`"
          >
            {{ row.ratingCount }}
          </UiButton>
        </td>
      </tr>
    </template>
  </UiTable>
</template>

<script setup>
  import { ref } from 'vue'

  const emit = defineEmits(['row-selected'])

  const handleEditRatingCount = row => {
    emit('row-selected', row) // 부모에게 선택된 행 전달
  }

  /**
   * 테이블 헤더 정의
   * 목적: 테이블의 컬럼 구조와 표시할 제목 정의
   */
  const tableHeaders = ref([
    { key: 'name', title: '등급척도' },
    { key: 'ratingCount', title: '평가등급수' }
  ])

  /**
   * 등급척도 그룹 데이터
   * 목적: 등급척도별 평가등급수 정보를 관리하는 테이블 데이터
   */
  const ratingScaleGroupData = ref([
    { id: 1, name: '등급척도', ratingCount: 5 },
    { id: 2, name: '평가등급수', ratingCount: 5 },
    { id: 3, name: '평가항목', ratingCount: 5 },
    { id: 4, name: '역량평가', ratingCount: 4 },
    { id: 5, name: '성과평가', ratingCount: 3 },
    { id: 6, name: '다면평가', ratingCount: 5 },
    { id: 7, name: '리더십평가', ratingCount: 4 },
    { id: 8, name: '업적평가', ratingCount: 3 },
    { id: 9, name: '핵심가치평가', ratingCount: 5 },
    { id: 10, name: '직무역량평가', ratingCount: 4 },
    { id: 11, name: '업무성과평가', ratingCount: 3 },
    { id: 12, name: '행동역량평가', ratingCount: 5 },
    { id: 13, name: '종합평가', ratingCount: 4 },
    { id: 14, name: '직무수행평가', ratingCount: 5 },
    { id: 15, name: '팀워크평가', ratingCount: 3 },
    { id: 16, name: '소통역량평가', ratingCount: 4 },
    { id: 17, name: '목표달성평가', ratingCount: 5 },
    { id: 18, name: '기여도평가', ratingCount: 3 },
    { id: 19, name: '전문성평가', ratingCount: 4 },
    { id: 20, name: '혁신역량평가', ratingCount: 5 }
  ])
</script>

<style lang="scss" scoped>
  // Table Type1 전용 스타일
  .color-primary {
    color: $primary-color;
  }

  // 정렬 가능한 행 스타일
  .sortable-row {
    &:hover {
      background-color: rgba(241, 245, 249, 0.8);
    }
  }

  // 평가등급수 버튼 스타일
  .ui-button {
    &[variant='ghost'] {
      font-weight: 600;

      &:hover {
        background-color: rgba($primary-color, 0.1);
      }
    }
  }
</style>
