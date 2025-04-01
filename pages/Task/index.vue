<template>
  <div class="flex gap-10 h-100p">
    <div class="w-30p py-10 px-10" style="border: 1px solid #aaa">
      <!-- 왼쪽 콘텐츠 영역 -->
      <div class="header flex gap-10 items-center">
        <h2 class="text-xl font-semibold mb-4">나의 보드</h2>
        <div>
          <UiButton
            @click="isFilterModalOpen = true"
            variant="tertiary"
            icon-only
            title="필터"
          >
            <Icon name="heroicons:magnifying-glass" size="20" />
          </UiButton>
          <UiFilterModal
            v-model="isFilterModalOpen"
            title="나의 필터"
            size="small"
            :show-footer="true"
          >
            <UiMultiSelect
              v-model="selectedDepartments"
              :options="departmentOptions"
              placeholder="부서를 선택해주세요."
            />

            <div class="selected-departments">
              <p>선택된 부서: {{ selectedDepartments.join(", ") }}</p>
            </div>
            <template #footerActions>
              <UiButton variant="tertiary" @click="isFilterModalOpen = false"
                >닫기</UiButton
              >
              <UiButton variant="primary" @click="isFilterModalOpen = false"
                >저장</UiButton
              >
            </template>
          </UiFilterModal>
        </div>
      </div>
      <div class="task-list mt-15">
        <!-- 업무리스트 영역 -->
        <div class="board-item">
          <div class="task-card">
            <div class="task-card-header">
              <h3 class="task-title">마케팅</h3>
              <UiButton variant="tertiary" size="small" class="shortcut-btn"
                >바로가기</UiButton
              >
            </div>

            <div class="task-status">
              <div class="status-indicators">
                <div class="status-item">
                  <span
                    class="status-dot"
                    style="background-color: #6aa2fa"
                  ></span>
                  <a href="#" class="status-count"
                    ><span class="count-number">7</span
                    ><span class="count-unit">건</span></a
                  >
                </div>
                <div class="status-item">
                  <span
                    class="status-dot"
                    style="background-color: #ecc73c"
                  ></span>
                  <a href="#" class="status-count"
                    ><span class="count-number">24</span
                    ><span class="count-unit">건</span></a
                  >
                </div>
                <div class="status-item">
                  <span
                    class="status-dot"
                    style="background-color: #db514c"
                  ></span>
                  <a href="#" class="status-count"
                    ><span class="count-number">4</span
                    ><span class="count-unit">건</span></a
                  >
                </div>
              </div>

              <div class="activity-indicators">
                <span class="activity-label">활동</span>
                <div class="activity-status">
                  <button v-if="hasNewActivity" class="new-badge" @click="handleNewClick">NEW</button>
                  <span class="activity-count">1건</span>
                </div>
                <span class="feedback-label">피드백</span>
                <span class="feedback-count dash">-</span>
              </div>
            </div>

            <div class="progress-status">
              <div class="progress-wrapper">
                <span class="status-tag">진행중</span>
                <a href="#" class="status-count"
                  ><span class="count-number">31</span
                  ><span class="count-unit">건</span></a
                >
                <span class="status-tag">완료</span>
                <a href="#" class="status-count"
                  ><span class="count-number">4</span
                  ><span class="count-unit">건</span></a
                >
                <span class="status-tag">진행전</span>
                <span class="dash">-</span>
                <span class="status-tag">취소/보류</span>
                <span class="dash">-</span>
              </div>
            </div>

            <div class="collaboration-status">
              <div class="collab-wrapper">
                <span class="collab-tag">협업</span>
                <span>ADMIN외 34명</span>
                <span class="collab-tag">공유</span>
                <span>ADMIN외 28명</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-70p py-10 px-10" style="border: 1px solid #aaa">
      <!-- 오른쪽 콘텐츠 영역 -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 필터 모달
const isFilterModalOpen = ref(false);

// 선택된 부서
const selectedDepartments = ref([]);

// 활동 상태
const hasNewActivity = ref(true);

// NEW 버튼 클릭 핸들러
const handleNewClick = () => {
  console.log('NEW 버튼이 클릭되었습니다');
  // 필요한 로직 추가
};

