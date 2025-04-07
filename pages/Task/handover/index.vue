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
              <UiButton icon-only variant="tertiary" @click="showUserSelectModal = true">
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
              <i class="icon icon-xl icon-search icon-white"></i>
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
            <UiButton variant="tertiary" size="small" @click="toggleSelectAll">
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
          <UiButton icon-only variant="tertiary" @click="showUserSelectModal = true">
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

  <!-- 담당자 선택 팝업 -->
  <UiModal v-model="showUserSelectModal" title="담당자 선택" size="large">
    <!-- 상단 영역: 검색 필터 -->
    <div class="user-select-filters">
      <div class="filter-row">
        <UiInput placeholder="이름" v-model="userNameFilter" class="filter-input" />
        <UiSelect
          placeholder="직위"
          v-model="userPositionFilter"
          :options="positionOptions"
          class="filter-select"
        />
        <UiSelect
          placeholder="직급"
          v-model="userRankFilter"
          :options="rankOptions"
          class="filter-select"
        />
        <UiButton type="primary" size="medium">
          <i class="icon icon-sm icon-search icon-white"></i>
          검색
        </UiButton>
      </div>
    </div>

    <!-- 메인 영역: 부서 트리와 사용자 목록 -->
    <div class="user-select-main">
      <!-- 왼쪽 영역: 부서 트리 -->
      <div class="department-tree-container">
        <div class="department-header">
          <h3 class="department-title">부서</h3>
          <div class="tree-actions">
            <button class="tree-action-btn" @click="expandAllDepts">
              <i class="icon icon-sm icon-plus"></i> 전체 펼침
            </button>
            <button class="tree-action-btn" @click="collapseAllDepts">
              <i class="icon icon-sm icon-minus"></i> 전체 닫힘
            </button>
          </div>
        </div>

        <!-- 부서 트리 구조 -->
        <div class="department-tree">
          <!-- 1DEPTH: 최상위 부서 -->
          <div v-for="dept in departments" :key="dept.id" class="dept-item-wrapper">
            <div
              :id="`popDept_${dept.id}`"
              class="dept-item"
              :class="{ hasChild: dept.hasChildren, expanded: expandedDepts.includes(dept.id) }"
              @click="popSearchUserByDeptId(dept.id)"
            >
              <i
                v-if="dept.hasChildren"
                class="icon icon-sm dept-toggle-icon"
                :class="
                  expandedDepts.includes(dept.id) ? 'icon-chevron-down' : 'icon-chevron-right'
                "
                @click.stop="toggleDeptExpand(dept.id)"
              ></i>
              <span class="dept-name">{{ dept.name }}</span>
            </div>

            <!-- 2DEPTH: 하위 부서 -->
            <div v-if="dept.hasChildren && expandedDepts.includes(dept.id)" class="sub-departments">
              <div v-for="subDept in dept.children" :key="subDept.id" class="dept-item-wrapper">
                <div
                  :id="`popDept_${subDept.id}`"
                  class="dept-item"
                  :class="{
                    hasChild: subDept.hasChildren,
                    expanded: expandedDepts.includes(subDept.id)
                  }"
                  @click="popSearchUserByDeptId(subDept.id)"
                >
                  <i
                    v-if="subDept.hasChildren"
                    class="icon icon-sm dept-toggle-icon"
                    :class="
                      expandedDepts.includes(subDept.id)
                        ? 'icon-chevron-down'
                        : 'icon-chevron-right'
                    "
                  ></i>
                  <span class="dept-name">{{ subDept.name }}</span>
                </div>

                <!-- 3DEPTH: 하위 부서 -->
                <div
                  v-if="subDept.hasChildren && expandedDepts.includes(subDept.id)"
                  class="sub-departments"
                >
                  <div
                    v-for="subSubDept in subDept.children"
                    :key="subSubDept.id"
                    class="dept-item-wrapper"
                  >
                    <div
                      :id="`popDept_${subSubDept.id}`"
                      class="dept-item"
                      :class="{
                        hasChild: subSubDept.hasChildren,
                        expanded: expandedDepts.includes(subSubDept.id)
                      }"
                      @click="popSearchUserByDeptId(subSubDept.id)"
                    >
                      <i
                        v-if="subSubDept.hasChildren"
                        class="icon icon-sm dept-toggle-icon"
                        :class="
                          expandedDepts.includes(subSubDept.id)
                            ? 'icon-chevron-down'
                            : 'icon-chevron-right'
                        "
                      ></i>
                      <span class="dept-name">{{ subSubDept.name }}</span>
                    </div>

                    <!-- 4DEPTH: 하위 부서 -->
                    <div
                      v-if="subSubDept.hasChildren && expandedDepts.includes(subSubDept.id)"
                      class="sub-departments"
                    >
                      <div
                        v-for="level4Dept in subSubDept.children"
                        :key="level4Dept.id"
                        class="dept-item-wrapper"
                      >
                        <div
                          :id="`popDept_${level4Dept.id}`"
                          class="dept-item"
                          @click="popSearchUserByDeptId(level4Dept.id)"
                        >
                          <span class="dept-name">{{ level4Dept.name }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 오른쪽 영역: 사용자 목록 -->
      <div class="user-list-container">
        <h3 class="user-list-title">사용자</h3>
        <div class="user-list-wrapper">
          <select id="userList" class="wp100 multiselect" multiple="multiple">
            <option v-for="user in filteredUsers" :key="user.id" :value="user.id">
              {{ user.rank }} {{ user.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- 푸터 영역: 확인/취소 버튼 -->
    <template #footerActions>
      <div class="modal-footer-actions">
        <UiButton variant="tertiary" @click="closeUserSelectModal">취소</UiButton>
        <UiButton variant="primary" @click="confirmUserSelection">확인</UiButton>
      </div>
    </template>
  </UiModal>
</template>

<script setup>
  import { ref, computed, inject } from 'vue'

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
  const expandedDepts = ref([])
  const selectedDeptId = ref(null)

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

  // 부서 데이터 (예시 - 4DEPTH까지 구현)
  const departments = ref([
    {
      id: 1,
      name: '경영지원본부',
      hasChildren: true,
      children: [
        {
          id: 11,
          name: '인사팀',
          hasChildren: true,
          children: [
            { id: 111, name: '채용파트', hasChildren: false },
            { id: 112, name: '교육파트', hasChildren: false },
            {
              id: 113,
              name: '평가파트',
              hasChildren: true,
              children: [
                { id: 1131, name: '성과평가', hasChildren: false },
                { id: 1132, name: '역량평가', hasChildren: false }
              ]
            }
          ]
        },
        { id: 12, name: '총무팀', hasChildren: false },
        { id: 13, name: '재무팀', hasChildren: false }
      ]
    },
    {
      id: 2,
      name: '개발본부',
      hasChildren: true,
      children: [
        { id: 21, name: '프론트엔드팀', hasChildren: false },
        { id: 22, name: '백엔드팀', hasChildren: false },
        { id: 23, name: '인프라팀', hasChildren: false }
      ]
    },
    {
      id: 3,
      name: '영업본부',
      hasChildren: true,
      children: [
        { id: 31, name: '국내영업팀', hasChildren: false },
        { id: 32, name: '해외영업팀', hasChildren: false }
      ]
    }
  ])

  // 사용자 데이터 (예시)
  const users = ref([
    { id: 1, name: '공수호', rank: '과장', deptId: 21 },
    { id: 2, name: '송기준', rank: '사원', deptId: 21 },
    { id: 3, name: '김민수', rank: '차장', deptId: 22 },
    { id: 4, name: '이지원', rank: '대리', deptId: 22 },
    { id: 5, name: '박영희', rank: '과장', deptId: 23 },
    { id: 6, name: '최준호', rank: '사원', deptId: 11 },
    { id: 7, name: '정미영', rank: '대리', deptId: 12 },
    { id: 8, name: '윤성민', rank: '과장', deptId: 13 }
  ])

  // 필터링된 사용자 목록 (UI용)
  const filteredUsers = computed(() => {
    return users.value
  })

  // 담당자 선택 모달 열기
  const openUserSelectModal = () => {
    showUserSelectModal.value = true
  }

  // 담당자 선택 모달 닫기
  const closeUserSelectModal = () => {
    showUserSelectModal.value = false
  }

  // 부서 트리 펼치기/접기 (UI용)
  const popExpandTree = deptId => {
    const index = expandedDepts.value.indexOf(deptId)
    if (index === -1) {
      expandedDepts.value.push(deptId)
    } else {
      expandedDepts.value.splice(index, 1)
    }
  }

  // 모든 부서 펼치기 (UI용)
  const expandAllDepts = () => {
    const allDeptIds = []
    departments.value.forEach(dept => {
      allDeptIds.push(dept.id)
      if (dept.hasChildren && dept.children) {
        dept.children.forEach(subDept => {
          allDeptIds.push(subDept.id)
          if (subDept.hasChildren && subDept.children) {
            subDept.children.forEach(subSubDept => {
              allDeptIds.push(subSubDept.id)
              if (subSubDept.hasChildren && subSubDept.children) {
                subSubDept.children.forEach(level4Dept => {
                  allDeptIds.push(level4Dept.id)
                })
              }
            })
          }
        })
      }
    })
    expandedDepts.value = [...allDeptIds]
  }

  // 모든 부서 접기 (UI용)
  const collapseAllDepts = () => {
    expandedDepts.value = []
  }

  // 부서별 사용자 검색 (UI용)
  const popSearchUserByDeptId = deptId => {
    selectedDeptId.value = deptId

    // 부서 클릭 시 해당 부서의 하위 메뉴 토글
    const dept =
      departments.value.find(d => d.id === deptId) ||
      departments.value.flatMap(d => d.children || []).find(d => d.id === deptId) ||
      departments.value
        .flatMap(d => (d.children || []).flatMap(c => c.children || []))
        .find(d => d.id === deptId)

    if (dept && dept.hasChildren) {
      popExpandTree(deptId) // 토글 기능 사용
    }
  }

  // 사용자 선택 확인 (UI용)
  const confirmUserSelection = () => {
    closeUserSelectModal()
  }
</script>

<style lang="scss" scoped>
  .task-handover-container {
    width: 100%;
    height: 100%;
    padding: 20px;
  }

  .task-handover-layout {
    display: flex;
    gap: 20px;
    height: 100%;
  }

  // 왼쪽 패널: 업무선택 영역
  .task-selection-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
    overflow: hidden;
  }

  .filter-section {
    margin-bottom: 20px;

    .search-row {
      display: flex;
      gap: 8px;
      margin-bottom: 12px;

      .search-input {
        flex: 1;
      }
    }

    .filter-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  }

  .selection-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .selection-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin: 0;
    }
  }

  .task-card-list {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .task-card {
    display: flex;
    padding: 16px;
    border-radius: 6px;
    border: 1px solid #e0e0e0;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: #bdbdbd;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    &.selected {
      border-color: #2196f3;
      background-color: rgba(33, 150, 243, 0.05);
    }

    .task-card-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-right: 16px;
      min-width: 60px;

      .profile-image {
        border-radius: 50%;
        overflow: hidden;
        margin-bottom: 8px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .assignee-name {
        font-size: 12px;
        color: #666;
        text-align: center;
      }
    }

    .task-card-center {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .task-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        margin-bottom: 4px;
      }

      .task-title {
        font-size: 16px;
        font-weight: 500;
        color: #333;
        margin-bottom: 8px;
      }

      .task-meta {
        display: flex;
        gap: 12px;
        font-size: 12px;
        color: #757575;

        .comment-count,
        .share-count {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      }
    }

    .task-card-right {
      display: flex;
      align-items: center;

      .task-date {
        font-size: 12px;
        color: #757575;
        white-space: nowrap;
      }
    }
  }

  // 오른쪽 패널: 업무전달 영역
  .task-handover-panel {
    width: 400px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
  }

  .search-section {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;

    .recipient-search-input {
      flex: 1;
    }
  }

  .handover-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    .handover-title {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin: 0;
    }
  }

  .handover-guide {
    margin-top: auto;

    .guide-list {
      list-style-type: none;
      padding: 0;
      margin: 0;

      .guide-item {
        position: relative;
        padding-left: 16px;
        margin-bottom: 12px;
        font-size: 14px;
        color: #666;

        &:before {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: #666;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  // 패널 타이틀 스타일
  .panel-title {
    font-size: 20px;
    font-weight: 600;
    color: #333;
    margin: 0 0 16px 0;
    padding-bottom: 12px;
    border-bottom: 1px solid #e0e0e0;
  }

  .filter-section {
    margin-bottom: 20px;

    .filter-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 12px;

      .search-container {
        display: flex;
        gap: 8px;
        width: 100%;
      }

      .filter-select {
        flex: 1;
        min-width: 180px;
      }
    }
  }

  .user-select-filters {
    margin-bottom: 16px;

    .filter-row {
      display: flex;
      gap: 12px;

      .filter-input,
      .filter-select {
        flex: 1;
      }
    }
  }

  .user-select-filters {
    margin-bottom: 16px;

    .filter-row {
      display: flex;
      gap: 12px;

      .filter-input,
      .filter-select {
        flex: 1;
      }
    }
  }

  .user-select-main {
    display: flex;
    gap: 20px;
    height: 400px;

    .department-tree-container,
    .user-list-container {
      flex: 1;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .department-header,
    .user-list-title {
      background-color: #f5f5f5;
      padding: 10px 12px;
      border-bottom: 1px solid #e0e0e0;
      font-weight: 600;
      font-size: 14px;
    }

    .department-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .tree-actions {
        display: flex;
        gap: 8px;
      }

      .tree-action-btn {
        background: none;
        border: none;
        font-size: 12px;
        color: #666;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 4px;

        &:hover {
          color: #333;
        }
      }
    }

    .department-tree {
      flex: 1;
      overflow-y: auto;
      padding: 8px 0;
    }

    .dept-item-wrapper {
      padding-left: 8px;
    }

    .dept-item {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      cursor: pointer;

      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }

      &.expanded {
        background-color: rgba(0, 0, 0, 0.05);
        font-weight: 500;
      }
    }

    .dept-expand-btn {
      background: none;
      border: none;
      padding: 0;
      margin-right: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
    }

    .dept-toggle-icon {
      margin-right: 6px;
      transition: transform 0.2s;
    }

    .dept-name {
      flex: 1;
    }

    .sub-departments {
      margin-left: 16px;
    }

    .user-list-wrapper {
      flex: 1;
      padding: 12px;
      overflow-y: auto;
    }

    .multiselect {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;

      option {
        padding: 8px 12px;

        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
      }
    }
  }

  .modal-footer-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }

  .wp100 {
    width: 100%;
  }

  .modal-footer-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }

  .wp100 {
    width: 100%;
  }
</style>
