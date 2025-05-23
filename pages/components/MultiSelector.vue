<template>
  <div class="components-page">
    <h1 class="page-title">UI MultiSelect 컴포넌트</h1>

    <!-- 기본 MultiSelect -->
    <section class="component-section">
      <h2 class="section-title">기본 MultiSelect</h2>
      <div class="select-grid">
        <div class="select-item">
          <UiMultiSelect
            placeholder="옵션을 선택하세요"
            :options="basicOptions"
            v-model="selectedBasic"
          />
          <p class="select-desc">기본 MultiSelect</p>
          <div class="code-example">
            <pre class="code-block">
&lt;UiMultiSelect
  placeholder="옵션을 선택하세요"
  :options="basicOptions"
  v-model="selectedValues"
/&gt;
            </pre>
          </div>
        </div>
        <div class="select-item">
          <UiMultiSelect
            placeholder="협업자를 선택하세요"
            :options="collaboratorOptions"
            v-model="selectedCollaborators"
          />
          <p class="select-desc">협업자 검색 (이름, 이메일, 부서 검색 가능)</p>
          <div class="code-example">
            <pre class="code-block">
&lt;UiMultiSelect
  placeholder="협업자를 선택하세요"
  :options="collaboratorOptions"
  v-model="selectedCollaborators"
/&gt;
            </pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 사이즈별 예시 -->
    <section class="component-section">
      <h2 class="section-title">MultiSelect 사이즈 (Sizes)</h2>
      <div class="select-grid">
        <div class="select-item">
          <UiMultiSelect
            size="small"
            placeholder="작은 사이즈"
            :options="basicOptions"
            v-model="selectedSmall"
          />
          <p class="select-desc">작은 사이즈 (Small)</p>
          <div class="code-example">
            <pre class="code-block">&lt;UiMultiSelect
  size="small"
  placeholder="작은 사이즈"
  :options="options"
  v-model="selectedValues"
/&gt;</pre>
          </div>
        </div>
        <div class="select-item">
          <UiMultiSelect
            size="medium"
            placeholder="중간 사이즈"
            :options="basicOptions"
            v-model="selectedMedium"
          />
          <p class="select-desc">중간 사이즈 (Medium) - 기본</p>
          <div class="code-example">
            <pre class="code-block">&lt;UiMultiSelect
  size="medium"
  placeholder="중간 사이즈"
  :options="options"
  v-model="selectedValues"
/&gt;</pre>
          </div>
        </div>
        <div class="select-item">
          <UiMultiSelect
            size="large"
            placeholder="큰 사이즈"
            :options="basicOptions"
            v-model="selectedLarge"
          />
          <p class="select-desc">큰 사이즈 (Large)</p>
          <div class="code-example">
            <pre class="code-block">&lt;UiMultiSelect
  size="large"
  placeholder="큰 사이즈"
  :options="options"
  v-model="selectedValues"
/&gt;</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 상태별 예시 -->
    <section class="component-section">
      <h2 class="section-title">MultiSelect 상태 (States)</h2>
      <div class="select-grid">
        <div class="select-item">
          <UiMultiSelect
            placeholder="기본 상태"
            :options="basicOptions"
            v-model="selectedDefault"
          />
          <p class="select-desc">기본 상태 (Default)</p>
          <div class="code-example">
            <pre class="code-block">&lt;UiMultiSelect
  placeholder="기본 상태"
  :options="options"
  v-model="selectedValues"
/&gt;</pre>
          </div>
        </div>
        <div class="select-item">
          <UiMultiSelect
            placeholder="선택 완료"
            :options="basicOptions"
            v-model="selectedComplete"
          />
          <p class="select-desc">선택 완료 상태</p>
          <div class="code-example">
            <pre class="code-block">&lt;UiMultiSelect
  placeholder="선택 완료"
  :options="options"
  v-model="selectedValues"
/&gt;</pre>
          </div>
        </div>
        <div class="select-item">
          <UiMultiSelect
            placeholder="에러 상태"
            :options="basicOptions"
            :error="true"
            v-model="selectedError"
          />
          <p class="select-desc">에러 상태 (Error)</p>
          <div class="code-example">
            <pre class="code-block">&lt;UiMultiSelect
  placeholder="에러 상태"
  :options="options"
  :error="true"
  v-model="selectedValues"
