<template>
  <header class="task-board-header">
    <section class="header-container">
      <article class="left-section">
        <div class="flex gap-5">
          <UiSearchableSelect size="medium" placeholder="업무 보드명입니다" class="w-200" />
          <div>
            <UiButton
              variant="tertiary"
              icon="heroicons:plus"
              @click="openBoardAddModal"
            >
              보드 추가</UiButton
            >
            <UiFilterModal
              v-model="isBoardAddModalOpen"
              title="보드 추가"
              :showFooter="true"
            >
              <UiFormLayout>
                <UiFormItem label="보드명">
                  <UiInput placeholder="보드명을 입력하세요" />
                </UiFormItem>
              </UiFormLayout>

              <template #footerActions>
                <UiButton variant="tertiary" @click="isBoardModalOpen = false"
                  >취소</UiButton
                >
                <UiButton variant="primary" @click="isBoardModalOpen = false"
                  >저장</UiButton
                >
              </template>
            </UiFilterModal>
          </div>
          <UiButton variant="tertiary" iconOnly>
            <Icon name="heroicons:minus" size="24" />
          </UiButton>
          <div>
            <UiButton variant="white" iconOnly @click="openBoardEditModal">
              <Icon name="heroicons:pencil" size="24" />
            </UiButton>
            <UiFilterModal
              v-model="isBoardEditModalOpen"
              title="보드 편집"
              :showFooter="true"
            >
              <UiFormLayout>
                <UiFormItem label="보드명">
                  <UiInput placeholder="보드명을 입력하세요" />
                </UiFormItem>
              </UiFormLayout>

              <template #footerActions>
                <UiButton
                  variant="tertiary"
                  @click="isBoardEditModalOpen = false"
                  >취소</UiButton
                >
                <UiButton
                  variant="primary"
                  @click="isBoardEditModalOpen = false"
                  >저장</UiButton
                >
              </template>
            </UiFilterModal>
          </div>
        </div>
        <div class="flex gap-5">
          <div>
            <UiButton variant="tertiary" @click="openFilterModal"
              >검색필터</UiButton
            >
            <UiFilterModal
              v-model="isFilterModalOpen"
              :targetRef="filterButton"
              title="검색필터"
              position="left"
              :showFooter="true"
            >
              <!-- 필터 내용을 여기에 추가 -->
              <UiFormLayout>
                <UiFormItem label="실행기간">
                  <UiDatePicker v-model="dateRange" isRange size="small" />
                </UiFormItem>
                <UiFormItem label="업무상태">
                  <UiSelect size="small" placeholder="업무상태 선택" />
                </UiFormItem>
                <UiFormItem label="D-DAY">
                  <UiSelect size="small" placeholder="전체" />
                </UiFormItem>
                <!-- 추가 항목 -->
              </UiFormLayout>

              <template #footerActions>
                <UiButton variant="tertiary" @click="isFilterModalOpen = false"
                  >취소</UiButton
                >
                <UiButton variant="primary" @click="isFilterModalOpen = false"
                  >적용</UiButton
                >
              </template>
            </UiFilterModal>
          </div>
          <UiButton variant="tertiary" icon="heroicons:plus">중요업무</UiButton>
        </div>
      </article>
      <article class="right-section">
        <div>
          <UiButton
            variant="tertiary"
            icon="heroicons:plus"
            @click="openCollaborationModal"
            >협업</UiButton
          >
          <UiFilterModal
            v-model="isCollaborationModalOpen"
            title="협업"
            size="large"
            position="right"
            :showFooter="true"
          >
            <template #headerActions>
              <UiSwitch
                v-model="isActive"
                label="제외하기"
                @update:modelValue="handleSwitchChange"
              />
            </template>
            <div class="collaboration-content">
              <div class="search-section">
                <div class="user-list">
                  <!-- 사용자 목록이 표시될 영역 -->
                  <div v-for="i in 5" :key="i" class="user-item">
                    <div class="user-info">
                      <div class="user-avatar">
                        <i class="icon-user-gray icon-xl"></i>
                      </div>
                      <div class="user-details">
                        <div class="user-name">[이강표] Contact</div>
                        <div class="user-role">[2022.03.04 ~ ] Contact - BYC</div>
                      </div>
                    </div>
                    <div class="flex gap-10">
                      <template v-if="isActive">
                        <UiTextarea placeholder="제외사유를 입력하세요." size="small" class="w-200" rows="2" />
                        <UiButton variant="tertiary" size="small">제외</UiButton>
                      </template>
                      <template v-else>
                        <UiSelect placeholder="선택하세요" size="small" class="w-200" />
                        <UiButton variant="tertiary" size="small">이동</UiButton>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <template #footerActions>
              <div class="flex gap-4 w-full justify-end">
                <UiSelect class="w-300"  placeholder="선택하세요" />
                <UiButton
                  variant="tertiary"
                  @click="isCollaborationModalOpen = false"
                  >카테고리 일괄 선택</UiButton
                >
                <UiButton
                  variant="primary"
                  @click="isCollaborationModalOpen = false"
                  >이동</UiButton
                >
              </div>
            </template>
          </UiFilterModal>
        </div>

        <UiButton variant="tertiary" icon="heroicons:plus">공유</UiButton>
        <UiButton variant="tertiary" icon="heroicons:plus">전달</UiButton>
      </article>
    </section>
  </header>
