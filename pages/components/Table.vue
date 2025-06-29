<script setup>
  const users = ref([
    { id: 1, name: '김철수', age: 25, score: 10 },
    { id: 2, name: '이영희', age: 30, score: 10 },
    { id: 3, name: '박민수', age: 28, score: 20 }
  ])

  const users2 = ref([
    { id: 1, name: '김철수', age: 25, score: 10 },
    { id: 2, name: '이영희', age: 30, score: 10 },
    { id: 3, name: '박민수', age: 28, score: 20 }
  ])

  // 👇 editable 이벤트 핸들러
  const handleSave = data => {
    console.log('저장된 데이터:', data)
    alert('데이터가 저장되었습니다!')
  }

  const handleRowAdded = newRow => {
    console.log('새 행 추가:', newRow)
  }

  const handleRowDeleted = deletedRows => {
    console.log('삭제된 행들:', deletedRows)
  }

  const handleOrderChanged = orderInfo => {
    console.log('순서 변경:', orderInfo)
  }
</script>

<template>
  <!--
     기본 테이블
  -->
  <UiTable class="mt-20" title="가장 기본 테이블" v-model="users">
    <template #header>
      <tr>
        <th>이름</th>
        <th>나이</th>
      </tr>
    </template>

    <template #body>
      <tr v-for="user in users" :key="user.id">
        <td class="text-center">{{ user.name }}</td>
        <td class="text-center">{{ user.age }}</td>
      </tr>
    </template>
  </UiTable>

  <!--
     체크박스 선택 추가
  -->
  <UiTable class="mt-20" title="헤더에 선택 컬럼 추가" v-model="users">
    <template #header="{ selectAll, isAllSelected }">
      <tr>
        <th class="text-center">
          <UiCheckbox size="large" :modelValue="isAllSelected" @update:modelValue="selectAll" />
        </th>
        <th>이름</th>
        <th>나이</th>
      </tr>
    </template>

    <template #body="{ rows, toggleRowSelection, isRowSelected }">
      <tr v-for="row in rows" :key="row.id">
        <td class="text-center">
          <UiCheckbox
            size="large"
            :modelValue="isRowSelected(row)"
            @update:modelValue="() => toggleRowSelection(row)"
          />
        </td>
        <td class="text-center">{{ row.name }}</td>
        <td class="text-center">{{ row.age }}</td>
      </tr>
    </template>
  </UiTable>

  <!--
     저장, 삭제, 정렬 테이블
  -->
  <UiTable
    class="mt-20"
    title="저장, 삭제, 정렬 테이블"
    v-model="users2"
    editable
    sortable
    @save="handleSave"
    @row-added="handleRowAdded"
    @row-deleted="handleRowDeleted"
    @order-changed="handleOrderChanged"
  >
    <template #header="{ selectAll, isAllSelected, sortable }">
      <tr>
        <th class="text-center">
          <UiCheckbox size="large" :modelValue="isAllSelected" @update:modelValue="selectAll" />
        </th>
        <th>이름</th>
        <th>나이</th>
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
        v-for="(row, index) in rows"
        :key="row.id"
        :draggable="sortable"
        @dragstart="event => handleDragStart(event, index)"
        @dragover="handleDragOver"
        @drop="event => handleDrop(event, index)"
        @dragend="handleDragEnd"
        :class="{ 'sortable-row': sortable }"
      >
        <td class="text-center">
          <UiCheckbox
            size="large"
            :modelValue="isRowSelected(row)"
            @update:modelValue="() => toggleRowSelection(row)"
          />
        </td>
        <td class="text-center">{{ row.name }}</td>
        <td class="text-center">{{ row.age }}</td>
      </tr>
    </template>
  </UiTable>

  <!--
     조회, 수정 추가
  -->
  <UiTable class="mt-20" title="조회 + 수정" v-model="users">
    <template #header="{ selectAll, isAllSelected }">
      <tr>
        <th class="text-center">
          <UiCheckbox size="large" :modelValue="isAllSelected" @update:modelValue="selectAll" />
        </th>
        <th>이름</th>
        <th>나이</th>
        <th>수정</th>
        <th>조회</th>
      </tr>
    </template>

    <template #body="{ rows, toggleRowSelection, isRowSelected }">
      <tr v-for="row in rows" :key="row.id">
        <td class="text-center">
          <UiCheckbox
            size="large"
            :modelValue="isRowSelected(row)"
            @update:modelValue="() => toggleRowSelection(row)"
          />
        </td>
        <td class="text-center">{{ row.name }}</td>
        <td class="text-center">{{ row.age }}</td>
        <td class="text-center">
          <UiButton variant="ghost" size="small" iconOnly>
            <i class="icon icon-edit icon-md"></i>
          </UiButton>
        </td>
        <td class="text-center">
          <UiButton variant="ghost" size="small" iconOnly>
            <i class="icon icon-search icon-md"></i>
          </UiButton>
        </td>
      </tr>
    </template>
  </UiTable>

  <!--
   input + input 테이블
  -->
  <UiTable class="mt-20" title="input + input 테이블" v-model="users">
    <template #header="{ selectAll, isAllSelected }">
      <tr>
        <th class="text-center">
          <UiCheckbox size="large" :modelValue="isAllSelected" @update:modelValue="selectAll" />
        </th>
        <th>이름</th>
        <th>나이</th>
        <th>점수</th>
      </tr>
    </template>

    <template #body="{ rows, toggleRowSelection, isRowSelected }">
      <tr v-for="row in rows" :key="row.id">
        <td class="text-center">
          <UiCheckbox
            size="large"
            :modelValue="isRowSelected(row)"
            @update:modelValue="() => toggleRowSelection(row)"
          />
        </td>
        <td class="text-center">
          <UiInput v-model="row.name" placeholder="이름" />
        </td>
        <td class="text-center">
          <UiInput v-model="row.age" type="number" placeholder="나이" />
        </td>
        <td class="text-center">
          <!-- 👇 여기에 점수 버튼 추가 -->
          <UiButton variant="ghost" icon-only class="color-primary">
            {{ row.score }}
          </UiButton>
        </td>
      </tr>
    </template>
  </UiTable>
</template>
