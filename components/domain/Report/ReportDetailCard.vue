<template>
  <div class="report-card">
    <!-- 헤더 -->
    <div class="report-header">
      <div class="report-meta">
        <span
          :class="['type-badge', report.extendedProps.reportType === 'daily' ? 'daily' : 'weekly']"
        >
          {{ report.extendedProps.reportType === 'daily' ? '일간보고' : '주간보고' }}
        </span>
        <span class="create-time">{{ report.extendedProps.createTime }}</span>
      </div>

      <h2 class="report-title">{{ report.title }}</h2>

      <p v-if="report.extendedProps.summary" class="report-summary">
        {{ report.extendedProps.summary }}
      </p>
    </div>

    <!-- 메인 콘텐츠 -->
    <div class="report-content">23</div>
  </div>
</template>

<script setup>
  // Props 정의
  const props = defineProps({
    report: {
      type: Object,
      required: true
    }
  })
</script>

<style lang="scss" scoped>
  $primary-color: #0084ff;
  $success-color: #00b248;

  $gray-50: #f9fafb;
  $gray-100: #f3f4f6;
  $gray-200: #e5e7eb;
  $gray-400: #9ca3af;
  $gray-500: #6b7280;
  $gray-600: #4b5563;
  $gray-800: #1f2937;
  $gray-900: #111827;

  .report-card {
    background: white;
    font-family: 'Pretendard Variable', Pretendard, sans-serif;
    line-height: 1.6;
  }

  // 헤더
  .report-header {
    margin-bottom: 2rem;

    .report-meta {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 0.75rem;
    }

    .type-badge {
      display: inline-flex;
      align-items: center;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;

      &.daily {
        background: rgba($success-color, 0.1);
        color: $success-color;
      }

      &.weekly {
        background: rgba($primary-color, 0.1);
        color: $primary-color;
      }
    }

    .create-time {
      font-size: 0.875rem;
      color: $gray-500;
    }

    .report-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: $gray-900;
      margin: 0 0 0.5rem 0;
    }

    .report-summary {
      font-size: 0.875rem;
      color: $gray-600;
      margin: 0;
    }
  }

  // 콘텐츠
  .report-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .content-section {
    .section-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: $gray-800;
      margin: 0 0 0.75rem 0;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid $gray-200;
    }

    .content-body {
      .content-text {
        font-family: inherit;
        font-size: 0.875rem;
        color: $gray-800;
        white-space: pre-wrap;
        margin: 0;
        line-height: 1.6;
      }
    }
  }
</style>
