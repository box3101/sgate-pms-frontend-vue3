import p from"./bZUzg_Gp.js";import m from"./g-hRwI9Z.js";import c from"./BnRnAoh2.js";import{_ as g,r as w,c as v,a as l,b as s,z as f,k as y,w as n,o as u,d as i}from"./CMINZ7Hp.js";import"./DrceWSck.js";import"./DQtIoFVA.js";const x={class:"component-guide"},A={class:"guide-section"},U={class:"example-wrapper"},b={class:"example-preview"},_={class:"guide-section"},B={class:"example-wrapper"},k={class:"example-preview"},z={class:"guide-section"},V={class:"example-wrapper"},I={class:"example-preview"},T={class:"guide-section"},N={class:"example-wrapper"},S={class:"example-preview"},C={class:"guide-section"},H={class:"example-wrapper"},L={class:"example-preview"},M={class:"guide-section"},$={class:"example-wrapper"},P={class:"example-preview"},h={class:"guide-section"},E={class:"example-wrapper"},j={class:"example-preview"},q={class:"guide-section"},D={__name:"Alert",setup(F){const o=w(!0);return(G,e)=>{const t=p,a=m,d=c;return u(),v("div",x,[e[31]||(e[31]=l("h1",{class:"guide-title"},"UiAlert 컴포넌트",-1)),e[32]||(e[32]=l("p",{class:"guide-description"}," UiAlert 컴포넌트는 사용자에게 중요한 정보를 알려주는 알림 컴포넌트입니다. 다양한 타입(정보, 성공, 경고, 에러)과 크기를 지원합니다. ",-1)),l("section",A,[e[3]||(e[3]=l("h2",{class:"section-title"},"기본 사용법",-1)),l("div",U,[l("div",b,[s(t,{message:"기본 알림 메시지입니다."})]),e[2]||(e[2]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,'<UiAlert message="기본 알림 메시지입니다." />')])],-1))])]),l("section",_,[e[5]||(e[5]=l("h2",{class:"section-title"},"알림 타입",-1)),e[6]||(e[6]=l("p",{class:"section-description"}," UiAlert 컴포넌트는 4가지 타입(info, success, warning, error)을 지원합니다. ",-1)),l("div",B,[l("div",k,[s(t,{type:"info",message:"정보 알림 메시지입니다.",class:"mb-3"}),s(t,{type:"success",message:"성공 알림 메시지입니다.",class:"mb-3"}),s(t,{type:"warning",message:"경고 알림 메시지입니다.",class:"mb-3"}),s(t,{type:"error",message:"에러 알림 메시지입니다."})]),e[4]||(e[4]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiAlert type="info" message="정보 알림 메시지입니다." />
<UiAlert type="success" message="성공 알림 메시지입니다." />
<UiAlert type="warning" message="경고 알림 메시지입니다." />
<UiAlert type="error" message="에러 알림 메시지입니다." />`)])],-1))])]),l("section",z,[e[8]||(e[8]=l("h2",{class:"section-title"},"제목 추가",-1)),e[9]||(e[9]=l("p",{class:"section-description"}," title 속성을 사용하여 알림에 제목을 추가할 수 있습니다. ",-1)),l("div",V,[l("div",I,[s(t,{type:"info",title:"정보 알림",message:"제목이 있는 정보 알림 메시지입니다.",class:"mb-3"}),s(t,{type:"success",title:"성공 알림",message:"제목이 있는 성공 알림 메시지입니다."})]),e[7]||(e[7]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiAlert 
  type="info" 
  title="정보 알림" 
  message="제목이 있는 정보 알림 메시지입니다." 
/>
<UiAlert 
  type="success" 
  title="성공 알림" 
  message="제목이 있는 성공 알림 메시지입니다." 
/>`)])],-1))])]),l("section",T,[e[11]||(e[11]=l("h2",{class:"section-title"},"크기 옵션",-1)),e[12]||(e[12]=l("p",{class:"section-description"}," size 속성을 사용하여 알림의 크기를 조절할 수 있습니다. (small, medium, large) ",-1)),l("div",N,[l("div",S,[s(t,{size:"small",type:"info",title:"작은 크기",message:"작은 크기의 알림 메시지입니다.",class:"mb-3"}),s(t,{size:"medium",type:"success",title:"중간 크기",message:"중간 크기의 알림 메시지입니다.",class:"mb-3"}),s(t,{size:"large",type:"warning",title:"큰 크기",message:"큰 크기의 알림 메시지입니다."})]),e[10]||(e[10]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiAlert 
  size="small" 
  type="info" 
  title="작은 크기" 
  message="작은 크기의 알림 메시지입니다." 
/>
<UiAlert 
  size="medium" 
  type="success" 
  title="중간 크기" 
  message="중간 크기의 알림 메시지입니다." 
/>
<UiAlert 
  size="large" 
  type="warning" 
  title="큰 크기" 
  message="큰 크기의 알림 메시지입니다." 
/>`)])],-1))])]),l("section",C,[e[14]||(e[14]=l("h2",{class:"section-title"},"아이콘 숨기기",-1)),e[15]||(e[15]=l("p",{class:"section-description"}," showIcon 속성을 false로 설정하여 아이콘을 숨길 수 있습니다. ",-1)),l("div",H,[l("div",L,[s(t,{type:"info",title:"아이콘 없음",message:"아이콘이 없는 알림 메시지입니다.",showIcon:!1})]),e[13]||(e[13]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiAlert 
  type="info" 
  title="아이콘 없음" 
  message="아이콘이 없는 알림 메시지입니다." 
  :showIcon="false" 
/>`)])],-1))])]),l("section",M,[e[18]||(e[18]=l("h2",{class:"section-title"},"닫기 버튼",-1)),e[19]||(e[19]=l("p",{class:"section-description"}," closable 속성을 true로 설정하고 v-model을 사용하여 닫기 기능을 추가할 수 있습니다. ",-1)),l("div",$,[l("div",P,[s(t,{modelValue:o.value,"onUpdate:modelValue":e[0]||(e[0]=r=>o.value=r),type:"info",title:"닫기 가능",message:"닫기 버튼이 있는 알림 메시지입니다.",closable:!0,class:"mb-3"},null,8,["modelValue"]),o.value?y("",!0):(u(),f(a,{key:0,onClick:e[1]||(e[1]=r=>o.value=!0)},{default:n(()=>e[16]||(e[16]=[i("알림 다시 표시")])),_:1}))]),e[17]||(e[17]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiAlert 
  v-model="showAlert1"
  type="info" 
  title="닫기 가능" 
  message="닫기 버튼이 있는 알림 메시지입니다." 
  :closable="true" 
/>
<UiButton v-if="!showAlert1" @click="showAlert1 = true">알림 다시 표시</UiButton>

<script setup>
import { ref } from 'vue'

const showAlert1 = ref(true)
<\/script>`)])],-1))])]),l("section",h,[e[22]||(e[22]=l("h2",{class:"section-title"},"슬롯 사용",-1)),e[23]||(e[23]=l("p",{class:"section-description"}," 기본 슬롯을 사용하여 메시지에 HTML 콘텐츠를 추가할 수 있습니다. ",-1)),l("div",E,[l("div",j,[s(t,{type:"warning",title:"중요 공지"},{default:n(()=>e[20]||(e[20]=[l("p",null,[i("이 알림에는 "),l("strong",null,"HTML 콘텐츠"),i("가 포함되어 있습니다.")],-1),l("p",null,[i("자세한 내용은 "),l("a",{href:"#",class:"alert-link"},"여기"),i("를 참조하세요.")],-1)])),_:1})]),e[21]||(e[21]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiAlert type="warning" title="중요 공지">
  <p>이 알림에는 <strong>HTML 콘텐츠</strong>가 포함되어 있습니다.</p>
  <p>자세한 내용은 <a href="#" class="alert-link">여기</a>를 참조하세요.</p>
</UiAlert>`)])],-1))])]),l("section",q,[e[27]||(e[27]=l("h2",{class:"section-title"},"API 참조",-1)),e[28]||(e[28]=l("h3",{class:"subsection-title"},"Props",-1)),s(d,{bordered:""},{default:n(()=>e[24]||(e[24]=[l("colgroup",null,[l("col",{style:{width:"20%"}}),l("col",{style:{width:"20%"}}),l("col",{style:{width:"15%"}}),l("col",{style:{width:"45%"}})],-1),l("thead",null,[l("tr",null,[l("th",null,"이름"),l("th",null,"타입"),l("th",null,"기본값"),l("th",null,"설명")])],-1),l("tbody",null,[l("tr",null,[l("td",null,"modelValue"),l("td",null,"Boolean"),l("td",null,"true"),l("td",null,"알림 표시 여부 (v-model)")]),l("tr",null,[l("td",null,"type"),l("td",null,"String"),l("td",null,"info"),l("td",null,"알림 타입 (info, success, warning, error)")]),l("tr",null,[l("td",null,"size"),l("td",null,"String"),l("td",null,"medium"),l("td",null,"알림 크기 (small, medium, large)")]),l("tr",null,[l("td",null,"title"),l("td",null,"String"),l("td",null,"''"),l("td",null,"알림 제목")]),l("tr",null,[l("td",null,"message"),l("td",null,"String"),l("td",null,"''"),l("td",null,"알림 메시지")]),l("tr",null,[l("td",null,"showIcon"),l("td",null,"Boolean"),l("td",null,"true"),l("td",null,"아이콘 표시 여부")]),l("tr",null,[l("td",null,"closable"),l("td",null,"Boolean"),l("td",null,"false"),l("td",null,"닫기 버튼 표시 여부")])],-1)])),_:1}),e[29]||(e[29]=l("h3",{class:"subsection-title mt-4"},"이벤트",-1)),s(d,{bordered:""},{default:n(()=>e[25]||(e[25]=[l("colgroup",null,[l("col",{style:{width:"30%"}}),l("col",{style:{width:"70%"}})],-1),l("thead",null,[l("tr",null,[l("th",null,"이름"),l("th",null,"설명")])],-1),l("tbody",null,[l("tr",null,[l("td",null,"update:modelValue"),l("td",null,"알림이 닫힐 때 발생하는 이벤트")])],-1)])),_:1}),e[30]||(e[30]=l("h3",{class:"subsection-title mt-4"},"슬롯",-1)),s(d,{bordered:""},{default:n(()=>e[26]||(e[26]=[l("colgroup",null,[l("col",{style:{width:"30%"}}),l("col",{style:{width:"70%"}})],-1),l("thead",null,[l("tr",null,[l("th",null,"이름"),l("th",null,"설명")])],-1),l("tbody",null,[l("tr",null,[l("td",null,"default"),l("td",null,"알림 메시지 내용을 커스터마이징할 수 있는 기본 슬롯")])],-1)])),_:1})])])}}},X=g(D,[["__scopeId","data-v-1c02a1a2"]]);export{X as default};
