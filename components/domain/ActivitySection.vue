<template>
  <div class="activity-section">
    <!-- 활동 카드 목록을 v-for로 반복 -->
    <div v-if="activities.length > 0" class="activity-cards">
      <ActivityCard
        v-for="activity in activities"
        :key="activity.id"
        :activity="activity"
        @edit="handleEditActivity"
        @delete="handleDeleteActivity"
        @reply="handleReplyToActivity"
      />
    </div>

    <!-- 댓글 섹션 -->
    <div class="comments-section">
      <h4 class="comments-title">댓글 ({{ comments.length }})</h4>

      <!-- 댓글 목록 -->
      <div class="comments-list">
        <CommentCard
          v-for="(comment, index) in comments"
          :key="index"
          :comment="comment"
          @edit="handleEditComment"
          @delete="handleDeleteComment"
          @reply="handleReplyToComment"
          @edit-reply="handleEditReply"
          @delete-reply="handleDeleteReply"
        />
      </div>

      <!-- 댓글 입력 영역 -->
      <div class="comment-input-area">
        <textarea
          v-model="newComment"
          class="comment-input"
          placeholder="댓글을 입력하세요..."
          rows="3"
        ></textarea>
        <div class="comment-actions">
          <UiButton variant="primary" @click="submitComment">등록</UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  /**
   * 활동 섹션 컴포넌트
   * 활동 카드와 댓글 시스템을 통합한 컴포넌트
   */

  import { ref } from 'vue'
  import ActivityCard from './ActivityCard.vue'
  import CommentCard from './CommentCard.vue'

  // props 정의
  const props = defineProps({
    activities: {
      type: Array,
      required: true
    }
  })

  // 댓글 데이터
  const comments = ref([])

  // 새 댓글 입력
  const newComment = ref('')

  // 댓글 제출
  const submitComment = () => {
    if (!newComment.value.trim()) return

    const comment = {
      id: `${comments.value.length + 1}`,
      content: newComment.value,
      date: new Date().toISOString().split('T')[0],
      user: {
        company: 'ABC 회사',
        team: '개발팀',
        name: '홍길동'
      },
      replies: [
        {
          id: `${comments.value.length + 1}`,
          content: newComment.value,
          date: new Date().toISOString().split('T')[0],
          user: {
            company: 'ABC 회사',
            team: '개발팀',
            name: '홍길동'
          }
        }
      ]
    }

    comments.value.push(comment)
    newComment.value = ''
  }

  // 활동 수정
  const handleEditActivity = id => {
    console.log('활동 수정:', id)
    // 활동 수정 로직 구현
  }

  // 활동 삭제
  const handleDeleteActivity = id => {
    console.log('활동 삭제:', id)
    // 활동 삭제 로직 구현
  }

  // 활동에 댓글 달기
  const handleReplyToActivity = id => {
    console.log('활동에 댓글 달기:', id)
    // 댓글 입력 영역으로 포커스
    document.querySelector('.comment-input').focus()
  }

  // 댓글 수정
  const handleEditComment = id => {
    console.log('댓글 수정:', id)
    // 댓글 수정 로직 구현
  }

  // 댓글 삭제
  const handleDeleteComment = id => {
    console.log('댓글 삭제:', id)
    comments.value = comments.value.filter(comment => comment.id !== id)
  }

  // 댓글에 대댓글 달기
  const handleReplyToComment = id => {
    console.log('댓글에 대댓글 달기:', id)
    // 대댓글 입력 로직 구현
    // 예: 대댓글 입력 모달 표시 또는 인라인 입력 영역 표시
  }

  // 대댓글 수정
  const handleEditReply = id => {
    console.log('대댓글 수정:', id)
    // 대댓글 수정 로직 구현
  }

  // 대댓글 삭제
  const handleDeleteReply = id => {
    console.log('대댓글 삭제:', id)
    // 대댓글 삭제 로직 구현
    comments.value.forEach(comment => {
      if (comment.replies) {
        comment.replies = comment.replies.filter(reply => reply.id !== id)
      }
    })
  }
</script>

<style lang="scss" scoped>
  .activity-section {
    margin-top: 24px;

    .comments-section {
      margin-top: 24px;

      .comments-title {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 16px;
        color: #333;
      }

      .comments-list {
        margin-bottom: 20px;
        margin-left: 16px;
      }

      .comment-input-area {
        margin-top: 16px;

        .comment-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          resize: vertical;
          font-size: 14px;

          &:focus {
            outline: none;
            border-color: #2196f3;
            box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
          }
        }

        .comment-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 8px;
        }
      }
    }
  }
</style>
