<template>
  <div class="page-container">
    <PageHeader />
    <div class="page-content">
      <!-- 조직점수산출 테이블 -->
      <UiTable
        v-model="조직점수산출데이터"
        title="조직점수산출"
        editable
        bordered
        striped
        hover
        :canAddRow="false"
        :canAddSortableButton="false"
        :canSave="false"
        :scrollable="true"
        max-height="calc(100vh - 230px)"
      >
        <template #colgroup>
          <col style="width: 40px" />
          <col style="width: 150px" />
          <col style="width: 150px" />
          <col style="width: 150px" />
          <col style="width: 150px" />
          <col style="width: 40px" />
          <col style="width: 40px" />
          <col style="width: 270px" />
          <col style="width: 150px" />
          <col style="width: 150px" />
          <col style="width: 150px" />
        </template>
        <template #header-action-right>
          <div class="button-group flex items-center gap-5">
            <UiButton variant="secondary-line" size="medium"> 가져오기 </UiButton>
            <UiButton variant="primary" size="medium">
              <i class="icon-md icon-save icon-white"></i>
              일괄저장
            </UiButton>
          </div>
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
          <th v-for="header in 조직점수산출데이터바디" :key="header.key">
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
            :class="{ 'sortable-row': sortable }"
          >
            <td class="text-center">
              <UiCheckbox
                size="large"
                @click.stop
                :modelValue="isRowSelected(row)"
                @update:modelValue="() => toggleRowSelection(row)"
              />
            </td>
            <td class="text-center">{{ row.empId }}</td>
            <td class="text-center">{{ row.name }}</td>
            <td class="text-center">{{ row.position }}</td>
            <td class="text-center">{{ row.grade }}</td>
            <td class="text-center">
              <UiSelect :options="monthOptions" />
            </td>
            <td class="text-center">
              <UiSelect :options="monthOptions" />
            </td>
            <td class="text-center">{{ row.performanceOrg }}</td>
            <td class="text-center">{{ row.monthCount }}</td>
            <td class="text-center">{{ row.totalMonths }}</td>
            <td class="text-center">{{ row.orgScore }}</td>
          </tr>
        </template>
      </UiTable>
    </div>
  </div>
</template>

