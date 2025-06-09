<template>
  <!-- 평가항목 그룹 테이블 -->
  <UiTable
    v-model="evaluationGroupItems"
    title="평가항목 그룹"
    editable
    sortable
    scrollable
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
      <th v-for="header in evaluationGroupHeaders" :key="header.key">
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
          <UiButton variant="ghost" size="medium">
            {{ row.type }}
          </UiButton>
        </td>
      </tr>
    </template>
  </UiTable>
</template>

<script setup>
  import { ref } from 'vue'

  const evaluationGroupHeaders = ref([
    { key: 'name', title: '평가항목 그룹명' },
    { key: 'type', title: '문항수' }
  ])

  const evaluationGroupItems = ref([
    { id: 1, name: '업무성과', type: 5 },
    { id: 2, name: '역량평가', type: 4 },
    { id: 3, name: '리더십', type: 3 },
    { id: 4, name: '핵심가치', type: 6 },
    { id: 5, name: '팀워크', type: 3 },
    { id: 6, name: '소통역량', type: 3 },
    { id: 7, name: '목표달성', type: 3 },
    { id: 8, name: '기여도', type: 3 },
    { id: 9, name: '전문성', type: 3 },
    { id: 10, name: '혁신역량', type: 3 },
    { id: 11, name: '행동역량', type: 3 },
    { id: 12, name: '종합평가', type: 3 },
    { id: 13, name: '직무수행평가', type: 3 },
    { id: 14, name: '팀워크평가', type: 3 }
  ])

  const handleEdit = row => {
    console.log('수정:', row)
    // 수정 로직 구현
  }
</script>
