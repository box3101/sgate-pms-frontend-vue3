import $ from"./D7y3_Gtr.js";import W from"./ChuIzmKX.js";import q from"./C4VVh3wL.js";import{_ as F,r as d,c as G,a as l,b as o,A as I,t as r,o as H}from"./kTtBKYdE.js";const J={class:"components-page"},K={class:"component-section"},P={class:"select-grid"},Q={class:"select-item"},R={class:"select-item"},T={class:"component-section"},Y={class:"select-grid"},Z={class:"select-item"},h={class:"select-item"},_={class:"select-item"},ee={class:"select-item"},le={class:"component-section"},se={class:"select-grid"},oe={class:"select-item"},te={class:"select-item"},de={class:"select-item"},ne={class:"select-item"},ie={class:"component-section"},ae={class:"select-grid"},pe={class:"select-item"},ce={class:"select-item"},ue={class:"select-item"},me={class:"select-item"},re={class:"select-item"},ve={class:"component-section"},Ve={class:"select-grid"},Se={class:"select-item"},be={class:"select-item"},Ue={class:"select-item"},xe={class:"select-item"},ge={class:"select-item"},ke={class:"component-section"},ze={class:"select-grid"},we={class:"select-item"},fe={class:"select-item"},ye={class:"select-item"},Me={class:"select-grid mt-4"},Le={class:"select-item"},Oe={class:"select-item"},De={class:"select-item"},Xe={class:"component-section"},Ce={class:"select-grid"},Ee={class:"select-item"},Be={class:"select-desc"},je={class:"select-item"},Ae={class:"select-desc"},Ie={class:"component-section"},Ne={class:"select-grid"},$e={class:"select-item"},We={class:"select-desc"},qe={class:"component-section"},Fe={class:"select-grid"},Ge={class:"select-item"},He={class:"component-section"},Je={class:"select-grid"},Ke={class:"select-item"},Pe={class:"select-item"},Qe={class:"select-item"},Re={class:"select-item"},Te={class:"component-section"},Ye={class:"select-grid"},Ze={class:"select-item"},he={class:"select-item"},_e={class:"select-item"},el={class:"select-item"},ll={class:"select-item"},sl={__name:"Select",setup(ol){const t=[{value:"1",label:"옵션 1"},{value:"2",label:"옵션 2"},{value:"3",label:"옵션 3"},{value:"4",label:"옵션 4"},{value:"5",label:"옵션 5"}],v=Array.from({length:20},(N,e)=>({value:String(e+1),label:`긴 옵션 목록 ${e+1}`})),V=[{value:"kr",label:"대한민국"},{value:"us",label:"미국"},{value:"jp",label:"일본"},{value:"cn",label:"중국"},{value:"gb",label:"영국"},{value:"fr",label:"프랑스"},{value:"de",label:"독일"},{value:"it",label:"이탈리아"},{value:"es",label:"스페인"},{value:"ca",label:"캐나다"},{value:"au",label:"호주"},{value:"br",label:"브라질"},{value:"in",label:"인도"},{value:"ru",label:"러시아"},{value:"mx",label:"멕시코"}],p=d("1"),S=d("2"),b=d("3"),U=d("2"),x=d("3");d("");const u=d(""),g=d("4"),k=d("1"),z=d("2"),w=d("3"),f=d("4"),y=d("2"),M=d("3"),m=d(""),L=d("5"),c=d("kr"),O=d(["1","2"]),D=d(["1"]),X=d(["2","3"]),C=d(["3","4"]),E=d(["1","3","5"]),B=d(["2","4"]),j=d(["1","5"]);return(N,e)=>{var A;const i=$,n=W,a=q;return H(),G("div",J,[e[103]||(e[103]=l("h1",{class:"page-title"},"UI 셀렉트 컴포넌트",-1)),l("section",K,[e[28]||(e[28]=l("h2",{class:"section-title"},"기본 셀렉트와 검색 가능한 셀렉트",-1)),l("div",P,[l("div",Q,[o(i,{placeholder:"기본 셀렉트",options:t,modelValue:p.value,"onUpdate:modelValue":e[0]||(e[0]=s=>p.value=s)},null,8,["modelValue"]),e[24]||(e[24]=l("p",{class:"select-desc"},"기본 셀렉트 (UiSelect)",-1)),e[25]||(e[25]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiSelect
  placeholder="기본 셀렉트"
  :options="options"
  v-model="selectedValue"
/>
            `)],-1))]),l("div",R,[o(n,{placeholder:"검색 가능한 셀렉트",options:t,modelValue:k.value,"onUpdate:modelValue":e[1]||(e[1]=s=>k.value=s)},null,8,["modelValue"]),e[26]||(e[26]=l("p",{class:"select-desc"},"검색 가능한 셀렉트 (UiSearchableSelect)",-1)),e[27]||(e[27]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiSearchableSelect
  placeholder="검색 가능한 셀렉트"
  :options="options"
  v-model="selectedValue"
/>
            `)],-1))])])]),l("section",T,[e[37]||(e[37]=l("h2",{class:"section-title"},"기본 셀렉트 사이즈 (Sizes)",-1)),l("div",Y,[l("div",Z,[o(i,{size:"small",placeholder:"선택하세요",options:t,modelValue:p.value,"onUpdate:modelValue":e[2]||(e[2]=s=>p.value=s)},null,8,["modelValue"]),e[29]||(e[29]=l("p",{class:"select-desc"},"작은 사이즈 (Small)",-1)),e[30]||(e[30]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiSelect
  size="small"
  placeholder="선택하세요"
  :options="options"
  v-model="selectedValue"
/>`)],-1))]),l("div",h,[o(i,{size:"medium",placeholder:"선택하세요",options:t,modelValue:S.value,"onUpdate:modelValue":e[3]||(e[3]=s=>S.value=s)},null,8,["modelValue"]),e[31]||(e[31]=l("p",{class:"select-desc"},"중간 사이즈 (Medium) - 기본",-1)),e[32]||(e[32]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiSelect
  size="medium"
  placeholder="선택하세요"
  :options="options"
  v-model="selectedValue"
/>`)],-1))]),l("div",_,[o(i,{size:"large",placeholder:"선택하세요",options:t,modelValue:b.value,"onUpdate:modelValue":e[4]||(e[4]=s=>b.value=s)},null,8,["modelValue"]),e[33]||(e[33]=l("p",{class:"select-desc"},"큰 사이즈 (Large)",-1)),e[34]||(e[34]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiSelect
  size="large"
  placeholder="선택하세요"
  :options="options"
  v-model="selectedValue"
/>`)],-1))]),l("div",ee,[o(i,{size:"xlarge",placeholder:"선택하세요",options:t,modelValue:g.value,"onUpdate:modelValue":e[5]||(e[5]=s=>g.value=s)},null,8,["modelValue"]),e[35]||(e[35]=l("p",{class:"select-desc"},"아주 큰 사이즈 (XLarge)",-1)),e[36]||(e[36]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiSelect
  size="xlarge"
  placeholder="선택하세요"
  :options="options"
  v-model="selectedValue"
/>`)],-1))])])]),l("section",le,[e[46]||(e[46]=l("h2",{class:"section-title"},"검색 가능한 셀렉트 사이즈 (Sizes)",-1)),l("div",se,[l("div",oe,[o(n,{size:"small",placeholder:"검색하세요",options:t,modelValue:z.value,"onUpdate:modelValue":e[6]||(e[6]=s=>z.value=s)},null,8,["modelValue"]),e[38]||(e[38]=l("p",{class:"select-desc"},"작은 사이즈 (Small)",-1)),e[39]||(e[39]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiSearchableSelect
  size="small"
  placeholder="검색하세요"
  :options="options"
  v-model="selectedValue"
/>`)],-1))]),l("div",te,[o(n,{size:"medium",placeholder:"검색하세요",options:t,modelValue:w.value,"onUpdate:modelValue":e[7]||(e[7]=s=>w.value=s)},null,8,["modelValue"]),e[40]||(e[40]=l("p",{class:"select-desc"},"중간 사이즈 (Medium) - 기본",-1)),e[41]||(e[41]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiSearchableSelect
  size="medium"
  placeholder="검색하세요"
  :options="options"
  v-model="selectedValue"
/>`)],-1))]),l("div",de,[o(n,{size:"large",placeholder:"검색하세요",options:t,modelValue:f.value,"onUpdate:modelValue":e[8]||(e[8]=s=>f.value=s)},null,8,["modelValue"]),e[42]||(e[42]=l("p",{class:"select-desc"},"큰 사이즈 (Large)",-1)),e[43]||(e[43]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiSearchableSelect
  size="large"
  placeholder="검색하세요"
  :options="options"
  v-model="selectedValue"
/>`)],-1))]),l("div",ne,[o(n,{size:"xlarge",placeholder:"검색하세요",options:t,modelValue:L.value,"onUpdate:modelValue":e[9]||(e[9]=s=>L.value=s)},null,8,["modelValue"]),e[44]||(e[44]=l("p",{class:"select-desc"},"아주 큰 사이즈 (XLarge)",-1)),e[45]||(e[45]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiSearchableSelect
  size="xlarge"
  placeholder="검색하세요"
  :options="options"
  v-model="selectedValue"
/>`)],-1))])])]),l("section",ie,[e[57]||(e[57]=l("h2",{class:"section-title"},"기본 셀렉트 상태 (States)",-1)),l("div",ae,[l("div",pe,[o(i,{placeholder:"선택하세요",options:t}),e[47]||(e[47]=l("p",{class:"select-desc"},"기본 상태 (Default)",-1)),e[48]||(e[48]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiSelect
  placeholder="선택하세요"
  :options="options"
/>`)],-1))]),l("div",ce,[o(i,{placeholder:"선택하세요",options:t,modelValue:U.value,"onUpdate:modelValue":e[10]||(e[10]=s=>U.value=s)},null,8,["modelValue"]),e[49]||(e[49]=l("p",{class:"select-desc"},"선택 완료 상태 (Complete)",-1)),e[50]||(e[50]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiSelect
  placeholder="선택하세요"
  :options="options"
  v-model="selectedValue"
/>`)],-1))]),l("div",ue,[o(i,{placeholder:"선택하세요",options:t,error:!0}),e[51]||(e[51]=l("p",{class:"select-desc"},"에러 상태 (Error)",-1)),e[52]||(e[52]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiSelect
  placeholder="선택하세요"
  :options="options"
  :error="true"
/>`)],-1))]),l("div",me,[o(i,{placeholder:"선택하세요",options:t,disabled:!0}),e[53]||(e[53]=l("p",{class:"select-desc"},"비활성화 상태 (Disabled)",-1)),e[54]||(e[54]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiSelect
  placeholder="선택하세요"
  :options="options"
  :disabled="true"
/>`)],-1))]),l("div",re,[o(i,{placeholder:"선택하세요",options:t,modelValue:x.value,"onUpdate:modelValue":e[11]||(e[11]=s=>x.value=s),viewOnly:!0},null,8,["modelValue"]),e[55]||(e[55]=l("p",{class:"select-desc"},"보기 전용 상태 (View Only)",-1)),e[56]||(e[56]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiSelect
  placeholder="선택하세요"
  :options="options"
  v-model="selectedValue"
  :viewOnly="true"
/>`)],-1))])])]),l("section",ve,[e[68]||(e[68]=l("h2",{class:"section-title"},"검색 가능한 셀렉트 상태 (States)",-1)),l("div",Ve,[l("div",Se,[o(n,{placeholder:"검색하세요",options:t}),e[58]||(e[58]=l("p",{class:"select-desc"},"기본 상태 (Default)",-1)),e[59]||(e[59]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiSearchableSelect
  placeholder="검색하세요"
  :options="options"
/>`)],-1))]),l("div",be,[o(n,{placeholder:"검색하세요",options:t,modelValue:y.value,"onUpdate:modelValue":e[12]||(e[12]=s=>y.value=s)},null,8,["modelValue"]),e[60]||(e[60]=l("p",{class:"select-desc"},"선택 완료 상태 (Complete)",-1)),e[61]||(e[61]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiSearchableSelect
  placeholder="검색하세요"
  :options="options"
  v-model="selectedValue"
/>`)],-1))]),l("div",Ue,[o(n,{placeholder:"검색하세요",options:t,error:!0}),e[62]||(e[62]=l("p",{class:"select-desc"},"에러 상태 (Error)",-1)),e[63]||(e[63]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiSearchableSelect
  placeholder="검색하세요"
  :options="options"
  :error="true"
/>`)],-1))]),l("div",xe,[o(n,{placeholder:"검색하세요",options:t,disabled:!0}),e[64]||(e[64]=l("p",{class:"select-desc"},"비활성화 상태 (Disabled)",-1)),e[65]||(e[65]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiSearchableSelect
  placeholder="검색하세요"
  :options="options"
  :disabled="true"
/>`)],-1))]),l("div",ge,[o(n,{placeholder:"검색하세요",options:t,modelValue:M.value,"onUpdate:modelValue":e[13]||(e[13]=s=>M.value=s),viewOnly:!0},null,8,["modelValue"]),e[66]||(e[66]=l("p",{class:"select-desc"},"보기 전용 상태 (View Only)",-1)),e[67]||(e[67]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiSearchableSelect
  placeholder="검색하세요"
  :options="options"
  v-model="selectedValue"
  :viewOnly="true"
/>`)],-1))])])]),l("section",ke,[e[81]||(e[81]=l("h2",{class:"section-title"},"셀렉트 너비 (Width)",-1)),l("div",ze,[l("div",we,[o(i,{placeholder:"선택하세요",options:t,width:"150px"}),e[69]||(e[69]=l("p",{class:"select-desc"},"기본 너비 (150px)",-1)),e[70]||(e[70]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiSelect
  placeholder="선택하세요"
  :options="options"
  width="150px"
/>`)],-1))]),l("div",fe,[o(i,{placeholder:"선택하세요",options:t,width:"200px"}),e[71]||(e[71]=l("p",{class:"select-desc"},"200px 너비",-1)),e[72]||(e[72]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiSelect
  placeholder="선택하세요"
  :options="options"
  width="200px"
/>`)],-1))]),l("div",ye,[o(i,{placeholder:"선택하세요",options:t,width:"100%"}),e[73]||(e[73]=l("p",{class:"select-desc"},"100% 너비",-1)),e[74]||(e[74]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiSelect
  placeholder="선택하세요"
  :options="options"
  width="100%"
/>`)],-1))])]),l("div",Me,[l("div",Le,[o(n,{placeholder:"검색하세요",options:t,width:"150px"}),e[75]||(e[75]=l("p",{class:"select-desc"},"기본 너비 (150px)",-1)),e[76]||(e[76]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiSearchableSelect
  placeholder="검색하세요"
  :options="options"
  width="150px"
/>`)],-1))]),l("div",Oe,[o(n,{placeholder:"검색하세요",options:t,width:"200px"}),e[77]||(e[77]=l("p",{class:"select-desc"},"200px 너비",-1)),e[78]||(e[78]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiSearchableSelect
  placeholder="검색하세요"
  :options="options"
  width="200px"
/>`)],-1))]),l("div",De,[o(n,{placeholder:"검색하세요",options:t,width:"100%"}),e[79]||(e[79]=l("p",{class:"select-desc"},"100% 너비",-1)),e[80]||(e[80]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiSearchableSelect
  placeholder="검색하세요"
  :options="options"
  width="100%"
/>`)],-1))])])]),l("section",Xe,[e[82]||(e[82]=l("h2",{class:"section-title"},"긴 옵션 목록",-1)),l("div",Ce,[l("div",Ee,[o(i,{placeholder:"선택하세요",options:I(v),modelValue:u.value,"onUpdate:modelValue":e[14]||(e[14]=s=>u.value=s)},null,8,["options","modelValue"]),l("p",Be,"기본 셀렉트 - 선택된 값: "+r(u.value||"없음"),1)]),l("div",je,[o(n,{placeholder:"검색하세요",options:I(v),modelValue:m.value,"onUpdate:modelValue":e[15]||(e[15]=s=>m.value=s)},null,8,["options","modelValue"]),l("p",Ae," 검색 가능한 셀렉트 - 선택된 값: "+r(m.value||"없음"),1)])])]),l("section",Ie,[e[83]||(e[83]=l("h2",{class:"section-title"},"검색 기능 활용",-1)),l("div",Ne,[l("div",$e,[o(n,{placeholder:"국가를 검색하세요",options:V,modelValue:c.value,"onUpdate:modelValue":e[16]||(e[16]=s=>c.value=s)},null,8,["modelValue"]),l("p",We," 국가 검색 - 선택된 국가: "+r(c.value?(A=V.find(s=>s.value===c.value))==null?void 0:A.label:"없음"),1)])]),e[84]||(e[84]=l("div",{class:"code-example mt-4"},[l("pre",{class:"code-block"},`<UiSearchableSelect
  placeholder="국가를 검색하세요"
  :options="countries"
  v-model="selectedCountry"
/>

// 스크립트 부분
const countries = [
  { value: 'kr', label: '대한민국' },
  { value: 'us', label: '미국' },
  { value: 'jp', label: '일본' },
  // ... 더 많은 국가 데이터
]
        `)],-1))]),l("section",qe,[e[87]||(e[87]=l("h2",{class:"section-title"},"멀티 셀렉트 (Multiple Selection)",-1)),l("div",Fe,[l("div",Ge,[o(a,{placeholder:"다중 선택하세요",options:t,modelValue:O.value,"onUpdate:modelValue":e[17]||(e[17]=s=>O.value=s)},null,8,["modelValue"]),e[85]||(e[85]=l("p",{class:"select-desc"},"기본 멀티 셀렉트",-1)),e[86]||(e[86]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiMultiSelect
  placeholder="다중 선택하세요"
  :options="options"
  v-model="multiSelectedValues"
/>
            `)],-1))])])]),l("section",He,[e[96]||(e[96]=l("h2",{class:"section-title"},"멀티 셀렉트 사이즈 (Sizes)",-1)),l("div",Je,[l("div",Ke,[o(a,{size:"small",placeholder:"다중 선택하세요",options:t,modelValue:D.value,"onUpdate:modelValue":e[18]||(e[18]=s=>D.value=s)},null,8,["modelValue"]),e[88]||(e[88]=l("p",{class:"select-desc"},"작은 사이즈 (Small)",-1)),e[89]||(e[89]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiMultiSelect
  size="small"
  placeholder="다중 선택하세요"
  :options="options"
  v-model="multiSelectedValues"
/>`)],-1))]),l("div",Pe,[o(a,{size:"medium",placeholder:"다중 선택하세요",options:t,modelValue:X.value,"onUpdate:modelValue":e[19]||(e[19]=s=>X.value=s)},null,8,["modelValue"]),e[90]||(e[90]=l("p",{class:"select-desc"},"중간 사이즈 (Medium) - 기본",-1)),e[91]||(e[91]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiMultiSelect
  size="medium"
  placeholder="다중 선택하세요"
  :options="options"
  v-model="multiSelectedValues"
/>`)],-1))]),l("div",Qe,[o(a,{size:"large",placeholder:"다중 선택하세요",options:t,modelValue:C.value,"onUpdate:modelValue":e[20]||(e[20]=s=>C.value=s)},null,8,["modelValue"]),e[92]||(e[92]=l("p",{class:"select-desc"},"큰 사이즈 (Large)",-1)),e[93]||(e[93]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiMultiSelect
  size="large"
  placeholder="다중 선택하세요"
  :options="options"
  v-model="multiSelectedValues"
/>`)],-1))]),l("div",Re,[o(a,{size:"xlarge",placeholder:"다중 선택하세요",options:t,modelValue:j.value,"onUpdate:modelValue":e[21]||(e[21]=s=>j.value=s)},null,8,["modelValue"]),e[94]||(e[94]=l("p",{class:"select-desc"},"아주 큰 사이즈 (XLarge)",-1)),e[95]||(e[95]=l("div",{class:"code-example"},[l("pre",{class:"code-block"},`<UiMultiSelect
  size="xlarge"
  placeholder="다중 선택하세요"
  :options="options"
  v-model="multiSelectedValues"
/>`)],-1))])])]),l("section",Te,[e[102]||(e[102]=l("h2",{class:"section-title"},"멀티 셀렉트 상태 (States)",-1)),l("div",Ye,[l("div",Ze,[o(a,{placeholder:"다중 선택하세요",options:t}),e[97]||(e[97]=l("p",{class:"select-desc"},"기본 상태 (Default)",-1))]),l("div",he,[o(a,{placeholder:"다중 선택하세요",options:t,modelValue:E.value,"onUpdate:modelValue":e[22]||(e[22]=s=>E.value=s)},null,8,["modelValue"]),e[98]||(e[98]=l("p",{class:"select-desc"},"선택 완료 상태 (Complete)",-1))]),l("div",_e,[o(a,{placeholder:"다중 선택하세요",options:t,error:!0}),e[99]||(e[99]=l("p",{class:"select-desc"},"에러 상태 (Error)",-1))]),l("div",el,[o(a,{placeholder:"다중 선택하세요",options:t,disabled:!0}),e[100]||(e[100]=l("p",{class:"select-desc"},"비활성화 상태 (Disabled)",-1))]),l("div",ll,[o(a,{placeholder:"다중 선택하세요",options:t,modelValue:B.value,"onUpdate:modelValue":e[23]||(e[23]=s=>B.value=s),viewOnly:!0},null,8,["modelValue"]),e[101]||(e[101]=l("p",{class:"select-desc"},"보기 전용 상태 (View Only)",-1))])])])])}}},al=F(sl,[["__scopeId","data-v-1786c892"]]);export{al as default};
