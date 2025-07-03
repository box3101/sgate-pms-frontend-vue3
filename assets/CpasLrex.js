import U from"./CG8fDvDB.js";import{_,r,c as V,a as t,y as w,b as d,w as i,s as C,o as G,d as s}from"./Bgaeb9lX.js";const k={class:"tag-group-examples"},S={class:"example-section"},A={class:"example-container"},N={class:"component-preview"},B={class:"tags-group"},D={class:"example-section"},I={class:"example-container"},M={class:"component-preview"},R={class:"example-section"},$={class:"example-container"},z={class:"component-preview"},P={class:"example-section"},L={class:"example-container"},O={class:"component-preview"},j={class:"tags-group tags-group--vertical"},E={class:"example-section"},F={class:"example-container"},X={class:"component-preview"},q={class:"example-section"},H={class:"example-container"},J={class:"component-preview"},K={__name:"Tag",setup(Q){const f=r([{id:"tag-1",text:"마케팅",variant:"primary"},{id:"tag-2",text:"디자인",variant:"collaboration"},{id:"tag-3",text:"개발",variant:"shared"}]),l=r([{id:"tag-1",text:"마케팅",variant:"primary"},{id:"tag-2",text:"디자인",variant:"collaboration"},{id:"tag-3",text:"개발",variant:"shared"}]),b=["primary","collaboration","shared","name","completed","deadline"],p=["Frontend","Backend","UI/UX","API","Database","Testing","DevOps","Mobile"],g=()=>{const o=b[Math.floor(Math.random()*b.length)],a=p[Math.floor(Math.random()*p.length)];l.value.push({id:`tag-${Date.now()}`,text:a,variant:o,closable:!0})},m=()=>{l.value=[{id:"tag-1",text:"마케팅",variant:"primary"},{id:"tag-2",text:"디자인",variant:"collaboration"},{id:"tag-3",text:"개발",variant:"shared"}]},u=o=>{console.log("태그 추가:",o)},x=o=>{console.log("태그 삭제:",o)},T=r([{id:"vtag-1",text:"중요",variant:"completed"},{id:"vtag-2",text:"긴급",variant:"deadline"},{id:"vtag-3",text:"주의",variant:"name"}]),e=r([{id:"ltag-1",text:"태그 1",variant:"primary"},{id:"ltag-2",text:"태그 2",variant:"primary"},{id:"ltag-3",text:"태그 3",variant:"primary"}]),y=()=>{e.value.length<5&&e.value.push({id:`ltag-${Date.now()}`,text:`태그 ${e.value.length+1}`,variant:"primary",closable:!0})},h=()=>{e.value=[{id:"ltag-1",text:"태그 1",variant:"primary"},{id:"ltag-2",text:"태그 2",variant:"primary"},{id:"ltag-3",text:"태그 3",variant:"primary"}]};return(o,a)=>{const n=U,c=C("UiTagGroup");return G(),V("div",k,[a[27]||(a[27]=t("h1",{class:"page-title"},"태그 그룹 컴포넌트 사용 예시",-1)),t("section",S,[a[6]||(a[6]=t("h2",{class:"section-title"},"기본 태그 그룹",-1)),a[7]||(a[7]=t("p",{class:"section-description"},"여러 태그를 그룹으로 관리할 수 있습니다.",-1)),t("div",A,[t("div",N,[t("div",B,[d(n,{variant:"primary"},{default:i(()=>a[2]||(a[2]=[s("마케팅")])),_:1,__:[2]}),d(n,{variant:"collaboration"},{default:i(()=>a[3]||(a[3]=[s("디자인")])),_:1,__:[3]}),d(n,{variant:"shared"},{default:i(()=>a[4]||(a[4]=[s("개발")])),_:1,__:[4]})])]),a[5]||(a[5]=t("div",{class:"code-example"},[t("pre",null,[t("code",null,`<div class="tags-group">
  <UiTag variant="primary">마케팅</UiTag>
  <UiTag variant="collaboration">디자인</UiTag>
  <UiTag variant="shared">개발</UiTag>
</div>`)])],-1))])]),t("section",D,[a[9]||(a[9]=t("h2",{class:"section-title"},"태그 그룹 컴포넌트",-1)),a[10]||(a[10]=t("p",{class:"section-description"}," UiTagGroup 컴포넌트를 사용하여 모델 기반 태그 관리가 가능합니다. ",-1)),t("div",I,[t("div",M,[d(c,{"model-value":f.value},null,8,["model-value"])]),a[8]||(a[8]=t("div",{class:"code-example"},[t("pre",null,[t("code",null,`<UiTagGroup :model-value="basicTags" />

// script
const basicTags = ref([
  { id: 'tag-1', text: '마케팅', variant: 'primary' },
  { id: 'tag-2', text: '디자인', variant: 'collaboration' },
  { id: 'tag-3', text: '개발', variant: 'shared' }
])`)])],-1))])]),t("section",R,[a[12]||(a[12]=t("h2",{class:"section-title"},"인터랙티브 태그 그룹",-1)),a[13]||(a[13]=t("p",{class:"section-description"},"사용자가 태그를 추가하고 제거할 수 있는 태그 그룹입니다.",-1)),t("div",$,[t("div",z,[d(c,{modelValue:l.value,"onUpdate:modelValue":a[0]||(a[0]=v=>l.value=v),addable:!0,onAdd:u,onRemove:x},null,8,["modelValue"]),t("div",{class:"action-buttons"},[t("button",{class:"action-button",onClick:g},"랜덤 태그 추가"),t("button",{class:"action-button",onClick:m},"초기화")])]),a[11]||(a[11]=t("div",{class:"code-example"},[t("pre",null,[t("code",null,`<UiTagGroup
  v-model="interactiveTags"
  :addable="true"
  @add="handleTagAdd"
  @remove="handleTagRemove"
/>

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
}`)])],-1))])]),t("section",P,[a[18]||(a[18]=t("h2",{class:"section-title"},"수직 태그 그룹",-1)),a[19]||(a[19]=t("p",{class:"section-description"},"태그를 수직으로 정렬하는 태그 그룹입니다.",-1)),t("div",L,[t("div",O,[t("div",j,[d(n,{variant:"completed"},{default:i(()=>a[14]||(a[14]=[s("중요")])),_:1,__:[14]}),d(n,{variant:"deadline"},{default:i(()=>a[15]||(a[15]=[s("긴급")])),_:1,__:[15]}),d(n,{variant:"name"},{default:i(()=>a[16]||(a[16]=[s("주의")])),_:1,__:[16]})])]),a[17]||(a[17]=t("div",{class:"code-example"},[t("pre",null,[t("code",null,`<div class="tags-group tags-group--vertical">
  <UiTag variant="completed">중요</UiTag>
  <UiTag variant="deadline">긴급</UiTag>
  <UiTag variant="name">주의</UiTag>
</div>`)])],-1))])]),t("section",E,[a[21]||(a[21]=t("h2",{class:"section-title"},"수직 태그 그룹 컴포넌트",-1)),a[22]||(a[22]=t("p",{class:"section-description"},"UiTagGroup 컴포넌트를 사용하여 수직 정렬할 수 있습니다.",-1)),t("div",F,[t("div",X,[d(c,{"model-value":T.value,vertical:!0},null,8,["model-value"])]),a[20]||(a[20]=t("div",{class:"code-example"},[t("pre",null,[t("code",null,`<UiTagGroup
  :model-value="verticalTags"
  :vertical="true"
/>

// script
const verticalTags = ref([
  { id: 'vtag-1', text: '중요', variant: 'completed' },
  { id: 'vtag-2', text: '긴급', variant: 'deadline' },
  { id: 'vtag-3', text: '주의', variant: 'name' }
])`)])],-1))])]),t("section",q,[a[25]||(a[25]=t("h2",{class:"section-title"},"최대 태그 수 제한",-1)),a[26]||(a[26]=t("p",{class:"section-description"}," 태그 그룹에 추가할 수 있는 최대 태그 수를 제한할 수 있습니다. ",-1)),t("div",H,[t("div",J,[d(c,{modelValue:e.value,"onUpdate:modelValue":a[1]||(a[1]=v=>e.value=v),addable:!0,"max-tags":5},null,8,["modelValue"]),t("div",{class:"action-buttons"},[t("button",{class:"action-button",onClick:y},"태그 추가"),t("button",{class:"action-button",onClick:h},"초기화")]),a[23]||(a[23]=t("p",{class:"help-text"},"최대 5개까지 태그를 추가할 수 있습니다.",-1))]),a[24]||(a[24]=t("div",{class:"code-example"},[t("pre",null,[t("code",null,`<UiTagGroup
  v-model="limitedTags"
  :addable="true"
  :max-tags="5"
/>

// script
const limitedTags = ref([
  { id: 'ltag-1', text: '태그 1', variant: 'primary' },
  { id: 'ltag-2', text: '태그 2', variant: 'primary' },
  { id: 'ltag-3', text: '태그 3', variant: 'primary' }
])`)])],-1))])]),a[28]||(a[28]=w(`<section class="example-section" data-v-acbf67a2><h2 class="section-title" data-v-acbf67a2>태그 그룹 스타일 클래스</h2><div class="style-table-container" data-v-acbf67a2><table class="style-table" data-v-acbf67a2><thead data-v-acbf67a2><tr data-v-acbf67a2><th data-v-acbf67a2>클래스명</th><th data-v-acbf67a2>설명</th></tr></thead><tbody data-v-acbf67a2><tr data-v-acbf67a2><td data-v-acbf67a2><code data-v-acbf67a2>.tags-group</code></td><td data-v-acbf67a2>기본 태그 그룹 스타일. 가로 배열로 태그를 나열하고 8px의 간격을 제공합니다.</td></tr><tr data-v-acbf67a2><td data-v-acbf67a2><code data-v-acbf67a2>.tags-group--vertical</code></td><td data-v-acbf67a2>태그를 세로로 정렬합니다. 수직 레이아웃이 필요할 때 사용합니다.</td></tr></tbody></table></div><div class="code-example" data-v-acbf67a2><pre data-v-acbf67a2><code data-v-acbf67a2>// SCSS
.tags-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  &amp;--vertical {
    flex-direction: column;
    align-items: flex-start;
  }
}</code></pre></div></section><section class="example-section" data-v-acbf67a2><h2 class="section-title" data-v-acbf67a2>UiTagGroup Props</h2><table class="props-table" data-v-acbf67a2><thead data-v-acbf67a2><tr data-v-acbf67a2><th data-v-acbf67a2>Prop 이름</th><th data-v-acbf67a2>타입</th><th data-v-acbf67a2>기본값</th><th data-v-acbf67a2>설명</th></tr></thead><tbody data-v-acbf67a2><tr data-v-acbf67a2><td data-v-acbf67a2><code data-v-acbf67a2>modelValue</code></td><td data-v-acbf67a2>Array</td><td data-v-acbf67a2><code data-v-acbf67a2>[]</code></td><td data-v-acbf67a2> 태그 배열을 나타내는 v-model 데이터입니다. 각 태그는 <code data-v-acbf67a2>{ id, text, variant, size, closable, backgroundColor, textColor, borderColor }</code> 형식의 객체입니다. </td></tr><tr data-v-acbf67a2><td data-v-acbf67a2><code data-v-acbf67a2>defaultVariant</code></td><td data-v-acbf67a2>String</td><td data-v-acbf67a2><code data-v-acbf67a2>&#39;default&#39;</code></td><td data-v-acbf67a2>태그 추가 시 적용할 기본 variant 값입니다.</td></tr><tr data-v-acbf67a2><td data-v-acbf67a2><code data-v-acbf67a2>defaultSize</code></td><td data-v-acbf67a2>String</td><td data-v-acbf67a2><code data-v-acbf67a2>&#39;medium&#39;</code></td><td data-v-acbf67a2>태그 추가 시 적용할 기본 size 값입니다.</td></tr><tr data-v-acbf67a2><td data-v-acbf67a2><code data-v-acbf67a2>addable</code></td><td data-v-acbf67a2>Boolean</td><td data-v-acbf67a2><code data-v-acbf67a2>false</code></td><td data-v-acbf67a2>사용자가 태그를 추가할 수 있는 버튼을 표시할지 여부입니다.</td></tr><tr data-v-acbf67a2><td data-v-acbf67a2><code data-v-acbf67a2>vertical</code></td><td data-v-acbf67a2>Boolean</td><td data-v-acbf67a2><code data-v-acbf67a2>false</code></td><td data-v-acbf67a2>태그를 수직으로 정렬할지 여부입니다.</td></tr><tr data-v-acbf67a2><td data-v-acbf67a2><code data-v-acbf67a2>maxTags</code></td><td data-v-acbf67a2>Number</td><td data-v-acbf67a2><code data-v-acbf67a2>Infinity</code></td><td data-v-acbf67a2>최대로 추가할 수 있는 태그 개수입니다.</td></tr></tbody></table></section><section class="example-section" data-v-acbf67a2><h2 class="section-title" data-v-acbf67a2>UiTagGroup 이벤트</h2><table class="events-table" data-v-acbf67a2><thead data-v-acbf67a2><tr data-v-acbf67a2><th data-v-acbf67a2>이벤트 이름</th><th data-v-acbf67a2>파라미터</th><th data-v-acbf67a2>설명</th></tr></thead><tbody data-v-acbf67a2><tr data-v-acbf67a2><td data-v-acbf67a2><code data-v-acbf67a2>update:modelValue</code></td><td data-v-acbf67a2>Array</td><td data-v-acbf67a2>태그 추가/제거 후 업데이트된 태그 배열입니다. v-model을 위해 사용됩니다.</td></tr><tr data-v-acbf67a2><td data-v-acbf67a2><code data-v-acbf67a2>add</code></td><td data-v-acbf67a2>Object</td><td data-v-acbf67a2>새로운 태그가 추가되었을 때 발생합니다. 추가된 태그 객체를 전달합니다.</td></tr><tr data-v-acbf67a2><td data-v-acbf67a2><code data-v-acbf67a2>remove</code></td><td data-v-acbf67a2>String</td><td data-v-acbf67a2>태그가 제거되었을 때 발생합니다. 제거된 태그의 ID를 전달합니다.</td></tr></tbody></table></section>`,3))])}}},Z=_(K,[["__scopeId","data-v-acbf67a2"]]);export{Z as default};
