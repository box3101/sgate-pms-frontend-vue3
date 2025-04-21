<template>
  <div class="task-handover-container">
    <!-- 좌우 2분할 구조 -->
    <div class="task-handover-layout">
      <!-- 왼쪽 패널: 업무선택 영역 -->
      <div class="task-selection-panel">
        <h1 class="panel-title">업무선택</h1>
        <!-- 상단 필터 영역 -->
        <div class="filter-section">
          <div class="filter-row">
            <div class="search-container">
              <UiInput placeholder="이찬용" v-model="searchKeyword" class="search-input w-226" />
              <UiButton icon-only variant="secondary" @click="showUserSelectModal = true">
                <i class="icon icon-xl icon-search"></i>
              </UiButton>
            </div>
            <UiSelect
              placeholder="보드 선택"
              v-model="selectedBoard"
              :options="boardOptions"
              class="filter-select"
            />
            <UiSelect
              placeholder="카테고리 선택"
              v-model="selectedCategory"
              :options="categoryOptions"
              class="filter-select"
            />
            <UiSelect
              placeholder="업무상태"
              v-model="selectedTaskStatus"
              :options="taskStatusOptions"
              class="filter-select"
            />
            <UiSelect
              placeholder="결과상태"
              v-model="selectedResultStatus"
              :options="resultStatusOptions"
              class="filter-select"
            />
            <UiSelect
              placeholder="진행상태"
              v-model="selectedProgressStatus"
              :options="progressStatusOptions"
              class="filter-select"
            />
            <UiButton type="secondary" size="medium" class="flex justify-end">
              <i class="icon icon-md icon-search icon-white"></i>
              통합검색
            </UiButton>
          </div>
        </div>

        <!-- 중간 헤더 영역 -->
        <div class="selection-header">
          <h2 class="selection-title">전달할 업무를 선택하세요</h2>
          <div v-if="isAllSelected">
            <UiButton variant="primary" size="small" @click="toggleSelectAll">
              <i class="icon icon-md icon-check icon-white"></i>
              전체해제
            </UiButton>
          </div>
          <div v-else>
            <UiButton variant="secondary" size="small" @click="toggleSelectAll">
              <i class="icon icon-md icon-check"></i>
              전체선택
            </UiButton>
          </div>
        </div>

        <!-- 하단 카드 리스트 영역 -->
        <div class="task-card-list">
          <div
            v-for="(task, index) in taskList"
            :key="index"
            class="task-card"
            :class="{ selected: selectedTasks.includes(task.id) }"
            @click="toggleTaskSelection(task.id)"
          >
            <div class="task-card-left">
              <div class="profile-image">
                <i class="icon icon-xxl icon-user"></i>
              </div>
            </div>
            <div class="task-card-center">
              <div class="task-tags">
                <UiTag v-for="(tag, tagIndex) in task.tags" :key="tagIndex" :type="tag.type">
                  {{ tag.text }}
                </UiTag>
              </div>
              <div class="task-title">{{ task.title }}</div>
              <div class="task-meta">
                <span class="comment-count">
                  <i class="icon icon-sm icon-comment"></i> {{ task.commentCount }}
                </span>
                <span class="share-count">
                  <i class="icon icon-sm icon-share"></i> {{ task.shareCount }}
                </span>
              </div>
            </div>
            <div class="task-card-right">
              <div class="task-date">
                <template v-if="task.endDate"> {{ task.startDate }} - {{ task.endDate }} </template>
                <template v-else>
                  {{ task.startDate }}
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 오른쪽 패널: 업무전달 영역 -->
      <div class="task-handover-panel">
        <h1 class="panel-title">업무전달</h1>
        <!-- 상단 검색 영역 -->
        <div class="search-section">
          <UiInput
            placeholder="전달할 대상을 검색하세요"
            v-model="recipientSearchKeyword"
            class="recipient-search-input"
          />
          <UiButton icon-only variant="secondary" @click="showUserSelectModal = true">
            <i class="icon icon-xl icon-search"></i>
          </UiButton>
        </div>

        <!-- 중간 헤더 영역 -->
        <div class="handover-header">
          <h2 class="handover-title">선택한 업무를 선택한 대상에게 전달하세요</h2>
          <UiButton type="primary" size="medium" :disabled="!canHandover" @click="handoverTasks">
            업무전달
          </UiButton>
        </div>

        <!-- 하단 안내사항 리스트 -->
        <div class="handover-guide">
          <ul class="guide-list">
            <li class="guide-item">왼쪽 업무에서 이동을 원하는 업무를 선택하세요.</li>
            <li class="guide-item">전달된 업무는 본인의 카테고리로 이동 후 사용할 수 있습니다.</li>
            <li class="guide-item">협업/공유자에게 업무를 전달할 수 없습니다.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, inject } from 'vue'
  import DepartmentUserSelector from '@/components/domain/DepartmentUserSelector.vue'

  // 로고 텍스트 접근
  const logoText = inject('logoText')

  // 원하는 시점에 로고 텍스트 변경
  logoText.value = '업무 인수인계'

  // 검색 키워드
  const searchKeyword = ref('')
  const recipientSearchKeyword = ref('')

  // 필터 선택 값
  const selectedBoard = ref(null)
  const selectedCategory = ref(null)
  const selectedTaskStatus = ref(null)
  const selectedResultStatus = ref(null)
  const selectedProgressStatus = ref(null)

  // 필터 옵션
  const boardOptions = ref([
    { label: '보드 1', value: 'board1' },
    { label: '보드 2', value: 'board2' },
    { label: '보드 3', value: 'board3' }
  ])

  const categoryOptions = ref([
    { label: '카테고리 1', value: 'category1' },
    { label: '카테고리 2', value: 'category2' },
    { label: '카테고리 3', value: 'category3' }
  ])

  const taskStatusOptions = ref([
    { label: '진행중', value: 'in_progress' },
    { label: '완료', value: 'completed' },
    { label: '대기중', value: 'pending' }
  ])

  const resultStatusOptions = ref([
    { label: '성공', value: 'success' },
    { label: '실패', value: 'fail' },
    { label: '보류', value: 'hold' }
  ])

  const progressStatusOptions = ref([
    { label: '0%', value: '0' },
    { label: '25%', value: '25' },
    { label: '50%', value: '50' },
    { label: '75%', value: '75' },
    { label: '100%', value: '100' }
  ])

  // 업무 목록 (더미 데이터)
  const taskList = ref([
    {
      id: 1,
      profileImage: '/images/profile1.jpg',
      tags: [
        { type: 'primary', text: '클라우드' },
        { type: 'secondary', text: '공유' }
      ],
      title: '클라우드 서버 마이그레이션 작업',
      commentCount: 5,
      shareCount: 3,
      startDate: '2025-04-01',
      endDate: '2025-04-15'
    },
    {
      id: 2,
      profileImage: '/images/profile2.jpg',
      tags: [{ type: 'primary', text: '개발' }],
      title: '신규 기능 개발',
      commentCount: 2,
      shareCount: 1,
      startDate: '2025-04-05',
      endDate: null
    },
    {
      id: 3,
      profileImage: '/images/profile3.jpg',
      tags: [
        { type: 'secondary', text: '공유' },
        { type: 'warning', text: '긴급' }
      ],
      title: '보안 취약점 패치 적용',
      commentCount: 8,
      shareCount: 4,
      startDate: '2025-04-03',
      endDate: '2025-04-10'
    },
    {
      id: 4,
      profileImage: '/images/profile3.jpg',
      tags: [
        { type: 'secondary', text: '공유' },
        { type: 'warning', text: '긴급' }
      ],
      title: '보안 취약점 패치 적용',
      commentCount: 8,
      shareCount: 4,
      startDate: '2025-04-03',
      endDate: '2025-04-10'
    },
    {
      id: 5,
      profileImage: '/images/profile3.jpg',
      tags: [
        { type: 'secondary', text: '공유' },
        { type: 'warning', text: '긴급' }
      ],
      title: '보안 취약점 패치 적용',
      commentCount: 8,
      shareCount: 4,
      startDate: '2025-04-03',
      endDate: '2025-04-10'
    }
  ])

  // 선택된 업무 ID 목록
  const selectedTasks = ref([])

  // 전체 선택 상태
  const isAllSelected = computed(() => {
    return selectedTasks.value.length === taskList.value.length
  })

  // 업무 전달 가능 여부
  const canHandover = computed(() => {
    return selectedTasks.value.length > 0 && recipientSearchKeyword.value.trim() !== ''
  })

  // 전체 선택/해제 토글
  const toggleSelectAll = () => {
    if (isAllSelected.value) {
      selectedTasks.value = []
    } else {
      selectedTasks.value = taskList.value.map(task => task.id)
    }
  }

  // 개별 업무 선택/해제 토글
  const toggleTaskSelection = taskId => {
    const index = selectedTasks.value.indexOf(taskId)
    if (index === -1) {
      selectedTasks.value.push(taskId)
    } else {
      selectedTasks.value.splice(index, 1)
    }
  }

  // 업무 전달 함수
  const handoverTasks = () => {
    // 실제 구현에서는 API 호출 등의 로직이 들어갈 예정
    console.log('전달할 업무:', selectedTasks.value)
    console.log('전달 대상:', recipientSearchKeyword.value)
    alert('업무 전달이 완료되었습니다.')
  }

  // 담당자 선택 모달 관련
  const showUserSelectModal = ref(false)
  const userNameFilter = ref('')
  const userPositionFilter = ref(null)
  const userRankFilter = ref(null)

  // 직위 옵션
  const positionOptions = [
    { value: 'manager', label: '팀장' },
    { value: 'leader', label: '리더' },
    { value: 'member', label: '팀원' }
  ]

  // 직급 옵션
  const rankOptions = [
    { value: 'senior', label: '수석' },
    { value: 'principal', label: '책임' },
    { value: 'senior_manager', label: '차장' },
    { value: 'manager', label: '과장' },
    { value: 'assistant_manager', label: '대리' },
    { value: 'staff', label: '사원' }
  ]
</script>

<style lang="scss" scoped></style>
