<template>
  <header class="task-board-header fixed-top">
    <section class="header-container">
      <!-- 왼쪽 영역: 보드 선택/관리 및 필터 -->
      <article class="left-section">
        <!-- 보드 선택 및 관리 버튼 그룹 -->
        <div class="flex gap-5">
          <UiSearchableSelect placeholder="보드를 선택하세요" class="w-200" />

          <!-- 보드 추가 버튼 및 모달 -->
          <div>
            <UiTooltip position="top">
              <template #trigger>
                <UiButton variant="secondary" iconOnly @click="openBoardAddModal">
                  <i class="icon icon-plus icon-md icon-white"></i>
                </UiButton>
              </template>
              <p>보드 추가</p>
            </UiTooltip>
            <UiFilterModal v-model="isBoardAddModalOpen" title="보드 추가" :showFooter="true">
              <UiFormLayout>
                <UiFormItem label="보드명">
                  <UiInput placeholder="보드명을 입력하세요" />
                </UiFormItem>
              </UiFormLayout>

              <template #footerActions>
                <UiButton variant="secondary" @click="isBoardModalOpen = false">취소</UiButton>
                <UiButton variant="primary" @click="isBoardModalOpen = false">저장</UiButton>
              </template>
            </UiFilterModal>
          </div>

          <!-- 보드 편집 버튼 및 모달 -->
          <div>
            <UiTooltip position="top">
              <template #trigger>
                <UiButton variant="secondary-line" iconOnly @click="openBoardEditModal">
                  <i class="icon icon-pencil icon-md"></i>
                </UiButton>
              </template>
              <p>보드 편집</p>
            </UiTooltip>
            <UiFilterModal v-model="isBoardEditModalOpen" title="보드 편집" :showFooter="true">
              <UiFormLayout>
                <UiFormItem label="보드명">
                  <UiInput placeholder="보드명을 입력하세요" />
                </UiFormItem>
              </UiFormLayout>

              <template #footerActions>
                <UiButton variant="secondary" @click="isBoardEditModalOpen = false">취소</UiButton>
                <UiButton variant="primary" @click="isBoardEditModalOpen = false">저장</UiButton>
              </template>
            </UiFilterModal>
          </div>

          <!-- 보드 삭제 버튼 -->
          <UiTooltip position="top">
            <template #trigger>
              <UiButton variant="secondary-line" iconOnly>
                <i class="icon icon-delete icon-lg"></i>
              </UiButton>
            </template>
            <p>보드 삭제</p>
          </UiTooltip>
        </div>

        <!-- 검색 필터 및 중요 업무 필터 버튼, 찾고싶은 업무명 입력 -->
        <div class="flex gap-5">
          <!-- 검색 필터 버튼 및 모달 -->
          <div>
            <UiTooltip position="top">
              <template #trigger>
                <UiButton variant="secondary-line" @click="openFilterModal" iconOnly>
                  <i class="icon icon-filter icon-lg"></i>
                </UiButton>
              </template>
              <p>검색필터</p>
            </UiTooltip>
            <UiFilterModal
              v-model="isFilterModalOpen"
              :targetRef="filterButton"
              title="검색필터"
              position="left"
              :showFooter="true"
            >
              <UiFormLayout>
                <UiFormItem label="실행기간">
                  <UiDatePicker v-model="dateRange" isRange />
                </UiFormItem>
                <UiFormItem label="업무상태">
                  <UiSelect placeholder="업무상태 선택" />
                </UiFormItem>
                <UiFormItem label="D-DAY">
                  <UiSelect placeholder="전체" />
                </UiFormItem>
              </UiFormLayout>

              <template #footerActions>
                <UiButton variant="secondary" @click="isFilterModalOpen = false">취소</UiButton>
                <UiButton variant="primary" @click="isFilterModalOpen = false">적용</UiButton>
              </template>
            </UiFilterModal>
          </div>

          <!-- 중요 업무 필터 버튼 -->
          <UiTooltip position="top">
            <template #trigger>
              <UiButton
                :variant="isImportantTaskActive ? 'secondary-line' : 'secondary-line'"
                @click="toggleImportantTask"
                iconOnly
              >
                <i
                  class="icon icon-star icon-lg"
                  :class="{ 'icon-star-yellow': isImportantTaskActive }"
                ></i>
              </UiButton>
            </template>
            <p>중요업무</p>
          </UiTooltip>

          <!-- 찾고싶은 업무명 입력 -->
          <UiInput class="ml-16" placeholder="찾고싶은 업무명을 입력하세요." />
          <UiButton variant="secondary" iconOnly>
            <i class="icon icon-search icon-lg icon-white"></i>
          </UiButton>
        </div>
      </article>

      <!-- 오른쪽 영역: 협업/공유/전달 기능 -->
      <article class="right-section">
        <!-- 협업 버튼 및 모달 -->
        <div>
          <div class="button-with-badge">
            <UiButton variant="secondary" @click="openCollaborationModal" iconOnly>
              <i class="icon icon-user-arr-right icon-md"></i>
            </UiButton>
            <span class="badge">16</span>
          </div>
          <UiFilterModal
            v-model="isCollaborationModalOpen"
            size="large"
            position="right"
            :showFooter="true"
          >
            <template #fixedActions>
              <UiTabs :tabs="basicTabs" :isScroll="true" :isBadge="true" :badge="[3, 2, 1]">
                <template #협업>
                  <div class="collaboration-content">
                    <div class="search-section">
                      <div class="user-list">
                        <!-- 사용자 목록 -->
                        <div v-for="i in 10" :key="i" class="user-item">
                          <div class="user-info">
                            <!-- <div class="user-avatar">
                              <i class="icon-user-gray icon-xl"></i>
                            </div> -->
                            <div class="user-details">
                              <div class="user-name">안창주 <span>Marketing Promotion</span></div>
                              <div class="user-date">~2026.08.29</div>
                            </div>
                          </div>
                          <div class="flex gap-10">
                            <template v-if="isActive">
                              <UiTextarea
                                placeholder="제외사유를 입력하세요."
                                class="w-200"
                                rows="2"
                              />
                              <UiButton variant="secondary-line">제외</UiButton>
                            </template>
                            <template v-else>
                              <UiSelect placeholder="선택하세요" class="w-200" />
                              <UiButton variant="primary-line">이동</UiButton>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <template #공유>
                  <Empty
                    title="공유 콘텐츠"
                    description="협업으로 포함된 업무들을 표시합니다. <br/>
