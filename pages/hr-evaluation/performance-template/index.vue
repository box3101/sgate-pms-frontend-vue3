<!-- 메인 템플릿 페이지 - 수정 버전 -->
<template>
  <div class="page-container">
    <PageHeader />
    <div class="content-wrapper flex-container">
      <!-- 왼쪽: 템플릿 목록 -->
      <div class="template-list-section w-30p">
        <TemplateList @template-selected="handleTemplateSelection" />
      </div>

      <!-- 오른쪽: 동적 컨텐츠 영역 -->
      <div class="template-content-section w-70p">
        <!-- 템플릿 선택 전 초기 상태 -->
        <div v-if="!selectedTemplate" class="empty-state">
          <div class="empty-content">
            <div class="empty-icon">📋</div>
            <h3>템플릿을 선택해주세요</h3>
            <p>
              왼쪽 목록에서 템플릿을 선택하면<br />
              해당하는 편집 화면이 표시됩니다.
            </p>
          </div>
        </div>

        <!-- 공통 템플릿 에디터 -->
        <CommonTemplateEditor
          v-else
          :template="selectedTemplate"
          @close="clearSelection"
          @save="handleSave"
          @preview="handlePreview"
          @copy="handleCopy"
        >
          <!-- 양식 타입 - TinyMCE 에디터 -->
          <TemplateFormEditor
            v-if="selectedTemplate.type === '양식'"
            :template="selectedTemplate"
          />

          <!-- 항목정의 타입 - 테이블 에디터 -->
          <TemplateTableEditor
            v-else-if="selectedTemplate.type === '항목정의'"
            :template="selectedTemplate"
          />
        </CommonTemplateEditor>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import PageHeader from './comp/PageHeader.vue'
  import TemplateList from './comp/TemplateList.vue'
  import CommonTemplateEditor from './comp/CommonTemplateEditor.vue'
  import TemplateFormEditor from './comp/TemplateFormEditor.vue'
  import TemplateTableEditor from './comp/TemplateTableEditor.vue'

  // 선택된 템플릿 상태 관리
  const selectedTemplate = ref(null)

  // 템플릿 선택 핸들러
  const handleTemplateSelection = template => {
    selectedTemplate.value = template
    console.log('선택된 템플릿:', template)
  }

  // 선택 해제
  const clearSelection = () => {
    selectedTemplate.value = null
  }

  // 공통 액션 핸들러들
  const handleSave = data => {
    console.log('저장 데이터:', data)
    alert(`${selectedTemplate.value.name} 템플릿이 저장되었습니다!`)
  }

  const handlePreview = template => {
    console.log('미리보기:', template)
    alert(`${template.name} 미리보기를 엽니다`)
  }

  const handleCopy = template => {
    console.log('템플릿 복사:', template)
    alert(`${template.name} 템플릿을 복사했습니다`)
  }
</script>
