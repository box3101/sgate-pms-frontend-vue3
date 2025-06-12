<template>
  <div>
    <div class="flex justify-end mb-10">
      <UiButton type="button" variant="primary" @click="showAddGroupModal = true">
        그룹 추가
      </UiButton>
    </div>
    <!-- 공통 테이블 -->
    <div class="is-border">
      <UiTable
        v-model="evaluationTemplateData"
        title="공통"
        editable
        bordered
        striped
        hover
        rowClickCursor
        :canAddRow="false"
        :canSave="false"
        :canAddSortableButton="false"
      >
        <template #header-action-left>
          <UiSwitch v-model="useWeightValue" label="가중치 사용여부" />
        </template>
        <template #header-action-right>
          <div class="flex items-center">
            <UiButton
              type="button"
              variant="secondary"
              class="mr-2"
              @click="showAddDictionaryModal = true"
            >
              역량사전추가
            </UiButton>
            <UiButton type="button" variant="secondary" @click="addNewItem"> 추가 </UiButton>
          </div>
        </template>
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
            @click.stop="handleRowClick(row, index, $event)"
            :class="selectedReportIndex === index ? 'selected-row' : ''"
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
              {{ row.name }}
            </td>
            <td class="text-center">
              <UiButton variant="ghost" icon-only @click.stop="handleEdit(row)">
                <i class="icon-md icon-edit"></i>
              </UiButton>
            </td>
          </tr>
        </template>
      </UiTable>
    </div>
    <!-- 공통 테이블 EEE -->
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const evaluationTemplateHeaders = ref([
    { key: 'name', title: '템플릿명' },
    { key: 'actions', title: '수정' }
  ])

  const evaluationTemplateData = ref([
    { id: 1, name: '샘플 템플릿 1' },
    { id: 2, name: '샘플 템플릿 2' },
    { id: 3, name: '샘플 템플릿 3' }
  ])

  const handleEdit = row => {
    console.log('수정:', row)
    // 수정 로직 구현
  }

  // 가중치 사용여부
  const useWeightValue = ref(false)

  // 선택된 템플릿 인덱스
  const selectedReportIndex = ref(-1)

  // 템플릿 선택 핸들러
  const handleRowClick = (row, index, event) => {
    selectedReportIndex.value = index // 클릭된 행의 인덱스 저장
    handleReportSelect({ row, index, event })
  }

  // 템플릿 선택 핸들러
  const handleReportSelect = ({ row, index, event }) => {
    console.log('보고서 선택됨:', row, index)

    // 선택된 보고서의 상세 내용을 로드하는 로직
    selectedReportType.value = row.type
    selectedReportDate.value = row.date
    selectedReportStatus.value = row.status
  }
</script>
