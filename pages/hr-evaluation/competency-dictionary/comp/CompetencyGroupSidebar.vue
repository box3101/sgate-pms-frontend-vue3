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
            <UiButton type="button" variant="secondary" @click="showAddModal = true">
              추가
            </UiButton>
          </div>
        </template>
        <template #colgroup>
          <col style="width: 40px" />
          <col style="width: auto" />
          <col style="width: 40px" />
          <col style="width: 40px" />
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
              <UiButton variant="ghost" icon-only @click.stop="showEditModal = true">
                <i class="icon-md icon-edit"></i>
              </UiButton>
            </td>
            <td class="text-center">
              <UiButton variant="ghost" icon-only>
                <i class="icon-md icon-search"></i>
              </UiButton>
            </td>
          </tr>
        </template>
      </UiTable>
    </div>
    <!-- 공통 테이블 EEE -->
  </div>

  <!-- 그룹 추가 모달 -->
  <UiModal v-model="showAddGroupModal" title="그룹 추가" showFooter>
    <template #body>
      <UiInput v-model="newGroupName" placeholder="그룹명" />
    </template>
    <template #footerActions>
      <UiButton variant="primary" @click="handleAddGroup">저장</UiButton>
    </template>
  </UiModal>

  <!-- 역량사전추가모달 -->
  <UiModal v-model="showAddDictionaryModal" title="역량사전추가" showFooter>
    <template #body>
      <UiInput v-model="newDictionaryName" placeholder="사전명" />
    </template>
    <template #footerActions>
      <UiButton variant="primary" @click="handleAddDictionary">저장</UiButton>
    </template>
  </UiModal>

  <!-- 추가모달 -->
  <UiModal v-model="showAddModal" title="추가" showFooter>
    <template #body>
      <UiInput v-model="newName" placeholder="이름" />
    </template>
    <template #footerActions>
      <UiButton variant="primary" @click="handleAdd">저장</UiButton>
    </template>
  </UiModal>

  <!-- 수정 모달 -->
  <UiModal v-model="showEditModal" title="수정" showFooter>
    <template #body>
      <UiInput v-model="newName" placeholder="이름" />
    </template>
    <template #footerActions>
      <UiButton variant="primary" @click="handleEditSave">저장</UiButton>
    </template>
  </UiModal>
</template>

<script setup>
  import { ref } from 'vue'

  const evaluationTemplateHeaders = ref([
    { key: 'name', title: '템플릿명' },
    { key: 'edit', title: '수정' },
    { key: 'view', title: '조회' }
  ])

  const evaluationTemplateData = ref([
    { id: 1, name: '샘플 템플릿 1' },
    { id: 2, name: '샘플 템플릿 2' },
    { id: 3, name: '샘플 템플릿 3' }
  ])

  const handleEditButton = row => {
    console.log('수정:', row)
    // 수정 로직 구현
  }

  // 가중치 사용여부
  const useWeightValue = ref(false)

  // 그룹 추가 모달
  const showAddGroupModal = ref(false)
  const newGroupName = ref('')

  const handleAddGroup = () => {
    console.log('그룹 추가:', newGroupName.value)
    // 추가 로직 구현
    showAddGroupModal.value = false
    newGroupName.value = ''
  }

  // 역량사전추가 모달
  const showAddDictionaryModal = ref(false)
  const newDictionaryName = ref('')

  const handleAddDictionary = () => {
    console.log('사전 추가:', newDictionaryName.value)
    // 추가 로직 구현
    showAddDictionaryModal.value = false
  }

  // 추가 모달
  const showAddModal = ref(false)
  const newName = ref('')

  const handleAdd = () => {
    console.log('추가:', newName.value)
    // 추가 로직 구현
    showAddModal.value = false
  }

  // 수정 모달
  const showEditModal = ref(false)

  const handleEditSave = row => {
    console.log('수정:', row)
    // 수정 로직 구현
    showEditModal.value = false
  }
</script>
