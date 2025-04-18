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

  <!-- 보고서 생성 팝업 -->
  <UiModal title="보고서 작성" v-model="reportCreateModal" :size="'xlarge'">
    <template #headerActions-right>
      <UiButton variant="primary" @click="isFilterModalOpen = false">제출</UiButton>
    </template>
    <UiFormLayout>
      <UiFormItem label="">
        <div class="flex gap-10 align-center">
          <div class="user-label gap-5">
            <img src="@/assets/images/ico_avatar_sai.svg" alt="sai" class="icon-md" />
            <div class="user-name">김윤기</div>
          </div>
          <div>
            <ul class="daily-report">
              <li>일간보고</li>
              <li>2025.04.04 제출</li>
            </ul>
          </div>
          <UiMultiSelect
            class="w-400"
            placeholder="협업자 이름을 입력해주세요"
            :options="[
              { value: 'value', label: '형광민[기업]' },
              { value: 'value', label: '땡땡땡[기업]' }
            ]"
          />
          <UiButton variant="secondary" @click="aiSummaryModal = true">
            <img src="@/assets/images/ico_avatar_sai.svg" alt="sai" class="icon-md" />
            <span>AI 요약</span>
          </UiButton>
          <UiButton variant="secondary">
            <span>직접입력</span>
          </UiButton>
          <UiButton variant="secondary">
            <span>활동재생성</span>
          </UiButton>
          <UiButton variant="secondary" @click="addActivityPopup = true">
            <span>업무 활동 추가</span>
          </UiButton>
        </div>
      </UiFormItem>
    </UiFormLayout>
    <UiReportTable />
  </UiModal>

  <!-- AI 요약 전후 비교 -->
  <UiModal title="AI 요약 전후 비교" v-model="aiSummaryModal" :size="'mlarge'">
    <UiFormLayout>
      <div class="flex flex-col">
        <ul class="flex flex-wrap w-full fx-header">
          <li class="flex justify-center items-center w-half"><span>금일실적</span></li>
          <li class="flex justify-center items-center w-half"><span>AI 요약 금일 실적</span></li>
        </ul>
        <ul class="flex flex-wrap w-full h-100p fx-body">
          <li class="flex justify-center w-half border-right">
            1-left 현 프로세스 분석 및 문제점 파악, 개선안 초안 작성현 프로세스 분석 및 문제점 파악,
            개선안 초안 작성현 프로세스 분석 및 문제점 파악, 개선안 초안 작성현 프로세스 분석 및
            문제점 파악, 개선안 초안 작성
          </li>
          <li class="flex justify-center w-half">
            2-right 현 프로세스 분석 및 문제점 파악, 개선안 초안 작성현 프로세스 분석 및 문제점
            파악, 개선안 초안 작성현 프로세스 분석 및 문제점 파악, 개선안 초안 작성현 프로세스 분석
            및 문제점 파악, 개선안 초안 작성현 프로세스 분석 및 문제점 파악, 개선안 초안 작성현
            프로세스 분석 및 문제점 파악, 개선안 초안 작성현 프로세스 분석 및 문제점 파악, 개선안
            초안 작성현 프로세스 분석 및 문제점 파악, 개선안 초안 작
          </li>
        </ul>
      </div>
    </UiFormLayout>
  </UiModal>

  <!-- 활동추가 팝업 -->
  <UiModal title="활동추가" v-model="addActivityPopup" size="xlarge">
    <template #headerActions-right>
      <UiButton variant="primary">
        <i class="icon icon-md icon-create icon-white"></i>
        추가
      </UiButton>
    </template>

    <div class="activity-header flex gap-30 items-center">
      <div class="activity-header__date-section">
        <div class="activity-header__date-picker">
          <UiDatePicker isRange />
        </div>
      </div>

      <div class="activity-header__radio-section">
        <div class="activity-header__radio-group flex gap-10">
          <UiRadio label="활동일" name="a1"></UiRadio>
          <UiRadio label="작성일" name="a1"></UiRadio>
        </div>
      </div>

      <div class="activity-header__checkbox-section flex gap-10">
        <UiCheckbox id="a1">나의 활동만 가져오기</UiCheckbox>
        <UiCheckbox id="a2">피드백도 포함해서 가져오기</UiCheckbox>
      </div>
    </div>

    <div class="activity-content mt-20">
      <UiTable>
        <template #colgroup>
          <col width="40px" />
          <col width="100px" />
          <col width="100px" />
          <col width="150px" />
          <col width="120px" />
          <col width="*" />
          <col width="100px" />
          <col width="120px" />
        </template>
        <template #header>
          <tr>
            <th><UiCheckbox /></th>
            <th>목적</th>
            <th>보드</th>
            <th>업무</th>
            <th>활동일자</th>
            <th>활동내용</th>
            <th>작성자</th>
            <th>작성일자</th>
          </tr>
        </template>
        <template #body>
          <tr v-for="i in 50" :key="i">
            <td><UiCheckbox /></td>
            <td class="text-center">목적 {{ i }}</td>
            <td class="text-center">보드 {{ i }}</td>
            <td class="text-center">업무 {{ i }}</td>
            <td class="text-center">2023.04.{{ i + 10 }}</td>
            <td>
              글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트.
            </td>
            <td class="text-center">홍길동</td>
            <td class="text-center">2023.04.{{ i + 12 }}</td>
          </tr>
        </template>
      </UiTable>
    </div>
  </UiModal>
</template>

<script setup>
  import { ref } from 'vue'

  // 로고 텍스트 접근
  const logoText = inject('logoText')

  // 원하는 시점에 로고 텍스트 변경
  logoText.value = '일일/주간보고'

  // 보고서 설정 팝업
  const reportConfigModal = ref(false)

  // 보고서 생성 팝업
  const reportCreateModal = ref(false)

  // AI 보고서 생성 팝업
  const aiReportModal = ref(false)

  // 취합 대상 보고서 선택
  const reportMergeModal = ref(false)

  // 활동 추가 팝업
  const addActivityPopup = ref(false)

  // AI 요약 전달 팝업
  const aiSummaryModal = ref(false)

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
