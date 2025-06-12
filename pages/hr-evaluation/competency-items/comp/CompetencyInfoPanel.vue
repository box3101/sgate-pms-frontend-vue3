<template>
  <div>
    <UiTable
      v-model="processedCompetencyData"
      title="역량항목 구분 (개선된 멀티행 정렬)"
      bordered
      scrollable
      :sortable="customSortable"
      editable
      max-height="calc(100vh - 200px)"
      :canAddRow="false"
      :canSave="false"
      :isDragging="true"
      @sort="handleCustomSort"
      @row-deleted="handleRowDeleted"
      @update:modelValue="updateTableData"
    >
      <template #header-action-right>
        <div class="flex items-center gap-2">
          <UiButton variant="secondary-line">NCS</UiButton>
          <UiButton variant="secondary-line">공통/리더십</UiButton>
          <UiButton variant="secondary">추가</UiButton>
        </div>
      </template>

      <template #colgroup>
        <col style="width: 40px" />
        <col style="width: 200px" />
        <col style="width: 100px" />
        <col style="width: auto" />
        <col style="width: 100px" />
        <col style="width: 100px" />
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
        <th>수정</th>
      </template>

      <template
        #body="{
          rows,
          toggleRowSelection,
          isRowSelected,

          handleDragStart: originalDragStart,
          handleDragOver: originalDragOver,
          handleDrop: originalDrop,
          handleDragEnd: originalDragEnd
        }"
      >
        <tr
          v-for="(row, index) in rows"
          :key="`${row.groupId || 'single'}-${row.id}-${row.subIndex || 0}`"
          :class="getRowClasses(row)"
          :draggable="isDraggable(row)"
          @dragstart="event => handleEnhancedDragStart(event, index, row)"
          @dragover="event => handleDragOver(event)"
          @drop="event => handleEnhancedDrop(event, index)"
          @dragend="handleDragEnd"
        >
          <!-- 체크박스 -->
          <td
            v-if="shouldShowCell(row, 'checkbox')"
            :rowspan="getRowspan(row, 'checkbox')"
            class="txt-c vertical-top checkbox-cell"
          >
            <UiCheckbox
              size="large"
              @click.stop
              :modelValue="isRowSelected(row)"
              @update:modelValue="() => toggleRowSelection(row)"
            />
          </td>

          <!-- 역량정의/역량항목 -->
          <td
            v-if="shouldShowCell(row, 'definition')"
            :rowspan="getRowspan(row, 'definition')"
            class="vertical-middle"
          >
            <div v-if="row.isRowspanGroup && row.isGroupHeader" class="definition-content">
              <strong>[{{ row.competencyName }}]</strong><br />
              {{ row.definition }}
            </div>
            <div v-else-if="!row.isRowspanGroup" class="category-content">
              <span class="category-badge" :class="getCategoryClass(row.category)">
                {{ row.category }}
              </span>
            </div>
          </td>

          <!-- 구분 -->
          <td
            v-if="shouldShowCell(row, 'type')"
            :rowspan="getRowspan(row, 'type')"
            class="text-center"
          >
            {{ row.type }}
          </td>

          <!-- 행동기준 -->
          <td class="pd-trl10 br vertical-top behavior-cell">
            <div :class="row.isRowspanGroup ? 'behavior-rowspan' : 'behavior-normal'">
              {{ row.behavior }}
            </div>
          </td>

          <!-- 수준/점수 -->
          <td class="text-center">
            {{ row.level }}
          </td>

          <!-- 가중 -->
          <td class="text-center">
            {{ row.weight }}
          </td>

          <!-- 수정 버튼 -->
          <td v-if="shouldShowCell(row, 'actions')" :rowspan="getRowspan(row, 'actions')">
            <UiButton variant="ghost" size="small" @click="handleDetail(row)">
              <i class="icon icon-md icon-edit"></i>
            </UiButton>
          </td>
        </tr>
      </template>
    </UiTable>
  </div>
</template>

