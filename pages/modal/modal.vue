<template>
  <div>
    <h1>업무</h1>
    <div class="modal-buttons flex gap-5" style="display: none">
      <UiButton @click="openCardModal">카드 추가</UiButton>
      <UiButton @click="openCardDetail">카드 상세</UiButton>
      <UiButton @click="openAttachmentModal">첨부파일</UiButton>
      <UiButton @click="openOrganizationUserSelector">직원 찾기</UiButton>
      <UiButton @click="openReportConfigModal">보고서 설정</UiButton>
      <UiButton @click="openAiReportModal">AI 취업 보고서 생성</UiButton>
      <UiButton @click="openReportMergeModal">취합 대상 보고서 선택</UiButton>
      <UiButton @click="openReportCreateModal">보고서 생성</UiButton>
      <UiButton @click="openAddActivityPopup">활동추가</UiButton>
      <UiButton @click="openAiSummaryModal">AI 요약 전후 비교</UiButton>
      <UiButton @click="openUserSelectModal">담당자 선택</UiButton>
    </div>
  </div>
  <div class="mt-30">
    <h1>개인성과</h1>
    <UiButton @click="openReferenceKpiModal">참고 KPI</UiButton>
  </div>
  <div>
    <!-- ================== 카드 추가 모달 ================== -->
    <UiModal v-model="isCardModalOpen" position="right" title="카드 추가">
      <template #headerActions>
        <button class="edit-title-btn">
          <Icon name="mdi:pencil" size="16" />
        </button>
      </template>
      <UiAccordionMenu :menuItems="menuItems">
        <!-- 카드 기본 정보 -->
        <template #content-1>
          <UiFormLayout :showFooter="true">
            <UiFormItem label="카테고리">
              <UiSelect placeholder="업무 보드명입니다." v-model="selectedCategoryId" />
            </UiFormItem>
            <UiFormItem label="실행기간">
              <UiDatePicker isRange v-model="executePeriod" />
            </UiFormItem>
            <UiFormItem label="협업">
              <div class="flex gap-5">
                <UiMultiSelect
                  placeholder="협업자 이름을 입력해주세요"
                  :options="departmentOptions"
                  v-model="selectedCooperators"
                />
                <UiButton variant="secondary" icon-only @click="openOrganizationUserSelector">
                  <Icon name="heroicons:user" size="20" />
                </UiButton>
                <UiButton variant="secondary" icon-only>
                  <Icon name="heroicons:magnifying-glass" size="20" />
                </UiButton>
              </div>
            </UiFormItem>
            <UiFormItem label="공유">
              <div class="flex gap-5">
                <UiMultiSelect
                  placeholder="공유자 이름을 입력해주세요"
                  :options="departmentOptions"
                  v-model="selectedSharers"
                />
                <UiButton variant="secondary" icon-only>
                  <Icon name="heroicons:user" size="20" />
                </UiButton>
                <UiButton variant="secondary" icon-only>
                  <Icon name="heroicons:magnifying-glass" size="20" />
                </UiButton>
              </div>
            </UiFormItem>
            <UiFormItem label="내용">
              <UiTextarea
                placeholder="업무에 대한 구체적인 내용을 입력해주세요."
                v-model="cardContent"
              />
            </UiFormItem>
            <template #footerActions>
              <div class="flex gap-5 justify-end">
                <UiButton @click="saveCard">등록</UiButton>
                <UiButton variant="secondary" @click="isCardModalOpen = false">취소</UiButton>
              </div>
            </template>
          </UiFormLayout>
        </template>
        <!-- 활동 내용 -->
        <template #content-2>
          <div class="activity-content">
            <div class="flex justify-between gap-5 mb-4">
              <div class="flex gap-10 items-center">
                <p class="flex-none">일자</p>
                <UiDatePicker placeholder="날짜 선택" v-model="activityDate" />
              </div>
              <div class="flex gap-20 items-center">
                <p class="flex-none">업무상태</p>
                <UiSelect placeholder="선택하세요" class="w-200" v-model="activityStatus" />
                <p class="flex-none">진행만족도</p>
                <UiSelect placeholder="선택하세요" class="w-200" v-model="activitySatisfaction" />
              </div>
            </div>
            <div
              class="editor-container mt-10 my-4"
              style="height: 200px; border: 1px solid #141212"
            ></div>
            <div
              class="flex justify-between items-center mt-20 pt-10"
              style="border-top: 1px solid #eee"
            >
              <button class="attachment-btn" @click="openAttachmentModal">
                <Icon name="heroicons:paper-clip" size="20" />
              </button>
              <UiButton variant="primary" @click="saveCard">저장</UiButton>
            </div>
          </div>
        </template>
      </UiAccordionMenu>
    </UiModal>

    <!-- ================== 카드 상세 모달 ================== -->
    <UiModal v-model="isCardDetailOpen" position="right" title="카드 상세" size="medium">
      <template #headerActions>
        <button class="edit-title-btn">
          <Icon name="mdi:pencil" size="16" />
        </button>
      </template>
      <UiAccordionMenu :menuItems="menuItems">
        <!-- 카드 기본 정보 -->
        <template #content-1>
          <UiFormLayout :showFooter="true">
            <UiFormItem label="카테고리">
              <UiSelect placeholder="업무 보드명입니다." v-model="selectedCategoryId" />
            </UiFormItem>
            <UiFormItem label="실행기간">
              <UiDatePicker isRange v-model="executePeriod" />
            </UiFormItem>
            <UiFormItem label="협업">
              <div class="flex gap-5">
                <UiMultiSelect
                  placeholder="협업자 이름을 입력해주세요"
                  :options="departmentOptions"
                  v-model="selectedCooperators"
                />
                <UiButton variant="secondary" icon-only @click="openOrganizationUserSelector">
                  <Icon name="heroicons:user" size="20" />
                </UiButton>
                <UiButton variant="secondary" icon-only>
                  <Icon name="heroicons:magnifying-glass" size="20" />
                </UiButton>
              </div>
            </UiFormItem>
            <UiFormItem label="공유">
              <div class="flex gap-5">
                <UiMultiSelect
                  placeholder="공유자 이름을 입력해주세요"
                  :options="departmentOptions"
                  v-model="selectedSharers"
                />
                <UiButton variant="secondary" icon-only>
                  <Icon name="heroicons:user" size="20" />
                </UiButton>
                <UiButton variant="secondary" icon-only>
                  <Icon name="heroicons:magnifying-glass" size="20" />
                </UiButton>
              </div>
            </UiFormItem>
            <UiFormItem label="내용">
              <UiTextarea
                placeholder="업무에 대한 구체적인 내용을 입력해주세요."
                v-model="cardContent"
              />
            </UiFormItem>
            <template #footerActions>
              <div class="flex gap-5 justify-end">
                <UiButton @click="saveCard">등록</UiButton>
                <UiButton variant="secondary" @click="isCardModalOpen = false">취소</UiButton>
              </div>
            </template>
          </UiFormLayout>
        </template>
        <!-- 활동 내용 -->
        <template #content-2>
          <div class="activity-content">
            <div class="flex justify-between gap-5 mb-4">
              <div class="flex gap-10 items-center">
                <p class="flex-none">일자</p>
                <UiDatePicker placeholder="날짜 선택" v-model="activityDate" />
              </div>
              <div class="flex gap-20 items-center">
                <p class="flex-none">업무상태</p>
                <UiSelect placeholder="선택하세요" class="w-200" v-model="activityStatus" />
                <p class="flex-none">진행만족도</p>
                <UiSelect placeholder="선택하세요" class="w-200" v-model="activitySatisfaction" />
              </div>
            </div>
            <div
              class="editor-container mt-10 my-4"
              style="height: 200px; border: 1px solid #141212"
            ></div>
            <div
              class="flex justify-between items-center mt-20 pt-10"
              style="border-top: 1px solid #eee"
            >
              <button class="attachment-btn" @click="openAttachmentModal">
                <Icon name="heroicons:paper-clip" size="20" />
              </button>
              <UiButton variant="primary" @click="saveCard">저장</UiButton>
            </div>
          </div>
        </template>
      </UiAccordionMenu>
    </UiModal>

    <!-- ================== 첨부파일 모달 ================== -->
    <UiModal v-model="isAttachmentModalOpen" title="첨부파일" size="medium">
      <div class="attachment-modal-content">
        <UiAttachmentAccordion v-model="uploadedFiles" title="파일첨부" :initialOpen="true" />
        <UiAttachmentAccordion
          v-model="googleDriveFiles"
          title="Google Drive"
          icon="mdi:google-drive"
          :initialOpen="true"
        />
        <div class="attachment-actions flex justify-end">
          <UiButton @click="saveAttachments">첨부완료</UiButton>
        </div>
      </div>
    </UiModal>

    <!-- ================== 직원 찾기 모달 ================== -->
    <UiModal
      v-model="isOrganizationUserSelectorOpen"
      title="직원 찾기"
      size="large"
      :show-footer="true"
    >
      <OrganizationUserSelector />
      <template #footerActions>
        <UiButton variant="primary">저장</UiButton>
      </template>
    </UiModal>

    <!-- ================== 보고서 설정 모달 ================== -->
    <UiModal title="보고서 설정" v-model="reportConfigModal" :size="'large'" :isScroll="true">
      <template #headerActions-right>
        <UiButton variant="primary" @click="reportCreateModal = true">
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
                { value: '주간보고', label: '주간보고' }
              ]"
            />
            <UiDatePicker class="w-150" />
          </div>
        </UiFormItem>
        <UiFormItem label="표시할내용">
          <div class="flex flex-col gap-15">
            <div class="flex gap-10 items-center">
              <UiCheckbox class="w-60" size="large" label="KPI" />
              <UiSelect
                class="w-150"
                placeholder="2025"
                :options="[
                  { value: '2025', label: '2025' },
                  { value: '2024', label: '2024' }
                ]"
              >
              </UiSelect>
            </div>
            <div class="flex gap-10 items-center">
              <UiCheckbox class="w-60" size="large" label="OKR" />
              <UiSelect
                class="w-150"
                placeholder="2025"
                :options="[
                  { value: '2025', label: '2025' },
                  { value: '2024', label: '2024' }
                ]"
              >
              </UiSelect>
              <UiSelect
                class="w-150"
                placeholder="1분기"
                :options="[
                  { value: '1분기', label: '1분기' },
                  { value: '2분기', label: '2분기' },
                  { value: '3분기', label: '3분기' },
                  { value: '4분기', label: '4분기' }
                ]"
              >
              </UiSelect>
            </div>
          </div>
        </UiFormItem>
        <UiFormItem label="실적작성방법">
          <div class="flex flex-col gap-15">
            <div class="flex gap-10 align-center">
              <UiRadio name="reportType" label="활동" />
              <div class="flex gap-10 is-border">
                <UiRadio name="reportType2" label="활동일" />
                <UiRadio name="reportType2" label="작성일" />
              </div>
              <div class="is-border">
                <UiCheckbox label="나의 활동만 가져오기" />
              </div>
              <div class="is-border">
                <UiCheckbox label="피드백도 포함해서 가져오기" />
              </div>
            </div>
            <UiRadio name="reportType" label="직접입력" />
          </div>
        </UiFormItem>
        <UiFormItem label="Project <br> 실적작성방법">
          <div class="flex flex-col gap-15">
            <div class="flex gap-10 align-center">
              <UiRadio name="reportType" label="활동" />
              <div class="flex gap-10 is-border">
                <UiRadio name="reportType2" label="활동일" />
                <UiRadio name="reportType2" label="작성일" />
              </div>
              <div class="is-border">
                <UiCheckbox label="나의 활동만 가져오기" />
              </div>
              <div class="is-border">
                <UiCheckbox label="피드백도 포함해서 가져오기" />
              </div>
            </div>
            <UiRadio name="reportType" label="직접입력" />
          </div>
        </UiFormItem>
      </UiFormLayout>
    </UiModal>

    <!-- ================== AI 취업 보고서 생성 ================== -->
    <UiModal title="AI 취업 보고서 생성" v-model="aiReportModal" :size="'mlarge'">
      <template #headerActions-left>
        <img src="@/assets/images/ico_avatar_sai.svg" alt="sai" />
      </template>

      <template #headerActions-right>
        <UiButton @click="reportMergeModal = true">
          <i class="icon icon-sm icon-create icon-white"></i>
          취합 대상 보고서 선택
        </UiButton>
      </template>

      <UiFormLayout>
        <UiFormItem label="보고서 명">
          <div class="flex gap-10 items-center">
            <UiSelect
              class="w-150"
              placeholder="주간보고"
              :options="[
                { value: '주간보고', label: '주간보고' },
                { value: '일간보고', label: '일간보고' }
              ]"
            >
            </UiSelect>
            <UiDatePicker isRange></UiDatePicker>
          </div>
        </UiFormItem>
        <UiFormItem label="표시할내용">
          <div class="flex flex-col gap-15">
            <div class="flex gap-10 items-center">
              <UiCheckbox class="w-60" label="KPI" />
              <UiSelect
                class="w-150"
                placeholder="2025"
                :options="[
                  { value: '2025', label: '2025' },
                  { value: '2024', label: '2024' }
                ]"
              >
              </UiSelect>
            </div>
            <div class="flex gap-10 items-center">
              <UiCheckbox class="w-60" label="OKR" />
              <UiSelect
                class="w-150"
                placeholder="2025"
                :options="[
                  { value: '2025', label: '2025' },
                  { value: '2024', label: '2024' }
                ]"
              >
              </UiSelect>
              <UiSelect
                class="w-150"
                placeholder="1분기"
                :options="[
                  { value: '1분기', label: '1분기' },
                  { value: '2분기', label: '2분기' },
                  { value: '3분기', label: '3분기' },
                  { value: '4분기', label: '4분기' }
                ]"
              >
              </UiSelect>
            </div>
          </div>
        </UiFormItem>
        <UiFormItem label="실적작성방법">
          <div class="flex gap-10">
            <UiRadio name="reportType" label="내 활동도 같이 요약하기"> </UiRadio>
            <div class="flex gap-10 is-border">
              <UiRadio name="reportType" label="활동일"> </UiRadio>
              <UiRadio name="reportType" label="작성일"> </UiRadio>
            </div>
            <div class="flex gap-10 is-border">
              <UiCheckbox label="나의 활동만 가져오기" />
            </div>
            <div class="flex gap-10 is-border">
              <UiCheckbox label="피드백도 포함해서 가져오기" />
            </div>
          </div>
          <UiRadio name="reportType" label="내 활동도 같이 요약하기"> </UiRadio>
        </UiFormItem>

        <div class="notice">
          <ul>
            <li class="notice-item mb-5">
              <i class="icon icon-md icon-info"></i>
              선택한 기간동안 나에게 제출된 보고서들을 선택하여 내가 최근에 제출한 보고서의 형태로
              요약합니다.
            </li>
            <li class="notice-item">
              <i class="icon icon-md icon-info"></i>
              보고서 취합 시 내 활동을 포함하여 요약하고자 하는 경우 내활동 같이 요약하기를
              선택합니다.
            </li>
          </ul>
        </div>
      </UiFormLayout>
    </UiModal>

    <!-- ==================  취합 대상 보고서 선택 ======================-->
    <UiModal
      title="취합 대상 보고서 선택"
      v-model="reportMergeModal"
      size="xmedium"
      :show-footer="true"
    >
      <div class="report-selection-container">
        <div class="w-400 body-bg p-4">
          <h3 class="text-lg font-semibold">제출 기간 : 2023.03.19 ~ 2023.04.03</h3>

          <div class="mt-4 mb-4">
            <!-- 전체 보고서 선택 체크박스 -->
            <UiCheckbox
              v-model="selectAllReports"
              label="전체 보고서 선택"
              size="large"
              class="mt-10"
              @update:modelValue="updateAllReports"
            />

            <!-- 첫 번째 팀 -->
            <div class="sub-checkboxes">
              <div
                :class="['report-submitter', { 'is-active': submitters.submitter1.toggleOrg }]"
                @click="toggleOrg('submitter1')"
              >
                <!-- 팀 체크박스 -->
                <div class="submitter-header">
                  <UiCheckbox
                    v-model="submitters.submitter1.selectAll"
                    label="이찬용 선임(UI/UX)"
                    size="large"
                    @update:modelValue="value => updateAllTerms('submitter1', value)"
                    @click.stop
                  />
                </div>
                <!-- 개별 보고서 체크박스들 -->
                <div class="report-submitter-list flex flex-col gap-10">
                  <UiCheckbox
                    v-model="submitters.submitter1.reports.report1"
                    label="이찬용 선임(UI/UX) - 2025.03.19"
                    size="medium"
                    @update:modelValue="() => updateSelectAll('submitter1')"
                  />
                  <UiCheckbox
                    v-model="submitters.submitter1.reports.report2"
                    label="이찬용 선임2(UI/UX) - 2025.03.19"
                    size="medium"
                    @update:modelValue="() => updateSelectAll('submitter1')"
                  />
                  <UiCheckbox
                    v-model="submitters.submitter1.reports.report3"
                    label="이찬용 선임3(UI/UX) - 2025.03.19"
                    size="medium"
                    @update:modelValue="() => updateSelectAll('submitter1')"
                  />
                </div>
              </div>
            </div>

            <!-- 두 번째 팀 -->
            <div class="sub-checkboxes" @click="toogleOrg">
              <div
                :class="['report-submitter', { 'is-active': submitters.submitter2.toggleOrg }]"
                @click="toggleOrg('submitter2')"
              >
                <!-- 팀 체크박스 -->
                <div class="submitter-header">
                  <UiCheckbox
                    v-model="submitters.submitter2.selectAll"
                    label="이찬용 선임(UI/UX)"
                    size="large"
                    @update:modelValue="value => updateAllTerms('submitter2', value)"
                    @click.stop
                  />
                </div>
                <!-- 개별 보고서 체크박스들 -->
                <div class="report-submitter-list flex flex-col gap-10">
                  <UiCheckbox
                    v-model="submitters.submitter2.reports.report1"
                    label="이찬용 선임2(UI/UX) - 2025.03.19"
                    size="medium"
                    @update:modelValue="() => updateSelectAll('submitter2')"
                  />
                  <UiCheckbox
                    v-model="submitters.submitter2.reports.report2"
                    label="이찬용 선임3(UI/UX) - 2025.03.19"
                    size="medium"
                    @update:modelValue="() => updateSelectAll('submitter2')"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <template #footerActions>
        <UiButton variant="primary">
          <i class="icon icon-md icon-create icon-white"></i>
          보고서 생성
        </UiButton>
      </template>
    </UiModal>

    <!-- ================== 보고서 생성 팝업 ======================-->
    <UiModal title="보고서 작성" v-model="reportCreateModal" :size="'xlarge'">
      <template #headerActions-right>
        <UiButton variant="primary" @click="isFilterModalOpen = false">제출</UiButton>
      </template>
      <UiFormLayout>
        <UiFormItem label="">
          <div class="flex gap-10 align-center">
            <div class="user-label gap-5">
              <i class="icon icon-md icon-user"></i>
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

    <!-- ================== 활동추가 팝업 ================== -->
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

    <!-- ================== AI 요약 전후 비교 ================== -->
    <UiModal title="AI 요약 전후 비교" v-model="aiSummaryModal" :size="'mlarge'">
      <UiFormLayout>
        <div class="flex flex-col">
          <ul class="flex flex-wrap w-full fx-header">
            <li class="flex justify-center items-center w-half"><span>금일실적</span></li>
            <li class="flex justify-center items-center w-half"><span>AI 요약 금일 실적</span></li>
          </ul>
          <ul class="flex flex-wrap w-full h-100p fx-body">
            <li class="flex justify-center w-half border-right">
              1-left 현 프로세스 분석 및 문제점 파악, 개선안 초안 작성현 프로세스 분석 및 문제점
              파악, 개선안 초안 작성현 프로세스 분석 및 문제점 파악, 개선안 초안 작성현 프로세스
              분석 및 문제점 파악, 개선안 초안 작성
            </li>
            <li class="flex justify-center w-half">
              2-right 현 프로세스 분석 및 문제점 파악, 개선안 초안 작성현 프로세스 분석 및 문제점
              파악, 개선안 초안 작성현 프로세스 분석 및 문제점 파악, 개선안 초안 작성현 프로세스
              분석 및 문제점 파악, 개선안 초안 작성현 프로세스 분석 및 문제점 파악, 개선안 초안
              작성현 프로세스 분석 및 문제점 파악, 개선안 초안 작성현 프로세스 분석 및 문제점 파악,
              개선안 초안 작성현 프로세스 분석 및 문제점 파악, 개선안 초안 작
            </li>
          </ul>
        </div>
      </UiFormLayout>
    </UiModal>

    <!-- ================== 담당자 선택 팝업 ================== -->
    <UiModal v-model="showUserSelectModal" title="담당자 선택" size="large" :show-footer="true">
      <!-- 상단 영역: 검색 필터 -->
      <div class="user-select-filters">
        <div class="filter-row">
          <UiInput placeholder="이름" v-model="userNameFilter" class="filter-input" />
          <UiSelect
            placeholder="직위"
            v-model="userPositionFilter"
            :options="positionOptions"
            class="filter-select"
          />
          <UiSelect
            placeholder="직급"
            v-model="userRankFilter"
            :options="rankOptions"
            class="filter-select"
          />
          <UiButton type="primary" size="medium">
            <i class="icon icon-sm icon-search icon-white"></i>
            검색
          </UiButton>
        </div>
      </div>

      <DepartmentUserSelector />

      <!-- 푸터 영역: 확인/취소 버튼 -->
      <template #footerActions>
        <div class="modal-footer-actions">
          <UiButton variant="secondary" @click="closeUserSelectModal">취소</UiButton>
          <UiButton variant="primary" @click="confirmUserSelection">확인</UiButton>
        </div>
      </template>
    </UiModal>

    <!-- ================== 참고 kpi 모달================== -->
    <UiModal title="참고 KPI" v-model="isReferenceKpiModalOpen" size="xlarge">
      <div class="reference-kpi-container">
        <!-- 여기에 참고 KPI 내용 추가 -->
        <div class="reference-kpi-header">
          <UiFormLayout :listClass="'flex gap-20'">
            <UiFormItem label="부문">
              <UiSelect
                placeholder="기획부문"
                v-model="selectedDepartment"
                :options="departmentOptions"
              />
            </UiFormItem>
            <UiFormItem label="성과지표(KPI)">
              <div class="search-container flex items-center gap-10">
                <UiInput
                  v-model="kpiSearchKeyword"
                  placeholder="성과지표를 입력하세요"
                  class="flex-1"
                />
                <UiButton variant="primary" size="medium">
                  <i class="icon icon-sm icon-search icon-white"></i>
                  검색
                </UiButton>
              </div>
            </UiFormItem>
          </UiFormLayout>
        </div>
        <div class="reference-kpi-cnt">
          <UiTable bordered hover size="small">
            <template #colgroup>
              <col style="width: 20%" />
              <col style="width: 30%" />
              <col style="width: 30%" />
              <col style="width: 20%" />
            </template>
            <template #header>
              <tr>
                <th>부문</th>
                <th>성과지표(KPI)</th>
                <th>정의</th>
                <th>산출식</th>
              </tr>
            </template>
            <template #body>
              <tr v-for="i in 20" :key="i">
                <td>기획부문</td>
                <td>매출달성률(%)</td>
                <td>목표매출액에 대한 실적매출액의 달성도</td>
                <td>실적매출액/계획매출액*100</td>
              </tr>
            </template>
          </UiTable>
        </div>
      </div>
    </UiModal>
  </div>