<script setup>
  import PageHeader from './comp/PageHeader.vue'

  const 조직점수산출데이터 = ref([
    {
      id: 1,
      empId: '1001',
      name: '홍길동',
      position: '팀장',
      grade: '책임',
      startMonth: ['2023-01', '2023-12'],
      endMonth: ['2023-01', '2023-12'],
      performanceOrg: '(주)이즈파크>경영지원팀>인사팀',
      monthCount: '12',
      totalMonths: '12',
      orgScore: '85'
    },
    {
      id: 2,
      empId: '1002',
      name: '김철수',
      position: '과장',
      grade: '선임',
      startMonth: ['2023-02', '2023-12'],
      endMonth: ['2023-02', '2023-12'],
      performanceOrg: '(주)이즈파크>경영지원팀>인사팀',
      monthCount: '11',
      totalMonths: '11',
      orgScore: '80'
    },
    {
      id: 3,
      empId: '1003',
      name: '이영희',
      position: '대리',
      grade: '선임',
      startMonth: ['2023-03', '2023-12'],
      endMonth: ['2023-03', '2023-12'],
      performanceOrg: '(주)이즈파크>경영지원팀>인사팀',
      monthCount: '10',
      totalMonths: '10',
      orgScore: '82'
    },
    {
      id: 4,
      empId: '1004',
      name: '박민수',
      position: '사원',
      grade: '주임',
      startMonth: ['2023-04', '2023-12'],
      endMonth: ['2023-04', '2023-12'],
      performanceOrg: '(주)이즈파크>경영지원팀>인사팀',
      monthCount: '9',
      totalMonths: '9',
      orgScore: '78'
    },
    {
      id: 5,
      empId: '1005',
      name: '최민지',
      position: '사원',
      grade: '주임',
      startMonth: ['2023-05', '2023-12'],
      endMonth: ['2023-05', '2023-12'],
      performanceOrg: '(주)이즈파크>경영지원팀>인사팀',
      monthCount: '8',
      totalMonths: '8',
      orgScore: '75'
    },
    {
      id: 6,
      empId: '1006',
      name: '최민희',
      position: '대리',
      grade: '선임',
      startMonth: ['2023-06', '2023-12'],
      endMonth: ['2023-06', '2023-12'],
      performanceOrg: '(주)이즈파크>경영지원팀>인사팀',
      monthCount: '7',
      totalMonths: '7',
      orgScore: '72'
    },
    {
      id: 7,
      empId: '1007',
      name: '최민희',
      position: '대리',
      grade: '선임',
      startMonth: ['2023-07', '2023-12'],
      endMonth: ['2023-07', '2023-12'],
      performanceOrg: '(주)이즈파크>경영지원팀>인사팀',
      monthCount: '6',
      totalMonths: '6',
      orgScore: '69'
    },
    {
      id: 8,
      empId: '1008',
      name: '김영수',
      position: '사원',
      grade: '주임',
      startMonth: ['2023-08', '2023-12'],
      endMonth: ['2023-08', '2023-12'],
      performanceOrg: '(주)이즈파크>경영지원팀>인사팀',
      monthCount: '5',
      totalMonths: '5',
      orgScore: '67'
    },
    {
      id: 9,
      empId: '1009',
      name: '박지민',
      position: '과장',
      grade: '선임',
      startMonth: ['2023-02', '2023-12'],
      endMonth: ['2023-02', '2023-12'],
      performanceOrg: '(주)이즈파크>경영지원팀>회계팀',
      monthCount: '11',
      totalMonths: '11',
      orgScore: '81'
    },
    {
      id: 10,
      empId: '1010',
      name: '이지원',
      position: '대리',
      grade: '선임',
      startMonth: ['2023-03', '2023-12'],
      endMonth: ['2023-03', '2023-12'],
      performanceOrg: '(주)이즈파크>경영지원팀>회계팀',
      monthCount: '10',
      totalMonths: '10',
      orgScore: '79'
    },
    {
      id: 11,
      empId: '1011',
      name: '정현우',
      position: '사원',
      grade: '주임',
      startMonth: ['2023-05', '2023-12'],
      endMonth: ['2023-05', '2023-12'],
      performanceOrg: '(주)이즈파크>경영지원팀>총무팀',
      monthCount: '8',
      totalMonths: '8',
      orgScore: '74'
    },
    {
      id: 12,
      empId: '1012',
      name: '한소희',
      position: '사원',
      grade: '주임',
      startMonth: ['2023-06', '2023-12'],
      endMonth: ['2023-06', '2023-12'],
      performanceOrg: '(주)이즈파크>경영지원팀>총무팀',
      monthCount: '7',
      totalMonths: '7',
      orgScore: '73'
    },
    {
      id: 13,
      empId: '1013',
      name: '김태현',
      position: '팀장',
      grade: '책임',
      startMonth: ['2023-01', '2023-12'],
      endMonth: ['2023-01', '2023-12'],
      performanceOrg: '(주)이즈파크>개발팀>서비스개발팀',
      monthCount: '12',
      totalMonths: '12',
      orgScore: '88'
    },
    {
      id: 14,
      empId: '1014',
      name: '송민준',
      position: '과장',
      grade: '선임',
      startMonth: ['2023-02', '2023-12'],
      endMonth: ['2023-02', '2023-12'],
      performanceOrg: '(주)이즈파크>개발팀>서비스개발팀',
      monthCount: '11',
      totalMonths: '11',
      orgScore: '83'
    },
    {
      id: 15,
      empId: '1015',
      name: '윤서연',
      position: '대리',
      grade: '선임',
      startMonth: ['2023-04', '2023-12'],
      endMonth: ['2023-04', '2023-12'],
      performanceOrg: '(주)이즈파크>개발팀>서비스개발팀',
      monthCount: '9',
      totalMonths: '9',
      orgScore: '77'
    },
    {
      id: 16,
      empId: '1016',
      name: '조은지',
      position: '사원',
      grade: '주임',
      startMonth: ['2023-07', '2023-12'],
      endMonth: ['2023-07', '2023-12'],
      performanceOrg: '(주)이즈파크>개발팀>인프라팀',
      monthCount: '6',
      totalMonths: '6',
      orgScore: '71'
    },
    {
      id: 17,
      empId: '1017',
      name: '강동훈',
      position: '대리',
      grade: '선임',
      startMonth: ['2023-03', '2023-12'],
      endMonth: ['2023-03', '2023-12'],
      performanceOrg: '(주)이즈파크>개발팀>인프라팀',
      monthCount: '10',
      totalMonths: '10',
      orgScore: '80'
    }
  ])

  const 조직점수산출데이터바디 = ref([
    { key: 'empId', title: '사번' },
    { key: 'name', title: '이름' },
    { key: 'position', title: '직위' },
    { key: 'grade', title: '직급' },
    { key: 'startMonth', title: '시작월' },
    { key: 'endMonth', title: '종료월' },
    { key: 'performanceOrg', title: '성과조직' },
    { key: 'monthCount', title: '개월수' },
    { key: 'totalMonths', title: '총개월수' },
    { key: 'orgScore', title: '조직점수' }
  ])

  const monthOptions = ref([
    { value: '1월', label: '1월' },
    { value: '2월', label: '2월' },
    { value: '3월', label: '3월' },
    { value: '4월', label: '4월' },
    { value: '5월', label: '5월' },
    { value: '6월', label: '6월' },
    { value: '7월', label: '7월' },
    { value: '8월', label: '8월' },
    { value: '9월', label: '9월' },
    { value: '10월', label: '10월' },
    { value: '11월', label: '11월' },
    { value: '12월', label: '12월' }
  ])

  const handleEdit = row => {
    console.log('수정:', row)
    // 수정 로직 구현
  }
</script>

<style scoped>
  .page-container {
    padding: 20px;
  }
</style>
