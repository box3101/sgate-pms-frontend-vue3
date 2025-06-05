<template>
  <li class="category-column">
    <!-- 카테고리 헤더 영역 -->
    <div class="category-header">
      <!-- 카테고리 제목 -->
      <h3 class="category-title">{{ title }}</h3>

      <!-- 카테고리 액션 버튼 영역 -->
      <div class="category-actions">
        <!-- 업무 추가 버튼 (showAddButton이 true일 때만 표시) -->
        <UiButton v-if="showAddButton" variant="ghost" @click="$emit('add-board')" iconOnly>
          <i class="icon icon-plus icon-md icon-black"></i>
        </UiButton>

        <!-- 카테고리 메뉴 영역 -->
        <div>
          <!-- 메뉴 버튼 -->
          <button class="category-menu-btn" @click="openCategoryModal">
            <i class="icon icon-lg icon-dots-vertical"></i>
          </button>

          <!-- 카테고리 메뉴 모달 -->
          <UiFilterModal
            v-model="isCategoryModalOpen"
            position="right"
            size="small"
            title="카테고리 메뉴"
            :hideHeader="true"
          >
            <UiAccordionMenu size="small" :menuItems="menuItems">
              <!-- 카테고리 이동 메뉴 콘텐츠 -->
              <template #content-1>
                <UiSelect placeholder="제조공정" />
                <UiButton class="mt-5" variant="secondary" icon-position="right" block>
                  <i class="icon icon-arrow-right icon-md icon-white"></i>
                  이동
                </UiButton>
              </template>

              <!-- 카테고리 전달 메뉴 콘텐츠 -->
              <template #content-3>
                <div class="flex gap-5">
                  <UiInput placeholder="조회 및 선택하세요" />
                  <UiButton variant="secondary" icon-only>
                    <Icon name="heroicons:magnifying-glass" size="20" />
                  </UiButton>
                </div>
                <UiButton class="mt-5" variant="secondary" block> 전달 </UiButton>
              </template>

              <!-- 일괄설정 메뉴 콘텐츠 -->
              <template #content-4>
                <p class="mb-9">일괄설정 대상자 선택</p>
                <UiFormLayout>
                  <UiFormItem label="협업" minWidth="min-w-10">
                    <div class="flex gap-5">
                      <UiInput placeholder="조회 및 선택하세요" />
                      <UiButton variant="secondary" icon-only>
                        <Icon name="heroicons:magnifying-glass" size="20" />
                      </UiButton>
                    </div>
                  </UiFormItem>
                  <UiFormItem label="공유" minWidth="min-w-10">
                    <div class="flex gap-5">
                      <UiInput placeholder="조회 및 선택하세요" />
                      <UiButton variant="secondary" icon-only>
                        <Icon name="heroicons:magnifying-glass" size="20" />
                      </UiButton>
                    </div>
                  </UiFormItem>
                </UiFormLayout>
              </template>
            </UiAccordionMenu>
          </UiFilterModal>
        </div>
      </div>
    </div>

    <!-- 카드 목록 영역 (slot을 통해 외부에서 주입) -->
    <div class="cards-container">
      <slot></slot>
    </div>
  </li>
</template>

<script setup>
  import { ref } from 'vue'

  /**
   * CategoryColumn 컴포넌트
   *
   * 업무 보드에서 하나의 카테고리 열을 표시하는 컴포넌트
   * 카테고리 헤더와 카드 목록을 포함하며, 카테고리 관리 기능 제공
   */

  /**
   * 컴포넌트 속성 정의
   */
  const props = defineProps({
    // 카테고리 제목
    title: {
      type: String,
      default: '카테고리명이 들어가는 공간입니다.'
    },
    // 업무 추가 버튼 표시 여부
    showAddButton: {
      type: Boolean,
      default: true
    }
  })

  /**
   * 이벤트 정의
   * - add-board: 업무 추가 버튼 클릭 시 발생
   */
  defineEmits(['add-board'])

  /**
   * 카테고리 메뉴 설정
   * 카테고리 관리를 위한 아코디언 메뉴 아이템 정의
   */
  const menuItems = [
    {
      title: '카테고리 이동',
      isAccordion: true,
      initialOpen: false,
      items: [],
      action: () => {}
    },
    {
      title: '카테고리 이동',
      isAccordion: true,
      initialOpen: false,
      items: [],
      action: () => {}
    },
    {
      title: '카테고리 업무 협업/공유 일괄설정',
      isAccordion: true,
      initialOpen: false,
      items: [],
      action: () => {}
    },
    {
      title: '카테고리 삭제',
      isAccordion: false,
      icon: 'trash',
      action: () => {}
    },
    {
      title: '정렬',
      isAccordion: false,
      action: () => {}
    }
  ]

  /**
   * 상태 변수
   */
  // 카테고리 메뉴 모달 표시 상태
  const isCategoryModalOpen = ref(false)

  /**
   * 카테고리 메뉴 모달 열기
   * 모달 표시 상태를 true로 설정
   */
  function openCategoryModal() {
    isCategoryModalOpen.value = true
  }
</script>