해당 업무들을 원하는 카테고리로 이동 또는 제외 하실 수 있습니다."
                  />
                </template>
                <template #전달>
                  <Empty title="전달 콘텐츠" description="이 전달로 포함된 업무들을 표시합니다." />
                </template>
              </UiTabs>
            </template>

            <template #footerActions>
              <div class="flex items-center gap-4 w-full justify-between">
                <div class="left">
                  <UiSwitch
                    v-model="isActive"
                    label="제외하기"
                    @update:modelValue="handleSwitchChange"
                  />
                </div>
                <div class="right flex gap-5 items-center">
                  <UiSelect class="w-300" placeholder="선택하세요" />
                  <UiButton variant="secondary" @click="isCollaborationModalOpen = false"
                    >카테고리 일괄 선택</UiButton
                  >
                  <UiButton variant="primary" @click="isCollaborationModalOpen = false"
                    >이동</UiButton
                  >
                </div>
              </div>
            </template>
          </UiFilterModal>
        </div>

        <!-- 셋팅 버튼 -->
        <div>
          <UiTooltip position="top">
            <template #trigger>
              <div class="flex items-center gap-4">
                <UiButton variant="secondary-line" iconOnly @click="openSettingModal">
                  <i class="icon icon-setting icon-xl"></i>
                </UiButton>
              </div>
            </template>
            <p>설정</p>
          </UiTooltip>
          <UiFilterModal position="right" v-model="isSettingModalOpen" size="large" title="설정">
            <div class="setting-section">
              <UiFormLayout>
                <UiFormItem label="업무카드 이동시 확인여부">
                  <UiSwitch v-model="moveCardConfirmation" />
                </UiFormItem>
              </UiFormLayout>
            </div>
          </UiFilterModal>
        </div>
      </article>
    </section>
  </header>
</template>

<script setup>
  import { ref } from 'vue'

  /**
   * 검색 필터 관련 상태 변수
   */
  const filterButton = ref(null)
  const isFilterModalOpen = ref(false)
  const dateRange = ref([null, null])

  /**
   * 중요 업무 필터 관련 상태 변수
   */
  const isImportantTaskActive = ref(false)

  /**
   * 협업 모달 관련 상태 변수
   */
  const isActive = ref(false)
  const isCollaborationModalOpen = ref(false)
  const isSettingModalOpen = ref(false)
  const moveCardConfirmation = ref(false)

  /**
   * 보드 관리 모달 관련 상태 변수
   */
  const isBoardAddModalOpen = ref(false)
  const isBoardEditModalOpen = ref(false)

  // 기본 탭 데이터
  const basicTabs = [
    { id: '협업', label: '협업' },
    { id: '공유', label: '공유' },
    { id: '전달', label: '전달' }
  ]

  /**
   * 중요 업무 필터 토글 함수
   * 중요 업무 표시 상태를 전환
   */
  function toggleImportantTask() {
    isImportantTaskActive.value = !isImportantTaskActive.value
  }

  /**
   * 검색 필터 모달 토글 함수
   */
  function openFilterModal() {
    isFilterModalOpen.value = !isFilterModalOpen.value
  }

  /**
   * 보드 추가 모달 토글 함수
   */
  function openBoardAddModal() {
    isBoardAddModalOpen.value = !isBoardAddModalOpen.value
  }

  /**
   * 보드 편집 모달 토글 함수
   */
  function openBoardEditModal() {
    isBoardEditModalOpen.value = !isBoardEditModalOpen.value
  }

  /**
   * 협업 모달 토글 함수
   */
  function openCollaborationModal() {
    isCollaborationModalOpen.value = !isCollaborationModalOpen.value
  }

  /**
   * 협업 모달 제외 스위치 변경 핸들러
   * @param {boolean} value - 스위치 상태 값
   */
  function handleSwitchChange(value) {
    console.log('스위치 상태 변경:', value)
    isActive.value = value
  }

  /**
   * 설정 모달 토글 함수
   */
  function openSettingModal() {
    isSettingModalOpen.value = !isSettingModalOpen.value
  }
</script>

<style scoped lang="scss">
  .ui-tabs {
    position: relative;
    top: -15px;
  }
</style>
