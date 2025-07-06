<template>
  <div class="edit-table-demo">
    <h1>편집 가능한 테이블 - EditUiTable</h1>

    <!-- 기본 편집 테이블 -->
    <section class="demo-section">
      <h3>직원 관리 테이블</h3>
      <EditUiTable
        v-model="employeeData"
        :columns="employeeColumns"
        size="medium"
        bordered
        striped
        @save="handleSave"
        @cancel="handleCancel"
      />
    </section>

    <!-- 빈 테이블 -->
    <section class="demo-section">
      <h3>새 프로젝트 테이블 (빈 상태)</h3>
      <EditUiTable v-model="emptyData" :columns="projectColumns" size="medium" bordered striped />
    </section>

    <!-- 저장된 데이터 표시 -->
    <section class="demo-section" v-if="savedData.length > 0">
      <h3>저장된 데이터</h3>
      <div class="saved-data">
        <pre>{{ JSON.stringify(savedData, null, 2) }}</pre>
      </div>
    </section>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  /**
   * 직원 데이터
   */
  const employeeData = ref([
    {
      id: 1,
      name: '홍길동',
      email: 'hong@company.com',
      department: 'development',
      position: 'senior',
      salary: 5000000,
      joinDate: '2022-01-15'
    },
    {
      id: 2,
      name: '김철수',
      email: 'kim@company.com',
      department: 'design',
      position: 'junior',
      salary: 3500000,
      joinDate: '2023-03-10'
    },
    {
      id: 3,
      name: '이영희',
      email: 'lee@company.com',
      department: 'marketing',
      position: 'manager',
      salary: 6000000,
      joinDate: '2021-07-20'
    }
  ])

  /**
   * 직원 테이블 컬럼 정의 - 실제 데이터 구조에 맞게 수정
   */
  const employeeColumns = [
    {
      key: 'name',
      label: '이름',
      type: 'text',
      width: '120px',
      placeholder: '이름을 입력하세요',
      defaultValue: ''
    },
    {
      key: 'email',
      label: '이메일',
      type: 'email',
      width: '200px',
      placeholder: 'email@company.com',
      defaultValue: ''
    },
    {
      key: 'department',
      label: '부서',
      type: 'select',
      width: '120px',
      defaultValue: 'development',
      options: [
        { label: '개발팀', value: 'development' },
        { label: '디자인팀', value: 'design' },
        { label: '마케팅팀', value: 'marketing' },
        { label: '영업팀', value: 'sales' },
        { label: '인사팀', value: 'hr' }
      ]
    },
    {
      key: 'position',
      label: '직급',
      type: 'select',
      width: '100px',
      defaultValue: 'junior',
      options: [
        { label: '인턴', value: 'intern' },
        { label: '주니어', value: 'junior' },
        { label: '시니어', value: 'senior' },
        { label: '매니저', value: 'manager' },
        { label: '팀장', value: 'team_lead' }
      ]
    },
    {
      key: 'salary',
      label: '급여',
      type: 'number',
      width: '120px',
      placeholder: '0',
      defaultValue: 0
    },
    {
      key: 'joinDate',
      label: '입사일',
      type: 'date',
      width: '120px',
      defaultValue: ''
    }
  ]

  /**
   * 제품 데이터 - 새로 추가
   */
  const productData = ref([
    {
      id: 1,
      name: '노트북',
      price: 1500000,
      category: 'electronics',
      stock: 50,
      status: 'active'
    },
    {
      id: 2,
      name: '마우스',
      price: 25000,
      category: 'electronics',
      stock: 100,
      status: 'active'
    },
    {
      id: 3,
      name: '키보드',
      price: 80000,
      category: 'electronics',
      stock: 0,
      status: 'sold_out'
    }
  ])

  /**
   * 제품 테이블 컬럼 정의
   */
  const productColumns = [
    {
      key: 'name',
      label: '제품명',
      type: 'text',
      width: '150px',
      placeholder: '제품명을 입력하세요',
      defaultValue: ''
    },
    {
      key: 'price',
      label: '가격',
      type: 'number',
      width: '100px',
      placeholder: '0',
      defaultValue: 0
    },
    {
      key: 'category',
      label: '카테고리',
      type: 'select',
      width: '120px',
      defaultValue: 'electronics',
      options: [
        { label: '전자제품', value: 'electronics' },
        { label: '의류', value: 'clothing' },
        { label: '도서', value: 'books' },
        { label: '가구', value: 'furniture' },
        { label: '기타', value: 'others' }
      ]
    },
    {
      key: 'stock',
      label: '재고',
      type: 'number',
      width: '80px',
      placeholder: '0',
      defaultValue: 0
    },
    {
      key: 'status',
      label: '상태',
      type: 'select',
      width: '100px',
      defaultValue: 'active',
      options: [
        { label: '활성', value: 'active' },
        { label: '비활성', value: 'inactive' },
        { label: '품절', value: 'sold_out' }
      ]
    }
  ]

  /**
   * 빈 데이터
   */
  const emptyData = ref([])

  /**
   * 프로젝트 테이블 컬럼 정의
   */
  const projectColumns = [
    {
      key: 'name',
      label: '프로젝트명',
      type: 'text',
      width: '200px',
      placeholder: '프로젝트명을 입력하세요',
      defaultValue: ''
    },
    {
      key: 'manager',
      label: '담당자',
      type: 'text',
      width: '120px',
      placeholder: '담당자명',
      defaultValue: ''
    },
    {
      key: 'status',
      label: '진행상태',
      type: 'select',
      width: '120px',
      defaultValue: 'planning',
      options: [
        { label: '기획중', value: 'planning' },
        { label: '진행중', value: 'in_progress' },
        { label: '검토중', value: 'review' },
        { label: '완료', value: 'completed' },
        { label: '보류', value: 'on_hold' }
      ]
    },
    {
      key: 'startDate',
      label: '시작일',
      type: 'date',
      width: '120px',
      defaultValue: ''
    },
    {
      key: 'endDate',
      label: '종료일',
      type: 'date',
      width: '120px',
      defaultValue: ''
    },
    {
      key: 'budget',
      label: '예산',
      type: 'number',
      width: '120px',
      placeholder: '0',
      defaultValue: 0
    }
  ]

  /**
   * 저장된 데이터
   */
  const savedData = ref([])

  /**
   * 직원 데이터 저장 핸들러
   * @param {Array} data - 저장될 데이터
   */
  const handleSave = data => {
    console.log('직원 데이터 저장:', data)
    savedData.value = data

    // 직원 데이터 검증 예시
    const invalidEmployees = data.filter(emp => !emp.name || !emp.email || emp.salary <= 0)

    if (invalidEmployees.length > 0) {
      alert('이름, 이메일, 급여는 필수 입력 항목입니다.')
      return
    }

    // 실제 API 호출 시뮬레이션
    setTimeout(() => {
      alert('직원 데이터가 성공적으로 저장되었습니다!')
    }, 500)
  }

  /**
   * 직원 데이터 취소 핸들러
   */
  const handleCancel = () => {
    console.log('직원 데이터 편집 취소')
    alert('편집이 취소되었습니다.')
  }

  /**
   * 제품 데이터 저장 핸들러
   * @param {Array} data - 저장될 제품 데이터
   */
  const handleProductSave = data => {
    console.log('제품 데이터 저장:', data)

    // 제품 데이터 검증 예시
    const invalidProducts = data.filter(product => !product.name || product.price <= 0)

    if (invalidProducts.length > 0) {
      alert('제품명과 가격은 필수 입력 항목입니다.')
      return
    }

    setTimeout(() => {
      alert('제품 데이터가 성공적으로 저장되었습니다!')
    }, 500)
  }
