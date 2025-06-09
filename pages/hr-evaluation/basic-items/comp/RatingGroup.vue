<template>
  <!-- 등급척도 그룹 테이블 -->
  <UiTable
    v-model="ratingScaleGroupData"
    title="등급척도 그룹"
    editable
    sortable
    :scrollable="true"
    max-height="calc(100vh - 200px)"
  >
    <template #colgroup>
      <col style="width: 40px" />
      <col style="width: auto" />
      <col style="width: 80px" />
    </template>
    <template #header="{ selectAll, isAllSelected }">
      <th>
        <UiCheckbox
          size="large"
          @click.stop
          :modelValue="isAllSelected"
          @update:modelValue="selectAll"
        />
      </th>
      <th v-for="header in ratingScaleHeaders" :key="header.key">
        {{ header.title }}
      </th>
    </template>
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
        @dragstart="e => handleDragStart(e, index)"
        @dragover="handleDragOver"
        @drop="e => handleDrop(e, index)"
        @dragend="handleDragEnd"
        :class="{ 'sortable-row': sortable }"
      >
        <td>
          <UiCheckbox
            size="large"
            @click.stop
            :modelValue="isRowSelected(row)"
            @update:modelValue="() => toggleRowSelection(row)"
          />
        </td>
        <td>
          <UiInput v-model="row.name" placeholder="템플릿명" />
        </td>
        <td class="text-center color-primary">
          <UiButton variant="ghost" icon-only @click="handleEdit(row)">
            {{ row.type }}
          </UiButton>
        </td>
      </tr>
    </template>
  </UiTable>
</template>

<script setup>
  const ratingScaleHeaders = ref([
    { key: 'name', title: '등급척도' },
    { key: 'type', title: '평가등급수' }
  ])

  const ratingScaleGroupData = ref([
    { id: 1, name: '등급척도', type: 5 },
    { id: 2, name: '평가등급수', type: 5 },
    { id: 3, name: '평가항목', type: 5 },
    { id: 4, name: '역량평가', type: 4 },
    { id: 5, name: '성과평가', type: 3 },
    { id: 6, name: '다면평가', type: 5 },
    { id: 7, name: '리더십평가', type: 4 },
    { id: 8, name: '업적평가', type: 3 },
    { id: 9, name: '핵심가치평가', type: 5 },
    { id: 10, name: '직무역량평가', type: 4 },
    { id: 11, name: '업무성과평가', type: 3 },
    { id: 12, name: '행동역량평가', type: 5 },
    { id: 13, name: '종합평가', type: 4 },
    { id: 14, name: '직무수행평가', type: 5 },
    { id: 15, name: '팀워크평가', type: 3 },
    { id: 16, name: '소통역량평가', type: 4 },
    { id: 17, name: '목표달성평가', type: 5 },
    { id: 18, name: '기여도평가', type: 3 },
    { id: 19, name: '전문성평가', type: 4 },
    { id: 20, name: '혁신역량평가', type: 5 }
  ])

  const handleEdit = row => {
    console.log('수정:', row)
    // 수정 로직 구현
  }
</script>
