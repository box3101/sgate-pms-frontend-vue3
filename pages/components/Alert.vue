<template>
  <div class="component-guide">
    <h1 class="guide-title">UiAlert 컴포넌트</h1>
    <p class="guide-description">
      UiAlert 컴포넌트는 사용자에게 중요한 정보를 알려주는 알림 컴포넌트입니다.
      다양한 타입(정보, 성공, 경고, 에러)과 크기를 지원합니다.
    </p>

    <section class="guide-section">
      <h2 class="section-title">기본 사용법</h2>
      <div class="example-wrapper">
        <div class="example-preview">
          <UiAlert message="기본 알림 메시지입니다." />
        </div>
        <div class="example-code">
          <pre><code>&lt;UiAlert message="기본 알림 메시지입니다." /&gt;</code></pre>
        </div>
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">알림 타입</h2>
      <p class="section-description">
        UiAlert 컴포넌트는 4가지 타입(info, success, warning, error)을 지원합니다.
      </p>
      <div class="example-wrapper">
        <div class="example-preview">
          <UiAlert type="info" message="정보 알림 메시지입니다." class="mb-3" />
          <UiAlert type="success" message="성공 알림 메시지입니다." class="mb-3" />
          <UiAlert type="warning" message="경고 알림 메시지입니다." class="mb-3" />
          <UiAlert type="error" message="에러 알림 메시지입니다." />
        </div>
        <div class="example-code">
          <pre><code>&lt;UiAlert type="info" message="정보 알림 메시지입니다." /&gt;
&lt;UiAlert type="success" message="성공 알림 메시지입니다." /&gt;
&lt;UiAlert type="warning" message="경고 알림 메시지입니다." /&gt;
&lt;UiAlert type="error" message="에러 알림 메시지입니다." /&gt;</code></pre>
        </div>
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">제목 추가</h2>
      <p class="section-description">
        title 속성을 사용하여 알림에 제목을 추가할 수 있습니다.
      </p>
      <div class="example-wrapper">
        <div class="example-preview">
          <UiAlert 
            type="info" 
            title="정보 알림" 
            message="제목이 있는 정보 알림 메시지입니다." 
            class="mb-3"
          />
          <UiAlert 
            type="success" 
            title="성공 알림" 
            message="제목이 있는 성공 알림 메시지입니다." 
          />
        </div>
        <div class="example-code">
          <pre><code>&lt;UiAlert 
  type="info" 
  title="정보 알림" 
  message="제목이 있는 정보 알림 메시지입니다." 
/&gt;
&lt;UiAlert 
  type="success" 
  title="성공 알림" 
  message="제목이 있는 성공 알림 메시지입니다." 
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">크기 옵션</h2>
      <p class="section-description">
        size 속성을 사용하여 알림의 크기를 조절할 수 있습니다. (small, medium, large)
      </p>
      <div class="example-wrapper">
        <div class="example-preview">
          <UiAlert 
            size="small" 
            type="info" 
            title="작은 크기" 
            message="작은 크기의 알림 메시지입니다." 
            class="mb-3"
          />
          <UiAlert 
            size="medium" 
            type="success" 
            title="중간 크기" 
            message="중간 크기의 알림 메시지입니다." 
            class="mb-3"
          />
          <UiAlert 
            size="large" 
            type="warning" 
            title="큰 크기" 
            message="큰 크기의 알림 메시지입니다." 
          />
        </div>
        <div class="example-code">
          <pre><code>&lt;UiAlert 
  size="small" 
  type="info" 
  title="작은 크기" 
  message="작은 크기의 알림 메시지입니다." 
/&gt;
&lt;UiAlert 
  size="medium" 
  type="success" 
  title="중간 크기" 
  message="중간 크기의 알림 메시지입니다." 
/&gt;
&lt;UiAlert 
  size="large" 
  type="warning" 
  title="큰 크기" 
  message="큰 크기의 알림 메시지입니다." 
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">아이콘 숨기기</h2>
      <p class="section-description">
        showIcon 속성을 false로 설정하여 아이콘을 숨길 수 있습니다.
      </p>
      <div class="example-wrapper">
        <div class="example-preview">
          <UiAlert 
            type="info" 
            title="아이콘 없음" 
            message="아이콘이 없는 알림 메시지입니다." 
            :showIcon="false" 
          />
        </div>
        <div class="example-code">
          <pre><code>&lt;UiAlert 
  type="info" 
  title="아이콘 없음" 
  message="아이콘이 없는 알림 메시지입니다." 
  :showIcon="false" 
/&gt;</code></pre>
        </div>
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">닫기 버튼</h2>
      <p class="section-description">
        closable 속성을 true로 설정하고 v-model을 사용하여 닫기 기능을 추가할 수 있습니다.
      </p>
      <div class="example-wrapper">
        <div class="example-preview">
          <UiAlert 
            v-model="showAlert1"
            type="info" 
            title="닫기 가능" 
            message="닫기 버튼이 있는 알림 메시지입니다." 
            :closable="true" 
            class="mb-3"
          />
          <UiButton v-if="!showAlert1" @click="showAlert1 = true">알림 다시 표시</UiButton>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiAlert 
  v-model="showAlert1"
  type="info" 
  title="닫기 가능" 
  message="닫기 버튼이 있는 알림 메시지입니다." 
  :closable="true" 
