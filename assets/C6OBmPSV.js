import A from"./DMqxTxLR.js";import W from"./D5pC2bg5.js";import E from"./D8CLVto4.js";import N from"./Adu7dnhU.js";import M from"./CgkM5g_z.js";import{I as P,r as f,J as q,_ as D,c as J,a as l,b as e,w as o,o as L,d as i}from"./BJrZpP90.js";function S(){const u=P("toasts",()=>[]),g=f(!1),w=[],V=()=>`${Date.now()}-${Math.random().toString(36).slice(2,9)}`;async function U(){if(!(g.value||w.length===0)){for(g.value=!0;w.length>0;){const r=w.shift();await q(),u.value=[...u.value,r].slice(-5)}g.value=!1}}function $(r){const a={id:V(),open:!0,...r};return w.push(a),U(),a}function b(r,a){const d=u.value.findIndex(x=>x.id===r);d!==-1&&(u.value[d]={...u.value[d],...a})}function B(r){const a=u.value.findIndex(d=>d.id===r);a!==-1&&(u.value[a]={...u.value[a],open:!1}),setTimeout(()=>{u.value=u.value.filter(d=>d.id!==r)},200)}function y(){u.value=[]}return{toasts:u,add:$,update:b,remove:B,clear:y}}const O={class:"component-guide"},Q={class:"guide-section"},j={class:"example-wrapper"},F={class:"example-preview"},G={class:"guide-section"},H={class:"example-wrapper"},K={class:"example-preview"},R={class:"button-group"},X={class:"guide-section"},Y={class:"example-wrapper"},Z={class:"example-preview"},c={class:"button-group"},_={class:"guide-section"},h={class:"example-wrapper"},ll={class:"example-preview"},nl={class:"guide-section"},tl={class:"example-wrapper"},el={class:"example-preview"},ol={class:"custom-title"},sl={class:"custom-content"},il={class:"mt-3"},ul={class:"guide-section"},dl={__name:"Confirm",setup(u){const g=S?S():{success:s=>console.log("Success:",s),info:s=>console.log("Info:",s),warning:s=>console.log("Warning:",s),error:s=>console.log("Error:",s)},w=f(!1),V=f(!1),U=f(!1),$=f(!1),b=f(!1),B=f(!1),y=f(!1),r=f(!1),a=f(!1),d=f(!1),x=f(!1),v=(s="")=>{g.success(`${s?`[${s}] `:""}확인 버튼이 클릭되었습니다.`)},p=(s="")=>{g.info(`${s?`[${s}] `:""}취소 버튼이 클릭되었습니다.`)},I=()=>{x.value?(g.success("약관에 동의하셨습니다."),d.value=!1):g.warning("모든 약관에 동의해야 합니다.")};return(s,n)=>{const m=A,C=W,T=E,z=N,k=M;return L(),J("div",O,[n[79]||(n[79]=l("h1",{class:"guide-title"},"UiConfirm 컴포넌트",-1)),n[80]||(n[80]=l("p",{class:"guide-description"}," UiConfirm 컴포넌트는 사용자에게 확인/취소 선택을 요청하는 모달 대화상자입니다. 다양한 타입(정보, 성공, 경고, 에러)과 크기를 지원합니다. ",-1)),l("section",Q,[n[44]||(n[44]=l("h2",{class:"section-title"},"기본 사용법",-1)),l("div",j,[l("div",F,[e(m,{onClick:n[0]||(n[0]=t=>w.value=!0)},{default:o(()=>n[42]||(n[42]=[i("기본 확인 대화상자 열기")])),_:1,__:[42]}),e(C,{modelValue:w.value,"onUpdate:modelValue":n[1]||(n[1]=t=>w.value=t),title:"확인",message:"계속 진행하시겠습니까?",onConfirm:n[2]||(n[2]=t=>v("기본 확인")),onCancel:n[3]||(n[3]=t=>p("기본 확인"))},null,8,["modelValue"])]),n[43]||(n[43]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiButton @click="showBasicConfirm = true">기본 확인 대화상자 열기</UiButton>
<UiConfirm
  v-model="showBasicConfirm"
  title="확인"
  message="계속 진행하시겠습니까?"
  @confirm="handleConfirm"
  @cancel="handleCancel"
/>`)])],-1))])]),l("section",G,[n[50]||(n[50]=l("h2",{class:"section-title"},"대화상자 타입",-1)),n[51]||(n[51]=l("p",{class:"section-description"}," UiConfirm 컴포넌트는 4가지 타입(info, success, warning, error)을 지원합니다. ",-1)),l("div",H,[l("div",K,[l("div",R,[e(m,{onClick:n[4]||(n[4]=t=>V.value=!0),class:"mb-2"},{default:o(()=>n[45]||(n[45]=[i("정보 대화상자")])),_:1,__:[45]}),e(m,{onClick:n[5]||(n[5]=t=>U.value=!0),class:"mb-2"},{default:o(()=>n[46]||(n[46]=[i("성공 대화상자")])),_:1,__:[46]}),e(m,{onClick:n[6]||(n[6]=t=>$.value=!0),class:"mb-2"},{default:o(()=>n[47]||(n[47]=[i("경고 대화상자")])),_:1,__:[47]}),e(m,{onClick:n[7]||(n[7]=t=>b.value=!0)},{default:o(()=>n[48]||(n[48]=[i("오류 대화상자")])),_:1,__:[48]})]),e(C,{modelValue:V.value,"onUpdate:modelValue":n[8]||(n[8]=t=>V.value=t),type:"info",title:"정보",message:"새로운 정보가 있습니다. 확인하시겠습니까?",onConfirm:n[9]||(n[9]=t=>v("정보")),onCancel:n[10]||(n[10]=t=>p("정보"))},null,8,["modelValue"]),e(C,{modelValue:U.value,"onUpdate:modelValue":n[11]||(n[11]=t=>U.value=t),type:"success",title:"성공",message:"작업이 성공적으로 완료되었습니다. 계속하시겠습니까?",onConfirm:n[12]||(n[12]=t=>v("성공")),onCancel:n[13]||(n[13]=t=>p("성공"))},null,8,["modelValue"]),e(C,{modelValue:$.value,"onUpdate:modelValue":n[14]||(n[14]=t=>$.value=t),type:"warning",title:"경고",message:"이 작업은 되돌릴 수 없습니다. 계속하시겠습니까?",onConfirm:n[15]||(n[15]=t=>v("경고")),onCancel:n[16]||(n[16]=t=>p("경고"))},null,8,["modelValue"]),e(C,{modelValue:b.value,"onUpdate:modelValue":n[17]||(n[17]=t=>b.value=t),type:"error",title:"오류",message:"오류가 발생했습니다. 다시 시도하시겠습니까?",onConfirm:n[18]||(n[18]=t=>v("오류")),onCancel:n[19]||(n[19]=t=>p("오류"))},null,8,["modelValue"])]),n[49]||(n[49]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiButton @click="showInfoConfirm = true">정보 대화상자</UiButton>
<UiConfirm
  v-model="showInfoConfirm"
  type="info"
  title="정보"
  message="새로운 정보가 있습니다. 확인하시겠습니까?"
  @confirm="handleConfirm"
  @cancel="handleCancel"
/>

<UiButton @click="showWarningConfirm = true">경고 대화상자</UiButton>
<UiConfirm
  v-model="showWarningConfirm"
  type="warning"
  title="경고"
  message="이 작업은 되돌릴 수 없습니다. 계속하시겠습니까?"
  @confirm="handleConfirm"
  @cancel="handleCancel"
/>`)])],-1))])]),l("section",X,[n[56]||(n[56]=l("h2",{class:"section-title"},"크기 옵션",-1)),n[57]||(n[57]=l("p",{class:"section-description"}," size 속성을 사용하여 대화상자의 크기를 조절할 수 있습니다. (small, medium, large) ",-1)),l("div",Y,[l("div",Z,[l("div",c,[e(m,{onClick:n[20]||(n[20]=t=>B.value=!0),class:"mb-2"},{default:o(()=>n[52]||(n[52]=[i("작은 대화상자")])),_:1,__:[52]}),e(m,{onClick:n[21]||(n[21]=t=>y.value=!0),class:"mb-2"},{default:o(()=>n[53]||(n[53]=[i("중간 대화상자")])),_:1,__:[53]}),e(m,{onClick:n[22]||(n[22]=t=>r.value=!0)},{default:o(()=>n[54]||(n[54]=[i("큰 대화상자")])),_:1,__:[54]})]),e(C,{modelValue:B.value,"onUpdate:modelValue":n[23]||(n[23]=t=>B.value=t),size:"small",title:"작은 대화상자",message:"작은 크기의 확인 대화상자입니다.",onConfirm:n[24]||(n[24]=t=>v("작은 크기")),onCancel:n[25]||(n[25]=t=>p("작은 크기"))},null,8,["modelValue"]),e(C,{modelValue:y.value,"onUpdate:modelValue":n[26]||(n[26]=t=>y.value=t),size:"medium",title:"중간 대화상자",message:"중간 크기의 확인 대화상자입니다.",onConfirm:n[27]||(n[27]=t=>v("중간 크기")),onCancel:n[28]||(n[28]=t=>p("중간 크기"))},null,8,["modelValue"]),e(C,{modelValue:r.value,"onUpdate:modelValue":n[29]||(n[29]=t=>r.value=t),size:"large",title:"큰 대화상자",message:"큰 크기의 확인 대화상자입니다.",onConfirm:n[30]||(n[30]=t=>v("큰 크기")),onCancel:n[31]||(n[31]=t=>p("큰 크기"))},null,8,["modelValue"])]),n[55]||(n[55]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiButton @click="showSmallConfirm = true">작은 대화상자</UiButton>
<UiConfirm
  v-model="showSmallConfirm"
  size="small"
  title="작은 대화상자"
  message="작은 크기의 확인 대화상자입니다."
  @confirm="handleConfirm"
  @cancel="handleCancel"
/>`)])],-1))])]),l("section",_,[n[60]||(n[60]=l("h2",{class:"section-title"},"버튼 커스터마이징",-1)),n[61]||(n[61]=l("p",{class:"section-description"}," 버튼 텍스트와 스타일을 커스터마이징할 수 있습니다. ",-1)),l("div",h,[l("div",ll,[e(m,{onClick:n[32]||(n[32]=t=>a.value=!0)},{default:o(()=>n[58]||(n[58]=[i("커스텀 버튼 대화상자")])),_:1,__:[58]}),e(C,{modelValue:a.value,"onUpdate:modelValue":n[33]||(n[33]=t=>a.value=t),type:"warning",title:"파일 삭제",message:"선택한 파일을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.","confirm-button-text":"삭제","cancel-button-text":"취소","confirm-button-variant":"primary","cancel-button-variant":"secondary-line",onConfirm:n[34]||(n[34]=t=>v("커스텀 버튼")),onCancel:n[35]||(n[35]=t=>p("커스텀 버튼"))},null,8,["modelValue"])]),n[59]||(n[59]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiConfirm
  v-model="showCustomButtonConfirm"
  type="warning"
  title="파일 삭제"
  message="선택한 파일을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
  confirm-button-text="삭제"
  cancel-button-text="취소"
  confirm-button-variant="primary"
  cancel-button-variant="secondary-line"
  @confirm="handleConfirm"
  @cancel="handleCancel"
/>`)])],-1))])]),l("section",nl,[n[70]||(n[70]=l("h2",{class:"section-title"},"슬롯 사용",-1)),n[71]||(n[71]=l("p",{class:"section-description"}," 기본 슬롯과 title, footer 슬롯을 사용하여 내용을 커스터마이징할 수 있습니다. ",-1)),l("div",tl,[l("div",el,[e(m,{onClick:n[36]||(n[36]=t=>d.value=!0)},{default:o(()=>n[62]||(n[62]=[i("슬롯 사용 대화상자")])),_:1,__:[62]}),e(C,{modelValue:d.value,"onUpdate:modelValue":n[39]||(n[39]=t=>d.value=t),type:"info",onConfirm:n[40]||(n[40]=t=>v("슬롯 사용")),onCancel:n[41]||(n[41]=t=>p("슬롯 사용"))},{title:o(()=>[l("div",ol,[e(T,{name:"heroicons:document-text",class:"mr-2"}),n[63]||(n[63]=i(" 약관 동의 "))])]),footer:o(()=>[e(m,{variant:"secondary-line",onClick:n[38]||(n[38]=t=>d.value=!1)},{default:o(()=>n[67]||(n[67]=[i("취소")])),_:1,__:[67]}),e(m,{variant:"primary",disabled:!x.value,onClick:I},{default:o(()=>n[68]||(n[68]=[i(" 동의 및 계속 ")])),_:1,__:[68]},8,["disabled"])]),default:o(()=>[l("div",sl,[n[65]||(n[65]=l("p",null,"서비스 이용을 위해 다음 약관에 동의해주세요:",-1)),n[66]||(n[66]=l("ul",null,[l("li",null,"개인정보 처리방침"),l("li",null,"서비스 이용약관"),l("li",null,"마케팅 정보 수신 동의 (선택)")],-1)),l("div",il,[e(z,{modelValue:x.value,"onUpdate:modelValue":n[37]||(n[37]=t=>x.value=t)},{default:o(()=>n[64]||(n[64]=[i("모든 약관에 동의합니다")])),_:1,__:[64]},8,["modelValue"])])])]),_:1},8,["modelValue"])]),n[69]||(n[69]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiConfirm
  v-model="showSlotConfirm"
  type="info"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
  <template #title>
    <div class="custom-title">
      <Icon name="heroicons:document-text" class="mr-2" />
      약관 동의
    </div>
  </template>

  <div class="custom-content">
    <p>서비스 이용을 위해 다음 약관에 동의해주세요:</p>
    <ul>
      <li>개인정보 처리방침</li>
      <li>서비스 이용약관</li>
      <li>마케팅 정보 수신 동의 (선택)</li>
    </ul>
    <div class="mt-3">
      <UiCheckbox v-model="termsAgreed">모든 약관에 동의합니다</UiCheckbox>
    </div>
  </div>

  <template #footer>
    <UiButton variant="secondary-line" @click="showSlotConfirm = false">취소</UiButton>
    <UiButton
      variant="primary"
      :disabled="!termsAgreed"
      @click="handleSlotConfirm"
    >
      동의 및 계속
    </UiButton>
  </template>
</UiConfirm>`)])],-1))])]),l("section",ul,[n[75]||(n[75]=l("h2",{class:"section-title"},"API 참조",-1)),n[76]||(n[76]=l("h3",{class:"subsection-title"},"Props",-1)),e(k,{bordered:""},{default:o(()=>n[72]||(n[72]=[l("colgroup",null,[l("col",{style:{width:"20%"}}),l("col",{style:{width:"20%"}}),l("col",{style:{width:"15%"}}),l("col",{style:{width:"45%"}})],-1),l("thead",null,[l("tr",null,[l("th",null,"이름"),l("th",null,"타입"),l("th",null,"기본값"),l("th",null,"설명")])],-1),l("tbody",null,[l("tr",null,[l("td",null,"modelValue"),l("td",null,"Boolean"),l("td",null,"false"),l("td",null,"대화상자 표시 여부 (v-model)")]),l("tr",null,[l("td",null,"type"),l("td",null,"String"),l("td",null,"info"),l("td",null,"대화상자 타입 (info, success, warning, error)")]),l("tr",null,[l("td",null,"size"),l("td",null,"String"),l("td",null,"medium"),l("td",null,"대화상자 크기 (small, medium, large)")]),l("tr",null,[l("td",null,"title"),l("td",null,"String"),l("td",null,"'확인'"),l("td",null,"대화상자 제목")]),l("tr",null,[l("td",null,"message"),l("td",null,"String"),l("td",null,"'계속 진행하시겠습니까?'"),l("td",null,"대화상자 메시지")]),l("tr",null,[l("td",null,"showIcon"),l("td",null,"Boolean"),l("td",null,"true"),l("td",null,"아이콘 표시 여부")]),l("tr",null,[l("td",null,"closeOnBackdropClick"),l("td",null,"Boolean"),l("td",null,"true"),l("td",null,"배경 클릭 시 닫기 여부")]),l("tr",null,[l("td",null,"showConfirmButton"),l("td",null,"Boolean"),l("td",null,"true"),l("td",null,"확인 버튼 표시 여부")]),l("tr",null,[l("td",null,"showCancelButton"),l("td",null,"Boolean"),l("td",null,"true"),l("td",null,"취소 버튼 표시 여부")]),l("tr",null,[l("td",null,"confirmButtonText"),l("td",null,"String"),l("td",null,"'확인'"),l("td",null,"확인 버튼 텍스트")]),l("tr",null,[l("td",null,"cancelButtonText"),l("td",null,"String"),l("td",null,"'취소'"),l("td",null,"취소 버튼 텍스트")]),l("tr",null,[l("td",null,"confirmButtonVariant"),l("td",null,"String"),l("td",null,"'primary'"),l("td",null,"확인 버튼 스타일 변형")]),l("tr",null,[l("td",null,"cancelButtonVariant"),l("td",null,"String"),l("td",null,"'secondary-line'"),l("td",null,"취소 버튼 스타일 변형")])],-1)])),_:1,__:[72]}),n[77]||(n[77]=l("h3",{class:"subsection-title mt-4"},"이벤트",-1)),e(k,{bordered:""},{default:o(()=>n[73]||(n[73]=[l("colgroup",null,[l("col",{style:{width:"30%"}}),l("col",{style:{width:"70%"}})],-1),l("thead",null,[l("tr",null,[l("th",null,"이름"),l("th",null,"설명")])],-1),l("tbody",null,[l("tr",null,[l("td",null,"update:modelValue"),l("td",null,"대화상자가 열리거나 닫힐 때 발생하는 이벤트")]),l("tr",null,[l("td",null,"confirm"),l("td",null,"확인 버튼 클릭 시 발생하는 이벤트")]),l("tr",null,[l("td",null,"cancel"),l("td",null,"취소 버튼 클릭 시 발생하는 이벤트")])],-1)])),_:1,__:[73]}),n[78]||(n[78]=l("h3",{class:"subsection-title mt-4"},"슬롯",-1)),e(k,{bordered:""},{default:o(()=>n[74]||(n[74]=[l("colgroup",null,[l("col",{style:{width:"30%"}}),l("col",{style:{width:"70%"}})],-1),l("thead",null,[l("tr",null,[l("th",null,"이름"),l("th",null,"설명")])],-1),l("tbody",null,[l("tr",null,[l("td",null,"default"),l("td",null,"대화상자 본문 내용을 커스터마이징할 수 있는 기본 슬롯")]),l("tr",null,[l("td",null,"title"),l("td",null,"대화상자 제목을 커스터마이징할 수 있는 슬롯")]),l("tr",null,[l("td",null,"footer"),l("td",null,"대화상자 푸터(버튼 영역)를 커스터마이징할 수 있는 슬롯")])],-1)])),_:1,__:[74]})])])}}},Cl=D(dl,[["__scopeId","data-v-2d4f7a69"]]);export{Cl as default};
