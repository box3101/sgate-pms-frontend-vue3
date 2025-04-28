<template>
  <div class="task-card-wrapper">
    <!-- 딤 배경 -->
    <div v-if="showFilterMenu" class="dim-background" @click.stop="closeFilterMenu"></div>

    <div class="task-card" @click="handleCardClick">
      <div
        class="task-card-bar"
        :class="{
          high: evaluation === '우수',
          medium: evaluation === '보통',
          low: evaluation === '미흡'
        }"
      ></div>
      <div class="task-card-header">
        <!-- 카드 상단 액션 버튼 영역 추가 -->
        <div class="card-actions">
          <button class="action-btn favorite-btn" @click.stop="toggleFavorite">
            <Icon
              :name="isFavorite ? 'mdi:star' : 'mdi:star-outline'"
              size="20"
              :class="{ 'star-active': isFavorite }"
            />
          </button>
          <div>
            <button class="action-btn filter-btn" @click.stop="openFilterModal">
              <Icon name="mdi:dots-vertical" size="20" />
            </button>

            <!-- 필터 모달 -->
            <UiFilterModal
              v-model="showFilterMenu"
              position="right"
              size="small"
              title="업무 메뉴"
              :hideHeader="true"
              @click.stop
            >
              <div @click.stop>
                <UiAccordionMenu :menuItems="menuItems">
                  <template #content-1>
                    <div @click.stop>
                      <UiSelect placeholder="제조공정" />
                      <UiSelect class="mt-5" placeholder="업무유형" />
                      <UiButton
                        class="mt-5"
                        variant="secondary"
                        icon="heroicons:arrow-right"
                        icon-position="right"
                        block
                        @click.stop
                      >
                        이동
                      </UiButton>
                    </div>
                  </template>

                  <template #content-2>
                    <div @click.stop>
                      <div class="flex gap-5">
                        <UiInput
                          placeholder="조회 및 선택하세요"
                          icon="heroicons:magnifying-glass"
                        />
                        <UiButton variant="secondary" icon-only @click.stop>
                          <Icon name="heroicons:magnifying-glass" size="20" />
                        </UiButton>
                      </div>
                      <UiButton class="mt-5" variant="secondary" block @click.stop> 전달 </UiButton>
                    </div>
                  </template>

                  <template #content-3>
                    <div @click.stop>
                      <p class="mb-9">업무 합치기 대상 선택</p>
                      <UiSelect placeholder="업무" />
                      <UiSelect class="mt-5" placeholder="업무2" />
                      <UiSelect class="mt-5" placeholder="업무3" />
                      <UiButton class="mt-5" variant="secondary" block @click.stop>
                        합치기
                      </UiButton>
                    </div>
                  </template>
                </UiAccordionMenu>
              </div>
            </UiFilterModal>
          </div>
        </div>

        <div class="card-tags">
          <div class="tags-group">
            <UiTag
              size="small"
              v-for="tag in tags"
              :key="tag.id"
              :variant="tag.type"
              :text="tag.text"
            />
          </div>
        </div>
      </div>

      <div class="card-content">
        <p class="card-title">{{ title }}</p>
        <div class="card-footer">
          <div class="card-stats">
            <span class="card-comments">
              <Icon name="mdi:comment-outline" size="14" />
              {{ comments || 0 }}
            </span>
            <span class="card-attachments">
              <i class="icon-user-border icon-md"></i>
              {{ attachments || 0 }}
            </span>
          </div>
          <span class="card-date">{{ date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import UiTag from '@/components/UI/UiTag.vue'

  const props = defineProps({
    title: {
      type: String,
      default: '업무명이 들어가는 공간입니다.'
    },
    tags: {
      type: Array,
      default: () => []
    },
    date: {
      type: String,
      default: ''
    },
    comments: {
      type: Number,
      default: 0
    },
    attachments: {
      type: Number,
      default: 0
    },
    cardId: {
      type: [Number, String],
      required: true
    },
    // 즐겨찾기 상태 prop 추가
    favorite: {
      type: Boolean,
      default: false
    },
    // 평가 상태 prop 추가
    evaluation: {
      type: String,
      default: '보통',
      validator: value => ['우수', '보통', '미흡'].includes(value)
    }
  })

  const emit = defineEmits(['click', 'toggleFavorite', 'taskAction'])

  // 즐겨찾기 상태 추적
  const isFavorite = ref(props.favorite)

  // 필터 메뉴 상태
  const showFilterMenu = ref(false)

  // 아코디언 메뉴 아이템 정의
  const menuItems = [
    {
      title: '업무 이동',
      isAccordion: true
    },
    {
      title: '업무 전달',
      isAccordion: true
    },
    {
      title: '업무 합치기',
      isAccordion: true
    },
    {
      title: '업무 삭제',
      isAccordion: false,
      icon: 'mdi:delete-outline',
      action: () => handleTaskAction('delete')
    }
  ]

  // 카드 클릭 핸들러
  function handleCardClick(event) {
    // 필터 메뉴가 열려있으면 클릭 이벤트 무시
    if (showFilterMenu.value) {
      return
    }

    // 일반 클릭은 부모 컴포넌트에 이벤트 전달
    emit('click', props.cardId)
  }

  // 즐겨찾기 토글 함수
  function toggleFavorite() {
    isFavorite.value = !isFavorite.value
    emit('toggleFavorite', props.cardId, isFavorite.value)
  }

  // 필터 메뉴 열기
  function openFilterModal() {
    showFilterMenu.value = true
  }

  // 필터 메뉴 닫기
  function closeFilterMenu() {
    showFilterMenu.value = false
  }

  // 업무 액션 처리 함수
  function handleTaskAction(action, subAction = null) {
    emit('taskAction', {
      cardId: props.cardId,
      action,
      subAction
    })
    closeFilterMenu()
  }
</script>
