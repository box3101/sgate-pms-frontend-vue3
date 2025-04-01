<template>
  <div class="flex gap-10 h-100p">
    <div class="left-content w-30p py-20 px-20" style="border: 1px solid #aaa">
      <!-- 왼쪽 콘텐츠 영역 -->
      <div class="header flex gap-10 items-center">
        <h2 class="section-title text-xl font-semibold mb-4">나의 보드</h2>
        <div>
          <UiButton
            @click="isFilterModalOpen = true"
            variant="tertiary"
            icon-only
            title="필터"
          >
            <Icon name="heroicons:magnifying-glass" size="20" />
          </UiButton>
          <UiFilterModal
            v-model="isFilterModalOpen"
            title="나의 필터"
            size="small"
            :show-footer="true"
          >
            <UiMultiSelect
              v-model="selectedDepartments"
              :options="departmentOptions"
              placeholder="부서를 선택해주세요."
            />

            <div class="selected-departments">
              <p>선택된 부서: {{ selectedDepartments.join(", ") }}</p>
            </div>
            <template #footerActions>
              <UiButton variant="tertiary" @click="isFilterModalOpen = false"
                >닫기</UiButton
              >
              <UiButton variant="primary" @click="isFilterModalOpen = false"
                >저장</UiButton
              >
            </template>
          </UiFilterModal>
        </div>
      </div>
      <div class="task-list mt-15">
        <!-- 업무리스트 영역 -->
        <div class="board-item">
          <div v-for="index in 7" :key="index" class="task-card">
            <div class="task-card-header">
              <h3 class="task-title">
                {{
                  [
                    "마케팅",
                    "생산",
                    "인사",
                    "재무",
                    "연구개발",
                    "영업",
                    "기획",
                  ][index - 1]
                }}
              </h3>
              <UiButton
                variant="tertiary"
                size="small"
                icon-only
                class="shortcut-btn"
              >
                <Icon name="heroicons:arrow-right" size="18" />
              </UiButton>
            </div>

            <div class="task-status">
              <div class="status-indicators">
                <div class="status-item">
                  <span
                    class="status-dot"
                    style="background-color: #6aa2fa"
                  ></span>
                  <a href="#" class="status-count"
                    ><span class="count-number">{{ 5 + index }}</span
                    ><span class="count-unit">건</span></a
                  >
                </div>
                <div class="status-item">
                  <span
                    class="status-dot"
                    style="background-color: #ecc73c"
                  ></span>
                  <a href="#" class="status-count"
                    ><span class="count-number">{{ 20 + index * 2 }}</span
                    ><span class="count-unit">건</span></a
                  >
                </div>
                <div class="status-item">
                  <span
                    class="status-dot"
                    style="background-color: #db514c"
                  ></span>
                  <a href="#" class="status-count"
                    ><span class="count-number">{{ 3 + index }}</span
                    ><span class="count-unit">건</span></a
                  >
                </div>
              </div>

              <div class="activity-indicators">
                <span class="activity-label">활동</span>
                <div class="activity-status">
                  <button
                    v-if="index % 2 === 0"
                    class="new-badge"
                    @click="handleNewClick"
                  >
                    NEW
                  </button>
                  <span class="activity-count">{{ index + 1 }}건</span>
                </div>
                <span class="feedback-label">피드백</span>
                <span
                  class="feedback-count"
                  :class="{ dash: index % 3 === 0 }"
                  >{{ index % 3 === 0 ? "-" : index }}</span
                >
              </div>
            </div>

            <div class="progress-status">
              <div class="progress-wrapper">
                <span class="status-tag">진행중</span>
                <a href="#" class="status-count"
                  ><span class="count-number">{{ 28 + index }}</span
                  ><span class="count-unit">건</span></a
                >
                <span class="status-tag">완료</span>
                <a href="#" class="status-count"
                  ><span class="count-number">{{ 3 + index }}</span
                  ><span class="count-unit">건</span></a
                >
                <span class="status-tag">진행전</span>
                <span class="dash">{{ index % 4 === 0 ? "-" : index }}</span>
                <span class="status-tag">취소/보류</span>
                <span class="dash">{{ index % 3 === 0 ? "-" : index }}</span>
              </div>
            </div>

            <div class="collaboration-status">
              <div class="collab-wrapper">
                <span class="collab-tag">협업</span>
                <span>ADMIN외 {{ 30 + index }}명</span>
                <span class="collab-tag">공유</span>
                <span>ADMIN외 {{ 25 + index }}명</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-content w-70p py-20 px-20" style="border: 1px solid #aaa">
      <!-- 오른쪽 콘텐츠 영역 -->
      <div class="right-content-header">
        <div class="header-top flex justify-between items-center mb-15">
          <h2 class="section-title text-xl font-semibold">활동조회</h2>
          <div class="header-controls flex gap-10 items-center">
            <UiDatePicker
              class="w-250"
              v-model="dateRange"
              isRange
              startPlaceholder="시작일"
              endPlaceholder="마지막날짜"
              size="medium"
            />
            <div class="flex items-center">
              <span class="filter-label mr-2">기준:</span>
              <UiSelect
                v-model="criteriaType"
                :options="[
                  { value: 'activityDate', label: '활동일자' },
                  { value: 'createdDate', label: '작성일자' },
                ]"
                placeholder="기준"
                class="w-120"
              />
            </div>
            <div class="flex items-center">
              <span class="filter-label mr-2">키워드:</span>
              <UiSelect
                v-model="keywordType"
                :options="[
                  { value: 'task', label: '업무' },
                  { value: 'activity', label: '활동' },
                ]"
                placeholder="키워드"
                class="w-120"
              />
            </div>
            <div class="search-wrapper flex items-center gap-5">
              <UiInput
                v-model="searchKeyword"
                placeholder="검색어를 입력하세요"
              />
              <UiButton variant="tertiary" icon-only title="검색">
                <Icon name="heroicons:magnifying-glass" size="18" />
              </UiButton>
            </div>
            <div class="flex items-center gap-5">
              <UiSwitch v-model="viewByTask" />
              <span class="text-sm">업무별 보기</span>
            </div>
          </div>
        </div>
      </div>
      <div class="right-content-cnt">
        <!-- 타임라인 영역 -->
        <ul class="cbp_tmtimeline">
          <!-- 타임라인 항목 반복 -->
          <template v-for="(item, index) in timelineItems" :key="index">
            <li>
              <!-- type1: 날짜와 내용이 들어간 타입 -->
              <div v-if="item.type === 'type1'" class="work-subj">
                <time style="margin-bottom: 5px; display: inline-block">
                  <span class="label_purple">{{ item.label }}</span>
                </time>
                <div class="cbp_tmdate">{{ item.date }}</div>
                <time class="cbp_tmtime" style="margin-top: 0px">
                  <span
                    style="
                      line-height: 130%;
                      color: rgb(255, 255, 255);
                      margin: 0px;
                      padding: 0px;
                      cursor: pointer;
                    "
                    >{{ item.title }}</span
                  >
                </time>
              </div>
              <!-- type2: 날짜만 있는 타입 -->
              <div
                v-else
                class="work-subj"
                style="background-color: unset; padding-right: 0px"
              >
                <div
                  class="cbp_tmdate"
                  style="
                    background-color: rgb(61, 72, 90);
                    border-radius: 10px;
                    padding: 10px;
                    margin-top: -10px;
                  "
                >
                  {{ item.date }}
                </div>
              </div>
              <div class="cbp_tmlabel">
                <div class="member_info">
                  <ul>
                    <li class="name">{{ item.author }}</li>
                    <li
                      class="st type01"
                      :style="{
                        color: item.statusColor,
                      }"
                    >
                      {{ item.status }}
                    </li>
                    <ul
                      style="
                        position: absolute;
                        padding-top: 20px;
                        vertical-align: top;
                      "
                    >
                      <li
                        class="readCnt has-tooltip"
                        data-original-title="null"
                        style="display: inline-block; vertical-align: super"
                      ></li>
                      <li style="display: inline-block"></li>
                    </ul>
                  </ul>
                </div>
                <div class="comment wp100 mr120" style="flex: 2 1 0%">
                  <pre class="quillContent"><p>{{ item.content }}</p></pre>
                </div>
                <div class="comm_btn" style="flex: 1 1 0%">
                  <span class="createDt">{{ item.createDate }}</span>
                </div>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 필터 모달
