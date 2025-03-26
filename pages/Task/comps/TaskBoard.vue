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
    <!-- 카드 모달 EEE -->
  </div>
</template>
<script setup>
import { ref } from "vue";
import TaskBoardHeader from "./TaskBoardHeader.vue";
import CategoryColumn from "./CategoryColumn.vue";
import CategoryCard from "./CategoryCard.vue";
import UiModal from "@/components/UI/UiModal.vue";

// 카테고리 목록 데이터 - 각 카테고리에는 ID, 제목, 카드 배열이 포함됨
// 카테고리 목록 데이터 - 각 카테고리에는 ID, 제목, 카드 배열이 포함됨
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

// 카드 모달 열기 함수 - 카드 추가 또는 편집 시 모달을 표시
function openCardModal() {
  isCardModalOpen.value = true;
}

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
</style>
