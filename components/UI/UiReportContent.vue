<template>
  <div class="report-content-container">
    <!-- KPI, OKR, 금주실적, 차주계획 테이블 -->
    <UiTable
      v-if="showKpiOkrTable"
      :headers="kpiOkrHeaders"
      :column-widths="kpiOkrColumnWidths"
      :items="kpiOkrItems"
    />

    <!-- Project, 금일실적, 차일계획, 이슈 테이블 -->
    <UiTable
      v-if="showProjectTable"
      :headers="projectHeaders"
      :column-widths="projectColumnWidths"
      :items="projectItems"
    />

    <!-- 의견/기타, 첨부파일, 피드백 테이블 -->
    <UiRowTable
      v-if="showRowTable"
      :items="rowTableItems"
      :leftColumnWidth="rowTableLeftColumnWidth"
      :rightColumnWidth="rowTableRightColumnWidth"
      :padding="rowTablePadding"
      :centerLeftText="rowTableCenterLeftText"
      :showBorderRight="rowTableShowBorderRight"
    />
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  /**
   * KPI, OKR 테이블 표시 여부
   */
  showKpiOkrTable: {
    type: Boolean,
    default: true,
  },
  /**
   * KPI, OKR 테이블 헤더
   */
  kpiOkrHeaders: {
    type: Array,
    default: () => ["KPI", "OKR", "금주실적", "차주계획"],
  },
  /**
   * KPI, OKR 테이블 컬럼 너비
   */
  kpiOkrColumnWidths: {
    type: Array,
    default: () => ["20%", "20%", "30%", "30%"],
  },
  /**
   * KPI, OKR 테이블 데이터
   */
  kpiOkrItems: {
    type: Array,
    default: () => [],
  },
  
  /**
   * 프로젝트 테이블 표시 여부
   */
  showProjectTable: {
    type: Boolean,
    default: true,
  },
  /**
   * 프로젝트 테이블 헤더
   */
  projectHeaders: {
    type: Array,
    default: () => ["Project", "금일실적", "차일계획", "이슈"],
  },
  /**
   * 프로젝트 테이블 컬럼 너비
   */
  projectColumnWidths: {
    type: Array,
    default: () => ["20%", "20%", "30%", "30%"],
  },
  /**
   * 프로젝트 테이블 데이터
   */
  projectItems: {
    type: Array,
    default: () => [],
  },
  
  /**
   * 행 테이블 표시 여부
   */
  showRowTable: {
    type: Boolean,
    default: true,
  },
  /**
   * 행 테이블 아이템
   */
  rowTableItems: {
    type: Array,
    default: () => [
      { title: '의견/기타', content: '' },
      { title: '첨부파일', content: '' },
      { title: '피드백', content: '' },
    ],
  },
  /**
   * 행 테이블 왼쪽 컬럼 너비
   */
  rowTableLeftColumnWidth: {
    type: String,
    default: "10%",
  },
  /**
   * 행 테이블 오른쪽 컬럼 너비
   */
  rowTableRightColumnWidth: {
    type: String,
    default: "90%",
  },
  /**
   * 행 테이블 패딩 적용 여부
   */
  rowTablePadding: {
    type: Boolean,
    default: true,
  },
  /**
   * 행 테이블 왼쪽 텍스트 중앙 정렬 여부
   */
  rowTableCenterLeftText: {
    type: Boolean,
    default: true,
  },
  /**
   * 행 테이블 오른쪽 테두리 표시 여부
   */
  rowTableShowBorderRight: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss" scoped>
@use "sass:color";

.report-content-container {
  width: 100%;
  
  & > * {
    margin-bottom: 20px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>