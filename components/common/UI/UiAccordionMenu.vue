<template>
  <div class="accordion-menu" :class="`accordion-menu--${size}`">
    <!-- 직접 클릭 가능한 카테고리 -->
    <div v-for="(menu, index) in menuItems" :key="index" class="menu-category">
      <!-- 아코디언이 아닌 일반 버튼 카테고리 -->
      <div v-if="!menu.isAccordion" class="menu-category-button" @click="menu.action">
        <span class="menu-category-text">{{ menu.title }}</span>
        <Icon
          v-if="menu.icon"
          :name="menu.icon"
          :size="size === 'small' ? '14' : '16'"
          class="menu-category-icon"
        />
      </div>

      <!-- 아코디언 카테고리 -->
      <UiAccordion
        v-else
        :title="menu.title"
        :size="size"
        v-model="openAccordions[index]"
        @update:modelValue="handleAccordionToggle(index, $event)"
      >
        <div class="menu-items">
          <div
            v-for="(item, itemIndex) in menu.items"
            :key="itemIndex"
            class="menu-item"
            @click="item.action"
          >
            <Icon
              v-if="item.icon"
              :name="item.icon"
              :size="size === 'small' ? '14' : '16'"
              class="menu-item-icon"
            />
            <span class="menu-item-text">{{ item.text }}</span>
            <Icon
              v-if="item.hasSubmenu"
              name="heroicons:chevron-right"
              :size="size === 'small' ? '14' : '16'"
              class="menu-item-arrow"
            />
          </div>
        </div>
        <div class="menu-content">
          <slot :name="`content-${index + 1}`"></slot>
        </div>
      </UiAccordion>
    </div>
  </div>
</template>

<script setup>
  import { reactive, onMounted } from 'vue'

  const props = defineProps({
    menuItems: {
      type: Array,
      required: true
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    }
  })

  // 각 아코디언의 열림/닫힘 상태를 관리하는 객체
  const openAccordions = reactive({})

  // 초기 상태 설정
  onMounted(() => {
    props.menuItems.forEach((menu, index) => {
      if (menu.isAccordion) {
        openAccordions[index] = menu.initialOpen || false
      }
    })
  })

  // 아코디언 토글 처리 함수
  function handleAccordionToggle(index, isOpen) {
    if (isOpen) {
      // 다른 모든 아코디언 닫기
      Object.keys(openAccordions).forEach(key => {
        if (parseInt(key) !== index) {
          openAccordions[key] = false
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .accordion-menu {
    width: 100%;

    // 사이즈별 스타일 정의
    &--small {
      .menu-category-button {
        padding: 8px 12px;
        padding-right: 6px;
      }

      .menu-category-text {
        font-size: 16px;
      }

      .menu-item {
        padding: 6px 6px;
      }

      .menu-item-text {
        font-size: 12px;
      }
    }

    &--medium {
      // 기본 스타일 유지
    }

    &--large {
      .menu-category-button {
        padding: 16px 20px;
        padding-right: 12px;
      }

      .menu-category-text {
        font-size: 16px;
      }

      .menu-item {
        padding: 12px 10px;
      }

      .menu-item-text {
        font-size: 16px;
      }
    }
  }

  .menu-category {
    margin-bottom: 4px;
  }

  .menu-category-button {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    padding-right: 8px;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      background-color: #f5f5f5;
    }
  }

  .menu-category-icon {
    margin-right: 8px;
  }

  .menu-category-text {
    flex: 1;
    font-size: 14px;
    font-weight: 500;
  }

  .menu-items {
    display: flex;
    flex-direction: column;
  }

  .menu-item {
    display: flex;
    align-items: center;
    padding: 10px 8px;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      background-color: #f5f5f5;
    }
  }

  .menu-item-icon {
    margin-right: 8px;
  }

  .menu-item-text {
    flex: 1;
    font-size: 14px;
  }

  .menu-item-arrow {
    margin-left: 8px;
  }
</style>
