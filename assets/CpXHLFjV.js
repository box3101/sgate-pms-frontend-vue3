import{_ as e}from"./VrIpIiAj.js";import{B as b,c as r,a as l,b as d,w as n,t as s,o as i,F as a,g as p}from"./CoaInxY8.js";const v={class:"table-guide-container container-large"},x={class:"guide-section"},h={class:"example-container"},T={class:"example-preview"},y={class:"guide-section"},g={class:"example-container"},U={class:"example-preview"},w={class:"example-container"},f={class:"example-preview"},z={class:"example-container"},B={class:"example-preview"},k={class:"example-container"},L={class:"example-preview"},S={class:"guide-section"},C={class:"example-container"},F={class:"example-preview"},N={class:"example-container"},V={class:"example-preview"},j={class:"example-container"},A={class:"example-preview"},D={class:"guide-section"},E={class:"example-container"},H={class:"example-preview"},P={class:"example-container"},$={class:"example-preview"},q={class:"example-container"},G={class:"example-preview"},I={class:"guide-section"},J={class:"example-container"},K={class:"example-preview"},M={class:"guide-section"},O={class:"example-container"},Q={class:"example-preview"},R={class:"guide-section"},W={class:"example-container"},X={class:"example-preview"},Y={class:"example-code"},Z={class:"example-container"},_={class:"example-preview"},c={class:"example-code"},ll={class:"guide-section"},tl={class:"guide-section"},sl={__name:"Table",setup(nl){const m=b("logoText");return m.value="UiTable 가이드",(o,t)=>(i(),r("div",v,[t[72]||(t[72]=l("h1",{class:"page-title"},"UiTable 컴포넌트 사용 가이드",-1)),l("section",x,[t[4]||(t[4]=l("h2",{class:"section-title"},"기본 사용법",-1)),t[5]||(t[5]=l("p",{class:"section-description"}," UiTable 컴포넌트는 다양한 스타일과 레이아웃 옵션을 제공하는 테이블 컴포넌트입니다. 기본적인 사용 방법은 다음과 같습니다. ",-1)),l("div",h,[t[2]||(t[2]=l("h3",{class:"example-title"},"기본 테이블",-1)),l("div",T,[d(e,null,{header:n(()=>t[0]||(t[0]=[l("tr",null,[l("th",null,"이름"),l("th",null,"나이"),l("th",null,"직업")],-1)])),body:n(()=>t[1]||(t[1]=[l("tr",null,[l("td",null,"홍길동"),l("td",null,"30"),l("td",null,"개발자")],-1),l("tr",null,[l("td",null,"김철수"),l("td",null,"25"),l("td",null,"디자이너")],-1),l("tr",null,[l("td",null,"이영희"),l("td",null,"28"),l("td",null,"기획자")],-1)])),_:1})]),t[3]||(t[3]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiTable>
  <template #header>
    <tr>
      <th>이름</th>
      <th>나이</th>
      <th>직업</th>
    </tr>
  </template>
  <template #body>
    <tr>
      <td>홍길동</td>
      <td>30</td>
      <td>개발자</td>
    </tr>
    <tr>
      <td>김철수</td>
      <td>25</td>
      <td>디자이너</td>
    </tr>
    <tr>
      <td>이영희</td>
      <td>28</td>
      <td>기획자</td>
    </tr>
  </template>
</UiTable>`)])],-1))])]),l("section",y,[t[22]||(t[22]=l("h2",{class:"section-title"},"테이블 스타일 옵션",-1)),l("div",g,[t[8]||(t[8]=l("h3",{class:"example-title"},"테두리 있는 테이블 (bordered)",-1)),l("div",U,[d(e,{bordered:""},{header:n(()=>t[6]||(t[6]=[l("tr",null,[l("th",null,"이름"),l("th",null,"나이"),l("th",null,"직업")],-1)])),body:n(()=>t[7]||(t[7]=[l("tr",null,[l("td",null,"홍길동"),l("td",null,"30"),l("td",null,"개발자")],-1),l("tr",null,[l("td",null,"김철수"),l("td",null,"25"),l("td",null,"디자이너")],-1)])),_:1})]),t[9]||(t[9]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiTable bordered>
  <!-- 테이블 내용 -->
</UiTable>`)])],-1))]),l("div",w,[t[12]||(t[12]=l("h3",{class:"example-title"},"줄무늬 테이블 (striped)",-1)),l("div",f,[d(e,{striped:""},{header:n(()=>t[10]||(t[10]=[l("tr",null,[l("th",null,"이름"),l("th",null,"나이"),l("th",null,"직업")],-1)])),body:n(()=>t[11]||(t[11]=[l("tr",null,[l("td",null,"홍길동"),l("td",null,"30"),l("td",null,"개발자")],-1),l("tr",null,[l("td",null,"김철수"),l("td",null,"25"),l("td",null,"디자이너")],-1),l("tr",null,[l("td",null,"이영희"),l("td",null,"28"),l("td",null,"기획자")],-1),l("tr",null,[l("td",null,"박지민"),l("td",null,"32"),l("td",null,"마케터")],-1)])),_:1})]),t[13]||(t[13]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiTable striped>
  <!-- 테이블 내용 -->
</UiTable>`)])],-1))]),l("div",z,[t[16]||(t[16]=l("h3",{class:"example-title"},"호버 효과 테이블 (hover)",-1)),l("div",B,[d(e,{hover:""},{header:n(()=>t[14]||(t[14]=[l("tr",null,[l("th",null,"이름"),l("th",null,"나이"),l("th",null,"직업")],-1)])),body:n(()=>t[15]||(t[15]=[l("tr",null,[l("td",null,"홍길동"),l("td",null,"30"),l("td",null,"개발자")],-1),l("tr",null,[l("td",null,"김철수"),l("td",null,"25"),l("td",null,"디자이너")],-1),l("tr",null,[l("td",null,"이영희"),l("td",null,"28"),l("td",null,"기획자")],-1)])),_:1})]),t[17]||(t[17]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiTable hover>
  <!-- 테이블 내용 -->
</UiTable>`)])],-1))]),l("div",k,[t[20]||(t[20]=l("h3",{class:"example-title"},"스타일 조합 (bordered + striped + hover)",-1)),l("div",L,[d(e,{bordered:"",striped:"",hover:""},{header:n(()=>t[18]||(t[18]=[l("tr",null,[l("th",null,"이름"),l("th",null,"나이"),l("th",null,"직업")],-1)])),body:n(()=>t[19]||(t[19]=[l("tr",null,[l("td",null,"홍길동"),l("td",null,"30"),l("td",null,"개발자")],-1),l("tr",null,[l("td",null,"김철수"),l("td",null,"25"),l("td",null,"디자이너")],-1),l("tr",null,[l("td",null,"이영희"),l("td",null,"28"),l("td",null,"기획자")],-1),l("tr",null,[l("td",null,"박지민"),l("td",null,"32"),l("td",null,"마케터")],-1)])),_:1})]),t[21]||(t[21]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiTable bordered striped hover>
  <!-- 테이블 내용 -->
</UiTable>`)])],-1))])]),l("section",S,[t[35]||(t[35]=l("h2",{class:"section-title"},"테이블 크기 옵션",-1)),l("div",C,[t[25]||(t[25]=l("h3",{class:"example-title"},"작은 크기 (small)",-1)),l("div",F,[d(e,{bordered:"",size:"small"},{header:n(()=>t[23]||(t[23]=[l("tr",null,[l("th",null,"이름"),l("th",null,"나이"),l("th",null,"직업")],-1)])),body:n(()=>t[24]||(t[24]=[l("tr",null,[l("td",null,"홍길동"),l("td",null,"30"),l("td",null,"개발자")],-1),l("tr",null,[l("td",null,"김철수"),l("td",null,"25"),l("td",null,"디자이너")],-1)])),_:1})]),t[26]||(t[26]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiTable size="small">
  <!-- 테이블 내용 -->
</UiTable>`)])],-1))]),l("div",N,[t[29]||(t[29]=l("h3",{class:"example-title"},"중간 크기 (medium) - 기본값",-1)),l("div",V,[d(e,{bordered:"",size:"medium"},{header:n(()=>t[27]||(t[27]=[l("tr",null,[l("th",null,"이름"),l("th",null,"나이"),l("th",null,"직업")],-1)])),body:n(()=>t[28]||(t[28]=[l("tr",null,[l("td",null,"홍길동"),l("td",null,"30"),l("td",null,"개발자")],-1),l("tr",null,[l("td",null,"김철수"),l("td",null,"25"),l("td",null,"디자이너")],-1)])),_:1})]),t[30]||(t[30]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiTable size="medium">
  <!-- 테이블 내용 -->
</UiTable>`)])],-1))]),l("div",j,[t[33]||(t[33]=l("h3",{class:"example-title"},"큰 크기 (large)",-1)),l("div",A,[d(e,{bordered:"",size:"large"},{header:n(()=>t[31]||(t[31]=[l("tr",null,[l("th",null,"이름"),l("th",null,"나이"),l("th",null,"직업")],-1)])),body:n(()=>t[32]||(t[32]=[l("tr",null,[l("td",null,"홍길동"),l("td",null,"30"),l("td",null,"개발자")],-1),l("tr",null,[l("td",null,"김철수"),l("td",null,"25"),l("td",null,"디자이너")],-1)])),_:1})]),t[34]||(t[34]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiTable size="large">
  <!-- 테이블 내용 -->
</UiTable>`)])],-1))])]),l("section",D,[t[47]||(t[47]=l("h2",{class:"section-title"},"테이블 레이아웃 옵션",-1)),l("div",E,[t[38]||(t[38]=l("h3",{class:"example-title"},"수직 레이아웃 (vertical) - 기본값",-1)),l("div",H,[d(e,{bordered:"",layout:"vertical"},{header:n(()=>t[36]||(t[36]=[l("tr",null,[l("th",null,"이름"),l("th",null,"나이"),l("th",null,"직업")],-1)])),body:n(()=>t[37]||(t[37]=[l("tr",null,[l("td",null,"홍길동"),l("td",null,"30"),l("td",null,"개발자")],-1),l("tr",null,[l("td",null,"김철수"),l("td",null,"25"),l("td",null,"디자이너")],-1)])),_:1})]),t[39]||(t[39]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiTable layout="vertical">
  <!-- 테이블 내용 -->
</UiTable>`)])],-1))]),l("div",P,[t[41]||(t[41]=l("h3",{class:"example-title"},"수평 레이아웃 (horizontal)",-1)),l("div",$,[d(e,{bordered:"",layout:"horizontal"},{body:n(()=>t[40]||(t[40]=[l("tr",null,[l("th",null,"이름"),l("td",null,"홍길동")],-1),l("tr",null,[l("th",null,"나이"),l("td",null,"30")],-1),l("tr",null,[l("th",null,"직업"),l("td",null,"개발자")],-1),l("tr",null,[l("th",null,"이메일"),l("td",null,"hong@example.com")],-1)])),_:1})]),t[42]||(t[42]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiTable layout="horizontal">
  <template #body>
    <tr>
      <th>이름</th>
      <td>홍길동</td>
    </tr>
    <tr>
      <th>나이</th>
      <td>30</td>
    </tr>
    <tr>
      <th>직업</th>
      <td>개발자</td>
    </tr>
    <tr>
      <th>이메일</th>
      <td>hong@example.com</td>
    </tr>
  </template>
</UiTable>`)])],-1))]),l("div",q,[t[45]||(t[45]=l("h3",{class:"example-title"},"헤더 왼쪽 정렬 (isThLeft)",-1)),l("div",G,[d(e,{bordered:"",isThLeft:!0},{header:n(()=>t[43]||(t[43]=[l("tr",null,[l("th",null,"이름"),l("th",null,"나이"),l("th",null,"직업")],-1)])),body:n(()=>t[44]||(t[44]=[l("tr",null,[l("td",null,"홍길동"),l("td",null,"30"),l("td",null,"개발자")],-1),l("tr",null,[l("td",null,"김철수"),l("td",null,"25"),l("td",null,"디자이너")],-1)])),_:1})]),t[46]||(t[46]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiTable :isThLeft="true">
  <!-- 테이블 내용 -->
</UiTable>`)])],-1))])]),l("section",I,[t[53]||(t[53]=l("h2",{class:"section-title"},"열 너비 지정 (colgroup)",-1)),l("div",J,[t[51]||(t[51]=l("h3",{class:"example-title"},"colgroup 슬롯 사용",-1)),l("div",K,[d(e,{bordered:""},{colgroup:n(()=>t[48]||(t[48]=[l("col",{style:{width:"100px"}},null,-1),l("col",{style:{width:"80px"}},null,-1),l("col",null,null,-1)])),header:n(()=>t[49]||(t[49]=[l("tr",null,[l("th",null,"이름"),l("th",null,"나이"),l("th",null,"직업")],-1)])),body:n(()=>t[50]||(t[50]=[l("tr",null,[l("td",null,"홍길동"),l("td",null,"30"),l("td",null,"개발자")],-1),l("tr",null,[l("td",null,"김철수"),l("td",null,"25"),l("td",null,"디자이너")],-1)])),_:1})]),t[52]||(t[52]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiTable bordered>
  <template #colgroup>
    <col style="width: 100px" />
    <col style="width: 80px" />
    <col />
  </template>
  <!-- 테이블 내용 -->
</UiTable>`)])],-1))])]),l("section",M,[t[59]||(t[59]=l("h2",{class:"section-title"},"푸터 사용 예시",-1)),l("div",O,[t[57]||(t[57]=l("h3",{class:"example-title"},"footer 슬롯 사용",-1)),l("div",Q,[d(e,{bordered:""},{header:n(()=>t[54]||(t[54]=[l("tr",null,[l("th",null,"상품명"),l("th",null,"가격"),l("th",null,"수량"),l("th",null,"합계")],-1)])),body:n(()=>t[55]||(t[55]=[l("tr",null,[l("td",null,"상품 A"),l("td",null,"10,000원"),l("td",null,"2"),l("td",null,"20,000원")],-1),l("tr",null,[l("td",null,"상품 B"),l("td",null,"15,000원"),l("td",null,"1"),l("td",null,"15,000원")],-1),l("tr",null,[l("td",null,"상품 C"),l("td",null,"8,000원"),l("td",null,"3"),l("td",null,"24,000원")],-1)])),footer:n(()=>t[56]||(t[56]=[l("tr",null,[l("td",{colspan:"3",class:"text-center"},"총 합계"),l("td",null,"59,000원")],-1)])),_:1})]),t[58]||(t[58]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiTable bordered>
  <!-- 헤더와 바디 내용 -->
  <template #footer>
    <tr>
      <td colspan="3" class="text-center">총 합계</td>
      <td>59,000원</td>
    </tr>
  </template>
</UiTable>`)])],-1))])]),l("section",R,[t[64]||(t[64]=l("h2",{class:"section-title"},"스크롤 가능한 테이블",-1)),t[65]||(t[65]=l("p",{class:"section-description"}," 테이블의 행이 많아질 경우 스크롤 기능을 활성화하여 테이블의 높이를 제한할 수 있습니다. 스크롤 기능을 사용하면 테이블 헤더는 상단에 고정되고 본문만 스크롤됩니다. ",-1)),l("div",W,[t[61]||(t[61]=l("h3",{class:"example-title"},"스크롤 가능한 테이블 (scrollable)",-1)),l("div",X,[d(e,{scrollable:"","max-height":"200px"},{header:n(()=>t[60]||(t[60]=[l("tr",null,[l("th",null,"번호"),l("th",null,"이름"),l("th",null,"나이"),l("th",null,"직업")],-1)])),body:n(()=>[(i(),r(a,null,p(15,u=>l("tr",{key:u},[l("td",null,s(u),1),l("td",null,"사용자"+s(u),1),l("td",null,s(20+u),1),l("td",null,s(u%3===0?"개발자":u%3===1?"디자이너":"기획자"),1)])),64))]),_:1})]),l("div",Y,[l("pre",null,[l("code",null,`<UiTable scrollable :max-height="'200px'">
  <template #header>
    <tr>
      <th>번호</th>
      <th>이름</th>
      <th>나이</th>
      <th>직업</th>
    </tr>
  </template>
  <template #body>
    <tr v-for="i in 15" :key="i">
      <td>`+s(o.i)+`</td>
      <td>사용자`+s(o.i)+`</td>
      <td>`+s(20+o.i)+`</td>
      <td>`+s(o.i%3===0?"개발자":o.i%3===1?"디자이너":"기획자")+`</td>
    </tr>
  </template>
</UiTable>`,1)])])]),l("div",Z,[t[63]||(t[63]=l("h3",{class:"example-title"},"스크롤 + 스타일 조합",-1)),l("div",_,[d(e,{scrollable:"","max-height":"200px",bordered:"",striped:"",hover:""},{header:n(()=>t[62]||(t[62]=[l("tr",null,[l("th",null,"번호"),l("th",null,"이름"),l("th",null,"나이"),l("th",null,"직업")],-1)])),body:n(()=>[(i(),r(a,null,p(15,u=>l("tr",{key:u},[l("td",null,s(u),1),l("td",null,"사용자"+s(u),1),l("td",null,s(20+u),1),l("td",null,s(u%3===0?"개발자":u%3===1?"디자이너":"기획자"),1)])),64))]),_:1})]),l("div",c,[l("pre",null,[l("code",null,`<UiTable scrollable :max-height="'200px'" bordered striped hover>
  <template #header>
    <tr>
      <th>번호</th>
      <th>이름</th>
      <th>나이</th>
      <th>직업</th>
    </tr>
  </template>
  <template #body>
    <tr v-for="i in 15" :key="i">
      <td>`+s(o.i)+`</td>
      <td>사용자`+s(o.i)+`</td>
      <td>`+s(20+o.i)+`</td>
      <td>`+s(o.i%3===0?"개발자":o.i%3===1?"디자이너":"기획자")+`</td>
    </tr>
  </template>
</UiTable>`,1)])])])]),l("section",ll,[t[68]||(t[68]=l("h2",{class:"section-title"},"속성(Props) 요약",-1)),d(e,{bordered:""},{header:n(()=>t[66]||(t[66]=[l("tr",null,[l("th",null,"속성명"),l("th",null,"타입"),l("th",null,"기본값"),l("th",null,"설명")],-1)])),body:n(()=>t[67]||(t[67]=[l("tr",null,[l("td",null,"bordered"),l("td",null,"Boolean"),l("td",null,"false"),l("td",null,"테이블에 테두리를 표시합니다.")],-1),l("tr",null,[l("td",null,"striped"),l("td",null,"Boolean"),l("td",null,"false"),l("td",null,"홀수 행에 배경색을 적용하여 줄무늬 효과를 줍니다.")],-1),l("tr",null,[l("td",null,"hover"),l("td",null,"Boolean"),l("td",null,"false"),l("td",null,"행에 마우스를 올렸을 때 배경색 변경 효과를 적용합니다.")],-1),l("tr",null,[l("td",null,"size"),l("td",null,"String"),l("td",null,"'medium'"),l("td",null,"테이블의 크기를 설정합니다. 옵션: 'small', 'medium', 'large'")],-1),l("tr",null,[l("td",null,"layout"),l("td",null,"String"),l("td",null,"'vertical'"),l("td",null,"테이블 레이아웃을 설정합니다. 옵션: 'vertical', 'horizontal'")],-1),l("tr",null,[l("td",null,"isThLeft"),l("td",null,"Boolean"),l("td",null,"false"),l("td",null,"헤더(th) 텍스트를 왼쪽 정렬합니다. 기본값은 가운데 정렬입니다.")],-1),l("tr",null,[l("td",null,"scrollable"),l("td",null,"Boolean"),l("td",null,"false"),l("td",null,"테이블의 스크롤 기능을 활성화합니다. 헤더는 고정되고 본문만 스크롤됩니다.")],-1),l("tr",null,[l("td",null,"maxHeight"),l("td",null,"String"),l("td",null,"'400px'"),l("td",null,"테이블의 최대 높이를 지정합니다. scrollable이 true일 때만 적용됩니다.")],-1)])),_:1})]),l("section",tl,[t[71]||(t[71]=l("h2",{class:"section-title"},"슬롯(Slots) 요약",-1)),d(e,{bordered:""},{header:n(()=>t[69]||(t[69]=[l("tr",null,[l("th",null,"슬롯명"),l("th",null,"설명")],-1)])),body:n(()=>t[70]||(t[70]=[l("tr",null,[l("td",null,"colgroup"),l("td",null,"테이블 열의 너비를 지정할 때 사용합니다.")],-1),l("tr",null,[l("td",null,"header"),l("td",null,'테이블 헤더를 정의합니다. layout="horizontal"일 때는 표시되지 않습니다.')],-1),l("tr",null,[l("td",null,"body"),l("td",null,"테이블 본문을 정의합니다.")],-1),l("tr",null,[l("td",null,"footer"),l("td",null,"테이블 푸터를 정의합니다.")],-1)])),_:1})])]))}};export{sl as default};
