<template>
  <div class="accordion-example">
    <!-- 기본 아코디언 예시 -->
    <UiAccordion v-model="open1" title="기본 아코디언">
      <div>이 영역은 아코디언이 열릴 때 표시됩니다.</div>
    </UiAccordion>

    <!-- 두 개의 아코디언 (동시 열림 가능) -->
    <UiAccordion v-model="open2" title="두 번째 아코디언">
      <div>두 번째 아코디언 내용입니다.</div>
    </UiAccordion>
    <UiAccordion v-model="open3" title="세 번째 아코디언">
      <div>세 번째 아코디언 내용입니다.</div>
    </UiAccordion>

    <!-- slot에 다양한 콘텐츠 활용 -->
    <UiAccordion v-model="open4" title="커스텀 콘텐츠 아코디언">
      <ul>
        <li>리스트 항목 1</li>
        <li>리스트 항목 2</li>
        <li>리스트 항목 3</li>
      </ul>
    </UiAccordion>
  </div>
</template>

<script setup>
  // 한국어 주석: 아코디언 열림/닫힘 상태 관리용 변수 선언
  import { ref } from 'vue'

  const open1 = ref(false)
  const open2 = ref(false)
  const open3 = ref(false)
  const open4 = ref(false)
</script>

<style lang="scss" scoped>
  // 한국어 주석: 예시 페이지용 스타일 (SCSS 중첩 사용)
  .accordion-example {
    max-width: 480px;
    margin: 32px auto;
    padding: 24px;
    background: #f8fafc;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);

    // 각 아코디언 간 간격 조정
    .ui-accordion {
      margin-bottom: 20px;
    }
  }
</style>
