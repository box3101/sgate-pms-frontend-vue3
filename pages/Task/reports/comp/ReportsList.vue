<template>
  <UiTable
    v-model="props.reportList"
    title="보고서 리스트"
    hover
    striped
    scrollable
    :cursor-pointer="true"
  >
    <!-- 테이블 컬럼 너비 설정 -->
    <template #colgroup>
      <col v-for="column in columns" :key="column.key" :width="column.width" />
      <col width="60px" />
    </template>

    <!-- 테이블 헤더 -->
    <template #header>
      <tr>
        <th
          v-for="column in columns"
          :key="column.key"
          :class="column.align ? `text-${column.align}` : ''"
        >
          {{ column.title }}
        </th>
        <th class="text-center">수정</th>
      </tr>
    </template>

    <!-- 테이블 바디 -->
    <template #body="{ rows }">
      <tr
        v-for="(row, index) in rows"
        :key="index"
        @click.stop="handleRowClick(row, index, $event)"
        :class="selectedIndex === index ? 'selected-row' : ''"
      >
        <td
          v-for="(column, colIndex) in columns"
          :key="colIndex"
          :class="column.align ? `text-${column.align}` : ''"
        >
          {{ row[column.key] }}
        </td>
        <td class="text-center">
          <UiButton icon-only variant="ghost" size="small" @click.stop="handleOpenUpdateModal">
            <i class="icon-md icon-edit"></i>
          </UiButton>
        </td>
      </tr>
    </template>
  </UiTable>
</template>

<script setup>
  // Props
  const props = defineProps({
    reportList: {
      type: Array,
      required: true
    },
    selectedIndex: {
      type: Number,
      default: 0
    }
  })

  // Emits
  const emit = defineEmits(['update:selectedIndex', 'row-click', 'open-update-modal'])

  // 테이블 컬럼 정의
  const columns = ref([
    { key: 'date', title: '날짜', width: '140px', align: 'center' },
    { key: 'type', title: '보고서 유형', width: '80px', align: 'center' },
    { key: 'status', title: '상태', width: '80px', align: 'center' },
    { key: 'feedbackCount', title: '피드백', width: '80px', align: 'center' }
  ])

  // 이벤트 핸들러
  const handleRowClick = (row, index, event) => {
    emit('update:selectedIndex', index)
    emit('row-click', row, index, event)
  }

  const handleOpenUpdateModal = () => {
    emit('open-update-modal')
  }
</script>