/&gt;</pre>
          </div>
        </div>
        <div class="select-item">
          <UiMultiSelect
            placeholder="비활성화 상태"
            :options="basicOptions"
            :disabled="true"
            v-model="selectedDisabled"
          />
          <p class="select-desc">비활성화 상태 (Disabled)</p>
          <div class="code-example">
            <pre class="code-block">&lt;UiMultiSelect
  placeholder="비활성화 상태"
  :options="options"
  :disabled="true"
  v-model="selectedValues"
/&gt;</pre>
          </div>
        </div>
        <div class="select-item">
          <UiMultiSelect
            placeholder="읽기 전용"
            :options="basicOptions"
            :view-only="true"
            v-model="selectedViewOnly"
          />
          <p class="select-desc">읽기 전용 상태 (View Only)</p>
          <div class="code-example">
            <pre class="code-block">&lt;UiMultiSelect
  placeholder="읽기 전용"
  :options="options"
  :view-only="true"
  v-model="selectedValues"
/&gt;</pre>
          </div>
        </div>
        <div class="select-item">
          <UiMultiSelect
            placeholder="로딩 상태"
            :options="basicOptions"
            :loading="true"
            v-model="selectedLoading"
          />
          <p class="select-desc">로딩 상태 (Loading)</p>
          <div class="code-example">
            <pre class="code-block">&lt;UiMultiSelect
  placeholder="로딩 상태"
  :options="options"
  :loading="true"
  v-model="selectedValues"
/&gt;</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 실제 사용 예시 -->
    <section class="component-section">
      <h2 class="section-title">실제 사용 예시</h2>
      <div class="select-grid">
        <div class="select-item">
          <UiMultiSelect
            size="large"
            placeholder="협업자 이름을 입력해주세요"
            :options="realCollaborators"
            v-model="selectedRealCollaborators"
            @search="handleCollaboratorSearch"
          />
          <p class="select-desc">실제 협업자 검색 예시</p>
          <div class="code-example">
            <pre class="code-block">&lt;UiMultiSelect
  size="large"
  placeholder="협업자 이름을 입력해주세요"
  :options="collaboratorOptions"
  v-model="selectedCollaborators"
  @search="handleSearch"
/&gt;</pre>
          </div>
        </div>
        <div class="select-item">
          <UiMultiSelect
            placeholder="부서를 선택하세요"
            :options="departmentOptions"
            v-model="selectedDepartments"
          />
          <p class="select-desc">부서 선택 예시</p>
          <div class="code-example">
            <pre class="code-block">&lt;UiMultiSelect
  placeholder="부서를 선택하세요"
  :options="departmentOptions"
  v-model="selectedDepartments"
/&gt;</pre>
          </div>
        </div>
        <div class="select-item">
          <UiMultiSelect
            placeholder="기술 스택을 선택하세요"
            :options="techStackOptions"
            v-model="selectedTechStack"
          />
          <p class="select-desc">기술 스택 선택 예시</p>
          <div class="code-example">
            <pre class="code-block">&lt;UiMultiSelect
  placeholder="기술 스택을 선택하세요"
  :options="techStackOptions"
  v-model="selectedTechStack"
/&gt;</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 너비 옵션 예시 -->
    <section class="component-section">
      <h2 class="section-title">MultiSelect 너비 (Width)</h2>
      <div class="select-grid">
        <div class="select-item">
          <UiMultiSelect
            placeholder="기본 너비"
            :options="basicOptions"
            v-model="selectedWidth1"
          />
          <p class="select-desc">기본 너비 (100%)</p>
          <div class="code-example">
            <pre class="code-block">&lt;UiMultiSelect
  placeholder="기본 너비"
  :options="options"
  v-model="selectedValues"