<script setup>
  import { ref, computed, watch } from 'vue'

  // 원본 데이터 구조 개선
  const rawCompetencyData = ref([
    // 그룹 데이터를 단일 객체로 관리
    {
      id: 'group_1',
      type: 'group',
      isRowspanGroup: true,
      competencyName: '전문가의식',
      definition:
        '회사의 목표에 따라 부하의 능력을 최대한으로 발휘 시키려고 노력하며, 평소에 부하의 능력, 적성을 정확히 파악하여 그에 따라 일을 맡기고 지속적으로 육성하는가.',
      category: 'BARS',
      behaviors: [
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

    // 단일 행 데이터
    {
      id: 'single_1',
      type: 'single',
      isRowspanGroup: false,
      category: '핵심역량',
      categoryType: '리더십',
      behavior: '팀을 이끌고 목표를 달성하는 능력',
      level: '5',
      weight: '30',
      sortOrder: 2
    },
    {
      id: 'single_2',
      type: 'single',
      isRowspanGroup: false,
      category: '직무역량',
      categoryType: '문제해결',
      behavior: '복잡한 문제를 분석하고 해결하는 능력',
      level: '4',
      weight: '25',
      sortOrder: 3
    },

    // 두 번째 그룹
    {
      id: 'group_2',
      type: 'group',
      isRowspanGroup: true,
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
      isRowspanGroup: false,
      category: '직무역량',
      categoryType: '전문성',
      behavior: '업무 분야의 전문 지식과 기술을 보유하고 활용',
      level: '4',
      weight: '22',
      sortOrder: 5
    }
  ])

  // 렌더링용 데이터 변환
  const processedCompetencyData = computed(() => {
    const result = []

    // sortOrder에 따라 정렬
    const sortedData = [...rawCompetencyData.value].sort((a, b) => a.sortOrder - b.sortOrder)

    sortedData.forEach(item => {
      if (item.type === 'group') {
        // 그룹 데이터를 개별 행으로 변환
        item.behaviors.forEach((behavior, index) => {
          result.push({
            id: `${item.id}_${index}`,
            groupId: item.id,
            subIndex: index,
            isRowspanGroup: true,
            isGroupHeader: index === 0,
            competencyName: item.competencyName,
            definition: item.definition,
            type: item.category,
            behavior: behavior.behavior,
            level: behavior.level,
            weight: behavior.weight,
            rowspanCount: index === 0 ? item.behaviors.length : 0,
            totalGroupSize: item.behaviors.length,
            sortOrder: item.sortOrder
          })
        })
      } else {
        // 단일 행 데이터
        result.push({
          id: item.id,
          isRowspanGroup: false,
          category: item.category,
          type: item.categoryType,
          behavior: item.behavior,
          level: item.level,
          weight: item.weight,
          sortOrder: item.sortOrder
        })
      }
    })

    return result
  })

  // 정렬 가능 여부 제어
  const customSortable = computed(() => {
    // 그룹이 있는 경우 일반 정렬 비활성화
    return !rawCompetencyData.value.some(item => item.type === 'group')
  })

  // 셀 표시 여부 판단
  const shouldShowCell = (row, cellType) => {
    if (!row.isRowspanGroup) return true

    switch (cellType) {
      case 'checkbox':
      case 'definition':
      case 'type':
      case 'actions':
        return row.isGroupHeader
      default:
        return true
    }
  }

  // rowspan 값 계산
  const getRowspan = (row, cellType) => {
    if (!row.isRowspanGroup || !row.isGroupHeader) return 1

    switch (cellType) {
      case 'checkbox':
      case 'definition':
      case 'type':
      case 'actions':
        return row.totalGroupSize
      default:
        return 1
    }
  }

  // 행 CSS 클래스
  const getRowClasses = row => {
    const classes = []
    if (row.isRowspanGroup) {
      classes.push('rowspan-group')
      if (row.isGroupHeader) {
        classes.push('group-header')
      }
    }
    return classes.join(' ')
  }

  // 드래그 가능 여부
  const isDraggable = row => {
    if (!row.isRowspanGroup) return true
    return row.isGroupHeader // 그룹의 헤더만 드래그 가능
  }

  // 커스텀 정렬 핸들러
  const handleCustomSort = sortConfig => {
    // 그룹이 있는 경우 정렬 차단
    if (rawCompetencyData.value.some(item => item.type === 'group')) {
      console.warn(
        '그룹 행이 있는 경우 일반 정렬을 사용할 수 없습니다. 드래그 앤 드롭을 사용하세요.'
      )
      return false
    }

    // 단일 행만 있는 경우 정렬 허용
    const { field, direction } = sortConfig

    rawCompetencyData.value.sort((a, b) => {
      let aValue = a[field] || ''
      let bValue = b[field] || ''

      // 숫자 비교
      if (!isNaN(aValue) && !isNaN(bValue)) {
        aValue = Number(aValue)
        bValue = Number(bValue)
      }

      if (direction === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    // sortOrder 재계산
    rawCompetencyData.value.forEach((item, index) => {
      item.sortOrder = index + 1
    })
  }

  // 개선된 드래그 앤 드롭
  const handleEnhancedDragStart = (event, index, row) => {
    if (row.isRowspanGroup && !row.isGroupHeader) {
      event.preventDefault()
      return false
    }

    event.dataTransfer.setData('sourceIndex', index.toString())
    event.dataTransfer.setData('sourceId', row.groupId || row.id)
    event.dataTransfer.setData('sourceType', row.isRowspanGroup ? 'group' : 'single')
  }

  const handleDragOver = event => {
    event.preventDefault()
  }

  const handleEnhancedDrop = (event, targetIndex) => {
    event.preventDefault()

    const sourceIndex = parseInt(event.dataTransfer.getData('sourceIndex'))
    const sourceId = event.dataTransfer.getData('sourceId')
    const sourceType = event.dataTransfer.getData('sourceType')

    if (isNaN(sourceIndex) || sourceIndex === targetIndex) return

    // 원본 데이터에서 이동 처리
    const sourceItem = rawCompetencyData.value.find(item =>
      sourceType === 'group' ? item.id === sourceId : item.id === sourceId
    )

    if (!sourceItem) return

    // 타겟 위치의 실제 데이터 항목 찾기
    const processedRows = processedCompetencyData.value
    const targetRow = processedRows[targetIndex]

    let targetSortOrder
    if (targetRow.isRowspanGroup) {
      const targetGroup = rawCompetencyData.value.find(item => item.id === targetRow.groupId)
      targetSortOrder = targetGroup?.sortOrder || 1
    } else {
      const targetSingle = rawCompetencyData.value.find(item => item.id === targetRow.id)
      targetSortOrder = targetSingle?.sortOrder || 1
    }

    // sortOrder 업데이트
    if (sourceItem.sortOrder < targetSortOrder) {
      // 아래로 이동
      rawCompetencyData.value.forEach(item => {
        if (item.sortOrder > sourceItem.sortOrder && item.sortOrder <= targetSortOrder) {
          item.sortOrder--
        }
      })
      sourceItem.sortOrder = targetSortOrder
    } else {
      // 위로 이동
      rawCompetencyData.value.forEach(item => {
        if (item.sortOrder >= targetSortOrder && item.sortOrder < sourceItem.sortOrder) {
          item.sortOrder++
        }
      })
      sourceItem.sortOrder = targetSortOrder
    }
  }

  const handleDragEnd = () => {
    // 드래그 종료 후 정리 작업
  }

  // 기타 헬퍼 함수들
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
    console.log('상세보기/수정:', row)
  }

  const handleTableUpdate = updatedData => {
    // processedCompetencyData는 computed라서 직접 수정 불가
    // rawCompetencyData를 업데이트해야 함
    console.log('테이블 업데이트:', updatedData)
  }

  const handleRowDeleted = deletedRows => {
    console.log('삭제된 행들:', deletedRows)

    deletedRows.forEach(row => {
      if (row.isRowspanGroup) {
        // 그룹 행 삭제 처리
        const groupIndex = rawCompetencyData.value.findIndex(item => item.id === row.groupId)
        if (groupIndex !== -1) {
          if (row.isGroupHeader) {
            // 헤더 삭제 = 전체 그룹 삭제
            rawCompetencyData.value.splice(groupIndex, 1)
          } else {
            // 개별 behavior 삭제
            const group = rawCompetencyData.value[groupIndex]
            group.behaviors.splice(row.subIndex, 1)
            if (group.behaviors.length === 0) {
              rawCompetencyData.value.splice(groupIndex, 1)
            }
          }
        }
      } else {
        // 단일 행 삭제
        const index = rawCompetencyData.value.findIndex(item => item.id === row.id)
        if (index !== -1) {
          rawCompetencyData.value.splice(index, 1)
        }
      }
    })
  }

  // 데이터 변경 감지 및 디버깅
  watch(
    rawCompetencyData,
    newData => {
      console.log(
        '데이터 변경됨:',
        newData.map(item => ({ id: item.id, sortOrder: item.sortOrder }))
      )
    },
    { deep: true }
  )
</script>

<style scoped>
  .rowspan-group.group-header {
    border-top: 2px solid #e2e8f0;
  }

  .category-badge {
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
  }

  .category-core {
    background-color: #e3f2fd;
    color: #1976d2;
  }

  .category-job {
    background-color: #f3e5f5;
    color: #7b1fa2;
  }

  .category-default {
    background-color: #f5f5f5;
    color: #666;
  }

  .definition-content {
    padding: 8px 0;
  }

  .behavior-rowspan,
  .behavior-normal {
    padding: 4px 0;
    line-height: 1.4;
  }
</style>
