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
                      <td class="kpi-cell">
                        <div class="kpi-title">{{ item.kpi.title }}</div>
                        <div class="kpi-detail">
                          <div class="kpi-item">
                            <span class="kpi-label">목표:</span>
                            <span class="kpi-value">{{ item.kpi.target }}</span>
                          </div>
                          <div class="kpi-item">
                            <span class="kpi-label">실적:</span>
                            <span class="kpi-value">{{
                              item.kpi.achievement
                            }}</span>
                          </div>
                          <div class="kpi-item">
                            <span class="kpi-label">달성률:</span>
                            <span class="kpi-value"
                              >{{ item.kpi.percentage }}%</span
                            >
                            <div class="progress-bar">
                              <div
                                class="progress-fill"
                                :style="{ width: item.kpi.percentage + '%' }"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="okr-cell">
                        <div
                          class="okr-title"
                          :style="{ borderLeftColor: item.okr.color }"
                        >
                          {{ item.okr.title }}
                        </div>
                        <div class="okr-items">
                          <div
                            v-for="(subItem, subIndex) in item.okr.items"
                            :key="subIndex"
                            class="okr-item"
                            :style="{ borderLeftColor: subItem.color }"
                          >
                            <div class="okr-item-title">
                              {{ subItem.title }}
                            </div>
                            <div class="okr-item-percentage">
                              <span>{{ subItem.percentage }}%</span>
                              <div class="progress-bar">
                                <div
                                  class="progress-fill"
                                  :style="{
                                    width: subItem.percentage + '%',
                                    backgroundColor: subItem.color,
                                  }"
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        class="achievement-cell"
                        v-html="item.weeklyAchievement"
                      ></td>
                      <td class="plan-cell" v-html="item.nextWeekPlan"></td>
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
                        <th
                          scope="row"
                          class="txt-c br firCornerBot pd10"
                        >
                          첨부파일
                        </th>
                        <td
                          class="pd10"
                        >
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

    <div class="modal-content p-4">
      <div class="header-section mb-6 border-b pb-4">
        <div class="header-container flex justify-between items-start">
          <div class="user-info">
            <div class="user-name-container flex items-center gap-2 mb-2">
              <i class="icon icon-md icon-user"></i>
              <h3 class="text-lg font-medium">이찬용</h3>
            </div>
            <div class="report-type text-sm text-gray-600 mb-2">
              <span>주간보고</span>
            </div>
            <div class="date-info text-sm text-gray-600">
              <span>2025.02.20 ~ 2025.03.05 미설정</span>
            </div>
          </div>

          <div class="action-controls flex flex-col items-end">
            <div class="target-selection flex items-center gap-2 mb-3">
              <span class="font-medium text-sm">제출 대상 :</span>
              <UiMultiSelect placeholder="대상자 선택" class="w-200" />
            </div>

            <div class="button-group flex gap-2">
              <UiButton variant="tertiary" size="small">직접입력</UiButton>
              <UiButton variant="tertiary" size="small">활동재생성</UiButton>
              <UiButton variant="primary" size="small">
                <i class="icon icon-sm icon-plus icon-white"></i>
                <span>업무 활동추가</span>
              </UiButton>
            </div>
          </div>
        </div>
      </div>

      <div class="content-section w-full">
        <div class="report-table-container">
          <div class="report" style="overflow: auto">
            <table style="min-height: 400px; word-break: break-all">
              <colgroup>
                <col width="20%" />
                <col width="20%" />
                <col width="30%" />
                <col width="30%" />
              </colgroup>
              <thead>
                <tr>
                  <th
                    class="txt-c pl0 head thSolid"
                    style="border-bottom: none !important"
                  >
                    <div class="bm pd10">KPI</div>
                  </th>
                  <th
                    class="txt-c pl0 head thSolid"
                    style="border-bottom: none !important"
                  >
                    <div class="bm pd10">OKR</div>
                  </th>
                  <th
                    class="txt-c pl0 head thSolid"
                    style="border-bottom: none !important"
                  >
                    <div class="bm pd10">금주실적</div>
                  </th>
                  <th
                    class="txt-c pl0 head thSolid"
                    style="border-bottom: none !important"
                  >
                    <div class="bm pd10">차주계획</div>
                  </th>
                </tr>
              </thead>
              <tbody class="sortableObjs ui-sortable">
                <tr
                  v-for="(item, index) in reportItems"
                  :key="index"
                  class="sortableObj"
                  style="border-bottom: 1px solid rgb(219, 222, 230)"
                >
                  <td class="pd15 br" style="vertical-align: top">
                    <div class="weekly-group mb10">
                      <div class="task-title">
                        <div class="statusBar"></div>
                        <a href="#" class="save">{{ item.kpi.title }}</a>
                      </div>
                      <div class="task-content cm_bullet">
                        <span class="label fs12 mr5">목표</span>
                        {{ item.kpi.target }}
                      </div>
                      <div class="task-content cm_bullet">
                        <span class="label fs12 mr5">실적</span>
                        {{ item.kpi.achievement }}
                      </div>
                      <div class="task-content cm_bullet">
                        <span class="label fs12 mr5">달성률</span>
                        {{ item.kpi.percentage }}%
                      </div>
                    </div>
                  </td>
                  <td
                    class="pd15 br sortableObjContent"
                    style="vertical-align: top"
                  >
                    <div class="weekly-group">
                      <div class="task-title">
                        <div
                          class="statusBar"
                          :style="{ backgroundColor: item.okr.color }"
                        ></div>
                        {{ item.okr.title }}
                        <span class="sortIcon" style="cursor: move"></span>
                      </div>
                      <div
                        v-for="(subItem, subIndex) in item.okr.items"
                        :key="subIndex"
                      >
                        <div class="task-content">
                          <a href="#">
                            <div
                              class="statusBar"
                              :style="{ backgroundColor: subItem.color }"
                            ></div>
                            {{ subItem.title }}
                            <div class="task-content cm_bullet ml15">
                              <span class="label fs12 mr5">달성률</span
                              >{{ subItem.percentage }}%
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td
                    class="pd15 br sortablePlans ui-sortable"
                    style="vertical-align: top"
                  >
                    <div v-html="item.weeklyAchievement"></div>
                  </td>
                  <td class="pd15 br" style="vertical-align: top">
                    <div class="quill-editor-container">
                      <QuillEditor
                        v-model:content="item.nextWeekPlan"
                        placeholder="내용을 입력해 주세요."
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </UiModal>
</template>