/&gt;</pre>
          </div>
        </div>
        <div class="select-item">
          <UiMultiSelect
            placeholder="너비 지정"
            :options="basicOptions"
            v-model="selectedWidth2"
            width="250px"
          />
          <p class="select-desc">너비 지정 (250px)</p>
          <div class="code-example">
            <pre class="code-block">&lt;UiMultiSelect
  placeholder="너비 지정"
  :options="options"
  v-model="selectedValues"
  width="250px"
/&gt;</pre>
          </div>
        </div>
        <div class="select-item">
          <UiMultiSelect
            placeholder="퍼센트 너비"
            :options="basicOptions"
            v-model="selectedWidth3"
            width="50%"
          />
          <p class="select-desc">퍼센트 너비 (50%)</p>
          <div class="code-example">
            <pre class="code-block">&lt;UiMultiSelect
  placeholder="퍼센트 너비"
  :options="options"
  v-model="selectedValues"
  width="50%"
/&gt;</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 이벤트 처리 예시 -->
    <section class="component-section">
      <h2 class="section-title">이벤트 처리 (Event Handling)</h2>
      <div class="select-grid">
        <div class="select-item">
          <UiMultiSelect
            placeholder="검색 이벤트 테스트"
            :options="searchOptions"
            v-model="selectedSearch"
            @search="handleSearch"
            @focus="handleFocus"
            @blur="handleBlur"
          />
          <p class="select-desc">검색, 포커스, 블러 이벤트</p>
          <div class="event-log">
            <strong>이벤트 로그:</strong>
            <ul>
              <li v-for="log in eventLogs" :key="log">{{ log }}</li>
            </ul>
          </div>
          <div class="code-example">
            <pre class="code-block">&lt;UiMultiSelect
  placeholder="검색 이벤트 테스트"
  :options="searchOptions"
  v-model="selectedSearch"
  @search="handleSearch"
  @focus="handleFocus"
  @blur="handleBlur"
/&gt;</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Props 설명 -->
    <section class="component-section">
      <h2 class="section-title">Props 설명</h2>
      <div class="props-table">
        <table>
          <thead>
            <tr>
              <th>Props</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>options</code></td>
              <td>Array</td>
              <td>[]</td>
              <td>선택 가능한 옵션 배열 ({ value, label, email?, department? })</td>
            </tr>
            <tr>
              <td><code>modelValue</code></td>
              <td>Array</td>
              <td>[]</td>
              <td>선택된 값들의 배열 (v-model)</td>
            </tr>
            <tr>
              <td><code>placeholder</code></td>
              <td>String</td>
              <td>'협업자 이름을 입력해주세요'</td>
              <td>플레이스홀더 텍스트</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>String</td>
              <td>'medium'</td>
              <td>컴포넌트 크기 ('small', 'medium', 'large')</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>비활성화 상태</td>
            </tr>
            <tr>
              <td><code>viewOnly</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>읽기 전용 상태</td>
            </tr>
            <tr>
              <td><code>error</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>에러 상태</td>
            </tr>
            <tr>
              <td><code>loading</code></td>
              <td>Boolean</td>
              <td>false</td>
              <td>로딩 상태 (스피너 표시)</td>
            </tr>
            <tr>
              <td><code>width</code></td>
              <td>String|Number</td>
              <td>'100%'</td>
              <td>컴포넌트 너비</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Events 설명 -->
    <section class="component-section">
      <h2 class="section-title">Events 설명</h2>
      <div class="props-table">
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Parameters</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>@update:modelValue</code></td>
              <td>Array</td>
              <td>선택된 값이 변경될 때 발생</td>
            </tr>
            <tr>
              <td><code>@search</code></td>
              <td>String</td>
              <td>검색어 입력 시 발생</td>
            </tr>
            <tr>
              <td><code>@focus</code></td>
              <td>-</td>
              <td>컴포넌트가 포커스를 받을 때 발생</td>
            </tr>
            <tr>
              <td><code>@blur</code></td>
              <td>-</td>
              <td>컴포넌트가 포커스를 잃을 때 발생</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 옵션 데이터 구조 -->
    <section class="component-section">
      <h2 class="section-title">옵션 데이터 구조</h2>
      <div class="code-example">
        <pre class="code-block">// 기본 옵션 구조