</template>

<script setup>
import UiSearchableSelect from "~/components/UI/UiSearchableSelect.vue";
import UiFilterModal from "~/components/UI/UiFilterModal.vue";
import UiFormLayout from "~/components/UI/UiFormLayout.vue";
import UiFormItem from "~/components/UI/UiFormItem.vue";
import { ref } from "vue";
import UiSelect from "~/components/UI/UiSelect.vue";
import UiDatePicker from "~/components/UI/UiDatePicker.vue";
import UiButton from "~/components/UI/UiButton.vue";
import UiTextarea from "~/components/UI/UiTextarea.vue";

// 필터 모달 상태 관리 - 검색 필터 모달의 열림/닫힘 상태를 관리하는 변수
const filterButton = ref(null);
const isFilterModalOpen = ref(false);
const dateRange = ref([null, null]);

// 협업 토글
const isActive = ref(false);

// 필터 모달 열기 - 토글 방식으로 필터 모달의 열림/닫힘 상태를 변경하는 함수
function openFilterModal() {
  isFilterModalOpen.value = !isFilterModalOpen.value;
}

// 보드 모달 상태 관리 - 새 보드 추가를 위한 모달의 열림/닫힘 상태를 관리하는 변수
const isBoardAddModalOpen = ref(false);

// 보드 편집 모달 상태 관리 - 보드 편집을 위한 모달의 열림/닫힘 상태를 관리하는 변수
const isBoardEditModalOpen = ref(false);

// 보드 모달 열기 - 토글 방식으로 보드 추가 모달의 열림/닫힘 상태를 변경하는 함수
function openBoardAddModal() {
  isBoardAddModalOpen.value = !isBoardAddModalOpen.value;
}
// 보드 편집 모달 열기 - 토글 방식으로 보드 편집 모달의 열림/닫힘 상태를 변경하는 함수
function openBoardEditModal() {
  isBoardEditModalOpen.value = !isBoardEditModalOpen.value;
}

// 협업 모달 상태 관리 - 협업을 위한 모달의 열림/닫힘 상태를 관리하는 변수
const isCollaborationModalOpen = ref(false);

// 협업 모달 열기 - 토글 방식으로 협업 모달의 열림/닫힘 상태를 변경하는 함수
function openCollaborationModal() {
  isCollaborationModalOpen.value = !isCollaborationModalOpen.value;
}

function handleSwitchChange(value) {
  console.log('스위치 상태 변경:', value);
  isActive.value = value;
}
</script>

<style scoped>
.task-board-header {
  margin-bottom: 30px;
  width: 100%;
  position: relative;
}

.header-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.left-section {
  display: flex;
  gap: 100px;
}

.right-section {
  display: flex;
  gap: 5px;
  align-items: center;
}
.board-title {
  font-weight: 600;
  font-size: 18px;
  margin-right: 16px;
}

.filter-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-button {
  padding: 6px 12px;
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f1f3f4;
  }
}
.collaboration-content {
  .search-section {
    padding: 16px 0;
    
    .user-list {
      max-height: 400px;
      
      .user-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px;
        border-bottom: 1px solid #eee;
        
        &:last-child {
          border-bottom: none;
        }
        
        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
          
          .user-avatar {
            color: #5f6368;
            display: flex;
            align-items: center;
          }
          
          .user-details {
            .user-name {
              font-weight: 500;
              font-size: 14px;
            }
            
            .user-role {
              font-size: 12px;
              color: #5f6368;
              margin-top: 4px;
            }
          }
        }
      }
    }
  }
}

</style>