const isFilterModalOpen = ref(false);

// 선택된 부서
const selectedDepartments = ref([]);

// 업무별 보기
const viewByTask = ref(false);

// NEW 버튼 클릭 핸들러
const handleNewClick = () => {
  console.log("NEW 버튼이 클릭되었습니다");
  // 필요한 로직 추가
};

// 부서 옵션
const departmentOptions = [
  { value: "생산", label: "생산" },
  { value: "마케팅", label: "마케팅" },
  { value: "인사", label: "인사" },
  { value: "제조공장", label: "제조공장" },
  { value: "생산2", label: "생산" },
  { value: "마케팅2", label: "마케팅" },
  { value: "인사2", label: "인사" },
  { value: "제조공장2", label: "제조공장" },
];

// 타임라인 아이템 데이터
const timelineItems = ref([
  {
    type: "type1",
    label: "my",
    date: "2024-01-15",
    title: "인사평가 시스템 개선",
    author: "김윤기",
    status: "진행중",
    statusColor: "#4CAF50",
    content: "글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트",
    createDate: "2024-01-15 14:30"
  },
  {
    type: "type2",
    date: "2024-01-14",
    author: "김윤기",
    status: "진행중",
    statusColor: "#FF9800",
    content: "인사평가 시스템 개선 프로젝트를 시작했습니다. 피드백 부탁드립니다.",
    createDate: "2024-01-14 10:30"
  },
  {
    type: "type2",
    date: "2024-01-13",
    author: "이지은",
    status: "진행중",
    statusColor: "#2196F3",
    content: "Q2 신규 마케팅 캠페인 기획안을 공유드립니다. 회의 전 검토 부탁드립니다.",
    createDate: "2024-01-13 10:15"
  },
  {
    type: "type2",
    date: "2024-01-11",
    author: "박서버",
    status: "피드백",
    statusColor: "#9C27B0",
    content: "인증 API v2.0 업데이트가 완료되었습니다. 개발 가이드 문서를 참고해주세요.",
    createDate: "2024-01-11 16:45"
  },
  {
    type: "type2",
    date: "2024-01-10",
    author: "박서버",
    status: "완료",
    statusColor: "#4CAF50",
    content: "인증 API v2.0 업데이트가 완료되었습니다. 개발 가이드 문서를 참고해주세요.",
    createDate: "2024-01-10 14:30"
  },
  {
    type: "type1",
    label: "my",
    date: "2024-01-09",
    title: "Q1 마케팅 성과 보고서",
    author: "최수진",
    status: "완료",
    statusColor: "#4CAF50",
    content: "Q1 마케팅 캠페인 성과 보고서가 완성되었습니다. 검토 부탁드립니다.",
    createDate: "2024-01-09 11:20"
  },
  {
    type: "type2",
    date: "2024-01-08",
    author: "홍길동",
    status: "대기중",
    statusColor: "#9E9E9E",
    content: "신규 프로젝트 제안서를 업로드했습니다. 검토 후 피드백 부탁드립니다.",
    createDate: "2024-01-08 09:45"
  },
  {
    type: "type2",
    date: "2024-01-07",
    author: "이지은",
    status: "완료",
    statusColor: "#4CAF50",
    content: "디자인 시스템 v1.5 업데이트가 완료되었습니다. 변경사항을 확인해주세요.",
    createDate: "2024-01-07 16:30"
  },
  {
    type: "type1",
    label: "my",
    date: "2024-01-05",
    title: "백엔드 API 구조 개선",
    author: "박서버",
    status: "검토중",
    statusColor: "#673AB7",
    content: "백엔드 API 구조 개선안을 작성했습니다. 코드 리뷰 부탁드립니다.",
    createDate: "2024-01-05 13:15"
  },
  {
    type: "type2",
    date: "2024-01-03",
    author: "김윤기",
    status: "완료",
    statusColor: "#4CAF50",
    content: "2024년 1분기 업무 계획을 공유드립니다. 검토 후 의견 부탁드립니다.",
    createDate: "2024-01-03 10:00"
  }
]);
</script>
<style lang="scss" scoped>
@use "@/assets/scss/variables";

