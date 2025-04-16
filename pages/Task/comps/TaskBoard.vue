<template>
  <div class="task-board-page">
    <!-- 헤더 컴포넌트 사용 -->
    <TaskBoardHeader @add-category="addNewCategory" />

    <!-- 보드 컨텐츠 -->
    <section class="board-content">
      <ul class="categories-container">
        <!-- 빈 카테고리 -->
        <div v-if="categories.length === 0" class="empty-category full">
          <div class="welcome-message">
            <p>환영합니다.</p>
            <p>업무등록을 위한 보드를 생성해보세요.</p>
            <UiButton variant="primary" class="create-board-btn" @click="addNewCategory">
              업무 보드 생성하기
            </UiButton>
          </div>
        </div>
        <!-- 카테고리가 있는 경우 -->
        <CategoryColumn
          v-for="category in categories"
          :key="category.id"
          :title="category.title"
          @add-board="openCardModal(category.id)"
          @open-menu="openCategoryMenu"
        >
          <!-- 카드가 있는 경우 -->
          <div v-if="category.cards.length > 0">
            <CategoryCard
              v-for="card in category.cards"
              :key="card.id"
              :title="card.title"
              :tags="card.tags"
              :date="card.date"
              :comments="card.comments"
              :attachments="card.attachments"
              :cardId="card.id"
              @click="openCardDetail(card)"
              @openInNewWindow="detachCardModal(card)"
            />
          </div>
          <!-- 카드가 없는 경우 -->
          <div v-else>
            <div class="empty-category">
              <div class="add-card-placeholder" @click="openCardModal(category.id)">
                <div class="add-placeholder-icon">
                  <Icon name="mdi:plus" size="24" />
                </div>
                <p>
                  해당 카테고리의 <br />
                  첫 업무카드를 등록해보세요.
                </p>
              </div>
            </div>
          </div>
        </CategoryColumn>

        <!-- 카테고리가 0일때는 안보이고 하나 이상일때만 보임 -->
        <li class="category-column" v-if="categories.length > 0">
          <div class="category-header">
            <div class="category-actions">
              <UiButton variant="secondary" icon="heroicons:plus" @click="addNewCategory">
                카테고리 추가
              </UiButton>
            </div>
          </div>
        </li>
      </ul>
    </section>

    <!-- 카드 모달 -->
    <UiModal v-model="isCardModalOpen" position="right" title="카드 추가">
      <template #headerActions>
        <button class="edit-title-btn">
          <Icon name="mdi:pencil" size="16" />
        </button>
      </template>

      <UiAccordionMenu :menuItems="menuItems">
        <template #content-1>
          <UiFormLayout :showFooter="true">
            <UiFormItem label="카테고리" minWidth="min-w-10">
              <UiSelect placeholder="업무 보드명입니다." />
            </UiFormItem>
            <UiFormItem label="실행기간" minWidth="min-w-10">
              <UiDatePicker isRange />
            </UiFormItem>
            <UiFormItem label="협업" minWidth="min-w-10">
              <div class="flex gap-5">
                <UiMultiSelect
                  placeholder="협업자 이름을 입력해주세요"
                  :options="departmentOptions"
                />
                <UiButton
                  variant="secondary"
                  icon-only
                  @click="isOrganizationUserSelectorOpen = true"
                >
                  <Icon name="heroicons:user" size="20" />
                </UiButton>
                <UiButton variant="tertiary" icon-only>
                  <Icon name="heroicons:magnifying-glass" size="20" />
                </UiButton>
              </div>
            </UiFormItem>
            <UiFormItem label="공유" minWidth="min-w-10">
              <div class="flex gap-5">
                <UiMultiSelect
                  placeholder="공유자 이름을 입력해주세요"
                  :options="departmentOptions"
                />
                <UiButton variant="tertiary" icon-only>
                  <Icon name="heroicons:user" size="20" />
                </UiButton>
                <UiButton variant="tertiary" icon-only>
                  <Icon name="heroicons:magnifying-glass" size="20" />
                </UiButton>
              </div>
            </UiFormItem>
            <UiFormItem label="내용" minWidth="min-w-10">
              <UiTextarea placeholder="업무에 대한 구체적인 내용을 입력해주세요." />
            </UiFormItem>

            <template #footerActions>
              <div class="flex gap-5 justify-end">
                <UiButton>등록</UiButton>
                <UiButton variant="tertiary">취소</UiButton>
              </div>
            </template>
          </UiFormLayout>
        </template>
        <template #content-2>
          <div class="activity-content">
            <div class="flex justify-between gap-5 mb-4">
              <div class="flex gap-10 items-center">
                <p class="flex-none">일자</p>
                <UiDatePicker placeholder="날짜 선택" />
              </div>
              <div class="flex gap-20 items-center">
                <p class="flex-none">업무상태</p>
                <UiSelect placeholder="선택하세요" class="w-200" />
                <p class="flex-none">진행만족도</p>
                <UiSelect placeholder="선택하세요" class="w-200" />
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
              <button class="attachment-btn">
                <Icon name="heroicons:paper-clip" size="20" @click="openAttachmentModal" />
              </button>
              <UiButton variant="primary" @click="saveCard">저장</UiButton>
            </div>
          </div>
        </template>
      </UiAccordionMenu>
    </UiModal>

    <!-- 카드 상세 모달 -->
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

    <!-- 분리된 카드 모달 (여러 개) -->
    <div
      v-for="(detachedCardItem, index) in detachedCards"
      :key="detachedCardItem.id"
      class="detached-modal"
      :style="detachedCardItem.style"
      :ref="
        el => {
          if (el) detachedModalsRefs[detachedCardItem.id] = el
        }
      "
    >
      <div class="detached-modal-header" @mousedown="startDrag($event, detachedCardItem.id)">
        <h3 class="detached-modal-title">{{ detachedCardItem.card.title }}</h3>
        <div class="detached-modal-actions">
          <button class="detached-modal-btn" @click="toggleDetachedModalSize(detachedCardItem.id)">
            <Icon
              :name="detachedCardItem.isMaximized ? 'mdi:arrow-collapse' : 'mdi:arrow-expand'"
              size="16"
            />
          </button>
          <button class="detached-modal-btn" @click="closeDetachedModal(detachedCardItem.id)">
            <Icon name="mdi:close" size="16" />
          </button>
        </div>
      </div>

      <div class="detached-modal-body">
        <div class="card-detail">
          <div class="card-detail-header">
            <div class="card-detail-tags">
              <UiTag v-for="(tag, index) in detachedCardItem.card.tags" :key="index" :text="tag" />
            </div>
          </div>

          <div class="card-detail-info">
            <div class="info-item">
              <span class="info-label">기간</span>
              <span class="info-value">{{ detachedCardItem.card.date }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">댓글</span>
              <span class="info-value">{{ detachedCardItem.card.comments }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">첨부파일</span>
              <span class="info-value">{{ detachedCardItem.card.attachments }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 크기 조절 핸들 -->
      <div
        class="resize-handle resize-handle-se"
        @mousedown.stop="startResize($event, detachedCardItem.id, 'se')"
      ></div>
      <div
        class="resize-handle resize-handle-sw"
        @mousedown.stop="startResize($event, detachedCardItem.id, 'sw')"
      ></div>
      <div
        class="resize-handle resize-handle-ne"
        @mousedown.stop="startResize($event, detachedCardItem.id, 'ne')"
      ></div>
      <div
        class="resize-handle resize-handle-nw"
        @mousedown.stop="startResize($event, detachedCardItem.id, 'nw')"
      ></div>
      <div
        class="resize-handle resize-handle-n"
        @mousedown.stop="startResize($event, detachedCardItem.id, 'n')"
      ></div>
      <div
        class="resize-handle resize-handle-s"
        @mousedown.stop="startResize($event, detachedCardItem.id, 's')"
      ></div>
      <div
        class="resize-handle resize-handle-e"
        @mousedown.stop="startResize($event, detachedCardItem.id, 'e')"
      ></div>
      <div
        class="resize-handle resize-handle-w"
        @mousedown.stop="startResize($event, detachedCardItem.id, 'w')"
      ></div>
    </div>

    <!-- 첨부파일 모달 -->
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

    <!-- 직원 찾기 모달 -->
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
  import { ref, onMounted, onUnmounted, reactive } from 'vue'
  import TaskBoardHeader from './TaskBoardHeader.vue'
  import CategoryColumn from './CategoryColumn.vue'
  import CategoryCard from './CategoryCard.vue'
  import UiModal from '@/components/UI/UiModal.vue'
  import UiTag from '@/components/UI/UiTag.vue'
  import UiAttachmentAccordion from '~/components/UI/UiAttachment.vue'
  import OrganizationUserSelector from '~/components/domain/OrganizationUserSelector.vue'

  // 카테고리 목록 데이터 - 각 카테고리에는 ID, 제목, 카드 배열이 포함됨
  const categories = ref([])

  // 카드 추가 아코디언 메뉴
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

  // 협업 공유 멀티셀렉트
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

  // 첨부파일 모달 상태 관리
  const isAttachmentModalOpen = ref(false)

  // 직원 찾기 모달 상태 관리
  const isOrganizationUserSelectorOpen = ref(false)

  // 카드 모달 상태 관리 - 카드 추가/편집을 위한 모달 표시 여부
  const isCardModalOpen = ref(false)
  const isCardDetailOpen = ref(false)
  const selectedCard = ref(null)

  // 분리된 모달 상태 관리 (여러 개)
  const detachedCards = ref([])
  const detachedModalsRefs = reactive({})

  // 드래그 관련 상태
  let isDragging = false
  let dragCardId = null
  let dragOffset = { x: 0, y: 0 }

  // 리사이즈 관련 상태
  let isResizing = false
  let resizeCardId = null
  let resizeDirection = ''
  let resizeStartPosition = { x: 0, y: 0 }
  let resizeStartSize = { width: 0, height: 0 }
  let resizeStartModalPosition = { x: 0, y: 0 }

  // 첨부파일 관련 상태
  const uploadedFiles = ref([])
  const googleDriveFiles = ref([])

  // 카드 입력 관련 상태
  const cardTitle = ref('')
  const selectedTags = ref([])
  const selectedCategoryId = ref(null)

  // 첨부파일 모달 열기 함수
  function openAttachmentModal() {
    isAttachmentModalOpen.value = true
  }

  // 카드 모달 열기 함수 - 카드 추가 또는 편집 시 모달을 표시
  function openCardModal(categoryId) {
    console.log('카드 모달 열기 - 카테고리 ID:', categoryId)
    selectedCategoryId.value = categoryId
    isCardModalOpen.value = true

    // 입력 필드 초기화
    cardTitle.value = ''
    selectedTags.value = []
  }

  // 카드 상세 모달 열기
  function openCardDetail(card) {
    selectedCard.value = card
    isCardDetailOpen.value = true
  }

  // 카드 모달 분리하기
  function detachCardModal(card) {
    if (!card) return

    // 이미 분리된 카드인지 확인
    const existingCardIndex = detachedCards.value.findIndex(item => item.card.id === card.id)

    if (existingCardIndex !== -1) {
      // 이미 분리된 카드가 있으면 포커스만 주기
      // 나중에 z-index 조정 등의 기능 추가 가능
      return
    }

    // 기존 모달 닫기
    isCardDetailOpen.value = false

    // 모달 위치 계산 (이미 있는 모달과 겹치지 않게)
    const offset = detachedCards.value.length * 30
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    // 새 분리 모달 생성
    const newDetachedCard = {
      id: `detached-${card.id}-${Date.now()}`, // 고유 ID 생성
      card: { ...card }, // 카드 데이터 복사
      position: {
        x: Math.min((windowWidth - 500) / 2 + offset, windowWidth - 550),
        y: Math.min((windowHeight - 600) / 2 + offset, windowHeight - 650)
      },
      size: {
        width: 500,
        height: 600
      },
      isMaximized: false,
      originalSize: {
        width: 500,
        height: 600
      },
      originalPosition: {
        x: (windowWidth - 500) / 2 + offset,
        y: (windowHeight - 600) / 2 + offset
      },
      style: {
        left: `${Math.min((windowWidth - 500) / 2 + offset, windowWidth - 550)}px`,
        top: `${Math.min((windowHeight - 600) / 2 + offset, windowHeight - 650)}px`,
        width: '500px',
        height: '600px',
        zIndex: 1000 + detachedCards.value.length
      }
    }

    // 분리된 모달 목록에 추가
    detachedCards.value.push(newDetachedCard)
  }

  // 분리된 모달 닫기
  function closeDetachedModal(cardId) {
    const index = detachedCards.value.findIndex(item => item.id === cardId)
    if (index !== -1) {
      detachedCards.value.splice(index, 1)
    }
  }

  // 분리된 모달 크기 토글 (최대화/원래 크기)
  function toggleDetachedModalSize(cardId) {
    const cardIndex = detachedCards.value.findIndex(item => item.id === cardId)
    if (cardIndex === -1) return

    const card = detachedCards.value[cardIndex]

    if (card.isMaximized) {
      // 원래 크기로 복원
      card.size = { ...card.originalSize }
      card.position = { ...card.originalPosition }
      card.isMaximized = false
    } else {
      // 현재 크기와 위치 저장
      card.originalSize = { ...card.size }
      card.originalPosition = { ...card.position }

      // 최대화
      card.size = {
        width: window.innerWidth - 40,
        height: window.innerHeight - 40
      }
      card.position = { x: 20, y: 20 }
      card.isMaximized = true
    }

    // 스타일 업데이트
    updateDetachedModalStyle(cardId)
  }

  // 드래그 시작
  function startDrag(event, cardId) {
    const cardIndex = detachedCards.value.findIndex(item => item.id === cardId)
    if (cardIndex === -1) return

    const card = detachedCards.value[cardIndex]
    if (card.isMaximized) return

    isDragging = true
    dragCardId = cardId

    // 마우스 위치와 모달 위치의 차이 계산
    dragOffset = {
      x: event.clientX - card.position.x,
      y: event.clientY - card.position.y
    }

    // 현재 모달을 최상위로 가져오기
    bringToFront(cardId)

    // 이벤트 기본 동작 방지
    event.preventDefault()
  }

  // 리사이즈 시작
  function startResize(event, cardId, direction) {
    const cardIndex = detachedCards.value.findIndex(item => item.id === cardId)
    if (cardIndex === -1) return

    const card = detachedCards.value[cardIndex]
    if (card.isMaximized) return

    isResizing = true
    resizeCardId = cardId
    resizeDirection = direction

    // 현재 마우스 위치 저장
    resizeStartPosition = {
      x: event.clientX,
      y: event.clientY
    }

    // 현재 모달 크기 저장
    resizeStartSize = {
      width: card.size.width,
      height: card.size.height
    }

    // 현재 모달 위치 저장
    resizeStartModalPosition = {
      x: card.position.x,
      y: card.position.y
    }

    // 현재 모달을 최상위로 가져오기
    bringToFront(cardId)

    // 이벤트 기본 동작 방지
    event.preventDefault()
  }

  // 모달을 최상위로 가져오기
  function bringToFront(cardId) {
    // 모든 모달의 z-index 확인
    let maxZIndex = 1000

    detachedCards.value.forEach(card => {
      const zIndex = parseInt(card.style.zIndex)
      if (zIndex > maxZIndex) {
        maxZIndex = zIndex
      }
    })

    // 선택된 모달의 z-index를 최대값 + 1로 설정
    const cardIndex = detachedCards.value.findIndex(item => item.id === cardId)
    if (cardIndex !== -1) {
      detachedCards.value[cardIndex].style.zIndex = (maxZIndex + 1).toString()
    }
  }

  // 마우스 이동 처리
  function handleMouseMove(event) {
    if (isDragging && dragCardId) {
      const cardIndex = detachedCards.value.findIndex(item => item.id === dragCardId)
      if (cardIndex === -1) return

      const card = detachedCards.value[cardIndex]

      // 새 위치 계산
      const newX = event.clientX - dragOffset.x
      const newY = event.clientY - dragOffset.y

      // 화면 경계 체크
      const maxX = window.innerWidth - card.size.width
      const maxY = window.innerHeight - card.size.height

      // 위치 업데이트 (화면 내에 유지)
      card.position = {
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      }

      // 스타일 업데이트
      updateDetachedModalStyle(dragCardId)
    } else if (isResizing && resizeCardId) {
      const cardIndex = detachedCards.value.findIndex(item => item.id === resizeCardId)
      if (cardIndex === -1) return

      const card = detachedCards.value[cardIndex]

      // 마우스 이동 거리 계산
      const deltaX = event.clientX - resizeStartPosition.x
      const deltaY = event.clientY - resizeStartPosition.y

      // 최소 크기
      const minWidth = 300
      const minHeight = 200

      // 방향에 따라 크기와 위치 조정
      switch (resizeDirection) {
        case 'se': // 우측 하단
          card.size = {
            width: Math.max(minWidth, resizeStartSize.width + deltaX),
            height: Math.max(minHeight, resizeStartSize.height + deltaY)
          }
          break
        case 'sw': // 좌측 하단
          const newWidthSw = Math.max(minWidth, resizeStartSize.width - deltaX)
          card.position = {
            x: resizeStartModalPosition.x - (newWidthSw - resizeStartSize.width),
            y: resizeStartModalPosition.y
          }
          card.size = {
            width: newWidthSw,
            height: Math.max(minHeight, resizeStartSize.height + deltaY)
          }
          break
        case 'ne': // 우측 상단
          const newHeightNe = Math.max(minHeight, resizeStartSize.height - deltaY)
          card.position = {
            x: resizeStartModalPosition.x,
            y: resizeStartModalPosition.y - (newHeightNe - resizeStartSize.height)
          }
          card.size = {
            width: Math.max(minWidth, resizeStartSize.width + deltaX),
            height: newHeightNe
          }
          break
        case 'nw': // 좌측 상단
          const newWidthNw = Math.max(minWidth, resizeStartSize.width - deltaX)
          const newHeightNw = Math.max(minHeight, resizeStartSize.height - deltaY)
          card.position = {
            x: resizeStartModalPosition.x - (newWidthNw - resizeStartSize.width),
            y: resizeStartModalPosition.y - (newHeightNw - resizeStartSize.height)
          }
          card.size = {
            width: newWidthNw,
            height: newHeightNw
          }
          break
        case 'n': // 상단
          const newHeightN = Math.max(minHeight, resizeStartSize.height - deltaY)
          card.position = {
            x: resizeStartModalPosition.x,
            y: resizeStartModalPosition.y - (newHeightN - resizeStartSize.height)
          }
          card.size = {
            width: resizeStartSize.width,
            height: newHeightN
          }
          break
        case 's': // 하단
          card.size = {
            width: resizeStartSize.width,
            height: Math.max(minHeight, resizeStartSize.height + deltaY)
          }
          break
        case 'e': // 우측
          card.size = {
            width: Math.max(minWidth, resizeStartSize.width + deltaX),
            height: resizeStartSize.height
          }
          break
        case 'w': // 좌측
          const newWidthW = Math.max(minWidth, resizeStartSize.width - deltaX)
          card.position = {
            x: resizeStartModalPosition.x - (newWidthW - resizeStartSize.width),
            y: resizeStartModalPosition.y
          }
          card.size = {
            width: newWidthW,
            height: resizeStartSize.height
          }
          break
      }

      // 스타일 업데이트
      updateDetachedModalStyle(resizeCardId)
    }
  }

  // 마우스 업 처리
  function handleMouseUp() {
    isDragging = false
    isResizing = false
    dragCardId = null
    resizeCardId = null
  }

  // 분리된 모달 스타일 업데이트
  function updateDetachedModalStyle(cardId) {
    const cardIndex = detachedCards.value.findIndex(item => item.id === cardId)
    if (cardIndex === -1) return

    const card = detachedCards.value[cardIndex]

    card.style = {
      ...card.style,
      left: `${card.position.x}px`,
      top: `${card.position.y}px`,
      width: `${card.size.width}px`,
      height: `${card.size.height}px`
    }
  }

  // 새 카테고리 추가 함수 - 카테고리 목록에 새 카테고리를 추가
  function addNewCategory() {
    // 새 카테고리 객체 생성 및 추가
    console.log('새 카테고리 추가')
    categories.value.push({
      id: categories.value.length + 1,
      title: '카테고리 ' + (categories.value.length + 1),
      cards: []
    })
  }

  function saveCard() {
    console.log('카드 저장 - UI 변경만 적용')
    isCardModalOpen.value = false

    // 선택된 카테고리 찾기 (첫 번째 카테고리를 기본값으로 사용)
    const targetCategory =
      categories.value.find(category => category.id === selectedCategoryId.value) ||
      categories.value[0]

    if (targetCategory) {
      // 새 카드 객체 생성 및 추가 (UI 변경만)
      const newCard = {
        id: Date.now(), // 고유 ID 생성
        title: cardTitle.value || '새 업무 카드',
        tags: selectedTags.value || [],
        date: new Date().toISOString().split('T')[0],
        comments: 0,
        attachments: 0
      }

      console.log('UI에 추가될 카드:', newCard)
      console.log('대상 카테고리:', targetCategory.title)

      // UI에만 카드 추가
      targetCategory.cards.push(newCard)

      // 카드 입력 필드 초기화
      cardTitle.value = ''
      selectedTags.value = []
    } else if (categories.value.length === 0) {
      console.log('카테고리가 없음 - 새 카테고리와 카드 UI만 생성')

      // 새 카드 객체
      const newCard = {
        id: Date.now(),
        title: cardTitle.value || '새 업무 카드',
        tags: selectedTags.value || [],
        date: new Date().toISOString().split('T')[0],
        comments: 0,
        attachments: 0
      }

      // UI에만 카테고리와 카드 추가
      categories.value.push({
        id: 1,
        title: '카테고리 1',
        cards: [newCard]
      })

      // 카드 입력 필드 초기화
      cardTitle.value = ''
      selectedTags.value = []
    }
  }

  // 이벤트 리스너 등록 및 해제
  onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
  })
</script>
