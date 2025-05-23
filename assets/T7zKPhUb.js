import U from"./C5ykl_uF.js";import{_ as g,r as i,e as p,c as h,a as l,b as o,w as f,t as w,o as z,d as V}from"./DX1bNEQm.js";const y={class:"checkbox-examples"},A={class:"example-section"},_={class:"example-container"},j={class:"example-preview"},S={class:"example-section"},T={class:"example-container"},O={class:"example-preview"},B={class:"checkbox-size-group"},N={class:"example-section"},E={class:"example-container"},L={class:"example-preview"},D={class:"example-section"},I={class:"example-container"},q={class:"example-preview"},F={class:"example-section"},G={class:"example-container"},H={class:"example-preview"},J={class:"checkbox-group"},K={class:"checkbox-result"},M={class:"example-section"},P={class:"example-container"},Q={class:"example-preview"},R={class:"checkbox-group"},W={class:"sub-checkboxes"},X={__name:"Checkbox",setup(Y){const b=i(!1),n=p({small:!1,medium:!0,large:!1}),c=i(!1),v=i(!0),x=i(!1),d=p({apple:!0,banana:!1,orange:!0,grape:!1,strawberry:!1}),t=p({service:!1,privacy:!1,marketing:!1}),m=i(!1),C=u=>{Object.keys(t).forEach(e=>{t[e]=u})},r=()=>{const u=Object.values(t).every(e=>e===!0);Object.values(t).some(e=>e===!0),m.value=!!u};return(u,e)=>{const a=U;return z(),h("div",y,[e[30]||(e[30]=l("h1",{class:"page-title"},"체크박스 컴포넌트",-1)),e[31]||(e[31]=l("p",{class:"page-description"},"다양한 상태와 옵션을 가진 체크박스 컴포넌트 사용 예시입니다.",-1)),l("div",A,[e[17]||(e[17]=l("h2",{class:"section-title"},"기본 체크박스",-1)),l("div",_,[l("div",j,[o(a,{modelValue:b.value,"onUpdate:modelValue":e[0]||(e[0]=s=>b.value=s),label:"기본 체크박스"},null,8,["modelValue"])]),e[16]||(e[16]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,'<UiCheckbox v-model="basicCheckbox" label="기본 체크박스" />')])],-1))])]),l("div",S,[e[19]||(e[19]=l("h2",{class:"section-title"},"체크박스 크기",-1)),l("div",T,[l("div",O,[l("div",B,[o(a,{modelValue:n.small,"onUpdate:modelValue":e[1]||(e[1]=s=>n.small=s),label:"작은 크기",size:"small"},null,8,["modelValue"]),o(a,{modelValue:n.medium,"onUpdate:modelValue":e[2]||(e[2]=s=>n.medium=s),label:"중간 크기",size:"medium"},null,8,["modelValue"]),o(a,{modelValue:n.large,"onUpdate:modelValue":e[3]||(e[3]=s=>n.large=s),label:"큰 크기",size:"large"},null,8,["modelValue"])])]),e[18]||(e[18]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiCheckbox v-model="sizeCheckboxes.small" label="작은 크기" size="small" />
<UiCheckbox v-model="sizeCheckboxes.medium" label="중간 크기" size="medium" />
<UiCheckbox v-model="sizeCheckboxes.large" label="큰 크기" size="large" />`)])],-1))])]),l("div",N,[e[21]||(e[21]=l("h2",{class:"section-title"},"비활성화된 체크박스",-1)),l("div",E,[l("div",L,[o(a,{modelValue:c.value,"onUpdate:modelValue":e[4]||(e[4]=s=>c.value=s),label:"비활성화 (미선택)",disabled:""},null,8,["modelValue"]),o(a,{modelValue:v.value,"onUpdate:modelValue":e[5]||(e[5]=s=>v.value=s),label:"비활성화 (선택됨)",disabled:""},null,8,["modelValue"])]),e[20]||(e[20]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiCheckbox v-model="disabledUnchecked" label="비활성화 (미선택)" disabled />
<UiCheckbox v-model="disabledChecked" label="비활성화 (선택됨)" disabled />`)])],-1))])]),l("div",D,[e[24]||(e[24]=l("h2",{class:"section-title"},"슬롯을 사용한 커스텀 라벨",-1)),l("div",I,[l("div",q,[o(a,{modelValue:x.value,"onUpdate:modelValue":e[6]||(e[6]=s=>x.value=s)},{default:f(()=>e[22]||(e[22]=[l("span",{class:"custom-label"},[V("커스텀 라벨 "),l("span",{class:"highlight"},"강조"),V(" 텍스트")],-1)])),_:1},8,["modelValue"])]),e[23]||(e[23]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiCheckbox v-model="customLabelCheckbox">
  <span class="custom-label">커스텀 라벨 <span class="highlight">강조</span> 텍스트</span>
</UiCheckbox>`)])],-1))])]),l("div",F,[e[27]||(e[27]=l("h2",{class:"section-title"},"체크박스 그룹",-1)),l("div",G,[l("div",H,[l("div",J,[e[25]||(e[25]=l("h3",{class:"group-title"},"좋아하는 과일을 선택하세요",-1)),o(a,{modelValue:d.apple,"onUpdate:modelValue":e[7]||(e[7]=s=>d.apple=s),label:"사과"},null,8,["modelValue"]),o(a,{modelValue:d.banana,"onUpdate:modelValue":e[8]||(e[8]=s=>d.banana=s),label:"바나나"},null,8,["modelValue"]),o(a,{modelValue:d.orange,"onUpdate:modelValue":e[9]||(e[9]=s=>d.orange=s),label:"오렌지"},null,8,["modelValue"]),o(a,{modelValue:d.grape,"onUpdate:modelValue":e[10]||(e[10]=s=>d.grape=s),label:"포도"},null,8,["modelValue"]),o(a,{modelValue:d.strawberry,"onUpdate:modelValue":e[11]||(e[11]=s=>d.strawberry=s),label:"딸기"},null,8,["modelValue"])]),l("div",K,[l("p",null," 선택한 과일: "+w(Object.entries(d).filter(([s,k])=>k).map(([s,k])=>{switch(s){case"apple":return"사과";case"banana":return"바나나";case"orange":return"오렌지";case"grape":return"포도";case"strawberry":return"딸기"}}).join(", ")||"없음"),1)])]),e[26]||(e[26]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<div class="checkbox-group">
  <h3 class="group-title">좋아하는 과일을 선택하세요</h3>
  <UiCheckbox v-model="fruitCheckboxes.apple" label="사과" />
  <UiCheckbox v-model="fruitCheckboxes.banana" label="바나나" />
  <UiCheckbox v-model="fruitCheckboxes.orange" label="오렌지" />
  <UiCheckbox v-model="fruitCheckboxes.grape" label="포도" />
  <UiCheckbox v-model="fruitCheckboxes.strawberry" label="딸기" />
</div>`)])],-1))])]),l("div",M,[e[29]||(e[29]=l("h2",{class:"section-title"},"전체 선택 기능",-1)),l("div",P,[l("div",Q,[l("div",R,[o(a,{modelValue:m.value,"onUpdate:modelValue":[e[12]||(e[12]=s=>m.value=s),C],label:"모든 약관에 동의합니다",size:"large"},null,8,["modelValue"]),l("div",W,[o(a,{modelValue:t.service,"onUpdate:modelValue":[e[13]||(e[13]=s=>t.service=s),r],label:"서비스 이용약관 동의 (필수)"},null,8,["modelValue"]),o(a,{modelValue:t.privacy,"onUpdate:modelValue":[e[14]||(e[14]=s=>t.privacy=s),r],label:"개인정보 수집 및 이용 동의 (필수)"},null,8,["modelValue"]),o(a,{modelValue:t.marketing,"onUpdate:modelValue":[e[15]||(e[15]=s=>t.marketing=s),r],label:"마케팅 정보 수신 동의 (선택)"},null,8,["modelValue"])])])]),e[28]||(e[28]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiCheckbox
  v-model="selectAllTerms"
  label="모든 약관에 동의합니다"
  size="large"
  @update:modelValue="updateAllTerms"
/>
<div class="sub-checkboxes">
  <UiCheckbox
    v-model="termsCheckboxes.service"
    label="서비스 이용약관 동의 (필수)"
    @update:modelValue="updateSelectAll"
  />
  <UiCheckbox
    v-model="termsCheckboxes.privacy"
    label="개인정보 수집 및 이용 동의 (필수)"
    @update:modelValue="updateSelectAll"
  />
  <UiCheckbox
    v-model="termsCheckboxes.marketing"
    label="마케팅 정보 수신 동의 (선택)"
    @update:modelValue="updateSelectAll"
  />
</div>`)])],-1))])])])}}},ee=g(X,[["__scopeId","data-v-ac07ded1"]]);export{ee as default};
