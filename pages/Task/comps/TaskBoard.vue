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
        
       
        
        <div class="card-detail-content">
        
          
          <div class="card-comments-section">
            <h3 class="content-section-title">활동내역</h3>
            
            <!-- 댓글 입력 영역 -->
            <div class="comment-input-container">
              <UiTextarea 
                
                placeholder="내용을 입력해주세요." 
                v-model="newComment"
                rows="3"
                @input="autoResizeTextarea"
                ref="commentTextarea"
              ></UiTextarea>
              <div class="comment-actions">
                <button class="comment-submit-btn" @click="addComment">등록</button>
              </div>
            </div>
            
            <!-- 댓글 목록 -->
            <div class="comments-list">
              <div v-for="(comment, index) in selectedCard.commentsList" :key="index" class="comment-item">
                <div class="comment-header">
                  <div class="comment-author">
                    <img src="https://via.placeholder.com/32" alt="User Avatar" class="comment-avatar">
                    <span class="comment-author-name">{{ comment.author }}</span>
                  </div>
                  <span class="comment-date">{{ comment.date }}</span>
                </div>
                <div class="comment-body">
                  {{ comment.text }}
                </div>
                <div class="comment-actions-row">
                  <button class="reply-btn" @click="toggleReplyForm(comment.id)">
                    <Icon name="mdi:reply" size="14" />
                    답글
                  </button>
                </div>
                
                <!-- 대댓글 입력 폼 -->
                <div v-if="activeReplyId === comment.id" class="reply-form">
                  <UiTextarea 
                    class="reply-textarea" 
                    placeholder="답글을 입력해주세요..." 
                    v-model="replyText"
                    rows="2"
                    @input="autoResizeReplyTextarea"
                    ref="replyTextarea"
                  ></UiTextarea>
                  <div class="reply-form-actions">
                    <button class="cancel-btn" @click="cancelReply">취소</button>
                    <button class="submit-btn" @click="addReply(comment.id)">등록</button>
                  </div>
                </div>
                
                <!-- 대댓글 목록 -->
                <div v-if="comment.replies && comment.replies.length > 0" class="replies-list">
                  <div v-for="(reply, replyIndex) in comment.replies" :key="replyIndex" class="reply-item">
                    <div class="reply-header">
                      <div class="reply-author">
                        <img src="https://via.placeholder.com/24" alt="User Avatar" class="reply-avatar">
                        <span class="reply-author-name">{{ reply.author }}</span>
                      </div>
                      <span class="reply-date">{{ reply.date }}</span>
                    </div>
                    <div class="reply-body">
                      {{ reply.text }}
                    </div>
                  </div>
                </div>
              </div>
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
          
            
            <div class="card-comments-section">
              <h3 class="content-section-title">활동내역</h3>
              
              <!-- 댓글 입력 영역 -->
              <div class="comment-input-container">
                <UiTextarea 
                  class="comment-textarea" 
                  placeholder="내용을 입력해주세요." 
                  v-model="detachedCardComments[detachedCardItem.id]"
                  rows="3"
                  @input="(e) => autoResizeTextarea(e, detachedCardItem.id)"
                  :ref="el => { if (el) detachedTextareaRefs[detachedCardItem.id] = el }"
                ></UiTextarea>
                <div class="comment-actions">
                  <button class="comment-submit-btn" @click="addCommentToDetached(detachedCardItem.id)">등록</button>
                </div>
              </div>
              
              <!-- 댓글 목록 -->
              <div class="comments-list">
                <div v-for="(comment, index) in detachedCardItem.card.commentsList" :key="index" class="comment-item">
                  <div class="comment-header">
                    <div class="comment-author">
                      <img src="https://via.placeholder.com/32" alt="User Avatar" class="comment-avatar">
                      <span class="comment-author-name">{{ comment.author }}</span>
                    </div>
                    <span class="comment-date">{{ comment.date }}</span>
                  </div>
                  <div class="comment-body">
                    {{ comment.text }}
                  </div>
                  <div class="comment-actions-row">
                    <button class="reply-btn" @click="toggleDetachedReplyForm(detachedCardItem.id, comment.id)">
                      <Icon name="mdi:reply" size="14" />
                      답글
                    </button>
                  </div>
                  
                  <!-- 대댓글 입력 폼 -->
                  <div v-if="detachedActiveReplyIds[detachedCardItem.id] === comment.id" class="reply-form">
                    <UiTextarea 
                      placeholder="답글을 입력해주세요..." 
                      v-model="detachedReplyTexts[detachedCardItem.id]"
                      rows="2"
                      @input="(e) => autoResizeDetachedReplyTextarea(e, detachedCardItem.id)"
                      :ref="el => { if (el) detachedReplyTextareaRefs[`${detachedCardItem.id}-${comment.id}`] = el }"
                    ></UiTextarea>
                    <div class="reply-form-actions">
                      <button class="cancel-btn" @click="cancelDetachedReply(detachedCardItem.id)">취소</button>
                      <button class="submit-btn" @click="addDetachedReply(detachedCardItem.id, comment.id)">등록</button>
                    </div>
                  </div>
                  
                  <!-- 대댓글 목록 -->
                  <div v-if="comment.replies && comment.replies.length > 0" class="replies-list">
                    <div v-for="(reply, replyIndex) in comment.replies" :key="replyIndex" class="reply-item">
                      <div class="reply-header">
                        <div class="reply-author">
                          <img src="https://via.placeholder.com/24" alt="User Avatar" class="reply-avatar">
                          <span class="reply-author-name">{{ reply.author }}</span>
                        </div>
                        <span class="reply-date">{{ reply.date }}</span>
                      </div>
                      <div class="reply-body">
                        {{ reply.text }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
    title: "할 일",
    cards: [
      {
        id: 1,
        title: "디자인 시스템 구축",
        tags: ["디자인", "UI/UX"],
        date: "2023-09-15",
        comments: 3,
        attachments: 2,
        commentsList: [
          {
            id: "comment-1",
            author: "김윤기",
            date: "2023-09-10 14:30",
            text: "디자인 시스템 초안 완료했습니다. 리뷰 부탁드립니다.",
            replies: []
          },
          {
            id: "comment-2",
            author: "이지은",
            date: "2023-09-11 09:15",
            text: "컬러 팔레트 부분 조금 수정이 필요할 것 같습니다. 미팅에서 논의해요.",
            replies: [
              {
                id: "reply-1",
                author: "김윤기",
                date: "2023-09-11 10:30",
                text: "네, 미팅에서 논의하겠습니다. 추가 의견 있으시면 미리 공유해주세요."
              }
            ]
          }
        ]
      },
      {
        id: 2,
        title: "사용자 피드백 수집",
        tags: ["리서치", "사용자경험"],
        date: "2023-09-20",
        comments: 1,
        attachments: 0,
        commentsList: [
          {
            id: "comment-4",
            author: "최수진",
            date: "2023-09-18 11:20",
            text: "설문조사 양식 초안 작성했습니다. 검토 부탁드려요.",
            replies: []
          }
        ]
      },
      {
        id: 5,
        title: "프로토타입 제작",
        tags: ["디자인", "프로토타입"],
        date: "2023-09-30",
        comments: 0,
        attachments: 1,
        commentsList: []
      },
      {
        id: 6,
        title: "사용성 테스트 계획",
        tags: ["테스트", "QA"],
        date: "2023-10-05",
        comments: 0,
        attachments: 0,
        commentsList: []
      },
      {
        id: 7,
        title: "경쟁사 분석 보고서",
        tags: ["리서치", "분석"],
        date: "2023-10-10",
        comments: 0,
        attachments: 0,
        commentsList: []
      }
    ]
  },
  {
    id: 2,
    title: "진행 중",
    cards: [
      {
        id: 3,
        title: "랜딩 페이지 개발",
        tags: ["프론트엔드", "개발"],
        date: "2023-09-25",
        comments: 2,
        attachments: 3,
        commentsList: [
          {
            id: "comment-5",
            author: "김개발",
            date: "2023-09-22 10:30",
            text: "헤더 부분 반응형 이슈가 있습니다. 수정 중입니다.",
            replies: []
          },
          {
            id: "comment-6",
            author: "이디자인",
            date: "2023-09-23 15:45",
            text: "모바일 뷰에서 버튼 크기 조정이 필요합니다.",
            replies: []
          }
        ]
      },
      {
        id: 8,
        title: "API 연동 작업",
        tags: ["백엔드", "API"],
        date: "2023-10-15",
        comments: 1,
        attachments: 0,
        commentsList: [
          {
            id: "comment-7",
            author: "박서버",
            date: "2023-10-12 09:30",
            text: "인증 API 문서 업데이트했습니다. 참고해주세요.",
            replies: []
          }
        ]
      },
      {
        id: 9,
        title: "데이터 시각화 구현",
        tags: ["데이터", "차트"],
        date: "2023-10-20",
        comments: 0,
        attachments: 1,
        commentsList: []
      }
    ]
  },
  {
    id: 3,
    title: "완료",
    cards: [
      {
        id: 4,
        title: "로그인 기능 구현",
        tags: ["백엔드", "보안"],
        date: "2023-09-10",
        comments: 0,
        attachments: 1,
        commentsList: []
      },
      {
        id: 10,
        title: "회원가입 페이지 개발",
        tags: ["프론트엔드", "UI"],
        date: "2023-09-05",
        comments: 0,
        attachments: 0,
        commentsList: []
      },
      {
        id: 11,
        title: "DB 스키마 설계",
        tags: ["데이터베이스", "설계"],
        date: "2023-08-28",
        comments: 2,
        attachments: 1,
        commentsList: [
          {
            id: "comment-8",
            author: "김데이터",
            date: "2023-08-25 11:20",
            text: "인덱스 최적화 작업 완료했습니다.",
            replies: []
          },
          {
            id: "comment-9",
            author: "이백엔드",
            date: "2023-08-26 14:30",
            text: "쿼리 성능 테스트 결과 첨부합니다.",
            replies: []
          }
        ]
      }
    ]
  }
]);

