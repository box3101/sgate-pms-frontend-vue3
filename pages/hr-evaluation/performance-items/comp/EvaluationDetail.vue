<template>
  <!--  테이블 -->
  <UiTable v-model="evaluationTemplateData" title="" editable>
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
      <th v-for="header in evaluationTemplateHeaders" :key="header.key">
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
        <td>
          <UiInput type="number" v-model="row.type" placeholder="배점" />
        </td>
        <td class="text-center color-primary">
          <UiButton variant="ghost" size="medium">
            {{ row.scale }}
          </UiButton>
        </td>
      </tr>
    </template>
  </UiTable>
</template>

<script setup>
  import { ref } from 'vue'

  const evaluationTemplateHeaders = ref([
    { key: 'name', title: '평가항목' },
    { key: 'type', title: '배점' },
    { key: 'scale', title: '평가척도' }
  ])

  const evaluationTemplateData = ref([
    { id: 1, name: '샘플 템플릿 1', type: 50, scale: 'S(100),A(90),B(80),C(70),D(60)' },
    { id: 2, name: '샘플 템플릿 2', type: 50, scale: 'S(100),A(90),B(80),C(70),D(60)' },
    { id: 3, name: '샘플 템플릿 3', type: 50, scale: 'S(100),A(90),B(80),C(70),D(60)' }
  ])
</script>
