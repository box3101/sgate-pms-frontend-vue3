<template>
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
        <div class="dept-item-wrapper">
          <div
            class="dept-item hasChild"
            :class="{ expanded: isExpanded('dept1') }"
            @click="toggleDept('dept1')"
          >
            <i
              class="icon icon-sm dept-toggle-icon"
              :class="isExpanded('dept1') ? 'icon-chevron-down' : 'icon-chevron-right'"
            ></i>
            <span class="dept-name">경영지원본부</span>
          </div>

          <!-- 2DEPTH: 하위 부서 -->
          <div class="sub-departments" v-if="isExpanded('dept1')">
            <div class="dept-item-wrapper">
              <div
                class="dept-item hasChild"
                :class="{ expanded: isExpanded('dept1-1') }"
                @click="toggleDept('dept1-1')"
              >
                <i
                  class="icon icon-sm dept-toggle-icon"
                  :class="isExpanded('dept1-1') ? 'icon-chevron-down' : 'icon-chevron-right'"
                ></i>
                <span class="dept-name">인사팀</span>
              </div>

              <!-- 3DEPTH: 하위 부서 -->
              <div class="sub-departments" v-if="isExpanded('dept1-1')">
                <div class="dept-item-wrapper">
                  <div class="dept-item">
                    <span class="dept-name">채용파트</span>
                  </div>
                </div>
                <div class="dept-item-wrapper">
                  <div class="dept-item">
                    <span class="dept-name">교육파트</span>
                  </div>
                </div>
                <div class="dept-item-wrapper">
                  <div
                    class="dept-item hasChild"
                    :class="{ expanded: isExpanded('dept1-1-3') }"
                    @click="toggleDept('dept1-1-3')"
                  >
                    <i
                      class="icon icon-sm dept-toggle-icon"
                      :class="isExpanded('dept1-1-3') ? 'icon-chevron-down' : 'icon-chevron-right'"
                    ></i>
                    <span class="dept-name">평가파트</span>
                  </div>

                  <!-- 4DEPTH: 하위 부서 -->
                  <div class="sub-departments" v-if="isExpanded('dept1-1-3')">
                    <div class="dept-item-wrapper">
                      <div class="dept-item">
                        <span class="dept-name">성과평가</span>
                      </div>
                    </div>
                    <div class="dept-item-wrapper">
                      <div class="dept-item">
                        <span class="dept-name">역량평가</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="dept-item-wrapper">
              <div class="dept-item">
                <span class="dept-name">총무팀</span>
              </div>
            </div>
            <div class="dept-item-wrapper">
              <div class="dept-item">
                <span class="dept-name">재무팀</span>
              </div>
            </div>
          </div>
        </div>

        <div class="dept-item-wrapper">
          <div
            class="dept-item hasChild"
            :class="{ expanded: isExpanded('dept2') }"
            @click="toggleDept('dept2')"
          >
            <i
              class="icon icon-sm dept-toggle-icon"
              :class="isExpanded('dept2') ? 'icon-chevron-down' : 'icon-chevron-right'"
            ></i>
            <span class="dept-name">개발본부</span>
          </div>

          <!-- 2DEPTH: 하위 부서 -->
          <div class="sub-departments" v-if="isExpanded('dept2')">
            <div class="dept-item-wrapper">
              <div class="dept-item">
                <span class="dept-name">프론트엔드팀</span>
              </div>
            </div>
            <div class="dept-item-wrapper">
              <div class="dept-item">
                <span class="dept-name">백엔드팀</span>
              </div>
            </div>
            <div class="dept-item-wrapper">
              <div class="dept-item">
                <span class="dept-name">인프라팀</span>
              </div>
            </div>
            <div class="dept-item-wrapper">
              <div class="dept-item">
                <span class="dept-name">인프라팀</span>
              </div>
            </div>
            <div class="dept-item-wrapper">
              <div class="dept-item">
                <span class="dept-name">인프라팀</span>
              </div>
            </div>
            <div class="dept-item-wrapper">
              <div class="dept-item">
                <span class="dept-name">인프라팀</span>
              </div>
            </div>
            <div class="dept-item-wrapper">
              <div class="dept-item">
                <span class="dept-name">인프라팀</span>
              </div>
            </div>
            <div class="dept-item-wrapper">
              <div class="dept-item">
                <span class="dept-name">인프라팀</span>
              </div>
            </div>
            <div class="dept-item-wrapper">
              <div class="dept-item">
                <span class="dept-name">인프라팀</span>
              </div>
            </div>
            <div class="dept-item-wrapper">
              <div class="dept-item">
                <span class="dept-name">인프라팀</span>
              </div>
            </div>
          </div>
        </div>

        <div class="dept-item-wrapper">
          <div
            class="dept-item hasChild"
            :class="{ expanded: isExpanded('dept3') }"
            @click="toggleDept('dept3')"
          >
            <i
              class="icon icon-sm dept-toggle-icon"
              :class="isExpanded('dept3') ? 'icon-chevron-down' : 'icon-chevron-right'"
            ></i>
            <span class="dept-name">영업본부</span>
          </div>

          <!-- 2DEPTH: 하위 부서 -->
          <div class="sub-departments" v-if="isExpanded('dept3')">
            <div class="dept-item-wrapper">
              <div class="dept-item">
                <span class="dept-name">국내영업팀</span>
              </div>
            </div>
            <div class="dept-item-wrapper">
              <div class="dept-item">
                <span class="dept-name">해외영업팀</span>
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
        <div class="user-list">
          <div class="user-item">
            <span class="user-rank">과장</span> <span class="user-name">공수호</span>
          </div>
          <div class="user-item">
            <span class="user-rank">사원</span> <span class="user-name">송기준</span>
          </div>
          <div class="user-item">
            <span class="user-rank">차장</span> <span class="user-name">김민수</span>
          </div>
          <div class="user-item">
            <span class="user-rank">대리</span> <span class="user-name">이지원</span>
          </div>
          <div class="user-item">
            <span class="user-rank">과장</span> <span class="user-name">박영희</span>
          </div>
          <div class="user-item">
            <span class="user-rank">사원</span> <span class="user-name">최준호</span>
          </div>
          <div class="user-item">
            <span class="user-rank">대리</span> <span class="user-name">정미영</span>
          </div>
          <div class="user-item">
            <span class="user-rank">과장</span> <span class="user-name">윤성민</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  // 부서 트리 상태 관리
  const expandedDepts = ref([])

  // 부서 ID가 확장된 상태인지 확인
  const isExpanded = deptId => {
    return expandedDepts.value.includes(deptId)
  }

  // 부서 토글 (펼치기/접기)
  const toggleDept = deptId => {
    const index = expandedDepts.value.indexOf(deptId)
    if (index === -1) {
      expandedDepts.value.push(deptId)
    } else {
      expandedDepts.value.splice(index, 1)
    }
  }

  // 모든 부서 펼치기
  const expandAllDepts = () => {
    expandedDepts.value = ['dept1', 'dept1-1', 'dept1-1-3', 'dept2', 'dept3']
  }

  // 모든 부서 접기
  const collapseAllDepts = () => {
    expandedDepts.value = []
  }
</script>

<style lang="scss" scoped>
  .user-select-main {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 400px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
  }

  .department-tree-container {
    width: 40%;
    border-right: 1px solid #e0e0e0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .department-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #e0e0e0;
    background-color: #f5f5f5;
  }

  .department-title {
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
    padding: 4px 8px;
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

  .department-tree {
    flex: 1;
    overflow-y: auto;
    padding: 8px;
  }

  .dept-item-wrapper {
    margin-bottom: 4px;
  }

  .dept-item {
    display: flex;
    align-items: center;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }

    &.hasChild {
      font-weight: 500;
    }

    &.expanded {
      background-color: #f0f0f0;
    }
  }

  .dept-toggle-icon {
    margin-right: 8px;
    color: #666;
  }

  .sub-departments {
    margin-left: 24px;
    margin-top: 4px;
  }

  .user-list-container {
    width: 60%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .user-list-title {
    margin: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    color: #333;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e0e0e0;
  }

  .user-list-wrapper {
    flex: 1;
    overflow-y: auto;
    padding: 8px;
  }

  .user-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .user-item {
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  .user-rank {
    font-weight: 500;
    margin-right: 4px;
  }

  .user-name {
    color: #333;
  }

  .wp100 {
    width: 100%;
  }
</style>
