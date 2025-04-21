<template>
  <div class="organization-user-selector">
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
                <div class="org-item">
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
                        <div class="org-item">
                          <span class="org-name">UI개발파트</span>
                        </div>
                      </div>
                      <div class="org-item-wrapper">
                        <div class="org-item">
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
                        <div class="org-item">
                          <span class="org-name">API파트</span>
                        </div>
                      </div>
                      <div class="org-item-wrapper">
                        <div class="org-item">
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
                    <div class="org-item">
                      <span class="org-name">인사팀</span>
                    </div>
                  </div>
                  <div class="org-item-wrapper">
                    <div class="org-item">
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
          <div class="user-item">
            <div class="user-info">
              <span class="user-name">이찬용</span>
              <span class="user-rank">[전무]</span>
            </div>
          </div>
          <div class="user-item">
            <div class="user-info">
              <span class="user-name">이찬용2</span>
              <span class="user-rank">[차장]</span>
            </div>
          </div>
          <div class="user-item">
            <div class="user-info">
              <span class="user-name">이찬용3</span>
              <span class="user-rank">[과장]</span>
            </div>
          </div>
          <div class="user-item">
            <div class="user-info">
              <span class="user-name">이찬용4</span>
              <span class="user-rank">[사원]</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 이동 버튼 영역 -->
      <div class="transfer-buttons-column">
        <div class="transfer-buttons">
          <button class="transfer-btn transfer-right">
            <i class="icon icon-md icon-arrow-right"></i>
          </button>
          <button class="transfer-btn transfer-left">
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
          <div class="user-item">
            <div class="user-info">
              <span class="user-name">이찬용</span>
              <span class="user-rank">[차장장]</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  // 조직 트리 상태 관리
  const expandedOrgs = ref([])

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
      background-color: rgba(#00aaff, 0.1);
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
    font-size: $font-size-md;
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