.section-title {
  color: #1f2937;
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #3b82f6;
  }
}

.filter-label {
  font-weight: 500;
  color: $text-color;
  font-size: 0.9rem;
  position: relative;
  padding-left: 2px;
}

.selected-departments {
  margin-top: 10px;
  color: $text-color;
  font-size: $font-size-md;
}

.w-30p {
  overflow: hidden;
  min-width: 528px; // 최소 너비 설정
}

.w-70p {
  overflow: hidden;
  min-width: 1233px; // 최소 너비 설정
}

.task-list {
  overflow-y: auto;
  height: calc(100vh - 160px);
  padding-right: 10px;
  margin-right: -10px;
}

.board-item {
  padding-bottom: 20px;
}

.task-card {
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  margin-bottom: 16px;

  &:hover {
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  }

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding-bottom: 5px;
    border-bottom: 1px solid #e5e7eb;
    font-size: $font-size-lg;
  }
}

.task-title {
  color: #333;
  transition: color 0.2s ease;
  font-size: $font-size-xl;
  font-weight: 600;
}

.shortcut-btn {
  font-size: 12px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background-color: #3b82f6;
    transition: width 0.2s ease;
  }

  &:hover::before {
    width: 100%;
  }
}

.status {
  &-indicators {
    display: flex;
    gap: 10px;
    margin-bottom: 8px;
    margin-top: 8px;
  }

  &-item {
    display: flex;
    align-items: center;
  }

  &-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.2);
    }
  }

  &-count {
    font-size: $font-size-md;
    color: $text-color;
    text-decoration: none;
    transition: all 0.2s ease;
    margin-left: 5px;
    padding: 0 2px;

    &:hover {
      color: #3b82f6;
      text-decoration: underline;
      font-weight: 500;
    }
  }

  &-tag {
    font-size: 12px;
    padding: 2px 8px;
    background-color: #f3f4f6;
    border-radius: 4px;
    color: #4b5563;
  }
}

