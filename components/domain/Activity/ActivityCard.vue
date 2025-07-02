<template>
  <div class="activity-card-container">
    <!-- 활동 카드 -->
    <div class="activity-card">
      <!-- 활동 헤더 -->
      <div class="activity-header">
        <div class="activity-info">
          <div class="activity-date flex gap-5 items-center">
            <div
              class="activity-type"
              :class="{
                'activity-type--excellent': evaluation === '우수',
                'activity-type--average': evaluation === '보통',
                'activity-type--poor': evaluation === '미흡'
              }"
            >
              {{ status }}
            </div>
            <span class="current-date">{{ currentDate }}</span>
          </div>
        </div>

        <div class="activity-user-section">
          <div class="activity-user">
            <div class="user-avatar">
              <!-- <img src="/images/avatar-placeholder.png" alt="사용자 아바타" /> -->
            </div>
            <span class="user-name">{{ user.name }}</span>
            <div class="user-divider"></div>
            <span class="user-team">{{ user.company }} > {{ user.team }}</span>
          </div>
          <div class="activity-actions flex gap-1">
            <UiButton iconOnly variant="ghost" size="small" @click="startEdit">
              <i class="icon icon-pencil icon-lg"></i>
            </UiButton>
            <UiButton iconOnly variant="ghost" size="small" @click="$emit('delete', activityId)">
              <i class="icon icon-delete icon-md"></i>
            </UiButton>
          </div>
        </div>
      </div>
      <!-- 활동 헤더 EEE -->

      <!-- 활동 내용 -->
      <div class="activity-content">
        <!-- 수정 모드: TinyEditor 표시 -->
        <div v-if="isEditing" class="editor-container">
          <!-- 에디터 상단 컨트롤 -->
          <div class="editor-top-controls flex justify-between mb-16 items-center">
            <div class="left-controls flex gap-2 items-center">
              <!-- ui-date-picker 컴포넌트 -->
              <div class="date-picker-wrapper">
                <span class="control-label">날짜:</span>
                <UiDatePicker
                  class="date-picker"
                  startPlaceholder="시작일"
                  endPlaceholder="마지막날짜"
                />
              </div>
            </div>
            <div class="right-controls flex gap-2 items-center">
              <div class="select-group flex gap-2">
                <div class="select-wrapper">
                  <UiSelect
                    class="min-w-130"
                    :options="[
                      { value: 'progress', label: '진행중' },
                      { value: 'completed', label: '완료' },
                      { value: 'before', label: '진행전' },
                      { value: 'hold', label: '취소/보류' }
                    ]"
                  />
                </div>
                <div class="select-wrapper">
                  <UiSelect
                    class="min-w-130"
                    v-model="progressStatus"
                    :options="[
                      { value: 'excellent', label: '우수' },
                      { value: 'normal', label: '보통' },
                      { value: 'poor', label: '미흡' }
                    ]"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- TinyEditor -->
          <TinyEditor
            v-model="editedContent"
            :height="400"
            placeholder="활동 내용을 입력하세요..."
          />

          <!-- 에디터 하단 컨트롤 -->
          <div class="editor-bottom-actions flex justify-between mt-20 items-center">
            <div class="left-actions">
              <UiButton iconOnly variant="ghost" size="small" title="파일 첨부">
                <i class="icon icon-paper-clip icon-md"></i>
              </UiButton>
            </div>
            <div class="right-actions flex gap-2">
              <UiButton variant="secondary-line" @click="cancelEdit"> 취소 </UiButton>
              <UiButton variant="primary" @click="saveEdit"> 저장 </UiButton>
            </div>
          </div>
        </div>
        <!-- 일반 모드: HTML 내용 표시 -->
        <div v-else class="activity-list" v-html="content"></div>
      </div>
      <!-- 활동 내용 EEE -->

      <!-- 활동 하단 정보 - 수정 모드가 아닐 때만 표시 -->
      <div v-if="!isEditing" class="activity-footer">
        <div class="activity-timestamp">
          <span class="timestamp-text">{{ createdDate }}</span>
          <button class="comment-btn">
            <i class="icon icon-comment"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Figma 기반 댓글 섹션 -->
    <div class="comment-section">
      <!-- 첫 번째 댓글 -->
      <div class="comment-container">
        <div class="comment-card">
          <div class="comment-content">
            피드백 내용이 들어가면 여기에서 나타납니다.<br />
            그냥 순서를 붙여봤습니다.<br />
            내일은 금요일입니다. 화이팅.
          </div>
          <div class="comment-footer">
            <div class="comment-user">
              <div class="user-details">
                <div class="user-avatar">
                  <!-- <img src="/images/avatar-placeholder.png" alt="사용자 아바타" /> -->
                </div>
                <span class="user-name">신해인 책임</span>
                <span class="user-team">AX Group > UXUI팀</span>
                <div class="comment-actions flex gap-1">
                  <UiButton
                    iconOnly
                    variant="ghost"
                    size="small"
                    @click="$emit('edit-comment', 'comment-1')"
                    title="댓글 수정"
                  >
                    <i class="icon icon-pencil icon-sm"></i>
                  </UiButton>
                  <UiButton
                    iconOnly
                    variant="ghost"
                    size="small"
                    @click="$emit('delete-comment', 'comment-1')"
                    title="댓글 삭제"
                  >
                    <i class="icon icon-delete icon-sm"></i>
                  </UiButton>
                  <UiButton
                    iconOnly
                    variant="ghost"
                    size="small"
                    @click="$emit('reply-comment', 'comment-1')"
                    title="댓글 답글"
                  >
                    <i class="icon icon-comment icon-sm"></i>
                  </UiButton>
                </div>
              </div>
              <div class="comment-actions-group">
                <span class="comment-date">2025.08.30</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 두 번째 댓글 (중첩 구조) - 내가 작성한 댓글 -->
      <div class="comment-container comment-container--nested">
        <div class="comment-card comment-card--my-comment">
          <!-- 이전 댓글 참조 - 헤더와 내용 순서 변경 -->
          <div class="comment-reference">
            <div class="reference-content">
              피드백 내용이 들어가면 여기에서 나타납니다.<br />
              그냥 순서를 붙여봤습니다.<br />
              내일은 금요일입니다. 화이팅.
            </div>
            <div class="reference-header">
              <div class="reference-user">
                <span class="user-name">신해인 책임</span>
                <span class="user-team">AX Group > UXUI팀</span>
              </div>
              <span class="reference-date">2025.08.30</span>
            </div>
          </div>

          <!-- 현재 댓글 내용 -->
          <div class="comment-content">
            피드백에 대한 내용을 다시 피드백하는 대댓글 같은 기능입니다.<br />
            상단에는 1차 피드백이 담길것이고, 지금은 아래와 같은 내용입니다.<br />
            1차 피드백에 대한 추가 피드백입니다.
          </div>

          <div class="comment-footer">
            <div class="comment-user">
              <div class="user-details">
                <div class="user-avatar">
                  <!-- <img src="/images/avatar-placeholder.png" alt="사용자 아바타" /> -->
                </div>
                <span class="user-name">이은영 책임</span>
                <span class="user-team">AX Group > UXUI팀</span>
                <div class="comment-actions flex gap-1">
                  <UiButton
                    iconOnly
                    variant="ghost"
                    size="small"
                    @click="$emit('edit-comment', 'comment-2')"
                    title="댓글 수정"
                  >
                    <i class="icon icon-pencil icon-sm"></i>
                  </UiButton>
                  <UiButton
                    iconOnly
                    variant="ghost"
                    size="small"
                    @click="$emit('delete-comment', 'comment-2')"
                    title="댓글 삭제"
                  >
                    <i class="icon icon-delete icon-sm"></i>
                  </UiButton>
                  <UiButton
                    iconOnly
                    variant="ghost"
                    size="small"
                    @click="$emit('reply-comment', 'comment-2')"
                    title="댓글 답글"
                  >
                    <i class="icon icon-comment icon-sm"></i>
                  </UiButton>
                </div>
              </div>
              <div class="comment-actions-group">
                <span class="comment-date">2025.08.31</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 세 번째 댓글 (더 깊은 중첩) - 내가 작성한 댓글 -->
      <div class="comment-container comment-container--deep-nested">
        <div class="comment-card comment-card--my-comment">
          <!-- 이전 댓글 참조 - 헤더와 내용 순서 변경 -->
          <div class="comment-reference">
            <div class="reference-content">
              1차 피드백에 대한 내용 1차 피드백에 대한 내용 1차 피드백에 대한 내용 1차 피드백...
            </div>
            <div class="reference-header">
              <div class="reference-user">
                <span class="user-name">이은영 책임</span>
                <span class="user-team">AX Group > UXUI팀</span>
              </div>
              <span class="reference-date">2025.08.29</span>
            </div>
          </div>

          <!-- 현재 댓글 내용 -->
          <div class="comment-content">
            1차 피드백 + 추가 내용입니다.<br />
            진행 상황이 좋아 보입니다.<br />
            계속 이렇게 진행해 주세요.
          </div>

          <div class="comment-footer">
            <div class="comment-user">
              <div class="user-details">
                <div class="user-avatar">
                  <!-- <img src="/images/avatar-placeholder.png" alt="사용자 아바타" /> -->
                </div>
                <span class="user-name">이은영 책임</span>
                <span class="user-team">AX Group > UXUI팀</span>
                <div class="comment-actions flex gap-1">
                  <UiButton
                    iconOnly
                    variant="ghost"
                    size="small"
                    @click="$emit('edit-reply', 'comment-3')"
                    title="댓글 수정"
                  >
                    <i class="icon icon-pencil icon-sm"></i>
                  </UiButton>
                  <UiButton
                    iconOnly
                    variant="ghost"
                    size="small"
                    @click="$emit('delete-reply', 'comment-3')"
                    title="댓글 삭제"
                  >
                    <i class="icon icon-delete icon-sm"></i>
                  </UiButton>
                  <UiButton
                    iconOnly
                    variant="ghost"
                    size="small"
                    @click="$emit('reply-comment', 'comment-3')"
                    title="댓글 답글"
                  >
                    <i class="icon icon-comment icon-sm"></i>
                  </UiButton>
                </div>
              </div>
              <div class="comment-actions-group">
                <span class="comment-date">2025.08.31</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  /**
   * ActivityCard 컴포넌트 - 에디터 수정 기능 포함
   */

  // 수정 모드 상태
  const isEditing = ref(false)
  const editedContent = ref('')

  // Props 정의
  const props = defineProps({
    // 활동 고유 ID
    activityId: {
      type: [String, Number],
      required: true
    },
    // 활동 상태 (진행중, 완료, 보류 등)
    status: {
      type: String,
      default: '진행중'
    },
    // 평가 상태 (우수, 보통, 미흡)
    evaluation: {
      type: String,
      default: '보통',
      validator: value => ['우수', '보통', '미흡'].includes(value)
    },
    // 현재 날짜
    currentDate: {
      type: String,
      default: () => new Date().toISOString().split('T')[0]
    },
    // 생성 날짜
    createdDate: {
      type: String,
      default: () => new Date().toISOString().split('T')[0]
    },
    // 사용자 정보
    user: {
      type: Object,
      default: () => ({
        name: '사용자',
        company: '회사명',
        team: '팀명'
      })
    },
    // 활동 내용 (HTML)
    content: {
      type: String,
      default: '<ul><li>활동 내용이 없습니다.</li></ul>'
    }
  })

  // 이벤트 정의
  const emit = defineEmits([
    'edit',
    'delete',
    'reply',
    'edit-comment',
    'delete-comment',
    'reply-comment',
    'edit-reply',
    'delete-reply',
    'add-comment'
  ])

  /**
   * 수정 모드 시작
   */
  const startEdit = () => {
    isEditing.value = true
    editedContent.value = props.content
  }

  /**
   * 수정 저장
   */
  const saveEdit = () => {
    // 저장 로직
    isEditing.value = false
  }

  /**
   * 수정 취소
   */
  const cancelEdit = () => {
    isEditing.value = false
    editedContent.value = ''
  }
