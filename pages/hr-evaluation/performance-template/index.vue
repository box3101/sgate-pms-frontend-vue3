<template>
  <div class="page-container container-large">
    <div class="page-header">
      <div class="header-left">
        <div class="select-group">
          <div class="select-item">
            <span class="select-label">기준년도</span>
            <UiSelect
              v-model="selectedYear"
              :options="yearOptions"
              size="medium"
              placeholder="선택"
              width="150px"
            />
          </div>
        </div>
      </div>
      <div class="header-right">
        <div class="button-group">
          <UiButton type="button" variant="secondary-line" size="medium">
            검색
            <i class="icon-md icon-search"></i>
          </UiButton>
        </div>
      </div>
    </div>

    <div class="flex-container">
      <div class="w-40p">
        <UiTable
          title="성과기술서 템플릿"
          v-model="tableDataCheckboxDynamic"
          editable
          hover
          scrollable
          maxHeight="calc(100vh - 190px)"
          :canAddRow="true"
          :default-row-data="defaultRowData"
          @save="handleSave"
        >
          <template #colgroup>
            <col style="width: 40px" v-if="useCheckbox" />
            <col style="width: auto" />
            <col style="width: 100px" />
            <col style="width: 50px" />
          </template>

          <template #header="{ selectAll, isAllSelected, sortable }">
            <tr>
              <th style="width: 40px" v-if="useCheckbox">
                <UiCheckbox
                  :modelValue="isAllSelected"
                  @update:modelValue="selectAll"
                  size="large"
                />
              </th>
              <th v-for="(column, index) in columnsCheckboxDynamic" :key="index">
                {{ column.title }}
              </th>
            </tr>
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
              sortable
            }"
          >
            <tr
              v-for="(item, index) in rows"
              :key="item.id"
              @click="!sortable && toggleRowSelection(item)"
              :class="{
                selected: isRowSelected(item),
                'sortable-row': sortable
              }"
              :draggable="sortable"
              @dragstart="e => handleDragStart(e, index)"
              @dragover="e => handleDragOver(e)"
              @drop="e => handleDrop(e, index)"
              @dragend="handleDragEnd"
            >
              <td v-if="useCheckbox">
                <div v-if="!sortable" class="row-checkbox">
                  <UiCheckbox
                    :modelValue="isRowSelected(item)"
                    @update:modelValue="toggleRowSelection(item)"
                    size="large"
                    @click.stop
                  />
                </div>
                <div v-else class="drag-handle">
                  <i class="icon-md icon-drag"></i>
                </div>
              </td>

              <td
                v-for="(column, colIndex) in columnsCheckboxDynamic"
                :key="colIndex"
                :class="column.align ? `text-${column.align}` : ''"
              >
                <!-- 입력 필드 또는 텍스트 값 조건부 렌더링 -->
                <UiInput
                  v-if="column.editable && column.type !== 'select'"
                  v-model="item[column.key]"
                  size="large"
                  :placeholder="column.placeholder || ''"
                  @click.stop
                />
                <UiSelect
                  v-if="column.editable && column.type === 'select'"
                  v-model="item[column.key]"
                  size="large"
                  :options="[
                    { value: '일반', label: '일반' },
                    { value: '영업', label: '영업' },
                    { value: '연구', label: '연구' }
                  ]"
                  :placeholder="column.placeholder || ''"
                  @click.stop
                />
                <template v-else-if="column.key === 'edit'">
                  <UiButton variant="ghost" size="small" icon-only @click.stop="editItem(item)">
                    <i class="icon-md icon-pencil icon-gray"></i>
                  </UiButton>
                </template>
              </td>
            </tr>
          </template>
        </UiTable>
      </div>
      <div class="w-60p">
        <!-- 오른쪽 콘텐츠 -->
        <UiTable title="상하반기(항목)" editable hover scrollable maxHeight="calc(100vh - 190px)">
          <template #colgroup>
            <col style="width: 40px" v-if="useCheckbox" />
            <col style="width: auto" />
            <col style="width: 100px" />
            <col style="width: 50px" />
          </template>

          <template #header></template>
        </UiTable>
      </div>
    </div>
  </div>
</template>

<script setup>
  const logoText = inject('logoText')
  logoText.value = '성과기술서템플릿 '

  const useCheckbox = ref(true)
  import { ref } from 'vue'

  const columnsCheckboxDynamic = ref([
    {
      key: 'name',
      title: '성과기술서 템플릿',
      editable: true,
      align: '',
      width: '',
      placeholder: '템플릿명을 입력해주세요'
    },
    {
      key: 'type',
      title: '유형',
      editable: true,
      type: 'select',
      align: 'center',
      width: '100px'
    },
    {
      key: 'edit',
      title: '편집',
      editable: false,
      align: 'center',
      width: '50px'
    }
  ])

  const tableDataCheckboxDynamic = ref([
    { id: 1, name: '성과기술서 템플릿 1', type: '일반', edit: '' },
    { id: 2, name: '성과기술서 템플릿 2', type: '영업', edit: '' },
    { id: 3, name: '성과기술서 템플릿 3', type: '연구', edit: '' }
  ])

  const defaultRowData = { name: '', type: '', edit: '' }

  const tableData = ref([
    {
      name: '성과기술서 템플릿 1',
      inputType: '텍스트',
      editable: true,
      required: true,
      guide: '성과기술서 템플릿 1을 입력해주세요'
    },
    {
      name: '성과기술서 템플릿 2',
      inputType: '숫자',
      editable: true,
      required: false,
      guide: '성과기술서 템플릿 2를 입력해주세요'
    }
  ])

  const columns = ref([
    { key: 'name', title: '항목명', editable: true },
    { key: 'inputType', title: '입력형태', editable: true },
    { key: 'required', title: '필수여부', editable: true },
    { key: 'guide', title: '작성가이드', editable: true }
  ])

  const defaultRowData2 = { name: '', inputType: '', required: false, guide: '' }

  const selectRow = item => {
    console.log('선택된 데이터:', item)
  }

  const handleSave = data => {
    console.log('저장된 데이터:', data)
  }

  const handleGradeCount = item => {
    console.log('등급 수 수정:', item)
  }
</script>
