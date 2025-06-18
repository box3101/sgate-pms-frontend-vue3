<template>
  <div class="org-team-selector">
    <!-- 조직 트리 구조 -->
    <div class="organization-tree-container">
      <div class="tree-header">
        <h3 class="tree-title">조직 선택</h3>
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
            :class="{
              expanded: isExpanded('org1'),
              selected: selectedOrgId === 'org1'
            }"
            @click="toggleOrg('org1')"
          >
            <i
              class="icon icon-sm org-toggle-icon"
              :class="isExpanded('org1') ? 'icon-chevron-down' : 'icon-chevron-right'"
            ></i>
            <span class="org-name">(주)이즈파크</span>
          </div>

          <!-- 2DEPTH: 하위 조직 -->
          <div class="sub-organizations" v-if="isExpanded('org1')">
            <div class="org-item-wrapper">
              <div
                class="org-item"
                :class="{ selected: selectedOrgId === 'org1-1' }"
                @click="selectOrganization('org1-1')"
              >
                <span class="org-name">ESM 고객관리팀</span>
              </div>
            </div>

            <div class="org-item-wrapper">
              <div
                class="org-item hasChild"
                :class="{
                  expanded: isExpanded('org1-2'),
                  selected: selectedOrgId === 'org1-2'
                }"
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
                    :class="{
                      expanded: isExpanded('org1-2-1'),
                      selected: selectedOrgId === 'org1-2-1'
                    }"
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
                    :class="{
                      expanded: isExpanded('org1-2-2'),
                      selected: selectedOrgId === 'org1-2-2'
                    }"
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
                :class="{
                  expanded: isExpanded('org1-3'),
                  selected: selectedOrgId === 'org1-3'
                }"
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

            <div class="org-item-wrapper">
              <div
                class="org-item"
                :class="{ selected: selectedOrgId === 'org1-4' }"
                @click="selectOrganization('org1-4')"
              >
                <span class="org-name">OEM 설치부</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 선택된 조직 정보 표시 -->
    <div class="selected-org-info" v-if="selectedOrganization">
      <div class="info-header">
        <h4>선택된 조직</h4>
      </div>
      <div class="info-content">
        <span class="org-name">{{ selectedOrganization.name }}</span>
        <span class="org-path">{{ selectedOrganization.path }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OrgTeamSelector',

    props: {
      /**
       * 초기 선택된 조직 ID
       */
      initialOrgId: {
        type: [Number, String],
        default: null
      }
    },

    emits: ['org-selected', 'update:org'],

    data() {
      return {
        // 펼쳐진 조직 ID 목록
        expandedOrgs: [],

        // 선택된 조직 ID
        selectedOrgId: '',

        // 조직 데이터 구조
        organizationData: {
          org1: { name: '(주)아스파크', path: '(주)아스파크' },
          'org1-1': { name: 'ESM 고객관리팀', path: '(주)아스파크 > ESM 고객관리팀' },
          'org1-2': { name: '개발본부', path: '(주)아스파크 > 개발본부' },
          'org1-2-1': { name: '프론트엔드팀', path: '(주)아스파크 > 개발본부 > 프론트엔드팀' },
          'org1-2-1-1': {
            name: 'UI개발파트',
            path: '(주)아스파크 > 개발본부 > 프론트엔드팀 > UI개발파트'
          },
          'org1-2-1-2': {
            name: 'React파트',
            path: '(주)아스파크 > 개발본부 > 프론트엔드팀 > React파트'
          },
          'org1-2-2': { name: '백엔드팀', path: '(주)아스파크 > 개발본부 > 백엔드팀' },
          'org1-2-2-1': { name: 'API파트', path: '(주)아스파크 > 개발본부 > 백엔드팀 > API파트' },
          'org1-2-2-2': {
            name: '데이터베이스파트',
            path: '(주)아스파크 > 개발본부 > 백엔드팀 > 데이터베이스파트'
          },
          'org1-3': { name: '경영지원본부', path: '(주)아스파크 > 경영지원본부' },
          'org1-3-1': { name: '인사팀', path: '(주)아스파크 > 경영지원본부 > 인사팀' },
          'org1-3-2': { name: '총무팀', path: '(주)아스파크 > 경영지원본부 > 총무팀' },
          'org1-4': { name: 'OEM 설치부', path: '(주)아스파크 > OEM 설치부' }
        }
      }
    },

    computed: {
      /**
       * 선택된 조직 정보 반환
       * @returns {Object|null} 선택된 조직 객체
       */
      selectedOrganization() {
        if (!this.selectedOrgId) return null
        return {
          id: this.selectedOrgId,
          ...this.organizationData[this.selectedOrgId]
        }
      }
    },

    created() {
      // 초기 선택 값이 있으면 설정
      this.initializeSelection()
    },

    methods: {
      /**
       * 초기 선택 값 설정
       */
      initializeSelection() {
        if (this.initialOrgId && this.organizationData[this.initialOrgId]) {
          this.selectedOrgId = this.initialOrgId
        }
      },

      /**
       * 조직 ID가 확장된 상태인지 확인
       * @param {String} orgId - 조직 ID
       * @returns {Boolean} 확장 여부
       */
      isExpanded(orgId) {
        return this.expandedOrgs.includes(orgId)
      },

      /**
       * 조직 토글 (펼치기/접기)
       * @param {String} orgId - 조직 ID
       */
      toggleOrg(orgId) {
        const index = this.expandedOrgs.indexOf(orgId)
        if (index === -1) {
          this.expandedOrgs.push(orgId)
        } else {
          this.expandedOrgs.splice(index, 1)
        }

        // 조직 선택도 함께 처리
        this.selectOrganization(orgId)
      },

      /**
       * 조직 선택 처리
       * @param {String} orgId - 선택된 조직 ID
       */
      selectOrganization(orgId) {
        this.selectedOrgId = orgId

        const selectedOrg = this.selectedOrganization

        // 이벤트 발생
        this.$emit('org-selected', selectedOrg)
        this.$emit('update:org', selectedOrg)
      },

      /**
       * 모든 조직 펼치기
       */
      expandAllOrgs() {
        this.expandedOrgs = ['org1', 'org1-2', 'org1-2-1', 'org1-2-2', 'org1-3']
      },

      /**
       * 모든 조직 접기
       */
      collapseAllOrgs() {
        this.expandedOrgs = []
      }
    }
  }