const options = [
  {
    value: 'unique_id',     // 필수: 고유한 값
    label: '표시될 텍스트',    // 필수: 화면에 보여질 텍스트
    email: 'email@domain.com',    // 선택: 이메일 (검색 가능)
    department: '부서명'     // 선택: 부서 (검색 가능)
  }
]

// 협업자 옵션 예시
const collaboratorOptions = [
  {
    value: 'user001',
    label: '김철수',
    email: 'kim@company.com',
    department: '개발팀'
  },
  {
    value: 'user002',
    label: '이영희',
    email: 'lee@company.com',
    department: '디자인팀'
  }
]</pre>
      </div>
    </section>

    <!-- 사용 팁 -->
    <section class="component-section">
      <h2 class="section-title">사용 팁 (Usage Tips)</h2>
      <div class="tips-list">
        <div class="tip-item">
          <h3>🔍 검색 기능</h3>
          <p>이름, 이메일, 부서명으로 실시간 필터링이 가능합니다.</p>
        </div>
        <div class="tip-item">
          <h3>⌨️ 키보드 지원</h3>
          <p>화살표 키로 옵션 탐색, Enter로 선택, Escape로 닫기, Backspace로 마지막 태그 삭제가 가능합니다.</p>
        </div>
        <div class="tip-item">
          <h3>🏷️ 태그 형태</h3>
          <p>선택된 항목들이 태그 형태로 표시되며, 각 태그의 X 버튼으로 개별 삭제가 가능합니다.</p>
        </div>
        <div class="tip-item">
          <h3>📱 반응형</h3>
          <p>모바일 환경에 최적화되어 터치 인터페이스를 지원합니다.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 기본 옵션 데이터
const basicOptions = ref([
  { label: '마케팅팀', value: 'marketing' },
  { label: '개발팀', value: 'development' },
  { label: '디자인팀', value: 'design' },
  { label: '기획팀', value: 'planning' },
  { label: '영업팀', value: 'sales' }
])

// 협업자 옵션 데이터
const collaboratorOptions = ref([
  { label: '김철수', value: 'kim', email: 'kim@company.com', department: '개발팀' },
  { label: '이영희', value: 'lee', email: 'lee@company.com', department: '디자인팀' },
  { label: '박민수', value: 'park', email: 'park@company.com', department: '기획팀' },
  { label: '정수연', value: 'jung', email: 'jung@company.com', department: '마케팅팀' }
])

// 실제 협업자 데이터
const realCollaborators = ref([
  { label: 'ADMIN', value: 'isp_admin', email: 'admin@ezpark.com', department: '이즈파크' },
  { label: '김경수', value: 'isp130', email: 'kim.ks@ezpark.com', department: '이즈파크' },
  { label: '마진석', value: 'isp128', email: 'ma.js@ezpark.com', department: '이즈파크' },
  { label: '오현정', value: 'isp147', email: 'oh.hj@ezpark.com', department: '이즈파크' },
  { label: '송기준', value: 'kjsong3', email: 'song.kj@ezpark.com', department: '이즈파크' },
  { label: '고대훈', value: 'dhg', email: 'ko.dh@ezpark.com', department: 'OEM 생산부' },
  { label: '김도현', value: 'isp135', email: 'kim.dh2@ezpark.com', department: '공공클라우드 영업팀' },
  { label: '이강표', value: 'isp126', email: 'lee.kp@ezpark.com', department: 'ESM 고객관리팀' }
])

// 부서 옵션 데이터
const departmentOptions = ref([
  { label: '이즈파크', value: 'D000001', department: '회사' },
  { label: 'ESM 고객관리팀', value: 'D000004', department: '팀' },
  { label: '경영지원팀', value: 'D000002', department: '팀' },
  { label: 'OEM 생산부', value: 'D000017', department: '부서' },
  { label: '공공클라우드 영업팀', value: 'D000015', department: '팀' }
])

