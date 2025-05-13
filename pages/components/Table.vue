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
                <td>홍길동</td>
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
      <h2 class="section-title">테이블 스타일 옵션</h2>

      <div class="example-container">
        <h3 class="example-title">테두리 있는 테이블 (bordered)</h3>
        <div class="example-preview">
          <UiTable bordered>
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
          <pre><code>&lt;UiTable bordered&gt;
  &lt;!-- 테이블 내용 --&gt;
&lt;/UiTable&gt;</code></pre>
        </div>
      </div>

      <div class="example-container">
        <h3 class="example-title">줄무늬 테이블 (striped)</h3>
        <div class="example-preview">
          <UiTable striped>
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
              <tr>
                <td>이영희</td>
                <td>28</td>
                <td>기획자</td>
              </tr>
              <tr>
                <td>박지민</td>
                <td>32</td>
                <td>마케터</td>
              </tr>
            </template>
          </UiTable>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiTable striped&gt;
  &lt;!-- 테이블 내용 --&gt;
&lt;/UiTable&gt;</code></pre>
        </div>
      </div>

      <div class="example-container">
        <h3 class="example-title">호버 효과 테이블 (hover)</h3>
        <div class="example-preview">
          <UiTable hover>
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
              <tr>
                <td>이영희</td>
                <td>28</td>
                <td>기획자</td>
              </tr>
            </template>
          </UiTable>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiTable hover&gt;
  &lt;!-- 테이블 내용 --&gt;
&lt;/UiTable&gt;</code></pre>
        </div>
      </div>

      <div class="example-container">
        <h3 class="example-title">스타일 조합 (bordered + striped + hover)</h3>
        <div class="example-preview">
          <UiTable bordered striped hover>
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
              <tr>
                <td>이영희</td>
                <td>28</td>
                <td>기획자</td>
              </tr>
              <tr>
                <td>박지민</td>
                <td>32</td>
                <td>마케터</td>
              </tr>
            </template>
          </UiTable>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiTable bordered striped hover&gt;
  &lt;!-- 테이블 내용 --&gt;
&lt;/UiTable&gt;</code></pre>
        </div>
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">테이블 크기 옵션</h2>

      <div class="example-container">
        <h3 class="example-title">작은 크기 (small)</h3>
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
          <pre><code>&lt;UiTable size="small"&gt;
  &lt;!-- 테이블 내용 --&gt;
&lt;/UiTable&gt;</code></pre>
        </div>
      </div>

      <div class="example-container">
        <h3 class="example-title">중간 크기 (medium) - 기본값</h3>
        <div class="example-preview">
          <UiTable bordered size="medium">
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
          <pre><code>&lt;UiTable size="medium"&gt;
  &lt;!-- 테이블 내용 --&gt;
&lt;/UiTable&gt;</code></pre>
        </div>
      </div>

      <div class="example-container">
        <h3 class="example-title">큰 크기 (large)</h3>
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
          <pre><code>&lt;UiTable size="large"&gt;
  &lt;!-- 테이블 내용 --&gt;
&lt;/UiTable&gt;</code></pre>
        </div>
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">테이블 레이아웃 옵션</h2>

      <div class="example-container">
        <h3 class="example-title">수직 레이아웃 (vertical) - 기본값</h3>
        <div class="example-preview">
          <UiTable bordered layout="vertical">
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
          <pre><code>&lt;UiTable layout="vertical"&gt;
  &lt;!-- 테이블 내용 --&gt;
&lt;/UiTable&gt;</code></pre>
        </div>
      </div>

      <div class="example-container">
        <h3 class="example-title">수평 레이아웃 (horizontal)</h3>
        <div class="example-preview">
          <UiTable bordered layout="horizontal">
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
          <pre><code>&lt;UiTable layout="horizontal"&gt;
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

      <div class="example-container">
        <h3 class="example-title">헤더 왼쪽 정렬 (isThLeft)</h3>
        <div class="example-preview">
          <UiTable bordered :isThLeft="true">
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
          <pre><code>&lt;UiTable :isThLeft="true"&gt;
  &lt;!-- 테이블 내용 --&gt;
&lt;/UiTable&gt;</code></pre>
        </div>
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">열 너비 지정 (colgroup)</h2>

      <div class="example-container">
        <h3 class="example-title">colgroup 슬롯 사용</h3>
        <div class="example-preview">
          <UiTable bordered>
            <template #colgroup>
              <col style="width: 100px" />
              <col style="width: 80px" />
              <col />
            </template>
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
          <pre><code>&lt;UiTable bordered&gt;
  &lt;template #colgroup&gt;
    &lt;col style="width: 100px" /&gt;
    &lt;col style="width: 80px" /&gt;
    &lt;col /&gt;
  &lt;/template&gt;
  &lt;!-- 테이블 내용 --&gt;
&lt;/UiTable&gt;</code></pre>
        </div>
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">푸터 사용 예시</h2>

      <div class="example-container">
        <h3 class="example-title">footer 슬롯 사용</h3>
        <div class="example-preview">
          <UiTable bordered>
            <template #header>
              <tr>
                <th>상품명</th>
                <th>가격</th>
                <th>수량</th>
                <th>합계</th>
              </tr>
            </template>
            <template #body>
              <tr>
                <td>상품 A</td>
                <td>10,000원</td>
                <td>2</td>
                <td>20,000원</td>
              </tr>
              <tr>
                <td>상품 B</td>
                <td>15,000원</td>
                <td>1</td>
                <td>15,000원</td>
              </tr>
              <tr>
                <td>상품 C</td>
                <td>8,000원</td>
                <td>3</td>
                <td>24,000원</td>
              </tr>
            </template>
            <template #footer>
              <tr>
                <td colspan="3" class="text-center">총 합계</td>
                <td>59,000원</td>
              </tr>
            </template>
          </UiTable>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiTable bordered&gt;
  &lt;!-- 헤더와 바디 내용 --&gt;
  &lt;template #footer&gt;
    &lt;tr&gt;
      &lt;td colspan="3" class="text-center"&gt;총 합계&lt;/td&gt;
      &lt;td&gt;59,000원&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/template&gt;
