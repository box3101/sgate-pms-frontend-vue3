<template>
  <div class="flex flex-col gap-4 p-4">
    <!-- 검색 가능한 셀렉트 -->
    <div class="mb-4">
      <h3 class="mb-2 text-lg font-semibold">검색 가능한 셀렉트</h3>
      <SearchableSelect class="w-200" placeholder="검색 가능한 옵션 선택" />
    </div>

    <!-- 모달 팝업 섹션 -->
    <div class="mb-4">
      <h3 class="mb-2 text-lg font-semibold">모달 팝업</h3>
      <div class="flex gap-4">
        <UiButton @click="openModal">중앙 모달 열기</UiButton>
        <UiButton @click="openRightModal">오른쪽 모달 열기</UiButton>
      </div>

      <!-- 중앙 모달 -->
      <Modal
        v-model="isModalOpen"
        :title="modalTitle"
        @close="closeModal"
        position="center"
      >
        <UiFormLayout>
          <UiFormItem label="제목">
            <UiInput placeholder="제목 입력" />
          </UiFormItem>
          <UiFormItem label="내용">
            <UiTextarea placeholder="내용 입력" />
          </UiFormItem>
        </UiFormLayout>
      </Modal>

      <!-- 오른쪽 모달 -->
      <Modal
        v-model="isRightModalOpen"
        :title="rightModalTitle"
        @close="closeRightModal"
        position="right"
        noDim="true"
      >
        <UiFormLayout>
          <UiFormItem label="카테고리">
            <UiSelect placeholder="카테고리 선택" />
          </UiFormItem>
          <UiFormItem label="실행기간">
            <UiDatePicker v-model="dateRange" isRange />
          </UiFormItem>
        </UiFormLayout>
      </Modal>
    </div>

    <!-- 필터 팝업 섹션 -->
    <div class="mb-4">
      <h3 class="mb-2 text-lg font-semibold">필터 팝업</h3>
      <div class="filter-wrp">
        <UiButton @click="openFilterModal">필터 열기</UiButton>
        <UiFilterModal
          v-model="isFilterModalOpen"
          title="검색 필터"
          position="left"
          :showFooter="true"
          @reset="resetFilters"
          @apply="applyFilters"
        >
          <UiFormLayout>
            <UiFormItem label="카테고리">
              <UiSelect v-model="filterCategory" placeholder="카테고리 선택" />
            </UiFormItem>
            <UiFormItem label="실행기간">
              <UiDatePicker
                v-model="filterDateRange"
                isRange
                startPlaceholder="시작일"
                endPlaceholder="종료일"
              />
            </UiFormItem>
          </UiFormLayout>
        </UiFilterModal>
      </div>
    </div>

    <!-- 세그먼트 컴포넌트 예시 -->
    <div class="mb-4">
      <h3 class="mb-2 text-lg font-semibold">세그먼트 컴포넌트</h3>
      <div>
        <UiSegment
          v-model="selectedSegment"
          :options="[
            { value: 'daily', label: '일간' },
            { value: 'weekly', label: '주간' },
            { value: 'monthly', label: '월간' },
          ]"
        />
        <p class="mt-2">선택된 값: {{ selectedSegment }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SearchableSelect from "~/components/UI/UiSearchableSelect.vue";
import Modal from "~/components/UI/UiModal.vue";
import UiButton from "~/components/UI/UiButton.vue";
import UiInput from "~/components/UI/UiInput.vue";
import UiSelect from "~/components/UI/UiSelect.vue";
import UiTextarea from "~/components/UI/UiTextarea.vue";
import UiFilterModal from "~/components/UI/UiFilterModal.vue";
import UiDatePicker from "~/components/UI/UiDatePicker.vue";
import UiFormLayout from "~/components/UI/UiFormLayout.vue";
import UiFormItem from "~/components/UI/UiFormItem.vue";
import UiSegment from "~/components/UI/UiSegment.vue";
  
// 중앙 모달 관련 상태
const isModalOpen = ref(false);
const modalTitle = ref("중앙 모달");

// 오른쪽 모달 관련 상태
const isRightModalOpen = ref(false);
const rightModalTitle = ref("오른쪽 모달");
const dateRange = ref([null, null]);

// 필터 관련 상태
const isFilterModalOpen = ref(false);
const filterCategory = ref("");
const filterDateRange = ref([null, null]);

// 세그먼트 관련 상태
const selectedSegment = ref('daily');

// 중앙 모달 제어 함수
function openModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}

// 오른쪽 모달 제어 함수
function openRightModal() {
  isRightModalOpen.value = true;
}

function closeRightModal() {
  isRightModalOpen.value = false;
}

// 필터 제어 함수
function openFilterModal() {
  isFilterModalOpen.value = !isFilterModalOpen.value;
}

function applyFilters() {
  console.log("필터 적용:", {
    category: filterCategory.value,
    dateRange: filterDateRange.value,
  });
  closeFilterModal();
}

function resetFilters() {
  filterCategory.value = "";
  filterDateRange.value = [null, null];
}
</script>
