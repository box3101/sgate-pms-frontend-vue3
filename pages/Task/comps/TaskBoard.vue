<template>
  <div class="task-board-page">
    <!-- 헤더 컴포넌트 사용 -->
    <TaskBoardHeader @add-category="addNewCategory" />

    <!-- 보드 컨텐츠 -->
    <section class="board-content">
      <ul class="categories-container">
        <!-- 빈 카테고리 -->
        <div v-if="categories.length === 0" class="empty-category">
          <div class="add-category-placeholder" @click="addNewCategory">
            <div class="add-placeholder-icon">
              <Icon name="mdi:plus" size="24" />
            </div>
            <p>새 카테고리 추가하기</p>
          </div>
        </div>
        <!-- 카테고리가 있는 경우 -->
        <CategoryColumn
          v-for="category in categories"
          :key="category.id"
          :title="category.title"
          @add-board="openCardModal"
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
              <div class="add-card-placeholder" @click="openCardModal">
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
      </ul>
    </section>

    <!-- 카드 모달 -->
    <UiModal
      v-model="isCardModalOpen"
      position="right"
      title="카드 추가"
    >
      <template #headerActions>
        <button class="edit-title-btn">
          <Icon name="mdi:pencil" size="16" />
        </button>
      </template>
    </UiModal>
    
    <!-- 카드 상세 모달 -->
    <UiModal
      v-model="isCardDetailOpen"
      position="right"
      title="카드 상세"
      size="medium"
    >
      <template #headerActions>
        <button class="detach-modal-btn" @click="detachCardModal(selectedCard)">
          <Icon name="mdi:arrow-expand" size="16" />
        </button>
      </template>
      
      <div v-if="selectedCard" class="card-detail">
        <div class="card-detail-header">
          <h2 class="card-detail-title">{{ selectedCard.title }}</h2>
          <div class="card-detail-tags">
            <UiTag
              v-for="(tag, index) in selectedCard.tags"
              :key="index"
              :text="tag"
              size="small"
            />
          </div>
        </div>
        
        <div class="card-detail-info">
          <div class="info-item">
            <span class="info-label">기간</span>
            <span class="info-value">{{ selectedCard.date }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">댓글</span>
            <span class="info-value">{{ selectedCard.comments || 0 }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">첨부파일</span>
            <span class="info-value">{{ selectedCard.attachments || 0 }}</span>
          </div>
        </div>
        
        <div class="card-detail-content">
          <!-- 여기에 카드 상세 내용 추가 -->
          <p>카드 상세 내용이 표시됩니다.</p>
        </div>
      </div>
    </UiModal>

    <!-- 분리된 카드 모달 (여러 개) -->
    <div 
      v-for="(detachedCardItem, index) in detachedCards"
      :key="detachedCardItem.id"
      class="detached-modal"
      :style="detachedCardItem.style"
      :ref="el => { if (el) detachedModalsRefs[detachedCardItem.id] = el }"
    >
      <div 
        class="detached-modal-header" 
        @mousedown="startDrag($event, detachedCardItem.id)"
      >
        <h3 class="detached-modal-title">{{ detachedCardItem.card.title }}</h3>
        <div class="detached-modal-actions">
          <button class="detached-modal-btn" @click="toggleDetachedModalSize(detachedCardItem.id)">
            <Icon :name="detachedCardItem.isMaximized ? 'mdi:arrow-collapse' : 'mdi:arrow-expand'" size="16" />
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
              <UiTag
                v-for="(tag, index) in detachedCardItem.card.tags"
                :key="index"
                :text="tag"
                size="small"
              />
            </div>
          </div>
          
          <div class="card-detail-info">
            <div class="info-item">
              <span class="info-label">기간</span>
              <span class="info-value">{{ detachedCardItem.card.date }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">댓글</span>
              <span class="info-value">{{ detachedCardItem.card.comments || 0 }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">첨부파일</span>
              <span class="info-value">{{ detachedCardItem.card.attachments || 0 }}</span>
            </div>
          </div>
          
          <div class="card-detail-content">
            <!-- 여기에 카드 상세 내용 추가 -->
            <p>카드 상세 내용이 표시됩니다.</p>
          </div>
        </div>
      </div>
      
      <!-- 크기 조절 핸들 -->
      <div class="resize-handle resize-handle-se" @mousedown.stop="startResize($event, detachedCardItem.id, 'se')"></div>
      <div class="resize-handle resize-handle-sw" @mousedown.stop="startResize($event, detachedCardItem.id, 'sw')"></div>
      <div class="resize-handle resize-handle-ne" @mousedown.stop="startResize($event, detachedCardItem.id, 'ne')"></div>
      <div class="resize-handle resize-handle-nw" @mousedown.stop="startResize($event, detachedCardItem.id, 'nw')"></div>
      <div class="resize-handle resize-handle-n" @mousedown.stop="startResize($event, detachedCardItem.id, 'n')"></div>
      <div class="resize-handle resize-handle-s" @mousedown.stop="startResize($event, detachedCardItem.id, 's')"></div>
      <div class="resize-handle resize-handle-e" @mousedown.stop="startResize($event, detachedCardItem.id, 'e')"></div>
      <div class="resize-handle resize-handle-w" @mousedown.stop="startResize($event, detachedCardItem.id, 'w')"></div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, reactive } from "vue";
import TaskBoardHeader from "./TaskBoardHeader.vue";
import CategoryColumn from "./CategoryColumn.vue";
import CategoryCard from "./CategoryCard.vue";
import UiModal from "@/components/UI/UiModal.vue";
import UiTag from "@/components/UI/UiTag.vue";

// 카테고리 목록 데이터 - 각 카테고리에는 ID, 제목, 카드 배열이 포함됨
const categories = ref([
  {
    id: 1,
    title: "기획",
    cards: [
      {
        id: 1,
        title: "디자인 리뉴얼 프로젝트",
        tags: ["디자인", "프론트엔드", "UX"],
        date: "2023-05-10 ~ 2023-06-15",
        comments: 5,
        attachments: 3,
      },
      {
        id: 2,
        title: "API 개발 및 연동",
        tags: ["백엔드", "API"],
        date: "2023-05-20 ~ 2023-06-15",
        comments: 12,
        attachments: 2,
      },
      {
        id: 3,
        title: "프로토타입 개발",
        tags: ["개발", "테스트"],
        date: "2023-04-15 ~ 2023-05-10",
        comments: 3,
        attachments: 1,
      },
      {
        id: 11,
        title: "사용자 요구사항 정의",
        tags: ["기획", "분석"],
        date: "2023-04-01 ~ 2023-04-20",
        comments: 8,
        attachments: 5,
      },
      {
        id: 12,
        title: "경쟁사 분석 리포트",
        tags: ["리서치", "분석"],
        date: "2023-03-15 ~ 2023-04-05",
        comments: 4,
        attachments: 7,
      }
    ]
  },
  {
    id: 2,
    title: "디자인",
    cards: [
      {
        id: 4,
        title: "사용자 피드백 수집 및 분석",
        tags: ["리서치", "UX"],
        date: "2023-06-01 ~ 2023-06-30",
        comments: 8,
        attachments: 5,
      },
      {
        id: 5,
        title: "UI 컴포넌트 개발",
        tags: ["프론트엔드", "디자인"],
        date: "2023-05-15 ~ 2023-06-10",
        comments: 6,
        attachments: 3,
      },
      {
        id: 13,
        title: "디자인 시스템 구축",
        tags: ["디자인", "시스템"],
        date: "2023-05-05 ~ 2023-06-15",
        comments: 9,
        attachments: 6,
      },
      {
        id: 14,
        title: "프로토타입 사용성 테스트",
        tags: ["UX", "테스트"],
        date: "2023-06-10 ~ 2023-06-25",
        comments: 7,
        attachments: 2,
      }
    ]
  },
  {
    id: 3,
    title: "개발",
    cards: [
      {
        id: 6,
        title: "요구사항 분석",
        tags: ["기획", "분석"],
        date: "2023-03-20 ~ 2023-04-10",
        comments: 4,
        attachments: 2,
      },
      {
        id: 7,
        title: "기획서 작성",
        tags: ["기획", "문서"],
        date: "2023-04-01 ~ 2023-04-15",
        comments: 7,
        attachments: 4,
      },
      {
        id: 15,
        title: "백엔드 아키텍처 설계",
        tags: ["백엔드", "설계"],
        date: "2023-04-20 ~ 2023-05-10",
        comments: 10,
        attachments: 5,
      },
      {
        id: 16,
        title: "데이터베이스 모델링",
        tags: ["데이터", "설계"],
        date: "2023-04-15 ~ 2023-05-05",
        comments: 6,
        attachments: 3,
      },
      {
        id: 17,
        title: "API 엔드포인트 구현",
        tags: ["백엔드", "API"],
        date: "2023-05-10 ~ 2023-06-10",
        comments: 8,
        attachments: 4,
      }
    ]
  },
  {
    id: 4,
    title: "테스트",
    cards: [
      {
        id: 8,
        title: "성능 최적화",
        tags: ["개발", "최적화"],
        date: "2023-06-10 ~ 2023-06-25",
        comments: 2,
        attachments: 1,
      },
      {
        id: 18,
        title: "단위 테스트 작성",
        tags: ["테스트", "개발"],
        date: "2023-06-05 ~ 2023-06-20",
        comments: 5,
        attachments: 2,
      },
      {
        id: 19,
        title: "통합 테스트 수행",
        tags: ["테스트", "QA"],
        date: "2023-06-15 ~ 2023-06-30",
        comments: 7,
        attachments: 3,
      }
    ]
  },
  {
    id: 5,
    title: "배포",
    cards: [
      {
        id: 9,
        title: "서버 환경 구성",
        tags: ["인프라", "배포"],
        date: "2023-06-20 ~ 2023-07-05",
        comments: 3,
        attachments: 2,
      },
      {
        id: 20,
        title: "CI/CD 파이프라인 구축",
        tags: ["인프라", "자동화"],
        date: "2023-06-15 ~ 2023-07-10",
        comments: 6,
        attachments: 4,
      },
      {
        id: 21,
        title: "모니터링 시스템 구축",
        tags: ["인프라", "모니터링"],
        date: "2023-06-25 ~ 2023-07-15",
        comments: 4,
        attachments: 3,
      }
    ]
  },
  {
    id: 6,
    title: "완료",
    cards: [
      {
        id: 10,
        title: "프로젝트 회고",
        tags: ["회고", "문서화"],
        date: "2023-07-10 ~ 2023-07-15",
        comments: 5,
        attachments: 3,
      },
      {
        id: 22,
        title: "사용자 매뉴얼 작성",
        tags: ["문서화", "지원"],
        date: "2023-07-05 ~ 2023-07-20",
        comments: 3,
        attachments: 8,
      },
      {
        id: 23,
        title: "성과 측정 및 보고서 작성",
        tags: ["분석", "문서화"],
        date: "2023-07-15 ~ 2023-07-25",
        comments: 7,
        attachments: 5,
      }
    ]
  }
]);

// 카드 모달 상태 관리 - 카드 추가/편집을 위한 모달 표시 여부
const isCardModalOpen = ref(false);
const isCardDetailOpen = ref(false);
const selectedCard = ref(null);

// 분리된 모달 상태 관리 (여러 개)
const detachedCards = ref([]);
const detachedModalsRefs = reactive({});

// 드래그 관련 상태
let isDragging = false;
let dragCardId = null;
let dragOffset = { x: 0, y: 0 };

// 리사이즈 관련 상태
let isResizing = false;
let resizeCardId = null;
let resizeDirection = '';
let resizeStartPosition = { x: 0, y: 0 };
let resizeStartSize = { width: 0, height: 0 };
let resizeStartModalPosition = { x: 0, y: 0 };

// 카드 모달 열기 함수 - 카드 추가 또는 편집 시 모달을 표시
function openCardModal() {
  isCardModalOpen.value = true;
}

// 카드 상세 모달 열기
function openCardDetail(card) {
  selectedCard.value = card;
  isCardDetailOpen.value = true;
}

// 카드 모달 분리하기
function detachCardModal(card) {
  if (!card) return;
  
  // 이미 분리된 카드인지 확인
  const existingCardIndex = detachedCards.value.findIndex(item => item.card.id === card.id);
  
  if (existingCardIndex !== -1) {
    // 이미 분리된 카드가 있으면 포커스만 주기
    // 나중에 z-index 조정 등의 기능 추가 가능
    return;
  }
  
  // 기존 모달 닫기
  isCardDetailOpen.value = false;
  
  // 모달 위치 계산 (이미 있는 모달과 겹치지 않게)
  const offset = detachedCards.value.length * 30;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  
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
  };
  
  // 분리된 모달 목록에 추가
  detachedCards.value.push(newDetachedCard);
}

// 분리된 모달 닫기
function closeDetachedModal(cardId) {
  const index = detachedCards.value.findIndex(item => item.id === cardId);
  if (index !== -1) {
    detachedCards.value.splice(index, 1);
  }
}

// 분리된 모달 크기 토글 (최대화/원래 크기)
function toggleDetachedModalSize(cardId) {
  const cardIndex = detachedCards.value.findIndex(item => item.id === cardId);
  if (cardIndex === -1) return;
  
  const card = detachedCards.value[cardIndex];
  
  if (card.isMaximized) {
    // 원래 크기로 복원
    card.size = { ...card.originalSize };
    card.position = { ...card.originalPosition };
    card.isMaximized = false;
  } else {
    // 현재 크기와 위치 저장
    card.originalSize = { ...card.size };
    card.originalPosition = { ...card.position };
    
    // 최대화
    card.size = {
      width: window.innerWidth - 40,
      height: window.innerHeight - 40
    };
    card.position = { x: 20, y: 20 };
    card.isMaximized = true;
  }
  
  // 스타일 업데이트
  updateDetachedModalStyle(cardId);
}

// 드래그 시작
function startDrag(event, cardId) {
  const cardIndex = detachedCards.value.findIndex(item => item.id === cardId);
  if (cardIndex === -1) return;
  
  const card = detachedCards.value[cardIndex];
  if (card.isMaximized) return;
  
  isDragging = true;
  dragCardId = cardId;
  
  // 마우스 위치와 모달 위치의 차이 계산
  dragOffset = {
    x: event.clientX - card.position.x,
    y: event.clientY - card.position.y
  };
  
  // 현재 모달을 최상위로 가져오기
  bringToFront(cardId);
  
  // 이벤트 기본 동작 방지
  event.preventDefault();
}

// 리사이즈 시작
function startResize(event, cardId, direction) {
  const cardIndex = detachedCards.value.findIndex(item => item.id === cardId);
  if (cardIndex === -1) return;
  
  const card = detachedCards.value[cardIndex];
  if (card.isMaximized) return;
  
  isResizing = true;
  resizeCardId = cardId;
  resizeDirection = direction;
  
  // 현재 마우스 위치 저장
  resizeStartPosition = {
    x: event.clientX,
    y: event.clientY
  };
  
  // 현재 모달 크기 저장
  resizeStartSize = {
    width: card.size.width,
    height: card.size.height
  };
  
  // 현재 모달 위치 저장
  resizeStartModalPosition = {
    x: card.position.x,
    y: card.position.y
  };
  
  // 현재 모달을 최상위로 가져오기
  bringToFront(cardId);
  
  // 이벤트 기본 동작 방지
  event.preventDefault();
}

// 모달을 최상위로 가져오기
function bringToFront(cardId) {
  // 모든 모달의 z-index 확인
  let maxZIndex = 1000;
  
  detachedCards.value.forEach(card => {
    const zIndex = parseInt(card.style.zIndex);
    if (zIndex > maxZIndex) {
      maxZIndex = zIndex;
    }
  });
  
  // 선택된 모달의 z-index를 최대값 + 1로 설정
  const cardIndex = detachedCards.value.findIndex(item => item.id === cardId);
  if (cardIndex !== -1) {
    detachedCards.value[cardIndex].style.zIndex = (maxZIndex + 1).toString();
  }
}

// 마우스 이동 처리
function handleMouseMove(event) {
  if (isDragging && dragCardId) {
    const cardIndex = detachedCards.value.findIndex(item => item.id === dragCardId);
    if (cardIndex === -1) return;
    
    const card = detachedCards.value[cardIndex];
    
    // 새 위치 계산
    const newX = event.clientX - dragOffset.x;
    const newY = event.clientY - dragOffset.y;
    
    // 화면 경계 체크
    const maxX = window.innerWidth - card.size.width;
    const maxY = window.innerHeight - card.size.height;
    
    // 위치 업데이트 (화면 내에 유지)
    card.position = {
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    };
    
    // 스타일 업데이트
    updateDetachedModalStyle(dragCardId);
  } else if (isResizing && resizeCardId) {
    const cardIndex = detachedCards.value.findIndex(item => item.id === resizeCardId);
    if (cardIndex === -1) return;
    
    const card = detachedCards.value[cardIndex];
    
    // 마우스 이동 거리 계산
    const deltaX = event.clientX - resizeStartPosition.x;
    const deltaY = event.clientY - resizeStartPosition.y;
    
    // 최소 크기
    const minWidth = 300;
    const minHeight = 200;
    
    // 방향에 따라 크기와 위치 조정
    switch (resizeDirection) {
      case 'se': // 우측 하단
        card.size = {
          width: Math.max(minWidth, resizeStartSize.width + deltaX),
          height: Math.max(minHeight, resizeStartSize.height + deltaY)
        };
        break;
      case 'sw': // 좌측 하단
        const newWidthSw = Math.max(minWidth, resizeStartSize.width - deltaX);
        card.position = {
          x: resizeStartModalPosition.x - (newWidthSw - resizeStartSize.width),
          y: resizeStartModalPosition.y
        };
        card.size = {
          width: newWidthSw,
          height: Math.max(minHeight, resizeStartSize.height + deltaY)
        };
        break;
      case 'ne': // 우측 상단
        const newHeightNe = Math.max(minHeight, resizeStartSize.height - deltaY);
        card.position = {
          x: resizeStartModalPosition.x,
          y: resizeStartModalPosition.y - (newHeightNe - resizeStartSize.height)
        };
        card.size = {
          width: Math.max(minWidth, resizeStartSize.width + deltaX),
          height: newHeightNe
        };
        break;
      case 'nw': // 좌측 상단
        const newWidthNw = Math.max(minWidth, resizeStartSize.width - deltaX);
        const newHeightNw = Math.max(minHeight, resizeStartSize.height - deltaY);
        card.position = {
          x: resizeStartModalPosition.x - (newWidthNw - resizeStartSize.width),
          y: resizeStartModalPosition.y - (newHeightNw - resizeStartSize.height)
        };
        card.size = {
          width: newWidthNw,
          height: newHeightNw
        };
        break;
      case 'n': // 상단
        const newHeightN = Math.max(minHeight, resizeStartSize.height - deltaY);
        card.position = {
          x: resizeStartModalPosition.x,
          y: resizeStartModalPosition.y - (newHeightN - resizeStartSize.height)
        };
        card.size = {
          width: resizeStartSize.width,
          height: newHeightN
        };
        break;
      case 's': // 하단
        card.size = {
          width: resizeStartSize.width,
          height: Math.max(minHeight, resizeStartSize.height + deltaY)
        };
        break;
      case 'e': // 우측
        card.size = {
          width: Math.max(minWidth, resizeStartSize.width + deltaX),
          height: resizeStartSize.height
        };
        break;
      case 'w': // 좌측
        const newWidthW = Math.max(minWidth, resizeStartSize.width - deltaX);
        card.position = {
          x: resizeStartModalPosition.x - (newWidthW - resizeStartSize.width),
          y: resizeStartModalPosition.y
        };
        card.size = {
          width: newWidthW,
          height: resizeStartSize.height
        };
        break;
    }
    
    // 스타일 업데이트
    updateDetachedModalStyle(resizeCardId);
  }
}

// 마우스 업 처리
function handleMouseUp() {
  isDragging = false;
  isResizing = false;
  dragCardId = null;
  resizeCardId = null;
}

// 분리된 모달 스타일 업데이트
function updateDetachedModalStyle(cardId) {
  const cardIndex = detachedCards.value.findIndex(item => item.id === cardId);
  if (cardIndex === -1) return;
  
  const card = detachedCards.value[cardIndex];
  
  card.style = {
    ...card.style,
    left: `${card.position.x}px`,
    top: `${card.position.y}px`,
    width: `${card.size.width}px`,
    height: `${card.size.height}px`,
  };
}

// 이벤트 리스너 등록 및 해제
onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('mouseup', handleMouseUp);
});

