<template>
  <PageHeader />

  <div class="flex-container flex gap-15">
    <div class="w-25p">
      <EvaluationGroupManager />
    </div>
    <div class="w-75p">
      <div class="cmptDict-noti">
        <ul>
          <li>
            <div class="flex items-center gap-5">
              <i class="icon-sm icon-alert mr-1"></i>
              <span class="dict-title"> 역량사전 : <span class="dict-value">공통역량</span> </span>
            </div>
          </li>
          <li class="dict-info">
            <div class="flex items-center gap-5">
              <i class="icon-sm icon-alert mr-1"></i>
              직무 :
              <span class="tag tag-job">공통</span> 직위 :
              <span class="tag tag-position">공통</span> 직급 :
              <span class="tag tag-rank">공통</span> 부서 :
              <span class="tag tag-department">공통</span>
            </div>
          </li>
        </ul>
      </div>
      <!-- 테이블 제목 테이블 -->
      <UiTable
        v-model="tableData"
        hover
        editable
        bordered
        striped
        scrollable
        maxHeight="calc(100vh - 285px)"
        :fixHeader="true"
        :canAddRow="false"
        :default-row-data="defaultRowData"
        @save="handleSave"
      >
        <!-- 저장 버튼 대신 추가 버튼으로 변경 -->
        <template #action-button>
          <UiButton type="button" variant="primary" @click="showAddItemModal = true">
            항목 추가
          </UiButton>
        </template>

        <!-- 기존 테이블 내용 유지 -->
        <template #colgroup>
          <col v-if="useCheckbox" width="40px" />
          <col v-for="column in columns" :key="column.key" :width="column.width" />
          <col v-if="showEditButton" width="60px" />
        </template>
        <template #header="{ selectAll, isAllSelected }">
          <tr>
            <th v-if="useCheckbox">
              <UiCheckbox
                :modelValue="isAllSelected"
                @update:modelValue="selectAll"
                size="large"
                @click.stop
              />
            </th>
            <th
              v-for="column in columns"
              :key="column.key"
              :class="column.align ? `text-${column.align}` : ''"
            >
              {{ column.title }}
            </th>
            <th v-if="showEditButton">수정</th>
          </tr>
        </template>
        <!-- body 템플릿 부분 -->
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
          <template v-for="(item, index) in rows" :key="item.id">
            <!-- 일반 항목인 경우 (BOS가 아닌 경우) -->
            <tr
              v-if="item.category !== 'BOS'"
              @click="!sortable && toggleRowSelection(item)"
              :class="{ selected: isRowSelected(item), 'sortable-row': sortable }"
              :draggable="sortable"
              @dragstart="e => handleDragStart(e, index)"
              @dragover="e => handleDragOver(e)"
              @drop="e => handleDrop(e, index)"
              @dragend="handleDragEnd"
            >
              <!-- 체크박스 -->
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

              <!-- 데이터 셀 -->
              <td
                v-for="(column, colIndex) in columns"
                :key="colIndex"
                :class="column.align ? `text-${column.align}` : ''"
              >
                {{ item[column.key] }}
              </td>

              <!-- 수정 버튼 -->
              <td v-if="showEditButton">
                <UiButton variant="ghost" icon-only @click.stop="editItem(item)">
                  <i class="icon-md icon-pencil icon-gray"></i>
                </UiButton>
              </td>
            </tr>

            <!-- BOS 항목인 경우 -->
            <template v-else>
              <tr
                v-for="(behavior, behaviorIndex) in item.behaviors"
                :key="`${item.id}-${behaviorIndex}`"
                @click="!sortable && toggleRowSelection(item)"
                :class="{ selected: isRowSelected(item), 'sortable-row': sortable }"
                :draggable="sortable && behaviorIndex === 0"
                @dragstart="handleDragStart($event, index)"
                @dragover="handleDragOver($event)"
                @drop="handleDrop($event, index)"
                @dragend="handleDragEnd"
              >
                <!-- 첫 번째 행에만 표시되는 셀 -->
                <template v-if="behaviorIndex === 0">
                  <!-- 체크박스 -->
                  <td v-if="useCheckbox" :rowspan="item.behaviors.length">
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

                  <!-- 역량항목 -->
                  <td :rowspan="item.behaviors.length">
                    {{ item.name }}
                  </td>

                  <!-- 구분 -->
                  <td
                    :rowspan="item.behaviors.length"
                    :class="columns[1].align ? `text-${columns[1].align}` : ''"
                  >
                    {{ item.category }}
                  </td>
                </template>

                <!-- 모든 행에 표시되는 셀 -->
                <!-- 행동수준/역량정의 -->
                <td :class="columns[2].align ? `text-${columns[2].align}` : ''">
                  {{ behavior.description }}
                </td>

                <!-- 수준/점수 -->
                <td :class="columns[3].align ? `text-${columns[3].align}` : ''">
                  {{ behavior.level }}/{{ behavior.score }}
                </td>

                <!-- 가중 -->
                <td :class="columns[4].align ? `text-${columns[4].align}` : ''">
                  {{ behavior.weight }}
                </td>

                <!-- 수정 버튼 (첫 번째 행만) -->
                <td v-if="showEditButton && behaviorIndex === 0" :rowspan="item.behaviors.length">
                  <UiButton variant="ghost" icon-only @click.stop="editItem(item)">
                    <i class="icon-md icon-pencil icon-gray"></i>
                  </UiButton>
                </td>
              </tr>
            </template>
          </template>
        </template>
      </UiTable>
    </div>
  </div>

  <!-- 역량 항목 추가/수정 모달 -->
  <UiModal
    v-model="showAddItemModal"
    size="mlarge"
    :title="isEditMode ? '역량사전 항목 수정' : '역량사전 항목 추가'"
    :showFooter="true"
  >
    <UiFormLayout>
      <!-- 역량항목 - 항상 표시 -->
      <UiFormItem label="역량항목">
        <UiInput v-model="newItem.name" placeholder="역량항목을 입력해주세요." />
      </UiFormItem>

      <!-- 구분 - 항상 표시 -->
      <UiFormItem label="구분">
        <UiSelect
          v-model="newItem.category"
          :options="categoryOptions"
          placeholder="구분을 선택해주세요."
          @update:modelValue="handleCategoryChange"
        />
      </UiFormItem>

      <!-- 일반 구분일 경우의 필드 -->
      <template v-if="newItem.category === '일반'">
        <!-- 역량정의 -->
        <UiFormItem label="역량정의">
          <UiTextarea v-model="newItem.standard" placeholder="역량정의를 입력해주세요." />
        </UiFormItem>
      </template>

      <!-- BOS가 아니고 일반도 아닌 경우의 필드 -->
      <template v-else-if="newItem.category !== 'BOS'">
        <!-- 역량정의 -->
        <UiFormItem label="역량정의">
          <UiTextarea v-model="newItem.standard" placeholder="역량정의를 입력해주세요." />
        </UiFormItem>

        <!-- 수준/점수 -->
        <UiFormItem label="수준/점수">
          <UiInput
            v-model.number="newItem.level"
            type="number"
            placeholder="수준/점수를 입력해주세요."
          />
        </UiFormItem>

        <!-- 가중치 -->
        <UiFormItem label="가중치">
          <UiInput
            v-model.number="newItem.weight"
            type="number"
            placeholder="가중치를 입력해주세요."
          />
        </UiFormItem>
      </template>

      <!-- BOS 구분일 경우의 필드 -->
      <template v-else>
        <!-- 행동수준 테이블 -->
        <UiTable v-model="newItem.behaviors" editable sortable>
          <!-- 열 너비 설정 -->
          <template #colgroup>
            <col style="width: 20px" />
            <col style="width: auto" />
            <col style="width: 15%" />
            <col style="width: 10%" />
          </template>

          <!-- 테이블 헤더 -->
          <template #header="{ selectAll, isAllSelected, sortable }">
            <tr>
              <th>
                <UiCheckbox
                  size="large"
                  @click.stop
                  :modelValue="isAllSelected"
                  @update:modelValue="selectAll"
                />
              </th>
              <th>행동수준 설명</th>
              <th>수준/점수</th>
              <th>가중치</th>
            </tr>
          </template>

          <!-- 테이블 본문 -->
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
              v-for="(behavior, index) in rows"
              :key="index"
              :draggable="sortable"
              @dragstart="e => handleDragStart(e, index)"
              @dragover="e => handleDragOver(e)"
              @drop="e => handleDrop(e, index)"
              @dragend="handleDragEnd"
              :class="{ 'sortable-row': sortable }"
            >
              <!-- 체크박스 -->
              <td>
                <UiCheckbox
                  :modelValue="isRowSelected(behavior)"
                  @update:modelValue="toggleRowSelection(behavior)"
                  size="large"
                  @click.stop
                />
              </td>
              <!-- 행동수준 설명 -->
              <td>
                <UiTextarea
                  v-if="editable"
                  v-model="behavior.description"
                  placeholder="행동수준 설명을 입력해주세요."
                  rows="3"
                />
                <div v-else>{{ behavior.description }}</div>
              </td>

              <!-- 수준/점수 -->
              <td>
                <div v-if="editable" class="flex items-center gap-2">
                  <UiInput
                    v-model.number="behavior.level"
                    type="number"
                    placeholder="수준"
                    class="w-1/2"
                  />
                  <span>/</span>
                  <UiInput
                    v-model.number="behavior.score"
                    type="number"
                    placeholder="점수"
                    class="w-1/2"
                  />
                </div>
                <div v-else>{{ behavior.level }}/{{ behavior.score }}</div>
              </td>

              <!-- 가중치 -->
              <td>
                <UiInput
                  v-if="editable"
                  v-model.number="behavior.weight"
                  type="number"
                  placeholder="가중치"
                />
                <div v-else>{{ behavior.weight }}</div>
              </td>
            </tr>
            <tr v-if="rows.length === 0">
              <td colspan="4" class="text-center py-4">
                행동수준이 없습니다. '행 추가' 버튼을 클릭하여 추가해주세요.
              </td>
            </tr>
          </template>
        </UiTable>
      </template>
    </UiFormLayout>

    <template #footerActions>
      <UiButton @click="saveItem" variant="primary">저장</UiButton>
      <UiButton @click="closeModal" variant="secondary-line">닫기</UiButton>
    </template>
  </UiModal>
</template>
<script setup>
  import { ref, computed } from 'vue'
  import EvaluationGroupManager from './comp/EvaluationGroupManager.vue'
  import PageHeader from './comp/PageHeader.vue'
</script>

<style scoped></style>
