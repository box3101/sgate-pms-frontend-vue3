<template>
  <div class="page-container">
    <Header />
    <div class="flex-container">
      <div class="w-40p">
        <!-- 성과기술서 템플릿 데이터-->
        <Left v-model="templateRows" @save="handleSave" @edit-template="handleEditTemplate" />
        <!-- 성과기술서 템플릿 데이터 EEE-->
      </div>
      <div class="w-60p">
        <Right :selectedTemplate="selectedTemplate" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import Header from './comp/Header.vue'
  import Left from './comp/성과기술서템플릿데이터.vue'
  import Right from './comp/항목데이터.vue'

  const templateRows = ref([
    {
      id: 1,
      name: '첫 번째 템플릿',
      type: '양식'
    },
    {
      id: 2,
      name: '두 번째 템플릿',
      type: '양식'
    },
    {
      id: 3,
      name: '세 번째 템플릿',
      type: '항목정의'
    }
  ])
  const selectedTemplate = ref(null) // 선택된 템플릿 상태

  const savedTemplates = ref([])

  // 함수
  function loadSavedTemplate(templateId) {
    const savedTemplate = savedTemplates.value.find(item => item.id === templateId)

    if (savedTemplate) {
      // 저장된 템플릿 데이터를 현재 테이블로 복사
      templateRows.value = [...savedTemplate.data]
      console.log('템플릿 불러오기 완료:', savedTemplate)
    } else {
      console.error('해당 템플릿을 찾을 수 없습니다.')
    }
  }

  function handleSave(tableData) {
    const cleanedData = tableData.map(item => ({
      ...item,
      isNewRow: false // 저장시 새 행 플래그 제거
    }))

    // 현재 시간을 저장 시간으로 추가
    const savedData = {
      id: Date.now(),
      savedAt: new Date().toLocaleString(),
      data: cleanedData
    }

    savedTemplates.value.push(savedData)
    console.log('저장 완료:', savedData)

    loadSavedTemplate(savedData.id)
  }

  function handleEditTemplate(templateData) {
    selectedTemplate.value = templateData
    console.log('편집할 템플릿:', templateData)
  }
</script>
