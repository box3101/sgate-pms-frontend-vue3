<template>
  <div class="table-container">
    <table class="table">
      <colgroup>
        <col v-if="showCheckbox" width="30px" /> <!-- 체크박스 열 (조건부) -->
        <col v-for="(col, index) in columnWidths" :key="index" :width="col" />
      </colgroup>
      <thead>
        <tr>
          <th v-if="showCheckbox" class="text-center checkbox-cell">
            <UiCheckbox @change="toggleAllRows" :checked="allRowsSelected" />
          </th>
          <th
            v-for="(header, index) in headers"
            :key="index"
            class="text-center"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, rowIndex) in items" :key="rowIndex">
          <td v-if="showCheckbox" class="text-center checkbox-cell">
            <UiCheckbox 
              v-model="selectedRows[rowIndex]" 
              @change="updateSelection" 
            />
          </td>
          <td 
            v-for="(header, colIndex) in headers" 
            :key="colIndex"
            class="table-cell"
            :class="{ 'text-center': textCenter || (columnAlign[colIndex] === 'center'), 
                     'text-right': columnAlign[colIndex] === 'right',
                     'text-left': columnAlign[colIndex] === 'left' }"
          >
            {{ getColumnValue(item, header, colIndex) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import UiCheckbox from './UiCheckbox.vue'; // 체크박스 컴포넌트 import

const props = defineProps({
  /**
   * 테이블 헤더 텍스트 배열
   */
  headers: {
    type: Array,
    default: () => ["KPI", "OKR", "금주실적", "차주계획"],
  },
  /**
   * 테이블 컬럼 너비 배열
   */
  columnWidths: {
    type: Array,
    default: () => ["20%", "20%", "30%", "30%"],
  },
  /**
   * 테이블 데이터 항목 배열
   */
  items: {
    type: Array,
    default: () => [],
  },
  /**
   * 체크박스 표시 여부
   */
  showCheckbox: {
    type: Boolean,
    default: false,
  },
  /**
   * 모든 셀 가운데 정렬 여부
   */
  textCenter: {
    type: Boolean,
    default: false,
  },
  /**
   * 열별 정렬 설정 (left, center, right)
   * 예: ['left', 'center', 'right', 'left']
   */
  columnAlign: {
    type: Array,
    default: () => [],
  }
});

// 선택된 행 상태 관리
const selectedRows = ref({});

// 모든 행이 선택되었는지 계산
const allRowsSelected = computed(() => {
  if (!props.items || props.items.length === 0) return false;
  return props.items.every((_, index) => selectedRows.value[index]);
});

// 모든 행 선택/해제 토글
function toggleAllRows(checked) {
  const newSelection = {};
  props.items.forEach((_, index) => {
    newSelection[index] = checked;
  });
  selectedRows.value = newSelection;
  emitSelectionChange();
}

// 선택 상태 업데이트
function updateSelection() {
  emitSelectionChange();
}

// 선택된 행 이벤트 발생
function emitSelectionChange() {
  const selected = props.items.filter((_, index) => selectedRows.value[index]);
  emit('selection-change', selected);
}

// 선택된 행 초기화
function resetSelection() {
  selectedRows.value = {};
}

// 이벤트 정의
const emit = defineEmits(['selection-change']);

// 컬럼 값 가져오는 함수
function getColumnValue(item, header, colIndex) {
  // 배열 형태의 아이템인 경우
  if (Array.isArray(item)) {
    return item[colIndex] ?? '';
  }
  
  // 객체 형태의 아이템인 경우
  // 1. 헤더와 정확히 일치하는 키
  if (item[header] !== undefined) {
    return item[header];
  }
  
  // 2. 헤더 소문자 변환 키
  const lowerKey = header.toLowerCase();
  if (item[lowerKey] !== undefined) {
    return item[lowerKey];
  }
  
  // 3. 스네이크 케이스 변환 키
  const snakeKey = header.toLowerCase().replace(/\s+/g, '_');
  if (item[snakeKey] !== undefined) {
    return item[snakeKey];
  }
  
  // 4. 레거시 매핑
  const legacyMapping = {
    'KPI': 'kpi',
    'OKR': 'okr',
    '금주실적': 'achievement',
    '차주계획': 'plan',
  };
  
  if (legacyMapping[header] && item[legacyMapping[header]] !== undefined) {
    return item[legacyMapping[header]];
  }
  
  // 일치하는 항목이 없을 경우
  return '';
}

// 메서드 노출
defineExpose({
  resetSelection,
  getSelectedRows: () => props.items.filter((_, index) => selectedRows.value[index])
});
</script>

<style lang="scss" scoped>
@use "sass:color";

.table-container {
  width: 100%;
  overflow-x: auto;
  margin-bottom: 20px;

  .table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 12px;
      border: 1px solid #e0e0e0;
    }

    th {
      background-color: #f5f5f5;
      font-weight: 600;
      color: #333;
    }

    .text-center {
      text-align: center;
    }
    
    .text-left {
      text-align: left;
    }
    
    .text-right {
      text-align: right;
    }

    .checkbox-cell {
      vertical-align: middle;
      width: 40px;
      padding: 8px;
    }

    .table-cell {
      font-size: 14px;
      line-height: 1.5;

      p {
        margin: 0 0 8px 0;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
:deep(.ui-checkbox__input) {
  margin-right:0px!important; 
}
</style>