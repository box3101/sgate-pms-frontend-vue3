<template>
  <div class="page-container">
    <PageHeader />
    <div class="page-content">
      <UiTabs :tabs="tabItems" v-model="activeTab" :max-width="120">
        <template #tab1>
          <article class="p-15">
            <div class="flex-container">
              <section class="w-60p">
                <div class="heading-4 mb-10">평가대상자</div>
                <article class="employee-list scrollable-minus-16">
                  <EmployeeCard
                    v-for="employee in employees"
                    :key="employee.id"
                    :employee="employee"
                    :is-active="selectedEmployeeId === employee.id"
                    @card-click="handleEmployeeSelect"
                  />
                </article>
              </section>
              <section class="w-40p scrollable-minus-14">
                <article>
                  <div class="heading-4 mb-10">평가자</div>
                  <div class="tbl-type02-v">
                    <table>
                      <colgroup>
                        <col width="150px" />
                        <col width="calc(100% - 150px)" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th scope="row"><label for="field1">1차 상급자 평가 </label></th>
                          <td>이찬용</td>
                        </tr>
                        <tr>
                          <th scope="row"><label for="field2">2차 상급자 평가</label></th>
                          <td>조정수</td>
                        </tr>
                        <tr>
                          <th scope="row"><label for="field3">3차 상급자 평가</label></th>
                          <td>오승현</td>
                        </tr>
                        <tr>
                          <th scope="row"><label for="field4">동료평가</label></th>
                          <td></td>
                        </tr>
                        <tr>
                          <th scope="row"><label for="field5">부하(상향) 평가</label></th>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </article>
                <article>
                  <div class="heading-4 mb-10">성과평가</div>
                  <div class="tbl-type02-v">
                    <table>
                      <colgroup>
                        <col width="150px" />
                        <col width="calc(100% - 150px)" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th scope="row"><label for="field1">1차 상급자 평가 </label></th>
                          <td>이찬용</td>
                        </tr>
                        <tr>
                          <th scope="row"><label for="field2">2차 상급자 평가</label></th>
                          <td>조정수</td>
                        </tr>
                        <tr>
                          <th scope="row"><label for="field3">3차 상급자 평가</label></th>
                          <td>오승현</td>
                        </tr>
                        <tr>
                          <th scope="row"><label for="field4">동료평가</label></th>
                          <td></td>
                        </tr>
                        <tr>
                          <th scope="row"><label for="field5">부하(상향) 평가</label></th>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </article>
                <article>
                  <div class="heading-4 mb-10">역량평가</div>
                  <div class="tbl-type02-v">
                    <table>
                      <colgroup>
                        <col width="150px" />
                        <col width="calc(100% - 150px)" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th scope="row"><label for="field1">DSV-부서지표</label></th>
                          <td>0 %</td>
                        </tr>
                        <tr>
                          <th scope="row"><label for="field2">DSV-공통역량</label></th>
                          <td>0 %</td>
                        </tr>
                        <tr>
                          <th scope="row"><label for="field3">DSV-직무역량</label></th>
                          <td>0 %</td>
                        </tr>
                        <tr>
                          <th scope="row"><label for="field4">리더쉽</label></th>
                          <td>25 %<br />- 협조성<br />- 지도/육성<br />- 조직몰입</td>
                        </tr>
                        <tr>
                          <th scope="row"><label for="field5">근태</label></th>
                          <td>0 %</td>
                        </tr>
                        <tr>
                          <th scope="row"><label for="field6">직무</label></th>
                          <td>
                            50 %<br />- 다양한 채널을 통하여 전문 노하우를 습득하고, 이를 활용하며,
                            조직 전체에 전파한다.
                          </td>
                        </tr>
                        <tr>
                          <th scope="row"><label for="field7">공통</label></th>
                          <td>0 %</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </article>
              </section>
            </div>
          </article>
        </template>
        <template #tab2>
          <article class="p-15">하반기</article>
        </template>
      </UiTabs>
    </div>
  </div>
</template>

<script setup>
  import PageHeader from './comp/PageHeader.vue'
  import EmployeeCard from './comp/EmployeeCard.vue'

  const logoText = inject('logoText')
  logoText.value = '평가대상확인(부서장)'

  const activeTab = ref('tab1')
  const tabItems = ref([
    { id: 'tab1', label: '상반기' },
    { id: 'tab2', label: '하반기' }
  ])

  const selectedEmployeeId = ref(null)

  const employees = ref([
    {
      id: 'isp144',
      name: '고지훈',
      position: '차장',
      role: '팀원',
      department: '인사팀',
      profileImage: '/css/ui/img/profileChr-M.svg',
      evaluators: ['장호영', '조정수', '오승현'],
      performanceResult: 70,
      competencyResult: '직무 1개 50%, 리더쉽 3개 25%'
    },
    {
      id: 'isp145',
      name: '고지훈',
      position: '차장',
      role: '팀원',
      department: '인사팀',
      profileImage: '/css/ui/img/profileChr-M.svg',
      evaluators: ['장호영', '조정수', '오승현'],
      performanceResult: 70,
      competencyResult: '직무 1개 50%, 리더쉽 3개 25%'
    },
    {
      id: 'isp146',
      name: '고지훈',
      position: '차장',
      role: '팀원',
      department: '인사팀',
      profileImage: '/css/ui/img/profileChr-M.svg',
      evaluators: ['장호영', '조정수', '오승현'],
      performanceResult: 70,
      competencyResult: '직무 1개 50%, 리더쉽 3개 25%'
    },
    {
      id: 'isp147',
      name: '고지훈',
      position: '차장',
      role: '팀원',
      department: '인사팀',
      profileImage: '/css/ui/img/profileChr-M.svg',
      evaluators: ['장호영', '조정수', '오승현'],
      performanceResult: 70,
      competencyResult: '직무 1개 50%, 리더쉽 3개 25%'
    },
    {
      id: 'isp147',
      name: '고지훈',
      position: '차장',
      role: '팀원',
      department: '인사팀',
      profileImage: '/css/ui/img/profileChr-M.svg',
      evaluators: ['장호영', '조정수', '오승현'],
      performanceResult: 70,
      competencyResult: '직무 1개 50%, 리더쉽 3개 25%'
    },
    {
      id: 'isp147',
      name: '고지훈',
      position: '차장',
      role: '팀원',
      department: '인사팀',
      profileImage: '/css/ui/img/profileChr-M.svg',
      evaluators: ['장호영', '조정수', '오승현'],
      performanceResult: 70,
      competencyResult: '직무 1개 50%, 리더쉽 3개 25%'
    }
  ])

  const handleEmployeeSelect = employee => {
    selectedEmployeeId.value = employee.id
    console.log('선택된 직원:', employee)
  }
</script>

<style scoped>
  .w-40p article {
    margin-bottom: 16px;
  }
</style>
