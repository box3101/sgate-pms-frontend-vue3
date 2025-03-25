<template>
  <header class="task-board-header">
    <section class="header-container">
      <article class="left-section">
        <div class="flex gap-5">
          <UiSearchableSelect placeholder="업무 보드명입니다" class="w-200" />
          <div>
            <UiButton variant="tertiary" icon="heroicons:plus" @click="openBoardAddModal">
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
                <UiButton variant="tertiary" @click="isBoardModalOpen = false">취소</UiButton>
                <UiButton variant="primary" @click="isBoardModalOpen = false">저장</UiButton>
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
                <UiButton variant="tertiary" @click="isBoardEditModalOpen = false">취소</UiButton>
                <UiButton variant="primary" @click="isBoardEditModalOpen = false">저장</UiButton>
              </template>
            </UiFilterModal>
          </div>
          <UiButton variant="danger" @click="$emit('add-category')"> 카테고리 추가 </UiButton>
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
                <UiFormItem class="mb-1" label="실행기간">
                  <UiDatePicker v-model="dateRange" isRange size="small" />
                </UiFormItem>
                <UiFormItem class="mb-1" label="업무상태">
                  <UiSelect size="small" placeholder="업무상태 선택" />
                </UiFormItem>
                <UiFormItem class="mb-1" label="D-DAY">
                  <UiSelect size="small" placeholder="전체" />
                </UiFormItem>
                <!-- 추가 항목 -->
              </UiFormLayout>

              <template #footerActions>
                <UiButton variant="tertiary" @click="isFilterModalOpen = false">취소</UiButton>
                <UiButton variant="primary" @click="isFilterModalOpen = false">적용</UiButton>
              </template>
            </UiFilterModal>
          </div>
          <UiButton variant="tertiary" icon="heroicons:plus">중요업무</UiButton>
        </div>
      </article>
      <article class="right-section">
        <UiButton variant="tertiary" icon="heroicons:plus">협업</UiButton>
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

// 필터 모달 상태 관리 - 검색 필터 모달의 열림/닫힘 상태를 관리하는 변수
const filterButton = ref(null);
const isFilterModalOpen = ref(false);
const dateRange = ref([null, null]);

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
</style>
