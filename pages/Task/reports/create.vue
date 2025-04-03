<template>
  <div class="report-creation-container">
    <header class="report-header">
      <div class="ct-top flex justify-between w-full">
        <ul class="my_menu flex gap-140 items-center">
          <li class="tbl-btn flex gap-5">
            <UiDatePicker
              class="w-280"
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
        </ul>
        <div class="tbl-btn flex gap-5">
          <UiButton variant="tertiary">
            <i class="icon icon-md icon-excel"></i>
            <span>Excel</span>
          </UiButton>
          <UiButton variant="tertiary">
            <i class="icon icon-md icon-robot"></i>
            <span>AI 취합 보고서 생성</span>
          </UiButton>
          <UiButton class="org-btn new" @click="reportConfigModal = true">
            <i class="icon icon-md icon-create icon-white"></i>
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
              <li
                v-for="(report, index) in reports"
                :key="index"
                class="report-item"
              >
                <div
                  :data-index="index"
                  class="flex justify-between items-center p-2 hover:bg-gray-50 cursor-pointer"
                >
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
            <div class="report-header">
              <h2>주간보고</h2>
              <div class="report-meta">
                <div class="report-date">
                  작성자: 이찬용 | 제출일: 2025.03.05 | 제출대상 : 한성진
                </div>
                <div class="report-actions">
                  <UiButton variant="tertiary">
                    <i class="icon icon-md icon-edit"></i>
                    <span>수정</span>
                  </UiButton>
                  <UiButton variant="tertiary">
                    <i class="icon icon-md icon-delete"></i>
                    <span>삭제</span>
                  </UiButton>
                </div>
              </div>
            </div>
            <div class="report-body">
              <div class="report-table-container">
                <table class="report-table">
                  <colgroup>
                    <col width="20%" />
                    <col width="20%" />
                    <col width="30%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th class="text-center">KPI</th>
                      <th class="text-center">OKR</th>
                      <th class="text-center">금주실적</th>
                      <th class="text-center">차주계획</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in reportItems" :key="index">
                      <td class="kpi-cell">3</td>
                      <td class="okr-cell">3</td>
                      <td>4</td>
                      <td class="plan-cell">5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <div class="reportEtc">
                  <table>
                    <colgroup>
                      <col width="10%" />
                      <col width="90%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th
                          scope="row"
                          class="txt-c br firCornerTop"
                          style="min-height: 100px"
                        >
                          의견/기타
                        </th>
                        <td>
                          <div class="pd10" style="min-height: 100px">2323</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="reportEtc">
                  <table>
                    <colgroup>
                      <col width="10%" />
                      <col width="90%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th
                          scope="row"
                          class="txt-c br firCornerTop"
                          style="min-height: 100px"
                        >
                          첨부파일
                        </th>
                        <td>
                          <div class="pd10" style="min-height: 100px">2323</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="reportEtc">
                  <table>
                    <colgroup>
                      <col width="10%" />
                      <col width="90%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th scope="row" class="txt-c br firCornerBot pd10">
                          첨부파일
                        </th>
                        <td class="pd10">
                          <div>
                            <span id="spanViewAttachFile">23</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 보고서 팝업 -->
  <UiModal title="보고서 설정" v-model="reportConfigModal" :size="'large'">
    <template #headerActions-right>
      <UiButton variant="primary">
        <i class="icon icon-md icon-create icon-white"></i>
        <span>보고서생성</span>
      </UiButton>
    </template>

    <UiFormLayout>
      <UiFormItem label="보고서명">
        <div class="flex gap-10 align-center">
          <UiSelect
            class="w-150"
            placeholder="일간보고"
            :options="[
              { value: '일간보고', label: '일간보고' },
              { value: '주간보고', label: '주간보고' },
            ]"
          />
          <UiDatePicker class="w-150" />
        </div>
      </UiFormItem>
      <UiFormItem label="표시할내용">
        <div class="flex flex-col gap-15">
          <UiCheckbox size="large" label="KPI" />
          <UiCheckbox size="large" label="OKR" />
          <UiCheckbox size="large" label="Project" />
        </div>
      </UiFormItem>
      <UiFormItem label="실적작성방법">
        <div class="flex flex-col gap-15">
          <div class="flex gap-10 align-center">
            <UiRadio name="reportType" size="large" label="활동" />
            <div class="flex gap-10 is-border">
              <UiRadio name="reportType2" size="large" label="활동일" />
              <UiRadio name="reportType2" size="large" label="작성일" />
            </div>
            <div class="is-border">
              <UiCheckbox size="large" label="나의 활동만 가져오기" />
            </div>
            <div class="is-border">
              <UiCheckbox size="large" label="피드백도 포함해서 가져오기" />
            </div>
          </div>
          <UiRadio name="reportType" size="large" label="직접입력" />
        </div>
      </UiFormItem>
    </UiFormLayout>
  </UiModal>

  <!-- AI 취업 보고서 생성-->
   <UiModal title="AI 취업 보고서 생성" v-model="aiReportModal" :size="'mlarge'">
     <template #headerActions-left>
      <img src="@/assets/images/ico_avatar_sai.svg" alt="sai" />
     </template>

     <template #headerActions-right>
       <UiButton>
         <i class="icon icon-sm icon-create icon-white"></i>
         취합 대상 보고서 선택
       </UiButton>
     </template>

     <UiFormLayout>
      <UiFormItem label="보고서 명">
        <div class="flex gap-10 items-center">
          <UiSelect  class="w-150" placeholder="주간보고" :options="[{value:'주간보고',label:'주간보고'},
          {value:'일간보고',label:'일간보고'},]">
          </UiSelect>
          <UiDatePicker isRange class="w-220"></UiDatePicker>
        </div>
      </UiFormItem>
       <UiFormItem label="표시할내용">
       <div class="flex flex-col gap-15">
          <div class="flex gap-10 items-center" >
            <UiCheckbox class="w-60" size="large" label="KPI" />
            <UiSelect  class="w-150" placeholder="2025" :options="[{value:'2025',label:'2025'},
              {value:'2024',label:'2024'},]">
              </UiSelect>
          </div>
          <div class="flex gap-10 items-center">
            <UiCheckbox class="w-60" size="large" label="OKR" />
            <UiSelect  class="w-150" placeholder="2025" :options="[{value:'2025',label:'2025'},
              {value:'2024',label:'2024'},]">
              </UiSelect>
              <UiSelect  class="w-150" placeholder="1분기" :options="[{value:'1분기',label:'1분기'},
              {value:'2분기',label:'2분기'},
              {value:'3분기',label:'3분기'},
              {value:'4분기',label:'4분기'},]">
              </UiSelect>
          </div>
       </div>
      </UiFormItem>
       <UiFormItem label="실적작성방법">
       <div class="flex gap-10">
          <UiRadio name="reportType" size="large" label="내 활동도 같이 요약하기"> </UiRadio>
          <div class="flex gap-10 is-border">
            <UiRadio name="reportType" size="large" label="활동일"> </UiRadio>
            <UiRadio name="reportType" size="large" label="작성일"> </UiRadio>
          </div>
           <div class="flex gap-10 is-border">
             <UiCheckbox size="large" label="나의 활동만 가져오기" />
          </div>
          <div class="flex gap-10 is-border">
             <UiCheckbox size="large" label="피드백도 포함해서 가져오기" />
          </div>
         
       </div>
        <UiRadio name="reportType" size="large" label="내 활동도 같이 요약하기"> </UiRadio>
      </UiFormItem>
 

      <div class="notice">
        <ul>
          <li>fffff</li>
          <li>121211212</li>
        </ul>
      </div>
     </UiFormLayout>


   </UiModal>
