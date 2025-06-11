<template>
  <div>
    <UiTable
      v-model="mixedCompetencyData"
      title="역량항목 구분 (혼합 타입)"
      bordered
      scrollable
      sortable
      editable
      max-height="calc(100vh - 200px)"
      :canAddRow="false"
      :canSave="false"
    >
      <template #header-action>
        <div class="flex items-center gap-2">
          <UiButton variant="secondary-line" size="small">NCS</UiButton>
          <UiButton variant="secondary-line" size="small">공통/리더십</UiButton>
          <UiButton variant="secondary" size="small">추가</UiButton>
        </div>
      </template>

      <template #colgroup>
        <col style="width: 40px" />
        <col style="width: 100px" />
        <col style="width: 40px" />
        <col style="width: 200px" />
        <col style="width: 40px" />
        <col style="width: 40px" />
        <col style="width: 40px" />
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
        <th>역량정의/역량항목</th>
        <th>구분</th>
        <th>행동기준/행동수준/역량정의</th>
        <th>수준/점수</th>
        <th>가중</th>
        <th>관리</th>
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
          :class="{ 'rowspan-group': row.isRowspanGroup }"
        >
          <!-- 체크박스 - 타입에 따라 rowspan 적용 -->
          <td
            v-if="row.showCheckbox !== false"
            :rowspan="row.rowspanCount || 1"
            class="txt-c vertical-top checkbox-cell"
            :style="{ paddingBottom: row.rowspanCount ? '10px' : 'auto' }"
          >
            <UiCheckbox
              size="large"
              @click.stop
              :modelValue="isRowSelected(row)"
              @update:modelValue="() => toggleRowSelection(row)"
            />
          </td>

          <!-- 역량정의/역량항목 - 타입에 따라 다르게 표시 -->
          <td
            v-if="row.showDefinition !== false"
            :rowspan="row.rowspanCount || 1"
            class="pd-trl10 br vertical-top definition-cell"
            :style="{ paddingBottom: row.rowspanCount ? '10px' : 'auto' }"
          >
            <div v-if="row.isRowspanGroup" class="definition-content">
              <strong>[{{ row.competencyName }}]</strong><br />
              {{ row.definition }}
            </div>
            <div v-else class="category-content">
              <span class="category-badge" :class="getCategoryClass(row.category)">
                {{ row.category }}
              </span>
            </div>
          </td>

          <!-- 구분 - 타입에 따라 rowspan 적용 -->
          <td
            v-if="row.showType !== false"
            :rowspan="row.rowspanCount || 1"
            class="txt-c pd-trl10 br vertical-top type-cell"
            :style="{ paddingBottom: row.rowspanCount ? '10px' : 'auto' }"
          >
            {{ row.type }}
          </td>

          <!-- 행동기준 - 항상 표시 -->
          <td class="pd-trl10 br vertical-top behavior-cell" style="padding-bottom: 10px">
            <div v-if="row.isRowspanGroup" class="behavior-rowspan">
              {{ row.behavior }}
            </div>
            <div v-else class="behavior-normal">
              {{ row.behavior }}
            </div>
          </td>

          <!-- 수준/점수 -->
          <td class="txt-c pd-trl10 br level-cell" style="padding-bottom: 10px">
            {{ row.level }}
          </td>

          <!-- 가중 -->
          <td class="txt-c pd-trl10 br weight-cell" style="padding-bottom: 10px">
            {{ row.weight }}
          </td>

          <!-- 관리 버튼 - 타입에 따라 rowspan 적용 -->
          <td
            v-if="row.showActions !== false"
            :rowspan="row.rowspanCount || 1"
            class="txt-c pd-trl10 br vertical-top action-cell"
            :style="{ paddingBottom: row.rowspanCount ? '10px' : 'auto' }"
          >
            <div class="flex flex-col gap-2">
              <UiButton variant="secondary-line" size="small" @click="handleDetail(row)">
                {{ row.isRowspanGroup ? '상세보기' : '수정' }}
              </UiButton>
              <UiButton variant="danger-line" size="small" @click="handleDelete(row)">
                삭제
              </UiButton>
            </div>
          </td>
        </tr>
      </template>
    </UiTable>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  // 혼합 타입 데이터 (rowspan 그룹 + 일반 행)
  const mixedCompetencyData = ref([
    // 첫 번째 그룹: Rowspan 타입 (전문가의식)
    {
      id: 1,
      isRowspanGroup: true,
      competencyName: '전문가의식',
      definition:
        '회사의 목표에 따라 부하의 능력을 최대한으로 발휘 시키려고 노력하며, 평소에 부하의 능력, 적성을 정확히 파악하여 그에 따라 일을 맡기고 지속적으로 육성하는가.',
      type: 'BARS',
      behavior:
        '업무 수행에 있어 높은 수준의 원칙과 완성도를 보이며, 체계적이고 독자적인 자기개발에 매진함은 물론, 동료들 또한 적극적으로 업무에 임하도록 기준을 만들고 격려, 유도한다.',
      level: '5/100',
      weight: '-',
      showCheckbox: true,
      showDefinition: true,
      showType: true,
      showActions: true,
      rowspanCount: 3,
      groupId: 'group1'
    },
    {
      id: 2,
      isRowspanGroup: true,
      competencyName: '',
      definition: '',
      type: '',
      behavior:
        '업무 수행 시 원칙과 기준을 세우고 이에 따라 완성도 높은 결과를 도출하며, 자기개발을 위해 노력하고 동료들과의 협력을 이끌어낸다.',
      level: '4/80',
      weight: '-',
      showCheckbox: false,
      showDefinition: false,
      showType: false,
      showActions: false,
      rowspanCount: 0,
      groupId: 'group1'
    },
    {
      id: 3,
      isRowspanGroup: true,
      competencyName: '',
      definition: '',
      type: '',
      behavior:
        '업무 수행 시 일정한 원칙과 기준을 가지고 있으며, 지속적인 자기개발을 위해 노력하고 동료들과 원활한 관계를 유지한다.',
      level: '3/60',
      weight: '-',
      showCheckbox: false,
      showDefinition: false,
      showType: false,
      showActions: false,
      rowspanCount: 0,
      groupId: 'group1'
    },

    // 일반 타입들
    {
      id: 4,
      isRowspanGroup: false,
      category: '핵심역량',
      type: '리더십',
      behavior: '팀을 이끌고 목표를 달성하는 능력',
      level: '5',
      weight: '30'
    },
    {
      id: 5,
      isRowspanGroup: false,
      category: '직무역량',
      type: '문제해결',
      behavior: '복잡한 문제를 분석하고 해결하는 능력',
      level: '4',
      weight: '25'
    },
    {
      id: 6,
      isRowspanGroup: false,
      category: '핵심역량',
      type: '소통능력',
      behavior: '효과적인 의사소통과 협업 능력',
      level: '4',
      weight: '20'
    },

    // 두 번째 그룹: Rowspan 타입 (협업능력)
    {
      id: 7,
      isRowspanGroup: true,
      competencyName: '협업능력',
      definition: '다양한 배경을 가진 구성원들과 효과적으로 협력하여 공동의 목표를 달성하는 능력',
      type: 'BEI',
      behavior:
        '팀원들과의 협력을 통해 시너지를 창출하고, 갈등 상황에서도 건설적인 해결책을 모색한다.',
      level: '5/100',
      weight: '25',
      showCheckbox: true,
      showDefinition: true,
      showType: true,
      showActions: true,
      rowspanCount: 2,
      groupId: 'group2'
    },
    {
      id: 8,
      isRowspanGroup: true,
      competencyName: '',
      definition: '',
      type: '',
      behavior: '팀원들과 협력하여 업무를 수행하며, 의견 차이가 있을 때 적절한 조율을 시도한다.',
      level: '3/60',
      weight: '15',
      showCheckbox: false,
      showDefinition: false,
      showType: false,
      showActions: false,
      rowspanCount: 0,
      groupId: 'group2'
    },

    // 추가 일반 타입들
    {
      id: 9,
      isRowspanGroup: false,
      category: '직무역량',
      type: '전문성',
      behavior: '업무 분야의 전문 지식과 기술을 보유하고 활용',
      level: '4',
      weight: '22'
    },
    {
      id: 10,
      isRowspanGroup: false,
      category: '핵심역량',
      type: '적응력',
      behavior: '변화하는 환경에 빠르게 적응하는 능력',
      level: '3',
      weight: '18'
    }
  ])

  // 카테고리별 CSS 클래스 반환
  const getCategoryClass = category => {
    switch (category) {
      case '핵심역량':
        return 'category-core'
      case '직무역량':
        return 'category-job'
      default:
        return 'category-default'
    }
  }

  const handleDetail = row => {
    if (row.isRowspanGroup) {
      console.log('상세보기:', row)
    } else {
      console.log('수정:', row)
    }
  }

  const handleDelete = row => {
    console.log('삭제:', row)
  }
</script>

<style scoped></style>
