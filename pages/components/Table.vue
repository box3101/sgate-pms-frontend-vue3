<template>
  <div class="table-guide-container container-large">
    <h1 class="page-title">UiTable 컴포넌트 사용 가이드</h1>

    <section class="guide-section">
      <h2 class="section-title">기본 사용법</h2>
      <p class="section-description">
        UiTable 컴포넌트는 다양한 스타일과 레이아웃 옵션을 제공하는 테이블 컴포넌트입니다. 기본적인
        사용 방법은 다음과 같습니다.
      </p>

      <div class="example-container">
        <h3 class="example-title">기본 테이블</h3>
        <div class="example-preview">
          <UiTable>
            <template #header>
              <tr>
                <th>이름</th>
                <th>나이</th>
                <th>직업</th>
              </tr>
            </template>
            <template #body>
              <tr>
                <td>홍길동2</td>
                <td>30</td>
                <td>개발자</td>
              </tr>
              <tr>
                <td>김철수</td>
                <td>25</td>
                <td>디자이너</td>
              </tr>
              <tr>
                <td>이영희</td>
                <td>28</td>
                <td>기획자</td>
              </tr>
            </template>
          </UiTable>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiTable&gt;
  &lt;template #header&gt;
    &lt;tr&gt;
      &lt;th&gt;이름&lt;/th&gt;
      &lt;th&gt;나이&lt;/th&gt;
      &lt;th&gt;직업&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/template&gt;
  &lt;template #body&gt;
    &lt;tr&gt;
      &lt;td&gt;홍길동&lt;/td&gt;
      &lt;td&gt;30&lt;/td&gt;
      &lt;td&gt;개발자&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;김철수&lt;/td&gt;
      &lt;td&gt;25&lt;/td&gt;
      &lt;td&gt;디자이너&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;이영희&lt;/td&gt;
      &lt;td&gt;28&lt;/td&gt;
      &lt;td&gt;기획자&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/template&gt;
&lt;/UiTable&gt;</code></pre>
        </div>
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">테이블 편집 기능</h2>
      <p class="section-description">
        UiTable 컴포넌트는 행 추가, 삭제, 정렬 등의 편집 기능을 제공합니다. 이 기능들은 `editable`
        속성을 통해 활성화할 수 있습니다.
      </p>

      <div class="example-container">
        <h3 class="example-title">편집 가능한 테이블 (editable)</h3>
        <div class="example-preview">
          <UiTable
            v-model="editableTableData"
            editable
            hover
            :default-row-data="{ name: '', job: '', age: 0 }"
            @save="handleSave"
          >
            <template #header="{ selectAll, isAllSelected, sortable }">
              <tr>
                <th style="width: 40px">
                  <UiCheckbox
                    :modelValue="isAllSelected"
                    @update:modelValue="selectAll"
                    size="large"
                  />
                </th>
                <th>이름</th>
                <th>나이</th>
                <th>직업</th>
              </tr>
            </template>
            <template
              #body="{
                rows,
                toggleRowSelection,
                isRowSelected,
                handleDragStart,
                handleDragOver,
                handleDrop,
                handleDragEnd,
                sortable
              }"
            >
              <tr
                v-for="(item, index) in rows"
                :key="item.id"
                @click="!sortable && toggleRowSelection(item)"
                :class="{
                  selected: isRowSelected(item),
                  'sortable-row': sortable
                }"
                :draggable="sortable"
                @dragstart="e => handleDragStart(e, index)"
                @dragover="e => handleDragOver(e)"
                @drop="e => handleDrop(e, index)"
                @dragend="handleDragEnd"
              >
                <td>
                  <div v-if="!sortable" class="row-checkbox">
                    <UiCheckbox
                      :modelValue="isRowSelected(item)"
                      @update:modelValue="toggleRowSelection(item)"
                      size="large"
                      @click.stop
                    />
                  </div>
                  <div v-else class="drag-handle">
                    <i class="icon-md icon-drag"></i>
                  </div>
                </td>
                <td>
                  <UiInput v-model="item.name" size="large" :clearable="true" @click.stop />
                </td>
                <td>
                  <UiInput v-model="item.age" size="large" type="number" @click.stop />
                </td>
                <td>
                  <UiInput v-model="item.job" size="large" :clearable="true" @click.stop />
                </td>
              </tr>
            </template>
          </UiTable>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiTable
  v-model="tableData"
  editable
  bordered
  hover
  :default-row-data="{ name: '', job: '', age: 0 }"
  @save="handleSave"