</template>

<script setup>
import { ref } from "vue";

// 보고서 설정 팝업
const reportConfigModal = ref(false);

// AI 보고서 생성 팝업
const aiReportModal = ref(true);

// 보고서 목록
const reports = ref([
  { type: "주간보고", date: "2025.03.05", status: "제출완료" },
  { type: "월간보고", date: "2025.03.01", status: "임시저장" },
  { type: "주간보고", date: "2025.02.26", status: "제출완료" },
  { type: "주간보고", date: "2025.02.19", status: "제출완료" },
  { type: "월간보고", date: "2025.02.01", status: "제출완료" },
]);

// 보고서 아이템
const reportItems = ref([
  {
    kpi: {
      title: "신규 고객 유치",
    },
    okr: {
      title: "마케팅 캠페인 실행",
    },
  },
]);
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
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 20px;
    min-height: 600px;

    .report-header {
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid #e5e7eb;

      h2 {
        font-size: 18px;
        font-weight: 600;
        color: #111827;
        margin-bottom: 8px;
      }

      .report-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .report-date {
          color: #6b7280;
          font-size: 14px;
        }

        .report-actions {
          display: flex;
          gap: 8px;
        }
      }
    }

    .report-body {
      .report-table-container {
        overflow-y: auto;
      }

      .report-table {
        width: 100%;
        border-collapse: collapse;

        th {
          background-color: #e2e4e7;
          font-weight: 600;
          padding: 10px 12px;
          text-align: center;
          color: #374151;
          border-bottom: 1px solid #e5e7eb;
        }

        td {
          padding: 12px;
          border: 1px solid #e5e7eb;
          vertical-align: top;
        }
      }

      .kpi-cell {
        .kpi-title {
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
        }

        .kpi-detail {
          .kpi-item {
            margin-bottom: 8px;

            .kpi-label {
              color: #6b7280;
              font-size: 14px;
            }

            .kpi-value {
              color: #111827;
              font-size: 14px;
            }

            .progress-bar {
              width: 100%;
              height: 4px;
              background-color: #e5e7eb;
              border-radius: 2px;

              .progress-fill {
                height: 4px;
                background-color: #3b82f6;
                border-radius: 2px;
              }
            }
          }
        }
      }

      .okr-cell {
        .okr-title {
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
          padding-left: 8px;
          border-left: 4px solid;
        }

        .okr-items {
          .okr-item {
            margin-bottom: 8px;
            padding-left: 8px;
            border-left: 4px solid;

            .okr-item-title {
              font-weight: 500;
              color: #374151;
              margin-bottom: 4px;
            }

            .okr-item-percentage {
              .progress-bar {
                width: 100%;
                height: 4px;
                background-color: #e5e7eb;
                border-radius: 2px;

                .progress-fill {
                  height: 4px;
                  border-radius: 2px;
                }
              }
            }
          }
        }
      }

      .achievement-cell,
      .plan-cell {
        white-space: pre-line;
      }
    }
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

