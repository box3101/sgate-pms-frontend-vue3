import{U as E}from"./cc473KMc.js";import{_ as M,r as t,c as N,a as e,b as n,o as P}from"./BQpTzB5Q.js";const C={class:"components-page"},D={class:"component-section"},L={class:"input-grid"},A={class:"input-item"},R={class:"input-item"},W={class:"component-section"},X={class:"input-grid"},j={class:"input-item"},F={class:"input-item"},G={class:"input-item"},H={class:"input-item"},J={class:"component-section"},K={class:"input-grid"},O={class:"input-item"},Q={class:"input-item"},Y={class:"input-item"},Z={class:"input-item"},$={class:"input-item"},h={class:"component-section"},_={class:"input-grid"},ll={class:"input-item"},el={class:"input-item"},sl={class:"input-item"},ol={class:"input-item"},nl={class:"input-item"},tl={class:"component-section"},dl={class:"input-grid"},ul={class:"input-item"},il={class:"input-item"},pl={class:"input-item"},al={class:"input-item"},ml={class:"component-section"},rl={class:"input-grid"},vl={class:"input-item"},Vl={class:"input-item"},cl={class:"input-item"},Ul={class:"component-section"},xl={class:"input-grid"},bl={class:"input-item"},Il={class:"input-item"},kl={class:"input-item"},fl={class:"component-section"},gl={class:"input-grid"},yl={class:"input-item"},zl={__name:"Input",setup(Tl){const d=t(""),u=t(""),i=t(""),p=t(""),a=t(""),m=t(""),r=t("입력된 텍스트"),v=t("읽기 전용 텍스트"),V=t(""),c=t(""),U=t(""),x=t(""),b=t(""),I=t(""),k=t(""),f=t(""),g=t("");t("");const y=t(""),z=t(""),T=t(""),w=t(""),S=t(""),q=t(""),B=t("클리어 버튼을 눌러 지우세요");return(wl,l)=>{const o=E;return P(),N("div",C,[l[86]||(l[86]=e("h1",{class:"page-title"},"UI 인풋 컴포넌트",-1)),e("section",D,[l[28]||(l[28]=e("h2",{class:"section-title"},"기본 인풋",-1)),e("div",L,[e("div",A,[n(o,{placeholder:"기본 인풋",modelValue:d.value,"onUpdate:modelValue":l[0]||(l[0]=s=>d.value=s)},null,8,["modelValue"]),l[24]||(l[24]=e("p",{class:"input-desc"},"기본 인풋 (UiInput)",-1)),l[25]||(l[25]=e("div",{class:"code-example"},[e("pre",{class:"code-block"},`<UiInput
  placeholder="기본 인풋"
  v-model="inputValue"
/>
            `)],-1))]),e("div",R,[n(o,{placeholder:"라벨이 있는 인풋",label:"이름",modelValue:u.value,"onUpdate:modelValue":l[1]||(l[1]=s=>u.value=s)},null,8,["modelValue"]),l[26]||(l[26]=e("p",{class:"input-desc"},"라벨이 있는 인풋",-1)),l[27]||(l[27]=e("div",{class:"code-example"},[e("pre",{class:"code-block"},`<UiInput
  placeholder="라벨이 있는 인풋"
  label="이름"
  v-model="inputValue"
/>
            `)],-1))])])]),e("section",W,[l[37]||(l[37]=e("h2",{class:"section-title"},"인풋 사이즈 (Sizes)",-1)),e("div",X,[e("div",j,[n(o,{size:"small",placeholder:"작은 사이즈",modelValue:i.value,"onUpdate:modelValue":l[2]||(l[2]=s=>i.value=s)},null,8,["modelValue"]),l[29]||(l[29]=e("p",{class:"input-desc"},"작은 사이즈 (Small)",-1)),l[30]||(l[30]=e("div",{class:"code-example"},[e("pre",{class:"code-block"},`<UiInput
  size="small"
  placeholder="작은 사이즈"
  v-model="inputValue"
/>`)],-1))]),e("div",F,[n(o,{size:"medium",placeholder:"중간 사이즈",modelValue:p.value,"onUpdate:modelValue":l[3]||(l[3]=s=>p.value=s)},null,8,["modelValue"]),l[31]||(l[31]=e("p",{class:"input-desc"},"중간 사이즈 (Medium) - 기본",-1)),l[32]||(l[32]=e("div",{class:"code-example"},[e("pre",{class:"code-block"},`<UiInput
  size="medium"
  placeholder="중간 사이즈"
  v-model="inputValue"
/>`)],-1))]),e("div",G,[n(o,{size:"large",placeholder:"큰 사이즈",modelValue:a.value,"onUpdate:modelValue":l[4]||(l[4]=s=>a.value=s)},null,8,["modelValue"]),l[33]||(l[33]=e("p",{class:"input-desc"},"큰 사이즈 (Large)",-1)),l[34]||(l[34]=e("div",{class:"code-example"},[e("pre",{class:"code-block"},`<UiInput
  size="large"
  placeholder="큰 사이즈"
  v-model="inputValue"
/>`)],-1))]),e("div",H,[n(o,{size:"xlarge",placeholder:"아주 큰 사이즈",modelValue:m.value,"onUpdate:modelValue":l[5]||(l[5]=s=>m.value=s)},null,8,["modelValue"]),l[35]||(l[35]=e("p",{class:"input-desc"},"아주 큰 사이즈 (XLarge)",-1)),l[36]||(l[36]=e("div",{class:"code-example"},[e("pre",{class:"code-block"},`<UiInput
  size="xlarge"
  placeholder="아주 큰 사이즈"
  v-model="inputValue"
/>`)],-1))])])]),e("section",J,[l[48]||(l[48]=e("h2",{class:"section-title"},"인풋 상태 (States)",-1)),e("div",K,[e("div",O,[n(o,{placeholder:"기본 상태"}),l[38]||(l[38]=e("p",{class:"input-desc"},"기본 상태 (Default)",-1)),l[39]||(l[39]=e("div",{class:"code-example"},[e("pre",{class:"code-block"},`<UiInput
  placeholder="기본 상태"
/>`)],-1))]),e("div",Q,[n(o,{placeholder:"입력 완료",modelValue:r.value,"onUpdate:modelValue":l[6]||(l[6]=s=>r.value=s)},null,8,["modelValue"]),l[40]||(l[40]=e("p",{class:"input-desc"},"입력 완료 상태 (Complete)",-1)),l[41]||(l[41]=e("div",{class:"code-example"},[e("pre",{class:"code-block"},`<UiInput
  placeholder="입력 완료"
  v-model="inputValue"
/>`)],-1))]),e("div",Y,[n(o,{placeholder:"에러 상태",error:!0,errorMessage:"유효하지 않은 입력입니다."}),l[42]||(l[42]=e("p",{class:"input-desc"},"에러 상태 (Error)",-1)),l[43]||(l[43]=e("div",{class:"code-example"},[e("pre",{class:"code-block"},`<UiInput
  placeholder="에러 상태"
  :error="true"
  errorMessage="유효하지 않은 입력입니다."
/>`)],-1))]),e("div",Z,[n(o,{placeholder:"비활성화 상태",disabled:!0}),l[44]||(l[44]=e("p",{class:"input-desc"},"비활성화 상태 (Disabled)",-1)),l[45]||(l[45]=e("div",{class:"code-example"},[e("pre",{class:"code-block"},`<UiInput
  placeholder="비활성화 상태"
  :disabled="true"
/>`)],-1))]),e("div",$,[n(o,{placeholder:"읽기 전용",modelValue:v.value,"onUpdate:modelValue":l[7]||(l[7]=s=>v.value=s),readonly:!0},null,8,["modelValue"]),l[46]||(l[46]=e("p",{class:"input-desc"},"읽기 전용 상태 (Readonly)",-1)),l[47]||(l[47]=e("div",{class:"code-example"},[e("pre",{class:"code-block"},`<UiInput
  placeholder="읽기 전용"
  v-model="inputValue"
  :readonly="true"
/>`)],-1))])])]),e("section",h,[l[59]||(l[59]=e("h2",{class:"section-title"},"아이콘 및 접두/접미사 (Icons & Affixes)",-1)),e("div",_,[e("div",ll,[n(o,{placeholder:"아이콘이 있는 인풋",icon:"search",modelValue:V.value,"onUpdate:modelValue":l[8]||(l[8]=s=>V.value=s)},null,8,["modelValue"]),l[49]||(l[49]=e("p",{class:"input-desc"},"아이콘이 있는 인풋",-1)),l[50]||(l[50]=e("div",{class:"code-example"},[e("pre",{class:"code-block"},`<UiInput
  placeholder="아이콘이 있는 인풋"
  icon="search"
  v-model="inputValue"
/>`)],-1))]),e("div",el,[n(o,{placeholder:"접두 아이콘",prefixIcon:"user",modelValue:c.value,"onUpdate:modelValue":l[9]||(l[9]=s=>c.value=s)},null,8,["modelValue"]),l[51]||(l[51]=e("p",{class:"input-desc"},"접두 아이콘 (Prefix Icon)",-1)),l[52]||(l[52]=e("div",{class:"code-example"},[e("pre",{class:"code-block"},`<UiInput
  placeholder="접두 아이콘"
  prefixIcon="user"
  v-model="inputValue"
/>`)],-1))]),e("div",sl,[n(o,{placeholder:"접미 아이콘",suffixIcon:"calendar",modelValue:U.value,"onUpdate:modelValue":l[10]||(l[10]=s=>U.value=s)},null,8,["modelValue"]),l[53]||(l[53]=e("p",{class:"input-desc"},"접미 아이콘 (Suffix Icon)",-1)),l[54]||(l[54]=e("div",{class:"code-example"},[e("pre",{class:"code-block"},`<UiInput
  placeholder="접미 아이콘"
  suffixIcon="calendar"
  v-model="inputValue"
/>`)],-1))]),e("div",ol,[n(o,{placeholder:"금액 입력",suffix:"원",modelValue:x.value,"onUpdate:modelValue":l[11]||(l[11]=s=>x.value=s)},null,8,["modelValue"]),l[55]||(l[55]=e("p",{class:"input-desc"},"접미사 텍스트 (Suffix)",-1)),l[56]||(l[56]=e("div",{class:"code-example"},[e("pre",{class:"code-block"},`<UiInput
  placeholder="금액 입력"
  suffix="원"
  v-model="inputValue"
/>`)],-1))]),e("div",nl,[n(o,{placeholder:"도메인 입력",prefix:"https://",modelValue:b.value,"onUpdate:modelValue":l[12]||(l[12]=s=>b.value=s)},null,8,["modelValue"]),l[57]||(l[57]=e("p",{class:"input-desc"},"접두사 텍스트 (Prefix)",-1)),l[58]||(l[58]=e("div",{class:"code-example"},[e("pre",{class:"code-block"},`<UiInput
  placeholder="도메인 입력"
  prefix="https://"
  v-model="inputValue"
/>`)],-1))])])]),e("section",tl,[l[68]||(l[68]=e("h2",{class:"section-title"},"입력 타입 (Input Types)",-1)),e("div",dl,[e("div",ul,[n(o,{type:"text",placeholder:"텍스트 입력",modelValue:I.value,"onUpdate:modelValue":l[13]||(l[13]=s=>I.value=s)},null,8,["modelValue"]),l[60]||(l[60]=e("p",{class:"input-desc"},"텍스트 입력 (Text)",-1)),l[61]||(l[61]=e("div",{class:"code-example"},[e("pre",{class:"code-block"},`<UiInput
  type="text"
  placeholder="텍스트 입력"
  v-model="inputValue"
/>`)],-1))]),e("div",il,[n(o,{type:"password",placeholder:"비밀번호 입력",modelValue:k.value,"onUpdate:modelValue":l[14]||(l[14]=s=>k.value=s)},null,8,["modelValue"]),l[62]||(l[62]=e("p",{class:"input-desc"},"비밀번호 입력 (Password)",-1)),l[63]||(l[63]=e("div",{class:"code-example"},[e("pre",{class:"code-block"},`<UiInput
  type="password"
  placeholder="비밀번호 입력"
  v-model="inputValue"
/>`)],-1))]),e("div",pl,[n(o,{type:"email",placeholder:"이메일 입력",modelValue:f.value,"onUpdate:modelValue":l[15]||(l[15]=s=>f.value=s)},null,8,["modelValue"]),l[64]||(l[64]=e("p",{class:"input-desc"},"이메일 입력 (Email)",-1)),l[65]||(l[65]=e("div",{class:"code-example"},[e("pre",{class:"code-block"},`<UiInput
  type="email"
  placeholder="이메일 입력"
  v-model="inputValue"
/>`)],-1))]),e("div",al,[n(o,{type:"number",placeholder:"숫자 입력",modelValue:g.value,"onUpdate:modelValue":l[16]||(l[16]=s=>g.value=s)},null,8,["modelValue"]),l[66]||(l[66]=e("p",{class:"input-desc"},"숫자 입력 (Number)",-1)),l[67]||(l[67]=e("div",{class:"code-example"},[e("pre",{class:"code-block"},`<UiInput
  type="number"
  placeholder="숫자 입력"
  v-model="inputValue"
/>`)],-1))])])]),e("section",ml,[l[75]||(l[75]=e("h2",{class:"section-title"},"헬퍼 텍스트 및 필수 입력",-1)),e("div",rl,[e("div",vl,[n(o,{label:"사용자 이름",placeholder:"사용자 이름 입력",helperText:"영문, 숫자 조합 8-20자",modelValue:y.value,"onUpdate:modelValue":l[17]||(l[17]=s=>y.value=s)},null,8,["modelValue"]),l[69]||(l[69]=e("p",{class:"input-desc"},"헬퍼 텍스트가 있는 인풋",-1)),l[70]||(l[70]=e("div",{class:"code-example"},[e("pre",{class:"code-block"},`<UiInput
  label="사용자 이름"
  placeholder="사용자 이름 입력"
  helperText="영문, 숫자 조합 8-20자"
  v-model="inputValue"
/>`)],-1))]),e("div",Vl,[n(o,{label:"이메일",placeholder:"이메일 입력",required:!0,modelValue:z.value,"onUpdate:modelValue":l[18]||(l[18]=s=>z.value=s)},null,8,["modelValue"]),l[71]||(l[71]=e("p",{class:"input-desc"},"필수 입력 필드",-1)),l[72]||(l[72]=e("div",{class:"code-example"},[e("pre",{class:"code-block"},`<UiInput
  label="이메일"
  placeholder="이메일 입력"
  :required="true"
  v-model="inputValue"
/>`)],-1))]),e("div",cl,[n(o,{label:"전화번호",placeholder:"전화번호 입력",helperText:"'-' 없이 숫자만 입력",required:!0,modelValue:T.value,"onUpdate:modelValue":l[19]||(l[19]=s=>T.value=s)},null,8,["modelValue"]),l[73]||(l[73]=e("p",{class:"input-desc"},"필수 입력 + 헬퍼 텍스트",-1)),l[74]||(l[74]=e("div",{class:"code-example"},[e("pre",{class:"code-block"},`<UiInput
  label="전화번호"
  placeholder="전화번호 입력"
  helperText="'-' 없이 숫자만 입력"
  :required="true"
  v-model="inputValue"
/>`)],-1))])])]),e("section",Ul,[l[82]||(l[82]=e("h2",{class:"section-title"},"인풋 너비 (Width)",-1)),e("div",xl,[e("div",bl,[n(o,{placeholder:"기본 너비",modelValue:w.value,"onUpdate:modelValue":l[20]||(l[20]=s=>w.value=s)},null,8,["modelValue"]),l[76]||(l[76]=e("p",{class:"input-desc"},"기본 너비",-1)),l[77]||(l[77]=e("div",{class:"code-example"},[e("pre",{class:"code-block"},`<UiInput
  placeholder="기본 너비"
  v-model="inputValue"
/>`)],-1))]),e("div",Il,[n(o,{placeholder:"너비 지정",modelValue:S.value,"onUpdate:modelValue":l[21]||(l[21]=s=>S.value=s),style:{width:"150px"}},null,8,["modelValue"]),l[78]||(l[78]=e("p",{class:"input-desc"},"너비 지정 (150px)",-1)),l[79]||(l[79]=e("div",{class:"code-example"},[e("pre",{class:"code-block"},`<UiInput
  placeholder="너비 지정"
  v-model="inputValue"
  style="width: 150px"
/>`)],-1))]),e("div",kl,[n(o,{placeholder:"블록 레벨 인풋",modelValue:q.value,"onUpdate:modelValue":l[22]||(l[22]=s=>q.value=s),block:!0},null,8,["modelValue"]),l[80]||(l[80]=e("p",{class:"input-desc"},"블록 레벨 인풋 (Block)",-1)),l[81]||(l[81]=e("div",{class:"code-example"},[e("pre",{class:"code-block"},`<UiInput
  placeholder="블록 레벨 인풋"
  v-model="inputValue"
  :block="true"
/>`)],-1))])])]),e("section",fl,[l[85]||(l[85]=e("h2",{class:"section-title"},"클리어러블 인풋 (Clearable)",-1)),e("div",gl,[e("div",yl,[n(o,{placeholder:"텍스트를 입력하세요",modelValue:B.value,"onUpdate:modelValue":l[23]||(l[23]=s=>B.value=s),clearable:!0},null,8,["modelValue"]),l[83]||(l[83]=e("p",{class:"input-desc"},"클리어러블 인풋",-1)),l[84]||(l[84]=e("div",{class:"code-example"},[e("pre",{class:"code-block"},`<UiInput
  placeholder="텍스트를 입력하세요"
  v-model="inputValue"
  :clearable="true"
/>
            `)],-1))])])])])}}},Bl=M(zl,[["__scopeId","data-v-1f22be0b"]]);export{Bl as default};