&gt;
  &lt;template #header="{ selectAll, isAllSelected, sortable }"&gt;
    &lt;tr&gt;
      &lt;th style="width: 40px"&gt;
        &lt;UiCheckbox
          :modelValue="isAllSelected"
          @update:modelValue="selectAll"
          size="large"
        /&gt;
      &lt;/th&gt;
      &lt;th&gt;이름&lt;/th&gt;
      &lt;th&gt;나이&lt;/th&gt;
      &lt;th&gt;직업&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/template&gt;
  &lt;template
    #body="{
      rows,
      toggleRowSelection,
      isRowSelected,
      handleDragStart,
      handleDragOver,
      handleDrop,
      handleDragEnd,
      sortable
    }"
  &gt;
    &lt;tr
      v-for="(item, index) in rows"
      :key="item.id"
      @click="!sortable && toggleRowSelection(item)"
      :class="{
        selected: isRowSelected(item),
        'sortable-row': sortable
      }"
      :draggable="sortable"
      @dragstart="e => handleDragStart(e, index)"
      @dragover="e => handleDragOver(e)"
      @drop="e => handleDrop(e, index)"
      @dragend="handleDragEnd"
    &gt;
      &lt;td&gt;
        &lt;div v-if="!sortable" class="row-checkbox"&gt;
          &lt;UiCheckbox
            :modelValue="isRowSelected(item)"
            @update:modelValue="toggleRowSelection(item)"
            size="large"
            @click.stop
          /&gt;
        &lt;/div&gt;
        &lt;div v-else class="drag-handle"&gt;
          &lt;i class="icon-md icon-drag"&gt;&lt;/i&gt;
        &lt;/div&gt;
      &lt;/td&gt;
      &lt;td&gt;
        &lt;UiInput
          v-model="item.name"
          size="large"
          :clearable="true"
          @click.stop
        /&gt;
      &lt;/td&gt;
      &lt;td&gt;
        &lt;UiInput
          v-model="item.age"
          size="large"
          type="number"
          @click.stop
        /&gt;
      &lt;/td&gt;
      &lt;td&gt;
        &lt;UiInput
          v-model="item.job"
          size="large"
          :clearable="true"
          @click.stop
        /&gt;
      &lt;/td&gt;
    &lt;/tr&gt;
  &lt;/template&gt;
&lt;/UiTable&gt;</code></pre>
        </div>
      </div>

      <div class="example-container">
        <h3 class="example-title">스크립트 설정</h3>
        <div class="example-code">
          <pre><code>import { ref } from 'vue'

const tableData = ref([
  { id: 1, name: '홍길동', age: 30, job: '개발자' },
  { id: 2, name: '김철수', age: 25, job: '디자이너' },
  { id: 3, name: '이영희', age: 28, job: '기획자' }
])

const handleSave = (data) => {
  console.log('저장된 데이터:', data)
  // API 호출 등의 저장 로직
}

const handleRowAdded = (newRow) => {
  console.log('새 행 추가됨:', newRow)
}

const handleRowDeleted = (deletedRows) => {
  console.log('행 삭제됨:', deletedRows)
}