<script setup>
import { ref } from "vue";

const showModal = ref(false);

const reports = ref([
  { type: "주간보고", date: "2025.03.05", status: "제출완료" },
  { type: "월간보고", date: "2025.03.01", status: "임시저장" },
  { type: "주간보고", date: "2025.02.26", status: "제출완료" },
  { type: "주간보고", date: "2025.02.19", status: "제출완료" },
  { type: "월간보고", date: "2025.02.01", status: "제출완료" },
]);

const reportItems = ref([
  {
    kpi: {
      title: "신규 고객 유치",
      target: "100명",
      achievement: "85명",
      percentage: 85,
    },
    okr: {
      title: "마케팅 캠페인 실행",
      color: "#4f46e5",
      items: [
        { title: "소셜미디어 광고 집행", color: "#818cf8", percentage: 90 },
        { title: "이메일 마케팅 캠페인", color: "#818cf8", percentage: 75 },
      ],
    },
    weeklyAchievement: `
      <div class="task-content">
        <div class="statusBar" style="background-color: #818cf8"></div>
        <p>소셜미디어 광고 집행</p>
        <ul class="cm_bullet ml15">
          <li>인스타그램 광고 3건 집행 완료</li>
          <li>페이스북 광고 2건 집행 완료</li>
          <li>신규 유입 고객 65명 확보</li>
        </ul>
      </div>
      <div class="task-content mt10">
        <div class="statusBar" style="background-color: #818cf8"></div>
        <p>이메일 마케팅 캠페인</p>
        <ul class="cm_bullet ml15">
          <li>뉴스레터 2회 발송 완료</li>
          <li>오픈율 35%, 클릭률 12% 달성</li>
          <li>신규 유입 고객 20명 확보</li>
        </ul>
      </div>
    `,
    nextWeekPlan:
      "<p>1. 인스타그램 광고 성과 분석 및 최적화</p><p>2. 새로운 이메일 템플릿 개발</p><p>3. 구글 애즈 캠페인 준비</p>",
  },
  {
    kpi: {
      title: "매출 증대",
      target: "5,000만원",
      achievement: "4,200만원",
      percentage: 84,
    },
    okr: {
      title: "신규 상품 출시",
      color: "#0891b2",
      items: [
        { title: "상품 개발 완료", color: "#06b6d4", percentage: 100 },
        { title: "마케팅 자료 제작", color: "#06b6d4", percentage: 80 },
      ],
    },
    weeklyAchievement: `
      <div class="task-content">
        <div class="statusBar" style="background-color: #06b6d4"></div>
        <p>상품 개발 완료</p>
        <ul class="cm_bullet ml15">
          <li>신규 상품 A 출시 완료</li>
          <li>신규 상품 B 최종 테스트 완료</li>
          <li>상품 매뉴얼 작성 완료</li>
        </ul>
      </div>
      <div class="task-content mt10">
        <div class="statusBar" style="background-color: #06b6d4"></div>
        <p>마케팅 자료 제작</p>
        <ul class="cm_bullet ml15">
          <li>상품 소개서 제작 완료</li>
          <li>홍보 영상 촬영 완료</li>
          <li>SNS 홍보물 디자인 진행중</li>
        </ul>
      </div>
    `,
    nextWeekPlan:
      "<p>1. 신규 상품 B 출시</p><p>2. SNS 홍보물 디자인 완료</p><p>3. 온라인 론칭 이벤트 기획</p>",
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

</style>
