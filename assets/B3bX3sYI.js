import C from"./CuBVUqgX.js";import R from"./BcWBNjX4.js";import j from"./RE_F8qNO.js";import{D as A,r as B,c as i,a as l,b as e,w as n,t as r,o as p,F as f,g as T,x as O,m as v,d as m}from"./BkeBB1cP.js";import"./DIs55dts.js";import"./BZOzsHvv.js";const I={class:"table-guide-container container-large"},E={class:"guide-section"},$={class:"example-container"},H={class:"example-preview"},L={class:"guide-section"},N={class:"example-container"},F={class:"example-preview"},P={style:{width:"40px"}},M=["onClick","draggable","onDragstart","onDragover","onDrop","onDragend"],X={key:0,class:"row-checkbox"},q={key:1,class:"drag-handle"},G={class:"example-container"},J={class:"guide-section"},K={class:"example-container"},Q={class:"example-preview"},W={class:"guide-section"},Y={class:"example-container"},Z={class:"example-preview"},_={class:"example-code"},ll={class:"guide-section"},tl={class:"example-container"},nl={class:"example-preview"},el={class:"example-container"},dl={class:"example-preview"},ol={class:"guide-section"},sl={class:"example-container"},ul={class:"example-preview"},rl={class:"example-container"},al={class:"example-preview"},il={class:"guide-section"},pl={class:"example-container"},ml={class:"example-preview"},bl={class:"guide-section"},gl={class:"guide-section"},vl={class:"guide-section"},Vl={__name:"Table",setup(xl){const V=A("logoText");V.value="UiTable 가이드";const w=B([{id:1,name:"홍길동",age:30,job:"개발자"},{id:2,name:"김철수",age:25,job:"디자이너"},{id:3,name:"이영희",age:28,job:"기획자"}]),c=a=>{console.log("저장된 데이터:",a)};return(a,t)=>{const d=C,U=R,x=j;return p(),i("div",I,[t[68]||(t[68]=l("h1",{class:"page-title"},"UiTable 컴포넌트 사용 가이드",-1)),l("section",E,[t[9]||(t[9]=l("h2",{class:"section-title"},"기본 사용법",-1)),t[10]||(t[10]=l("p",{class:"section-description"}," UiTable 컴포넌트는 다양한 스타일과 레이아웃 옵션을 제공하는 테이블 컴포넌트입니다. 기본적인 사용 방법은 다음과 같습니다. ",-1)),l("div",$,[t[7]||(t[7]=l("h3",{class:"example-title"},"기본 테이블",-1)),l("div",H,[e(d,null,{header:n(()=>t[5]||(t[5]=[l("tr",null,[l("th",null,"이름"),l("th",null,"나이"),l("th",null,"직업")],-1)])),body:n(()=>t[6]||(t[6]=[l("tr",null,[l("td",null,"홍길동2"),l("td",null,"30"),l("td",null,"개발자")],-1),l("tr",null,[l("td",null,"김철수"),l("td",null,"25"),l("td",null,"디자이너")],-1),l("tr",null,[l("td",null,"이영희"),l("td",null,"28"),l("td",null,"기획자")],-1)])),_:1})]),t[8]||(t[8]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiTable>
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
</UiTable>`)])],-1))])]),l("section",L,[t[20]||(t[20]=l("h2",{class:"section-title"},"테이블 편집 기능",-1)),t[21]||(t[21]=l("p",{class:"section-description"}," UiTable 컴포넌트는 행 추가, 삭제, 정렬 등의 편집 기능을 제공합니다. 이 기능들은 `editable` 속성을 통해 활성화할 수 있습니다. ",-1)),l("div",N,[t[15]||(t[15]=l("h3",{class:"example-title"},"편집 가능한 테이블 (editable)",-1)),l("div",F,[e(d,{modelValue:w.value,"onUpdate:modelValue":t[4]||(t[4]=s=>w.value=s),editable:"",hover:"","default-row-data":{name:"",job:"",age:0},onSave:c},{header:n(({selectAll:s,isAllSelected:b,sortable:h})=>[l("tr",null,[l("th",P,[e(U,{modelValue:b,"onUpdate:modelValue":s,size:"large"},null,8,["modelValue","onUpdate:modelValue"])]),t[11]||(t[11]=l("th",null,"이름",-1)),t[12]||(t[12]=l("th",null,"나이",-1)),t[13]||(t[13]=l("th",null,"직업",-1))])]),body:n(({rows:s,toggleRowSelection:b,isRowSelected:h,handleDragStart:D,handleDragOver:z,handleDrop:k,handleDragEnd:S,sortable:g})=>[(p(!0),i(f,null,T(s,(u,y)=>(p(),i("tr",{key:u.id,onClick:o=>!g&&b(u),class:O({selected:h(u),"sortable-row":g}),draggable:g,onDragstart:o=>D(o,y),onDragover:o=>z(o),onDrop:o=>k(o,y),onDragend:S},[l("td",null,[g?(p(),i("div",q,t[14]||(t[14]=[l("i",{class:"icon-md icon-drag"},null,-1)]))):(p(),i("div",X,[e(U,{modelValue:h(u),"onUpdate:modelValue":o=>b(u),size:"large",onClick:t[0]||(t[0]=v(()=>{},["stop"]))},null,8,["modelValue","onUpdate:modelValue"])]))]),l("td",null,[e(x,{modelValue:u.name,"onUpdate:modelValue":o=>u.name=o,size:"large",clearable:!0,onClick:t[1]||(t[1]=v(()=>{},["stop"]))},null,8,["modelValue","onUpdate:modelValue"])]),l("td",null,[e(x,{modelValue:u.age,"onUpdate:modelValue":o=>u.age=o,size:"large",type:"number",onClick:t[2]||(t[2]=v(()=>{},["stop"]))},null,8,["modelValue","onUpdate:modelValue"])]),l("td",null,[e(x,{modelValue:u.job,"onUpdate:modelValue":o=>u.job=o,size:"large",clearable:!0,onClick:t[3]||(t[3]=v(()=>{},["stop"]))},null,8,["modelValue","onUpdate:modelValue"])])],42,M))),128))]),_:1},8,["modelValue"])]),t[16]||(t[16]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiTable
  v-model="tableData"
  editable
  bordered
  hover
  :default-row-data="{ name: '', job: '', age: 0 }"
  @save="handleSave"
>
  <template #header="{ selectAll, isAllSelected, sortable }">
    <tr>
      <th style="width: 40px">
        <UiCheckbox
          :modelValue="isAllSelected"
          @update:modelValue="selectAll"
          size="large"
        />
      </th>
      <th>이름</th>
      <th>나이</th>
      <th>직업</th>
    </tr>
  </template>
  <template
    #body="{
      rows,
      toggleRowSelection,
      isRowSelected,
      handleDragStart,
      handleDragOver,
      handleDrop,
      handleDragEnd,
      sortable
    }"
  >
    <tr
      v-for="(item, index) in rows"
      :key="item.id"
      @click="!sortable && toggleRowSelection(item)"
      :class="{
        selected: isRowSelected(item),
        'sortable-row': sortable
      }"
      :draggable="sortable"
      @dragstart="e => handleDragStart(e, index)"
      @dragover="e => handleDragOver(e)"
      @drop="e => handleDrop(e, index)"
      @dragend="handleDragEnd"
    >
      <td>
        <div v-if="!sortable" class="row-checkbox">
          <UiCheckbox
            :modelValue="isRowSelected(item)"
            @update:modelValue="toggleRowSelection(item)"
            size="large"
            @click.stop
          />
        </div>
        <div v-else class="drag-handle">
          <i class="icon-md icon-drag"></i>
        </div>
      </td>
      <td>
        <UiInput
          v-model="item.name"
          size="large"
          :clearable="true"
          @click.stop
        />
      </td>
      <td>
        <UiInput
          v-model="item.age"
          size="large"
          type="number"
          @click.stop
        />
      </td>
      <td>
        <UiInput
          v-model="item.job"
          size="large"
          :clearable="true"
          @click.stop
        />
      </td>
    </tr>
  </template>
</UiTable>`)])],-1))]),t[22]||(t[22]=l("div",{class:"example-container"},[l("h3",{class:"example-title"},"스크립트 설정"),l("div",{class:"example-code"},[l("pre",null,[l("code",null,`import { ref } from 'vue'

const tableData = ref([
  { id: 1, name: '홍길동', age: 30, job: '개발자' },
  { id: 2, name: '김철수', age: 25, job: '디자이너' },
  { id: 3, name: '이영희', age: 28, job: '기획자' }
])

const handleSave = (data) => {
  console.log('저장된 데이터:', data)
  // API 호출 등의 저장 로직
}

const handleRowAdded = (newRow) => {
  console.log('새 행 추가됨:', newRow)
}

const handleRowDeleted = (deletedRows) => {
  console.log('행 삭제됨:', deletedRows)
}

const handleOrderChanged = ({ from, to, rows }) => {
  console.log(\`행 이동: \${from} → \${to}\`)
  console.log('변경된 순서:', rows)
}`)])])],-1)),l("div",G,[t[19]||(t[19]=l("h3",{class:"example-title"},"편집 기능 설명",-1)),e(d,{bordered:""},{header:n(()=>t[17]||(t[17]=[l("tr",null,[l("th",null,"기능"),l("th",null,"설명")],-1)])),body:n(()=>t[18]||(t[18]=[l("tr",null,[l("td",null,"행 추가"),l("td",null,[m(" '+' 버튼을 클릭하면 새로운 행이 추가됩니다. 새 행의 기본 데이터는 "),l("code",null,"defaultRowData"),m(" 속성을 통해 설정할 수 있습니다. ")])],-1),l("tr",null,[l("td",null,"행 삭제"),l("td",null," 체크박스로 행을 선택한 후 삭제 버튼을 클릭하면 선택된 행이 삭제됩니다. 여러 행을 동시에 선택하여 삭제할 수 있습니다. ")],-1),l("tr",null,[l("td",null,"행 정렬"),l("td",null,[m(" 정렬 버튼을 클릭하면 정렬 모드로 전환됩니다. 정렬 모드에서는 행을 드래그하여 순서를 변경할 수 있습니다. 기본적으로 정렬 기능은 비활성화되어 있으며, "),l("code",null,"sortableOption"),m(" 속성을 통해 활성화할 수 있습니다. ")])],-1),l("tr",null,[l("td",null,"데이터 저장"),l("td",null,[m(" 저장 버튼을 클릭하면 "),l("code",null,"save"),m(" 이벤트가 발생하며, 이벤트 핸들러를 통해 현재 테이블 데이터를 처리할 수 있습니다. ")])],-1)])),_:1})])]),l("section",J,[t[26]||(t[26]=l("h2",{class:"section-title"},"테이블 레이아웃 옵션",-1)),t[27]||(t[27]=l("p",{class:"section-description"}," UiTable 컴포넌트는 두 가지 레이아웃 옵션을 제공합니다: 'vertical'(기본값)과 'horizontal'. 'vertical' 레이아웃은 일반적인 테이블 형태로, 헤더가 상단에 위치합니다. 'horizontal' 레이아웃은 th가 좌측에, td가 우측에 배치되는 형태입니다. ",-1)),l("div",K,[t[24]||(t[24]=l("h3",{class:"example-title"},'수평 레이아웃 테이블 (layout="horizontal")',-1)),l("div",Q,[e(d,{bordered:"",layout:"horizontal",isThLeft:""},{body:n(()=>t[23]||(t[23]=[l("tr",null,[l("th",null,"이름"),l("td",null,"홍길동")],-1),l("tr",null,[l("th",null,"나이"),l("td",null,"30")],-1),l("tr",null,[l("th",null,"직업"),l("td",null,"개발자")],-1),l("tr",null,[l("th",null,"이메일"),l("td",null,"hong@example.com")],-1)])),_:1})]),t[25]||(t[25]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiTable bordered layout="horizontal" isThLeft>
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
</UiTable>`)])],-1))])]),l("section",W,[t[30]||(t[30]=l("h2",{class:"section-title"},"스크롤 가능한 테이블",-1)),t[31]||(t[31]=l("p",{class:"section-description"}," 테이블 내용이 많을 경우 scrollable 속성을 사용하여 스크롤 가능한 테이블을 만들 수 있습니다. maxHeight 속성을 통해 테이블의 최대 높이를 지정할 수 있습니다. ",-1)),l("div",Y,[t[29]||(t[29]=l("h3",{class:"example-title"},"스크롤 가능한 테이블 (scrollable)",-1)),l("div",Z,[e(d,{bordered:"",scrollable:"",maxHeight:"200px"},{header:n(()=>t[28]||(t[28]=[l("tr",null,[l("th",null,"이름"),l("th",null,"나이"),l("th",null,"직업"),l("th",null,"이메일")],-1)])),body:n(()=>[(p(),i(f,null,T(10,s=>l("tr",{key:s},[l("td",null,"사용자 "+r(s),1),l("td",null,r(20+s),1),l("td",null,r(["개발자","디자이너","기획자","마케터","영업"][s%5]),1),l("td",null,"user"+r(s)+"@example.com",1)])),64))]),_:1})]),l("div",_,[l("pre",null,[l("code",null,`<UiTable bordered scrollable maxHeight="200px">
  <template #header>
    <tr>
      <th>이름</th>
      <th>나이</th>
      <th>직업</th>
      <th>이메일</th>
    </tr>
  </template>
  <template #body>
    <tr v-for="i in 10" :key="i">
      <td>사용자 `+r(a.i)+`</td>
      <td>`+r(20+a.i)+`</td>
      <td>`+r(["개발자","디자이너","기획자","마케터","영업"][a.i%5])+`</td>
      <td>user`+r(a.i)+`@example.com</td>
    </tr>
  </template>
</UiTable>`,1)])])])]),l("section",ll,[t[40]||(t[40]=l("h2",{class:"section-title"},"테이블 크기 옵션",-1)),t[41]||(t[41]=l("p",{class:"section-description"}," UiTable 컴포넌트는 세 가지 크기 옵션을 제공합니다: 'small', 'medium'(기본값), 'large'. size 속성을 통해 테이블의 크기를 조절할 수 있습니다. ",-1)),l("div",tl,[t[34]||(t[34]=l("h3",{class:"example-title"},'작은 크기 테이블 (size="small")',-1)),l("div",nl,[e(d,{bordered:"",size:"small"},{header:n(()=>t[32]||(t[32]=[l("tr",null,[l("th",null,"이름"),l("th",null,"나이"),l("th",null,"직업")],-1)])),body:n(()=>t[33]||(t[33]=[l("tr",null,[l("td",null,"홍길동"),l("td",null,"30"),l("td",null,"개발자")],-1),l("tr",null,[l("td",null,"김철수"),l("td",null,"25"),l("td",null,"디자이너")],-1)])),_:1})]),t[35]||(t[35]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiTable bordered size="small">
  <!-- 테이블 내용 -->
</UiTable>`)])],-1))]),l("div",el,[t[38]||(t[38]=l("h3",{class:"example-title"},'큰 크기 테이블 (size="large")',-1)),l("div",dl,[e(d,{bordered:"",size:"large"},{header:n(()=>t[36]||(t[36]=[l("tr",null,[l("th",null,"이름"),l("th",null,"나이"),l("th",null,"직업")],-1)])),body:n(()=>t[37]||(t[37]=[l("tr",null,[l("td",null,"홍길동"),l("td",null,"30"),l("td",null,"개발자")],-1),l("tr",null,[l("td",null,"김철수"),l("td",null,"25"),l("td",null,"디자이너")],-1)])),_:1})]),t[39]||(t[39]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiTable bordered size="large">
  <!-- 테이블 내용 -->
</UiTable>`)])],-1))])]),l("section",ol,[t[50]||(t[50]=l("h2",{class:"section-title"},"테이블 제목 및 컨트롤",-1)),t[51]||(t[51]=l("p",{class:"section-description"}," UiTable 컴포넌트는 테이블 상단에 제목과 다양한 컨트롤을 표시할 수 있습니다. title 속성을 통해 테이블 제목을 설정하고, excelControls 또는 gradeRangeControls 속성을 통해 추가 컨트롤을 표시할 수 있습니다. ",-1)),l("div",sl,[t[44]||(t[44]=l("h3",{class:"example-title"},"테이블 제목 및 엑셀 컨트롤",-1)),l("div",ul,[e(d,{bordered:"",title:"사용자 목록",excelControls:""},{header:n(()=>t[42]||(t[42]=[l("tr",null,[l("th",null,"이름"),l("th",null,"나이"),l("th",null,"직업")],-1)])),body:n(()=>t[43]||(t[43]=[l("tr",null,[l("td",null,"홍길동"),l("td",null,"30"),l("td",null,"개발자")],-1),l("tr",null,[l("td",null,"김철수"),l("td",null,"25"),l("td",null,"디자이너")],-1)])),_:1})]),t[45]||(t[45]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiTable bordered title="사용자 목록" excelControls>
  <!-- 테이블 내용 -->
</UiTable>`)])],-1))]),l("div",rl,[t[48]||(t[48]=l("h3",{class:"example-title"},"구간대 설정 컨트롤",-1)),l("div",al,[e(d,{bordered:"",title:"평가 점수표",gradeRangeControls:""},{header:n(()=>t[46]||(t[46]=[l("tr",null,[l("th",null,"이름"),l("th",null,"점수"),l("th",null,"등급")],-1)])),body:n(()=>t[47]||(t[47]=[l("tr",null,[l("td",null,"홍길동"),l("td",null,"95"),l("td",null,"A")],-1),l("tr",null,[l("td",null,"김철수"),l("td",null,"85"),l("td",null,"B")],-1),l("tr",null,[l("td",null,"이영희"),l("td",null,"75"),l("td",null,"C")],-1)])),_:1})]),t[49]||(t[49]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiTable bordered title="평가 점수표" gradeRangeControls>
  <!-- 테이블 내용 -->
</UiTable>`)])],-1))])]),l("section",il,[t[57]||(t[57]=l("h2",{class:"section-title"},"colgroup 슬롯 사용",-1)),t[58]||(t[58]=l("p",{class:"section-description"}," colgroup 슬롯을 사용하여 테이블 열의 너비를 지정할 수 있습니다. ",-1)),l("div",pl,[t[55]||(t[55]=l("h3",{class:"example-title"},"열 너비 지정 테이블",-1)),l("div",ml,[e(d,{bordered:""},{colgroup:n(()=>t[52]||(t[52]=[l("col",{style:{width:"20%"}},null,-1),l("col",{style:{width:"30%"}},null,-1),l("col",{style:{width:"50%"}},null,-1)])),header:n(()=>t[53]||(t[53]=[l("tr",null,[l("th",null,"이름"),l("th",null,"직업"),l("th",null,"설명")],-1)])),body:n(()=>t[54]||(t[54]=[l("tr",null,[l("td",null,"홍길동"),l("td",null,"개발자"),l("td",null,"프론트엔드 개발을 담당하고 있습니다.")],-1),l("tr",null,[l("td",null,"김철수"),l("td",null,"디자이너"),l("td",null,"UI/UX 디자인을 담당하고 있습니다.")],-1)])),_:1})]),t[56]||(t[56]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiTable bordered>
  <template #colgroup>
    <col style="width: 20%" />
    <col style="width: 30%" />
    <col style="width: 50%" />
  </template>
  <!-- 테이블 내용 -->
</UiTable>`)])],-1))])]),l("section",bl,[t[61]||(t[61]=l("h2",{class:"section-title"},"속성(Props) 요약",-1)),e(d,{bordered:""},{header:n(()=>t[59]||(t[59]=[l("tr",null,[l("th",null,"속성명"),l("th",null,"타입"),l("th",null,"기본값"),l("th",null,"설명")],-1)])),body:n(()=>t[60]||(t[60]=[l("tr",null,[l("td",null,"bordered"),l("td",null,"Boolean"),l("td",null,"false"),l("td",null,"테이블에 테두리를 표시합니다.")],-1),l("tr",null,[l("td",null,"striped"),l("td",null,"Boolean"),l("td",null,"false"),l("td",null,"홀수 행에 배경색을 적용하여 줄무늬 효과를 줍니다.")],-1),l("tr",null,[l("td",null,"hover"),l("td",null,"Boolean"),l("td",null,"false"),l("td",null,"행에 마우스를 올렸을 때 배경색 변경 효과를 적용합니다.")],-1),l("tr",null,[l("td",null,"size"),l("td",null,"String"),l("td",null,"'medium'"),l("td",null,"테이블의 크기를 설정합니다. 옵션: 'small', 'medium', 'large'")],-1),l("tr",null,[l("td",null,"layout"),l("td",null,"String"),l("td",null,"'vertical'"),l("td",null," 테이블 레이아웃을 설정합니다. 'vertical'(기본 테이블 형태), 'horizontal'(th가 좌측, td가 우측) ")],-1),l("tr",null,[l("td",null,"isThLeft"),l("td",null,"Boolean"),l("td",null,"false"),l("td",null,'layout="horizontal" 사용 시 th를 좌측에 배치할지 여부를 설정합니다.')],-1),l("tr",null,[l("td",null,"scrollable"),l("td",null,"Boolean"),l("td",null,"false"),l("td",null,"테이블을 스크롤 가능하게 설정합니다.")],-1),l("tr",null,[l("td",null,"maxHeight"),l("td",null,"String"),l("td",null,"'400px'"),l("td",null,"스크롤 가능한 테이블의 최대 높이를 설정합니다.")],-1),l("tr",null,[l("td",null,"modelValue"),l("td",null,"Array"),l("td",null,"[]"),l("td",null,"테이블 데이터로, v-model로 바인딩합니다.")],-1),l("tr",null,[l("td",null,"editable"),l("td",null,"Boolean"),l("td",null,"false"),l("td",null,"테이블 편집 기능을 활성화합니다.")],-1),l("tr",null,[l("td",null,"excelControls"),l("td",null,"Boolean"),l("td",null,"false"),l("td",null,"엑셀 다운로드/업로드 버튼을 표시합니다.")],-1),l("tr",null,[l("td",null,"defaultRowData"),l("td",null,"Object"),l("td",null,"{}"),l("td",null,"새 행 추가 시 사용할 기본 데이터 객체입니다.")],-1),l("tr",null,[l("td",null,"sortableOption"),l("td",null,"Boolean"),l("td",null,"false"),l("td",null,"정렬 기능 활성화 여부를 설정합니다.")],-1),l("tr",null,[l("td",null,"title"),l("td",null,"String"),l("td",null,"''"),l("td",null,"테이블 상단에 표시할 제목입니다.")],-1),l("tr",null,[l("td",null,"canAddRow"),l("td",null,"Boolean"),l("td",null,"true"),l("td",null,"행 추가 버튼 표시 여부를 설정합니다.")],-1),l("tr",null,[l("td",null,"gradeRangeControls"),l("td",null,"Boolean"),l("td",null,"false"),l("td",null,"구간대 설정 컨트롤을 표시합니다.")],-1)])),_:1})]),l("section",gl,[t[64]||(t[64]=l("h2",{class:"section-title"},"이벤트(Events) 요약",-1)),e(d,{bordered:""},{header:n(()=>t[62]||(t[62]=[l("tr",null,[l("th",null,"이벤트명"),l("th",null,"파라미터"),l("th",null,"설명")],-1)])),body:n(()=>t[63]||(t[63]=[l("tr",null,[l("td",null,"update:modelValue"),l("td",null,"Array"),l("td",null,"테이블 데이터가 변경될 때 발생합니다.")],-1),l("tr",null,[l("td",null,"save"),l("td",null,"Array"),l("td",null,"저장 버튼 클릭 시 발생합니다.")],-1),l("tr",null,[l("td",null,"row-added"),l("td",null,"Object"),l("td",null,"새 행이 추가될 때 발생합니다.")],-1),l("tr",null,[l("td",null,"row-deleted"),l("td",null,"Array"),l("td",null,"행이 삭제될 때 발생합니다.")],-1),l("tr",null,[l("td",null,"order-changed"),l("td",null,"Object"),l("td",null,"행 순서가 변경될 때 발생합니다. { from, to, rows } 형태의 객체를 반환합니다.")],-1)])),_:1})]),l("section",vl,[t[67]||(t[67]=l("h2",{class:"section-title"},"슬롯(Slots) 요약",-1)),e(d,{bordered:""},{header:n(()=>t[65]||(t[65]=[l("tr",null,[l("th",null,"슬롯명"),l("th",null,"설명"),l("th",null,"스코프 변수")],-1)])),body:n(()=>t[66]||(t[66]=[l("tr",null,[l("td",null,"colgroup"),l("td",null,"테이블 열의 너비를 지정할 때 사용합니다."),l("td",null,"없음")],-1),l("tr",null,[l("td",null,"header"),l("td",null,'테이블 헤더를 정의합니다. layout="horizontal"일 때는 표시되지 않습니다.'),l("td",null,"selectAll, isAllSelected, editable, sortable")],-1),l("tr",null,[l("td",null,"body"),l("td",null,"테이블 본문을 정의합니다."),l("td",null," rows, selectedRows, toggleRowSelection, isRowSelected, handleDragStart, handleDragOver, handleDrop, handleDragEnd, sortable, editable ")],-1),l("tr",null,[l("td",null,"footer"),l("td",null,"테이블 푸터를 정의합니다."),l("td",null,"없음")],-1)])),_:1})])])}}};export{Vl as default};