const handleOrderChanged = ({ from, to, rows }) => {
  console.log(`행 이동: ${from} → ${to}`)
  console.log('변경된 순서:', rows)
}</code></pre>
        </div>
      </div>

      <div class="example-container">
        <h3 class="example-title">편집 기능 설명</h3>
        <UiTable bordered>
          <template #header>
            <tr>
              <th>기능</th>
              <th>설명</th>
            </tr>
          </template>
          <template #body>
            <tr>
              <td>행 추가</td>
              <td>
                '+' 버튼을 클릭하면 새로운 행이 추가됩니다. 새 행의 기본 데이터는
                <code>defaultRowData</code> 속성을 통해 설정할 수 있습니다.
              </td>
            </tr>
            <tr>
              <td>행 삭제</td>
              <td>
                체크박스로 행을 선택한 후 삭제 버튼을 클릭하면 선택된 행이 삭제됩니다. 여러 행을
                동시에 선택하여 삭제할 수 있습니다.
              </td>
            </tr>
            <tr>
              <td>행 정렬</td>
              <td>
                정렬 버튼을 클릭하면 정렬 모드로 전환됩니다. 정렬 모드에서는 행을 드래그하여 순서를
                변경할 수 있습니다. 기본적으로 정렬 기능은 비활성화되어 있으며,
                <code>sortableOption</code> 속성을 통해 활성화할 수 있습니다.
              </td>
            </tr>
            <tr>
              <td>데이터 저장</td>
              <td>
                저장 버튼을 클릭하면 <code>save</code> 이벤트가 발생하며, 이벤트 핸들러를 통해 현재
                테이블 데이터를 처리할 수 있습니다.
              </td>
            </tr>
          </template>
        </UiTable>
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">테이블 레이아웃 옵션</h2>
      <p class="section-description">
        UiTable 컴포넌트는 두 가지 레이아웃 옵션을 제공합니다: 'vertical'(기본값)과 'horizontal'.
        'vertical' 레이아웃은 일반적인 테이블 형태로, 헤더가 상단에 위치합니다. 'horizontal'
        레이아웃은 th가 좌측에, td가 우측에 배치되는 형태입니다.
      </p>

      <div class="example-container">
        <h3 class="example-title">수평 레이아웃 테이블 (layout="horizontal")</h3>
        <div class="example-preview">
          <UiTable bordered layout="horizontal" isThLeft>
            <template #body>
              <tr>
                <th>이름</th>
                <td>홍길동</td>
              </tr>
              <tr>
                <th>나이</th>
                <td>30</td>
              </tr>
              <tr>
                <th>직업</th>
                <td>개발자</td>
              </tr>
              <tr>
                <th>이메일</th>
                <td>hong@example.com</td>
              </tr>
            </template>
          </UiTable>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiTable bordered layout="horizontal" isThLeft&gt;
  &lt;template #body&gt;
    &lt;tr&gt;
      &lt;th&gt;이름&lt;/th&gt;
      &lt;td&gt;홍길동&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;th&gt;나이&lt;/th&gt;
      &lt;td&gt;30&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;th&gt;직업&lt;/th&gt;
      &lt;td&gt;개발자&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;th&gt;이메일&lt;/th&gt;
      &lt;td&gt;hong@example.com&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/template&gt;
&lt;/UiTable&gt;</code></pre>
        </div>
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">스크롤 가능한 테이블</h2>
      <p class="section-description">
        테이블 내용이 많을 경우 scrollable 속성을 사용하여 스크롤 가능한 테이블을 만들 수 있습니다.
        maxHeight 속성을 통해 테이블의 최대 높이를 지정할 수 있습니다.
      </p>

      <div class="example-container">
        <h3 class="example-title">스크롤 가능한 테이블 (scrollable)</h3>
        <div class="example-preview">
          <UiTable bordered scrollable maxHeight="200px">
            <template #header>
              <tr>
                <th>이름</th>
                <th>나이</th>
                <th>직업</th>
                <th>이메일</th>
              </tr>
            </template>
            <template #body>
              <tr v-for="i in 10" :key="i">
                <td>사용자 {{ i }}</td>
                <td>{{ 20 + i }}</td>
                <td>{{ ['개발자', '디자이너', '기획자', '마케터', '영업'][i % 5] }}</td>
                <td>user{{ i }}@example.com</td>
              </tr>
            </template>
          </UiTable>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiTable bordered scrollable maxHeight="200px"&gt;
  &lt;template #header&gt;
    &lt;tr&gt;
      &lt;th&gt;이름&lt;/th&gt;
      &lt;th&gt;나이&lt;/th&gt;
      &lt;th&gt;직업&lt;/th&gt;
      &lt;th&gt;이메일&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/template&gt;
  &lt;template #body&gt;
    &lt;tr v-for="i in 10" :key="i"&gt;
      &lt;td&gt;사용자 {{ i }}&lt;/td&gt;
      &lt;td&gt;{{ 20 + i }}&lt;/td&gt;
      &lt;td&gt;{{ ['개발자', '디자이너', '기획자', '마케터', '영업'][i % 5] }}&lt;/td&gt;
      &lt;td&gt;user{{ i }}@example.com&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/template&gt;
