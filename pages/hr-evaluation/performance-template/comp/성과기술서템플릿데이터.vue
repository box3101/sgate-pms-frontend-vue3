<template>
  <UiTable
    title="성과기술서 템플릿"
    :modelValue="props.modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    editable
    :defaultRowData="defaultRowData"
    @save="emit('save', $event)"
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
      <th v-for="header in tableHeaders" :key="header.key">
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
          <UiSelect v-model="row.type" :options="typeOptions" />
        </td>
        <td class="text-center">
          <UiButton
            v-if="!row.isNewRow"
            variant="secondary-line"
            icon-only
            @click="$emit('edit-template', row)"
          >
            <i class="icon-md icon-edit"></i>
          </UiButton>
          <span v-else class="text-gray-400">-</span>
        </td>
      </tr>
    </template>
  </UiTable>
</template>

<script setup>
  import { ref } from 'vue'

  const props = defineProps({
    modelValue: {
      type: Array,
      default: () => []
    }
  })

  const emit = defineEmits(['update:modelValue'])

  const typeOptions = [
    { value: '양식', label: '양식' },
    { value: '항목정의', label: '항목정의' }
  ]

  const tableHeaders = [
    {
      key: 'name',
      title: '성과기술서 템플릿',
      editable: true,
      align: '',
      placeholder: '템플릿명을 입력해주세요'
    },
    {
      key: 'type',
      title: '형식',
      editable: true,
      align: '',
      placeholder: '형식을 입력해주세요'
    },
    {
      key: 'edit',
      title: '편집',
      align: 'center',
      icon: 'edit'
    }
  ]

  const defaultRowData = {
    name: '',
    type: '',
    isNewRow: true
  }
</script>