&lt;/UiTable&gt;</code></pre>
        </div>
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">스크롤 가능한 테이블</h2>
      <p class="section-description">
        테이블의 행이 많아질 경우 스크롤 기능을 활성화하여 테이블의 높이를 제한할 수 있습니다.
        스크롤 기능을 사용하면 테이블 헤더는 상단에 고정되고 본문만 스크롤됩니다.
      </p>

      <div class="example-container">
        <h3 class="example-title">스크롤 가능한 테이블 (scrollable)</h3>
        <div class="example-preview">
          <UiTable scrollable :max-height="'200px'">
            <template #header>
              <tr>
                <th>번호</th>
                <th>이름</th>
                <th>나이</th>
                <th>직업</th>
              </tr>
            </template>
            <template #body>
              <tr v-for="i in 15" :key="i">
                <td>{{ i }}</td>
                <td>사용자{{ i }}</td>
                <td>{{ 20 + i }}</td>
                <td>{{ i % 3 === 0 ? '개발자' : i % 3 === 1 ? '디자이너' : '기획자' }}</td>
              </tr>
            </template>
          </UiTable>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiTable scrollable :max-height="'200px'"&gt;
  &lt;template #header&gt;
    &lt;tr&gt;
      &lt;th&gt;번호&lt;/th&gt;
      &lt;th&gt;이름&lt;/th&gt;
      &lt;th&gt;나이&lt;/th&gt;
      &lt;th&gt;직업&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/template&gt;
  &lt;template #body&gt;
    &lt;tr v-for="i in 15" :key="i"&gt;
      &lt;td&gt;{{ i }}&lt;/td&gt;
      &lt;td&gt;사용자{{ i }}&lt;/td&gt;
      &lt;td&gt;{{ 20 + i }}&lt;/td&gt;
      &lt;td&gt;{{ i % 3 === 0 ? '개발자' : (i % 3 === 1 ? '디자이너' : '기획자') }}&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/template&gt;
&lt;/UiTable&gt;</code></pre>
        </div>
      </div>

      <div class="example-container">
        <h3 class="example-title">스크롤 + 스타일 조합</h3>
        <div class="example-preview">
          <UiTable scrollable :max-height="'200px'" bordered striped hover>
            <template #header>
              <tr>
                <th>번호</th>
                <th>이름</th>
                <th>나이</th>
                <th>직업</th>
              </tr>
            </template>
            <template #body>
              <tr v-for="i in 15" :key="i">
                <td>{{ i }}</td>
                <td>사용자{{ i }}</td>
                <td>{{ 20 + i }}</td>
                <td>{{ i % 3 === 0 ? '개발자' : i % 3 === 1 ? '디자이너' : '기획자' }}</td>
              </tr>
            </template>
          </UiTable>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiTable scrollable :max-height="'200px'" bordered striped hover&gt;
  &lt;template #header&gt;
    &lt;tr&gt;
      &lt;th&gt;번호&lt;/th&gt;
      &lt;th&gt;이름&lt;/th&gt;
      &lt;th&gt;나이&lt;/th&gt;
      &lt;th&gt;직업&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/template&gt;
  &lt;template #body&gt;
    &lt;tr v-for="i in 15" :key="i"&gt;
      &lt;td&gt;{{ i }}&lt;/td&gt;
      &lt;td&gt;사용자{{ i }}&lt;/td&gt;
      &lt;td&gt;{{ 20 + i }}&lt;/td&gt;
      &lt;td&gt;{{ i % 3 === 0 ? '개발자' : (i % 3 === 1 ? '디자이너' : '기획자') }}&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/template&gt;
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
            <td>테이블 레이아웃을 설정합니다. 옵션: 'vertical', 'horizontal'</td>
          </tr>
          <tr>
            <td>isThLeft</td>
            <td>Boolean</td>
            <td>false</td>
            <td>헤더(th) 텍스트를 왼쪽 정렬합니다. 기본값은 가운데 정렬입니다.</td>
          </tr>
          <tr>
            <td>scrollable</td>
            <td>Boolean</td>
            <td>false</td>
            <td>테이블의 스크롤 기능을 활성화합니다. 헤더는 고정되고 본문만 스크롤됩니다.</td>
          </tr>
          <tr>
            <td>maxHeight</td>
            <td>String</td>
            <td>'400px'</td>
            <td>테이블의 최대 높이를 지정합니다. scrollable이 true일 때만 적용됩니다.</td>
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
          </tr>
        </template>
        <template #body>
          <tr>
            <td>colgroup</td>
            <td>테이블 열의 너비를 지정할 때 사용합니다.</td>
          </tr>
          <tr>
            <td>header</td>
            <td>테이블 헤더를 정의합니다. layout="horizontal"일 때는 표시되지 않습니다.</td>
          </tr>
          <tr>
            <td>body</td>
            <td>테이블 본문을 정의합니다.</td>
          </tr>
          <tr>
            <td>footer</td>
            <td>테이블 푸터를 정의합니다.</td>
          </tr>
        </template>
      </UiTable>
    </section>
  </div>
</template>

<script setup>
  import { inject } from 'vue'
  import UiTable from '~/components/UI/UiTable.vue'

  // 로고 텍스트 접근
  const logoText = inject('logoText')

  // 로고 텍스트 변경
  logoText.value = 'UiTable 가이드'
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
