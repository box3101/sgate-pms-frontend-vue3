import{B as S,r as T,c as u,a as l,b as d,w as t,o as i,F as j,g as R,x as z,m as b,d as s}from"./kbWHipEo.js";import{_ as a}from"./Lh_iWRUr.js";import{_ as V}from"./CFBs_VwN.js";import{_ as v}from"./B1HrAJEN.js";import"./Bn0IZsKs.js";import"./B39mNv2i.js";const A={class:"table-guide-container container-large"},B={class:"guide-section"},C={class:"example-container"},O={class:"example-preview"},E={class:"guide-section"},$={class:"example-container"},I={class:"example-preview"},N={style:{width:"40px"}},F=["onClick","draggable","onDragstart","onDragover","onDrop","onDragend"],L={key:0,class:"row-checkbox"},P={key:1,class:"drag-handle"},H={class:"example-container"},M={class:"guide-section"},q={class:"example-container"},G={class:"example-preview"},J={class:"guide-section"},K={class:"guide-section"},Q={class:"guide-section"},tl={__name:"Table",setup(W){const c=S("logoText");c.value="UiTable 가이드";const h=T([{id:1,name:"홍길동",age:30,job:"개발자"},{id:2,name:"김철수",age:25,job:"디자이너"},{id:3,name:"이영희",age:28,job:"기획자"}]),f=w=>{console.log("저장된 데이터:",w)};return(w,n)=>(i(),u("div",A,[n[37]||(n[37]=l("h1",{class:"page-title"},"UiTable 컴포넌트 사용 가이드",-1)),l("section",B,[n[9]||(n[9]=l("h2",{class:"section-title"},"기본 사용법",-1)),n[10]||(n[10]=l("p",{class:"section-description"}," UiTable 컴포넌트는 다양한 스타일과 레이아웃 옵션을 제공하는 테이블 컴포넌트입니다. 기본적인 사용 방법은 다음과 같습니다. ",-1)),l("div",C,[n[7]||(n[7]=l("h3",{class:"example-title"},"기본 테이블",-1)),l("div",O,[d(a,null,{header:t(()=>n[5]||(n[5]=[l("tr",null,[l("th",null,"이름"),l("th",null,"나이"),l("th",null,"직업")],-1)])),body:t(()=>n[6]||(n[6]=[l("tr",null,[l("td",null,"홍길동"),l("td",null,"30"),l("td",null,"개발자")],-1),l("tr",null,[l("td",null,"김철수"),l("td",null,"25"),l("td",null,"디자이너")],-1),l("tr",null,[l("td",null,"이영희"),l("td",null,"28"),l("td",null,"기획자")],-1)])),_:1})]),n[8]||(n[8]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiTable>
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
</UiTable>`)])],-1))])]),l("section",E,[n[20]||(n[20]=l("h2",{class:"section-title"},"테이블 편집 기능",-1)),n[21]||(n[21]=l("p",{class:"section-description"}," UiTable 컴포넌트는 행 추가, 삭제, 정렬 등의 편집 기능을 제공합니다. 이 기능들은 `editable` 속성을 통해 활성화할 수 있습니다. ",-1)),l("div",$,[n[15]||(n[15]=l("h3",{class:"example-title"},"편집 가능한 테이블 (editable)",-1)),l("div",I,[d(a,{modelValue:h.value,"onUpdate:modelValue":n[4]||(n[4]=r=>h.value=r),editable:"",hover:"","default-row-data":{name:"",job:"",age:0},onSave:f},{header:t(({selectAll:r,isAllSelected:m,sortable:g})=>[l("tr",null,[l("th",N,[d(V,{modelValue:m,"onUpdate:modelValue":r,size:"large"},null,8,["modelValue","onUpdate:modelValue"])]),n[11]||(n[11]=l("th",null,"이름",-1)),n[12]||(n[12]=l("th",null,"나이",-1)),n[13]||(n[13]=l("th",null,"직업",-1))])]),body:t(({rows:r,toggleRowSelection:m,isRowSelected:g,handleDragStart:D,handleDragOver:U,handleDrop:y,handleDragEnd:k,sortable:p})=>[(i(!0),u(j,null,R(r,(o,x)=>(i(),u("tr",{key:o.id,onClick:e=>!p&&m(o),class:z({selected:g(o),"sortable-row":p}),draggable:p,onDragstart:e=>D(e,x),onDragover:e=>U(e),onDrop:e=>y(e,x),onDragend:k},[l("td",null,[p?(i(),u("div",P,n[14]||(n[14]=[l("i",{class:"icon-md icon-drag"},null,-1)]))):(i(),u("div",L,[d(V,{modelValue:g(o),"onUpdate:modelValue":e=>m(o),size:"large",onClick:n[0]||(n[0]=b(()=>{},["stop"]))},null,8,["modelValue","onUpdate:modelValue"])]))]),l("td",null,[d(v,{modelValue:o.name,"onUpdate:modelValue":e=>o.name=e,size:"large",clearable:!0,onClick:n[1]||(n[1]=b(()=>{},["stop"]))},null,8,["modelValue","onUpdate:modelValue"])]),l("td",null,[d(v,{modelValue:o.age,"onUpdate:modelValue":e=>o.age=e,size:"large",type:"number",onClick:n[2]||(n[2]=b(()=>{},["stop"]))},null,8,["modelValue","onUpdate:modelValue"])]),l("td",null,[d(v,{modelValue:o.job,"onUpdate:modelValue":e=>o.job=e,size:"large",clearable:!0,onClick:n[3]||(n[3]=b(()=>{},["stop"]))},null,8,["modelValue","onUpdate:modelValue"])])],42,F))),128))]),_:1},8,["modelValue"])]),n[16]||(n[16]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiTable
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
</UiTable>`)])],-1))]),n[22]||(n[22]=l("div",{class:"example-container"},[l("h3",{class:"example-title"},"스크립트 설정"),l("div",{class:"example-code"},[l("pre",null,[l("code",null,`import { ref } from 'vue'

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
}`)])])],-1)),l("div",H,[n[19]||(n[19]=l("h3",{class:"example-title"},"편집 기능 설명",-1)),d(a,{bordered:""},{header:t(()=>n[17]||(n[17]=[l("tr",null,[l("th",null,"기능"),l("th",null,"설명")],-1)])),body:t(()=>n[18]||(n[18]=[l("tr",null,[l("td",null,"행 추가"),l("td",null,[s(" '+' 버튼을 클릭하면 새로운 행이 추가됩니다. 새 행의 기본 데이터는 "),l("code",null,"defaultRowData"),s(" 속성을 통해 설정할 수 있습니다. ")])],-1),l("tr",null,[l("td",null,"행 삭제"),l("td",null," 체크박스로 행을 선택한 후 삭제 버튼을 클릭하면 선택된 행이 삭제됩니다. 여러 행을 동시에 선택하여 삭제할 수 있습니다. ")],-1),l("tr",null,[l("td",null,"행 정렬"),l("td",null,[s(" 정렬 버튼을 클릭하면 정렬 모드로 전환됩니다. 정렬 모드에서는 행을 드래그하여 순서를 변경할 수 있습니다. 기본적으로 정렬 기능은 비활성화되어 있으며, "),l("code",null,"sortableOption"),s(" 속성을 통해 활성화할 수 있습니다. ")])],-1),l("tr",null,[l("td",null,"데이터 저장"),l("td",null,[s(" 저장 버튼을 클릭하면 "),l("code",null,"save"),s(" 이벤트가 발생하며, 이벤트 핸들러를 통해 현재 테이블 데이터를 처리할 수 있습니다. ")])],-1)])),_:1})])]),l("section",M,[n[27]||(n[27]=l("h2",{class:"section-title"},"테이블 스타일 옵션",-1)),l("div",q,[n[25]||(n[25]=l("h3",{class:"example-title"},"테두리 있는 테이블 (bordered)",-1)),l("div",G,[d(a,{bordered:""},{header:t(()=>n[23]||(n[23]=[l("tr",null,[l("th",null,"이름"),l("th",null,"나이"),l("th",null,"직업")],-1)])),body:t(()=>n[24]||(n[24]=[l("tr",null,[l("td",null,"홍길동"),l("td",null,"30"),l("td",null,"개발자")],-1),l("tr",null,[l("td",null,"김철수"),l("td",null,"25"),l("td",null,"디자이너")],-1)])),_:1})]),n[26]||(n[26]=l("div",{class:"example-code"},[l("pre",null,[l("code",null,`<UiTable bordered>
  <!-- 테이블 내용 -->
</UiTable>`)])],-1))])]),l("section",J,[n[30]||(n[30]=l("h2",{class:"section-title"},"속성(Props) 요약",-1)),d(a,{bordered:""},{header:t(()=>n[28]||(n[28]=[l("tr",null,[l("th",null,"속성명"),l("th",null,"타입"),l("th",null,"기본값"),l("th",null,"설명")],-1)])),body:t(()=>n[29]||(n[29]=[l("tr",null,[l("td",null,"bordered"),l("td",null,"Boolean"),l("td",null,"false"),l("td",null,"테이블에 테두리를 표시합니다.")],-1),l("tr",null,[l("td",null,"striped"),l("td",null,"Boolean"),l("td",null,"false"),l("td",null,"홀수 행에 배경색을 적용하여 줄무늬 효과를 줍니다.")],-1),l("tr",null,[l("td",null,"hover"),l("td",null,"Boolean"),l("td",null,"false"),l("td",null,"행에 마우스를 올렸을 때 배경색 변경 효과를 적용합니다.")],-1),l("tr",null,[l("td",null,"size"),l("td",null,"String"),l("td",null,"'medium'"),l("td",null,"테이블의 크기를 설정합니다. 옵션: 'small', 'medium', 'large'")],-1),l("tr",null,[l("td",null,"layout"),l("td",null,"String"),l("td",null,"'vertical'"),l("td",null,"테이블 레이아웃을 설정합니다. 옵션: 'vertical', 'horizontal'")],-1),l("tr",null,[l("td",null,"isThLeft"),l("td",null,"Boolean"),l("td",null,"false"),l("td",null,"헤더(th) 텍스트를 왼쪽 정렬합니다. 기본값은 가운데 정렬입니다.")],-1),l("tr",null,[l("td",null,"scrollable"),l("td",null,"Boolean"),l("td",null,"false"),l("td",null,"테이블의 스크롤 기능을 활성화합니다. 헤더는 고정되고 본문만 스크롤됩니다.")],-1),l("tr",null,[l("td",null,"maxHeight"),l("td",null,"String"),l("td",null,"'400px'"),l("td",null,"테이블의 최대 높이를 지정합니다. scrollable이 true일 때만 적용됩니다.")],-1),l("tr",null,[l("td",null,"modelValue"),l("td",null,"Array"),l("td",null,"[]"),l("td",null,"테이블 데이터입니다. v-model을 통해 바인딩합니다.")],-1),l("tr",null,[l("td",null,"editable"),l("td",null,"Boolean"),l("td",null,"false"),l("td",null,"테이블 편집 기능(행 추가/삭제/정렬)을 활성화합니다.")],-1),l("tr",null,[l("td",null,"defaultRowData"),l("td",null,"Object"),l("td",null,"{}"),l("td",null,"새 행 추가 시 사용할 기본 행 데이터입니다.")],-1),l("tr",null,[l("td",null,"sortableOption"),l("td",null,"Boolean"),l("td",null,"false"),l("td",null,"정렬 기능의 기본 활성화 여부를 설정합니다.")],-1)])),_:1})]),l("section",K,[n[33]||(n[33]=l("h2",{class:"section-title"},"이벤트(Events) 요약",-1)),d(a,{bordered:""},{header:t(()=>n[31]||(n[31]=[l("tr",null,[l("th",null,"이벤트명"),l("th",null,"파라미터"),l("th",null,"설명")],-1)])),body:t(()=>n[32]||(n[32]=[l("tr",null,[l("td",null,"update:modelValue"),l("td",null,"Array"),l("td",null,"테이블 데이터가 변경될 때 발생합니다. v-model 바인딩에 사용됩니다.")],-1),l("tr",null,[l("td",null,"save"),l("td",null,"Array"),l("td",null,"저장 버튼 클릭 시 발생합니다. 현재 테이블 데이터가 전달됩니다.")],-1),l("tr",null,[l("td",null,"row-added"),l("td",null,"Object"),l("td",null,"새 행이 추가될 때 발생합니다. 추가된 행 데이터가 전달됩니다.")],-1),l("tr",null,[l("td",null,"row-deleted"),l("td",null,"Array"),l("td",null,"행(들)이 삭제될 때 발생합니다. 삭제된 행들의 배열이 전달됩니다.")],-1),l("tr",null,[l("td",null,"order-changed"),l("td",null,"Object"),l("td",null,"행 순서가 변경될 때 발생합니다. { from, to, rows } 형태의 객체가 전달됩니다.")],-1)])),_:1})]),l("section",Q,[n[36]||(n[36]=l("h2",{class:"section-title"},"슬롯(Slots) 요약",-1)),d(a,{bordered:""},{header:t(()=>n[34]||(n[34]=[l("tr",null,[l("th",null,"슬롯명"),l("th",null,"설명"),l("th",null,"스코프 변수")],-1)])),body:t(()=>n[35]||(n[35]=[l("tr",null,[l("td",null,"colgroup"),l("td",null,"테이블 열의 너비를 지정할 때 사용합니다."),l("td",null,"없음")],-1),l("tr",null,[l("td",null,"header"),l("td",null,'테이블 헤더를 정의합니다. layout="horizontal"일 때는 표시되지 않습니다.'),l("td",null,"selectAll, isAllSelected, editable, sortable")],-1),l("tr",null,[l("td",null,"body"),l("td",null,"테이블 본문을 정의합니다."),l("td",null," rows, selectedRows, toggleRowSelection, isRowSelected, handleDragStart, handleDragOver, handleDrop, handleDragEnd, sortable, editable ")],-1),l("tr",null,[l("td",null,"footer"),l("td",null,"테이블 푸터를 정의합니다."),l("td",null,"없음")],-1)])),_:1})])]))}};export{tl as default};