// 부서 옵션
const departmentOptions = [
  { value: "생산", label: "생산" },
  { value: "마케팅", label: "마케팅" },
  { value: "인사", label: "인사" },
  { value: "제조공장", label: "제조공장" },
  { value: "생산2", label: "생산" },
  { value: "마케팅2", label: "마케팅" },
  { value: "인사2", label: "인사" },
  { value: "제조공장2", label: "제조공장" },
];
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables";

.flex {
  display: flex;
}

.gap-10 {
  gap: 10px;
}

.h-100p {
  height: 100%;
}

.w-30p {
  width: 30%;
}

.w-70p {
  width: 70%;
}

.py-10 {
  padding-top: 10px;
  padding-bottom: 10px;
}

.px-10 {
  padding-left: 10px;
  padding-right: 10px;
}

.items-center {
  align-items: center;
}

.text-xl {
  font-size: 1.25rem;
}

.font-semibold {
  font-weight: 600;
}

.mb-4 {
  margin-bottom: 4px;
}

.mt-15 {
  margin-top: 15px;
}

.selected-departments {
  margin-top: 10px;
  color: $text-color;
  font-size: $font-size-md;
}

.task-card {
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  margin-bottom: 16px;
}

.task-card:hover {
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  border-color: #bfdbfe;
  transform: translateY(-2px);
}

.task-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
  font-size: $font-size-lg;
}

.task-title {
  color: #333;
  transition: color 0.2s ease;
  font-size: $font-size-xl;
  font-weight: 600;
}

.task-title:hover {
  color: #3b82f6;
}

.shortcut-btn {
  font-size: 12px;
  position: relative;
  overflow: hidden;
}

.shortcut-btn::before {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: #3b82f6;
  transition: width 0.2s ease;
}

.shortcut-btn:hover::before {
  width: 100%;
}

.status-indicators {
  display: flex;
  gap: 10px;
  margin-bottom: 8px;
  margin-top: 8px;
}

.status-item {
  display: flex;
  align-items: center;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  transition: transform 0.2s ease;
}

.status-dot:hover {
  transform: scale(1.2);
}

.status-count {
  font-size: $font-size-md;
  color: $text-color;
  text-decoration: none;
  transition: all 0.2s ease;
  margin-left: 5px;
  padding: 0 2px;
}

.status-count:hover {
  color: #3b82f6;
  text-decoration: underline;
  font-weight: 500;
}

.count-number {
  font-weight: 500;
  margin-right: 2px;
  font-size: 16px;
}

.count-unit {
  color: #6b7280;
  font-size: 14px;
}

.dash {
  color: #9ca3af;
}

.activity-indicators {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  padding: 6px 10px;
  border-radius: 6px;
  background-color: #f9fafb;
  transition: background-color 0.2s ease;
  font-size: 0.75rem;
  color: #6b7280;
}

.activity-indicators:hover {
  background-color: #f3f4f6;
}

.activity-status {
  display: flex;
  align-items: center;
}

.activity-label, .feedback-label {
  font-weight: 500;
  color: #6b7280;
}

.activity-count, .feedback-count {
  font-weight: 600;
  color: #4b5563;
}

.activity-count {
  position: relative;
}

.activity-count::after {
  content: "";
  position: absolute;
  height: 12px;
  width: 1px;
  background-color: #d1d5db;
  right: -12px;
  top: 50%;
  transform: translateY(-50%);
}

.new-badge {
  font-size: 12px;
  padding: 2px 8px;
  background-color: #3b82f6;
  border-radius: 4px;
  color: #fff;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  cursor: pointer;
  margin-right: 5px;
}

.new-badge:hover {
  background-color: #2563eb;
}

.progress-status {
  margin-top: 10px;
}

.progress-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.status-tag, .collab-tag {
  font-size: 12px;
  padding: 2px 8px;
  background-color: #f3f4f6;
  border-radius: 4px;
  color: #4b5563;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.collaboration-status {
  margin-top: 10px;
  font-size: 0.875rem;
}

.collab-wrapper {
  display: flex;
  gap: 6px;
}
</style>
