<template>
  <!-- 등급관리 테이블 -->
  <UiTable
    v-model="gradeAdminData"
    title="등급관리"
    editable
    sortable
    scrollable
    gradeRangeControls
    max-height="calc(100vh - 200px)"
  >
    <template #colgroup>
      <col style="width: 40px" />
      <col style="width: auto" />
      <col style="width: 150px" />
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
      <th v-for="header in gradeAdminHeaders" :key="header.key">
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
          <UiInput v-model="row.name" placeholder="등급" />
        </td>
        <td>
          <UiInput v-model="row.above" placeholder="이상" />
        </td>
        <td>
          <UiInput v-model="row.below" placeholder="미만" />
        </td>
        <td>
          <UiInput v-model="row.score" placeholder="환산점수" />
        </td>
        <td>
          <UiButton variant="ghost" icon-only>
            <i class="icon-md icon-search"></i>
          </UiButton>
        </td>
      </tr>
    </template>
  </UiTable>
</template>

<script setup>
  const gradeAdminHeaders = ref([
    { key: 'name', title: '등급' },
    { key: 'above', title: '이상' },
    { key: 'below', title: '미만' },
    { key: 'score', title: '환산점수' },
    { key: 'action', title: '조회' }
  ])

  const gradeAdminData = ref([
    { id: 1, name: 'A', above: '100', below: '90', score: '100' },
    { id: 2, name: 'B', above: '90', below: '80', score: '90' },
    { id: 3, name: 'C', above: '80', below: '70', score: '80' },
    { id: 4, name: 'D', above: '70', below: '60', score: '70' },
    { id: 5, name: 'E', above: '60', below: '50', score: '60' },
    { id: 6, name: 'F', above: '50', below: '40', score: '50' },
    { id: 7, name: 'G', above: '40', below: '30', score: '40' },
    { id: 8, name: 'H', above: '30', below: '20', score: '30' },
    { id: 9, name: 'I', above: '20', below: '10', score: '20' },
    { id: 10, name: 'J', above: '10', below: '0', score: '10' },
    { id: 11, name: 'K', above: '0', below: '-10', score: '0' },
    { id: 12, name: 'L', above: '-10', below: '-20', score: '-10' },
    { id: 13, name: 'M', above: '-20', below: '-30', score: '-20' },
    { id: 14, name: 'N', above: '-30', below: '-40', score: '-30' }
  ])
</script>
