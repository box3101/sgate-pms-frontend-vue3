<template>
  <div class="modal-buttons flex gap-5" style="display: none">
    <UiButton @click="openCardModal">카드 추가</UiButton>
    <UiButton @click="openCardDetail">카드 상세</UiButton>
    <UiButton @click="openAttachmentModal">첨부파일</UiButton>
    <UiButton @click="openOrganizationUserSelector">직원 찾기</UiButton>
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
        <button class="detach-modal-btn" @click="detachCardModal(selectedCard)">
          <Icon name="mdi:arrow-expand" size="16" />
        </button>
      </template>
      <div v-if="selectedCard" class="card-detail">
        <div class="card-detail-header">
          <h2 class="card-detail-title">{{ selectedCard.title }}</h2>
          <div class="card-detail-tags">
            <UiTag v-for="(tag, index) in selectedCard.tags" :key="index" :text="tag" />
          </div>
        </div>
        <div class="card-detail-content">
          <div class="card-detail-info">
            <div class="info-item">
              <span class="info-label">기간</span>
              <span class="info-value">{{ selectedCard.date }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">댓글</span>
              <span class="info-value">{{ selectedCard.comments }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">첨부파일</span>
              <span class="info-value">{{ selectedCard.attachments }}</span>
            </div>
          </div>
        </div>
      </div>
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
      size="xlarge"
      :show-footer="true"
    >
      <OrganizationUserSelector />
      <template #footerActions>
        <UiButton>저장</UiButton>
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
  import UiTag from '@/components/UI/UiTag.vue'
  import UiAttachmentAccordion from '@/components/UI/UiAttachment.vue'
  import OrganizationUserSelector from '@/components/domain/OrganizationUserSelector.vue'

  // ================== 상태 변수 ==================
  const isCardModalOpen = ref(false)
  const isCardDetailOpen = ref(false)
  const isAttachmentModalOpen = ref(false)
  const isOrganizationUserSelectorOpen = ref(false)
  const selectedCard = ref(null)
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

  // 카드 상세 모달 분리
  function detachCardModal(card) {
    isCardDetailOpen.value = false
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
