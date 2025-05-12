<template>
  <div class="tag-group-examples">
    <h1 class="page-title">태그 그룹 컴포넌트 사용 예시</h1>

    <section class="example-section">
      <h2 class="section-title">기본 태그 그룹</h2>
      <p class="section-description">여러 태그를 그룹으로 관리할 수 있습니다.</p>

      <div class="example-container">
        <div class="component-preview">
          <div class="tags-group">
            <UiTag variant="primary">마케팅</UiTag>
            <UiTag variant="collaboration">디자인</UiTag>
            <UiTag variant="shared">개발</UiTag>
          </div>
        </div>
        <div class="code-example">
          <pre><code>&lt;div class="tags-group"&gt;
  &lt;UiTag variant="primary"&gt;마케팅&lt;/UiTag&gt;
  &lt;UiTag variant="collaboration"&gt;디자인&lt;/UiTag&gt;
  &lt;UiTag variant="shared"&gt;개발&lt;/UiTag&gt;
&lt;/div&gt;</code></pre>
        </div>
      </div>
    </section>

    <section class="example-section">
      <h2 class="section-title">태그 그룹 컴포넌트</h2>
      <p class="section-description">
        UiTagGroup 컴포넌트를 사용하여 모델 기반 태그 관리가 가능합니다.
      </p>

      <div class="example-container">
        <div class="component-preview">
          <UiTagGroup :model-value="basicTags" />
        </div>
        <div class="code-example">
          <pre><code>&lt;UiTagGroup :model-value="basicTags" /&gt;

// script
const basicTags = ref([
  { id: 'tag-1', text: '마케팅', variant: 'primary' },
  { id: 'tag-2', text: '디자인', variant: 'collaboration' },
  { id: 'tag-3', text: '개발', variant: 'shared' }
])</code></pre>
        </div>
      </div>
    </section>

    <section class="example-section">
      <h2 class="section-title">인터랙티브 태그 그룹</h2>
      <p class="section-description">사용자가 태그를 추가하고 제거할 수 있는 태그 그룹입니다.</p>

      <div class="example-container">
        <div class="component-preview">
          <UiTagGroup
            v-model="interactiveTags"
            :addable="true"
            @add="handleTagAdd"
            @remove="handleTagRemove"
          />
          <div class="action-buttons">
            <button class="action-button" @click="addRandomTag">랜덤 태그 추가</button>
            <button class="action-button" @click="resetTags">초기화</button>
          </div>
        </div>
        <div class="code-example">
          <pre><code>&lt;UiTagGroup
  v-model="interactiveTags"
  :addable="true"
  @add="handleTagAdd"
  @remove="handleTagRemove"
/&gt;

// script
const interactiveTags = ref([
  { id: 'tag-1', text: '마케팅', variant: 'primary' },
  { id: 'tag-2', text: '디자인', variant: 'collaboration' },
  { id: 'tag-3', text: '개발', variant: 'shared' }
])

const handleTagAdd = (tag) => {
  console.log('태그 추가:', tag)
}

const handleTagRemove = (id) => {
  console.log('태그 삭제:', id)
}</code></pre>
        </div>
      </div>
    </section>

    <section class="example-section">
      <h2 class="section-title">수직 태그 그룹</h2>
      <p class="section-description">태그를 수직으로 정렬하는 태그 그룹입니다.</p>

      <div class="example-container">
        <div class="component-preview">
          <div class="tags-group tags-group--vertical">
            <UiTag variant="completed">중요</UiTag>
            <UiTag variant="deadline">긴급</UiTag>
            <UiTag variant="name">주의</UiTag>
          </div>
        </div>
        <div class="code-example">
          <pre><code>&lt;div class="tags-group tags-group--vertical"&gt;
  &lt;UiTag variant="completed"&gt;중요&lt;/UiTag&gt;
  &lt;UiTag variant="deadline"&gt;긴급&lt;/UiTag&gt;
  &lt;UiTag variant="name"&gt;주의&lt;/UiTag&gt;
&lt;/div&gt;</code></pre>
        </div>
      </div>
    </section>

    <section class="example-section">
      <h2 class="section-title">수직 태그 그룹 컴포넌트</h2>
      <p class="section-description">UiTagGroup 컴포넌트를 사용하여 수직 정렬할 수 있습니다.</p>

      <div class="example-container">
        <div class="component-preview">
          <UiTagGroup :model-value="verticalTags" :vertical="true" />
        </div>
        <div class="code-example">
          <pre><code>&lt;UiTagGroup
  :model-value="verticalTags"
  :vertical="true"
/&gt;