// 카드 모달 상태 관리 - 카드 추가/편집을 위한 모달 표시 여부
const isCardModalOpen = ref(false);
const isCardDetailOpen = ref(false);
const selectedCard = ref(null);

// 댓글 관련 상태
const newComment = ref('');
const commentTextarea = ref(null);
const detachedTextareaRefs = reactive({});
const detachedCardComments = reactive({});

// 대댓글 관련 상태
const activeReplyId = ref(null);
const replyText = ref('');
const replyTextarea = ref(null);
const detachedActiveReplyIds = reactive({});
const detachedReplyTexts = reactive({});
const detachedReplyTextareaRefs = reactive({});

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

// 댓글 추가 함수
function addComment() {
  if (!newComment.value.trim() || !selectedCard.value) return;
  
  // 댓글 목록이 없으면 초기화
  if (!selectedCard.value.commentsList) {
    selectedCard.value.commentsList = [];
  }
  
  // 새 댓글 객체 생성
  const comment = {
    id: `comment-${Date.now()}`,
    author: "김윤기", // 실제로는 로그인한 사용자 정보를 사용
    date: new Date().toLocaleString(),
    text: newComment.value.trim(),
    replies: []
  };
  
  // 댓글 목록에 추가
  selectedCard.value.commentsList.push(comment);
  
  // 댓글 수 업데이트
  selectedCard.value.comments = selectedCard.value.commentsList.length;
  
  // 입력 필드 초기화
  newComment.value = '';
  
  // 원본 카드 데이터도 업데이트
  updateCardInCategories(selectedCard.value);
}

