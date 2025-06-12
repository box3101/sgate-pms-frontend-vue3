<template>
  <div class="report-creation-container" ref="containerRef">
    <!-- 헤더 영역 -->
    <header class="report-header com-header">
      <div class="ct-top flex justify-between items-center">
        <!-- 좌측: 날짜 검색 -->
        <ul class="my_menu flex gap-23 items-center">
          <li class="tbl-btn flex gap-5">
            <UiDatePicker
              class="w-270"
              v-model="searchDateRange"
              isRange
              startPlaceholder="시작일"
              endPlaceholder="마지막날짜"
              size="medium"
            />
            <UiButton variant="secondary" size="medium" icon-only @click="searchReports">
              <i class="icon icon-md icon-search icon-white"></i>
            </UiButton>
          </li>
        </ul>

        <!-- 우측: 액션 버튼 -->
        <div class="tbl-btn flex gap-5">
          <UiButton variant="secondary-line" @click="exportToExcel">
            <i class="icon icon-md icon-excel"></i>
            <span>다운로드</span>
          </UiButton>
          <UiButton variant="primary" @click="isReportConfigModalOpen = true">
            <i class="icon icon-md icon-create icon-white"></i>
            <span>보고서 작성</span>
          </UiButton>
        </div>
      </div>
    </header>

    <!-- 메인 컨텐츠 -->
    <div class="report-content mt-20">
      <div class="flex-container">
        <!-- 좌측: 보고서 리스트 -->
        <div class="w-30p">
          <UiTable
            title="보고서 리스트"
            v-model="reportList"
            hover
            striped
            scrollable
            :maxHeight="reportListHeight"
            :handle-row-click="handleRowClick"
          >
            <template #colgroup>
              <col v-for="column in reportListColumns" :key="column.key" :width="column.width" />
              <col width="60px" />
            </template>

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

            <template #body="{ rows }">
              <tr
                v-for="(row, index) in rows"
                :key="index"
                @click.stop="handleRowClick(row, index, $event)"
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
                    @click.stop="isReportUpdateModalOpen = true"
                  >
                    <i class="icon-md icon-edit"></i>
                  </UiButton>
                </td>
              </tr>
            </template>
          </UiTable>
        </div>

        <!-- 우측: 보고서 상세 내용 -->
        <div class="w-70p">
          <!-- 보고서 헤더 정보 -->
          <div class="header flex items-center justify-between">
            <p class="heading-4 mt-5">
              <span>{{ selectedReportType }}</span>
            </p>
            <p class="heading-4 mt-5">
              <span>{{ selectedReportDate }}</span>
              <span class="ml-5 mt-5">{{ selectedReportStatus }}</span>
              <span class="color-gray text-lg mt-5 ml-10"
                >제출대상 : {{ selectedReportTarget }}</span
              >
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
                      <UiButton size="small" variant="text" @click="downloadFile(file)">
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

  <!-- 보고서 수정 모달-->
  <UiModal title="보고서 수정" v-model="isReportUpdateModalOpen" :size="'large'">
    <template #headerActions-right>
      <UiButton variant="primary" @click="isReportUpdateModalOpen = true">
        <i class="icon icon-md icon-create icon-white"></i>
        <span>보고서수정</span>
      </UiButton>
    </template>
  </UiModal>

  <!-- 보고서 설정 모달 -->
  <UiModal title="보고서 설정" v-model="isReportConfigModalOpen" :size="'large'">
    <template #headerActions-right>
      <UiButton variant="primary" @click="isReportCreateModalOpen = true">
        <i class="icon icon-md icon-create icon-white"></i>
        <span>보고서생성</span>
      </UiButton>
    </template>

    <UiFormLayout>
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

      <UiFormItem label="표시할내용">
        <div class="flex flex-col gap-5">
          <div class="flex gap-10 items-center">
            <UiCheckbox class="w-60" v-model="includeKPI" size="large" label="KPI" />
            <UiSelect class="w-150" v-model="kpiYear" placeholder="2025" :options="yearOptions" />
          </div>
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

      <UiFormItem label="실적작성방법">
        <div class="flex flex-col gap-5">
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
          <UiRadio
            v-model="achievementInputMethod"
            value="manual"
            name="achievementMethod"
            label="직접입력"
          />
        </div>
      </UiFormItem>

      <UiFormItem label="Project 실적작성방법">
        <div class="flex flex-col gap-5">
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
      <UiButton variant="primary" @click="submitReport">제출</UiButton>
    </template>

    <UiFormLayout>
      <UiFormItem label="">
        <div class="flex gap-5 items-center com-header">
          <div class="user-label gap-5">
            <i class="icon icon-md icon-user"></i>
            <div class="user-name">{{ currentUserName }}</div>
          </div>
          <div>
            <ul class="daily-report">
              <li>{{ createReportType }}</li>
              <li>{{ createReportDate }} 제출</li>
            </ul>
          </div>
          <div class="submit-target flex gap-5 items-center">
            <span class="label">제출대상:</span>
            <UiMultiSelect
              class="w-400"
              v-model="submitTargets"
              placeholder="협업자 이름을 입력해주세요"
              :options="collaboratorOptions"
            />
          </div>
          <UiButton variant="secondary" @click="isAiSummaryConfirmOpen = true">
            <img src="@/assets/images/ico_avatar_sai.svg" alt="sai" class="icon-md" />
            <span>AI 요약</span>
          </UiButton>
          <UiConfirm
            v-model="isAiSummaryConfirmOpen"
            title="사용상의 주의사항"
            :message="aiSummaryMessage"
            @confirm="handleAiSummaryConfirm"
            @cancel="handleAiSummaryCancel"
          />
          <UiButton variant="secondary">직접입력</UiButton>
          <UiButton variant="secondary">활동재생성</UiButton>
          <UiButton variant="secondary" @click="isActivityAddModalOpen = true"
            >업무 활동 추가</UiButton
          >
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
      <UiButton variant="primary" @click="addSelectedActivities">
        <i class="icon icon-md icon-create icon-white"></i>
        추가
      </UiButton>
    </template>

    <div class="activity-header com-header flex gap-30 items-center">
      <div class="activity-header__date-section">
        <UiDatePicker v-model="activityDateRange" isRange />
      </div>

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

      <div class="activity-header__checkbox-section flex gap-10">
        <UiCheckbox v-model="filterMyActivitiesOnly">나의 활동만 가져오기</UiCheckbox>
        <UiCheckbox v-model="filterIncludeFeedback">피드백도 포함해서 가져오기</UiCheckbox>
      </div>
    </div>

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

        <template #header="{ selectAll, isAllSelected }">
          <tr>
            <th style="width: 40px">
              <UiCheckbox :modelValue="isAllSelected" @update:modelValue="selectAll" size="large" />
            </th>
            <th v-for="(column, index) in activityColumns" :key="index">{{ column.title }}</th>
          </tr>
        </template>

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
              <div v-if="!sortable" class="row-checkbox">
                <UiCheckbox
                  :modelValue="isRowSelected(item)"
                  @update:modelValue="toggleRowSelection(item)"
                  size="large"
                  @click.stop
                />
              </div>
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
        <ul class="flex flex-wrap w-full fx-header">
          <li class="flex justify-center items-center w-half"><span>금일실적</span></li>
          <li class="flex justify-center items-center w-half"><span>AI 요약 금일 실적</span></li>
        </ul>
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

  // 로고 텍스트 설정
  const logoText = inject('logoText')
  logoText.value = '일일/주간보고'

  // DOM 참조
  const containerRef = ref(null)

  // 모달 상태 관리
  const isReportConfigModalOpen = ref(false)
  const isReportCreateModalOpen = ref(false)
  const isActivityAddModalOpen = ref(false)
  const isAiSummaryModalOpen = ref(false)
  const isAiSummaryConfirmOpen = ref(false)
  const isReportUpdateModalOpen = ref(false)
  // 검색 관련
  const searchDateRange = ref([null, null])

  // 테이블 높이
  const reportListHeight = ref('400px')

  // 보고서 리스트 관련
  const reportListColumns = ref([
    { key: 'date', title: '날짜', width: '140px', align: 'center' },
    { key: 'type', title: '보고서 유형', width: '80px', align: 'center' },
    { key: 'status', title: '상태', width: '80px', align: 'center' },
    { key: 'feedbackCount', title: '피드백', width: '80px', align: 'center' }
  ])

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

  // 선택된 보고서 정보
  const selectedReportType = ref('주간보고')
  const selectedReportDate = ref('2025.05.20')
  const selectedReportStatus = ref('미설정')
  const selectedReportTarget = ref('이은영')

  // 보고서 상세 내용
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
  const weeklyAchievement = ref(
    'lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000lorem1000'
  )
  const nextWeekPlan = ref('lorem1000')

  // 의견/기타 관련
  const miscSectionData = ref([])
  const miscContent = ref('Lorem ipsum dolor sit amet consectetur adipisicing elit...')

  // 첨부파일 관련
  const attachmentFiles = ref([
    { id: 1, name: '보고서_첨부자료.pdf' },
    { id: 2, name: '회의록_20240601.docx' }
  ])

  // 피드백 관련
  const feedbackSectionData = ref([])
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

  // 보고서 설정 관련
  const configReportType = ref('일간보고')
  const configReportDate = ref(null)

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

  // 설정 옵션들
  const includeKPI = ref(false)
  const includeOKR = ref(false)
  const kpiYear = ref('2025')
  const okrYear = ref('2025')
  const okrQuarter = ref('1분기')

  const achievementInputMethod = ref('activity')
  const activityDateType = ref('activity')
  const includeMyActivityOnly = ref(false)
  const includeFeedbackInActivity = ref(false)

  const projectInputMethod = ref('activity')
  const projectDateType = ref('activity')
  const includeMyProjectOnly = ref(false)
  const includeFeedbackInProject = ref(false)

  // 보고서 생성 관련
  const currentUserName = ref('김윤기')
  const createReportType = ref('일간보고')
  const createReportDate = ref('2025.04.04')
  const createReportData = ref([])
  const createMiscData = ref([])

  const submitTargets = ref([])
  const collaboratorOptions = ref([
    { value: 'user1', label: '형광민[기업]' },
    { value: 'user2', label: '땡땡땡[기업]' }
  ])

  const weeklyAchievementInput = ref('')
  const nextWeekPlanInput = ref('')
  const miscInput = ref('')
  const uploadedFiles = ref([])

  // 활동 관련
  const activityDateRange = ref([null, null])
  const activityFilterType = ref('activity')
  const filterMyActivitiesOnly = ref(false)
  const filterIncludeFeedback = ref(false)

  const activityColumns = ref([
    { key: 'board', title: '보드', width: '150px', align: 'center' },
    { key: 'task', title: '업무', width: 'auto', align: 'center' },
    { key: 'activityDate', title: '활동일자', width: '120px', align: 'center' },
    { key: 'content', title: '활동내용', width: 'auto', align: 'left' },
    { key: 'author', title: '작성자', width: '80px', align: 'center' },
    { key: 'createdAt', title: '작성일자', width: '120px', align: 'center' }
  ])

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

  // AI 요약 관련
  const aiSummaryMessage = ref(`
  사이(S-AI)를 통한 업무보고 요약은 LLM기반의 AI모델을 사용하여 서비스를 제공하고 있습니다.
  <br><br>
  이미지는 요약내용에 포함되지 않으며 요약 후에는 직접 입력 모드로 전환합니다.
`)
  const originalContent = ref('현 프로세스 분석 및 문제점 파악, 개선안 초안 작성...')
  const aiSummaryContent = ref('현 프로세스 분석 및 문제점 파악, 개선안 초안 작성...')

  // 선택된 행 관리
  const selectedReportIndex = ref(0) // 기본값으로 첫 번째 행 선택

  // 이벤트 핸들러들
  const searchReports = () => {
    console.log('보고서 검색:', searchDateRange.value)
    // 보고서 검색 로직
  }

  const exportToExcel = () => {
    console.log('엑셀 다운로드')
    // 엑셀 다운로드 로직
  }

  const handleReportSelect = ({ row, index, event }) => {
    console.log('보고서 선택됨:', row, index)

    // 선택된 보고서의 상세 내용을 로드하는 로직
    selectedReportType.value = row.type
    selectedReportDate.value = row.date
    selectedReportStatus.value = row.status
  }

  const handleRowClick = (row, index, event) => {
    selectedReportIndex.value = index // 클릭된 행의 인덱스 저장
    handleReportSelect({ row, index, event })
  }

  const submitReport = () => {
    console.log('보고서 제출')
    // 보고서 제출 로직
    isReportCreateModalOpen.value = false
  }

  const addSelectedActivities = () => {
    console.log('선택된 활동 추가')
    // 선택된 활동을 보고서에 추가하는 로직
    isActivityAddModalOpen.value = false
  }

  const downloadFile = file => {
    console.log('파일 다운로드:', file.name)
    // 파일 다운로드 로직
  }

  const handleAiSummaryConfirm = () => {
    isAiSummaryModalOpen.value = true
    isAiSummaryConfirmOpen.value = false
  }

  const handleAiSummaryCancel = () => {
    isAiSummaryConfirmOpen.value = false
  }

  const calculateTableHeight = async () => {
    await nextTick()
    if (containerRef.value) {
      const containerHeight = containerRef.value.offsetHeight
      const calculatedHeight = 725
      reportListHeight.value = `${calculatedHeight}px`
    }
  }

  onMounted(calculateTableHeight)
</script>

<style lang="scss" scoped>
  .report-creation-container {
    .w-30p tr {
      cursor: pointer;
    }
  }
</style>