</template>

<script setup>
  import { ref, defineExpose } from 'vue'
  import UiModal from '@/components/UI/UiModal.vue'
  import UiAccordionMenu from '@/components/UI/UiAccordionMenu.vue'
  import UiFormLayout from '@/components/UI/UiFormLayout.vue'
  import UiFormItem from '@/components/UI/UiFormItem.vue'
  import UiButton from '@/components/UI/UiButton.vue'
  import UiSelect from '@/components/UI/UiSelect.vue'
  import UiMultiSelect from '@/components/UI/UiMultiSelect.vue'
  import UiTextarea from '@/components/UI/UiTextarea.vue'
  import UiDatePicker from '@/components/UI/UiDatePicker.vue'
  import UiAttachmentAccordion from '@/components/UI/UiAttachment.vue'
  import OrganizationUserSelector from '@/components/domain/OrganizationUserSelector.vue'
  import DepartmentUserSelector from '@/components/domain/DepartmentUserSelector.vue'

  // ================== 상태 변수 ==================
  const isCardModalOpen = ref(false)
  const isCardDetailOpen = ref(false)
  const isAttachmentModalOpen = ref(false)
  const isOrganizationUserSelectorOpen = ref(false)
  const selectedCard = ref(null)
  const reportConfigModal = ref(false)
  const aiReportModal = ref(false)
  const reportMergeModal = ref(false)
  const addActivityPopup = ref(false)
  const reportCreateModal = ref(false)
  const aiSummaryModal = ref(false)
  const showUserSelectModal = ref(false)

  // 개인성과 모달
  const isReferenceKpiModalOpen = ref(true)

  // 이벤트 emit
  const emit = defineEmits(['save-card'])

  // 카드 추가/수정 입력값 통합
  const selectedCategoryId = ref(null)
  const executePeriod = ref(null)
  const selectedCooperators = ref([])
  const selectedSharers = ref([])
  const cardContent = ref('')
  const activityDate = ref('')
  const activityStatus = ref('')
  const activitySatisfaction = ref('')

  // 옵션 데이터
  const departmentOptions = [
    { value: '김도현', label: '김도현[공공클라우드 영업팀]' },
    { value: '박지원', label: '박지원[솔루션 개발팀]' },
    { value: '이서연', label: '이서연[마케팅팀]' },
    { value: '최준호', label: '최준호[인사팀]' },
    { value: '정민지', label: '정민지[고객지원팀]' },
    { value: '강태영', label: '강태영[재무팀]' },
    { value: '윤서현', label: '윤서현[연구개발팀]' },
    { value: '한지민', label: '한지민[전략기획팀]' }
  ]

  // 아코디언 메뉴
  const menuItems = [
    {
      title: '속성',
      isAccordion: true,
      initialOpen: false,
      items: [],
      action: () => {}
    },
    {
      title: '활동',
      isAccordion: true,
      initialOpen: true,
      items: [],
      action: () => {}
    }
  ]

  // 첨부파일
  const uploadedFiles = ref([])
  const googleDriveFiles = ref([])

  const selectAllReports = ref(false) // 전체 보고서 선택 상태
  const submitters = ref({
    submitter1: {
      selectAll: false, // 첫 번째 팀의 전체 선택 상태
      reports: {
        report1: false, // 개별 보고서 선택 상태
        report2: false,
        report3: false
      },
      toggleOrg: false
    },
    submitter2: {
      selectAll: false, // 두 번째 팀의 전체 선택 상태
      reports: {
        report1: false,
        report2: false
      },
      toggleOrg: false
    }
  })

  /**
   * 특정 팀의 모든 보고서 선택/해제하는 함수
   *
   * @param {string} submitterId - 팀 식별자
   * @param {boolean} value - 체크박스 설정 값(true/false)
   */
  function updateAllTerms(submitterId, value) {
    // 해당 팀의 모든 개별 보고서 체크박스를 value 값으로 설정
    for (const key in submitters.value[submitterId].reports) {
      submitters.value[submitterId].reports[key] = value
    }
  }

  /**
   * 특정 팀의 개별 보고서 체크박스 변경 시 팀 체크박스 상태 업데이트
   * [동작 3] 팀 내 모든 개별 체크박스가 체크되면 팀 체크박스도 체크됨
   *
   * @param {string} submitterId - 팀 식별자
   */
  function updateSelectAll(submitterId) {
    let allChecked = true

    // 해당 팀의 모든 보고서가 체크되었는지 확인
    for (const reportKey in submitters.value[submitterId].reports) {
      if (submitters.value[submitterId].reports[reportKey] === false) {
        allChecked = false
        break
      }
    }

    // 팀 체크박스 상태 업데이트
    submitters.value[submitterId].selectAll = allChecked

    // 전체 보고서 선택 상태도 업데이트
    updateAllReportsState()
  }

  /**
   * 전체 보고서 선택 상태 업데이트
   * 모든 팀 체크박스가 체크되면 전체 보고서 체크박스도 체크됨
   */
  function updateAllReportsState() {
    let allSubmittersChecked = true

    // 모든 팀이 체크되었는지 확인
    for (const submitterId in submitters.value) {
      if (submitters.value[submitterId].selectAll === false) {
        allSubmittersChecked = false
        break
      }
    }

    // 전체 보고서 체크박스 상태 업데이트
    selectAllReports.value = allSubmittersChecked
  }

  /**
   * 전체 보고서 선택/해제 함수
   * [동작 1] 전체 보고서 체크박스 클릭 시 모든 팀과 개별 보고서가 체크됨
   *
   * @param {boolean} value - 체크박스 설정 값(true/false)
   */
  function updateAllReports(value) {
    // 전체 보고서 선택 상태 업데이트
    selectAllReports.value = value

    // 모든 팀과 개별 보고서 체크박스 업데이트
    for (const submitterId in submitters.value) {
      // 팀 체크박스 업데이트
      submitters.value[submitterId].selectAll = value

      // [동작 2] 팀 내 모든 개별 보고서 체크박스 업데이트
      updateAllTerms(submitterId, value)
    }
  }

  /**
   * 체크 박스 토글 이벤트
   */
  function toggleOrg(team) {
    // console.log(submitters.value[team].toggleOrg)
    submitters.value[team].toggleOrg = !submitters.value[team].toggleOrg
  }

  // ================== 함수 ==================
  // 카드 추가 모달 열기
  function openCardModal(params) {
    selectedCategoryId.value = params.categoryId
    isCardModalOpen.value = true
  }

  // 카드 상세 모달 열기
  function openCardDetail(card) {
    selectedCard.value = card
    isCardDetailOpen.value = true
  }

  // 첨부파일 모달 열기
  function openAttachmentModal() {
    isAttachmentModalOpen.value = true
  }

  // 직원 찾기 모달 열기
  function openOrganizationUserSelector() {
    isOrganizationUserSelectorOpen.value = true
  }

  // 카드 저장
  function saveCard() {
    // 저장할 데이터 준비 - 실제 입력된 모든 필드 포함
    const dataToSave = {
      categoryId: selectedCategoryId.value,
      title: selectedCard.value?.title || '새 카드', // 기본 제목
      executePeriod: executePeriod.value,
      cooperators: selectedCooperators.value,
      sharers: selectedSharers.value,
      content: cardContent.value,
      tags: selectedCard.value?.tags || [],
      date: selectedCard.value?.date || new Date().toISOString().split('T')[0],
      activityDate: activityDate.value,
      activityStatus: activityStatus.value,
      activitySatisfaction: activitySatisfaction.value,
      attachments: uploadedFiles.value.length + googleDriveFiles.value.length,
      comments: selectedCard.value?.comments || 0
    }

    // 모달 닫기
    isCardModalOpen.value = false

    // 상위 컴포넌트로 이벤트 발생 - 데이터 포함
    emit('save-card', dataToSave)
  }

  // 첨부파일 저장
  function saveAttachments() {
    isAttachmentModalOpen.value = false
  }

  // 보고서 설정 모달 열기
  function openReportConfigModal() {
    reportConfigModal.value = true
  }

  // 보고서 생성 모달 열기
  function openAiReportModal() {
    aiReportModal.value = true
  }

  // 취합 대상 보고서 선택 모달 열기
  function openReportMergeModal() {
    reportMergeModal.value = true
  }

  // 보고서 생성 모달 열기
  function openReportCreateModal() {
    reportCreateModal.value = true
  }

  // 활동추가 모달 열기
  function openAddActivityPopup() {
    addActivityPopup.value = true
  }

  // AI 요약 전후 비교 모달 열기
  function openAiSummaryModal() {
    aiSummaryModal.value = true
  }

  // 담당자 선택 모달 열기
  function openUserSelectModal() {
    showUserSelectModal.value = true
  }

  // 참고 KPI 모달 열기
  function openReferenceKpiModal() {
    isReferenceKpiModalOpen.value = true
  }

  // 외부에서 접근 가능하도록 노출
  defineExpose({
    openCardModal,
    openCardDetail,
    openAttachmentModal,
    openOrganizationUserSelector,
    isCardModalOpen,
    isCardDetailOpen,
    isAttachmentModalOpen,
    isOrganizationUserSelectorOpen,
    selectedCard
  })
</script>

<style lang="scss" scoped>
  h1 {
    font-size: 24px;
    font-weight: 600;
    color: #222222;
    margin-bottom: 20px;
    border-bottom: 1px solid #e5e7eb;
  }
</style>