</script>

<style lang="scss" scoped>
  .activity-card-container {
    margin-bottom: 32px;
  }

  /* Figma 기반 활동 카드 스타일 */
  .activity-card {
    background: #e5f6ff; // 확인된 배경색
    border-radius: 4px;
    padding: 16px;
    margin-bottom: 16px;

    .activity-header {
      margin-bottom: 8px;
      padding-bottom: 8px;
      border-bottom: 1px solid #cdd1d5;
    }

    .activity-info {
      width: 100%;
      margin-bottom: 8px;
      .activity-date {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 4px;

        .activity-type {
          display: flex;
          align-items: center;
          flex: none;
          gap: 4px;
          font-family: 'Pretendard', sans-serif;
          font-weight: 700;
          font-size: 14px;
          line-height: 1.4;
          color: #0084ff;

          &::before {
            content: '';
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #0084ff;
          }

          &--excellent::before {
            background-color: #0084ff;
          }

          &--average::before {
            background-color: #f59e0b;
          }

          &--poor::before {
            background-color: #ef4444;
          }
        }

        .current-date {
          flex: none;
          font-family: 'Pretendard', sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 1.5;
          color: #6d7882;
          text-align: right;
        }
      }
    }

    .activity-user-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .activity-user {
      display: flex;
      align-items: center;
      gap: 2px; // 확인된 간격

      .user-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        overflow: hidden;
        background: #898989;
        border: 1px solid #cdd1d5;
        margin-right: 6px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .user-name {
        font-family: 'Pretendard', sans-serif;
        font-weight: 700;
        font-size: 14px;
        line-height: 1.4;
        color: #00aaff; // 확인된 사용자명 색상
      }

      .user-divider {
        width: 2px;
        height: 16px;
        background-color: #b1b8be;
        margin: 0 8px;
      }

      .user-team {
        font-family: 'Pretendard', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 1.5;
        color: #6d7882;
      }
    }

    .activity-actions {
      display: flex;
      gap: 4px;
    }

    .activity-content {
      margin: 8px 0;

      .activity-list {
        font-family: 'Pretendard', sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 1.5;
        color: #464c53;
      }
    }

    .activity-footer {
      border-top: 1px solid #cdd1d5;
      padding-top: 8px;

      .activity-timestamp {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .timestamp-text {
          font-family: 'Pretendard', sans-serif;
          font-weight: 400;
          font-size: 14px;
          line-height: 1.5;
          color: #6d7882;
        }
      }
    }
  }

  /* Figma 기반 댓글 섹션 */
  .comment-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .comment-card {
    background: #f4f5f6; // 확인된 배경색
    border-radius: 4px;
    padding: 16px;
    margin-left: 16px;

    &--simple {
      background: #ffffff;
      border: 1px solid #cdd1d5;
    }

    // 내가 작성한 댓글 스타일
    &--my-comment {
      background: #e5f6ff; // 파란색 배경

      // 내 댓글의 사용자명은 메인 컬러로
      .user-name {
        color: #0084ff; // 메인 파란색
      }
    }
  }

  .comment-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid #cdd1d5;
  }

  .comment-content {
    font-family: 'Pretendard', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    color: #464c53;
    margin-bottom: 8px;
  }

  .comment-footer {
    border-top: 1px solid #cdd1d5;
    padding-top: 8px;
  }

  .comment-user {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    flex-direction: row-reverse;
  }

  .user-details {
    display: flex;
    gap: 4px;
    align-items: center;

    .comment-header & {
      flex-direction: row;
      align-items: center;
      gap: 8px;
    }
  }

  .user-name {
    font-family: 'Pretendard', sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 1.4;
    color: #464c53;
  }

  .user-team {
    font-family: 'Pretendard', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.5;
    color: #6d7882;
  }

  .comment-date {
    font-family: 'Pretendard', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.5;
    color: #6d7882;
  }

  .comment-actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* 댓글 참조 부분 - 수정된 스타일 */
  .comment-reference {
    background: #ffffff;
    border: 1px solid #cdd1d5;
    border-radius: 4px;
    padding: 16px;
    margin-bottom: 8px;

    &--highlighted {
      background: #ffffff;
      border: 1px solid #cdd1d5;
      border-radius: 8px; // 하이라이트된 참조는 더 둥근 모서리
    }
  }

  .reference-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px; // 변경: margin-bottom에서 margin-top으로
    padding-top: 8px; // 변경: padding-bottom에서 padding-top으로
    border-top: 1px solid #cdd1d5; // 변경: border-bottom에서 border-top으로
  }

  .reference-user {
    display: flex;
    align-items: center;
    gap: 8px;
    .user-name {
      color: #1e2124; // 참조된 사용자명은 더 진한 색
    }
  }

  .reference-date {
    font-family: 'Pretendard', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.5;
    color: #6d7882;
  }

  .reference-content {
    font-family: 'Pretendard', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.5;
    color: #464c53;
  }

  /* 버튼 스타일 */
  .comment-btn {
    width: 20px;
    height: 20px;
    border: none;
    background: transparent;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6d7882;

    &:hover {
      background: rgba(109, 120, 130, 0.1);
    }
  }

  .icon-btn {
    width: 20px;
    height: 20px;
    border: none;
    background: transparent;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #464c53; // 단순 댓글의 아이콘은 더 진한 색

    &:hover {
      background: rgba(70, 76, 83, 0.1);
    }
  }

  .comment-icon {
    width: 14px;
    height: 14px;
    color: inherit;
  }

  /* 유틸리티 클래스 */
  .flex {
    display: flex;
  }

  .flex-col {
    flex-direction: column;
  }

  .gap-5 {
    gap: 5px;
  }

  .gap-1 {
    gap: 4px;
  }

  .items-center {
    align-items: center;
  }

  /* 에디터 컨테이너 스타일 */
  .editor-container {
    .editor-top-controls {
      border-bottom: 1px solid #cdd1d5;
      padding-bottom: 16px;

      .control-label {
        font-family: 'Pretendard', sans-serif;
        font-weight: 500;
        font-size: 14px;
        color: #464c53;
        margin-right: 8px;
        white-space: nowrap;
      }

      .date-picker-wrapper {
        display: flex;
        align-items: center;
        gap: 8px;

        .date-picker {
          background: #ffffff;
          border-radius: 4px;

          :deep(.ui-datepicker__range-input) {
            background: #ffffff;
            border: 1px solid #cdd1d5;
            border-radius: 4px;
            padding: 8px 12px;
            min-width: 200px;

            .ui-datepicker__icon {
              color: #6d7882;
            }

            .ui-datepicker__placeholder {
              color: #6d7882;
              font-size: 14px;
            }

            .ui-datepicker__range-separator {
              color: #6d7882;
              margin: 0 8px;
            }
          }
        }
      }

      .select-group {
        display: flex;
        gap: 16px;

        .select-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }
      }
    }

    .editor-bottom-actions {
      border-top: 1px solid #cdd1d5;
      padding-top: 16px;
    }
  }

  .user-avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #cdd1d5;
  }
</style>
