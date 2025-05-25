<template>
  <div class="organization-user-selector">
    <UiFormLayout>
      <UiFormItem label="직원" :minWidth="30">
        <div class="flex items-center gap-5">
          <UiInput placeholder="직원 이름을 입력하세요" v-model="employeeName" class="w-180" />
          <UiButton variant="secondary" icon-only>
            <i class="icon icon-md icon-search icon-white"></i>
          </UiButton>
        </div>
      </UiFormItem>
    </UiFormLayout>

    <!-- 3컬럼 레이아웃 -->
    <div class="selector-columns">
      <!-- 첫 번째 컬럼: 조직 트리 -->
      <div class="column organization-tree-column">
        <div class="column-header">
          <h3 class="column-title">조직</h3>
          <div class="tree-actions">
            <button class="tree-action-btn" @click="expandAllOrgs">
              <i class="icon icon-sm icon-plus"></i> 전체 펼침
            </button>
            <button class="tree-action-btn" @click="collapseAllOrgs">
              <i class="icon icon-sm icon-minus"></i> 전체 닫힘
            </button>
          </div>
        </div>

        <!-- 조직 트리 구조 -->
        <div class="organization-tree">
          <!-- 1DEPTH: 최상위 조직 -->
          <div class="org-item-wrapper">
            <div
              class="org-item hasChild"
              :class="{ expanded: isExpanded('org1') }"
              @click="toggleOrg('org1')"
            >
              <i
                class="icon icon-sm org-toggle-icon"
                :class="isExpanded('org1') ? 'icon-chevron-down' : 'icon-chevron-right'"
              ></i>
              <span class="org-name">이즈파크</span>
            </div>

            <!-- 2DEPTH: 하위 조직 -->
            <div class="sub-organizations" v-if="isExpanded('org1')">
              <div class="org-item-wrapper">
                <div
                  class="org-item"
                  :class="{ selected: selectedOrgId === 'org1-1' }"
                  @click="selectOrganization('org1-1')"
                >
                  <span class="org-name">esm 고객관리팀</span>
                </div>
              </div>

              <div class="org-item-wrapper">
                <div
                  class="org-item hasChild"
                  :class="{ expanded: isExpanded('org1-2') }"
                  @click="toggleOrg('org1-2')"
                >
                  <i
                    class="icon icon-sm org-toggle-icon"
                    :class="isExpanded('org1-2') ? 'icon-chevron-down' : 'icon-chevron-right'"
                  ></i>
                  <span class="org-name">개발본부</span>
                </div>

                <!-- 3DEPTH: 하위 조직 -->
                <div class="sub-organizations" v-if="isExpanded('org1-2')">
                  <div class="org-item-wrapper">
                    <div
                      class="org-item hasChild"
                      :class="{ expanded: isExpanded('org1-2-1') }"
                      @click="toggleOrg('org1-2-1')"
                    >
                      <i
                        class="icon icon-sm org-toggle-icon"
                        :class="isExpanded('org1-2-1') ? 'icon-chevron-down' : 'icon-chevron-right'"
                      ></i>
                      <span class="org-name">프론트엔드팀</span>
                    </div>

                    <!-- 4DEPTH: 하위 조직 -->
                    <div class="sub-organizations" v-if="isExpanded('org1-2-1')">
                      <div class="org-item-wrapper">
                        <div
                          class="org-item"
                          :class="{ selected: selectedOrgId === 'org1-2-1-1' }"
                          @click="selectOrganization('org1-2-1-1')"
                        >
                          <span class="org-name">UI개발파트</span>
                        </div>
                      </div>
                      <div class="org-item-wrapper">
                        <div
                          class="org-item"
                          :class="{ selected: selectedOrgId === 'org1-2-1-2' }"
                          @click="selectOrganization('org1-2-1-2')"
                        >
                          <span class="org-name">React파트</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="org-item-wrapper">
                    <div
                      class="org-item hasChild"
                      :class="{ expanded: isExpanded('org1-2-2') }"
                      @click="toggleOrg('org1-2-2')"
                    >
                      <i
                        class="icon icon-sm org-toggle-icon"
                        :class="isExpanded('org1-2-2') ? 'icon-chevron-down' : 'icon-chevron-right'"
                      ></i>
                      <span class="org-name">백엔드팀</span>
                    </div>

                    <!-- 4DEPTH: 하위 조직 -->
                    <div class="sub-organizations" v-if="isExpanded('org1-2-2')">
                      <div class="org-item-wrapper">
                        <div
                          class="org-item"
                          :class="{ selected: selectedOrgId === 'org1-2-2-1' }"
                          @click="selectOrganization('org1-2-2-1')"
                        >
                          <span class="org-name">API파트</span>
                        </div>
                      </div>
                      <div class="org-item-wrapper">
                        <div
                          class="org-item"
                          :class="{ selected: selectedOrgId === 'org1-2-2-2' }"
                          @click="selectOrganization('org1-2-2-2')"
                        >
                          <span class="org-name">데이터베이스파트</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="org-item-wrapper">
                <div
                  class="org-item hasChild"
                  :class="{ expanded: isExpanded('org1-3') }"
                  @click="toggleOrg('org1-3')"
                >
                  <i
                    class="icon icon-sm org-toggle-icon"
                    :class="isExpanded('org1-3') ? 'icon-chevron-down' : 'icon-chevron-right'"
                  ></i>
                  <span class="org-name">경영지원본부</span>
                </div>

                <div class="sub-organizations" v-if="isExpanded('org1-3')">
                  <div class="org-item-wrapper">
                    <div
                      class="org-item"
                      :class="{ selected: selectedOrgId === 'org1-3-1' }"
                      @click="selectOrganization('org1-3-1')"
                    >
                      <span class="org-name">인사팀</span>
                    </div>
                  </div>
                  <div class="org-item-wrapper">
                    <div
                      class="org-item"
                      :class="{ selected: selectedOrgId === 'org1-3-2' }"
                      @click="selectOrganization('org1-3-2')"
                    >
                      <span class="org-name">총무팀</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 두 번째 컬럼: 소속 직원 목록 -->
      <div class="column department-users-column">
        <div class="column-header">
          <h3 class="column-title">소속 직원</h3>
        </div>
        <div class="user-list">
          <div
            class="user-item"
            v-for="user in departmentUsers"
            :key="user.id"
            :class="{ selected: selectedFromDept.has(user.id) }"
            @click="toggleDeptUser(user.id)"
          >
            <div class="user-info">
              <span class="user-name">{{ user.name }}</span>
              <span class="user-rank">[{{ user.rank }}]</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 이동 버튼 영역 -->
      <div class="transfer-buttons-column">
        <div class="transfer-buttons">
          <button class="transfer-btn transfer-right" @click="moveSelectedToRight">
            <i class="icon icon-md icon-arrow-right"></i>
          </button>
          <button class="transfer-btn transfer-left" @click="removeSelectedUsers">
            <i class="icon icon-md icon-arrow-left"></i>
          </button>
        </div>
      </div>

      <!-- 세 번째 컬럼: 선택된 직원 목록 -->
      <div class="column selected-users-column">
        <div class="column-header">
          <h3 class="column-title">선택 직원</h3>
        </div>
        <div class="user-list">
          <div
            class="user-item"
            v-for="user in selectedUsers"
            :key="user.id"
            :class="{ selected: selectedFromSelected.has(user.id) }"
            @click="toggleSelectedUser(user.id)"
          >
            <div class="user-info">
              <span class="user-name">{{ user.name }}</span>
              <span class="user-rank">[{{ user.rank }}]</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'

  const expandedOrgs = ref([]) // 펼쳐진 조직 ID 목록
  const selectedOrgId = ref('') // 선택된 조직 ID
  const employeeName = ref('') // 직원 이름 검색어

  // 조직별 직원 데이터
  const orgEmployeesData = ref({
    org1: [
      { id: 101, name: '김대표', rank: '대표이사' },
      { id: 102, name: '이부사장', rank: '부사장' }
    ],
    'org1-1': [
      { id: 201, name: '박고객', rank: '팀장' },
      { id: 202, name: '최관리', rank: '대리' }
    ],
    'org1-2': [
      { id: 301, name: '정개발', rank: '본부장' },
      { id: 302, name: '김기술', rank: '차장' }
    ],
    'org1-2-1': [
      { id: 401, name: '이프론트', rank: '팀장' },
      { id: 402, name: '박리액트', rank: '선임' },
      { id: 403, name: '최뷰', rank: '주임' }
    ],
    'org1-2-1-1': [
      { id: 501, name: '김UI', rank: '파트장' },
      { id: 502, name: '이퍼블', rank: '사원' }
    ],
    'org1-2-1-2': [
      { id: 601, name: '박React', rank: '파트장' },
      { id: 602, name: '최컴포넌트', rank: '주임' }
    ],
    'org1-2-2': [
      { id: 701, name: '정백엔드', rank: '팀장' },
      { id: 702, name: '김서버', rank: '선임' }
    ],
    'org1-2-2-1': [
      { id: 801, name: '이API', rank: '파트장' },
      { id: 802, name: '박엔드포인트', rank: '사원' }
    ],
    'org1-2-2-2': [
      { id: 901, name: '최DB', rank: '파트장' },
      { id: 902, name: '김쿼리', rank: '주임' }
    ],
    'org1-3': [
      { id: 1001, name: '박경영', rank: '본부장' },
      { id: 1002, name: '이지원', rank: '차장' }
    ],
    'org1-3-1': [
      { id: 1101, name: '정인사', rank: '팀장' },
      { id: 1102, name: '김채용', rank: '대리' }
    ],
    'org1-3-2': [
      { id: 1201, name: '최총무', rank: '팀장' },
      { id: 1202, name: '박시설', rank: '사원' }
    ]
  })

  const selectedUsers = ref([]) // 선택된 직원들
  const selectedFromDept = ref(new Set()) // 소속 직원에서 선택된 ID들
  const selectedFromSelected = ref(new Set()) // 선택 직원에서 선택된 ID들

  // 현재 조직의 직원 목록 (선택된 직원에 없는 것만)
  const departmentUsers = computed(() => {
    if (!selectedOrgId.value) return []

    const orgUsers = orgEmployeesData.value[selectedOrgId.value] || []
    return orgUsers.filter(user => !selectedUsers.value.find(selected => selected.id === user.id))
  })

  // 소속 직원 선택/해제
  const toggleDeptUser = userId => {
    if (selectedFromDept.value.has(userId)) {
      selectedFromDept.value.delete(userId)
    } else {
      selectedFromDept.value.add(userId)
    }
  }

  // 선택 직원 선택/해제
  const toggleSelectedUser = userId => {
    if (selectedFromSelected.value.has(userId)) {
      selectedFromSelected.value.delete(userId)
    } else {
      selectedFromSelected.value.add(userId)
    }
  }

  // 오른쪽으로 이동 (소속 직원 → 선택 직원)
  const moveSelectedToRight = () => {
    const toMove = departmentUsers.value.filter(user => selectedFromDept.value.has(user.id))

    toMove.forEach(user => {
      selectedUsers.value.push({ ...user })
      selectedFromDept.value.delete(user.id)
    })
  }

  // 왼쪽으로 이동 (선택 직원 → 제거)
  const removeSelectedUsers = () => {
    selectedUsers.value = selectedUsers.value.filter(
      user => !selectedFromSelected.value.has(user.id)
    )
    selectedFromSelected.value.clear()
  }

  // 조직 선택
  const selectOrganization = orgId => {
    selectedOrgId.value = orgId
    selectedFromDept.value.clear() // 조직 변경시 선택 상태 초기화
  }

  // 조직 ID가 확장된 상태인지 확인
  const isExpanded = orgId => {
    return expandedOrgs.value.includes(orgId)
  }

  // 조직 토글 (펼치기/접기)
  const toggleOrg = orgId => {
    const index = expandedOrgs.value.indexOf(orgId)
    if (index === -1) {
      expandedOrgs.value.push(orgId)
    } else {
      expandedOrgs.value.splice(index, 1)
    }
    // 조직 선택도 함께 처리
    selectOrganization(orgId)
  }

  // 모든 조직 펼치기
  const expandAllOrgs = () => {
    expandedOrgs.value = ['org1', 'org1-2', 'org1-2-1', 'org1-2-2', 'org1-3']
  }

  // 모든 조직 접기
  const collapseAllOrgs = () => {
    expandedOrgs.value = []
  }