// 분리된 모달에 댓글 추가
function addCommentToDetached(cardId) {
  const commentText = detachedCardComments[cardId];
  if (!commentText || !commentText.trim()) return;
  
  const cardIndex = detachedCards.value.findIndex(item => item.id === cardId);
  if (cardIndex === -1) return;
  
  const card = detachedCards.value[cardIndex].card;
  
  // 댓글 목록이 없으면 초기화
  if (!card.commentsList) {
    card.commentsList = [];
  }
  
  // 새 댓글 객체 생성
  const comment = {
    id: `comment-${Date.now()}`,
    author: "김윤기", // 실제로는 로그인한 사용자 정보를 사용
    date: new Date().toLocaleString(),
    text: commentText.trim(),
    replies: []
  };
  
  // 댓글 목록에 추가
  card.commentsList.push(comment);
  
  // 댓글 수 업데이트
  card.comments = card.commentsList.length;
  
  // 입력 필드 초기화
  detachedCardComments[cardId] = '';
  
  // 원본 카드 데이터도 업데이트
  updateCardInCategories(card);
}

// 대댓글 폼 토글
function toggleReplyForm(commentId) {
  if (activeReplyId.value === commentId) {
    activeReplyId.value = null;
    replyText.value = '';
  } else {
    activeReplyId.value = commentId;
    replyText.value = '';
    // 다음 틱에 텍스트 영역에 포커스
    nextTick(() => {
      if (replyTextarea.value) {
        replyTextarea.value.focus();
      }
    });
  }
}

