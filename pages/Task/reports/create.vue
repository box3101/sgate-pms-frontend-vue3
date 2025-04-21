<template>
  <div class="report-creation-container">
    <header class="report-header">
      <div class="ct-top flex justify-between w-full">
        <ul class="my_menu flex gap-23 items-center">
          <li class="tbl-btn flex gap-5">
            <UiDatePicker
              class="w-270"
              v-model="dateRange"
              isRange
              startPlaceholder="시작일"
              endPlaceholder="마지막날짜"
              size="medium"
            />
            <UiButton variant="secondary">
              <i class="icon icon-md icon-search icon-white"></i>
            </UiButton>
          </li>
          <h1>주간보고</h1>
        </ul>
        <div class="tbl-btn flex gap-5">
          <UiButton variant="secondary">
            <i class="icon icon-sm icon-excel icon-white"></i>
            <span>Excel</span>
          </UiButton>
          <UiButton variant="secondary" @click="aiReportModal = true">
            <i class="icon icon-sm icon-robot icon-white"></i>
            <span>AI 취합 보고서 생성</span>
          </UiButton>
          <UiButton class="org-btn new" @click="reportConfigModal = true">
            <i class="icon icon-sm icon-create icon-white"></i>
            <span>보고서작성</span>
          </UiButton>
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
                <div
                  :data-index="index"
                  class="flex justify-between items-center p-2 hover:bg-gray-50 cursor-pointer"
                >
                  <span> {{ report.type }} {{ report.date }} {{ report.status }} </span>
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
            <div class="report-header">
              <div class="report-meta">
                <div class="report-date">
                  작성자: 이찬용 | 제출일: 2025.03.05 | 제출대상 : 한성진
                </div>
                <div class="report-actions">
                  <UiButton variant="secondary">
                    <i class="icon icon-md icon-edit icon-white"></i>
                    <span>수정</span>
                  </UiButton>
                  <UiButton variant="secondary">
                    <i class="icon icon-md icon-delete icon-white"></i>
                    <span>삭제</span>
                  </UiButton>
                </div>
              </div>
            </div>
            <div class="report-body">
              <UiReportTable></UiReportTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  // 로고 텍스트 접근
  const logoText = inject('logoText')

  // 원하는 시점에 로고 텍스트 변경
  logoText.value = '일일/주간보고'

  // 보고서 설정 팝업
  const reportConfigModal = ref(false)

  // AI 보고서 생성 팝업
  const aiReportModal = ref(false)

  // 보고서 목록
  const reports = ref([
    { type: '주간보고', date: '2025.03.05', status: '제출완료' },
    { type: '월간보고', date: '2025.03.01', status: '임시저장' },
    { type: '주간보고', date: '2025.02.26', status: '제출완료' },
    { type: '주간보고', date: '2025.02.19', status: '제출완료' },
    { type: '월간보고', date: '2025.02.01', status: '제출완료' },
    { type: '주간보고', date: '2025.03.05', status: '제출완료' },
    { type: '월간보고', date: '2025.03.01', status: '임시저장' },
    { type: '주간보고', date: '2025.02.26', status: '제출완료' },
    { type: '주간보고', date: '2025.02.19', status: '제출완료' },
    { type: '월간보고', date: '2025.02.01', status: '제출완료' },
    { type: '주간보고', date: '2025.03.05', status: '제출완료' },
    { type: '월간보고', date: '2025.03.01', status: '임시저장' },
    { type: '주간보고', date: '2025.02.26', status: '제출완료' },
    { type: '주간보고', date: '2025.02.19', status: '제출완료' },
    { type: '월간보고', date: '2025.02.01', status: '제출완료' },
    { type: '주간보고', date: '2025.03.05', status: '제출완료' },
    { type: '월간보고', date: '2025.03.01', status: '임시저장' },
    { type: '주간보고', date: '2025.02.26', status: '제출완료' },
    { type: '주간보고', date: '2025.02.19', status: '제출완료' },
    { type: '월간보고', date: '2025.02.01', status: '제출완료' },
    { type: '주간보고', date: '2025.03.05', status: '제출완료' },
    { type: '월간보고', date: '2025.03.01', status: '임시저장' },
    { type: '주간보고', date: '2025.02.26', status: '제출완료' },
    { type: '주간보고', date: '2025.02.19', status: '제출완료' },
    { type: '월간보고', date: '2025.02.01', status: '제출완료' }
  ])
</script>
