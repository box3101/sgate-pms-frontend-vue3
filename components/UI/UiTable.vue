<template>
  <div
    class="ui-table-wrapper"
    :class="[
      bordered && 'bordered',
      striped && 'striped',
      hover && 'hover',
      size,
      layout,
      scrollable && 'scrollable'
    ]"
    :style="scrollable ? { maxHeight: maxHeight } : {}"
  >
    <table class="ui-table" :class="{ 'th-left': isThLeft }">
      <colgroup v-if="$slots.colgroup">
        <slot name="colgroup"></slot>
      </colgroup>
      <thead
        v-if="$slots.header && layout !== 'horizontal'"
        :class="{ 'sticky-header': scrollable }"
      >
        <slot name="header"></slot>
      </thead>
      <tbody v-if="$slots.body">
        <slot name="body"></slot>
      </tbody>
      <tfoot v-if="$slots.footer">
        <slot name="footer"></slot>
      </tfoot>
    </table>
  </div>
</template>

<script setup>
  const props = defineProps({
    /**
     * 테이블 테두리 표시 여부
     */
    bordered: {
      type: Boolean,
      default: false
    },
    /**
     * 테이블 줄무늬 표시 여부
     */
    striped: {
      type: Boolean,
      default: false
    },
    /**
     * 테이블 행 호버 효과 적용 여부
     */
    hover: {
      type: Boolean,
      default: false
    },
    /**
     * 테이블 크기 (small, medium, large)
     */
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    /**
     * 테이블 레이아웃 (vertical, horizontal)
     * vertical: 기본 테이블 형태 (th가 위, td가 아래)
     * horizontal: th와 td가 좌우로 배치되는 형태 (th가 좌측, td가 우측)
     */
    layout: {
      type: String,
      default: 'vertical',
      validator: value => ['vertical', 'horizontal'].includes(value)
    },
    isThLeft: {
      type: Boolean,
      default: false
    },
    /**
     * 스크롤 가능 여부
     */
    scrollable: {
      type: Boolean,
      default: false
    },
    /**
     * 테이블 최대 높이 (스크롤 가능할 때만 적용)
     */
    maxHeight: {
      type: String,
      default: '400px'
    }
  })
</script>

<style lang="scss">
  .ui-table-wrapper {
    width: 100%;
    overflow-x: auto;
    transition: all 0.2s ease;
    border-top: 1px solid #000;

    &.scrollable {
      overflow-y: auto;
      position: relative;

      .sticky-header {
        position: sticky;
        top: 0;
        z-index: 1;
        background-color: #fff;
      }
    }

    &.bordered {
      .ui-table {
        border: 1px solid #e2e8f0;

        th,
        td {
          border: 1px solid #e2e8f0;
        }
      }
    }

    &.striped {
      .ui-table {
        tbody tr:nth-child(odd) {
          background-color: rgba(248, 250, 252, 0.7);
        }
      }
    }

    &.hover {
      .ui-table {
        tbody tr {
          transition: background-color 0.15s ease;
          &:hover {
            background-color: rgba(241, 245, 249, 0.8);
          }
        }
      }
    }

    &.small {
      .ui-table {
        font-size: 0.875rem;

        th,
        td {
          padding: 0.5rem 0.75rem;
        }
      }
    }

    &.medium {
      .ui-table {
        font-size: 1rem;

        th {
          padding: 10px 1rem;
        }
        td {
          padding: 7px 1rem;
        }
      }
    }

    &.large {
      .ui-table {
        font-size: 1.125rem;

        th,
        td {
          padding: 1rem 1.25rem;
        }
      }
    }

    &.horizontal {
      .ui-table {
        th {
          width: 21.5%;
          text-align: left;
          border-right: 2px solid #e2e8f0;
          border-bottom: 1px solid #e2e8f0;
          position: relative;
          white-space: nowrap;
        }

        td {
          width: 78.5%;
        }

        tr:last-child th {
          border-bottom: none;
        }

        thead {
          display: none;
        }
      }
    }
  }

  .ui-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    tr {
      &:hover {
        background-color: rgba($primary-color, 0.05);
      }
    }
    th,
    td {
      text-align: left;
      vertical-align: middle;
      line-height: 1.5;
    }

    th {
      font-weight: 600;
      background-color: #f8fafc;
      border-bottom: 2px solid #e2e8f0;
      position: sticky;
      top: 0;
      z-index: 1;
      white-space: nowrap;
      font-size: 1rem;
      padding: 0.75rem 1rem;
      text-align: center;
    }

    td {
      border-bottom: 1px solid #e2e8f0;
      &.text-center {
        text-align: center;
      }
    }

    tbody tr:last-child td {
      border-bottom: none;
    }

    thead tr:first-child th:first-child {
      border-top-left-radius: 6px;
    }

    thead tr:first-child th:last-child {
      border-top-right-radius: 6px;
    }

    &.th-left {
      th {
        text-align: left;
      }
    }
  }
</style>
