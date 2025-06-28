<template>
  <CompetencyGroupTable
    v-model="competencyData"
    title="역량항목 구분"
    :scrollable="true"
    :bordered="true"
    :striped="true"
    :hover="true"
    :editable="true"
    :canAddRow="false"
    :canSave="false"
    @group-added="handleGroupAdded"
    @items-deleted="handleItemsDeleted"
    @item-edited="handleItemEdited"
    @order-changed="handleOrderChanged"
    @save="handleSave"
  >
    <template #header-action-right>
      <div class="flex items-center gap-2">
        <UiButton variant="secondary-line" @click="handleNCS">NCS</UiButton>
        <UiButton variant="secondary-line" @click="handleCommonLeadership">공통/리더십</UiButton>
        <UiButton variant="secondary" @click="handleAddCustom">추가</UiButton>
      </div>
    </template>
  </CompetencyGroupTable>
</template>

<script setup>
  import { ref } from 'vue'
  import CompetencyGroupTable from '@/components/common/UI/CompetencyGroupTable.vue'

  // ✅ CompetencyGroupTable이 예상하는 올바른 데이터 구조
  const competencyData = ref([
    // 🎯 그룹 타입 - type: 'group'과 behaviors 배열 사용
    {
      id: 'group_1', // 고유 ID 필수
      type: 'group', // 'group' 타입 명시
      competencyName: '전문가의식',
      definition:
        '회사의 목표에 따라 부하의 능력을 최대한으로 발휘 시키려고 노력하며, 평소에 부하의 능력, 적성을 정확히 파악하여 그에 따라 일을 맡기고 지속적으로 육성하는가.',
      category: 'BARS', // categoryType이 아닌 category
      behaviors: [
        // items가 아닌 behaviors 배열
        {
          behavior:
            '업무 수행에 있어 높은 수준의 원칙과 완성도를 보이며, 체계적이고 독자적인 자기개발에 매진함은 물론, 동료들 또한 적극적으로 업무에 임하도록 기준을 만들고 격려, 유도한다.',
          level: '5/100',
          weight: '-'
        },
        {
          behavior:
            '업무 수행 시 원칙과 기준을 세우고 이에 따라 완성도 높은 결과를 도출하며, 자기개발을 위해 노력하고 동료들과의 협력을 이끌어낸다.',
          level: '4/80',
          weight: '-'
        },
        {
          behavior:
            '업무 수행 시 일정한 원칙과 기준을 가지고 있으며, 지속적인 자기개발을 위해 노력하고 동료들과 원활한 관계를 유지한다.',
          level: '3/60',
          weight: '-'
        }
      ],
      sortOrder: 1
    },

    // 🎯 단일 항목 타입 - type: 'single'
    {
      id: 'single_1',
      type: 'single', // 단일 항목은 'single' 타입
      category: '핵심역량',
      categoryType: '리더십',
      behavior:
        '팀을 이끌고 목표를 달성하는 능력을 보유하고 있으며, 구성원들을 동기부여하여 조직의 성과를 극대화한다.',
      level: '5',
      weight: '30',
      sortOrder: 2
    },

    {
      id: 'single_2',
      type: 'single',
      category: '직무역량',
      categoryType: '문제해결',
      behavior:
        '복잡한 문제를 체계적으로 분석하고 창의적인 해결책을 도출하여 실행하는 능력을 가지고 있다.',
      level: '4',
      weight: '25',
      sortOrder: 3
    },

    // 🎯 두 번째 그룹
    {
      id: 'group_2',
      type: 'group',
      competencyName: '협업능력',
      definition: '다양한 배경을 가진 구성원들과 효과적으로 협력하여 공동의 목표를 달성하는 능력',
      category: 'BEI',
      behaviors: [
        {
          behavior:
            '팀원들과의 협력을 통해 시너지를 창출하고, 갈등 상황에서도 건설적인 해결책을 모색한다.',
          level: '5/100',
          weight: '25'
        },
        {
          behavior:
            '팀원들과 협력하여 업무를 수행하며, 의견 차이가 있을 때 적절한 조율을 시도한다.',
          level: '3/60',
          weight: '15'
        }
      ],
      sortOrder: 4
    },

    {
      id: 'single_3',
      type: 'single',
      category: '직무역량',
      categoryType: '전문성',
      behavior:
        '업무 분야의 전문 지식과 기술을 보유하고 있으며, 지속적인 학습을 통해 역량을 개발한다.',
      level: '4',
      weight: '22',
      sortOrder: 5
    }
  ])

  // 🎯 이벤트 핸들러들
  const handleGroupAdded = newGroup => {
    console.log('✅ 새 그룹 추가됨:', newGroup)
    // 실제 API 호출
    // await addCompetencyGroup(newGroup)
  }

  const handleItemsDeleted = deletedItems => {
    console.log('🗑️ 항목들 삭제됨:', deletedItems)
    // 삭제된 항목들의 정보를 처리
    deletedItems.forEach(item => {
      if (item.type === 'group') {
        console.log(`📦 그룹 삭제: ${item.data.competencyName}`)
      } else if (item.type === 'single') {
        console.log(`📄 단일 항목 삭제: ${item.data.behavior}`)
      }
    })
    // 실제 API 호출
    // await deleteCompetencyItems(deletedItems)
  }

  const handleItemEdited = item => {
    console.log('✏️ 항목 편집:', item)
    // 편집 모달 열기 또는 인라인 편집 처리
    // showEditModal.value = true
    // editingItem.value = item
  }

  const handleOrderChanged = orderInfo => {
    console.log('🔄 순서 변경됨:', orderInfo)
    console.log(`  ${orderInfo.from} → ${orderInfo.to}`)
    // 실제 API 호출
    // await updateCompetencyOrder(orderInfo)
  }

  const handleSave = allData => {
    console.log('💾 전체 저장:', allData)
    // 모든 변경사항을 서버에 저장
    // await saveAllCompetencyData(allData)
  }

  // 헤더 버튼 핸들러들
  const handleNCS = () => {
    console.log('🏛️ NCS 데이터 불러오기')
    // NCS 표준 역량 데이터를 불러와서 추가
    // const ncsData = await fetchNCSCompetencies()
    // competencyData.value.push(...ncsData)
  }

  const handleCommonLeadership = () => {
    console.log('👥 공통/리더십 역량 불러오기')
    // 공통 및 리더십 역량 템플릿 추가
    // const commonData = await fetchCommonLeadershipCompetencies()
    // competencyData.value.push(...commonData)
  }

  const handleAddCustom = () => {
    console.log('➕ 사용자 정의 역량 추가')
    // 사용자 정의 역량 추가 모달 열기
    // showCustomAddModal.value = true
  }
</script>
