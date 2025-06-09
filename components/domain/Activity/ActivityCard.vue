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
          <div class="activity-user">
            <span class="user-name">{{ user.name }}</span>
            &nbsp;
            <span class="user-info">
              <span class="company">{{ user.company }}</span>
              <span class="separator">></span>
              <span class="team">{{ user.team }}</span>
            </span>
          </div>
        </div>
        <div class="activity-actions flex flex-col gap-5">
          <span class="created-date">{{ createdDate }}</span>
          <div class="comment-actions flex gap-1">
            <UiButton iconOnly variant="ghost" size="small" @click="startEdit">
              <i class="icon icon-pencil icon-lg"></i>
            </UiButton>
            <UiButton iconOnly variant="ghost" size="small" @click="$emit('delete', activityId)">
              <i class="icon icon-delete icon-md"></i>
            </UiButton>
            <UiButton iconOnly variant="ghost" size="small" @click="$emit('reply', activityId)">
              <i class="icon icon-reply icon-lg"></i>
            </UiButton>
          </div>
        </div>
      </div>
      <!-- 활동 헤더 EEE -->

      <!-- 활동 내용 -->
      <div class="activity-content">
        <!-- 수정 모드: TinyEditor 표시 -->
        <div class="editor-container">
          <TinyEditor
            v-model="editedContent"
            :height="400"
            placeholder="활동 내용을 입력하세요..."
          />
          <!-- 수정 모드일 때는 저장/취소 버튼 -->
          <div class="comment-input-actions flex justify-between mt-20 items-center">
            <div class="left-actions">
              <UiButton iconOnly variant="ghost" size="small" title="파일 첨부">
                <i class="icon icon-paper-clip icon-md"></i>
              </UiButton>
            </div>
            <div class="right-actions flex gap-2">
              <UiSelect
                class="min-w-130"
                :options="[
                  { value: 'progress', label: '진행중' },
                  { value: 'completed', label: '완료' },
                  { value: 'before', label: '진행전' },
                  { value: 'hold', label: '취소/보류' }
                ]"
              />
              <UiSelect
                class="mr-10 min-w-130"
                v-model="progressStatus"
                :options="[
                  { value: 'excellent', label: '우수' },
                  { value: 'normal', label: '보통' },
                  { value: 'poor', label: '미흡' }
                ]"
              />
              <UiButton variant="primary" @click="saveEdit"> 저장 </UiButton>
              <UiButton variant="secondary-line" @click="cancelEdit"> 취소 </UiButton>
            </div>
          </div>
        </div>
        <!-- 일반 모드:  HTML 내용 표시 -->
        <div class="activity-list" v-html="content"></div>
      </div>
      <!-- 활동 내용 EEE -->
    </div>

    <!-- 해당 활동에 대한 댓글 섹션 -->
    <div class="activity-comments">
      <!-- 댓글 입력 영역 -->
      <div class="comment-input-area">
        <textarea
          v-model="newComment"
          :style="{ height: '100px' }"
          class="comment-input"
          :placeholder="`${user.name}님의 활동에 댓글을 남겨보세요...`"
          rows="2"
        ></textarea>
        <div class="comment-input-actions flex gap-5">
          <UiButton variant="primary" @click="addComment"> 등록 </UiButton>
          <UiButton variant="secondary-line"> 취소 </UiButton>
        </div>
      </div>
      <!-- 댓글 입력 영역 EEE -->

      <!-- 댓글 목록 -->
      <div class="comments-list mt-20">
        <!-- 댓글 1 -->
        <div class="comment-card">
          <!-- 댓글 헤더 -->
          <div class="comment-header">
            <div class="comment-info">
              <div class="comment-date">2025-06-09</div>
              <div class="comment-user">
                <span class="user-name">이영희</span>
                &nbsp;
                <span class="user-info">
                  <span class="company">ABC회사</span>
                  <span class="separator">></span>
                  <span class="team">디자인팀</span>
                </span>
              </div>
            </div>
            <div class="comment-actions flex gap-1">
              <UiButton
                iconOnly
                variant="ghost"
                size="small"
                @click="$emit('edit-comment', `${activityId}-comment-1`)"
              >
                <i class="icon icon-pencil icon-lg"></i>
              </UiButton>
              <UiButton
                iconOnly
                variant="ghost"
                size="small"
                @click="$emit('delete-comment', `${activityId}-comment-1`)"
              >
                <i class="icon icon-delete icon-md"></i>
              </UiButton>
              <UiButton
                iconOnly
                variant="ghost"
                size="small"
                @click="$emit('reply-comment', `${activityId}-comment-1`)"
              >
                <i class="icon icon-reply icon-lg"></i>
              </UiButton>
            </div>
          </div>
          <!-- 댓글 헤더 EEE -->

          <!-- 댓글 내용 -->
          <div class="comment-content">
            <!-- 이전 댓글 -->
            <div class="previous-comment">
              <div class="comment-user">
                <p class="comment-date">2025.06.09</p>
                <span class="user-name">홍길동</span>
                &nbsp;
                <span class="user-info">
                  <span class="company">ABC회사</span>
                  <span class="separator">></span>
                  <span class="team">디자인팀</span>
                </span>
              </div>
              <p>이 활동에 대한 피드백입니다. 진행 상황이 좋아 보입니다.</p>
            </div>
            <!-- 이전 댓글 EEE -->

            <!-- 현재 댓글 -->
            <div class="current-comment">
              <p>윗내용</p>
            </div>
            <!-- 현재 댓글 EEE -->
          </div>
          <!-- 댓글 내용 EEE -->
        </div>

        <!-- 댓글달기 버튼 클릭 시 나타나는 댓글 입력 영역 -->
        <div class="comment-input-area">
          <textarea
            v-model="newComment"
            :style="{ height: '100px' }"
            class="comment-input"
            :placeholder="`${user.name}님의 활동에 댓글을 남겨보세요...`"
            rows="2"
          ></textarea>
          <div class="comment-input-actions flex gap-5">
            <UiButton variant="primary" @click="addComment"> 등록 </UiButton>
            <UiButton variant="secondary-line"> 취소 </UiButton>
          </div>
        </div>
        <!-- 댓글 입력 영역 EEE -->

        <!-- 댓글 2 -->
        <div class="comment-card">
          <!-- 댓글 헤더 -->
          <div class="comment-header">
            <div class="comment-info">
              <div class="comment-date">2025-06-09</div>
              <div class="comment-user">
                <span class="user-name">댓글2사용자</span>
                &nbsp;
                <span class="user-info">
                  <span class="company">ABC회사</span>
                  <span class="separator">></span>
                  <span class="team">디자인팀</span>
                </span>
              </div>
            </div>
            <div class="comment-actions flex gap-1">
              <UiButton
                iconOnly
                variant="ghost"
                size="small"
                @click="$emit('edit-comment', `${activityId}-comment-1`)"
              >
                <i class="icon icon-pencil icon-lg"></i>
              </UiButton>
              <UiButton
                iconOnly
                variant="ghost"
                size="small"
                @click="$emit('delete-comment', `${activityId}-comment-1`)"
              >
                <i class="icon icon-delete icon-md"></i>
              </UiButton>
              <UiButton
                iconOnly
                variant="ghost"
                size="small"
                @click="$emit('reply-comment', `${activityId}-comment-1`)"
              >
                <i class="icon icon-reply icon-lg"></i>
              </UiButton>
            </div>
          </div>
          <!-- 댓글 헤더 EEE -->

          <!-- 댓글 내용 -->
          <div class="comment-content">
            <!-- 이전 댓글 -->
            <div class="previous-comment">
              <div class="comment-user">
                <p class="comment-date">2025.06.09</p>
                <span class="user-name">이영희 </span>
                &nbsp;
                <span class="user-info">
                  <span class="company">ABC회사</span>
                  <span class="separator">></span>
                  <span class="team">디자인팀</span>
                </span>
              </div>
              <p>윗내용</p>
            </div>
            <!-- 이전 댓글 EEE -->

            <!-- 현재 댓글 -->
            <div class="current-comment">
              <p>이 활동에 대한 피드백입니다. 진행 상황이 좋아 보입니다.</p>
            </div>
            <!-- 현재 댓글 EEE -->
          </div>
          <!-- 댓글 내용 EEE -->
        </div>
        <!-- 댓글 2 EEE -->
      </div>
      <!-- 댓글 목록 EEE -->
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  /**
   * ActivityCard 컴포넌트 - 에디터 수정 기능 포함
   */

  // 수정 모드 상태
  const isEditing = ref(true)
  const editedContent = ref('')

  /**
   * ActivityCard 컴포넌트
   * 활동 정보와 해당 활동의 댓글을 함께 표시하는 컴포넌트
   */

  // 댓글 입력 상태
  const newComment = ref('')

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

  // 댓글 추가 함수
  const addComment = () => {
    if (!newComment.value.trim()) {
      alert('댓글 내용을 입력해주세요')
      return
    }

    emit('add-comment', {
      activityId: props.activityId,
      content: newComment.value
    })

    newComment.value = ''
  }
