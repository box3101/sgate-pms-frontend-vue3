import{_ as e}from"./BPArNxhO.js";import{_ as i,c as n,a,y as d,b as s,w as o,o as p}from"./DepGCX_S.js";const r={name:"TooltipPage"},v={class:"component-page"},m={class:"component-section"},u={class:"example-wrapper"},g={class:"example-preview"},c={class:"component-section"},b={class:"example-wrapper"},x={class:"example-preview position-examples"},f={class:"component-section"},w={class:"example-wrapper"},T={class:"example-preview"},U={class:"component-section"},y={class:"example-wrapper"},k={class:"example-preview"},S={class:"component-section"},$={class:"example-wrapper"},B={class:"example-preview"},N={class:"tooltip-wrapper"};function V(P,t,C,E,I,j){const l=e;return p(),n("div",v,[t[34]||(t[34]=a("div",{class:"component-header"},[a("h1",{class:"component-title"},"툴팁 컴포넌트"),a("p",{class:"component-description"}," 마우스 오버 또는 클릭 시 추가 정보를 제공하는 툴팁 컴포넌트입니다. 다양한 위치와 트리거 방식을 지원합니다. ")],-1)),a("div",m,[t[3]||(t[3]=a("h2",{class:"section-title"},"기본 사용법",-1)),a("div",u,[a("div",g,[s(l,{title:"툴팁 제목"},{trigger:o(()=>t[0]||(t[0]=[a("button",{class:"example-button"},"마우스 오버",-1)])),default:o(()=>[t[1]||(t[1]=a("p",null,"기본 툴팁 내용입니다.",-1))]),_:1})]),t[2]||(t[2]=a("div",{class:"example-code"},[a("pre",null,[a("code",null,`<UiTooltip title="툴팁 제목">
  <template #trigger>
    <button>마우스 오버</button>
  </template>
  <p>기본 툴팁 내용입니다.</p>
</UiTooltip>`)])],-1))])]),a("div",c,[t[13]||(t[13]=a("h2",{class:"section-title"},"위치 설정",-1)),t[14]||(t[14]=a("p",{class:"section-description"}," position 속성을 사용하여 툴팁의 위치를 지정할 수 있습니다. 지원되는 위치: top, right, bottom, left ",-1)),a("div",b,[a("div",x,[s(l,{title:"위쪽 툴팁",position:"top"},{trigger:o(()=>t[4]||(t[4]=[a("button",{class:"example-button"},"위쪽",-1)])),default:o(()=>[t[5]||(t[5]=a("p",null,"위쪽에 표시되는 툴팁입니다.",-1))]),_:1}),s(l,{title:"오른쪽 툴팁",position:"right"},{trigger:o(()=>t[6]||(t[6]=[a("button",{class:"example-button"},"오른쪽",-1)])),default:o(()=>[t[7]||(t[7]=a("p",null,"오른쪽에 표시되는 툴팁입니다.",-1))]),_:1}),s(l,{title:"아래쪽 툴팁",position:"bottom"},{trigger:o(()=>t[8]||(t[8]=[a("button",{class:"example-button"},"아래쪽",-1)])),default:o(()=>[t[9]||(t[9]=a("p",null,"아래쪽에 표시되는 툴팁입니다.",-1))]),_:1}),s(l,{title:"왼쪽 툴팁",position:"left"},{trigger:o(()=>t[10]||(t[10]=[a("button",{class:"example-button"},"왼쪽",-1)])),default:o(()=>[t[11]||(t[11]=a("p",null,"왼쪽에 표시되는 툴팁입니다.",-1))]),_:1})]),t[12]||(t[12]=a("div",{class:"example-code"},[a("pre",null,[a("code",null,`<UiTooltip title="툴팁 제목" position="top|right|bottom|left">
  <template #trigger>
    <button>트리거 요소</button>
  </template>
  <p>툴팁 내용</p>
</UiTooltip>`)])],-1))])]),a("div",f,[t[19]||(t[19]=a("h2",{class:"section-title"},"트리거 방식",-1)),t[20]||(t[20]=a("p",{class:"section-description"}," trigger 속성을 사용하여 툴팁이 표시되는 방식을 지정할 수 있습니다. 지원되는 트리거: hover(기본값), click ",-1)),a("div",w,[a("div",T,[s(l,{title:"클릭 툴팁",trigger:"click"},{trigger:o(()=>t[15]||(t[15]=[a("button",{class:"example-button"},"클릭하세요",-1)])),default:o(()=>[t[16]||(t[16]=a("p",null,"클릭 시 표시되는 툴팁입니다.",-1)),t[17]||(t[17]=a("p",null,"외부를 클릭하면 닫힙니다.",-1))]),_:1})]),t[18]||(t[18]=a("div",{class:"example-code"},[a("pre",null,[a("code",null,`<UiTooltip title="클릭 툴팁" trigger="click">
  <template #trigger>
    <button>클릭하세요</button>
  </template>
  <p>클릭 시 표시되는 툴팁입니다.</p>
  <p>외부를 클릭하면 닫힙니다.</p>
</UiTooltip>`)])],-1))])]),a("div",U,[t[25]||(t[25]=a("h2",{class:"section-title"},"커스텀 타이틀",-1)),t[26]||(t[26]=a("p",{class:"section-description"}," title 속성 대신 #title 슬롯을 사용하여 타이틀을 커스터마이징할 수 있습니다. ",-1)),a("div",y,[a("div",k,[s(l,null,{trigger:o(()=>t[21]||(t[21]=[a("button",{class:"example-button"},"커스텀 타이틀",-1)])),title:o(()=>t[22]||(t[22]=[a("strong",{style:{color:"#4a6cf7"}},"커스텀 스타일 타이틀",-1)])),default:o(()=>[t[23]||(t[23]=a("p",null,"타이틀에 커스텀 스타일을 적용할 수 있습니다.",-1))]),_:1})]),t[24]||(t[24]=a("div",{class:"example-code"},[a("pre",null,[a("code",null,`<UiTooltip>
  <template #trigger>
    <button>커스텀 타이틀</button>
  </template>
  <template #title>
    <strong style="color: #4a6cf7;">커스텀 스타일 타이틀</strong>
  </template>
  <p>타이틀에 커스텀 스타일을 적용할 수 있습니다.</p>
</UiTooltip>`)])],-1))])]),a("div",S,[t[32]||(t[32]=a("h2",{class:"section-title"},"실제 사용 예시",-1)),t[33]||(t[33]=a("p",{class:"section-description"},"아이콘과 함께 사용하는 툴팁 예시입니다.",-1)),a("div",$,[a("div",B,[a("div",N,[s(l,null,{trigger:o(()=>t[27]||(t[27]=[a("i",{class:"icon-md icon-get"},null,-1)])),title:o(()=>t[28]||(t[28]=[a("strong",null,"등급척도그룹 가져오기란?",-1)])),default:o(()=>[t[29]||(t[29]=a("p",null,"다른 심사자가 작성한 등급척도그룹을 내 등급척도그룹에 추가합니다.",-1)),t[30]||(t[30]=a("p",null,"가져온 등급척도그룹은 내 등급척도그룹 목록에서 확인할 수 있습니다.",-1))]),_:1})])]),t[31]||(t[31]=a("div",{class:"example-code"},[a("pre",null,[a("code",null,`<div class="tooltip-wrapper">
  <UiTooltip>
    <template #trigger>
      <i class="icon-md icon-get"></i>
    </template>
    <template #title>
      <strong>등급척도그룹 가져오기란?</strong>
    </template>
    <p>다른 심사자가 작성한 등급척도그룹을 내 등급척도그룹에 추가합니다.</p>
    <p>가져온 등급척도그룹은 내 등급척도그룹 목록에서 확인할 수 있습니다.</p>
  </UiTooltip>
</div>`)])],-1))])]),t[35]||(t[35]=d('<div class="component-section" data-v-8a491ca4><h2 class="section-title" data-v-8a491ca4>Props</h2><table class="props-table" data-v-8a491ca4><thead data-v-8a491ca4><tr data-v-8a491ca4><th data-v-8a491ca4>이름</th><th data-v-8a491ca4>타입</th><th data-v-8a491ca4>기본값</th><th data-v-8a491ca4>설명</th></tr></thead><tbody data-v-8a491ca4><tr data-v-8a491ca4><td data-v-8a491ca4>title</td><td data-v-8a491ca4>String</td><td data-v-8a491ca4>&#39;&#39;</td><td data-v-8a491ca4>툴팁 제목 (title 슬롯을 사용하면 무시됨)</td></tr><tr data-v-8a491ca4><td data-v-8a491ca4>position</td><td data-v-8a491ca4>String</td><td data-v-8a491ca4>&#39;bottom&#39;</td><td data-v-8a491ca4>툴팁 위치 (top, right, bottom, left)</td></tr><tr data-v-8a491ca4><td data-v-8a491ca4>trigger</td><td data-v-8a491ca4>String</td><td data-v-8a491ca4>&#39;hover&#39;</td><td data-v-8a491ca4>툴팁 트리거 방식 (hover, click)</td></tr></tbody></table></div><div class="component-section" data-v-8a491ca4><h2 class="section-title" data-v-8a491ca4>Slots</h2><table class="props-table" data-v-8a491ca4><thead data-v-8a491ca4><tr data-v-8a491ca4><th data-v-8a491ca4>이름</th><th data-v-8a491ca4>설명</th></tr></thead><tbody data-v-8a491ca4><tr data-v-8a491ca4><td data-v-8a491ca4>trigger</td><td data-v-8a491ca4>툴팁을 트리거할 요소</td></tr><tr data-v-8a491ca4><td data-v-8a491ca4>title</td><td data-v-8a491ca4>툴팁 제목 (title prop보다 우선 적용)</td></tr><tr data-v-8a491ca4><td data-v-8a491ca4>default</td><td data-v-8a491ca4>툴팁 내용</td></tr></tbody></table></div>',2))])}const A=i(r,[["render",V],["__scopeId","data-v-8a491ca4"]]);export{A as default};
