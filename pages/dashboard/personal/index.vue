<template>
	<div class="flex-container">
		<div class="w-50p">
			<UiTableDefault v-model="tableData" v-model:selected="selectedRows" :selectable="true">
				<!-- 전체선택 체크박스 -->
				<template #header="{ selectAllProps }">
					<tr>
						<th><UiCheckbox v-bind="selectAllProps" /></th>
						<th>이름</th>
						<th>이메일</th>
					</tr>
				</template>

				<!-- 개별선택 체크박스 -->
				<template #body="{ rows, selectRowProps }">
					<tr v-for="row in rows" :key="row.id">
						<td>
							<UiCheckbox
								:model-value="selectRowProps.isRowSelected(row)"
								@update:model-value="selectRowProps.toggleRowSelection(row)"
							/>
						</td>
						<td>{{ row.name }}</td>
						<td>{{ row.email }}</td>
					</tr>
				</template>
			</UiTableDefault>
		</div>
		<div class="w-50p"></div>
	</div>
</template>

<script setup>
	const tableData = ref([
		{ id: 1, name: 'John Doe', email: 'john.doe@example.com' },
		{ id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
		{ id: 3, name: 'Jim Beam', email: 'jim.beam@example.com' }
	])
	/**

  [ 1. 데이터 흐름: v-model="tableData" → rows ]

  🔄 데이터 흐름 과정:

  1. 부모 컴포넌트: v-model="tableData"
  2. UiTableDefault 내부: props.modelValue로 받음
  3. UiTableDefault 내부: processedTableData computed로 가공
  4. 슬롯으로 전달: :rows="processedTableData"
  5. 부모에서 사용: { rows }로 받아서 사용
`
  [ 2. 체크박스 선택 기능 활성화 ]

  🎯 :selectable="true"의 역할
  - 체크박스 선택 기능 ON/OFF 스위치
  - 이 속성에 따라 selectAllProps, selectRowProps 제공 여부 결정
  }

  template #슬롯이름="{ 받을데이터 }">
  <!--        ↑           ↑
          슬롯명      자식→부모 데이터 전달
  -->

  <!-- 1. 자식(UiTableDefault)이 데이터 준비 -->
  <slot name="header" :selectAllProps="준비된데이터" />

  <!-- 2. 부모가 받아서 사용 -->
  <template #header="{ selectAllProps }">
    <UiCheckbox v-bind="selectAllProps" />  <!-- 받은 데이터 사용 -->
  </template>



  🎯 v-model:selected는 Vue 3의 "다중 v-model" 문법입니다!
		컴포넌트가 여러 개의 v-model을 가질 수 있게 해줍니다.

    <!-- ✅ Vue 3 방식 - 다중 v-model -->
    <UiTableDefault
      v-model="tableData"           <!-- 기본 v-model (modelValue) -->
      v-model:selected="selectedRows"  <!-- 추가 v-model (selected) -->
    />

    <!-- 🔍 위 코드는 아래와 완전히 같은 의미입니다 -->
	  <UiTableDefault
      :modelValue="tableData"
      @update:modelValue="tableData = $event"

      :selected="selectedRows"
      @update:selected="selectedRows = $event"
    />
  **/
</script>