// script
const verticalTags = ref([
  { id: 'vtag-1', text: '중요', variant: 'completed' },
  { id: 'vtag-2', text: '긴급', variant: 'deadline' },
  { id: 'vtag-3', text: '주의', variant: 'name' }
])</code></pre>
        </div>
      </div>
    </section>

    <section class="example-section">
      <h2 class="section-title">최대 태그 수 제한</h2>
      <p class="section-description">
        태그 그룹에 추가할 수 있는 최대 태그 수를 제한할 수 있습니다.
      </p>

      <div class="example-container">
        <div class="component-preview">
          <UiTagGroup v-model="limitedTags" :addable="true" :max-tags="5" />
          <div class="action-buttons">
            <button class="action-button" @click="addLimitedTag">태그 추가</button>
            <button class="action-button" @click="resetLimitedTags">초기화</button>
          </div>
          <p class="help-text">최대 5개까지 태그를 추가할 수 있습니다.</p>
        </div>
        <div class="code-example">
          <pre><code>&lt;UiTagGroup
  v-model="limitedTags"
  :addable="true"
  :max-tags="5"
/&gt;

// script
const limitedTags = ref([
  { id: 'ltag-1', text: '태그 1', variant: 'primary' },
  { id: 'ltag-2', text: '태그 2', variant: 'primary' },
  { id: 'ltag-3', text: '태그 3', variant: 'primary' }
])</code></pre>
        </div>
      </div>
    </section>

    <section class="example-section">
      <h2 class="section-title">태그 그룹 스타일 클래스</h2>
      <div class="style-table-container">
        <table class="style-table">
          <thead>
            <tr>
              <th>클래스명</th>
              <th>설명</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>.tags-group</code></td>
              <td>기본 태그 그룹 스타일. 가로 배열로 태그를 나열하고 8px의 간격을 제공합니다.</td>
            </tr>
            <tr>
              <td><code>.tags-group--vertical</code></td>
              <td>태그를 세로로 정렬합니다. 수직 레이아웃이 필요할 때 사용합니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="code-example">
        <pre><code>// SCSS
.tags-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  &--vertical {
    flex-direction: column;
    align-items: flex-start;
  }
}</code></pre>
      </div>
    </section>

    <section class="example-section">
      <h2 class="section-title">UiTagGroup Props</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Prop 이름</th>
            <th>타입</th>
            <th>기본값</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>modelValue</code></td>
            <td>Array</td>
            <td><code>[]</code></td>
            <td>
              태그 배열을 나타내는 v-model 데이터입니다. 각 태그는
              <code
                >{ id, text, variant, size, closable, backgroundColor, textColor, borderColor
                }</code
              >
              형식의 객체입니다.
            </td>
          </tr>
          <tr>
            <td><code>defaultVariant</code></td>
            <td>String</td>
            <td><code>'default'</code></td>
            <td>태그 추가 시 적용할 기본 variant 값입니다.</td>
          </tr>
          <tr>
            <td><code>defaultSize</code></td>
            <td>String</td>
            <td><code>'medium'</code></td>
            <td>태그 추가 시 적용할 기본 size 값입니다.</td>
          </tr>
          <tr>
            <td><code>addable</code></td>
            <td>Boolean</td>
            <td><code>false</code></td>
            <td>사용자가 태그를 추가할 수 있는 버튼을 표시할지 여부입니다.</td>
          </tr>
          <tr>
            <td><code>vertical</code></td>
            <td>Boolean</td>
            <td><code>false</code></td>
            <td>태그를 수직으로 정렬할지 여부입니다.</td>
          </tr>
          <tr>
            <td><code>maxTags</code></td>
            <td>Number</td>
            <td><code>Infinity</code></td>
            <td>최대로 추가할 수 있는 태그 개수입니다.</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="example-section">
      <h2 class="section-title">UiTagGroup 이벤트</h2>
      <table class="events-table">
        <thead>
          <tr>
            <th>이벤트 이름</th>
            <th>파라미터</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>update:modelValue</code></td>
            <td>Array</td>
            <td>태그 추가/제거 후 업데이트된 태그 배열입니다. v-model을 위해 사용됩니다.</td>
          </tr>
          <tr>
            <td><code>add</code></td>
            <td>Object</td>
            <td>새로운 태그가 추가되었을 때 발생합니다. 추가된 태그 객체를 전달합니다.</td>
          </tr>
          <tr>
            <td><code>remove</code></td>
            <td>String</td>
            <td>태그가 제거되었을 때 발생합니다. 제거된 태그의 ID를 전달합니다.</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  // 기본 태그 예시
  const basicTags = ref([
    { id: 'tag-1', text: '마케팅', variant: 'primary' },
    { id: 'tag-2', text: '디자인', variant: 'collaboration' },
    { id: 'tag-3', text: '개발', variant: 'shared' }
  ])

  // 인터랙티브 태그 그룹 데이터
  const interactiveTags = ref([
    { id: 'tag-1', text: '마케팅', variant: 'primary' },
    { id: 'tag-2', text: '디자인', variant: 'collaboration' },
    { id: 'tag-3', text: '개발', variant: 'shared' }
  ])

  // 랜덤 태그 추가 기능
  const tagVariants = ['primary', 'collaboration', 'shared', 'name', 'completed', 'deadline']
  const tagNames = [
    'Frontend',
    'Backend',
    'UI/UX',
    'API',
    'Database',
    'Testing',
    'DevOps',
    'Mobile'
  ]

  const addRandomTag = () => {
    const randomVariant = tagVariants[Math.floor(Math.random() * tagVariants.length)]
    const randomName = tagNames[Math.floor(Math.random() * tagNames.length)]

    interactiveTags.value.push({
      id: `tag-${Date.now()}`,
      text: randomName,
      variant: randomVariant,
      closable: true
    })
  }

  const resetTags = () => {
    interactiveTags.value = [
      { id: 'tag-1', text: '마케팅', variant: 'primary' },
      { id: 'tag-2', text: '디자인', variant: 'collaboration' },
      { id: 'tag-3', text: '개발', variant: 'shared' }
    ]
  }

  // 태그 이벤트 핸들러
  const handleTagAdd = tag => {
    console.log('태그 추가:', tag)
  }

  const handleTagRemove = id => {
    console.log('태그 삭제:', id)
  }

  // 수직 정렬 태그 그룹
  const verticalTags = ref([
    { id: 'vtag-1', text: '중요', variant: 'completed' },
    { id: 'vtag-2', text: '긴급', variant: 'deadline' },
    { id: 'vtag-3', text: '주의', variant: 'name' }
  ])

  // 최대 태그 수 제한 태그 그룹
  const limitedTags = ref([
    { id: 'ltag-1', text: '태그 1', variant: 'primary' },
    { id: 'ltag-2', text: '태그 2', variant: 'primary' },
    { id: 'ltag-3', text: '태그 3', variant: 'primary' }
  ])

  const addLimitedTag = () => {
    if (limitedTags.value.length < 5) {
      limitedTags.value.push({
        id: `ltag-${Date.now()}`,
        text: `태그 ${limitedTags.value.length + 1}`,
        variant: 'primary',
        closable: true
      })
    }
  }

  const resetLimitedTags = () => {
    limitedTags.value = [
      { id: 'ltag-1', text: '태그 1', variant: 'primary' },
      { id: 'ltag-2', text: '태그 2', variant: 'primary' },
      { id: 'ltag-3', text: '태그 3', variant: 'primary' }
    ]
  }
