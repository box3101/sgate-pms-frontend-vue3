<template>
  <div class="task-handover-container container-large">
    <!-- 좌우 2분할 구조 -->
    <div class="task-handover-layout">
      <!-- 왼쪽 패널: 업무선택 영역 -->
      <div class="task-selection-panel">
        <div class="panel-header">
          <h2 class="panel-title">업무선택</h2>
        </div>

        <!-- 상단 필터 영역 -->
        <div class="filter-section">
          <div class="search-container">
            <UiInput placeholder="담당자 검색" class="search-input" />
            <UiButton icon-only variant="secondary" @click="showUserSelectModal = true">
              <i class="icon icon-md icon-search icon-white"></i>
            </UiButton>
          </div>

          <div class="filter-row">
            <UiSelect
              placeholder="보드 선택"
              v-model="selectedBoard"
              :options="boardOptions"
              class="filter-select"
            />
            <UiSelect
              placeholder="카테고리 선택"
              v-model="selectedCategory"
              :options="categoryOptions"
              class="filter-select"
            />
          </div>

          <div class="filter-row">
            <UiSelect
              placeholder="업무상태"
              v-model="selectedTaskStatus"
              :options="taskStatusOptions"
              class="filter-select"
            />
            <UiSelect
              placeholder="결과상태"
              v-model="selectedResultStatus"
              :options="resultStatusOptions"
              class="filter-select"
            />
            <UiSelect
              placeholder="진행상태"
              v-model="selectedProgressStatus"
              :options="progressStatusOptions"
              class="filter-select"
            />
          </div>

          <div class="filter-actions gap-5">
            <UiButton type="primary" size="medium">
              <i class="icon icon-md icon-search icon-white"></i>
              검색
            </UiButton>
            <UiButton type="secondary" size="medium">
              <i class="icon icon-sm icon-refresh icon-white"></i>
              초기화
            </UiButton>
          </div>
        </div>

        <!-- 중간 헤더 영역 -->
        <div class="selection-header">
          <h3 class="selection-title">전달할 업무를 선택하세요</h3>
          <div class="selection-actions">
            <div v-if="isAllSelected">
              <UiButton variant="primary" size="small" @click="toggleSelectAll">
                <i class="icon icon-sm icon-check icon-white"></i>
                전체해제
              </UiButton>
            </div>
            <div v-else>
              <UiButton variant="secondary" size="small" @click="toggleSelectAll">
                <i class="icon icon-sm icon-check icon-white"></i>
                전체선택
              </UiButton>
            </div>
          </div>
        </div>

        <!-- 하단 카드 리스트 영역 -->
        <div class="task-card-list">
          <div
            v-for="(task, index) in taskList"
            :key="index"
            class="task-card"
            :class="{ 'is-selected': selectedTasks.includes(task.id) }"
            @click="toggleTaskSelection(task.id)"
          >
            <div class="task-card-checkbox">
              <div
                class="checkbox-circle"
                :class="{ 'is-checked': selectedTasks.includes(task.id) }"
              >
                <i
                  v-if="selectedTasks.includes(task.id)"
                  class="icon icon-sm icon-check icon-white"
                ></i>
              </div>
            </div>

            <div class="task-card-content">
              <div class="task-card-header">
                <div class="task-tags">
                  <UiTag
                    size="small"
                    v-for="(tag, tagIndex) in task.tags"
                    :key="tagIndex"
                    :variant="tag.type"
                  >
                    {{ tag.text }}
                  </UiTag>
                </div>
                <div class="task-date">
                  <i class="icon icon-sm icon-calendar"></i>
                  <template v-if="task.endDate">
                    {{ task.startDate }} - {{ task.endDate }}
                  </template>
                  <template v-else>
                    {{ task.startDate }}
                  </template>
                </div>
              </div>

              <div class="task-title">{{ task.title }}</div>

              <div class="task-card-footer">
                <div class="task-meta flex gap-10 items-center">
                  <span class="card-comments flex items-center gap-5">
                    <Icon name="mdi:comment-outline" size="14" />
                    <span> {{ task.commentCount }}</span>
                  </span>
                  <span class="card-attachments flex items-center gap-5">
                    <i class="icon-user-border icon-md"></i>
                    <span> {{ task.shareCount }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="taskList.length === 0" class="empty-state">
            <i class="icon icon-xl icon-search"></i>
            <p>검색 조건에 맞는 업무가 없습니다.</p>
          </div>
        </div>
      </div>

      <!-- 오른쪽 패널: 업무전달 영역 -->
      <div class="task-handover-panel">
        <div class="panel-header">
          <h2 class="panel-title">업무전달</h2>
        </div>

        <!-- 상단 검색 영역 -->
        <div class="search-section">
          <div class="recipient-search">
            <UiInput
              placeholder="전달할 대상을 검색하세요"
              v-model="recipientSearchKeyword"
              class="recipient-search-input"
            />
            <UiButton icon-only variant="secondary" @click="showUserSelectModal = true">
              <i class="icon icon-md icon-search icon-white"></i>
            </UiButton>
          </div>
        </div>

        <!-- 중간 헤더 영역 -->
        <div class="handover-header">
          <h3 class="handover-title">선택한 업무를 선택한 대상에게 전달하세요</h3>
        </div>

        <!-- 선택된 업무 요약 -->
        <div class="selected-tasks-summary">
          <div class="summary-count">
            <span class="count-number">{{ selectedTasks.length }}</span>
            <span class="count-label">개 업무 선택됨</span>
          </div>

          <div class="summary-list" v-if="selectedTasks.length > 0">
            <div v-for="taskId in selectedTasks.slice(0, 3)" :key="taskId" class="summary-item">
              {{ taskList.find(t => t.id === taskId)?.title }}
            </div>
            <div v-if="selectedTasks.length > 3" class="summary-more">
              외 {{ selectedTasks.length - 3 }}개 더...
            </div>
          </div>

          <div v-else class="summary-empty">왼쪽에서 업무를 선택해주세요.</div>
        </div>

        <!-- 하단 안내사항 리스트 -->
        <div class="handover-guide">
          <h4 class="guide-title">안내사항</h4>
          <ul class="guide-list">
            <li class="guide-item">왼쪽 업무에서 이동을 원하는 업무를 선택하세요.</li>
            <li class="guide-item">전달된 업무는 본인의 카테고리로 이동 후 사용할 수 있습니다.</li>
            <li class="guide-item">협업/공유자에게 업무를 전달할 수 없습니다.</li>
          </ul>
        </div>

        <!-- 하단 버튼 영역 -->
        <div class="handover-actions">
          <UiButton
            type="primary"
            size="large"
            :disabled="!canHandover"
            @click="handoverTasks"
            class="handover-button"
          >
            업무전달
          </UiButton>
        </div>
      </div>
    </div>
  </div>

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
</template>

<script setup>
  import { ref, computed, inject } from 'vue'
  import DepartmentUserSelector from '@/components/domain/DepartmentUserSelector.vue'

  // 로고 텍스트 접근
  const logoText = inject('logoText')

  // 원하는 시점에 로고 텍스트 변경
  logoText.value = '업무 인수인계'

  // 검색 키워드
  const searchKeyword = ref('')
  const recipientSearchKeyword = ref('')

  // 필터 선택 값
  const selectedBoard = ref(null)
  const selectedCategory = ref(null)
  const selectedTaskStatus = ref(null)
  const selectedResultStatus = ref(null)
  const selectedProgressStatus = ref(null)

  // 필터 옵션
  const boardOptions = ref([
    { label: '보드 1', value: 'board1' },
    { label: '보드 2', value: 'board2' },
    { label: '보드 3', value: 'board3' }
  ])

  const categoryOptions = ref([
    { label: '카테고리 1', value: 'category1' },
    { label: '카테고리 2', value: 'category2' },
    { label: '카테고리 3', value: 'category3' }
  ])

  const taskStatusOptions = ref([
    { label: '진행중', value: 'in_progress' },
    { label: '완료', value: 'completed' },
    { label: '대기중', value: 'pending' }
  ])

  const resultStatusOptions = ref([
    { label: '성공', value: 'success' },
    { label: '실패', value: 'fail' },
    { label: '보류', value: 'hold' }
  ])

  const progressStatusOptions = ref([
    { label: '0%', value: '0' },
    { label: '25%', value: '25' },
    { label: '50%', value: '50' },
    { label: '75%', value: '75' },
    { label: '100%', value: '100' }
  ])

  // 업무 목록 (더미 데이터)
  const taskList = ref([
    {
      id: 1,
      profileImage: '/images/profile1.jpg',
      tags: [
        { type: 'deadline', text: '클라우드' },
        { type: 'shared', text: '공유' }
      ],
      title: '클라우드 서버 마이그레이션 작업',
      commentCount: 5,
      shareCount: 3,
      startDate: '2025-04-01',
      endDate: '2025-04-15'
    },
    {
      id: 2,
      profileImage: '/images/profile2.jpg',
      tags: [{ type: 'completed', text: '개발' }],
      title: '신규 기능 개발',
      commentCount: 2,
      shareCount: 1,
      startDate: '2025-04-05',
      endDate: null
    },
    {
      id: 3,
      profileImage: '/images/profile3.jpg',
      tags: [
        { type: 'shared', text: '공유' },
        { type: 'collaboration', text: '긴급' }
      ],
      title: '보안 취약점 패치 적용',
      commentCount: 8,
      shareCount: 4,
      startDate: '2025-04-03',
      endDate: '2025-04-10'
    },
    {
      id: 4,
      profileImage: '/images/profile3.jpg',
      tags: [
        { type: 'shared', text: '공유' },
        { type: 'collaboration', text: '긴급' }
      ],
      title: '보안 취약점 패치 적용',
      commentCount: 8,
      shareCount: 4,
      startDate: '2025-04-03',
      endDate: '2025-04-10'
    },
    {
      id: 5,
      profileImage: '/images/profile3.jpg',
      tags: [
        { type: 'shared', text: '공유' },
        { type: 'collaboration', text: '긴급' }
      ],
      title: '보안 취약점 패치 적용',
      commentCount: 8,
      shareCount: 4,
      startDate: '2025-04-03',
      endDate: '2025-04-10'
    }
  ])

  // 선택된 업무 ID 목록
  const selectedTasks = ref([])

  // 전체 선택 상태
  const isAllSelected = computed(() => {
    return selectedTasks.value.length === taskList.value.length
  })

  // 업무 전달 가능 여부
  const canHandover = computed(() => {
    return selectedTasks.value.length > 0 && recipientSearchKeyword.value.trim() !== ''
  })

  // 전체 선택/해제 토글
  const toggleSelectAll = () => {
    if (isAllSelected.value) {
      selectedTasks.value = []
    } else {
      selectedTasks.value = taskList.value.map(task => task.id)
    }
  }

  // 개별 업무 선택/해제 토글
  const toggleTaskSelection = taskId => {
    const index = selectedTasks.value.indexOf(taskId)
    if (index === -1) {
      selectedTasks.value.push(taskId)
    } else {
      selectedTasks.value.splice(index, 1)
    }
  }

  // 업무 전달 함수
  const handoverTasks = () => {
    // 실제 구현에서는 API 호출 등의 로직이 들어갈 예정
    console.log('전달할 업무:', selectedTasks.value)
    console.log('전달 대상:', recipientSearchKeyword.value)
    alert('업무 전달이 완료되었습니다.')
  }

  // 담당자 선택 모달 관련
  const showUserSelectModal = ref(false)
  const userNameFilter = ref('')
  const userPositionFilter = ref(null)
  const userRankFilter = ref(null)

  // 직위 옵션
  const positionOptions = [
    { value: 'manager', label: '팀장' },
    { value: 'leader', label: '리더' },
    { value: 'member', label: '팀원' }
  ]

  // 직급 옵션
  const rankOptions = [
    { value: 'senior', label: '수석' },
    { value: 'principal', label: '책임' },
    { value: 'senior_manager', label: '차장' },
    { value: 'manager', label: '과장' },
    { value: 'assistant_manager', label: '대리' },
    { value: 'staff', label: '사원' }
  ]
</script>

<style lang="scss" scoped>
  // 페이지 컨테이너
  .task-handover-container {
    width: 100%;
    height: 100%;

    // 페이지 헤더
    .task-handover-header {
      margin-bottom: 24px;

      .page-title {
        margin: 0 0 8px 0;
      }

      .page-description {
        color: $text-default-color;
        margin: 0;
      }
    }

    // 메인 레이아웃
    .task-handover-layout {
      display: flex;
      gap: 12px;
      height: calc(100vh - 140px);

      @media (max-width: 1200px) {
        flex-direction: column;
        height: auto;
      }

      // 공통 패널 스타일
      .task-selection-panel,
      .task-handover-panel {
        background-color: #fff;
        border-radius: 6px;
        border: 1px solid var(--color-gray-20, #cdd1d5);
        padding: 24px;
        display: flex;
        flex-direction: column;

        .panel-header {
          margin-bottom: 20px;

          .panel-title {
            margin: 0;
            padding-bottom: 12px;
            border-bottom: 1px solid $border-color;
            @include heading(4);
          }
        }
      }

      // 왼쪽 패널: 업무선택 영역
      .task-selection-panel {
        flex: 1;
        overflow: hidden;

        // 필터 섹션
        .filter-section {
          margin-bottom: 24px;

          .search-container {
            display: flex;
            gap: 8px;
            margin-bottom: 8px;

            .search-input {
              flex: 1;
            }
          }

          .filter-row {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-bottom: 8px;

            .filter-select {
              flex: 1;
              min-width: 180px;

              @media (max-width: 768px) {
                min-width: 100%;
              }
            }
          }

          .filter-actions {
            display: flex;
            justify-content: flex-end;
            gap: 12px;
            margin-top: 16px;
          }
        }

        // 선택 헤더
        .selection-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;

          .selection-title {
            margin: 0;
            @include heading(5);
          }

          .selection-actions {
            display: flex;
            gap: 8px;
          }
        }

        // 카드 리스트
        .task-card-list {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-right: 8px;

          &::-webkit-scrollbar {
            width: 6px;
          }

          &::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }

          &::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 10px;

            &:hover {
              background: #aaa;
            }
          }

          // 빈 상태
          .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 0;
            color: $text-default-color;

            i {
              margin-bottom: 16px;
              color: #ccc;
            }

            p {
              margin: 0;
              font-size: 14px;
            }
          }

          // 업무 카드
          .task-card {
            display: flex;
            padding: 16px;
            border-radius: 6px;
            border: 1px solid var(--color-gray-20, #cdd1d5);
            background-color: #fff;
            cursor: pointer;
            transition: $transition-normal;

            &:hover {
              background-color: rgba($primary-color, 0.03);
              box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
              transform: translateY(-2px);
              border-color: rgba($primary-color, 0.3);
            }

            &.is-selected {
              border-color: $primary-color;
              background-color: rgba($primary-color, 0.05);

              &:hover {
                background-color: rgba($primary-color, 0.08);
              }
            }

            // 체크박스 영역
            .task-card-checkbox {
              display: flex;
              align-items: center;
              margin-right: 16px;

              .checkbox-circle {
                width: 22px;
                height: 22px;
                border-radius: 50%;
                border: 2px solid $border-color;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: $transition-normal;

                &.is-checked {
                  background-color: $primary-color;
                  border-color: $primary-color;
                }
              }
            }

            // 카드 내용
            .task-card-content {
              flex: 1;
              display: flex;
              flex-direction: column;

              // 카드 헤더
              .task-card-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 10px;

                .task-tags {
                  display: flex;
                  flex-wrap: wrap;
                  gap: 6px;
                }

                .task-date {
                  display: flex;
                  align-items: center;
                  gap: 4px;
                  font-size: 12px;
                  color: $text-default-color;
                  white-space: nowrap;

                  i {
                    color: $text-default-color;
                  }
                }
              }

              // 업무 제목
              .task-title {
                font-size: 16px;
                font-weight: 500;
                color: $text-default-color;
                margin-bottom: 12px;
                line-height: 1.4;
              }

              // 카드 푸터
              .task-card-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .task-meta {
                  display: flex;
                  gap: 16px;
                  font-size: 12px;
                  color: $text-default-color;

                  .comment-count,
                  .share-count {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                  }
                }

                .task-assignee {
                  display: flex;
                  align-items: center;

                  .profile-image {
                    width: 28px;
                    height: 30px;
                    border-radius: 50%;
                    background-color: #eee;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;

                    img {
                      width: 100%;
                      height: 100%;
                      object-fit: cover;
                    }
                  }
                }
              }
            }
          }
        }
      }

      // 오른쪽 패널: 업무전달 영역
      .task-handover-panel {
        width: 410px;

        @media (max-width: 1200px) {
          width: 100%;
        }

        // 검색 섹션
        .search-section {
          margin-bottom: 20px;

          .recipient-search {
            display: flex;
            gap: 8px;

            .recipient-search-input {
              flex: 1;
            }
          }
        }

        // 선택된 수신자
        .selected-recipient {
          margin-bottom: 24px;

          .recipient-card {
            display: flex;
            align-items: center;
            padding: 14px;
            border-radius: 6px;
            border: 1px solid $border-color;
            background-color: rgba($primary-color, 0.03);
            transition: $transition-normal;

            &:hover {
              border-color: rgba($primary-color, 0.3);
            }

            .recipient-avatar {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background-color: #eee;
              display: flex;
              justify-content: center;
              align-items: center;
              margin-right: 14px;
              overflow: hidden;

              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }

            .recipient-info {
              flex: 1;

              .recipient-name {
                font-size: 16px;
                font-weight: 500;
                color: $text-default-color;
                margin-bottom: 4px;
              }

              .recipient-position {
                font-size: 13px;
                color: $text-default-color;
              }
            }
          }
        }

        // 인수인계 헤더
        .handover-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;

          .handover-title {
            margin: 0;
          }
        }

        // 선택된 업무 요약
        .selected-tasks-summary {
          margin-bottom: 24px;
          padding: 16px;
          border-radius: 6px;
          border: 1px solid $border-color;
          background-color: #fafafa;

          .summary-count {
            display: flex;
            align-items: baseline;
            margin-bottom: 12px;

            .count-number {
              font-size: 28px;
              font-weight: 600;
              color: $primary-color;
              margin-right: 6px;
            }

            .count-label {
              font-size: 14px;
              color: $text-default-color;
            }
          }

          .summary-list {
            display: flex;
            flex-direction: column;
            gap: 8px;

            .summary-item {
              padding: 10px 12px;
              border-radius: 6px;
              background-color: #fff;
              border: 1px solid $border-color;
              font-size: 13px;
              color: $text-default-color;
              transition: $transition-normal;

              &:hover {
                border-color: rgba($primary-color, 0.3);
                background-color: rgba($primary-color, 0.02);
              }
            }

            .summary-more {
              padding: 10px 12px;
              border-radius: 6px;
              background-color: #fff;
              border: 1px solid $border-color;
              font-size: 13px;
              color: $text-default-color;
              text-align: center;
            }
          }

          .summary-empty {
            padding: 20px 0;
            font-size: 14px;
            color: $text-default-color;
            text-align: center;
          }
        }

        // 안내사항
        .handover-guide {
          margin-top: auto;
          padding-top: 20px;

          .guide-title {
            font-size: 16px;
            font-weight: 600;
            color: $text-default-color;
            margin: 0 0 12px 0;
            @include heading(6);
          }

          .guide-list {
            list-style-type: none;
            padding: 0;
            margin: 0;

            .guide-item {
              position: relative;
              padding-left: 18px;
              margin-bottom: 12px;
              font-size: 14px;
              color: $text-default-color;
              line-height: 1.5;

              &:before {
                content: '';
                position: absolute;
                left: 0;
                top: 8px;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background-color: $primary-color;
              }

              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }

        // 하단 버튼 영역
        .handover-actions {
          margin-top: 24px;

          .handover-button {
            width: 100%;
            height: 48px;
            font-size: 16px;
            font-weight: 500;
            transition: $transition-normal;

            &:not(:disabled):hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 8px rgba($primary-color, 0.3);
            }
          }
        }
      }
    }
  }
</style>
