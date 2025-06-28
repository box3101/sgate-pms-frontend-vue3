<template>
  <div class="report-creation-container" ref="containerRef">
    <!--
      헤더 영역
      보고서 검색 및 액션 버튼 포함
    -->
    <header class="report-header com-header">
      <div class="ct-top flex justify-between items-center">
        <!-- 좌측: 날짜 검색 영역 -->
        <ul class="my_menu flex gap-23 items-center">
          <li class="tbl-btn flex gap-5">
            <UiDatePicker
              v-model="searchDateRange"
              isRange
              startPlaceholder="시작일"
              endPlaceholder="마지막날짜"
              size="medium"
            />
            <UiButton variant="secondary" size="medium" icon-only @click="handleSearchReports">
              <i class="icon icon-md icon-search icon-white"></i>
            </UiButton>
          </li>
        </ul>

        <!-- 우측: 액션 버튼 그룹 -->
        <div class="tbl-btn flex gap-5">
          <UiButton variant="secondary-line" @click="handleExportToExcel">
            <i class="icon icon-md icon-excel"></i>
            <span>다운로드</span>
          </UiButton>
          <UiButton variant="primary" @click="openReportConfigModal">
            <i class="icon icon-md icon-create icon-white"></i>
            <span>보고서 작성</span>
          </UiButton>
        </div>
      </div>
    </header>

    <!--
      메인 컨텐츠 영역
      좌측: 보고서 리스트 (30%), 우측: 상세 내용 (70%)
    -->
    <div class="report-content mt-20">
      <div class="flex-container">
        <!-- 좌측: 보고서 리스트 섹션 -->
        <div class="w-30p">
          <UiTable
            title="보고서 리스트"
            v-model="reportList"
            hover
            striped
            scrollable
            :maxHeight="reportListHeight"
            :handle-row-click="handleReportRowClick"
          >
            <!-- 테이블 컬럼 너비 설정 -->
            <template #colgroup>
              <col v-for="column in reportListColumns" :key="column.key" :width="column.width" />
              <col width="60px" />
            </template>

            <!-- 테이블 헤더 -->
            <template #header>
              <tr>
                <th
                  v-for="column in reportListColumns"
                  :key="column.key"
                  :class="column.align ? `text-${column.align}` : ''"
                >
                  {{ column.title }}
                </th>
                <th class="text-center">수정</th>
              </tr>
            </template>

            <!-- 테이블 바디: 보고서 목록 표시 -->
            <template #body="{ rows }">
              <tr
                v-for="(row, index) in rows"
                :key="index"
                @click.stop="handleReportRowClick(row, index, $event)"
                :class="selectedReportIndex === index ? 'selected-row' : ''"
              >
                <td
                  v-for="(column, colIndex) in reportListColumns"
                  :key="colIndex"
                  :class="column.align ? `text-${column.align}` : ''"
                >
                  {{ row[column.key] }}
                </td>
                <td class="text-center">
                  <UiButton
                    icon-only
                    variant="ghost"
                    size="small"
                    @click.stop="openReportUpdateModal"
                  >
                    <i class="icon-md icon-edit"></i>
                  </UiButton>
                </td>
              </tr>
            </template>
          </UiTable>
        </div>

        <!-- 우측: 보고서 상세 내용 섹션 -->
        <div class="w-70p">
          <!-- 보고서 헤더 정보 표시 -->
          <div class="header flex items-center justify-between">
            <p class="heading-4 mt-5">
              <span>{{ selectedReportType }}</span>
            </p>
            <p class="heading-4 mt-5">
              <span>{{ selectedReportDate }}</span>
              <span class="ml-5 mt-5">{{ selectedReportStatus }}</span>
              <span class="color-gray text-lg mt-5 ml-10">
                제출대상 : {{ selectedReportTarget }}
              </span>
            </p>
          </div>

          <!-- 실적/계획 테이블 -->
          <UiTable
            v-model="reportDetailData"
            scrollable
            striped
            bordered
            maxHeight="calc(100vh - 222px)"
            alignTop
          >
            <template #colgroup>
              <col width="50%" />
              <col width="50%" />
            </template>

            <template #header>
              <tr>
                <th class="text-center">금주실적</th>
                <th class="text-center">차주계획</th>
              </tr>
            </template>

            <template #body>
              <tr>
                <td>
                  <div class="p-3" v-html="weeklyAchievement"></div>
                </td>
                <td>
                  <div class="p-3" v-html="nextWeekPlan"></div>
                </td>
              </tr>
            </template>
          </UiTable>

          <!-- 의견/기타 섹션 -->
          <UiTable
            class="mt-20"
            title="의견/기타"
            v-model="miscSectionData"
            layout="horizontal"
            striped
            bordered
          >
            <template #body>
              <tr>
                <th>의견/기타</th>
                <td>{{ miscContent }}</td>
              </tr>
            </template>
          </UiTable>

          <!-- 첨부파일 섹션 -->
          <UiTable class="mt-20" title="첨부파일" layout="horizontal" striped bordered>
            <template #body>
              <tr>
                <th>첨부파일</th>
                <td>
                  <div class="flex flex-col gap-2">
                    <div
                      v-for="file in attachmentFiles"
                      :key="file.id"
                      class="flex items-center gap-3"
                    >
                      <i class="icon icon-md icon-file"></i>
                      <span>{{ file.name }}</span>
                      <UiButton size="small" variant="text" @click="handleDownloadFile(file)">
                        <i class="icon icon-sm icon-download"></i>
                        <span class="text-underline">다운로드</span>
                      </UiButton>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </UiTable>

          <!-- 피드백 섹션 -->
          <UiTable
            class="mt-20"
            title="피드백"
            v-model="feedbackSectionData"
            layout="horizontal"
            striped
            bordered
          >
            <template #body>
              <tr>
                <th>피드백</th>
                <td>
                  <div class="flex flex-col gap-4">
                    <div
                      v-for="feedback in feedbackList"
                      :key="feedback.id"
                      class="p-3 bg-gray-50 rounded"
                    >
                      <div class="flex items-center gap-2 mb-2">
                        <span class="font-bold">{{ feedback.author }}</span>
                        <span class="text-gray-500 text-sm">{{ feedback.createdAt }}</span>
                      </div>
                      <p>{{ feedback.content }}</p>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </UiTable>
        </div>
      </div>
    </div>
  </div>

  <!--
    모달 컴포넌트들
    각각의 기능별 모달 UI 제공
  -->

  <!-- 보고서 수정 모달 -->
  <UiModal title="보고서 수정" v-model="isReportUpdateModalOpen" :size="'large'">
    <template #headerActions-right>
      <UiButton variant="primary" @click="handleReportUpdate">
        <i class="icon icon-md icon-create icon-white"></i>
        <span>보고서수정</span>
      </UiButton>
    </template>
    <!-- 모달 내용은 추후 구현 예정 -->
  </UiModal>

  <!-- 보고서 설정 모달 -->
  <UiModal title="보고서 설정" v-model="isReportConfigModalOpen" :size="'large'">
    <template #headerActions-right>
      <UiButton variant="primary" @click="openReportCreateModal">
        <i class="icon icon-md icon-create icon-white"></i>
        <span>보고서생성</span>
      </UiButton>
    </template>

    <UiFormLayout>
      <!-- 보고서명 설정 -->
      <UiFormItem label="보고서명">
        <div class="flex gap-10 items-center">
          <UiSelect
            class="w-150"
            v-model="configReportType"
            placeholder="일간보고"
            :options="reportTypeOptions"
          />
          <UiDatePicker class="w-150" v-model="configReportDate" />
        </div>
      </UiFormItem>

      <!-- 표시할 내용 설정 -->
      <UiFormItem label="표시할내용">
        <div class="flex flex-col gap-5">
          <!-- KPI 설정 -->
          <div class="flex gap-10 items-center">
            <UiCheckbox class="w-60" v-model="includeKPI" size="large" label="KPI" />
            <UiSelect class="w-150" v-model="kpiYear" placeholder="2025" :options="yearOptions" />
          </div>
          <!-- OKR 설정 -->
          <div class="flex gap-10 items-center">
            <UiCheckbox class="w-60" v-model="includeOKR" size="large" label="OKR" />
            <UiSelect class="w-150" v-model="okrYear" placeholder="2025" :options="yearOptions" />
            <UiSelect
              class="w-150"
              v-model="okrQuarter"
              placeholder="1분기"
              :options="quarterOptions"
            />
          </div>
        </div>
      </UiFormItem>

      <!-- 실적 작성 방법 설정 -->
      <UiFormItem label="실적작성방법">
        <div class="flex flex-col gap-5">
          <!-- 활동 방식 선택 -->
          <div class="flex gap-10 items-center">
            <UiRadio
              v-model="achievementInputMethod"
              value="activity"
              name="achievementMethod"
              label="활동"
            />
            <div class="flex gap-10 is-border">
              <UiRadio
                v-model="activityDateType"
                value="activity"
                name="activityDate"
                label="활동일"
              />
              <UiRadio
                v-model="activityDateType"
                value="created"
                name="activityDate"
                label="작성일"
              />
            </div>
            <div class="is-border">
              <UiCheckbox v-model="includeMyActivityOnly" label="나의 활동만 가져오기" />
            </div>
            <div class="is-border">
              <UiCheckbox v-model="includeFeedbackInActivity" label="피드백도 포함해서 가져오기" />
            </div>
          </div>
          <!-- 직접 입력 방식 -->
          <UiRadio
            v-model="achievementInputMethod"
            value="manual"
            name="achievementMethod"
            label="직접입력"
          />
        </div>
      </UiFormItem>

      <!-- 프로젝트 실적 작성 방법 설정 -->
      <UiFormItem label="Project 실적작성방법">
        <div class="flex flex-col gap-5">
          <!-- 프로젝트 활동 방식 -->
          <div class="flex gap-10 items-center">
            <UiRadio
              v-model="projectInputMethod"
              value="activity"
              name="projectMethod"
              label="활동"
            />
            <div class="flex gap-10 is-border">
              <UiRadio
                v-model="projectDateType"
                value="activity"
                name="projectDate"
                label="활동일"
              />
              <UiRadio
                v-model="projectDateType"
                value="created"
                name="projectDate"
                label="작성일"
              />
            </div>
            <div class="is-border">
              <UiCheckbox v-model="includeMyProjectOnly" label="나의 활동만 가져오기" />
            </div>
            <div class="is-border">
              <UiCheckbox v-model="includeFeedbackInProject" label="피드백도 포함해서 가져오기" />
            </div>
          </div>
          <!-- 프로젝트 직접 입력 방식 -->
          <UiRadio
            v-model="projectInputMethod"
            value="manual"
            name="projectMethod"
            label="직접입력"
          />
        </div>
      </UiFormItem>
    </UiFormLayout>
  </UiModal>

  <!-- 보고서 생성 모달 -->
  <UiModal title="보고서 작성" v-model="isReportCreateModalOpen" :size="'xlarge'">
    <template #headerActions-right>
      <UiButton variant="primary" @click="handleSubmitReport">제출</UiButton>
    </template>

    <UiFormLayout>
      <!-- 보고서 작성 헤더 -->
      <UiFormItem label="">
        <div class="flex gap-5 items-center com-header">
          <!-- 사용자 정보 -->
          <div class="user-label gap-5">
            <i class="icon icon-md icon-user"></i>
            <div class="user-name">{{ currentUserName }}</div>
          </div>

          <!-- 보고서 정보 -->
          <div>
            <ul class="daily-report">
              <li>{{ createReportType }}</li>
              <li>{{ createReportDate }} 제출</li>
            </ul>
          </div>

          <!-- 제출 대상 선택 -->
          <div class="submit-target flex gap-5 items-center">
            <span class="label">제출대상:</span>
            <UiMultiSelect
              class="w-400"
              v-model="submitTargets"
              placeholder="협업자 이름을 입력해주세요"
              :options="collaboratorOptions"
            />
          </div>

          <!-- 액션 버튼들 -->
          <UiButton variant="secondary" @click="openAiSummaryConfirm">
            <img src="@/assets/images/ico_avatar_sai.svg" alt="sai" class="icon-md" />
            <span>AI 요약</span>
          </UiButton>

          <!-- AI 요약 확인 다이얼로그 -->
          <UiConfirm
            v-model="isAiSummaryConfirmOpen"
            title="사용상의 주의사항"
            :message="aiSummaryMessage"
            @confirm="handleAiSummaryConfirm"
            @cancel="handleAiSummaryCancel"
          />

          <UiButton variant="secondary">직접입력</UiButton>
          <UiButton variant="secondary">활동재생성</UiButton>
          <UiButton variant="secondary" @click="openActivityAddModal"> 업무 활동 추가 </UiButton>
        </div>
      </UiFormItem>
    </UiFormLayout>

    <!-- 실적/계획 입력 테이블 -->
    <UiTable v-model="createReportData" scrollable striped bordered maxHeight="calc(100vh - 220px)">
      <template #colgroup>
        <col width="50%" />
        <col width="50%" />
      </template>

      <template #header>
        <tr>
          <th class="text-center">금주실적</th>
          <th class="text-center">차주계획</th>
        </tr>
      </template>

      <template #body>
        <tr>
          <td>
            <div class="p-3">
              <UiTextarea
                v-model="weeklyAchievementInput"
                placeholder="금주 실적을 입력하세요"
                :rows="10"
              />
            </div>
          </td>
          <td>
            <div class="p-3">
              <UiTextarea
                v-model="nextWeekPlanInput"
                placeholder="차주 계획을 입력하세요"
                :rows="10"
              />
            </div>
          </td>
        </tr>
      </template>
    </UiTable>

    <!-- 의견/기타 입력 -->
    <UiTable
      class="mt-20"
      title="의견/기타"
      v-model="createMiscData"
      layout="horizontal"
      striped
      bordered
    >
      <template #body>
        <tr>
          <th>의견/기타</th>
          <td>
            <UiTextarea
              v-model="miscInput"
              :rows="5"
              placeholder="의견이나 기타 사항을 입력하세요"
            />
          </td>
        </tr>
      </template>
    </UiTable>

    <!-- 첨부파일 업로드 -->
    <UiTable class="mt-20" title="첨부파일" layout="horizontal" striped bordered>
      <template #body>
        <tr>
          <th>첨부파일</th>
          <td>
            <UiAttachment v-model="uploadedFiles" :initialOpen="true" />
          </td>
        </tr>
      </template>
    </UiTable>
  </UiModal>

  <!-- 활동 추가 모달 -->
  <UiModal title="활동추가" v-model="isActivityAddModalOpen" size="xlarge">
    <template #headerActions-right>
      <UiButton variant="primary" @click="handleAddSelectedActivities">
        <i class="icon icon-md icon-create icon-white"></i>
        추가
      </UiButton>
    </template>

    <!-- 활동 필터 헤더 -->
    <div class="activity-header com-header flex gap-30 items-center">
      <!-- 날짜 선택 영역 -->
      <div class="activity-header__date-section">
        <UiDatePicker v-model="activityDateRange" isRange />
      </div>

      <!-- 라디오 버튼 영역 -->
      <div class="activity-header__radio-section">
        <div class="activity-header__radio-group flex gap-10">
          <UiRadio
            v-model="activityFilterType"
            value="activity"
            label="활동일"
            name="activityFilter"
          />
          <UiRadio
            v-model="activityFilterType"
            value="created"
            label="작성일"
            name="activityFilter"
          />
        </div>
      </div>

      <!-- 체크박스 필터 영역 -->
      <div class="activity-header__checkbox-section flex gap-10">
        <UiCheckbox v-model="filterMyActivitiesOnly">나의 활동만 가져오기</UiCheckbox>
        <UiCheckbox v-model="filterIncludeFeedback">피드백도 포함해서 가져오기</UiCheckbox>
      </div>
    </div>

    <!-- 활동 목록 테이블 -->
    <div class="activity-content mt-20">
      <UiTable
        title="업무 활동 목록"
        v-model="activityList"
        hover
        scrollable
        bordered
        maxHeight="calc(100vh - 220px)"
      >
        <template #colgroup>
          <col style="width: 40px" />
          <col
            v-for="(column, index) in activityColumns"
            :key="index"
            :style="column.width ? `width: ${column.width}` : ''"
          />
        </template>

        <!-- 테이블 헤더: 전체 선택 체크박스 포함 -->
        <template #header="{ selectAll, isAllSelected }">
          <tr>
            <th style="width: 40px">
              <UiCheckbox :modelValue="isAllSelected" @update:modelValue="selectAll" size="large" />
            </th>
            <th v-for="(column, index) in activityColumns" :key="index">
              {{ column.title }}
            </th>
          </tr>
        </template>

        <!-- 테이블 바디: 개별 선택 및 드래그 기능 -->
        <template
          #body="{
            rows,
            toggleRowSelection,
            isRowSelected,
            handleDragStart,
            handleDragOver,
            handleDrop,
            handleDragEnd,
            sortable
          }"
        >
          <tr
            v-for="(item, index) in rows"
            :key="item.id"
            @click="!sortable && toggleRowSelection(item)"
            :class="{ selected: isRowSelected(item), 'sortable-row': sortable }"
            :draggable="sortable"
            @dragstart="e => handleDragStart(e, index)"
            @dragover="e => handleDragOver(e)"
            @drop="e => handleDrop(e, index)"
            @dragend="handleDragEnd"
          >
            <td>
              <!-- 일반 모드: 체크박스 표시 -->
              <div v-if="!sortable" class="row-checkbox">
                <UiCheckbox
                  :modelValue="isRowSelected(item)"
                  @update:modelValue="toggleRowSelection(item)"
                  size="large"
                  @click.stop
                />
              </div>
              <!-- 정렬 모드: 드래그 핸들 표시 -->
              <div v-else class="drag-handle">
                <i class="icon-md icon-drag"></i>
              </div>
            </td>
            <td
              v-for="(column, colIndex) in activityColumns"
              :key="colIndex"
              :class="column.align ? `text-${column.align}` : ''"
            >
              {{ item[column.key] }}
            </td>
          </tr>
        </template>
      </UiTable>
    </div>
  </UiModal>

  <!-- AI 요약 비교 모달 -->
  <UiModal title="AI 요약 전후 비교" v-model="isAiSummaryModalOpen" :size="'mlarge'">
    <UiFormLayout>
      <div class="flex flex-col">
        <!-- 비교 헤더 -->
        <ul class="flex flex-wrap w-full fx-header">
          <li class="flex justify-center items-center w-half">
            <span>금일실적</span>
          </li>
          <li class="flex justify-center items-center w-half">
            <span>AI 요약 금일 실적</span>
          </li>
        </ul>
        <!-- 비교 내용 -->
        <ul class="flex flex-wrap w-full h-100p fx-body">
          <li class="flex justify-center w-half border-right">
            {{ originalContent }}
          </li>
          <li class="flex justify-center w-half">
            {{ aiSummaryContent }}
          </li>
        </ul>
      </div>
    </UiFormLayout>
  </UiModal>