/&gt;
&lt;UiButton v-if="!showAlert1" @click="showAlert1 = true"&gt;알림 다시 표시&lt;/UiButton&gt;

&lt;script setup&gt;
import { ref } from 'vue'

const showAlert1 = ref(true)
&lt;/script&gt;</code></pre>
        </div>
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">슬롯 사용</h2>
      <p class="section-description">
        기본 슬롯을 사용하여 메시지에 HTML 콘텐츠를 추가할 수 있습니다.
      </p>
      <div class="example-wrapper">
        <div class="example-preview">
          <UiAlert type="warning" title="중요 공지">
            <p>이 알림에는 <strong>HTML 콘텐츠</strong>가 포함되어 있습니다.</p>
            <p>자세한 내용은 <a href="#" class="alert-link">여기</a>를 참조하세요.</p>
          </UiAlert>
        </div>
        <div class="example-code">
          <pre><code>&lt;UiAlert type="warning" title="중요 공지"&gt;
  &lt;p&gt;이 알림에는 &lt;strong&gt;HTML 콘텐츠&lt;/strong&gt;가 포함되어 있습니다.&lt;/p&gt;
  &lt;p&gt;자세한 내용은 &lt;a href="#" class="alert-link"&gt;여기&lt;/a&gt;를 참조하세요.&lt;/p&gt;
&lt;/UiAlert&gt;</code></pre>
        </div>
      </div>
    </section>

    <section class="guide-section">
      <h2 class="section-title">API 참조</h2>
      <h3 class="subsection-title">Props</h3>
      <UiTable bordered>
        <colgroup>
          <col style="width: 20%">
          <col style="width: 20%">
          <col style="width: 15%">
          <col style="width: 45%">
        </colgroup>
        <thead>
          <tr>
            <th>이름</th>
            <th>타입</th>
            <th>기본값</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>modelValue</td>
            <td>Boolean</td>
            <td>true</td>
            <td>알림 표시 여부 (v-model)</td>
          </tr>
          <tr>
            <td>type</td>
            <td>String</td>
            <td>info</td>
            <td>알림 타입 (info, success, warning, error)</td>
          </tr>
          <tr>
            <td>size</td>
            <td>String</td>
            <td>medium</td>
            <td>알림 크기 (small, medium, large)</td>
          </tr>
          <tr>
            <td>title</td>
            <td>String</td>
            <td>''</td>
            <td>알림 제목</td>
          </tr>
          <tr>
            <td>message</td>
            <td>String</td>
            <td>''</td>
            <td>알림 메시지</td>
          </tr>
          <tr>
            <td>showIcon</td>
            <td>Boolean</td>
            <td>true</td>
            <td>아이콘 표시 여부</td>
          </tr>
          <tr>
            <td>closable</td>
            <td>Boolean</td>
            <td>false</td>
            <td>닫기 버튼 표시 여부</td>
          </tr>
        </tbody>
      </UiTable>

      <h3 class="subsection-title mt-4">이벤트</h3>
      <UiTable bordered>
        <colgroup>
          <col style="width: 30%">
          <col style="width: 70%">
        </colgroup>
        <thead>
          <tr>
            <th>이름</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>update:modelValue</td>
            <td>알림이 닫힐 때 발생하는 이벤트</td>
          </tr>
        </tbody>
      </UiTable>

      <h3 class="subsection-title mt-4">슬롯</h3>
      <UiTable bordered>
        <colgroup>
          <col style="width: 30%">
          <col style="width: 70%">
        </colgroup>
        <thead>
          <tr>
            <th>이름</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>default</td>
            <td>알림 메시지 내용을 커스터마이징할 수 있는 기본 슬롯</td>
          </tr>
        </tbody>
      </UiTable>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 닫기 버튼 예제용 상태
const showAlert1 = ref(true)
</script>

<style lang="scss" scoped>
.component-guide {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.guide-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #333;
}

.guide-description {
  font-size: 16px;
  line-height: 1.5;
  color: #666;
  margin-bottom: 32px;
}

.guide-section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}

.section-description {
  font-size: 14px;
  line-height: 1.5;
  color: #666;
  margin-bottom: 16px;
}

.subsection-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #333;
}

.example-wrapper {
  border: 1px solid #eee;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 16px;
}

.example-preview {
  padding: 24px;
  background-color: #fff;
}

.example-code {
  padding: 16px;
  background-color: #f8f9fa;
  border-top: 1px solid #eee;
  
  pre {
    margin: 0;
    overflow-x: auto;
    
    code {
      font-family: 'Courier New', Courier, monospace;
      font-size: 14px;
      color: #333;
    }
  }
}

.mb-3 {
  margin-bottom: 12px;
}

.mt-4 {
  margin-top: 16px;
}

// 알림 링크 스타일
:deep(.alert-link) {
  font-weight: 700;
  text-decoration: underline;
  
  &:hover {
    text-decoration: none;
  }
}
</style>