// 기술 스택 옵션 데이터
const techStackOptions = ref([
  { label: 'Vue.js', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
  { label: 'Node.js', value: 'nodejs' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'JavaScript', value: 'javascript' }
])

// 검색 옵션 (이벤트 테스트용)
const searchOptions = ref([
  { label: '검색 테스트 1', value: 'search1' },
  { label: '검색 테스트 2', value: 'search2' },
  { label: '검색 테스트 3', value: 'search3' }
])

// 선택된 값들
const selectedBasic = ref([])
const selectedCollaborators = ref([])
const selectedSmall = ref([])
const selectedMedium = ref([])
const selectedLarge = ref([])
const selectedDefault = ref([])
const selectedComplete = ref(['marketing', 'development'])
const selectedError = ref([])
const selectedDisabled = ref(['design'])
const selectedViewOnly = ref(['planning', 'sales'])
const selectedLoading = ref([])
const selectedRealCollaborators = ref([])
const selectedDepartments = ref([])
const selectedTechStack = ref([])
const selectedWidth1 = ref([])
const selectedWidth2 = ref([])
const selectedWidth3 = ref([])
const selectedSearch = ref([])

// 이벤트 로그
const eventLogs = ref([])

// 이벤트 핸들러
const handleCollaboratorSearch = (query) => {
  console.log('협업자 검색:', query)
}

const handleSearch = (query) => {
  eventLogs.value.unshift(`검색: "${query}"`)
  if (eventLogs.value.length > 5) eventLogs.value.pop()
}

const handleFocus = () => {
  eventLogs.value.unshift('포커스됨')
  if (eventLogs.value.length > 5) eventLogs.value.pop()
}

const handleBlur = () => {
  eventLogs.value.unshift('포커스 해제됨')
  if (eventLogs.value.length > 5) eventLogs.value.pop()
}
</script>

<style lang="scss" scoped>
.components-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
  color: var(--color-gray-80, #2c3137);
}

.component-section {
  margin-bottom: 40px;
  border: 1px solid var(--color-gray-20, #cdd1d5);
  border-radius: 8px;
  padding: 20px;
  background-color: var(--color-gray-0, #fff);
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--color-gray-70, #464c53);
  padding-bottom: 10px;
  border-bottom: 1px solid var(--color-gray-20, #cdd1d5);
}

.select-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.select-item {
  padding: 15px;
  border: 1px solid var(--color-gray-20, #cdd1d5);
  border-radius: 6px;
  background-color: var(--color-gray-5, #f5f6f7);
}

.select-desc {
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 14px;
  color: var(--color-gray-60, #58616a);
}

.code-example {
  background-color: var(--color-gray-10, #e6e8ea);
  border-radius: 4px;
  overflow: hidden;
}

.code-block {
  padding: 12px;
  font-size: 12px;
  color: var(--color-gray-70, #464c53);
  white-space: pre-wrap;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  margin: 0;
}

.event-log {
  margin: 10px 0;
  padding: 10px;
  background-color: var(--color-gray-0, #fff);
  border-radius: 4px;
  font-size: 12px;

  ul {
    margin: 5px 0 0 0;
    padding-left: 20px;
  }

  li {
    margin: 2px 0;
    color: var(--color-gray-60, #58616a);
  }
}

.props-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;

    th, td {
      padding: 12px;
      text-align: left;
      border: 1px solid var(--color-gray-20, #cdd1d5);
    }

    th {
      background-color: var(--color-gray-10, #e6e8ea);
      font-weight: 600;
    }

    code {
      background-color: var(--color-gray-10, #e6e8ea);
      padding: 2px 4px;
      border-radius: 3px;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 11px;
    }
  }
}

.tips-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.tip-item {
  padding: 15px;
  background-color: var(--color-gray-5, #f5f6f7);
  border-radius: 6px;
  border-left: 4px solid var(--color-system-b30, #0084ff);

  h3 {
    margin: 0 0 8px 0;
    font-size: 16px;
    color: var(--color-gray-70, #464c53);
  }

  p {
    margin: 0;
    font-size: 14px;
    color: var(--color-gray-60, #58616a);
    line-height: 1.5;
  }
}

@media (max-width: 768px) {
  .select-grid {
    grid-template-columns: 1fr;
  }

  .tips-list {
    grid-template-columns: 1fr;
  }
}
</style>