</template>

<script setup>
  import { ref, onMounted, nextTick, inject } from 'vue'

  /**
   * 페이지 초기화
   * 로고 텍스트 설정 및 DOM 참조
   */
  const logoText = inject('logoText')
  logoText.value = '일일/주간보고'

  const containerRef = ref(null)

  /**
   * 모달 상태 관리
   * 각 모달의 열림/닫힘 상태를 제어
   */
  const isReportConfigModalOpen = ref(false) // 보고서 설정 모달
  const isReportCreateModalOpen = ref(false) // 보고서 생성 모달
  const isActivityAddModalOpen = ref(false) // 활동 추가 모달
  const isAiSummaryModalOpen = ref(false) // AI 요약 비교 모달
  const isAiSummaryConfirmOpen = ref(false) // AI 요약 확인 다이얼로그
  const isReportUpdateModalOpen = ref(false) // 보고서 수정 모달

  /**
   * 검색 및 필터링 관련 데이터
   */
  const searchDateRange = ref([null, null]) // 보고서 검색 날짜 범위

  /**
   * UI 레이아웃 관련 설정
   */
  const reportListHeight = ref('400px') // 보고서 리스트 테이블 높이

  /**
   * 보고서 리스트 테이블 구성
   * 컬럼 정의 및 데이터 설정
   */
  const reportListColumns = ref([
    { key: 'date', title: '날짜', width: '140px', align: 'center' },
    { key: 'type', title: '보고서 유형', width: '80px', align: 'center' },
    { key: 'status', title: '상태', width: '80px', align: 'center' },
    { key: 'feedbackCount', title: '피드백', width: '80px', align: 'center' }
  ])

  // 보고서 리스트 데이터 (추후 API 연동 예정)
  const reportList = ref([
    { date: '2025-05-22', type: '일간보고', status: '대기', feedbackCount: 1 },
    { date: '2025-05-21', type: '일간보고', status: '제출', feedbackCount: 2 },
    { date: '2025-05-20', type: '일간보고', status: '제출', feedbackCount: 0 },
    { date: '2025-05-19', type: '일간보고', status: '제출', feedbackCount: 0 },
    { date: '2025-05-18', type: '주간보고', status: '제출', feedbackCount: 0 },
    { date: '2025-05-17', type: '일간보고', status: '미제출', feedbackCount: 0 },
    { date: '2025-05-16', type: '일간보고', status: '제출', feedbackCount: 0 },
    { date: '2025-05-15', type: '일간보고', status: '제출', feedbackCount: 0 },
    { date: '2025-05-14', type: '일간보고', status: '제출', feedbackCount: 0 },
    { date: '2025-05-13', type: '일간보고', status: '미제출', feedbackCount: 0 },
    { date: '2025-05-12', type: '일간보고', status: '제출', feedbackCount: 0 },
    { date: '2025-05-11', type: '주간보고', status: '제출', feedbackCount: 0 },
    { date: '2025-05-10', type: '일간보고', status: '제출', feedbackCount: 0 }
  ])

  /**
   * 선택된 보고서 정보
   * 우측 상세 영역에 표시되는 데이터
   */
  const selectedReportIndex = ref(0) // 선택된 보고서 인덱스
  const selectedReportType = ref('주간보고') // 선택된 보고서 유형
  const selectedReportDate = ref('2025.05.20') // 선택된 보고서 날짜
  const selectedReportStatus = ref('미설정') // 선택된 보고서 상태
  const selectedReportTarget = ref('이은영') // 제출 대상

  /**
   * 보고서 상세 내용 데이터
   */
  const reportDetailData = ref([
    {
      id: 1,
      title: '주간보고',
      date: '2025.05.20',
      status: '미설정',
      target: '이은영'
    },
    {
      id: 2,
      title: '주간보고',
      date: '2025.05.20',
      status: '미설정',
      target: '이은영'
    }
  ])

  // 실적 및 계획 내용 (더미 데이터 - 추후 API 연동 시 실제 데이터로 교체)
  const weeklyAchievement = ref(
    'lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000'
  )
  const nextWeekPlan = ref('lorem1000')

  /**
   * 의견/기타 섹션 관련 데이터
   */
  const miscSectionData = ref([]) // 의견/기타 테이블 데이터
  const miscContent = ref('Lorem ipsum dolor sit amet consectetur adipisicing elit...')

  /**
   * 첨부파일 관련 데이터
   */
  const attachmentFiles = ref([
    { id: 1, name: '보고서_첨부자료.pdf' },
    { id: 2, name: '회의록_20240601.docx' }
  ])

  /**
   * 피드백 관련 데이터
   */
  const feedbackSectionData = ref([]) // 피드백 테이블 데이터
  const feedbackList = ref([
    {
      id: 1,
      author: '홍길동',
      createdAt: '2024-06-01 14:30',
      content:
        '보고서 내용이 매우 명확하게 작성되었습니다. 다음 보고서에서는 KPI 달성률에 대한 자세한 분석도 추가해주시면 좋겠습니다.'
    },
    {
      id: 2,
      author: '김철수',
      createdAt: '2024-06-02 09:15',
      content:
        '주요 이슈 사항에 대한 해결 방안이 구체적으로 제시되어 있어 도움이 되었습니다. 차주 계획에 일정 관련 세부 내용도 포함해주세요.'
    }
  ])

  /**
   * 보고서 설정 모달 관련 데이터
   */
  const configReportType = ref('일간보고') // 설정할 보고서 유형
  const configReportDate = ref(null) // 설정할 보고서 날짜

  // 셀렉트 박스 옵션들
  const reportTypeOptions = ref([
    { value: '일간보고', label: '일간보고' },
    { value: '주간보고', label: '주간보고' }
  ])

  const yearOptions = ref([
    { value: '2025', label: '2025' },
    { value: '2024', label: '2024' }
  ])

  const quarterOptions = ref([
    { value: '1분기', label: '1분기' },
    { value: '2분기', label: '2분기' },
    { value: '3분기', label: '3분기' },
    { value: '4분기', label: '4분기' }
  ])

  /**
   * 보고서 설정 옵션들
   * KPI, OKR 포함 여부 및 관련 설정
   */
  const includeKPI = ref(false) // KPI 포함 여부
  const includeOKR = ref(false) // OKR 포함 여부
  const kpiYear = ref('2025') // KPI 연도
  const okrYear = ref('2025') // OKR 연도
  const okrQuarter = ref('1분기') // OKR 분기

  // 실적 작성 방법 관련 설정
  const achievementInputMethod = ref('activity') // 실적 입력 방법 (activity/manual)
  const activityDateType = ref('activity') // 활동 날짜 유형 (activity/created)
  const includeMyActivityOnly = ref(false) // 나의 활동만 포함 여부
  const includeFeedbackInActivity = ref(false) // 피드백 포함 여부

  // 프로젝트 실적 작성 방법 관련 설정
  const projectInputMethod = ref('activity') // 프로젝트 입력 방법
  const projectDateType = ref('activity') // 프로젝트 날짜 유형
  const includeMyProjectOnly = ref(false) // 나의 프로젝트만 포함
  const includeFeedbackInProject = ref(false) // 프로젝트 피드백 포함

  /**
   * 보고서 생성 모달 관련 데이터
   */
  const currentUserName = ref('김윤기') // 현재 사용자 이름
  const createReportType = ref('일간보고') // 생성할 보고서 유형
  const createReportDate = ref('2025.04.04') // 생성할 보고서 날짜
  const createReportData = ref([]) // 생성 중인 보고서 데이터
  const createMiscData = ref([]) // 생성 중인 의견/기타 데이터

  // 제출 대상 관련
  const submitTargets = ref([]) // 선택된 제출 대상 목록
  const collaboratorOptions = ref([
    { value: 'user1', label: '형광민[기업]' },
    { value: 'user2', label: '땡땡땡[기업]' }
  ])

  // 입력 필드들
  const weeklyAchievementInput = ref('') // 금주 실적 입력값
  const nextWeekPlanInput = ref('') // 차주 계획 입력값
  const miscInput = ref('') // 의견/기타 입력값
  const uploadedFiles = ref([]) // 업로드된 파일 목록

  /**
   * 활동 추가 모달 관련 데이터
   */
  const activityDateRange = ref([null, null]) // 활동 검색 날짜 범위
  const activityFilterType = ref('activity') // 활동 필터 유형 (activity/created)
  const filterMyActivitiesOnly = ref(false) // 내 활동만 필터링 여부
  const filterIncludeFeedback = ref(false) // 피드백 포함 필터링 여부

  // 활동 목록 테이블 컬럼 설정
  const activityColumns = ref([
    { key: 'board', title: '보드', width: '150px', align: 'center' },
    { key: 'task', title: '업무', width: 'auto', align: 'center' },
    { key: 'activityDate', title: '활동일자', width: '120px', align: 'center' },
    { key: 'content', title: '활동내용', width: 'auto', align: 'left' },
    { key: 'author', title: '작성자', width: '80px', align: 'center' },
    { key: 'createdAt', title: '작성일자', width: '120px', align: 'center' }
  ])

  // 활동 목록 데이터 (추후 API 연동 예정)
  const activityList = ref([
    {
      id: 1,
      board: '클라우드 서비스',
      task: '시스템 모니터링',
      activityDate: '2025-04-27',
      content: '클라우드 서버 성능 모니터링 및 로그 분석',
      author: '김개발',
      createdAt: '2025-04-27'
    },
    {
      id: 2,
      board: 'RPA',
      task: '자동화 스크립트 개발',
      activityDate: '2025-04-26',
      content: '데이터 처리 자동화 스크립트 개발 및 테스트',
      author: '이자동',
      createdAt: '2025-04-26'
    }
  ])

  /**
   * AI 요약 관련 데이터
   */
  const aiSummaryMessage = ref(`
  사이(S-AI)를 통한 업무보고 요약은 LLM기반의 AI모델을 사용하여 서비스를 제공하고 있습니다.
  <br><br>
  이미지는 요약내용에 포함되지 않으며 요약 후에는 직접 입력 모드로 전환합니다.
`)
  const originalContent = ref('현 프로세스 분석 및 문제점 파악, 개선안 초안 작성...')
  const aiSummaryContent = ref('현 프로세스 분석 및 문제점 파악, 개선안 초안 작성...')

  /**
   * 이벤트 핸들러 함수들
   * UI 인터랙션 처리를 위한 함수들
   */

  /**
   * 보고서 검색 처리 함수
   * 목적: 선택된 날짜 범위에 따른 보고서 목록 검색
   */
  const handleSearchReports = () => {
    console.log('보고서 검색:', searchDateRange.value)
    // TODO: API 연동 시 실제 검색 로직 구현 필요
  }

  /**
   * 엑셀 다운로드 처리 함수
   * 목적: 현재 보고서 목록을 엑셀 파일로 내보내기
   */
  const handleExportToExcel = () => {
    console.log('엑셀 다운로드')
    // TODO: 엑셀 다운로드 로직 구현 필요
  }

  /**
   * 보고서 행 클릭 처리 함수
   * 목적: 선택된 보고서의 상세 정보를 우측 영역에 표시
   * @param {Object} row - 클릭된 행의 데이터
   * @param {Number} index - 클릭된 행의 인덱스
   * @param {Event} event - 클릭 이벤트 객체
   */
  const handleReportRowClick = (row, index, event) => {
    selectedReportIndex.value = index
    selectedReportType.value = row.type
    selectedReportDate.value = row.date
    selectedReportStatus.value = row.status
    console.log('보고서 선택됨:', row, index)

    // TODO: API 연동 시 선택된 보고서의 상세 데이터 로드 로직 추가
  }

  /**
   * 모달 열기 함수들
   * 목적: 각각의 모달을 열기 위한 헬퍼 함수들
   */
  const openReportConfigModal = () => {
    isReportConfigModalOpen.value = true
  }

  const openReportCreateModal = () => {
    isReportConfigModalOpen.value = false
    isReportCreateModalOpen.value = true
  }

  const openReportUpdateModal = () => {
    isReportUpdateModalOpen.value = true
  }

  const openActivityAddModal = () => {
    isActivityAddModalOpen.value = true
  }

  const openAiSummaryConfirm = () => {
    isAiSummaryConfirmOpen.value = true
  }

  /**
   * 보고서 제출 처리 함수
   * 목적: 작성된 보고서를 서버로 전송
   */
  const handleSubmitReport = () => {
    console.log('보고서 제출')
    console.log('금주 실적:', weeklyAchievementInput.value)
    console.log('차주 계획:', nextWeekPlanInput.value)
    console.log('의견/기타:', miscInput.value)
    console.log('제출 대상:', submitTargets.value)
    console.log('첨부파일:', uploadedFiles.value)

    // TODO: 폼 유효성 검사 로직 추가
    // TODO: API 전송 로직 구현
    isReportCreateModalOpen.value = false
  }

  /**
   * 보고서 수정 처리 함수
   * 목적: 기존 보고서의 내용을 수정
   */
  const handleReportUpdate = () => {
    console.log('보고서 수정')
    // TODO: 보고서 수정 로직 구현
    isReportUpdateModalOpen.value = false
  }

  /**
   * 선택된 활동 추가 처리 함수
   * 목적: 활동 목록에서 선택된 항목들을 보고서에 추가
   */
  const handleAddSelectedActivities = () => {
    console.log('선택된 활동 추가')
    // TODO: 선택된 활동을 보고서 내용에 추가하는 로직 구현
    isActivityAddModalOpen.value = false
  }

  /**
   * 파일 다운로드 처리 함수
   * 목적: 첨부된 파일을 다운로드
   * @param {Object} file - 다운로드할 파일 정보
   */
  const handleDownloadFile = file => {
    console.log('파일 다운로드:', file.name)
    // TODO: 실제 파일 다운로드 로직 구현
  }

  /**
   * AI 요약 관련 처리 함수들
   * 목적: AI 요약 기능의 확인/취소 처리
   */
  const handleAiSummaryConfirm = () => {
    isAiSummaryModalOpen.value = true
    isAiSummaryConfirmOpen.value = false
  }

  const handleAiSummaryCancel = () => {
    isAiSummaryConfirmOpen.value = false
  }

  /**
   * 테이블 높이 계산 함수
   * 목적: 화면 크기에 따라 동적으로 테이블 높이 조정
   */
  const calculateTableHeight = async () => {
    await nextTick()
    if (containerRef.value) {
      const containerHeight = containerRef.value.offsetHeight
      const calculatedHeight = 725 // 현재는 고정값, 추후 동적 계산 가능
      reportListHeight.value = `${calculatedHeight}px`
    }
  }

  /**
   * 컴포넌트 마운트 시 실행
   * 목적: 페이지 로드 시 필요한 초기화 작업 수행
   */
  onMounted(() => {
    calculateTableHeight()
  })
</script>

<style lang="scss" scoped>
  .report-creation-container {
    .w-30p tr {
      cursor: pointer;
    }
  }
</style>
