<template>
  <div class="row-table-container">
    <table class="row-table">
      <colgroup>
        <col :width="leftColumnWidth" />
        <col :width="rightColumnWidth" />
      </colgroup>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <th 
            scope="row" 
            class="left-cell" 
            :class="{ 
              'first-row': index === 0, 
              'last-row': index === items.length - 1,
              'txt-c': centerLeftText,
              'br': showBorderRight
            }"
            :style="leftCellStyle"
          >
            {{ item.title }}
          </th>
          <td 
            class="right-cell" 
            :class="{ 
              'first-row': index === 0, 
              'last-row': index === items.length - 1,
              'pd10': padding
            }"
            :style="rightCellStyle"
          >
            <div v-if="item.content" class="content-wrapper" :style="contentWrapperStyle">
              {{ item.content }}
            </div>
            <slot v-else :name="`content-${index}`"></slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  /**
   * 테이블 아이템 배열 (title, content 속성 포함)
   */
  items: {
    type: Array,
    default: () => [],
  },
  /**
   * 왼쪽 컬럼 너비
   */
  leftColumnWidth: {
    type: String,
    default: "10%",
  },
  /**
   * 오른쪽 컬럼 너비
   */
  rightColumnWidth: {
    type: String,
    default: "90%",
  },
  /**
   * 셀 패딩 적용 여부
   */
  padding: {
    type: Boolean,
    default: true,
  },
  /**
   * 왼쪽 셀 텍스트 중앙 정렬 여부
   */
  centerLeftText: {
    type: Boolean,
    default: true,
  },
  /**
   * 오른쪽 테두리 표시 여부
   */
  showBorderRight: {
    type: Boolean,
    default: true,
  },
  /**
   * 최소 높이 설정
   */
  minHeight: {
    type: String,
    default: "100px",
  },
});

const leftCellStyle = computed(() => ({
  minHeight: props.minHeight,
}));

const rightCellStyle = computed(() => ({
  minHeight: props.minHeight,
}));

const contentWrapperStyle = computed(() => ({
  minHeight: props.minHeight,
}));
</script>

<style lang="scss" scoped>
@use "sass:color";

.row-table-container {
  width: 100%;
  margin-bottom: 20px;
  
  .row-table {
    width: 100%;
    border-collapse: collapse;
    
    th, td {
      padding: 0;
      border: 1px solid #e0e0e0;
      vertical-align: middle;
    }
    
    .left-cell {
      font-weight: 600;
      background-color: #f5f5f5;
      
      &.txt-c {
        text-align: center;
      }
      
      &.br {
        border-right: 1px solid #e0e0e0;
      }
      
      &.first-row {
        border-top-left-radius: 4px;
      }
      
      &.last-row {
        border-bottom-left-radius: 4px;
      }
    }
    
    .right-cell {
      &.pd10 {
        padding: 10px;
      }
      
      .content-wrapper {
        width: 100%;
      }
    }
  }
}
</style>