&lt;/UiTable&gt;</code></pre>
        </div>
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">테이블 크기 옵션</h2>
      <p class="section-description">
        UiTable 컴포넌트는 세 가지 크기 옵션을 제공합니다: 'small', 'medium'(기본값), 'large'. size
        속성을 통해 테이블의 크기를 조절할 수 있습니다.
      </p>

      <div class="example-container">
        <h3 class="example-title">작은 크기 테이블 (size="small")</h3>
        <div class="example-preview">
          <UiTable bordered size="small">
            <template #header>
              <tr>
                <th>이름</th>
                <th>나이</th>
                <th>직업</th>
              </tr>
            </template>
            <template #body>
              <tr>
                <td>홍길동</td>
                <td>30</td>
                <td>개발자</td>
              </tr>
              <tr>
                <td>김철수</td>
                <td>25</td>
                <td>디자이너</td>
              </tr>
            </template>
          </UiTable>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiTable bordered size="small"&gt;
  &lt;!-- 테이블 내용 --&gt;
&lt;/UiTable&gt;</code></pre>
        </div>
      </div>

      <div class="example-container">
        <h3 class="example-title">큰 크기 테이블 (size="large")</h3>
        <div class="example-preview">
          <UiTable bordered size="large">
            <template #header>
              <tr>
                <th>이름</th>
                <th>나이</th>
                <th>직업</th>
              </tr>
            </template>
            <template #body>
              <tr>
                <td>홍길동</td>
                <td>30</td>
                <td>개발자</td>
              </tr>
              <tr>
                <td>김철수</td>
                <td>25</td>
                <td>디자이너</td>
              </tr>
            </template>
          </UiTable>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiTable bordered size="large"&gt;
  &lt;!-- 테이블 내용 --&gt;
&lt;/UiTable&gt;</code></pre>
        </div>
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">테이블 제목 및 컨트롤</h2>
      <p class="section-description">
        UiTable 컴포넌트는 테이블 상단에 제목과 다양한 컨트롤을 표시할 수 있습니다. title 속성을
        통해 테이블 제목을 설정하고, excelControls 또는 gradeRangeControls 속성을 통해 추가 컨트롤을
        표시할 수 있습니다.
      </p>

      <div class="example-container">
        <h3 class="example-title">테이블 제목 및 엑셀 컨트롤</h3>
        <div class="example-preview">
          <UiTable bordered title="사용자 목록" excelControls>
            <template #header>
              <tr>
                <th>이름</th>
                <th>나이</th>
                <th>직업</th>
              </tr>
            </template>
            <template #body>
              <tr>
                <td>홍길동</td>
                <td>30</td>
                <td>개발자</td>
              </tr>
              <tr>
                <td>김철수</td>
                <td>25</td>
                <td>디자이너</td>
              </tr>
            </template>
          </UiTable>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiTable bordered title="사용자 목록" excelControls&gt;
  &lt;!-- 테이블 내용 --&gt;
&lt;/UiTable&gt;</code></pre>
        </div>
      </div>

      <div class="example-container">
        <h3 class="example-title">구간대 설정 컨트롤</h3>
        <div class="example-preview">
          <UiTable bordered title="평가 점수표" gradeRangeControls>
            <template #header>
              <tr>
                <th>이름</th>
                <th>점수</th>
                <th>등급</th>
              </tr>
            </template>
            <template #body>
              <tr>
                <td>홍길동</td>
                <td>95</td>
                <td>A</td>
              </tr>
              <tr>
                <td>김철수</td>
                <td>85</td>
                <td>B</td>
              </tr>
              <tr>
                <td>이영희</td>
                <td>75</td>
                <td>C</td>
              </tr>
            </template>
          </UiTable>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiTable bordered title="평가 점수표" gradeRangeControls&gt;
  &lt;!-- 테이블 내용 --&gt;
&lt;/UiTable&gt;</code></pre>
        </div>
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">colgroup 슬롯 사용</h2>
      <p class="section-description">
        colgroup 슬롯을 사용하여 테이블 열의 너비를 지정할 수 있습니다.
      </p>

      <div class="example-container">
        <h3 class="example-title">열 너비 지정 테이블</h3>
        <div class="example-preview">
          <UiTable bordered>
            <template #colgroup>
              <col style="width: 20%" />
              <col style="width: 30%" />
              <col style="width: 50%" />
            </template>
            <template #header>
              <tr>
                <th>이름</th>
                <th>직업</th>
                <th>설명</th>
              </tr>
            </template>
            <template #body>
              <tr>
                <td>홍길동</td>
                <td>개발자</td>
                <td>프론트엔드 개발을 담당하고 있습니다.</td>
              </tr>
              <tr>
                <td>김철수</td>
                <td>디자이너</td>
                <td>UI/UX 디자인을 담당하고 있습니다.</td>
              </tr>
            </template>
          </UiTable>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiTable bordered&gt;
  &lt;template #colgroup&gt;
    &lt;col style="width: 20%" /&gt;
    &lt;col style="width: 30%" /&gt;
    &lt;col style="width: 50%" /&gt;
  &lt;/template&gt;
  &lt;!-- 테이블 내용 --&gt;
