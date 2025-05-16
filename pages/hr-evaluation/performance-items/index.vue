<template>
  <div class="container-large">
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
          <div class="select-item flex items-center">
            <span class="select-label">역량평가항목그룹</span>
            <UiSelect
              v-model="selectedGroup"
              :options="groupOptions"
              placeholder="선택"
              width="150px"
            />
            <div class="button-group ml-4 flex items-center gap-4">
              <UiButton variant="primary" icon-only>
                <i class="icon-md icon-plus icon-white"></i>
              </UiButton>
              <UiButton variant="secondary" icon-only>
                <i class="icon-md icon-pencil"></i>
              </UiButton>
              <UiButton variant="secondary-line" icon-only>
                <i class="icon-md icon-delete"></i>
              </UiButton>
            </div>
          </div>
        </div>
      </div>
      <div class="header-right">
        <div class="button-group">
          <UiTooltip title="평가항목그룹 가져오기">
            <template #trigger>
              <UiButton type="button" variant="secondary-line" size="medium">
                평가항목그룹 가져오기
                <i class="icon-md icon-get"></i>
              </UiButton>
            </template>
            <p>현 기존년도의 평가항목그룹 중 하나를 선택하여 복사합니다.</p>
          </UiTooltip>
          <UiButton type="button" variant="primary-line" size="medium" class="ml-2">
            전년도 데이터 복사
            <i class="icon-md icon-copy icon-primary"></i>
          </UiButton>
        </div>
      </div>
    </div>

    <div class="flex-container">
      <div class="w-50p-left">
        <!-- 테이블 제목 테이블 -->
        <UiTable
          title="테이블 제목"
          v-model="tableData"
          editable
          hover
          :default-row-data="{ name: '', name2: '', gradeCount: 5 }"
          @save="handleSave"
        >
          <template #colgroup>
            <col style="width: 40px" />
            <template
              v-for="field in Object.keys(tableData[0]).filter(
                key => key !== 'id' && key !== 'gradeCount'
              )"
            >
              <col />
            </template>
            <col style="width: 150px" />
          </template>
          <template #header="{ selectAll, isAllSelected, sortable }">
            <tr>
              <th style="width: 40px">
                <UiCheckbox size="large" :checked="isAllSelected" @update:checked="selectAll" />
              </th>
              <template
                v-for="field in Object.keys(tableData[0]).filter(
                  key => key !== 'id' && key !== 'gradeCount'
                )"
              >
                <th>{{ field }}</th>
              </template>
              <th>평가등급수</th>
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
              sortable,
              editable
            }"
          >
            <tr
              v-for="(item, index) in rows"
              :key="item.id"
              :class="{
                'sortable-row': sortable,
                selected: isRowSelected(item)
              }"
              :draggable="sortable"
              @dragstart="e => handleDragStart(e, index)"
              @dragover="e => handleDragOver(e)"
              @drop="e => handleDrop(e, index)"
              @dragend="handleDragEnd"
            >
              <td>
                <div v-if="!sortable" class="row-checkbox">
                  <UiCheckbox
                    size="large"
                    :checked="isRowSelected(item)"
                    @update:checked="() => toggleRowSelection(item)"
                  />
                </div>
                <div v-else class="drag-handle">
                  <i class="icon-md icon-drag"></i>
                </div>
              </td>
              <template
                v-for="field in Object.keys(item).filter(
                  key => key !== 'id' && key !== 'gradeCount'
                )"
              >
                <td>
                  <UiInput v-if="editable && !sortable" v-model="item[field]" size="large" />
                  <span v-else>{{ item[field] }}</span>
                </td>
              </template>
              <td class="text-center">
                <button
                  class="textUnderLine"
                  @click="handleButtonClick(item, index)"
                  :disabled="sortable"
                >
                  {{ item.gradeCount }}
                </button>
              </td>
            </tr>
          </template>
        </UiTable>
      </div>
      <div class="w-50p-right">
        <!-- 테이블 제목 테이블 -->
        <UiTable
          title="테이블 제목"
          v-model="tableData"
          editable
          hover
          :default-row-data="{ name: '', name2: '', gradeCount: 5 }"
          @save="handleSave"
        >
          <template #colgroup>
            <col style="width: 40px" />
            <template
              v-for="field in Object.keys(tableData[0]).filter(
                key => key !== 'id' && key !== 'gradeCount'
              )"
            >
              <col />
            </template>
            <col style="width: 150px" />
          </template>
          <template #header="{ selectAll, isAllSelected, sortable }">
            <tr>
              <th style="width: 40px">
                <UiCheckbox size="large" :checked="isAllSelected" @update:checked="selectAll" />
              </th>
              <template
                v-for="field in Object.keys(tableData[0]).filter(
                  key => key !== 'id' && key !== 'gradeCount'
                )"
              >
                <th>{{ field }}</th>
              </template>
              <th>평가등급수</th>
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
              sortable,
              editable
            }"
          >
            <tr
              v-for="(item, index) in rows"
              :key="item.id"
              :class="{
                'sortable-row': sortable,
                selected: isRowSelected(item)
              }"
              :draggable="sortable"
              @dragstart="e => handleDragStart(e, index)"
              @dragover="e => handleDragOver(e)"
              @drop="e => handleDrop(e, index)"
              @dragend="handleDragEnd"
            >
              <td>
                <div v-if="!sortable" class="row-checkbox">
                  <UiCheckbox
                    size="large"
                    :checked="isRowSelected(item)"
                    @update:checked="() => toggleRowSelection(item)"
                  />
                </div>
                <div v-else class="drag-handle">
                  <i class="icon-md icon-drag"></i>
                </div>
              </td>
              <template
                v-for="field in Object.keys(item).filter(
                  key => key !== 'id' && key !== 'gradeCount'
                )"
              >
                <td>
                  <UiInput v-if="editable && !sortable" v-model="item[field]" size="large" />
                  <span v-else>{{ item[field] }}</span>
                </td>
              </template>
              <td class="text-center">
                <button
                  class="textUnderLine"
                  @click="handleButtonClick(item, index)"
                  :disabled="sortable"
                >
                  {{ item.gradeCount }}
                </button>
              </td>
            </tr>
          </template>
        </UiTable>
      </div>
    </div>
  </div>
</template>

<script setup>
  const useCheckbox = ref(true)

  const defaultRowData = computed(() => {
    const defaultData = {}
    columns.value.forEach(column => {
      defaultData[column.key] = column.key.includes('value') ? 0 : ''
    })
    return defaultData
  })

  const columns = ref([
    { key: 'name', title: '첫번째 열 제목', align: '', width: '' },
    { key: 'value1', title: '두번째 열 제목', align: 'center', width: '100px' },
    { key: 'value2', title: '세번째 열 제목', align: 'center', width: '100px' },
    { key: 'value3', title: '네번째 열 제목', align: 'center', width: '100px' },
    { key: 'value4', title: '다섯번째 열 제목', align: 'center', width: '100px' }
  ])

  // 테이블 데이터
  const tableData = ref([
    { id: 1, name: '상위', gradeCount: 5 },
    { id: 2, name: '중위', gradeCount: 5 }
  ])

  // 테이블 데이터
  const tableData2 = ref([
    { id: 1, name: '상위', name2: '상위2', gradeCount: 5 },
    { id: 2, name: '중위', name2: '중위2', gradeCount: 5 }
  ])
</script>
