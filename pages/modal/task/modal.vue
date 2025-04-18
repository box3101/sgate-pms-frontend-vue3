<template>
  <div class="modal-buttons flex gap-5" style="display: none">
    <UiButton @click="openCardModal">카드 추가</UiButton>
    <UiButton @click="openCardDetail">카드 상세</UiButton>
    <UiButton @click="openAttachmentModal">첨부파일</UiButton>
    <UiButton @click="openOrganizationUserSelector">직원 찾기</UiButton>
    <UiButton @click="openReportConfigModal">보고서 설정</UiButton>
    <UiButton @click="openAiReportModal">AI 취업 보고서 생성</UiButton>
    <UiButton @click="openReportMergeModal">취합 대상 보고서 선택</UiButton>
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
            <UiFormItem label="카테고리" minWidth="min-w-10">
              <UiSelect placeholder="업무 보드명입니다." v-model="selectedCategoryId" />
            </UiFormItem>
            <UiFormItem label="실행기간" minWidth="min-w-10">
              <UiDatePicker isRange v-model="executePeriod" />
            </UiFormItem>
            <UiFormItem label="협업" minWidth="min-w-10">
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
            <UiFormItem label="공유" minWidth="min-w-10">
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
            <UiFormItem label="내용" minWidth="min-w-10">
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
            <UiFormItem label="카테고리" minWidth="min-w-10">
              <UiSelect placeholder="업무 보드명입니다." v-model="selectedCategoryId" />
            </UiFormItem>
            <UiFormItem label="실행기간" minWidth="min-w-10">
              <UiDatePicker isRange v-model="executePeriod" />
            </UiFormItem>
            <UiFormItem label="협업" minWidth="min-w-10">
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
            <UiFormItem label="공유" minWidth="min-w-10">
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
            <UiFormItem label="내용" minWidth="min-w-10">
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
            <UiCheckbox
              v-model="selectAllReports"
              label="전체 보고서 선택"
              size="large"
              class="mt-10"
              @update:modelValue="updateAllReports"
            />
            <div class="sub-checkboxes">
              <div class="report-submitter">
                <div class="submitter-header">
                  <UiCheckbox
                    v-model="selectAllTerms"
                    label="이찬용 선임(UI/UX)"
                    size="large"
                    @update:modelValue="updateSelectAll"
                  />
                </div>
                <div class="report-submitter-list flex flex-col gap-10">
                  <UiCheckbox
                    v-model="termsCheckboxes.service"
                    label="이찬용 선임(UI/UX) - 2025.03.19"
                    size="medium"
                    @update:modelValue="updateSelectAll"
                  />
                  <UiCheckbox
                    v-model="termsCheckboxes.privacy"
                    label="이찬용 선임(UI/UX) - 2025.03.20"
                    size="medium"
                    @update:modelValue="updateSelectAll"
                  />
                  <UiCheckbox
                    v-model="termsCheckboxes.terms"
                    label="이찬용 선임(UI/UX) - 2025.03.21"
                    size="medium"
                    @update:modelValue="updateSelectAll"
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

  // ================== 상태 변수 ==================
  const isCardModalOpen = ref(false)
  const isCardDetailOpen = ref(false)
  const isAttachmentModalOpen = ref(false)
  const isOrganizationUserSelectorOpen = ref(false)
  const selectedCard = ref(null)
  const reportConfigModal = ref(false)
  const aiReportModal = ref(false)
  const reportMergeModal = ref(false)

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

  // 체크박스 상태 관리
  const selectAllTerms = ref(false)
  const selectAllReports = ref(false)
  const termsCheckboxes = ref({
    service: false,
    privacy: false,
    terms: false
  })

  // 전체 선택/해제 함수
  function updateAllTerms(value) {
    Object.keys(termsCheckboxes.value).forEach(key => {
      termsCheckboxes.value[key] = value
    })
  }

  // 개별 체크박스 변경 시 전체 선택 상태 업데이트
  function updateSelectAll() {
    selectAllTerms.value = Object.values(termsCheckboxes.value).every(val => val === true)
    updateAllReportsState()
  }

  // 전체 보고서 선택 업데이트
  function updateAllReports(value) {
    selectAllTerms.value = value
    updateAllTerms(value)
  }

  // 전체 보고서 상태 확인
  function updateAllReportsState() {
    selectAllReports.value = selectAllTerms.value
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

<style lang="scss" scoped></style>