</script>

<style lang="scss" scoped>
  .organization-user-selector {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    overflow: hidden;
  }

  .selector-columns {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 400px;
  }

  .column {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: auto;
    overflow: hidden;
    border: 1px solid #e0e0e0;
  }

  .column-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #e0e0e0;
    background-color: #f5f5f5;
  }

  .column-title {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }

  .tree-actions {
    display: flex;
    gap: 8px;
  }

  .tree-action-btn {
    display: flex;
    align-items: center;
    padding: 8\4px;
    font-size: 12px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #666;

    &:hover {
      color: #333;
    }

    .icon {
      margin-right: 4px;
    }
  }

  .organization-tree {
    flex: 1;
    overflow-y: auto;
    padding: 8px;
  }

  .org-item-wrapper {
    margin-bottom: 4px;
  }

  .org-item {
    display: flex;
    align-items: center;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: $font-size-md;

    .org-name {
      font-weight: 500;
    }

    &:hover {
      background-color: #f0f0f0;
    }

    &.hasChild {
      font-weight: 500;
    }

    &.expanded {
      background-color: rgba(#00aaff, 0.1); // 연한 파란색 (확장됨)
    }

    &.selected {
      background-color: rgba(#ff6b35, 0.15); // 연한 주황색 (선택됨)
      border: 1px solid #ff6b35;
    }
  }

  .org-toggle-icon {
    margin-right: 8px;
    color: #666;
  }

  .sub-organizations {
    margin-left: 24px;
    margin-top: 4px;

    .org-item:not(.hasChild) {
      &::before {
        content: '-';
        display: inline-block;
        margin-right: 4px;
        color: #666;
      }
    }
  }

  .user-list {
    flex: 1;
    overflow-y: auto;
    padding: 8px;
  }

  .user-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    border-radius: 4px;
    margin-bottom: 4px;
    font-size: $font-size-md;
    cursor: pointer;
    border: 1px solid transparent; // 기본 투명 테두리

    &:hover {
      background-color: #f0f0f0;
    }

    &.selected {
      background-color: rgba(#28a745, 0.1); // 연한 초록색 (선택된 직원)
      border: 1px solid #28a745;
      color: #155724;
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .user-name {
    font-weight: 500;
  }

  .user-rank {
    font-size: 12px;
    color: #666;
  }

  /* 이동 버튼 영역 스타일 */
  .transfer-buttons-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60px;
  }

  .transfer-buttons {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .transfer-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #ddd;
    background-color: white;
    cursor: pointer;
    font-size: 20px;

    &:hover {
      background-color: #f0f0f0;
    }

    &.transfer-right {
      color: #0066cc;
    }

    &.transfer-left {
      color: #0066cc;
    }
  }
</style>