</script>

<style lang="scss" scoped>
  // 조직 선택 트리 컴포넌트 스타일
  .org-team-selector {
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    overflow: hidden;

    // 조직 트리 컨테이너
    .organization-tree-container {
      display: flex;
      flex-direction: column;
      height: 400px;

      // 트리 헤더
      .tree-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        border-bottom: 1px solid #e0e0e0;
        background-color: #f5f5f5;

        .tree-title {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }

        // 트리 액션 버튼들
        .tree-actions {
          display: flex;
          gap: 8px;

          .tree-action-btn {
            display: flex;
            align-items: center;
            padding: 6px 8px;
            font-size: 12px;
            background-color: transparent;
            border: none;
            cursor: pointer;
            color: #666;
            border-radius: 4px;

            &:hover {
              color: #333;
              background-color: #e9ecef;
            }

            .icon {
              margin-right: 4px;
            }
          }
        }
      }

      // 조직 트리
      .organization-tree {
        flex: 1;
        overflow-y: auto;
        padding: 8px;

        // 조직 아이템 래퍼
        .org-item-wrapper {
          margin-bottom: 4px;

          // 조직 아이템
          .org-item {
            display: flex;
            align-items: center;
            padding: 8px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s ease;

            .org-name {
              font-weight: 500;
            }

            &:hover {
              background-color: #f0f0f0;
            }

            // 하위 조직이 있는 경우
            &.hasChild {
              font-weight: 500;

              // 토글 아이콘
              .org-toggle-icon {
                margin-right: 8px;
                color: #666;
                transition: transform 0.2s ease;
              }
            }

            // 확장된 상태
            &.expanded {
              background-color: rgba(#00aaff, 0.1);
              color: #0066cc;
            }

            // 선택된 상태
            &.selected {
              background-color: rgba(#ff6b35, 0.15);
              border: 1px solid #ff6b35;
              color: #d63031;
              font-weight: 600;
            }
          }

          // 하위 조직들
          .sub-organizations {
            margin-left: 24px;
            margin-top: 4px;

            // 말단 조직 표시
            .org-item:not(.hasChild) {
              position: relative;

              &::before {
                content: '└';
                position: absolute;
                left: -16px;
                color: #999;
                font-size: 12px;
              }
            }
          }
        }
      }
    }

    // 선택된 조직 정보
    .selected-org-info {
      border-top: 1px solid #e0e0e0;
      background-color: #f8f9fa;

      .info-header {
        padding: 8px 16px;
        border-bottom: 1px solid #e0e0e0;

        h4 {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
          color: #495057;
        }
      }

      .info-content {
        padding: 12px 16px;
        display: flex;
        flex-direction: column;
        gap: 4px;

        .org-name {
          font-size: 16px;
          font-weight: 600;
          color: #212529;
        }

        .org-path {
          font-size: 12px;
          color: #6c757d;
        }
      }
    }
  }
</style>