&lt;/UiTable&gt;</code></pre>
        </div>
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">속성(Props) 요약</h2>

      <UiTable bordered>
        <template #header>
          <tr>
            <th>속성명</th>
            <th>타입</th>
            <th>기본값</th>
            <th>설명</th>
          </tr>
        </template>
        <template #body>
          <tr>
            <td>bordered</td>
            <td>Boolean</td>
            <td>false</td>
            <td>테이블에 테두리를 표시합니다.</td>
          </tr>
          <tr>
            <td>striped</td>
            <td>Boolean</td>
            <td>false</td>
            <td>홀수 행에 배경색을 적용하여 줄무늬 효과를 줍니다.</td>
          </tr>
          <tr>
            <td>hover</td>
            <td>Boolean</td>
            <td>false</td>
            <td>행에 마우스를 올렸을 때 배경색 변경 효과를 적용합니다.</td>
          </tr>
          <tr>
            <td>size</td>
            <td>String</td>
            <td>'medium'</td>
            <td>테이블의 크기를 설정합니다. 옵션: 'small', 'medium', 'large'</td>
          </tr>
          <tr>
            <td>layout</td>
            <td>String</td>
            <td>'vertical'</td>
            <td>
              테이블 레이아웃을 설정합니다. 'vertical'(기본 테이블 형태), 'horizontal'(th가 좌측,
              td가 우측)
            </td>
          </tr>
          <tr>
            <td>isThLeft</td>
            <td>Boolean</td>
            <td>false</td>
            <td>layout="horizontal" 사용 시 th를 좌측에 배치할지 여부를 설정합니다.</td>
          </tr>
          <tr>
            <td>scrollable</td>
            <td>Boolean</td>
            <td>false</td>
            <td>테이블을 스크롤 가능하게 설정합니다.</td>
          </tr>
          <tr>
            <td>maxHeight</td>
            <td>String</td>
            <td>'400px'</td>
            <td>스크롤 가능한 테이블의 최대 높이를 설정합니다.</td>
          </tr>
          <tr>
            <td>modelValue</td>
            <td>Array</td>
            <td>[]</td>
            <td>테이블 데이터로, v-model로 바인딩합니다.</td>
          </tr>
          <tr>
            <td>editable</td>
            <td>Boolean</td>
            <td>false</td>
            <td>테이블 편집 기능을 활성화합니다.</td>
          </tr>
          <tr>
            <td>excelControls</td>
            <td>Boolean</td>
            <td>false</td>
            <td>엑셀 다운로드/업로드 버튼을 표시합니다.</td>
          </tr>
          <tr>
            <td>defaultRowData</td>
            <td>Object</td>
            <td>{}</td>
            <td>새 행 추가 시 사용할 기본 데이터 객체입니다.</td>
          </tr>
          <tr>
            <td>sortableOption</td>
            <td>Boolean</td>
            <td>false</td>
            <td>정렬 기능 활성화 여부를 설정합니다.</td>
          </tr>
          <tr>
            <td>title</td>
            <td>String</td>
            <td>''</td>
            <td>테이블 상단에 표시할 제목입니다.</td>
          </tr>
          <tr>
            <td>canAddRow</td>
            <td>Boolean</td>
            <td>true</td>
            <td>행 추가 버튼 표시 여부를 설정합니다.</td>
          </tr>
          <tr>
            <td>gradeRangeControls</td>
            <td>Boolean</td>
            <td>false</td>
            <td>구간대 설정 컨트롤을 표시합니다.</td>
          </tr>
        </template>
      </UiTable>
    </section>

    <section class="guide-section">
      <h2 class="section-title">이벤트(Events) 요약</h2>

      <UiTable bordered>
        <template #header>
          <tr>
            <th>이벤트명</th>
            <th>파라미터</th>
            <th>설명</th>
          </tr>
        </template>
        <template #body>
          <tr>
            <td>update:modelValue</td>
            <td>Array</td>
            <td>테이블 데이터가 변경될 때 발생합니다.</td>
          </tr>
          <tr>
            <td>save</td>
            <td>Array</td>
            <td>저장 버튼 클릭 시 발생합니다.</td>
          </tr>
          <tr>
            <td>row-added</td>
            <td>Object</td>
            <td>새 행이 추가될 때 발생합니다.</td>
          </tr>
          <tr>
            <td>row-deleted</td>
            <td>Array</td>
            <td>행이 삭제될 때 발생합니다.</td>
          </tr>
          <tr>
            <td>order-changed</td>
            <td>Object</td>
            <td>행 순서가 변경될 때 발생합니다. { from, to, rows } 형태의 객체를 반환합니다.</td>
          </tr>
        </template>
      </UiTable>
    </section>

    <section class="guide-section">
      <h2 class="section-title">슬롯(Slots) 요약</h2>

      <UiTable bordered>
        <template #header>
          <tr>
            <th>슬롯명</th>
            <th>설명</th>
            <th>스코프 변수</th>
          </tr>
        </template>
        <template #body>
          <tr>
            <td>colgroup</td>
            <td>테이블 열의 너비를 지정할 때 사용합니다.</td>
            <td>없음</td>
          </tr>
          <tr>
            <td>header</td>
            <td>테이블 헤더를 정의합니다. layout="horizontal"일 때는 표시되지 않습니다.</td>
            <td>selectAll, isAllSelected, editable, sortable</td>
          </tr>
          <tr>
            <td>body</td>
            <td>테이블 본문을 정의합니다.</td>
            <td>
              rows, selectedRows, toggleRowSelection, isRowSelected, handleDragStart,
              handleDragOver, handleDrop, handleDragEnd, sortable, editable
            </td>
          </tr>
          <tr>
            <td>footer</td>
            <td>테이블 푸터를 정의합니다.</td>
            <td>없음</td>
          </tr>
        </template>
      </UiTable>
    </section>
  </div>