// 새 카테고리 추가 함수 - 카테고리 목록에 새 카테고리를 추가
function addNewCategory() {
  // 새 카테고리 객체 생성 및 추가
  console.log("새 카테고리 추가");
  categories.value.push({
    id: categories.value.length + 1,
    title: "카테고리 " + (categories.value.length + 1),
    cards: [],
  });
}
</script>

<style lang="scss" scoped>
.categories-container {
  display: flex;
  gap: 16px;
  width: 100%;
  min-height: calc(100vh - 167px);
  overflow-x: auto;
  padding-bottom: 50px;
}

.empty-category {
  display: flex;
  justify-content: center;
  align-items: center;
}

.categories-container {
  display: flex;
  gap: 16px;
}

.empty-category {
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-card-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 16px;
  border-radius: 8px;
  border: 1px dashed #dadce0;
  width: 100%;
  p {
    text-align: center;
  }
}

.add-card-placeholder:hover {
  background-color: #f8f9fa;
}

.add-placeholder-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #e8f0fe;
  margin-bottom: 8px;
}

.add-category-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 16px;
  border-radius: 8px;
  border: 1px dashed #dadce0;
  width: 100%;
  height: 100%;
}

.add-category-placeholder:hover {
  background-color: #f8f9fa;
}

.add-category-placeholder-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #e8f0fe;
  margin-bottom: 8px;
}

