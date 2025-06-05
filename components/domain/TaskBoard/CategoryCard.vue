<template>
  <div class="task-card-wrapper">
    <!-- 필터 메뉴 열릴 때 표시되는 배경 딤 레이어 -->
    <div v-if="showFilterMenu" class="dim-background" @click.stop="closeFilterMenu"></div>

    <!-- 업무 카드 본체 -->
    <div class="task-card" @click="handleCardClick">
      <!-- 평가 상태 표시 바 (우수/보통/미흡) -->
      <div
        class="task-card-bar"
        :class="{
          high: evaluation === '우수',
          medium: evaluation === '보통',
          low: evaluation === '미흡'
        }"
      >
        {{ status }}
      </div>

      <div class="task-card-header">
        <!-- 카드 상단 기능 버튼 영역 -->
        <div class="card-actions">
          <!-- 즐겨찾기가 true일 때만 표시 -->
          <button
            v-if="favorite"
            class="action-btn favorite-btn"
            @click.stop="handleFavoriteToggle"
          >
            <Icon
              name="mdi:star"
              size="20"
              :class="{ 'star-active': favorite, 'star-inactive': !favorite }"
            />
          </button>

          <!-- 추가 메뉴 영역 -->
          <div>
            <!-- 메뉴 열기 버튼 -->
            <button class="action-btn filter-btn" @click.stop="openFilterModal">
              <Icon name="mdi:dots-vertical" size="20" />
            </button>

            <!-- 업무 메뉴 모달 -->
            <UiFilterModal
              v-model="showFilterMenu"
              position="right"
              size="small"
              title="업무 메뉴"
              :hideHeader="true"
              @click.stop
            >
              <div @click.stop>
                <UiAccordionMenu size="small" :menuItems="menuItems">
                  <!-- 업무 이동 메뉴 콘텐츠 -->
                  <template #content-1>
                    <div @click.stop>
                      <UiSelect placeholder="제조공정" />
                      <UiSelect class="mt-5" placeholder="업무유형" />
                      <UiButton
                        class="mt-5"
                        variant="secondary"
                        icon-position="right"
                        block
                        @click.stop
                      >
                        <i class="icon icon-arrow-right icon-md icon-white"></i>
                        이동
                      </UiButton>
                    </div>
                  </template>

                  <!-- 업무 전달 메뉴 콘텐츠 -->
                  <template #content-2>
                    <div @click.stop>
                      <div class="flex gap-5">
                        <UiInput placeholder="조회 및 선택하세요" />
                        <UiButton variant="secondary" icon-only @click.stop>
                          <i class="icon icon-search icon-md icon-white"></i>
                        </UiButton>
                      </div>
                      <UiButton class="mt-5" variant="secondary" block @click.stop> 전달 </UiButton>
                    </div>
                  </template>

                  <!-- 업무 합치기 메뉴 콘텐츠 -->
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

        <!-- 태그 표시 영역 -->
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

      <!-- 카드 본문 영역 -->
      <div class="card-content">
        <!-- 업무 제목 -->
        <p class="card-title">{{ title }}</p>

        <!-- 카드 하단 정보 영역 -->
        <div class="card-footer">
          <!-- 댓글 및 첨부 파일 카운트 -->
          <div class="card-stats">
            <span class="card-comments">
              <i class="icon-comment icon-md"></i>
              {{ comments || 0 }}
            </span>
            <span class="card-attachments">
              <i class="icon-user-gray icon-md"></i>
              {{ attachments || 0 }}
            </span>
          </div>
          <!-- 날짜 표시 -->
          <span class="card-date">{{ date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  /**
   * CategoryCard 컴포넌트
   *
   * 업무 보드에 표시되는 개별 카드를 렌더링하는 컴포넌트
   * 카드 클릭, 즐겨찾기, 메뉴 액션 등의 기능 제공
   */
  import { ref } from 'vue'
  import { computed } from 'vue'

  /**
   * 컴포넌트 속성 정의
   */
  const props = defineProps({
    // 카드 제목
    title: {
      type: String,
      default: '업무명이 들어가는 공간입니다.'
    },
    // 카드에 표시될 태그 목록
    tags: {
      type: Array,
      default: () => []
    },
    // 카드 작성/수정 날짜
    date: {
      type: String,
      default: ''
    },
    // 댓글 수
    comments: {
      type: Number,
      default: 0
    },
    // 첨부 파일 수
    attachments: {
      type: Number,
      default: 0
    },
    // 카드 고유 식별자
    cardId: {
      type: [Number, String],
      required: true
    },
    // 즐겨찾기 상태
    favorite: {
      type: Boolean,
      default: false
    },
    // 업무 평가 상태 (우수/보통/미흡)
    evaluation: {
      type: String,
      default: '보통',
      validator: value => ['우수', '보통', '미흡'].includes(value)
    },
    // 업무 진행 상태 (진행중/완료) - 텍스트 표시
    status: {
      type: String,
      default: '진행중',
      validator: value => ['진행중', '완료'].includes(value)
    }
  })

  /**
   * 이벤트 정의
   * - click: 카드 클릭 시
   * - favoriteToggle: 즐겨찾기 상태 변경 시 (별도 이벤트)
   * - taskAction: 기타 업무 액션 (삭제, 이동 등)
   */
  const emit = defineEmits(['click', 'favoriteToggle', 'taskAction'])

  // 필터 메뉴 표시 상태
  const showFilterMenu = ref(false)

  /**
   * 메뉴 설정
   */
  // 아코디언 메뉴 아이템 정의
  // 계산된 속성으로 메뉴 아이템 정의 - 반응성 보장
  const menuItems = computed(() => [
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
      title: props.favorite ? '즐겨찾기 해제' : '즐겨찾기',
      isAccordion: false,
      icon: 'icon-star icon-md',
      action: () => handleFavoriteToggle()
    },
    {
      title: '업무 삭제',
      isAccordion: false,
      icon: 'icon-delete icon-md',
      action: () => handleTaskAction('delete')
    }
  ])

  /**
   * 카드 클릭 핸들러
   * 필터 메뉴가 열려있지 않은 경우에만 클릭 이벤트 전달
   * @param {Event} event - 클릭 이벤트 객체
   */
  function handleCardClick(event) {
    // 필터 메뉴가 열려있으면 클릭 이벤트 무시
    if (showFilterMenu.value) {
      return
    }

    // 부모 컴포넌트에 카드 ID와 함께 클릭 이벤트 전달
    emit('click', props.cardId)
  }

  /**
   * 즐겨찾기 상태 토글 함수
   * 즐겨찾기 상태를 변경하고 부모에게 이벤트 발송
   */
  function handleFavoriteToggle() {
    emit('favoriteToggle', {
      cardId: props.cardId,
      newFavorite: !props.favorite
    })
  }

  /**
   * 필터 메뉴 열기
   */
  function openFilterModal() {
    showFilterMenu.value = true
  }

  /**
   * 필터 메뉴 닫기
   */
  function closeFilterMenu() {
    showFilterMenu.value = false
  }

  function handleTaskAction(action, subAction = null) {
    emit('taskAction', {
      cardId: props.cardId,
      action,
      subAction
    })
    closeFilterMenu()
  }
</script>
