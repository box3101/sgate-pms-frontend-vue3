<template>
  <!-- 기본 테이블 컴포넌트 - 재사용 가능한 테이블 구조 -->
  <div class="ui-table-wrapper-default">
    <table class="ui-table-default" :class="tableClasses">
      <!-- 컬럼 그룹 정의 -->
      <colgroup v-if="$slots.colgroup">
        <slot name="colgroup" />
      </colgroup>

      <!-- 테이블 헤더 -->
      <thead v-if="$slots.header" class="ui-table-default__header">
        <slot name="header" />
      </thead>

      <!-- 테이블 바디 -->
      <tbody class="ui-table-default__body">
        <slot name="body" :rows="modelValue" :loading="loading" />

        <!-- 로딩 상태 -->
        <tr v-if="loading" class="ui-table-default__loading">
          <td :colspan="columnCount" class="text-center">
            <div class="loading-spinner">로딩 중...</div>
          </td>
        </tr>

        <!-- 데이터 없음 상태 -->
        <tr v-else-if="!modelValue?.length" class="ui-table-default__empty">
          <td :colspan="columnCount" class="text-center">
            {{ emptyMessage }}
          </td>
        </tr>
      </tbody>

      <!-- 테이블 푸터 -->
      <tfoot v-if="$slots.footer" class="ui-table-default__footer">
        <slot name="footer" />
      </tfoot>
    </table>
  </div>
</template>

<script setup>
  import { computed } from 'vue'

  /**
   * 테이블 컴포넌트의 Props 정의
   */
  const props = defineProps({
    /**
     * 테이블 데이터 배열
     * @type {Array}
     */
    modelValue: {
      type: Array,
      default: () => []
    },

    /**
     * 테이블 테두리 표시 여부
     * @type {Boolean}
     */
    bordered: {
      type: Boolean,
      default: false
    },

    /**
     * 줄무늬 스타일 적용 여부
     * @type {Boolean}
     */
    striped: {
      type: Boolean,
      default: false
    },

    /**
     * 호버 효과 적용 여부
     * @type {Boolean}
     */
    hover: {
      type: Boolean,
      default: false
    },

    /**
     * 테이블 크기 설정
     * @type {String} - 'small', 'medium', 'large'
     */
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },

    /**
     * 로딩 상태
     * @type {Boolean}
     */
    loading: {
      type: Boolean,
      default: false
    },

    /**
     * 빈 데이터 시 표시할 메시지
     * @type {String}
     */
    emptyMessage: {
      type: String,
      default: '데이터가 없습니다.'
    },

    /**
     * 컬럼 수 (빈 상태, 로딩 상태 시 colspan 용)
     * @type {Number}
     */
    columnCount: {
      type: Number,
      default: 4
    }
  })

  /**
   * 테이블에 적용될 CSS 클래스 계산
   * @returns {Array} CSS 클래스 배열
   */
  const tableClasses = computed(() => {
    return [
      `ui-table-default--${props.size}`,
      {
        'ui-table-default--bordered': props.bordered,
        'ui-table-default--striped': props.striped,
        'ui-table-default--hover': props.hover,
        'ui-table-default--loading': props.loading
      }
    ]
  })
</script>
