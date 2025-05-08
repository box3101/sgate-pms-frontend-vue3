<template>
  <div class="task-board-page">
    <!-- 업무 보드 헤더 -->
    <TaskBoardHeader />

    <!-- 카테고리 및 카드 목록 -->
    <section class="board-content fixed-body">
      <ul class="categories-container">
        <!-- 카테고리 없는 경우 -->
        <div v-if="isFirstVisit && categories.length === 0" class="empty-category full">
          <div class="welcome-message">
            <p>환영합니다.</p>
            <p>업무등록을 위한 보드를 생성해보세요.</p>
            <UiButton variant="primary" class="create-board-btn" @click="isFirstVisit = false">
              업무 보드 생성하기
            </UiButton>
          </div>
        </div>

        <!-- 카테고리 있는 경우 -->
        <CategoryColumn
          v-for="category in categories"
          :key="category.id"
          :title="category.title"
          @add-board="openCardModal(category.id)"
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
              :evaluation="getEvaluation(card)"
              @click="openCardDetail(card)"
            />
          </div>
          <!-- 카드가 없는 경우 -->
          <div v-else>
            <div class="empty-category">
              <div class="add-card-placeholder" @click="openCardModal(category.id)">
                <div class="add-placeholder-icon">
                  <Icon name="mdi:plus" size="50" />
                </div>
                <p>
                  해당 카테고리의 <br />
                  첫 업무카드를 등록해보세요.
                </p>
              </div>
            </div>
          </div>
        </CategoryColumn>

        <!-- 카테고리 추가 버튼 (카테고리가 1개 이상일 때만) -->
        <li class="category-column" v-if="!isFirstVisit || categories.length > 0">
          <div class="category-header">
            <div class="category-actions w-full gap-24">
              <UiInput class="w-full" placeholder="카테고리명을 입력하세요." />
              <UiButton variant="primary" @click="addNewCategory">
                <i class="icon icon-md icon-plus icon-white"></i>등록
              </UiButton>
            </div>
          </div>
        </li>
      </ul>
    </section>

    <!-- ================== 카드 추가 모달 ================== -->
    <UiModal
      v-model="isCardModalOpen"
      position="right"
      title="카드 추가"
      :showSizeButtons="true"
      :allowBackgroundInteraction="true"
    >
      <template #headerActions>
        <button class="edit-title-btn">
          <Icon name="mdi:pencil" size="16" />
        </button>
      </template>
      <UiAccordionMenu :menuItems="menuItems" inline>
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
                <UiButton @click="saveCard">저장장</UiButton>
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
                <UiDatePicker placeholder="날짜 선택" />
              </div>
              <div class="flex gap-10 items-center">
                <UiSelect
                  placeholder="업무상태"
                  class="w-200"
                  :options="[
                    { label: '시작 전', value: 'not_started' },
                    { label: '진행 중', value: 'in_progress' },
                    { label: '완료', value: 'completed' }
                  ]"
                />
                <UiSelect
                  placeholder="진행만족도"
                  class="w-200"
                  :options="[
                    { label: '매우 만족', value: 'very_satisfied' },
                    { label: '만족', value: 'satisfied' },
                    { label: '보통', value: 'neutral' },
                    { label: '불만족', value: 'dissatisfied' }
                  ]"
                />
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
              <button class="attachment-btn action-btn" @click="openAttachmentModal">
                <Icon name="heroicons:paper-clip" size="20" />
              </button>
              <UiButton variant="primary" @click="saveCard">저장</UiButton>
            </div>

            <!-- 활동 카드 및 댓글 시스템 -->
            <ActivitySection :activities="activities" />
          </div>
        </template>
      </UiAccordionMenu>
    </UiModal>

    <!-- 동적으로 생성되는 모달들 -->
    <!-- 동적으로 생성되는 모달들 -->
    <template v-for="modal in cardModals" :key="modal.id">
      <UiModal
        v-model="modal.isOpen"
        position="right"
        :title="modal.card.title"
        size="medium"
        :showSizeButtons="true"
        :allowBackgroundInteraction="true"
        :allowFloating="true"
        :style="{ zIndex: modal.zIndex }"
        @update:modelValue="val => !val && closeCardModal(modal.id)"
        @floating-changed="isFloating => toggleModalFloating(modal.id, isFloating)"
        @activate-modal="activateModal(modal.id)"
      >
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
                <UiSelect placeholder="업무 보드명입니다." />
              </UiFormItem>
              <UiFormItem label="실행기간">
                <UiDatePicker isRange />
              </UiFormItem>
              <UiFormItem label="협업">
                <div class="flex gap-5">
                  <UiMultiSelect
                    placeholder="협업자 이름을 입력해주세요"
                    :options="[
                      { label: '마케팅팀', value: 'marketing' },
                      { label: '개발팀', value: 'development' },
                      { label: '디자인팀', value: 'design' }
                    ]"
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
                    :options="[
                      { label: '마케팅팀', value: 'marketing' },
                      { label: '개발팀', value: 'development' },
                      { label: '디자인팀', value: 'design' }
                    ]"
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
                <UiTextarea placeholder="업무에 대한 구체적인 내용을 입력해주세요." />
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
                  <UiDatePicker placeholder="날짜 선택" />
                </div>
                <div class="flex gap-10 items-center">
                  <UiSelect
                    placeholder="업무상태"
                    class="w-200"
                    :options="[
                      { label: '시작 전', value: 'not_started' },
                      { label: '진행 중', value: 'in_progress' },
                      { label: '완료', value: 'completed' }
                    ]"
                  />
                  <UiSelect
                    placeholder="진행만족도"
                    class="w-200"
                    :options="[
                      { label: '매우 만족', value: 'very_satisfied' },
                      { label: '만족', value: 'satisfied' },
                      { label: '보통', value: 'neutral' },
                      { label: '불만족', value: 'dissatisfied' }
                    ]"
                  />
                </div>
              </div>
              <UiTextarea
                placeholder="업무에 대한 구체적인 내용을 입력해주세요."
                size="xlarge"
                class="mt-10 my-4"
              />

              <div
                class="flex justify-between items-center mt-20 pt-10"
                style="border-top: 1px solid #eee"
              >
                <button class="attachment-btn action-btn" @click="openAttachmentModal">
                  <i class="icon icon-md icon-paper-clip"></i>
                </button>
                <UiButton variant="primary" @click="addActivityItem">저장</UiButton>
              </div>

              <!-- 활동 카드 및 댓글 시스템 -->
              <ActivitySection :activities="activities" />
            </div>
          </template>
        </UiAccordionMenu>
      </UiModal>
    </template>

    <!-- ================== 공통 모달 매니저 ================== -->
    <!-- 카드 추가/상세/첨부/직원찾기 팝업 모두 포함 -->
    <!-- <CommonModal ref="modalRef" @save-card="handleSaveCard" /> -->
  </div>