</template>

<script setup>
  import { ref, inject } from 'vue'
  import UiTable from '~/components/UI/UiTable.vue'
  import UiCheckbox from '~/components/UI/UiCheckbox.vue'
  import UiInput from '~/components/UI/UiInput.vue'

  // 로고 텍스트 접근
  const logoText = inject('logoText')

  // 로고 텍스트 변경
  logoText.value = 'UiTable 가이드'

  // 편집 가능한 테이블 데이터
  const editableTableData = ref([
    { id: 1, name: '홍길동', age: 30, job: '개발자' },
    { id: 2, name: '김철수', age: 25, job: '디자이너' },
    { id: 3, name: '이영희', age: 28, job: '기획자' }
  ])

  // 테이블 이벤트 핸들러
  const handleSave = data => {
    console.log('저장된 데이터:', data)
    // 실제 구현에서는 API 호출 등의 저장 로직 추가
  }

  // 행 추가 이벤트 핸들러
  const handleRowAdded = newRow => {
    console.log('새 행 추가됨:', newRow)
  }

  // 행 삭제 이벤트 핸들러
  const handleRowDeleted = deletedRows => {
    console.log('행 삭제됨:', deletedRows)
  }

  // 행 순서 변경 이벤트 핸들러
  const handleOrderChanged = ({ from, to, rows }) => {
    console.log(`행 이동: ${from} → ${to}`)
    console.log('변경된 순서:', rows)
  }
</script>

<style lang="scss">
  .table-guide-container {
    padding: 20px;

    .page-title {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 30px;
      color: #333;
    }

    .guide-section {
      margin-bottom: 40px;

      .section-title {
        font-size: 22px;
        font-weight: 600;
        margin-bottom: 20px;
        color: #333;
        border-bottom: 2px solid #e2e8f0;
        padding-bottom: 10px;
      }

      .section-description {
        margin-bottom: 20px;
        line-height: 1.6;
        color: #4a5568;
      }

      .example-container {
        margin-bottom: 30px;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        overflow: hidden;

        .example-title {
          font-size: 18px;
          font-weight: 600;
          padding: 15px;
          background-color: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
        }

        .example-preview {
          padding: 20px;
          background-color: #fff;
          border-bottom: 1px solid #e2e8f0;
        }

        .example-code {
          background-color: #f8fafc;
          padding: 15px;

          pre {
            margin: 0;
            overflow-x: auto;

            code {
              font-family: 'Courier New', Courier, monospace;
              font-size: 14px;
              color: #4a5568;
              white-space: pre-wrap;
            }
          }
        }
      }
    }
  }
</style>
