<template>
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
        <UiTooltip title="역량항목그룹 가져오기">
          <template #trigger>
            <UiButton type="button" variant="secondary-line" size="medium">
              역량항목그룹 가져오기
              <i class="icon-md icon-get"></i>
            </UiButton>
          </template>
          <p>현 기존년도의 등급배분표 그룹 중 하나를 선택하여 복사합니다.</p>
        </UiTooltip>
        <UiButton type="button" variant="primary-line" size="medium" class="ml-2">
          전년도 데이터 복사
          <i class="icon-md icon-copy icon-primary"></i>
        </UiButton>
      </div>
    </div>
  </div>

  <div class="flex-container flex gap-15">
    <div class="w-25p">
      <div class="flex justify-end mb-20">
        <UiButton variant="primary-line" size="medium">그룹추가</UiButton>
      </div>

      <div class="is-border-wrp" style="max-height: calc(100vh - 240px); overflow-y: auto">
        <div class="is-border">
          <!-- 공통 -->
          <UiTable
            title="공통"
            v-model="tableData2"
            hover
            editable
            bordered
            striped
            :canAddRow="false"
            :default-row-data="defaultRowData"
            @save="handleSave"
          >
            <!-- 저장 버튼 대신 추가 버튼으로 변경 -->
            <template #action-button>
              <UiButton type="button" variant="primary" @click="showAddItemModal = true">
                추가
              </UiButton>
            </template>

            <!-- 열 너비 설정 -->
            <template #colgroup>
              <col v-if="useCheckbox" width="40px" />
              <col v-for="column in columns2" :key="column.key" :width="column.width" />
              <col v-if="showEditButton" width="60px" />
            </template>

            <!-- 테이블 헤더 -->
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
                  v-for="column in columns2"
                  :key="column.key"
                  :class="column.align ? `text-${column.align}` : ''"
                >
                  {{ column.title }}
                </th>
                <th v-if="showEditButton">수정</th>
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
                sortable
              }"
            >
              <template v-for="(item, index) in rows" :key="item.id">
                <!-- 일반 항목인 경우 (특별 카테고리가 아닌 경우) -->
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
                    v-for="(column, colIndex) in columns2"
                    :key="colIndex"
                    :class="column.align ? `text-${column.align}` : ''"
                  >
                    {{ item[column.key] }}
                  </td>

                  <!-- 수정 버튼, 돋보기 버튼 -->
                  <td v-if="showEditButton">
                    <div class="button-group flex items-center">
                      <UiButton variant="ghost" icon-only @click.stop="editItem(item)">
                        <i class="icon-md icon-pencil icon-gray"></i>
                      </UiButton>
                    </div>
                  </td>
                </tr>
              </template>
            </template>
          </UiTable>
          <!-- 공통 끝-->
        </div>

        <!-- 리더십 -->
        <div class="is-border">
          <UiTable
            title="리더십"
            v-model="tableData3"
            hover
            editable
            bordered
            striped
            :canAddRow="false"
            :default-row-data="defaultRowData"
            @save="handleSave"
          >
            <!-- 저장 버튼 대신 추가 버튼으로 변경 -->
            <template #action-button>
              <UiButton type="button" variant="primary" @click="showAddItemModal = true">
                추가
              </UiButton>
            </template>

            <!-- 열 너비 설정 -->
            <template #colgroup>
              <col v-if="useCheckbox" width="40px" />
              <col v-for="column in columns2" :key="column.key" :width="column.width" />
              <col v-if="showEditButton" width="60px" />
            </template>

            <!-- 테이블 헤더 -->
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
                  v-for="column in columns2"
                  :key="column.key"
                  :class="column.align ? `text-${column.align}` : ''"
                >
                  {{ column.title }}
                </th>
                <th v-if="showEditButton">수정</th>
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
                sortable
              }"
            >
              <template v-for="(item, index) in rows" :key="item.id">
                <!-- 일반 항목인 경우 (특별 카테고리가 아닌 경우) -->
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
                    v-for="(column, colIndex) in columns2"
                    :key="colIndex"
                    :class="column.align ? `text-${column.align}` : ''"
                  >
                    {{ item[column.key] }}
                  </td>

                  <!-- 수정 버튼, 돋보기 버튼 -->
                  <td v-if="showEditButton">
                    <UiButton variant="ghost" icon-only @click.stop="editItem(item)">
                      <i class="icon-md icon-pencil icon-gray"></i>
                    </UiButton>
                  </td>
                </tr>
              </template>
            </template>
          </UiTable>
          <!-- 리더십 끝-->
        </div>

        <!-- 피드백역량 -->
        <div class="is-border">
          <UiTable
            title="피드백역량"
            v-model="tableData4"
            hover
            editable
            bordered
            striped
            :canAddRow="false"
            :default-row-data="defaultRowData"
            @save="handleSave"
          >
            <!-- 저장 버튼 대신 추가 버튼으로 변경 -->
            <template #action-button>
              <UiButton type="button" variant="primary" @click="showAddItemModal = true">
                추가
              </UiButton>
            </template>

            <!-- 열 너비 설정 -->
            <template #colgroup>
              <col v-if="useCheckbox" width="40px" />
              <col v-for="column in columns2" :key="column.key" :width="column.width" />
              <col v-if="showEditButton" width="60px" />
            </template>

            <!-- 테이블 헤더 -->
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
                  v-for="column in columns2"
                  :key="column.key"
                  :class="column.align ? `text-${column.align}` : ''"
                >
                  {{ column.title }}
                </th>
                <th v-if="showEditButton">수정</th>
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
                sortable
              }"
            >
              <template v-for="(item, index) in rows" :key="item.id">
                <tr
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
                    v-for="(column, colIndex) in columns2"
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
              </template>
            </template>
          </UiTable>
        </div>

        <!-- 다면평가 -->
        <div class="is-border">
          <UiTable
            title="다면평가"
            v-model="tableData5"
            hover
            editable
            bordered
            striped
            :canAddRow="false"
            :default-row-data="defaultRowData"
            @save="handleSave"
          >
            <!-- 저장 버튼 대신 추가 버튼으로 변경 -->
            <template #action-button>
              <UiButton type="button" variant="primary" @click="showAddItemModal = true">
                추가
              </UiButton>
            </template>

            <!-- 열 너비 설정 -->
            <template #colgroup>
              <col v-if="useCheckbox" width="40px" />
              <col v-for="column in columns2" :key="column.key" :width="column.width" />
              <col v-if="showEditButton" width="60px" />
            </template>

            <!-- 테이블 헤더 -->
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
                  v-for="column in columns2"
                  :key="column.key"
                  :class="column.align ? `text-${column.align}` : ''"
                >
                  {{ column.title }}
                </th>
                <th v-if="showEditButton">수정</th>
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
                sortable
              }"
            >
              <template v-for="(item, index) in rows" :key="item.id">
                <tr
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
                    v-for="(column, colIndex) in columns2"
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
              </template>
            </template>
          </UiTable>
        </div>
      </div>
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

  // 헤더 관련 스크립트
  const selectedYear = ref('2025')
  const yearOptions = ref([
    { value: '2025', label: '2025년' },
    { value: '2024', label: '2024년' },
    { value: '2023', label: '2023년' }
  ])

  // 테이블 관련 스크립트
  const useCheckbox = ref(true)
  const showEditButton = ref(true)

  // 기본 행 데이터 정의
  const defaultRowData = computed(() => {
    const defaultData = {}
    columns.value.forEach(column => {
      defaultData[column.key] = column.key === 'level' || column.key === 'weight' ? 0 : ''
    })
    return defaultData
  })

  // 테이블 데이터
  const tableData = ref([
    {
      id: 1,
      name: '리더십',
      category: '핵심역량',
      standard: '조직의 목표를 달성하기 위해 구성원들을 이끄는 능력',
      level: 5,
      weight: 20
    },
    {
      id: 2,
      name: '문제해결',
      category: '직무역량',
      standard: '복잡한 문제를 분석하고 효과적인 해결책을 도출하는 능력',
      level: 4,
      weight: 15
    },
    {
      id: 3,
      name: '의사소통',
      category: '기본역량',
      standard: '정보와 아이디어를 명확하게 전달하고 수용하는 능력',
      level: 3,
      weight: 10
    },
    {
      id: 4,
      name: '전략적 사고',
      category: 'BOS',
      behaviors: [
        {
          description:
            '사업에 대한 통찰력에 기초하여 2년 이상의 추진 기간이 요구되는 장기적 사업 계획을 기안하며, 장기적 미래의 변화 상황을 예측하고, 현실적인 대안을 제시한다.',
          level: 5,
          score: 100,
          weight: '-'
        },
        {
          description:
            '1~2년의 추진 기간이 요구되는 중기적 사업 계획을 수립하며, 중기적 변화 상황을 예측하고, 현실적인 대안을 제시한다.',
          level: 4,
          score: 80,
          weight: '-'
        },
        {
          description:
            '3~6개월 이상의 추진 기간이 요구되는 단기적 사업 계획을 수립하며, 단기적 변화 상황을 예측하고, 현실적인 대안을 제시한다.',
          level: 3,
          score: 60,
          weight: '-'
        }
      ]
    },
    {
      id: 5,
      name: '성과지향',
      category: '일반',
      standard: '목표를 달성하기 위해 끊임없이 노력하는 태도',
      level: '-',
      weight: '-'
    },
    {
      id: 1,
      name: '리더십',
      category: '핵심역량',
      standard: '조직의 목표를 달성하기 위해 구성원들을 이끄는 능력',
      level: 5,
      weight: 20
    },
    {
      id: 2,
      name: '문제해결',
      category: '직무역량',
      standard: '복잡한 문제를 분석하고 효과적인 해결책을 도출하는 능력',
      level: 4,
      weight: 15
    },
    {
      id: 3,
      name: '의사소통',
      category: '기본역량',
      standard: '정보와 아이디어를 명확하게 전달하고 수용하는 능력',
      level: 3,
      weight: 10
    },
    {
      id: 4,
      name: '전략적 사고',
      category: 'BOS',
      behaviors: [
        {
          description:
            '사업에 대한 통찰력에 기초하여 2년 이상의 추진 기간이 요구되는 장기적 사업 계획을 기안하며, 장기적 미래의 변화 상황을 예측하고, 현실적인 대안을 제시한다.',
          level: 5,
          score: 100,
          weight: '-'
        },
        {
          description:
            '1~2년의 추진 기간이 요구되는 중기적 사업 계획을 수립하며, 중기적 변화 상황을 예측하고, 현실적인 대안을 제시한다.',
          level: 4,
          score: 80,
          weight: '-'
        },
        {
          description:
            '3~6개월 이상의 추진 기간이 요구되는 단기적 사업 계획을 수립하며, 단기적 변화 상황을 예측하고, 현실적인 대안을 제시한다.',
          level: 3,
          score: 60,
          weight: '-'
        }
      ]
    },
    {
      id: 5,
      name: '성과지향',
      category: '일반',
      standard: '목표를 달성하기 위해 끊임없이 노력하는 태도',
      level: '-',
      weight: '-'
    }
  ])
  const columns = ref([
    { key: 'name', title: '역량항목', align: '', width: '100px', icon: 'edit' },
    { key: 'category', title: '구분', align: 'center', width: '100px' },
    {
      key: 'standard',
      title: '행동기준/행동수준/역량정의',
      align: '',
      width: ''
    },
    { key: 'level', title: '수준/점수', align: 'center', width: '100px' },
    { key: 'weight', title: '가중', align: 'center', width: '80px' }
  ])

  // 공통 테이블 데데이터
  const tableData2 = ref([
    {
      id: 1,
      name: '역량항목'
    },
    {
      id: 2,
      name: '리더십'
    },
    {
      id: 3,
      name: '혁신'
    },
    {
      id: 4,
      name: '소통능력'
    }
  ])
  const columns2 = ref([{ key: 'name', title: '역량사전', icon: 'edit' }])

  // 리더십 테이블 데이터
  const tableData3 = ref([
    {
      id: 1,
      name: '역량사전'
    }
  ])
  const columns3 = ref([{ key: 'name', title: '역량사전', icon: 'edit' }])

  // 다면평가 테이블 데이터
  const tableData4 = ref([
    {
      id: 1,
      name: '역량사전'
    }
  ])
  const columns4 = ref([{ key: 'name', title: '역량사전', icon: 'edit' }])

  // 피드백역량
  const tableData5 = ref([
    {
      id: 1,
      name: '역량사전'
    }
  ])
  const columns5 = ref([{ key: 'name', title: '역량사전', icon: 'edit' }])

  // 저장 핸들러
  const handleSave = data => {
    console.log('저장된 데이터:', data)
    // API 호출 등의 저장 로직
  }

  /**
   * 모달 관련
   */
  const showAddItemModal = ref(false)
  const isEditMode = ref(false)
  const editItemId = ref(null)

  // 구분 옵션
  const categoryOptions = ref([
    { value: '일반', label: '일반' },
    { value: 'BOS', label: 'BOS' }
  ])

  // 새 항목 데이터 초기화
  const initNewItem = () => ({
    name: '',
    category: '',
    standard: '',
    level: 3,
    weight: 10,
    behaviors: []
  })

  // 새 항목 데이터
  const newItem = ref(initNewItem())

  // 구분 변경 핸들러
  const handleCategoryChange = newCategory => {
    // 공통 초기화
    newItem.value.behaviors = []

    if (newCategory === '일반') {
      newItem.value.level = '-'
      newItem.value.weight = '-'
    } else if (newCategory === 'BOS') {
      // BOS일 경우 기본 행동수준 하나 추가
      newItem.value.behaviors = [createNewBehavior()]
    } else {
      // 기본 카테고리일 경우
      newItem.value.level = 3
      newItem.value.weight = 10
    }
  }

  // 새 행동수준 객체 생성
  const createNewBehavior = () => ({
    description: '',
    level: 1,
    score: 20,
    weight: '-'
  })

  // 모달 닫기
  const closeModal = () => {
    showAddItemModal.value = false
    isEditMode.value = false
    editItemId.value = null
    newItem.value = initNewItem()
  }

  // 항목 편집 시작
  const editItem = item => {
    isEditMode.value = true
    editItemId.value = item.id

    // 깊은 복사로 항목 데이터 복사
    newItem.value = JSON.parse(
      JSON.stringify({
        name: item.name,
        category: item.category,
        standard: item.standard,
        level: item.level,
        weight: item.weight,
        behaviors: item.behaviors || []
      })
    )

    showAddItemModal.value = true
  }

  // 항목 저장 (추가 또는 수정)
  const saveItem = () => {
    // 기본 검증
    if (!newItem.value.name || !newItem.value.category) {
      alert('항목명과 구분은 필수 입력 항목입니다.')
      return
    }

    // 구분별 검증 및 처리
    if (newItem.value.category === 'BOS') {
      if (newItem.value.behaviors.length === 0) {
        alert('BOS 구분의 경우 최소 하나 이상의 행동수준을 추가해야 합니다.')
        return
      }

      // BOS 행동수준 검증
      for (const behavior of newItem.value.behaviors) {
        if (!behavior.description) {
          alert('모든 행동수준 설명을 입력해주세요.')
          return
        }
      }
    } else if (newItem.value.category === '일반') {
      // 일반 구분일 경우
      if (!newItem.value.standard) {
        alert('역량정의를 입력해주세요.')
        return
      }
      newItem.value.level = '-'
      newItem.value.weight = '-'
    } else {
      // 다른 구분일 경우
      if (!newItem.value.standard) {
        alert('역량정의를 입력해주세요.')
        return
      }
    }

    // 추가 또는 수정 처리
    if (isEditMode.value) {
      const index = tableData.value.findIndex(item => item.id === editItemId.value)
      if (index !== -1) {
        tableData.value[index] = {
          ...tableData.value[index],
          ...newItem.value,
          id: editItemId.value // ID 유지
        }
      }
    } else {
      tableData.value.push({
        id: Date.now(),
        ...newItem.value
      })
    }

    // 모달 닫기
    closeModal()
  }
</script>

<style scoped></style>
