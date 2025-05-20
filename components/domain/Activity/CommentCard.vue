<template>
  <div class="comment-card">
    <div class="comment-header">
      <div class="comment-info">
        <div class="comment-date">{{ comment.date }}</div>
        <div class="comment-user">
          <span class="company">{{ comment.user.company }}</span>
          <span class="separator">></span>
          <span class="team">{{ comment.user.team }}</span>
          &nbsp;
          <span class="user-name">{{ comment.user.name }}</span>
        </div>
      </div>
      <div class="comment-actions">
        <button class="action-btn edit-btn" @click.stop="$emit('edit', comment.id)">
          <Icon name="mdi:pencil" size="16" />
        </button>
        <button class="action-btn delete-btn" @click.stop="$emit('delete', comment.id)">
          <Icon name="mdi:delete" size="16" />
        </button>
        <button class="action-btn reply-btn" @click.stop="$emit('reply', comment.id)">
          <Icon name="mdi:reply" size="16" />
        </button>
      </div>
    </div>
    <div class="comment-content">
      {{ comment.content }}
    </div>
  </div>

  <!-- 대댓글 목록 -->
  <div v-if="comment.replies && comment.replies.length > 0" class="replies-list">
    <ReplyCard
      v-for="(reply, index) in comment.replies"
      :key="index"
      :reply="reply"
      :parent-content="comment.content"
      @edit="$emit('edit-reply', reply.id)"
      @delete="$emit('delete-reply', reply.id)"
    />
  </div>
</template>

<script setup>
  import ReplyCard from './ReplyCard.vue'
  /**
   * 댓글 카드 컴포넌트
   * 댓글 정보를 표시하는 카드 컴포넌트
   */

  // props 정의
  const props = defineProps({
    comment: {
      type: Object,
      required: true,
      default: () => ({
        id: '',
        content: '',
        date: '',
        user: {
          company: '',
          team: '',
          name: ''
        },
        replies: []
      })
    }
  })

  // 이벤트 정의
  defineEmits(['edit', 'delete', 'reply', 'edit-reply', 'delete-reply'])
</script>

<style lang="scss" scoped>
  .comment-card {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;

    .comment-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--color-gray-30, #b1b8be);

      .comment-info {
        .comment-date {
          font-size: 14px;
          color: #666;
          margin-bottom: 4px;
        }

        .comment-user {
          font-size: 14px;
          color: #333;

          .separator {
            margin: 0 6px;
            color: #ccc;
          }

          .team {
            color: var(--color-gray-70, #464c53);
            font-size: 14px;
            line-height: 150%; /* 21px */
          }

          .user-name {
            color: var(--color-gray-70, #464c53);

            font-size: 14px;
            font-weight: 700;
            line-height: 140%; /* 19.6px */
          }
        }
      }

      .comment-actions {
        display: flex;
        gap: 8px;

        .action-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          color: #666;

          &:hover {
            background-color: #f0f0f0;
            color: #333;
          }

          &.edit-btn:hover {
            color: #2196f3;
          }

          &.delete-btn:hover {
            color: #f44336;
          }

          &.reply-btn:hover {
            color: #4caf50;
          }
        }
      }
    }

    .comment-content {
      color: var(--color-gray-70, #464c53);
      font-size: 16px;
      line-height: 150%; /* 24px */
      word-break: break-word;
    }

    .replies-list {
      margin-top: 12px;
      margin-left: 24px;
    }
  }
</style>
