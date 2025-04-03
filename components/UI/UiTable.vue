<template>
  <div class="table-container">
    <table class="table">
      <colgroup>
        <col v-for="(col, index) in columnWidths" :key="index" :width="col" />
      </colgroup>
      <thead>
        <tr>
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
        <tr v-for="(item, index) in items" :key="index">
          <td class="kpi-cell">
            {{ item.kpi }}
          </td>
          <td class="okr-cell">
            {{ item.okr }}
          </td>
          <td class="achievement-cell">
            {{ item.achievement }}
          </td>
          <td class="plan-cell">
            {{ item.plan }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

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
      vertical-align: top;
    }

    th {
      background-color: #f5f5f5;
      font-weight: 600;
      color: #333;
    }

    .text-center {
      text-align: center;
    }

    .kpi-cell,
    .okr-cell {
      position: relative;

      .progress-container {
        height: 6px;
        background-color: #f0f0f0;
        border-radius: 3px;
        margin-bottom: 10px;
        position: relative;

        .progress-bar {
          height: 100%;
          background-color: #4caf50;
          border-radius: 3px;
        }

        .progress-text {
          position: absolute;
          right: 0;
          top: -18px;
          font-size: 12px;
          color: #666;
        }
      }

      .kpi-title,
      .okr-title {
        font-weight: 600;
        margin-bottom: 5px;
        font-size: 14px;
      }

      .kpi-description,
      .okr-description {
        font-size: 13px;
        color: #666;
      }
    }

    .okr-cell {
      &.okr-type-1 {
        border-left: 3px solid #4caf50;
      }

      &.okr-type-2 {
        border-left: 3px solid #2196f3;
      }

      &.okr-type-3 {
        border-left: 3px solid #ff9800;
      }

      .progress-container .progress-bar {
        background-color: #2196f3;
      }
    }

    .achievement-cell,
    .plan-cell {
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
</style>