// 분리된 모달의 대댓글 폼 토글
function toggleDetachedReplyForm(cardId, commentId) {
  if (detachedActiveReplyIds[cardId] === commentId) {
    detachedActiveReplyIds[cardId] = null;
    detachedReplyTexts[cardId] = '';
  } else {
    detachedActiveReplyIds[cardId] = commentId;
    detachedReplyTexts[cardId] = '';
    // 다음 틱에 텍스트 영역에 포커스
    nextTick(() => {
      const textareaRef = detachedReplyTextareaRefs[`${cardId}-${commentId}`];
      if (textareaRef) {
        textareaRef.focus();
      }
    });
  }
}

// 대댓글 취소
function cancelReply() {
  activeReplyId.value = null;
  replyText.value = '';
}

// 분리된 모달의 대댓글 취소
function cancelDetachedReply(cardId) {
  detachedActiveReplyIds[cardId] = null;
  detachedReplyTexts[cardId] = '';
}

// 대댓글 추가
function addReply(commentId) {
  if (!replyText.value.trim() || !selectedCard.value) return;
  
  // 해당 댓글 찾기
  const commentIndex = selectedCard.value.commentsList.findIndex(comment => comment.id === commentId);
  if (commentIndex === -1) return;
  
  // 대댓글 객체 생성
  const reply = {
    id: `reply-${Date.now()}`,
    author: "김윤기", // 실제로는 로그인한 사용자 정보를 사용
    date: new Date().toLocaleString(),
    text: replyText.value.trim()
  };
  
  // 대댓글이 없으면 초기화
  if (!selectedCard.value.commentsList[commentIndex].replies) {
    selectedCard.value.commentsList[commentIndex].replies = [];
  }
  
  // 대댓글 추가
  selectedCard.value.commentsList[commentIndex].replies.push(reply);
  
  // 입력 폼 초기화
  activeReplyId.value = null;
  replyText.value = '';
  
  // 원본 카드 데이터도 업데이트
  updateCardInCategories(selectedCard.value);
}

// 분리된 모달에 대댓글 추가
function addDetachedReply(cardId, commentId) {
  const replyText = detachedReplyTexts[cardId];
  if (!replyText || !replyText.trim()) return;
  
  const cardIndex = detachedCards.value.findIndex(item => item.id === cardId);
  if (cardIndex === -1) return;
  
  const card = detachedCards.value[cardIndex].card;
  
  // 해당 댓글 찾기
  const commentIndex = card.commentsList.findIndex(comment => comment.id === commentId);
  if (commentIndex === -1) return;
  
  // 대댓글 객체 생성
  const reply = {
    id: `reply-${Date.now()}`,
    author: "김윤기", // 실제로는 로그인한 사용자 정보를 사용
    date: new Date().toLocaleString(),
    text: replyText.trim()
  };
  
  // 대댓글이 없으면 초기화
  if (!card.commentsList[commentIndex].replies) {
    card.commentsList[commentIndex].replies = [];
  }
  
  // 대댓글 추가
  card.commentsList[commentIndex].replies.push(reply);
  
  // 입력 폼 초기화
  detachedActiveReplyIds[cardId] = null;
  detachedReplyTexts[cardId] = '';
  
  // 원본 카드 데이터도 업데이트
  updateCardInCategories(card);
}

// 텍스트 영역 자동 크기 조절
function autoResizeTextarea(event, detachedCardId) {
  const textarea = detachedCardId 
    ? detachedTextareaRefs[detachedCardId] 
    : commentTextarea.value;
  
  if (!textarea) return;
  
  // 높이 초기화
  textarea.style.height = 'auto';
  
  // 스크롤 높이로 설정 (최소 높이 유지)
  const minHeight = 80; // 최소 높이 (px)
  textarea.style.height = `${Math.max(textarea.scrollHeight, minHeight)}px`;
}

