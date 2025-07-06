<template>
  <div class="table-demo">
    <h1>기본 - UiTable 컴포넌트 데모</h1>

    <!-- 기본 스타일 -->
    <section class="demo-section">
      <h3>기본 스타일</h3>
      <UiTable v-model="tableData">
        <template #header>
          <tr>
            <th>번호</th>
            <th>이름</th>
            <th>이메일</th>
          </tr>
        </template>

        <template #body="{ rows }">
          <tr v-for="(row, index) in rows" :key="row.id">
            <td>{{ index + 1 }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.email }}</td>
          </tr>
        </template>
      </UiTable>
    </section>

    <!-- 작은 크기 + 테두리 -->
    <section class="demo-section">
      <h3>작은 크기 + 테두리</h3>
      <UiTable v-model="tableData" size="small" bordered>
        <template #header>
          <tr>
            <th>번호</th>
            <th>이름</th>
            <th>이메일</th>
          </tr>
        </template>

        <template #body="{ rows }">
          <tr v-for="(row, index) in rows" :key="row.id">
            <td>{{ index + 1 }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.email }}</td>
          </tr>
        </template>
      </UiTable>
    </section>

    <!-- 큰 크기 + 줄무늬 + 호버 -->
    <section class="demo-section">
      <h3>큰 크기 + 줄무늬 + 호버</h3>
      <UiTable v-model="tableData" size="large" striped hover>
        <template #header>
          <tr>
            <th>번호</th>
            <th>이름</th>
            <th>이메일</th>
          </tr>
        </template>

        <template #body="{ rows }">
          <tr v-for="(row, index) in rows" :key="row.id">
            <td>{{ index + 1 }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.email }}</td>
          </tr>
        </template>
      </UiTable>
    </section>

    <!-- 전체 옵션 적용 -->
    <section class="demo-section">
      <h3>전체 옵션 적용 (테두리 + 줄무늬 + 호버)</h3>
      <UiTable v-model="extendedTableData" size="medium" bordered striped hover :column-count="5">
        <template #colgroup>
          <col style="width: 60px" />
          <col style="width: auto" />
          <col style="width: 200px" />
          <col style="width: 120px" />
          <col style="width: 100px" />
        </template>

        <template #header>
          <tr>
            <th>번호</th>
            <th>이름</th>
            <th>이메일</th>
            <th>부서</th>
            <th>직급</th>
          </tr>
        </template>

        <template #body="{ rows }">
          <tr v-for="(row, index) in rows" :key="row.id">
            <td class="text-center">{{ index + 1 }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.email }}</td>
            <td>{{ row.department }}</td>
            <td>{{ row.rank }}</td>
          </tr>
        </template>

        <template #footer>
          <tr>
            <td colspan="5" class="text-center">
              총 <strong>{{ extendedTableData.length }}</strong
              >명
            </td>
          </tr>
        </template>
      </UiTable>
    </section>

    <!-- 빈 테이블 -->
    <section class="demo-section">
      <h3>빈 테이블 상태</h3>
      <UiTable v-model="emptyTableData" empty-message="검색 결과가 없습니다." :column-count="5">
        <template #header>
          <tr>
            <th>번호</th>
            <th>이름</th>
            <th>이메일</th>
            <th>부서</th>
            <th>직급</th>
          </tr>
        </template>

        <template #body="{ rows }">
          <tr v-for="(row, index) in rows" :key="row.id">
            <td>{{ index + 1 }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.email }}</td>
            <td>{{ row.department }}</td>
            <td>{{ row.rank }}</td>
          </tr>
        </template>
      </UiTable>
    </section>

    <!-- 로딩 상태 -->
    <section class="demo-section">
      <h3>로딩 상태</h3>
      <div class="loading-controls">
        <button @click="toggleLoading" class="btn">
          {{ isLoading ? '로딩 중지' : '로딩 시작' }}
        </button>
      </div>
      <UiTable v-model="tableData" :loading="isLoading" :column-count="3">
        <template #header>
          <tr>
            <th>번호</th>
            <th>이름</th>
            <th>이메일</th>
          </tr>
        </template>

        <template #body="{ rows }">
          <tr v-for="(row, index) in rows" :key="row.id">
            <td>{{ index + 1 }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.email }}</td>
          </tr>
        </template>
      </UiTable>
    </section>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  /**
   * 기본 테이블 데이터
   */
  const tableData = ref([
    { id: 1, name: '홍길동', email: 'hong@example.com' },
    { id: 2, name: '김철수', email: 'kim@example.com' },
    { id: 3, name: '이영희', email: 'lee@example.com' },
    { id: 4, name: '최민수', email: 'choi@example.com' }
  ])

  /**
   * 확장된 테이블 데이터 (부서, 직급 포함)
   */
  const extendedTableData = ref([
    {
      id: 1,
      name: '홍길동',
      email: 'hong@example.com',
      department: '개발팀',
      rank: '시니어'
    },
    {
      id: 2,
      name: '김철수',
      email: 'kim@example.com',
      department: '디자인팀',
      rank: '주니어'
    },
    {
      id: 3,
      name: '이영희',
      email: 'lee@example.com',
      department: '기획팀',
      rank: '매니저'
    },
    {
      id: 4,
      name: '최민수',
      email: 'choi@example.com',
      department: '마케팅팀',
      rank: '시니어'
    }
  ])

  /**
   * 빈 테이블 데이터
   */
  const emptyTableData = ref([])

  /**
   * 로딩 상태 관리
   */
  const isLoading = ref(false)

  /**
   * 로딩 상태 토글 함수
   */
  const toggleLoading = () => {
    isLoading.value = !isLoading.value
  }
</script>

<style lang="scss" scoped>
  // 데모 페이지 스타일
  .table-demo {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;

    h1 {
      padding: 15px 0;
      color: #333;
      border-bottom: 2px solid #007bff;
      margin-bottom: 30px;
    }

    // 섹션 구분
    .demo-section {
      margin-bottom: 40px;

      h3 {
        margin-bottom: 15px;
        color: #555;
        font-size: 18px;

        &::before {
          content: '📋 ';
          margin-right: 8px;
        }
      }
    }

    // 로딩 컨트롤 버튼
    .loading-controls {
      margin-bottom: 15px;

      .btn {
        padding: 8px 16px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.2s ease;

        &:hover {
          background-color: #0056b3;
        }

        &:active {
          transform: translateY(1px);
        }
      }
    }

    // 테이블 공통 스타일 보완
    :deep(.ui-table) {
      margin-bottom: 20px;

      .text-center {
        text-align: center;
      }

      strong {
        color: #007bff;
        font-weight: 600;
      }
    }
  }

  // 반응형 처리
  @media (max-width: 768px) {
    .table-demo {
      padding: 10px;

      h1 {
        font-size: 24px;
      }

      .demo-section h3 {
        font-size: 16px;
      }
    }
  }
</style>
