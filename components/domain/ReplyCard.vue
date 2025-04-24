<template>
  <div class="reply-card">
    <div class="reply-header">
      <div class="reply-info">
        <div class="reply-date">{{ reply.date }}</div>
        <div class="reply-user">
          <span class="company">{{ reply.user.company }}</span>
          <span class="separator">|</span>
          <span class="team">{{ reply.user.team }}</span>
          <span class="separator">|</span>
          <span class="user-name">{{ reply.user.name }}</span>
        </div>
      </div>
      <div class="reply-actions">
        <button class="action-btn edit-btn" @click.stop="$emit('edit', reply.id)">
          <Icon name="mdi:pencil" size="16" />
        </button>
        <button class="action-btn delete-btn" @click.stop="$emit('delete', reply.id)">
          <Icon name="mdi:delete" size="16" />
        </button>
      </div>
    </div>
    <div class="reply-reference">
      {{ truncatedParentContent }}
    </div>
    <div class="reply-content">
      {{ reply.content }}
    </div>
  </div>
</template>

<script setup>
  /**
   * 대댓글 카드 컴포넌트
   * 대댓글 정보를 표시하는 카드 컴포넌트
   */

  import { computed } from 'vue'

  // props 정의
  const props = defineProps({
    reply: {
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
        }
      })
    },
    parentContent: {
      type: String,
      default: ''
    }
  })

  // 부모 댓글 내용 축약 (50자 이내)
  const truncatedParentContent = computed(() => {
    if (props.parentContent.length <= 50) {
      return props.parentContent
    }
    return props.parentContent.substring(0, 50) + '...'
  })

  // 이벤트 정의
  defineEmits(['edit', 'delete'])
</script>

<style lang="scss" scoped>
  .reply-card {
    background-color: #f5f5f5;
    border-radius: 6px;
    padding: 14px;
    margin-bottom: 12px;

    .reply-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 10px;

      .reply-info {
        .reply-date {
          font-size: 13px;
          color: #666;
          margin-bottom: 3px;
        }

        .reply-user {
          font-size: 13px;
          color: #333;

          .separator {
            margin: 0 5px;
            color: #ccc;
          }

          .team {
            font-weight: 500;
          }

          .user-name {
            font-weight: 600;
          }
        }
      }

      .reply-actions {
        display: flex;
        gap: 6px;

        .action-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 3px;
          border-radius: 3px;
          color: #666;

          &:hover {
            background-color: #eaeaea;
            color: #333;
          }

          &.edit-btn:hover {
            color: #2196f3;
          }

          &.delete-btn:hover {
            color: #f44336;
          }
        }
      }
    }

    .reply-reference {
      font-size: 13px;
      line-height: 1.4;
      color: #555;
      background-color: #e6f2ff;
      border-left: 3px solid #2196f3;
      padding: 8px 12px;
      margin-bottom: 10px;
      border-radius: 0 4px 4px 0;
    }

    .reply-content {
      font-size: 13px;
      line-height: 1.5;
      color: #333;
    }
  }
</style>