</script>

<style lang="scss" scoped>
  .activity-card-container {
    margin-bottom: 32px;
  }

  .activity-card {
    border-radius: 8px;
    border: 1px solid #cdd1d5;
    background: #fff;
    padding: 16px;
    margin-bottom: 16px;

    .activity-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid #b1b8be;

      .activity-info {
        .activity-date {
          font-size: 14px;
          color: #666;
          margin-bottom: 4px;

          .activity-type {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 700;

            &--excellent {
              color: #3b82f6;
              position: relative;
              padding-left: 20px;

              &:before {
                content: '';
                position: absolute;
                left: 5px;
                top: 50%;
                transform: translateY(-50%);
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #3b82f6;
              }
            }

            &--average {
              color: #f59e0b;
              position: relative;
              padding-left: 20px;

              &:before {
                content: '';
                position: absolute;
                left: 5px;
                top: 50%;
                transform: translateY(-50%);
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #f59e0b;
              }
            }

            &--poor {
              color: #ef4444;
              position: relative;
              padding-left: 20px;

              &:before {
                content: '';
                position: absolute;
                left: 5px;
                top: 50%;
                transform: translateY(-50%);
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #ef4444;
              }
            }
          }

          .current-date {
            color: #6d7882;
            text-align: right;
            font-size: 14px;
            font-weight: 400;
            line-height: 150%;
          }
        }
      }

      .activity-actions {
        display: flex;
        gap: 8px;

        .created-date {
          color: #6d7882;
          text-align: right;
          font-size: 14px;
          font-weight: 400;
          line-height: 150%;
        }
      }
    }

    .activity-content {
      .activity-list {
        :deep(ul) {
          list-style-type: none;
          padding-left: 0;
          margin: 0;

          li {
            padding: 6px 0;
            font-size: 14px;
            color: #555;

            &:last-child {
              border-bottom: none;
            }
          }
        }
      }
    }
  }
  /* 활동별 댓글 섹션 */
  .activity-comments {
    margin-left: 24px;
    padding-left: 16px;
    border-left: 2px solid #f3f4f6;

    .comments-list {
      margin-bottom: 16px;
    }

    /* 댓글 카드 */
    .comment-card {
      margin-top: 8px;
      border-radius: 4px;
      border: 1px solid var(--color-gray-20, #cdd1d5);
      background: var(--color-gray-0, #fff);
      padding: 16px;

      .comment-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding-bottom: 8px;
      }

      .previous-comment {
        padding: 16px;
        gap: 8px;
        border-radius: 4px;
        border: 1px solid var(--color-gray-20, #cdd1d5);
        background: var(--color-system-y10, #ffeacc);
        margin-bottom: 8px;
        .comment-date {
          margin-bottom: 5px;
          @include font-style($body-small);
          color: $gray-50;
        }
        .comment-user {
          padding-bottom: 8px;
          border-bottom: 1px solid var(--color-gray-20, #cdd1d5);
          margin-bottom: 8px;
          .user-name {
            @include font-style($body-small-bold);
            color: $gray-90;
          }
          .user-info {
            @include font-style($body-small);
            color: $gray-70;
          }
        }
      }

      .current-comment {
        margin-top: 8px;
        padding-top: 7px;
        border-top: 1px solid var(--color-gray-20, #cdd1d5);
      }
    }

    /* 대댓글 */
    .replies-list {
      margin-left: 16px;

      .reply-card {
        background-color: #ffffff;
        border-radius: 6px;
        padding: 10px;
        margin-bottom: 8px;
        border-left: 3px solid #e0e0e0;

        .reply-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 6px;
          padding-bottom: 6px;
          border-bottom: 1px solid #f0f0f0;

          .reply-info {
            .reply-date {
              font-size: 11px;
              color: #999;
              margin-bottom: 2px;
            }

            .reply-user {
              font-size: 12px;
              color: #333;

              .separator {
                margin: 0 3px;
                color: #ccc;
              }

              .team,
              .user-name,
              .company {
                color: #464c53;
                font-size: 12px;
              }

              .user-name {
                font-weight: 600;
              }
            }
          }
        }

        .reply-content {
          color: #464c53;
          font-size: 13px;
          line-height: 130%;
          word-break: break-word;
        }
      }
    }

    /* 댓글 입력 영역 */
    .comment-input-area {
      margin-top: 16px;
      .comment-input {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        resize: vertical;
        font-size: 13px;
        font-family: inherit;

        &:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
        }

        &::placeholder {
          color: #999;
        }
      }

      .comment-input-actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 8px;
      }
    }
  }

  .separator {
    margin: 0 4px;
    color: #ccc;
  }
  .user-name {
    @include font-style($body-small-bold);
    color: $gray-90;
  }
  .user-info {
    @include font-style($body-small);
    color: $gray-50;
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
</style>
