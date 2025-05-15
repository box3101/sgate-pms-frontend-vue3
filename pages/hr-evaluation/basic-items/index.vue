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
        </div>
      </div>
      <div class="header-right">
        <div class="button-group">
          <UiTooltip title="등급척도 그룹 가져오기">
            <template #trigger>
              <UiButton type="button" variant="secondary-line" size="medium">
                등급척도 그룹 가져오기
                <i class="icon-md icon-get"></i>
              </UiButton>
            </template>
            <p>현 기존년도의 등급척도 그룹 중 하나를 선택하여 복사합니다.</p>
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
          :default-row-data="{ name: '', value: 0 }"
          @save="handleSave"
        >
          <template #colgroup>
            <col style="width: 40px" />
            <col />
            <col style="width: 100px" />
          </template>
          <template #header="{ selectAll, isAllSelected, sortable }">
            <tr>
              <th style="width: 40px">
                <UiCheckbox
                  :modelValue="isAllSelected"
                  @update:modelValue="selectAll"
                  size="large"
                />
              </th>
              <th>첫번째 열 제목</th>
              <th>두번째 열 제목</th>
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
              <td>
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
              <td>
                <UiInput v-model="item.name" size="large" @click.stop />
              </td>
              <td class="text-center">
                {{ item.value }}
              </td>
            </tr>
          </template>
        </UiTable>
      </div>
      <div class="w-50p-right">
        <!-- 테이블 제목 테이블 -->
        <UiTable
          title="테이블 제목"
          v-model="tableData2"
          editable
          hover
          :default-row-data="{ field1: '', field2: '', field3: '' }"
        >
          <template #colgroup>
            <col style="width: 40px" />
            <col />
            <col style="width: 150px" />
            <col style="width: 150px" />
          </template>
          <template #header="{ selectAll, isAllSelected, sortable }">
            <tr>
              <th style="width: 40px">
                <UiCheckbox
                  :modelValue="isAllSelected"
                  @update:modelValue="selectAll"
                  size="large"
                />
              </th>
              <th>첫번째 열 제목</th>
              <th>두번째 열 제목</th>
              <th>세번째 열 제목</th>
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
              <td>
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
              <td>
                <UiInput v-model="item.field1" size="large" @click.stop />
              </td>
              <td>
                <UiInput v-model="item.field2" size="large" @click.stop />
              </td>
              <td>
                <UiInput v-model="item.field3" size="large" @click.stop />
              </td>
            </tr>
          </template>
        </UiTable>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  // 기준년도 선택 옵션
  const selectedYear = ref('2025')
  const yearOptions = ref([
    { value: '2025', label: '2025년' },
    { value: '2024', label: '2024년' },
    { value: '2023', label: '2023년' }
  ])

  const groupOptions = ref([
    { value: 'group1', label: '등급배분그룹 1' },
    { value: 'group2', label: '등급배분그룹 2' },
    { value: 'group3', label: '등급배분그룹 3' }
  ])

  const tableData = ref([
    { id: 1, name: '테이블 1', value: 10 },
    { id: 2, name: '테이블 2', value: 20 },
    { id: 3, name: '테이블 3', value: 30 }
  ])

  const tableData2 = ref([
    { id: 1, field1: '테이블 1', field2: '값 1', field3: '설명 1' },
    { id: 2, field1: '테이블 2', field2: '값 2', field3: '설명 2' },
    { id: 3, field1: '테이블 3', field2: '값 3', field3: '설명 3' }
  ])
</script>
