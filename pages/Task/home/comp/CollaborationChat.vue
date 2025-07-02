<template>
  <div class="collaboration-chat">
    <!-- 채팅 메시지 리스트 -->
    <div v-for="message in props.messages" :key="message.id" class="chat-item">
      <!-- 피드백 타입 메시지 -->
      <div v-if="message.type === 'feedback'" class="chat-message-group">
        <div class="chat-message chat-message--primary">
          <div class="chat-message__content">
            {{ message.content }}
          </div>

          <div class="chat-message__footer">
            <div class="chat-message__meta">
              <span class="chat-timestamp">{{ message.timestamp }}</span>
              <div class="chat-user-info">
                <span class="chat-user-name">{{ message.user.name }}</span>
                <span class="chat-user-team">{{ message.user.team }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 대댓글 타입 메시지 -->
      <div v-else-if="message.type === 'reply'" class="chat-reply">
        <div class="chat-reply__content">
          {{ message.content }}
        </div>

        <div class="chat-reply__footer">
          <span class="chat-timestamp">{{ message.timestamp }}</span>
          <div class="chat-user-profile">
            <div class="chat-user-info">
              <div class="user-avatar-with-name">
                <div class="user-avatar">
                  <img
                    v-if="message.user.avatar"
                    :src="message.user.avatar"
                    :alt="`${message.user.name} 아바타`"
                  />
                </div>
                <span class="chat-user-name">{{ message.user.name }}</span>
              </div>
              <span class="chat-user-team">{{ message.user.team }}</span>
            </div>
            <button class="comment-btn" @click="handleCommentClick(message.id)">
              <i class="icon-sm icon-comment"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  /**
   * 협업 채팅 컴포넌트
   * 피드백과 대댓글 형태의 채팅 인터페이스를 제공
   */

  // 컴포넌트 props 정의
  const props = defineProps({
    messages: {
      type: Array,
      default: () => [
        {
          id: 1,
          type: 'feedback',
          content:
            '피드백 내용이 들어가면 여기에서 나타납니다.\n그냥 순서를 붙여봤습니다.\n내일은 금요일입니다. 화이팅. 하지만 다시 돌아와서 지금은 수요일이지요.힘든...',
          timestamp: '2025.08.29 | 14:45:57',
          user: {
            name: '신해인 책임',
            team: 'AX Group > UXUI팀'
          }
        },
        {
          id: 2,
          type: 'reply',
          content:
            '피드백에 대한 내용을 다시 피드백하는 대댓글 같은 기능입니다.\n상단에는 1차 피드백이 담길것이고, 지금은 아래와 같은 내용입니다.\n1차 피드백에 대한 추가 피드백\n1차 피드백이 잘못되었을때 다시 고칠 수 있도록\n어떻게 진행되는가에 대한 질문\n이정도로 담길것 같습니다. 그럼 이만.',
          timestamp: '2022.07.12 | 14:45:57',
          user: {
            name: '신해인 책임',
            team: 'AX Group > UXUI팀',
            avatar: '/images/avatar-placeholder.png'
          }
        }
      ]
    }
  })

  // 이벤트 emit 정의
  const emit = defineEmits(['comment-click'])

  /**
   * 댓글 버튼 클릭 핸들러
   * @param {number} messageId - 메시지 ID
   */
  const handleCommentClick = messageId => {
    emit('comment-click', messageId)
  }
</script>

<style scoped lang="scss">
  // 채팅 컨테이너
  .collaboration-chat {
    margin-left: 24px;
    background: #f4f5f6;
    border-radius: 4px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  // 채팅 아이템
  .chat-item {
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  // 채팅 메시지 그룹
  .chat-message-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  // 메인 채팅 메시지 (피드백)
  .chat-message {
    background: #ffffff;
    border-radius: 4px;
    padding: 16px;

    &--primary {
      // 메인 피드백 메시지 스타일
    }
  }

  .chat-message__content {
    font-family: 'Pretendard', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.5;
    color: #464c53;
    margin-bottom: 8px;
    white-space: pre-line; // 줄바꿈 문자 처리

    // 3줄 제한 및 말줄임표 처리
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .chat-message__footer {
    border-top: 1px solid #cdd1d5;
    padding-top: 8px;
  }

  .chat-message__meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }

  // 채팅 대댓글
  .chat-reply {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .chat-reply__content {
    font-family: 'Pretendard', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    color: #464c53;
    margin-bottom: 8px;
    white-space: pre-line; // 줄바꿈 문자 처리
  }

  .chat-reply__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #cdd1d5;
    padding-top: 8px;
    gap: 8px;
  }

  // 시간 정보
  .chat-timestamp {
    font-family: 'Pretendard', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.5;
    color: #6d7882;
    text-align: right;
  }

  // 사용자 프로필 정보
  .chat-user-profile {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .chat-user-info {
    display: flex;
    align-items: center;
    gap: 8px;

    // 메인 메시지에서는 가로 배치
    .chat-message__meta & {
      flex-direction: row;
      align-items: center;
      gap: 8px;
    }
  }

  .user-avatar-with-name {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  // 사용자 아바타
  .user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    background: #898989;
    border: 1px solid #cdd1d5;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  // 사용자 이름
  .chat-user-name {
    font-family: 'Pretendard', sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 1.4;
    color: #1e2124;

    .chat-message__meta & {
      color: #464c53;
    }
  }

  // 사용자 팀 정보
  .chat-user-team {
    font-family: 'Pretendard', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.5;
    color: #6d7882;
  }

  // 댓글 버튼
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
    flex-shrink: 0;
    padding: 0;

    &:hover {
      background: rgba(109, 120, 130, 0.1);
    }

    &:focus {
      outline: 2px solid #0084ff;
      outline-offset: 1px;
    }
  }

  .comment-icon {
    width: 14px;
    height: 14px;
    color: inherit;
  }

  // 반응형 대응
  @media (max-width: 768px) {
    .collaboration-chat {
      margin-left: 0;
      padding: 12px;
    }

    .chat-message {
      padding: 12px;
    }

    .chat-message__meta {
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
    }

    .chat-reply__footer {
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
    }
  }
</style>
