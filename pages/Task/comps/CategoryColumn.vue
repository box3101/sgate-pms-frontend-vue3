<template>
  <li class="category-column">
    <div class="category-header">
      <h3 class="category-title">{{ title }}</h3>
      <div class="category-actions">
        <UiButton v-if="showAddButton" variant="primary" size="small" @click="$emit('add-board')">
          <i class="icon icon-plus icon-md icon-white"></i>
          업무
        </UiButton>
        <div>
          <button class="category-menu-btn" @click="openCategoryModal">
            <i class="icon icon-md icon-dots-vertical"></i>
          </button>
          <!-- 카테고리 모달 -->
          <UiFilterModal
            v-model="isCategoryModalOpen"
            position="right"
            size="small"
            title="카테고리 메뉴"
            :hideHeader="true"
          >
            <UiAccordionMenu size="small" :menuItems="menuItems">
              <template #content-1>
                <UiSelect placeholder="제조공정" />
                <UiButton class="mt-5" variant="secondary" icon-position="right" block>
                  <i class="icon icon-arrow-right icon-md icon-white"></i>
                  이동
                </UiButton>
              </template>

              <template #content-3>
                <div class="flex gap-5">
                  <UiInput placeholder="조회 및 선택하세요" />
                  <UiButton variant="secondary" icon-only>
                    <Icon name="heroicons:magnifying-glass" size="20" />
                  </UiButton>
                </div>
                <UiButton class="mt-5" variant="secondary" block> 전달 </UiButton>
              </template>

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
          <!-- 카테고리 모달 EEE -->
        </div>
      </div>
    </div>

    <!-- 카드 목록 -->
    <div class="cards-container">
      <slot></slot>
    </div>
  </li>
</template>

<script setup>
  import UiButton from '~/components/UI/UiButton.vue'
  import UiFilterModal from '~/components/UI/UiFilterModal.vue'
  import UiAccordionMenu from '~/components/UI/UiAccordionMenu.vue'

  // Props 정의
  const props = defineProps({
    title: {
      type: String,
      default: '카테고리명이 들어가는 공간입니다.'
    },
    showAddButton: {
      type: Boolean,
      default: true
    }
  })

  // 이벤트 정의
  defineEmits(['add-board'])

  // 카테고리 아코디언 메뉴
  const menuItems = [
    {
      title: '카테고리 이동',
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
    }
  ]

  // 카테고리 모달
  const isCategoryModalOpen = ref(false)

  // 카테고리 모달 열기
  function openCategoryModal() {
    isCategoryModalOpen.value = true
  }
</script>
