import g from"./C1qHZdop.js";import V from"./B2wRKOCC.js";import{_ as x,r as a,c as k,a as e,b as n,w as t,o as C,d as s}from"./DQiIi3xA.js";import"./B8PkfAZR.js";const B={class:"container"},L={class:"component-section"},$={class:"component-demo"},z={class:"component-section"},_={class:"component-demo"},w={class:"flex gap-4 flex-wrap"},S={class:"component-section"},X={class:"component-demo"},b={class:"flex gap-4"},y={class:"component-section"},N={class:"component-demo"},j={class:"flex justify-end gap-2"},A={__name:"Popup",setup(F){const m=a(!1),p=a(!1),r=a(!1),v=a(!1),f=a(!1),M=a(!1),U=a(!1),u=a(!1);return(P,l)=>{const d=g,i=V;return C(),k("div",B,[l[44]||(l[44]=e("h1",{class:"page-title"},"팝업(Modal) 컴포넌트",-1)),l[45]||(l[45]=e("p",{class:"page-description"}," 팝업 컴포넌트는 사용자에게 중요한 정보를 표시하거나 작업을 수행하도록 하는 오버레이 창입니다. ",-1)),e("section",L,[l[20]||(l[20]=e("h2",{class:"section-title"},"기본 팝업",-1)),e("div",$,[n(d,{onClick:l[0]||(l[0]=o=>m.value=!0)},{default:t(()=>l[18]||(l[18]=[s("기본 팝업 열기")])),_:1,__:[18]}),n(i,{modelValue:m.value,"onUpdate:modelValue":l[1]||(l[1]=o=>m.value=o),title:"기본 팝업"},{default:t(()=>l[19]||(l[19]=[e("p",null,"이것은 기본 팝업의 내용입니다.",-1),e("p",null,"팝업은 사용자의 주의를 끌기 위해 사용됩니다.",-1)])),_:1,__:[19]},8,["modelValue"])]),l[21]||(l[21]=e("div",{class:"code-example"},[e("pre",null,[e("code",null,`<UiButton @click="basicModal = true">기본 팝업 열기</UiButton>

<UiModal v-model="basicModal" title="기본 팝업">
  <p>이것은 기본 팝업의 내용입니다.</p>
  <p>팝업은 사용자의 주의를 끌기 위해 사용됩니다.</p>
</UiModal>`)])],-1))]),e("section",z,[l[30]||(l[30]=e("h2",{class:"section-title"},"크기 변형",-1)),e("div",_,[e("div",w,[n(d,{onClick:l[2]||(l[2]=o=>p.value=!0)},{default:t(()=>l[22]||(l[22]=[s("Small")])),_:1,__:[22]}),n(d,{onClick:l[3]||(l[3]=o=>r.value=!0)},{default:t(()=>l[23]||(l[23]=[s("Medium")])),_:1,__:[23]}),n(d,{onClick:l[4]||(l[4]=o=>v.value=!0)},{default:t(()=>l[24]||(l[24]=[s("Large")])),_:1,__:[24]}),n(d,{onClick:l[5]||(l[5]=o=>f.value=!0)},{default:t(()=>l[25]||(l[25]=[s("XLarge")])),_:1,__:[25]})]),n(i,{modelValue:p.value,"onUpdate:modelValue":l[6]||(l[6]=o=>p.value=o),title:"Small 팝업",size:"small"},{default:t(()=>l[26]||(l[26]=[e("p",null,"Small 크기의 팝업입니다.",-1)])),_:1,__:[26]},8,["modelValue"]),n(i,{modelValue:r.value,"onUpdate:modelValue":l[7]||(l[7]=o=>r.value=o),title:"Medium 팝업",size:"medium"},{default:t(()=>l[27]||(l[27]=[e("p",null,"Medium 크기의 팝업입니다.",-1)])),_:1,__:[27]},8,["modelValue"]),n(i,{modelValue:v.value,"onUpdate:modelValue":l[8]||(l[8]=o=>v.value=o),title:"Large 팝업",size:"large"},{default:t(()=>l[28]||(l[28]=[e("p",null,"Large 크기의 팝업입니다.",-1)])),_:1,__:[28]},8,["modelValue"]),n(i,{modelValue:f.value,"onUpdate:modelValue":l[9]||(l[9]=o=>f.value=o),title:"XLarge 팝업",size:"xlarge"},{default:t(()=>l[29]||(l[29]=[e("p",null,"XLarge 크기의 팝업입니다.",-1)])),_:1,__:[29]},8,["modelValue"])]),l[31]||(l[31]=e("div",{class:"code-example"},[e("pre",null,[e("code",null,`<UiModal v-model="smallModal" title="Small 팝업" size="small">
  <p>Small 크기의 팝업입니다.</p>
</UiModal>

<UiModal v-model="mediumModal" title="Medium 팝업" size="medium">
  <p>Medium 크기의 팝업입니다.</p>
</UiModal>

<UiModal v-model="largeModal" title="Large 팝업" size="large">
  <p>Large 크기의 팝업입니다.</p>
</UiModal>

<UiModal v-model="xlargeModal" title="XLarge 팝업" size="xlarge">
  <p>XLarge 크기의 팝업입니다.</p>
</UiModal>`)])],-1))]),e("section",S,[l[36]||(l[36]=e("h2",{class:"section-title"},"위치 옵션",-1)),e("div",X,[e("div",b,[n(d,{onClick:l[10]||(l[10]=o=>M.value=!0)},{default:t(()=>l[32]||(l[32]=[s("중앙 정렬")])),_:1,__:[32]}),n(d,{onClick:l[11]||(l[11]=o=>U.value=!0)},{default:t(()=>l[33]||(l[33]=[s("오른쪽 정렬")])),_:1,__:[33]})]),n(i,{modelValue:M.value,"onUpdate:modelValue":l[12]||(l[12]=o=>M.value=o),title:"중앙 정렬 팝업",centered:""},{default:t(()=>l[34]||(l[34]=[e("p",null,"이 팝업은 화면 중앙에 정렬됩니다.",-1)])),_:1,__:[34]},8,["modelValue"]),n(i,{modelValue:U.value,"onUpdate:modelValue":l[13]||(l[13]=o=>U.value=o),title:"오른쪽 정렬 팝업",position:"right"},{default:t(()=>l[35]||(l[35]=[e("p",null,"이 팝업은 화면 오른쪽에 정렬됩니다.",-1),e("p",null,"크기 조절 핸들을 드래그하여 너비를 조절할 수 있습니다.",-1)])),_:1,__:[35]},8,["modelValue"])]),l[37]||(l[37]=e("div",{class:"code-example"},[e("pre",null,[e("code",null,`<UiModal v-model="centeredModal" title="중앙 정렬 팝업" centered>
  <p>이 팝업은 화면 중앙에 정렬됩니다.</p>
</UiModal>

<UiModal v-model="rightModal" title="오른쪽 정렬 팝업" position="right">
  <p>이 팝업은 화면 오른쪽에 정렬됩니다.</p>
  <p>크기 조절 핸들을 드래그하여 너비를 조절할 수 있습니다.</p>
</UiModal>`)])],-1))]),e("section",y,[l[42]||(l[42]=e("h2",{class:"section-title"},"푸터 사용",-1)),e("div",N,[n(d,{onClick:l[14]||(l[14]=o=>u.value=!0)},{default:t(()=>l[38]||(l[38]=[s("푸터가 있는 팝업 열기")])),_:1,__:[38]}),n(i,{modelValue:u.value,"onUpdate:modelValue":l[17]||(l[17]=o=>u.value=o),title:"푸터가 있는 팝업",showFooter:""},{footerActions:t(()=>[e("div",j,[n(d,{variant:"secondary",onClick:l[15]||(l[15]=o=>u.value=!1)},{default:t(()=>l[39]||(l[39]=[s("취소")])),_:1,__:[39]}),n(d,{onClick:l[16]||(l[16]=o=>u.value=!1)},{default:t(()=>l[40]||(l[40]=[s("확인")])),_:1,__:[40]})])]),default:t(()=>[l[41]||(l[41]=e("p",null,"이 팝업에는 푸터 영역이 있습니다.",-1))]),_:1,__:[41]},8,["modelValue"])]),l[43]||(l[43]=e("div",{class:"code-example"},[e("pre",null,[e("code",null,`<UiModal v-model="footerModal" title="푸터가 있는 팝업" showFooter>
  <p>이 팝업에는 푸터 영역이 있습니다.</p>

  <template #footerActions>
    <div class="flex justify-end gap-2">
      <UiButton variant="secondary" @click="footerModal = false">취소</UiButton>
      <UiButton @click="footerModal = false">확인</UiButton>
    </div>
  </template>
</UiModal>`)])],-1))])])}}},D=x(A,[["__scopeId","data-v-19277515"]]);export{D as default};
