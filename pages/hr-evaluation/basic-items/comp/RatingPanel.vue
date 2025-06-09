<template>
  <!--  테이블 -->
  <UiTable
    v-model="ratingPanelData"
    title=""
    editable
    sortable
    scrollable
    max-height="calc(100vh - 200px)"
  >
    <template #colgroup>
      <col style="width: 40px" />
      <col style="width: auto" />
      <col style="width: 150px" />
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
      <th v-for="header in ratingPanelHeaders" :key="header.key">
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
          <UiInput v-model="row.name" placeholder="평가등급" />
        </td>
        <td>
          <UiInput v-model="row.type" placeholder="평가등급점수" />
        </td>
      </tr>
    </template>
  </UiTable>
</template>

<script setup>
  const ratingPanelHeaders = ref([
    { key: 'name', title: '평가등급' },
    { key: 'type', title: '평가등급점수' }
  ])

  const ratingPanelData = ref([
    { id: 1, name: '평가등급', type: '평가등급점수' },
    { id: 2, name: '평가등급', type: '평가등급점수' },
    { id: 3, name: '평가등급', type: '평가등급점수' },
    { id: 4, name: '평가등급', type: '평가등급점수' },
    { id: 5, name: '평가등급', type: '평가등급점수' },
    { id: 6, name: '평가등급', type: '평가등급점수' },
    { id: 7, name: '평가등급', type: '평가등급점수' },
    { id: 8, name: '평가등급', type: '평가등급점수' },
    { id: 9, name: '평가등급', type: '평가등급점수' },
    { id: 10, name: '평가등급', type: '평가등급점수' },
    { id: 11, name: '평가등급', type: '평가등급점수' },
    { id: 12, name: '평가등급', type: '평가등급점수' },
    { id: 13, name: '평가등급', type: '평가등급점수' },
    { id: 14, name: '평가등급', type: '평가등급점수' },
    { id: 15, name: '평가등급', type: '평가등급점수' },
    { id: 16, name: '평가등급', type: '평가등급점수' },
    { id: 17, name: '평가등급', type: '평가등급점수' },
    { id: 18, name: '평가등급', type: '평가등급점수' }
  ])

  const handleEdit = row => {
    console.log('수정:', row)
    // 수정 로직 구현
  }
</script>
