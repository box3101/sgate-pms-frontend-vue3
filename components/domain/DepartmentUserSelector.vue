<template>
  <!-- 메인 영역: 부서 트리와 사용자 목록 -->
  <div class="department-user-selector">
    <div class="selector-columns flex gap-10">
      <!-- 왼쪽 영역: 부서 트리 -->
      <div class="column">
        <div class="column-header">
          <h3 class="column-title">부서</h3>
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
                        :class="
                          isExpanded('dept1-1-3') ? 'icon-chevron-down' : 'icon-chevron-right'
                        "
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
      <div class="column">
        <div class="column-header">
          <h3 class="column-title">사용자</h3>
        </div>
        <div class="user-list">
          <div class="user-item">
            <div class="user-info">
              <span class="user-name">공수호</span>
              <span class="user-rank">과장</span>
            </div>
          </div>
          <div class="user-item">
            <div class="user-info">
              <span class="user-name">송기준</span>
              <span class="user-rank">사원</span>
            </div>
          </div>
          <div class="user-item">
            <div class="user-info">
              <span class="user-name">김민수</span>
              <span class="user-rank">차장</span>
            </div>
          </div>
          <div class="user-item">
            <div class="user-info">
              <span class="user-name">이지원</span>
              <span class="user-rank">대리</span>
            </div>
          </div>
          <div class="user-item">
            <div class="user-info">
              <span class="user-name">박영희</span>
              <span class="user-rank">과장</span>
            </div>
          </div>
          <div class="user-item">
            <div class="user-info">
              <span class="user-name">최준호</span>
              <span class="user-rank">사원</span>
            </div>
          </div>
          <div class="user-item">
            <div class="user-info">
              <span class="user-name">정미영</span>
              <span class="user-rank">대리</span>
            </div>
          </div>
          <div class="user-item">
            <div class="user-info">
              <span class="user-name">윤성민</span>
              <span class="user-rank">과장</span>
            </div>
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
  .department-user-selector {
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
  }

  .column {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    border: 1px solid #e0e0e0;
    min-height: 400px;
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
    font-size: 14px;

    .dept-name {
      font-weight: 500;
    }

    &:hover {
      background-color: #f0f0f0;
    }

    &.hasChild {
      font-weight: 500;
    }

    &.expanded {
      background-color: rgba(#00aaff, 0.1);
    }
  }

  .dept-toggle-icon {
    margin-right: 8px;
    color: #666;
  }

  .sub-departments {
    margin-left: 24px;
    margin-top: 4px;

    .dept-item:not(.hasChild) {
      &::before {
        content: '- ';
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
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
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
    margin-left: 8px;
  }

  /* 이동 버튼 영역 스타일 */
  .transfer-buttons-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60px;
    border-left: 1px solid #e0e0e0;
    border-right: 1px solid #e0e0e0;
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
