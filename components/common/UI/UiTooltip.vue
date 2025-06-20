<template>
  <div class="ui-tooltip-wrapper">
    <slot name="trigger"></slot>
    <div class="ui-tooltip" :class="[`ui-tooltip--${position}`, { 'ui-tooltip--show': isVisible }]">
      <div class="ui-tooltip-content">
        <slot name="title">
          <strong v-if="title">{{ title }}</strong>
        </slot>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UiTooltip',
    props: {
      /**
       * 툴팁 제목
       */
      title: {
        type: String,
        default: ''
      },
      /**
       * 툴팁 위치 (top, right, bottom, left)
       */
      position: {
        type: String,
        default: 'bottom',
        validator: value => ['top', 'right', 'bottom', 'left'].includes(value)
      },
      /**
       * 툴팁 표시 방식 (hover, click)
       */
      trigger: {
        type: String,
        default: 'hover',
        validator: value => ['hover', 'click'].includes(value)
      }
    },
    data() {
      return {
        isVisible: false
      }
    },
    mounted() {
      const triggerEl = this.$el.querySelector(':scope > :first-child')

      if (this.trigger === 'hover') {
        triggerEl.addEventListener('mouseenter', this.showTooltip)
        triggerEl.addEventListener('mouseleave', this.hideTooltip)
      } else if (this.trigger === 'click') {
        triggerEl.addEventListener('click', this.toggleTooltip)
        document.addEventListener('click', this.handleOutsideClick)
      }
    },
    beforeDestroy() {
      const triggerEl = this.$el.querySelector(':scope > :first-child')

      if (this.trigger === 'hover') {
        triggerEl.removeEventListener('mouseenter', this.showTooltip)
        triggerEl.removeEventListener('mouseleave', this.hideTooltip)
      } else if (this.trigger === 'click') {
        triggerEl.removeEventListener('click', this.toggleTooltip)
        document.removeEventListener('click', this.handleOutsideClick)
      }
    },
    methods: {
      /**
       * 툴팁 표시
       */
      showTooltip() {
        this.isVisible = true
      },
      /**
       * 툴팁 숨기기
       */
      hideTooltip() {
        this.isVisible = false
      },
      /**
       * 툴팁 토글
       */
      toggleTooltip() {
        this.isVisible = !this.isVisible
      },
      /**
       * 외부 클릭 처리
       */
      handleOutsideClick(event) {
        if (!this.$el.contains(event.target) && this.isVisible) {
          this.hideTooltip()
        }
      }
    }
  }
</script>

<style lang="scss">
  @use 'sass:color';

  .ui-tooltip-wrapper {
    position: relative;
    display: inline-block;
  }

  .ui-tooltip {
    position: absolute;
    z-index: 1000;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    padding: 0;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;
    max-width: 300px;
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;

    // 툴팁 화살표 공통 스타일
    &::before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
    }

    // 툴팁 위치별 스타일
    &--top {
      bottom: calc(100% + 10px);
      left: 50%;
      transform: translateX(-50%);

      &::before {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 8px 8px 0 8px;
        border-color: #fff transparent transparent transparent;
      }
    }

    &--right {
      left: calc(100% + 10px);
      top: 50%;
      transform: translateY(-50%);

      &::before {
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-width: 8px 8px 8px 0;
        border-color: transparent #fff transparent transparent;
      }
    }

    &--bottom {
      top: calc(100% + 10px);
      left: 50%;
      transform: translateX(-50%);
      width: max-content;
      &::before {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 0 8px 8px 8px;
        border-color: transparent transparent #fff transparent;
      }
    }

    &--left {
      right: calc(100% + 10px);
      top: 50%;
      transform: translateY(-50%);

      &::before {
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-width: 8px 0 8px 8px;
        border-color: transparent transparent transparent #fff;
      }
    }

    // 툴팁 표시 상태
    &--show {
      opacity: 1;
      visibility: visible;
    }

    // 툴팁 내용
    &-content {
      padding: 12px 16px;

      strong {
        display: block;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 600;
        color: #333;
      }

      p {
        margin: 4px 0;
        font-size: 13px;
        line-height: 1.5;
        color: #666;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
