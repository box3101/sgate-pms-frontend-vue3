<template>
  <div>
    <div class="is-border">
      <UiTable
        v-model="evaluationTemplateData"
        title="공통"
        bordered
        striped
        hover
        :canSave="false"
      >
        <template #header-action-right>
          <UiButton type="button" variant="primary" @click="handleAddModal"> 추가 </UiButton>
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
              <UiButton variant="ghost" icon-only @click.stop="handleEditModal(row)">
                <i class="icon-md icon-edit"></i>
              </UiButton>
            </td>
            <td class="text-center">
              <UiButton variant="ghost" icon-only @click.stop="handleViewModal(row)">
                <i class="icon-md icon-search"></i>
              </UiButton>
            </td>
          </tr>
        </template>
      </UiTable>
    </div>
  </div>

  <!-- 추가 모달 -->
  <UiModal v-model="showAddModal" title="템플릿 추가" showFooter>
    <template #body>
      <div class="form-group">
        <label class="form-label">템플릿명</label>
        <UiInput v-model="newTemplateName" placeholder="템플릿명을 입력하세요" />
      </div>
    </template>
    <template #footerActions>
      <UiButton variant="secondary" @click="showAddModal = false">취소</UiButton>
      <UiButton variant="primary" @click="handleAddSave">저장</UiButton>
    </template>
  </UiModal>

  <!-- 수정 모달 -->
  <UiModal v-model="showEditModal" title="템플릿 수정" showFooter>
    <template #body>
      <div class="form-group">
        <label class="form-label">템플릿명</label>
        <UiInput v-model="editTemplateName" placeholder="템플릿명을 입력하세요" />
      </div>
    </template>
    <template #footerActions>
      <UiButton variant="secondary" @click="showEditModal = false">취소</UiButton>
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

  // ⭐ 추가 모달 관련
  const showAddModal = ref(false)

  const handleAddModal = () => {
    showAddModal.value = true
  }

  const handleAddSave = () => {
    showAddModal.value = false
  }

  // ⭐ 수정 모달 관련
  const showEditModal = ref(false)

  const handleEditSave = () => {
    showEditModal.value = false
  }

  // ⭐ 기타 핸들러들 (기존 함수명 유지)
  const handleEditButton = row => {
    handleEditModal(row)
  }
</script>