.count {
  &-number {
    font-weight: 500;
    margin-right: 2px;
    font-size: $font-size-md;
  }

  &-unit {
    color: #6b7280;
    font-size: $font-size-sm;
  }
}

.dash {
  color: #9ca3af;
}

.activity {
  &-indicators {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 10px;
    padding: 6px 10px;
    border-radius: 6px;
    background-color: #f9fafb;
    transition: background-color 0.2s ease;
    font-size: 0.75rem;
    color: #6b7280;

    &:hover {
      background-color: #f3f4f6;
    }
  }

  &-status {
    display: flex;
    align-items: center;
  }

  &-label {
    font-weight: 500;
    color: #6b7280;
  }

  &-count {
    font-weight: 600;
    color: #4b5563;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      height: 12px;
      width: 1px;
      background-color: #d1d5db;
      right: -12px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.feedback {
  &-label {
    font-weight: 500;
    color: #6b7280;
  }

  &-count {
    font-weight: 600;
    color: #4b5563;
  }
}

.new-badge {
  font-size: 12px;
  padding: 2px 8px;
  background-color: #3b82f6;
  border-radius: 4px;
  color: #fff;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  cursor: pointer;
  margin-right: 5px;

  &:hover {
    background-color: #2563eb;
  }
}

.progress {
  &-status {
    margin-top: 6px;
  }

  &-wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
  }
}

.collab-tag {
  font-size: 12px;
  padding: 2px 8px;
  background-color: #f3f4f6;
  border-radius: 4px;
  color: #4b5563;
}

.collaboration-status {
  margin-top: 6px;
  .collab-wrapper {
    display: flex;
    align-items: center;
    gap: 6px;
  }
}

.right-content-cnt {
  height: calc(100vh - 200px);
  overflow-y: auto;
  padding: 20px 0;
}

.cbp_tmtimeline {
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;

  > li {
    position: relative;
    margin-bottom: 30px;
  }
}

.work-subj {
  width: 25%;
  float: left;
  position: relative;
  padding-right: 80px;
  box-sizing: border-box;
  background-color: #3d485a;
  border-radius: 8px;
  padding: 10px;

  .label_purple {
    background-color: #8e44ad;
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
  }
}

.cbp_tmdate {
  display: block;
  color: #fff;
  font-weight: 600;
  margin-bottom: 5px;
}

.cbp_tmtime {
  display: block;

  span {
    display: block;
    text-align: left;
    font-size: 14px;
  }
}

.cbp_tmlabel {
  margin: 0 0 15px 25%;
  background: #f8f9fa;
  padding: 15px;
  position: relative;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;

  &:after {
    right: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-right-color: #f8f9fa;
    border-width: 10px;
    top: 15px;
  }

  .member_info {
    margin-bottom: 10px;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      align-items: center;
      position: relative;

      li {
        margin-right: 15px;

        &.name {
          font-weight: 600;
          color: #333;
        }

        &.st {
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;

          &.type01 {
            background-color: rgba(236, 199, 60, 0.1);
          }
        }
      }
    }
  }

  .comment {
    margin-bottom: 10px;

    .quillContent {
      margin: 0;
      padding: 0;
      white-space: pre-wrap;
      font-family: inherit;

      p {
        margin: 0;
      }
    }
  }

  .comm_btn {
    display: flex;
    justify-content: flex-end;

    .createDt {
      font-size: 12px;
      color: #6c757d;
    }
  }
}

.wp100 {
  width: 100%;
}

.mr120 {
  margin-right: 120px;
}
</style>
