<template>
  <div class="page-container">
    <PageHeader />

    <div class="page-content flex flex-col">
      <div class="page-content-body">
        <UiTable
          title="업무기술서 작성현황"
          :model-value="users"
          :striped="true"
          :hover="true"
          size="medium"
          bordered
          :scrollable="true"
          :max-height="'calc(100vh - 200px)'"
        >
          <template #colgroup>
            <col width="40px" />
            <col width="auto" />
            <col width="auto" />
            <col width="auto" />
            <col width="auto" />
            <col width="auto" />
          </template>
          <template #header-action-right>
            <div class="button-group">
              <UiButton variant="secondary-line" size="medium">
                엑셀 다운로드
                <i class="icon-md icon-excel"></i>
              </UiButton>
              <UiButton variant="secondary-line" size="medium">
                메일 발송
                <i class="icon-md icon-mail"></i>
              </UiButton>
            </div>
          </template>
          <template #header="{ selectAll, isAllSelected }">
            <tr>
              <th>
                <UiCheckbox
                  :modelValue="isAllSelected"
                  @update:modelValue="selectAll"
                  size="large"
                />
              </th>
              <th>부서</th>
              <th>이름</th>
              <th>직위</th>
              <th>작성여부</th>
              <th>최종작성일시</th>
            </tr>
          </template>

          <template #body="{ rows, toggleRowSelection, isRowSelected }">
            <tr v-for="user in rows" :key="user.id">
              <td class="text-center">
                <UiCheckbox
                  size="large"
                  @click.stop
                  :modelValue="isRowSelected(user)"
                  @update:modelValue="toggleRowSelection(user)"
                />
              </td>
              <td class="text-center">{{ user.department }}</td>
              <td class="text-center">{{ user.name }}</td>
              <td class="text-center">{{ user.position }}</td>
              <td class="text-center">
                <span :class="user.isCompleted ? 'text-green-500' : 'text-red-500'">
                  {{ user.isCompleted ? '작성완료' : '미작성' }}
                </span>
              </td>
              <td class="text-center">{{ user.lastUpdatedAt }}</td>
            </tr>
          </template>
        </UiTable>
      </div>
    </div>
  </div>
</template>

<script setup>
  import PageHeader from './comp/PageHeader.vue'

  const users = [
    {
      id: 1,
      name: 'John Doe',
      department: 'IT',
      position: 'Software Engineer',
      isCompleted: true,
      lastUpdatedAt: '2023-06-01 10:30:00'
    },
    {
      id: 2,
      name: 'Jane Smith',
      department: 'Marketing',
      position: 'Marketing Manager',
      isCompleted: false,
      lastUpdatedAt: '2023-06-02 11:45:00'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      department: 'Sales',
      position: 'Sales Representative',
      isCompleted: true,
      lastUpdatedAt: '2023-06-03 09:15:00'
    },
    {
      id: 4,
      name: 'Alice Brown',
      department: 'HR',
      position: 'HR Manager',
      isCompleted: false,
      lastUpdatedAt: '2023-06-04 12:20:00'
    },
    {
      id: 5,
      name: 'Charlie Davis',
      department: 'Finance',
      position: 'Accountant',
      isCompleted: true,
      lastUpdatedAt: '2023-06-05 14:40:00'
    },
    {
      id: 6,
      name: 'David Wilson',
      department: 'IT',
      position: 'Software Engineer',
      isCompleted: false,
      lastUpdatedAt: '2023-06-06 15:55:00'
    },
    {
      id: 7,
      name: '김민수',
      department: '개발팀',
      position: '선임 개발자',
      isCompleted: true,
      lastUpdatedAt: '2023-06-07 09:10:00'
    },
    {
      id: 8,
      name: '이지연',
      department: '디자인팀',
      position: '디자이너',
      isCompleted: false,
      lastUpdatedAt: '2023-06-08 11:25:00'
    },
    {
      id: 9,
      name: '박준호',
      department: '마케팅팀',
      position: '마케팅 담당자',
      isCompleted: true,
      lastUpdatedAt: '2023-06-09 14:30:00'
    },
    {
      id: 10,
      name: '최유진',
      department: '인사팀',
      position: '인사 담당자',
      isCompleted: false,
      lastUpdatedAt: '2023-06-10 10:15:00'
    },
    {
      id: 11,
      name: '정성민',
      department: '영업팀',
      position: '영업 매니저',
      isCompleted: true,
      lastUpdatedAt: '2023-06-11 16:40:00'
    },
    {
      id: 12,
      name: '한지원',
      department: '재무팀',
      position: '재무 분석가',
      isCompleted: false,
      lastUpdatedAt: '2023-06-12 13:20:00'
    },
    {
      id: 13,
      name: '송민재',
      department: '개발팀',
      position: '주니어 개발자',
      isCompleted: true,
      lastUpdatedAt: '2023-06-13 09:50:00'
    },
    {
      id: 14,
      name: '임수진',
      department: '고객지원팀',
      position: '고객지원 매니저',
      isCompleted: false,
      lastUpdatedAt: '2023-06-14 11:05:00'
    },
    {
      id: 15,
      name: '강현우',
      department: '기획팀',
      position: '기획자',
      isCompleted: true,
      lastUpdatedAt: '2023-06-15 15:30:00'
    },
    {
      id: 16,
      name: '윤서연',
      department: '마케팅팀',
      position: '콘텐츠 매니저',
      isCompleted: false,
      lastUpdatedAt: '2023-06-16 14:15:00'
    },
    {
      id: 17,
      name: '조현민',
      department: '개발팀',
      position: '시스템 엔지니어',
      isCompleted: true,
      lastUpdatedAt: '2023-06-17 10:45:00'
    },
    {
      id: 18,
      name: '신지은',
      department: '디자인팀',
      position: 'UI/UX 디자이너',
      isCompleted: false,
      lastUpdatedAt: '2023-06-18 09:30:00'
    },
    {
      id: 19,
      name: '권태현',
      department: '영업팀',
      position: '영업 담당자',
      isCompleted: true,
      lastUpdatedAt: '2023-06-19 13:10:00'
    },
    {
      id: 20,
      name: '오민지',
      department: '인사팀',
      position: '채용 담당자',
      isCompleted: false,
      lastUpdatedAt: '2023-06-20 11:55:00'
    },
    {
      id: 21,
      name: '이동훈',
      department: '개발팀',
      position: '백엔드 개발자',
      isCompleted: true,
      lastUpdatedAt: '2023-06-21 16:20:00'
    },
    {
      id: 22,
      name: '김서영',
      department: '마케팅팀',
      position: '디지털 마케터',
      isCompleted: false,
      lastUpdatedAt: '2023-06-22 14:40:00'
    },
    {
      id: 23,
      name: '박재현',
      department: '기획팀',
      position: '전략 기획자',
      isCompleted: true,
      lastUpdatedAt: '2023-06-23 10:05:00'
    },
    {
      id: 24,
      name: '정혜원',
      department: '디자인팀',
      position: '그래픽 디자이너',
      isCompleted: false,
      lastUpdatedAt: '2023-06-24 13:35:00'
    },
    {
      id: 25,
      name: '황준성',
      department: '개발팀',
      position: '프론트엔드 개발자',
      isCompleted: true,
      lastUpdatedAt: '2023-06-25 15:15:00'
    },
    {
      id: 26,
      name: '안소희',
      department: '고객지원팀',
      position: '고객지원 담당자',
      isCompleted: false,
      lastUpdatedAt: '2023-06-26 09:25:00'
    }
  ]
</script>