</template>

<script setup>
  /**
   * TaskBoard 업무 보드 페이지
   * - 카테고리, 카드 목록 및 각종 모달(카드 추가/상세/첨부/직원찾기) 제어
   * - 공통 모달 매니저([pages/common/modal.vue])를 import하여 모든 모달을 통합 관리
   */
  import { ref, provide, onMounted } from 'vue'
  // UI 및 도메인 컴포넌트 import
  import TaskBoardHeader from './TaskBoardHeader.vue'
  import CategoryColumn from './CategoryColumn.vue'
  import CategoryCard from './CategoryCard.vue'
  import UiButton from '@/components/UI/UiButton.vue'
  import ActivitySection from '@/components/domain/ActivitySection.vue'

  // ================== 상태 변수 ==================

  // 플로팅 팝업 카운터 - 전역 상태로 관리
  const floatingPopupCount = ref(0)
  provide('floatingPopupCount', floatingPopupCount)
  // 다중 모달 관리를 위한 배열
  const cardModals = ref([])

  // 카테고리 목록 데이터 (예시)
  const isFirstVisit = ref(true)
  const isCardModalOpen = ref(false)
  const selectedCategoryId = ref(0)
  const categories = ref([
    {
      id: 1,
      title: 'Cloud',
      cards: [
        {
          id: 101,
          title: '사용자 요구사항 분석',
          date: '2023-06-15',
          assignee: '김기획',
          tags: [
            { type: 'primary', text: '분석' },
            { type: 'collaboration', text: '협업' }
          ],
          evaluation: ''
        },
        {
          id: 102,
          title: '화면 설계',
          date: '2023-06-20',
          assignee: '박디자인',
          tags: [
            { type: 'shared', text: '공유' },
            { type: 'deadline', text: '마감임박' }
          ],
          evaluation: '보통'
        },
        {
          id: 103,
          title: '프로젝트 범위 정의',
          date: '2023-06-18',
          assignee: '이매니저',
          tags: [
            { type: 'primary', text: '기획' },
            { type: 'completed', text: '중요' }
          ],
          evaluation: '우수'
        },
        {
          id: 104,
          title: '경쟁사 분석 보고서',
          date: '2023-06-22',
          assignee: '최분석가',
          tags: [
            { type: 'primary', text: '리서치' },
            { type: 'shared', text: '공유' }
          ],
          evaluation: '보통'
        },
        {
          id: 105,
          title: '사용자 페르소나 개발',
          date: '2023-06-24',
          assignee: '김기획',
          tags: [
            { type: 'primary', text: 'UX' },
            { type: 'completed', text: '완료' }
          ],
          evaluation: '우수'
        }
      ]
    },
    {
      id: 2,
      title: 'Customize',
      cards: [
        {
          id: 201,
          title: '로그인 기능 구현',
          date: '2023-06-25',
          assignee: '이개발',
          tags: [
            { type: 'primary', text: '프론트엔드' },
            { type: 'name', text: '이개발' }
          ],
          evaluation: ''
        },
        {
          id: 202,
          title: 'API 연동',
          date: '2023-06-30',
          assignee: '최백엔드',
          tags: [
            { type: 'collaboration', text: '협업' },
            { type: 'deadline', text: '마감임박' }
          ],
          evaluation: '미흡'
        },
        {
          id: 203,
          title: '클라우드 서버 마이그레이션',
          date: '2023-07-01',
          assignee: '김클라우드',
          tags: [
            { type: 'primary', text: '클라우드' },
            { type: 'completed', text: '긴급' }
          ],
          evaluation: '보통'
        },
        {
          id: 204,
          title: '데이터베이스 최적화',
          date: '2023-07-02',
          assignee: '박DB',
          tags: [
            { type: 'primary', text: '백엔드' },
            { type: 'collaboration', text: '협업' }
          ],
          evaluation: '우수'
        },
        {
          id: 205,
          title: '푸시 알림 시스템 구현',
          date: '2023-07-03',
          assignee: '정모바일',
          tags: [
            { type: 'primary', text: '모바일' },
            { type: 'completed', text: '중요' }
          ],
          evaluation: '보통'
        },
        {
          id: 206,
          title: '결제 시스템 연동',
          date: '2023-07-05',
          assignee: '최백엔드',
          tags: [
            { type: 'primary', text: '결제' },
            { type: 'completed', text: '긴급' }
          ],
          evaluation: '우수'
        },
        {
          id: 207,
          title: '검색 기능 고도화',
          date: '2023-07-07',
          assignee: '이개발',
          tags: [
            { type: 'primary', text: '검색' },
            { type: 'shared', text: '공유' }
          ],
          evaluation: '보통'
        }
      ]
    },
    {
      id: 3,
      title: 'My Run',
      cards: [
        {
          id: 301,
          title: '단위 테스트',
          date: '2023-07-05',
          assignee: '정테스터',
          tags: [
            { type: 'primary', text: 'QA' },
            { type: 'shared', text: '공유' }
          ],
          evaluation: '보통'
        },
        {
          id: 302,
          title: '통합 테스트',
          date: '2023-07-10',
          assignee: '한품질',
          tags: [
            { type: 'name', text: '한품질' },
            { type: 'deadline', text: '마감임박' }
          ],
          evaluation: '우수'
        },
        {
          id: 303,
          title: '성능 테스트',
          date: '2023-07-12',
          assignee: '임성능',
          tags: [
            { type: 'primary', text: '성능' },
            { type: 'completed', text: '중요' }
          ],
          evaluation: '미흡'
        },
        {
          id: 304,
          title: '보안 취약점 분석',
          date: '2023-07-15',
          assignee: '박보안',
          tags: [
            { type: 'primary', text: '보안' },
            { type: 'completed', text: '긴급' }
          ],
          evaluation: '우수'
        },
        {
          id: 305,
          title: '사용성 테스트',
          date: '2023-07-18',
          assignee: '김UX',
          tags: [
            { type: 'primary', text: 'UX' },
            { type: 'collaboration', text: '협업' }
          ],
          evaluation: '보통'
        }
      ]
    },
    {
      id: 4,
      title: 'RPA',
      cards: [
        {
          id: 401,
          title: '베타 배포',
          date: '2023-07-15',
          assignee: '조운영',
          tags: [
            { type: 'completed', text: '완료' },
            { type: 'shared', text: '공유' }
          ],
          evaluation: '우수'
        },
        {
          id: 402,
          title: '정식 배포',
          date: '2023-07-20',
          assignee: '강인프라',
          tags: [
            { type: 'collaboration', text: '협업' },
            { type: 'primary', text: '릴리즈' }
          ],
          evaluation: '보통'
        },
        {
          id: 403,
          title: '모니터링 시스템 구축',
          date: '2023-07-22',
          assignee: '이인프라',
          tags: [
            { type: 'primary', text: '운영' },
            { type: 'completed', text: '중요' }
          ],
          evaluation: '우수'
        },
        {
          id: 404,
          title: '롤백 시나리오 테스트',
          date: '2023-07-25',
          assignee: '강인프라',
          tags: [
            { type: 'primary', text: '안정성' },
            { type: 'completed', text: '긴급' }
          ],
          evaluation: '미흡'
        },
        {
          id: 405,
          title: '배포 자동화 구축',
          date: '2023-07-28',
          assignee: '최데브옵스',
          tags: [
            { type: 'primary', text: 'DevOps' },
            { type: 'collaboration', text: '협업' }
          ],
          evaluation: '우수'
        }
      ]
    },
    {
      id: 5,
      title: 'Data Collection',
      cards: [
        {
          id: 501,
          title: '버그 수정',
          date: '2023-07-25',
          assignee: '임개발',
          tags: [
            { type: 'deadline', text: '마감임박' },
            { type: 'completed', text: '완료' }
          ],
          evaluation: '미흡'
        },
        {
          id: 502,
          title: '보안 취약점 패치',
          date: '2023-07-28',
          assignee: '박보안',
          tags: [
            { type: 'completed', text: '긴급' },
            { type: 'primary', text: '보안' }
          ],
          evaluation: '우수'
        },
        {
          id: 503,
          title: '성능 최적화',
          date: '2023-08-01',
          assignee: '임성능',
          tags: [
            { type: 'primary', text: '성능' },
            { type: 'shared', text: '공유' }
          ],
          evaluation: '보통'
        },
        {
          id: 504,
          title: '사용자 문의 대응',
          date: '2023-08-03',
          assignee: '한고객',
          tags: [
            { type: 'primary', text: '고객지원' },
            { type: 'deadline', text: '마감임박' }
          ],
          evaluation: '우수'
        },
        {
          id: 505,
          title: '서버 리소스 확장',
          date: '2023-08-05',
          assignee: '강인프라',
          tags: [
            { type: 'primary', text: '인프라' },
            { type: 'completed', text: '중요' }
          ],
          evaluation: '보통'
        }
      ]
    },
    {
      id: 6,
      title: '피드백',
      cards: [
        {
          id: 601,
          title: '사용자 피드백 수집',
          date: '2023-08-01',
          assignee: '최분석',
          tags: [
            { type: 'primary', text: '분석' },
            { type: 'shared', text: '공유' }
          ],
          evaluation: '보통'
        },
        {
          id: 602,
          title: '사용성 개선 제안',
          date: '2023-08-05',
          assignee: '김UX',
          tags: [
            { type: 'primary', text: 'UX' },
            { type: 'collaboration', text: '협업' }
          ],
          evaluation: '우수'
        },
        {
          id: 603,
          title: '고객 만족도 조사',
          date: '2023-08-10',
          assignee: '이마케팅',
          tags: [
            { type: 'primary', text: '마케팅' },
            { type: 'shared', text: '공유' }
          ],
          evaluation: '보통'
        },
        {
          id: 604,
          title: '개선점 분석 보고서',
          date: '2023-08-15',
          assignee: '최분석',
          tags: [
            { type: 'primary', text: '분석' },
            { type: 'completed', text: '중요' }
          ],
          evaluation: '우수'
        }
      ]
    },
    {
      id: 7,
      title: '교육/훈련',
      cards: [
        {
          id: 701,
          title: '신입 개발자 교육',
          date: '2023-08-10',
          assignee: '박교육',
          tags: [
            { type: 'primary', text: '교육' },
            { type: 'collaboration', text: '협업' }
          ],
          evaluation: '우수'
        },
        {
          id: 702,
          title: '보안 의식 훈련',
          date: '2023-08-15',
          assignee: '김보안',
          tags: [
            { type: 'primary', text: '보안' },
            { type: 'completed', text: '필수' }
          ],
          evaluation: '보통'
        },
        {
          id: 703,
          title: '신기술 세미나',
          date: '2023-08-20',
          assignee: '이기술',
          tags: [
            { type: 'primary', text: '기술' },
            { type: 'shared', text: '공유' }
          ],
          evaluation: '우수'
        }
      ]
    },
    {
      id: 8,
      title: '마케팅',
      cards: [
        {
          id: 801,
          title: '제품 출시 홍보',
          date: '2023-08-15',
          assignee: '최마케팅',
          tags: [
            { type: 'primary', text: '홍보' },
            { type: 'deadline', text: '마감임박' }
          ],
          evaluation: '우수'
        },
        {
          id: 802,
          title: '소셜 미디어 전략',
          date: '2023-08-20',
          assignee: '정소셜',
          tags: [
            { type: 'primary', text: 'SNS' },
            { type: 'collaboration', text: '협업' }
          ],
          evaluation: '보통'
        },
        {
          id: 803,
          title: '사용자 획득 캠페인',
          date: '2023-08-25',
          assignee: '한마케팅',
          tags: [
            { type: 'primary', text: '마케팅' },
            { type: 'completed', text: '중요' }
          ],
          evaluation: '미흡'
        }
      ]
    },
    {
      id: 9,
      title: '제품 개선',
      cards: [
        {
          id: 901,
          title: '새로운 기능 계획',
          date: '2023-08-20',
          assignee: '김기획',
          tags: [
            { type: 'primary', text: '기획' },
            { type: 'shared', text: '공유' }
          ],
          evaluation: '우수'
        },
        {
          id: 902,
          title: 'UI 디자인 개선',
          date: '2023-08-25',
          assignee: '김디자인',
          tags: [
            { type: 'primary', text: '디자인' },
            { type: 'collaboration', text: '협업' }
          ],
          evaluation: '보통'
        }
      ]
    }
  ])

  // 활동 데이터 배열
  const activities = ref([
    {
      id: '1',
      status: '완료', // 진행중, 완료, 진행전, 취소/보류
      evaluation: '우수', // 우수, 보통, 미흡
      createdDate: '2022.07.12 | 14:45:57',
      items: [
        `
      활동종류 : 서비스 기획 및 디자인<br>
      활동내용<br>
      - Sgate 화면 분석 및 기능 분석<br>
      - 와이어프레임으로 프로세스 제작<br>
      - 와이어프레임에 UI 디자인 적용<br>
      `
      ],
      user: {
        company: 'ABC 회사',
        team: '개발팀',
        name: '홍길동'
      }
    }
  ])

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

  // ================== 함수 ==================

  // 새 카테고리 추가
  function addNewCategory() {
    categories.value.push({
      id: categories.value.length + 1,
      title: '카테고리 ' + (categories.value.length + 1),
      cards: []
    })
  }

  // 카드 열기
  function openCardModal(categoryId) {
    selectedCategoryId.value = categoryId - 1
    isCardModalOpen.value = true
  }

  // 카드 저장
  function saveCard() {
    categories.value[selectedCategoryId.value].cards.push({
      id: categories.value[selectedCategoryId.value].cards.length + 1,
      title: '글자테스트트글',
      tags: ['중요'],
      date: '2025-04-17',
      comments: 2,
      attachments: 1
    })
    isCardModalOpen.value = false
  }

  // 카드 상세 열기
  // 카드 상세 열기
  function openCardDetail(card) {
    // 이미 열린 모달인지 확인
    const existingModalIndex = cardModals.value.findIndex(modal => modal.card.id === card.id)

    if (existingModalIndex >= 0) {
      // 이미 열린 모달이면 활성화만 시킴 (z-index 조정 등)
      activateModal(cardModals.value[existingModalIndex].id)
      return
    }

    // 플로팅 모달이 있는 경우
    if (floatingPopupCount.value > 0) {
      // 기존 고정 모달 있는지 확인 (플로팅이 아닌 모달)
      const fixedModalIndex = cardModals.value.findIndex(modal => !modal.isFloating)

      // 기존 고정 모달이 있으면 제거
      if (fixedModalIndex >= 0) {
        // 카운터 업데이트는 모달 내부의 watch에서 처리됨
        cardModals.value.splice(fixedModalIndex, 1)
      }
    } else {
      // 플로팅 모달이 없는 경우 (일반적인 케이스)
      // 기존 모달이 있으면 모두 제거
      if (cardModals.value.length > 0) {
        // 모든 모달 제거
        cardModals.value = []
      }
    }

    // 새로운 모달 생성
    cardModals.value.push({
      id: Date.now(), // 고유 ID
      card: card,
      isOpen: true,
      isFloating: false, // 기본적으로 고정 모드로 시작
      zIndex: 1000 + cardModals.value.length // 순차적으로 z-index 증가
    })
  }

  // 모달 닫기
  function closeCardModal(modalId) {
    const modalIndex = cardModals.value.findIndex(modal => modal.id === modalId)
    if (modalIndex >= 0) {
      // 플로팅 모드 카운터 업데이트
      if (cardModals.value[modalIndex].isFloating) {
        floatingPopupCount.value--
      }
      // 모달 제거
      cardModals.value.splice(modalIndex, 1)
    }
  }

  // 모달 플로팅 모드 전환
  function toggleModalFloating(modalId, isFloating) {
    const modalIndex = cardModals.value.findIndex(modal => modal.id === modalId)
    if (modalIndex >= 0) {
      // 이전 상태와 다른 경우에만 카운터 업데이트
      if (cardModals.value[modalIndex].isFloating !== isFloating) {
        if (isFloating) {
          floatingPopupCount.value++
        } else {
          floatingPopupCount.value--
        }
      }
      cardModals.value[modalIndex].isFloating = isFloating
    }
  }

  // 모달 활성화 (z-index 올리기)
  function activateModal(modalId) {
    const modalIndex = cardModals.value.findIndex(modal => modal.id === modalId)

    if (modalIndex >= 0) {
      // 모달이 이미 플로팅 상태인 경우에만 처리
      if (cardModals.value[modalIndex].isFloating) {
        // 해당 모달을 배열에서 제거했다가 다시 끝에 추가하여 렌더링 순서 변경
        const modal = cardModals.value[modalIndex]
        cardModals.value.splice(modalIndex, 1)

        // z-index 값을 가장 큰 값으로 설정
        const highestZIndex = cardModals.value.reduce(
          (max, m) => Math.max(max, m.zIndex || 0),
          1000
        )
        modal.zIndex = highestZIndex + 10

        // 배열 맨 뒤에 추가 (Vue는 마지막 요소를 마지막에 렌더링하여 시각적으로 맨 위에 표시됨)
        cardModals.value.push(modal)
      }
    }
  }

  function addActivityItem() {
    activities.value.push({
      id: activities.value.length + 1,
      status: '진행중', // 진행중, 완료, 진행전, 취소/보류
      evaluation: '보통', // 우수, 보통, 미흡
      createdDate: '2022.07.12 | 14:45:57',
      items: [
        `
        활동종류 : 서비스 기획 및 디자인<br>
        활동내용<br>
        - Sgate 화면 분석 및 기능 분석<br>
        - 와이어프레임으로 프로세스 제작<br>
        - 와이어프레임에 UI 디자인 적용<br>
        `
      ],
      user: {
        company: 'ABC 회사',
        team: '개발팀',
        name: '홍길동'
      }
    })
  }

  // 평가 상태 조회 함수
  const getEvaluation = card => {
    return card.evaluation || ''
  }
</script>

<style lang="scss" scoped>
  :deep(.modal-buttons) {
    display: none !important;
  }
  .task-board-page {
    overflow: auto;
  }
  .board-content {
    margin-top: 24px;
  }
  .categories-container {
    display: flex;
    gap: 16px;
    list-style: none;
    padding: 0;
    min-height: calc(100vh - 172px);
  }
  .empty-category.full {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  }
  .welcome-message {
    text-align: center;
    color: #888;
    p {
      margin: 0 0 8px 0;
    }
  }
  .create-board-btn {
    margin-top: 16px;
  }
  .add-card-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 6px 0;
    color: #bbb;
    border-radius: 4px;
    border: 1px solid var(--color-gray-20, #cdd1d5);
    background: var(--color-gray-0, #fff);
    .add-placeholder-icon {
      margin-bottom: 4px;
    }
    &:hover {
      color: #333;
    }
  }
</style>