</script>

<style lang="scss" scoped>
  .tag-group-examples {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    font-family: 'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif;
  }

  .page-title {
    font-size: 24px;
    margin-bottom: 24px;
    color: #333;
    font-weight: 600;
  }

  .example-section {
    margin-bottom: 40px;
    border: 1px solid #e6e8ea;
    border-radius: 8px;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  .section-title {
    font-size: 18px;
    margin-bottom: 8px;
    color: #333;
    font-weight: 600;
  }

  .section-description {
    color: #666;
    font-size: 14px;
    margin-bottom: 16px;
  }

  .example-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .component-preview {
    padding: 16px;
    border: 1px solid #e6e8ea;
    border-radius: 4px;
    background-color: #f9f9f9;
  }

  .action-buttons {
    display: flex;
    gap: 8px;
    margin-top: 16px;
  }

  .action-button {
    padding: 6px 12px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    color: #333;

    &:hover {
      background-color: #e0e0e0;
    }
  }

  .help-text {
    font-size: 12px;
    color: #666;
    margin-top: 8px;
  }

  .code-example {
    background-color: #f4f5f6;
    border-radius: 4px;
    padding: 16px;
    overflow: auto;

    pre {
      margin: 0;
      white-space: pre-wrap;

      code {
        font-family: 'Courier New', monospace;
        font-size: 14px;
        color: #333;
      }
    }
  }

  .props-table,
  .events-table,
  .style-table {
    width: 100%;
    border-collapse: collapse;
    margin: 8px 0 16px;
    font-size: 14px;

    th,
    td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #e6e8ea;
    }

    th {
      background-color: #f5f5f5;
      font-weight: 600;
      color: #333;
    }

    td {
      color: #555;

      code {
        background-color: #f0f0f0;
        padding: 2px 4px;
        border-radius: 3px;
        font-family: 'Courier New', monospace;
        font-size: 12px;
      }
    }

    tr:last-child td {
      border-bottom: none;
    }
  }

  .tags-group {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    &--vertical {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