</script>

<style lang="scss" scoped>
  // SCSS 변수 및 공통 스타일 import
  @import '@/assets/scss/variables.scss';
  @import '@/assets/scss/common.scss';
  @import '@/assets/scss/utilities.scss';

  // 데모 페이지 스타일
  .edit-table-demo {
    padding: 20px;
    max-width: 1400px;
    margin: 0 auto;

    // 메인 제목 스타일
    h1 {
      padding: 15px 0;
      color: #333;
      border-bottom: 2px solid #007bff;
      margin-bottom: 30px;
      font-size: 28px;

      &::before {
        content: '✏️ ';
        margin-right: 8px;
      }
    }

    // 섹션 구분 스타일
    .demo-section {
      margin-bottom: 50px;

      h3 {
        margin-bottom: 20px;
        color: #555;
        font-size: 20px;
        font-weight: 600;

        &::before {
          content: '📊 ';
          margin-right: 8px;
        }
      }
    }

    // 저장된 데이터 표시 스타일
    .saved-data {
      background-color: #f8f9fa;
      border: 1px solid #e9ecef;
      border-radius: 8px;
      padding: 16px;
      margin-top: 16px;

      pre {
        margin: 0;
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        font-size: 12px;
        color: #495057;
        white-space: pre-wrap;
        word-break: break-word;
      }
    }
  }

  // 반응형 처리
  @media (max-width: 768px) {
    .edit-table-demo {
      padding: 10px;

      h1 {
        font-size: 24px;
      }

      .demo-section h3 {
        font-size: 18px;
      }

      .saved-data {
        padding: 12px;

        pre {
          font-size: 10px;
        }
      }
    }
  }

  // 커스텀 스크롤바 (웹킷 브라우저용)
  .saved-data {
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: #c1c1c1;
      border-radius: 3px;

      &:hover {
        background: #a8a8a8;
      }
    }
  }
</style>