// 카드 상세 스타일
.card-detail {
  padding: 16px;
  
  &-header {
    margin-bottom: 24px;
  }
  
  &-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 12px;
  }
  
  &-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 8px;
  }
  
  &-info {
    background-color: #f9fafb;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 24px;
    
    .info-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
    
    .info-label {
      font-weight: 500;
      color: #4b5563;
    }
    
    .info-value {
      color: #1f2937;
    }
  }
  
  &-content {
    min-height: 200px;
  }
}

.detach-modal-btn,
.detached-modal-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: #f3f4f6;
  }
}

// 분리된 모달 스타일
.detached-modal {
  position: fixed;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background-color: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
    cursor: move;
    user-select: none;
  }
  
  &-title {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 80%;
  }
  
  &-actions {
    display: flex;
    gap: 4px;
  }
  
  &-body {
    flex: 1;
    overflow-y: auto;
    padding: 0;
  }
}

// 리사이즈 핸들 스타일
.resize-handle {
  position: absolute;
  background-color: transparent;
  
  &-se {
    bottom: 0;
    right: 0;
    width: 16px;
    height: 16px;
    cursor: nwse-resize;
  }
  
  &-sw {
    bottom: 0;
    left: 0;
    width: 16px;
    height: 16px;
    cursor: nesw-resize;
  }
  
  &-ne {
    top: 0;
    right: 0;
    width: 16px;
    height: 16px;
    cursor: nesw-resize;
  }
  
  &-nw {
    top: 0;
    left: 0;
    width: 16px;
    height: 16px;
    cursor: nwse-resize;
  }
  
  &-n {
    top: 0;
    left: 16px;
    right: 16px;
    height: 6px;
    cursor: ns-resize;
  }
  
  &-s {
    bottom: 0;
    left: 16px;
    right: 16px;
    height: 6px;
    cursor: ns-resize;
  }
  
  &-e {
    top: 16px;
    bottom: 16px;
    right: 0;
    width: 6px;
    cursor: ew-resize;
  }
  
  &-w {
    top: 16px;
    bottom: 16px;
    left: 0;
    width: 6px;
    cursor: ew-resize;
  }
}
</style>
