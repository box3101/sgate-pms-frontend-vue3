<template>
  <div class="report-creation-container">
    <header class="report-header">
      <div class="ct-top flex justify-between w-full">
        <ul class="my_menu flex gap-140 items-center">
          <li class="tbl-btn flex gap-5">
            <UiDatePicker
              class="w-250"
              v-model="dateRange"
              isRange
              startPlaceholder="시작일"
              endPlaceholder="마지막날짜"
              size="medium"
            />
            <UiButton variant="tertiary" icon-only title="검색">
              <i class="icon icon-md icon-search"></i>
            </UiButton>
          </li>
          <li class="report-status">
            <span>주간보고 2025.03.05 미설정</span>
          </li>
          <li class="report-targets">
            <span>제출대상 : 이찬용, 김윤기</span>
          </li>
        </ul>
        <div class="tbl-btn flex gap-5">
          <UiButton variant="tertiary">
            <i class="icon icon-md icon-excel"></i>
            <span>Excel</span>
          </UiButton>
          <UiButton class="org-btn new">보고서작성</UiButton>
        </div>
      </div>
    </header>
    <div class="report-content mt-20">
      <div class="report-content-layout flex gap-20">
        <div class="left-content w-19p">
          <!-- 왼쪽 콘텐츠 영역 -->
          <div class="report-list">
            <!-- 보고서 목록이 들어갈 영역 -->
            <ul class="report-items">
              <li v-for="(report, index) in reports" :key="index" class="report-item">
                <div :data-index="index" class="flex justify-between items-center p-2 hover:bg-gray-50 cursor-pointer">
                  <span>
                    {{ report.type }} {{ report.date }} {{ report.status }}
                  </span>
                  <span class="searchIcon flex gap-2">
                    <a href="#" @click.prevent="deleteReport(index)">
                      <i class="icon icon-md icon-delete"></i>
                    </a>
                    <a href="#" @click.prevent="editReport(index)">
                      <i class="icon icon-md icon-edit"></i>
                    </a>
                    <a href="#" @click.prevent="viewReport(index)">
                      <i class="icon icon-md icon-magnify"></i>
                    </a>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="right-content w-81p">
          <!-- 오른쪽 콘텐츠 영역 -->
          <div class="report-detail">
            <!-- 보고서 상세 내용이 들어갈 영역 -->
             4
          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- 보고서 작성 팝업 -->
   <UiModal v-model="showModal" title="보고서 작성" size="xlarge">
    <template #headerActions-right>
        <div class="flex justify-end">
          <UiButton variant="tertiary" class="mr-2">
            <i class="icon icon-md icon-reset"></i>
            <span>재설정</span>
          </UiButton>
          <UiButton variant="tertiary" class="mr-2">
            <i class="icon icon-md icon-save"></i>
            <span>임시저장</span>
          </UiButton>
          <UiButton>
            <i class="icon icon-md icon-submit icon-white"></i>
            <span>제출</span>
          </UiButton>
        </div>
    </template>
    23
   </UiModal>
</template>

<script setup>
const logoText = inject("logoText");

logoText.value = "일일/주간보고";

// 보고서 작성 팝업
const showModal = ref(true);

// 보고서 목록
const reports = [
  { type: "주간보고", date: "2025.03.05", status: "미설정" },
  { type: "주간보고", date: "2025.03.04", status: "미설정" },
  { type: "주간보고", date: "2025.03.03", status: "미설정" },
  { type: "주간보고", date: "2025.03.02", status: "미설정" },
  { type: "주간보고", date: "2025.03.01", status: "미설정" },
  { type: "일일보고", date: "2025.02.28", status: "완료" },
  { type: "주간보고", date: "2025.02.27", status: "완료" },
  { type: "일일보고", date: "2025.02.26", status: "완료" },
  { type: "일일보고", date: "2025.02.25", status: "완료" },
  { type: "주간보고", date: "2025.02.24", status: "완료" },
  { type: "일일보고", date: "2025.02.23", status: "완료" },
  { type: "주간보고", date: "2025.02.22", status: "완료" },
  { type: "일일보고", date: "2025.02.21", status: "완료" },
  { type: "주간보고", date: "2025.02.20", status: "완료" },
  { type: "일일보고", date: "2025.02.19", status: "완료" },
  { type: "주간보고", date: "2025.02.18", status: "완료" },
  { type: "일일보고", date: "2025.02.17", status: "완료" },
  { type: "주간보고", date: "2025.02.16", status: "완료" },
  { type: "일일보고", date: "2025.02.15", status: "완료" },
  { type: "주간보고", date: "2025.02.14", status: "완료" },
  { type: "일일보고", date: "2025.02.13", status: "완료" },
  { type: "주간보고", date: "2025.02.12", status: "완료" },
  { type: "일일보고", date: "2025.02.11", status: "완료" },
  { type: "주간보고", date: "2025.02.10", status: "완료" },
  { type: "일일보고", date: "2025.02.09", status: "완료" },
  { type: "주간보고", date: "2025.02.08", status: "완료" },
  { type: "일일보고", date: "2025.02.07", status: "완료" },
  { type: "주간보고", date: "2025.02.06", status: "완료" },
  { type: "일일보고", date: "2025.02.05", status: "완료" },
  { type: "주간보고", date: "2025.02.04", status: "완료" },
];
</script>

<style lang="scss" scoped>
.report-creation-container {
  padding: 20px;

  .report-header {
    margin-bottom: 20px;
  }

  .report-content {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    &-layout {
      display: flex;
      gap: 30px;
    }
  }

  .left-content {
    border-right: 1px solid #e5e7eb;
  }
  .report-list {
    overflow-y: auto;
    height: calc(100vh - 180px);
    padding-right: 10px;
  }

  .report-items {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .report-item {
    border-bottom: 1px solid #f0f0f0;
    border-radius: 4px;
    padding: 5px 10px;

    
    &:hover {
      background-color: #f8fafc;
    }
    
    &:last-child {
      border-bottom: none;
    }
    
    .icon {
      opacity: 0.7;
      transition: opacity 0.2s, transform 0.2s;
      
      &:hover {
        opacity: 1;
        transform: scale(1.1);
      }
    }
  }

  .report-detail {
  }

  .searchIcon {
    a {
      color: #666;
      transition: color 0.2s;
      
      &:hover {
        color: #3b82f6;
      }
    }
  }
}
</style>