// 대댓글 텍스트 영역 자동 크기 조절
function autoResizeReplyTextarea() {
  if (!replyTextarea.value) return;
  
  // 높이 초기화
  replyTextarea.value.style.height = 'auto';
  
  // 스크롤 높이로 설정 (최소 높이 유지)
  const minHeight = 60; // 최소 높이 (px)
  replyTextarea.value.style.height = `${Math.max(replyTextarea.value.scrollHeight, minHeight)}px`;
}

// 분리된 모달의 대댓글 텍스트 영역 자동 크기 조절
function autoResizeDetachedReplyTextarea(event, cardId) {
  const commentId = detachedActiveReplyIds[cardId];
  if (!commentId) return;
  
  const textarea = detachedReplyTextareaRefs[`${cardId}-${commentId}`];
  if (!textarea) return;
  
  // 높이 초기화
  textarea.style.height = 'auto';
  
  // 스크롤 높이로 설정 (최소 높이 유지)
  const minHeight = 60; // 최소 높이 (px)
  textarea.style.height = `${Math.max(textarea.scrollHeight, minHeight)}px`;
}

// 카테고리 내 카드 데이터 업데이트
function updateCardInCategories(updatedCard) {
  categories.value.forEach(category => {
    const cardIndex = category.cards.findIndex(card => card.id === updatedCard.id);
    if (cardIndex !== -1) {
      // 댓글 수와 댓글 목록 업데이트
      category.cards[cardIndex].comments = updatedCard.comments;
      category.cards[cardIndex].commentsList = [...updatedCard.commentsList];
    }
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

.card-detail-content {
  margin-top: 20px;
}

.content-section-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
}

.card-description {
  margin-bottom: 24px;
}

.card-comments-section {
  margin-top: 24px;
}

.comment-input-container {
  margin-bottom: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.comment-textarea {
  width: 100%;
  min-height: 80px;
  padding: 12px;
  border: none;
  resize: vertical;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
  
  &:focus {
    outline: none;
  }
}

.comment-actions {
  display: flex;
  justify-content: flex-end;
  padding: 8px 12px;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
}

.comment-submit-btn {
  padding: 6px 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background-color: #2563eb;
  }
}

.comments-list {
  margin-top: 16px;
}

.comment-item {
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 12px;
  background-color: #fff;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.comment-author {
  display: flex;
  align-items: center;
}

.comment-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
}

.comment-author-name {
  font-weight: 500;
  font-size: 14px;
}

.comment-date {
  font-size: 12px;
  color: #6b7280;
}

.comment-body {
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
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

.comment-actions-row {
  display: flex;
  margin-top: 8px;
}

.reply-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: #6b7280;
  font-size: 12px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  
  &:hover {
    background-color: #f3f4f6;
    color: #3b82f6;
  }
}

.reply-form {
  margin-top: 8px;
  margin-left: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.reply-textarea {
  width: 100%;
  min-height: 60px;
  padding: 8px;
  border: none;
  resize: vertical;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
  
  &:focus {
    outline: none;
  }
}

.reply-form-actions {
  display: flex;
  justify-content: flex-end;
  padding: 6px 8px;
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
  gap: 8px;
}

.cancel-btn {
  padding: 4px 12px;
  background-color: #f3f4f6;
  color: #6b7280;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  
  &:hover {
    background-color: #e5e7eb;
  }
}

.submit-btn {
  padding: 4px 12px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  
  &:hover {
    background-color: #2563eb;
  }
}

.replies-list {
  margin-top: 8px;
  margin-left: 24px;
  border-left: 2px solid #e5e7eb;
  padding-left: 12px;
}

.reply-item {
  padding: 8px;
  margin-bottom: 8px;
  background-color: #f9fafb;
  border-radius: 8px;
}

.reply-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.reply-author {
  display: flex;
  align-items: center;
}

.reply-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 6px;
}

.reply-author-name {
  font-weight: 500;
  font-size: 13px;
}

.reply-date {
  font-size: 11px;
  color: #6b7280;
}

.reply-body {
  font-size: 13px;
  line-height: 1.4;
  white-space: pre-wrap;
}
</style>
