import{_ as T}from"./BBwbQ_Yi.js";import{_ as V,r as l,c as h,a,y as g,b as o,o as U}from"./md_L_G0h.js";const w={class:"container"},z={class:"component-section"},S={class:"component-demo"},_={class:"component-section"},y={class:"component-demo"},B={class:"component-row"},L={class:"component-row"},k={class:"component-row"},M={class:"component-row"},N={class:"component-section"},E={class:"component-demo"},X={class:"component-row"},C={class:"component-row"},I={class:"component-row"},P={class:"component-section"},q={class:"component-demo"},A={class:"component-row"},j={class:"component-row"},D={class:"component-row"},F={class:"component-section"},G={class:"component-demo"},H={__name:"Textarea",setup(J){const n=l(""),r=l(""),s=l(""),c=l(""),v=l(""),i=l(""),f=l(""),m=l("이 텍스트는 변경할 수 없습니다"),u=l(""),p=l(""),x=l(""),b=l("");return(K,t)=>{const d=T;return U(),h("div",w,[t[22]||(t[22]=a("h1",{class:"page-title"},"텍스트영역(Textarea) 컴포넌트",-1)),t[23]||(t[23]=a("p",{class:"page-description"}," 텍스트영역 컴포넌트는 사용자가 여러 줄의 텍스트를 입력할 수 있는 UI 요소입니다. 다양한 크기와 상태를 지원합니다. ",-1)),a("section",z,[t[12]||(t[12]=a("h2",{class:"section-title"},"기본 텍스트영역",-1)),a("div",S,[o(d,{modelValue:n.value,"onUpdate:modelValue":t[0]||(t[0]=e=>n.value=e),label:"기본 텍스트영역",placeholder:"여기에 텍스트를 입력하세요",helperText:"이것은 도움말 텍스트입니다"},null,8,["modelValue"])]),t[13]||(t[13]=a("div",{class:"code-example"},[a("pre",null,[a("code",null,`<UiTextarea
  v-model="basicTextarea"
  label="기본 텍스트영역"
  placeholder="여기에 텍스트를 입력하세요"
  helperText="이것은 도움말 텍스트입니다"
/>`)])],-1))]),a("section",_,[t[14]||(t[14]=a("h2",{class:"section-title"},"크기 변형",-1)),a("div",y,[a("div",B,[o(d,{modelValue:r.value,"onUpdate:modelValue":t[1]||(t[1]=e=>r.value=e),label:"Small 텍스트영역",placeholder:"Small 크기",size:"small"},null,8,["modelValue"])]),a("div",L,[o(d,{modelValue:s.value,"onUpdate:modelValue":t[2]||(t[2]=e=>s.value=e),label:"Medium 텍스트영역",placeholder:"Medium 크기",size:"medium"},null,8,["modelValue"])]),a("div",k,[o(d,{modelValue:c.value,"onUpdate:modelValue":t[3]||(t[3]=e=>c.value=e),label:"Large 텍스트영역",placeholder:"Large 크기",size:"large"},null,8,["modelValue"])]),a("div",M,[o(d,{modelValue:v.value,"onUpdate:modelValue":t[4]||(t[4]=e=>v.value=e),label:"XLarge 텍스트영역",placeholder:"XLarge 크기",size:"xlarge"},null,8,["modelValue"])])]),t[15]||(t[15]=a("div",{class:"code-example"},[a("pre",null,[a("code",null,`<UiTextarea
  v-model="smallTextarea"
  label="Small 텍스트영역"
  placeholder="Small 크기"
  size="small"
/>

<UiTextarea
  v-model="mediumTextarea"
  label="Medium 텍스트영역"
  placeholder="Medium 크기"
  size="medium"
/>

<UiTextarea
  v-model="largeTextarea"
  label="Large 텍스트영역"
  placeholder="Large 크기"
  size="large"
/>

<UiTextarea
  v-model="xlargeTextarea"
  label="XLarge 텍스트영역"
  placeholder="XLarge 크기"
  size="xlarge"
/>`)])],-1))]),a("section",N,[t[16]||(t[16]=a("h2",{class:"section-title"},"상태 변형",-1)),a("div",E,[a("div",X,[o(d,{modelValue:i.value,"onUpdate:modelValue":t[5]||(t[5]=e=>i.value=e),label:"오류 상태",placeholder:"오류 상태의 텍스트영역",error:"",errorMessage:"이것은 오류 메시지입니다"},null,8,["modelValue"])]),a("div",C,[o(d,{modelValue:f.value,"onUpdate:modelValue":t[6]||(t[6]=e=>f.value=e),label:"비활성화 상태",placeholder:"비활성화된 텍스트영역",disabled:""},null,8,["modelValue"])]),a("div",I,[o(d,{modelValue:m.value,"onUpdate:modelValue":t[7]||(t[7]=e=>m.value=e),label:"읽기 전용 상태",placeholder:"읽기 전용 텍스트영역",readonly:""},null,8,["modelValue"])])]),t[17]||(t[17]=a("div",{class:"code-example"},[a("pre",null,[a("code",null,`<UiTextarea
  v-model="errorTextarea"
  label="오류 상태"
  placeholder="오류 상태의 텍스트영역"
  error
  errorMessage="이것은 오류 메시지입니다"
/>

<UiTextarea
  v-model="disabledTextarea"
  label="비활성화 상태"
  placeholder="비활성화된 텍스트영역"
  disabled
/>

<UiTextarea
  v-model="readonlyTextarea"
  label="읽기 전용 상태"
  placeholder="읽기 전용 텍스트영역"
  readonly
  :modelValue="'이 텍스트는 변경할 수 없습니다'"
/>`)])],-1))]),a("section",P,[t[18]||(t[18]=a("h2",{class:"section-title"},"추가 기능",-1)),a("div",q,[a("div",A,[o(d,{modelValue:u.value,"onUpdate:modelValue":t[8]||(t[8]=e=>u.value=e),label:"크기 조절 가능",placeholder:"이 텍스트영역은 크기를 조절할 수 있습니다",resizable:""},null,8,["modelValue"])]),a("div",j,[o(d,{modelValue:p.value,"onUpdate:modelValue":t[9]||(t[9]=e=>p.value=e),label:"글자 수 표시",placeholder:"최대 100자까지 입력 가능합니다",maxlength:"100",showCount:""},null,8,["modelValue"])]),a("div",D,[o(d,{modelValue:x.value,"onUpdate:modelValue":t[10]||(t[10]=e=>x.value=e),label:"행 수 지정",placeholder:"이 텍스트영역은 8줄로 표시됩니다",rows:8},null,8,["modelValue"])])]),t[19]||(t[19]=a("div",{class:"code-example"},[a("pre",null,[a("code",null,`<UiTextarea
  v-model="resizableTextarea"
  label="크기 조절 가능"
  placeholder="이 텍스트영역은 크기를 조절할 수 있습니다"
  resizable
/>

<UiTextarea
  v-model="countTextarea"
  label="글자 수 표시"
  placeholder="최대 100자까지 입력 가능합니다"
  maxlength="100"
  showCount
/>

<UiTextarea
  v-model="rowsTextarea"
  label="행 수 지정"
  placeholder="이 텍스트영역은 8줄로 표시됩니다"
  :rows="8"
/>`)])],-1))]),a("section",F,[t[20]||(t[20]=a("h2",{class:"section-title"},"전체 너비",-1)),a("div",G,[o(d,{modelValue:b.value,"onUpdate:modelValue":t[11]||(t[11]=e=>b.value=e),label:"전체 너비 텍스트영역",placeholder:"이 텍스트영역은 전체 너비를 차지합니다",block:""},null,8,["modelValue"])]),t[21]||(t[21]=a("div",{class:"code-example"},[a("pre",null,[a("code",null,`<UiTextarea
  v-model="blockTextarea"
  label="전체 너비 텍스트영역"
  placeholder="이 텍스트영역은 전체 너비를 차지합니다"
  block
/>`)])],-1))]),t[24]||(t[24]=g('<section class="component-section" data-v-f9c51993><h2 class="section-title" data-v-f9c51993>API</h2><div class="api-docs" data-v-f9c51993><h3 data-v-f9c51993>Props</h3><table class="api-table" data-v-f9c51993><thead data-v-f9c51993><tr data-v-f9c51993><th data-v-f9c51993>이름</th><th data-v-f9c51993>타입</th><th data-v-f9c51993>기본값</th><th data-v-f9c51993>설명</th></tr></thead><tbody data-v-f9c51993><tr data-v-f9c51993><td data-v-f9c51993>modelValue</td><td data-v-f9c51993>String</td><td data-v-f9c51993>&#39;&#39;</td><td data-v-f9c51993>텍스트영역의 값</td></tr><tr data-v-f9c51993><td data-v-f9c51993>label</td><td data-v-f9c51993>String</td><td data-v-f9c51993>&#39;&#39;</td><td data-v-f9c51993>텍스트영역의 레이블</td></tr><tr data-v-f9c51993><td data-v-f9c51993>placeholder</td><td data-v-f9c51993>String</td><td data-v-f9c51993>&#39;&#39;</td><td data-v-f9c51993>텍스트영역의 플레이스홀더</td></tr><tr data-v-f9c51993><td data-v-f9c51993>size</td><td data-v-f9c51993>String</td><td data-v-f9c51993>&#39;medium&#39;</td><td data-v-f9c51993>텍스트영역의 크기 (small, medium, large, xlarge)</td></tr><tr data-v-f9c51993><td data-v-f9c51993>rows</td><td data-v-f9c51993>Number, String</td><td data-v-f9c51993>4</td><td data-v-f9c51993>텍스트영역의 행 수</td></tr><tr data-v-f9c51993><td data-v-f9c51993>disabled</td><td data-v-f9c51993>Boolean</td><td data-v-f9c51993>false</td><td data-v-f9c51993>텍스트영역의 비활성화 여부</td></tr><tr data-v-f9c51993><td data-v-f9c51993>readonly</td><td data-v-f9c51993>Boolean</td><td data-v-f9c51993>false</td><td data-v-f9c51993>텍스트영역의 읽기 전용 여부</td></tr><tr data-v-f9c51993><td data-v-f9c51993>required</td><td data-v-f9c51993>Boolean</td><td data-v-f9c51993>false</td><td data-v-f9c51993>텍스트영역의 필수 입력 여부</td></tr><tr data-v-f9c51993><td data-v-f9c51993>block</td><td data-v-f9c51993>Boolean</td><td data-v-f9c51993>false</td><td data-v-f9c51993>텍스트영역의 전체 너비 사용 여부</td></tr><tr data-v-f9c51993><td data-v-f9c51993>error</td><td data-v-f9c51993>Boolean</td><td data-v-f9c51993>false</td><td data-v-f9c51993>텍스트영역의 오류 상태 여부</td></tr><tr data-v-f9c51993><td data-v-f9c51993>errorMessage</td><td data-v-f9c51993>String</td><td data-v-f9c51993>&#39;&#39;</td><td data-v-f9c51993>텍스트영역의 오류 메시지</td></tr><tr data-v-f9c51993><td data-v-f9c51993>helperText</td><td data-v-f9c51993>String</td><td data-v-f9c51993>&#39;&#39;</td><td data-v-f9c51993>텍스트영역의 도움말 텍스트</td></tr><tr data-v-f9c51993><td data-v-f9c51993>maxlength</td><td data-v-f9c51993>Number, String</td><td data-v-f9c51993>undefined</td><td data-v-f9c51993>텍스트영역의 최대 글자 수</td></tr><tr data-v-f9c51993><td data-v-f9c51993>showCount</td><td data-v-f9c51993>Boolean</td><td data-v-f9c51993>false</td><td data-v-f9c51993>텍스트영역의 글자 수 표시 여부</td></tr><tr data-v-f9c51993><td data-v-f9c51993>resizable</td><td data-v-f9c51993>Boolean</td><td data-v-f9c51993>true</td><td data-v-f9c51993>텍스트영역의 크기 조절 가능 여부</td></tr></tbody></table><h3 data-v-f9c51993>이벤트</h3><table class="api-table" data-v-f9c51993><thead data-v-f9c51993><tr data-v-f9c51993><th data-v-f9c51993>이름</th><th data-v-f9c51993>파라미터</th><th data-v-f9c51993>설명</th></tr></thead><tbody data-v-f9c51993><tr data-v-f9c51993><td data-v-f9c51993>update:modelValue</td><td data-v-f9c51993>String</td><td data-v-f9c51993>텍스트영역의 값이 변경될 때 발생</td></tr><tr data-v-f9c51993><td data-v-f9c51993>focus</td><td data-v-f9c51993>Event</td><td data-v-f9c51993>텍스트영역이 포커스를 받을 때 발생</td></tr><tr data-v-f9c51993><td data-v-f9c51993>blur</td><td data-v-f9c51993>Event</td><td data-v-f9c51993>텍스트영역이 포커스를 잃을 때 발생</td></tr><tr data-v-f9c51993><td data-v-f9c51993>change</td><td data-v-f9c51993>Event</td><td data-v-f9c51993>텍스트영역의 값이 변경되고 포커스를 잃을 때 발생</td></tr></tbody></table></div></section>',1))])}}},R=V(H,[["__scopeId","data-v-f9c51993"]]);export{R as default};