.modal-content {
  background-color: #ffffff;
  border-radius: 8px;

  .header-section {
    border-color: #e5e7eb;
  }

  .user-name-container {
    .icon-user {
      color: #4b5563;
    }
  }

  .date-info {
    span {
      font-weight: 400;
    }
  }

  .target-selection {
    .w-200 {
      max-width: 200px;
    }
  }

  .button-group {
    .icon-white {
      color: #ffffff;
    }
  }

  .editor-container {
    min-height: 240px;
    transition: border-color 0.2s ease;

    &:focus-within {
      border-color: #3b82f6;
    }
  }

  .attachment-section {
    border-top: 1px solid #f3f4f6;
    padding-top: 16px;
  }
}

.reportEtc {
  margin-top: 16px;
  margin-bottom: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  overflow: hidden;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th.txt-c {
    text-align: center;
    background-color: #f9fafb;
    font-weight: 500;
    font-size: 14px;
    color: #4b5563;
  }

  th.br {
    border-right: 1px solid #e5e7eb;
  }

  th.firCornerTop {
    border-top-left-radius: 6px;
  }

  th.firCornerBot {
    border-bottom-left-radius: 6px;
  }

  .pd10 {
    padding: 10px;
  }

  td {
    vertical-align: top;
    color: #374151;
    font-size: 14px;
  }

  #spanViewAttachFile {
    display: inline-block;
    min-height: 24px;
  }
}
.notice{width: 100%;background-color: #ddd;border-radius: 5px;padding: 16px;


}
</style>
