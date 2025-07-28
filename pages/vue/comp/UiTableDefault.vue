<template>
  <div>
    <h1>Hello World</h1>
  </div>
</template>
<script setup>
  /*
  <UiTableDefault v-model="availableCompetencyList" :selectable="true" v-model:selected="selectedCompetencyItems">
    <!-- 테이블 컬럼 너비 설정 -->
    <template #colgroup>
      <col style="width: 50px" />
      <col style="width: auto" />
    </template>

    <!-- 테이블 헤더 - 전체 선택 체크박스 포함 -->
    <template #header="{ selectAllProps }">
      <tr>
        <th>
          <UiCheckbox size="large" v-bind="selectAllProps" />
        </th>
        <th>역량사전</th>
      </tr>
    </template>

    <!-- 테이블 본문 - 각 역량사전 항목과 개별 선택 체크박스 -->
    <template #body="{ rows, selectRowProps }">
      <tr v-for="row in rows" :key="row.id" @click="selectRowProps.toggleRowSelection(row)">
        <td>
          <UiCheckbox
            size="large"
            @click="selectRowProps.toggleRowSelection(row)"
            :model-value="selectRowProps.isRowSelected(row)"
            @click.stop
          />
        </td>
        <td>{{ row.name }}</td>
      </tr>
    </template>
  </UiTableDefault>

  테이블 컴포넌트의 "전체 선택" 기능 이해하기

  이 기능은 다음과 같이 동작

  selectable Prop :
  selectable을 통해 전체 선택/개별 선택이 활성화 여부

  selected Prop (v-model):
  v-model:selected와 함께 사용되는 이 prop은 현재 '선택 행 객체'를 담는 배열
  사용자가 행을 선택하거나(개별 또는 전체 선택을 통해) 선택을 해제하면, 이 배열은 업데이트되고 변경 사항은
  부모 컴포넌트로 다시 방출(emit)된다.

  rowKey Prop :
  선택 목적으로 각 행을 고유하게 식별하기 위해 rowKey prop이 사용된다.
  기본적으로 행 데이터에서 id 속성을 찾지만, 데이터가 사용하는 모든 고유 키 (예:userId)로 구성할 수 있다.


  [ 선택 관련 주요 변수 및 함수 ]

  선택 로직은 주로 다음 요소들에 의해 관리된다.

  1. internalSelected (내부적으로 선택된 행 목록)
    -->  컴포넌트 내부에서 현재 선택된 행들을 관리하는 목록

    부모 컴포넌트에서 v-model:selected로 넘겨주는 selected라는 배열이 있죠?
    internalSelected는 이 props.selected 배열을 고스란히 '복사'해서 가져옵니다.

    왜 복사할까?
    -> Vue에서는 props로 받은 데이터를 직접 수정하는 것이 권장되지 않는다
      그래서 internalSelected처럼 내부에서 관리할 복사본을 만들어서 사용해요

    watch를 통한 동기화:

    외부 -> 내부 : 만약 부모 컴포넌트에서 props.selected의 내용이 바뀌면, watch가 이를 감지해서 internalSelected도 똑같이 업데이트
    내부 -> 외부 : 반대로, 사용자가 테이블 내에서 행을 선택하거나 해제해서 internalSelected의 내용이 바뀌면,
                   watch가 이를 감지하고 update:selected 이벤트를 발생시켜 변경된 internalSelected의 내용을 부모 컴포넌트로 다시 보내준다.

    [ 코드 ]
    const internalSelected = ref([...props.selected]); // 내부 선택 상태

    외부 → 내부 동기화 (부모 → 자식)
    watch(
      () => props.selected, // 감시할 대상: 부모로부터 받은 'selected' prop
      newVal => {
        internalSelected.value = [...newVal]; // 'selected' prop이 바뀌면 'internalSelected'를 동일하게 업데이트
      },
      { deep: true } // 객체나 배열의 내부 변경까지 감지
    );

    내부 -> 외부 (자식 -> 부모)
    watch(
      internalSelected, // 감시할 대상: 컴포넌트 내부의 'internalSelected' ref
      newVal => {
        emit('update:selected', newVal); // 'internalSelected'가 바뀌면 'update:selected' 이벤트를 부모로 방출
      },
      { deep: true } // 객체나 배열의 내부 변경까지 감지
    );

   2. isAllSelected (모든 행이 선택되었는지 여부)
   --> 현재 화면에 보이는 모든 데이터(행)가 선택되어 있는가?

   modelValue ->   지금 당신의 테이블에 실제로 보여지고 있는 모든 데이터(행)'들을 의미
   internalSelected -> 지금까지 사용자가 선택한 모든 행들의 목록

   이 두 목록을 비교해서 작동
   1.  modelValue가 비어있으면 (즉, 테이블에 데이터가 하나도 없으면): 당연히 선택할 행도 없으니 isAllSelected는 false
   2.  modelValue에 데이터가 있으면: isAllSelected는 modelValue에 있는 모든 행이 internalSelected에도 포함되어 있는지를 하나하나 확인
       이때 각 행을 구분하는 기준은 rowKey (예: id) 값

       - 만약 modelValue의 모든 행이 internalSelected에 있다면, isAllSelected는 true를 반환해요. ("네! 보이는 모든 행이 선택되었습니다!")
       - 단 하나의 행이라도 internalSelected에 없다면, isAllSelected는 false를 반환

  -->  "현재 테이블에 보이는 행들이 전부 다 체크되어 있나요?"**라고 물었을 때, isAllSelected가 그 답을 주는 거라고 생각

  3.  <template #header="{ selectAllProps }">는 V테이블의 헤더 부분을 원하는 대로 만들 수 있게 해주는 특별한 '빈칸(슬롯)''
      여기에 추가적으로 '전체 선택' 기능에 필요한 도구들을 selectAllProps라는 이름으로 넘겨주는 것

  4. toggleRowSelection (개별 행 선택/해제) 쉽게 설명하기
     -> 사용자가 테이블의 특정 행을 클릭했을 때, 그 행의 선택 상태를 바꾸는 역할을 합니다.

  5. :modelValue="selectRowProps.isRowSelected(row)"
     -> 이 부분은 해당 행의 선택 상태를 '보여주는' 역할 체크박스의 경우 true면 체크된 상태, false면 체크 해제된 상태를 의미
     selectRowProps.isRowSelected(row): 이건 UiTableDefault 컴포넌트가 슬롯을 통해 넘겨준 도구 꾸러미(selectRowProps) 안에 있는 함수예요.
     이 함수는 현재 보고 있는 row(행)가 이미 선택되어 있는지 아닌지(true 또는 false)를 알려

     --> 이 줄은 "이 체크박스는 지금 이 행이 선택된 상태인지 아닌지에 따라 체크되거나 해제된 상태를 보여줄 거야"라는

  6. @update:modelValue="selectRowProps.toggleRowSelection(row)"

    이 부분은 사용자가 행의 선택 상태를 '바꿀' 때 동작하는 역할을 해요.
    -> 이 줄은 "사용자가 이 체크박스를 클릭해서 상태를 바꾸려 하면, toggleRowSelection 함수를 호출해서 실제 데이터의 선택 상태를 변경할 거야"라는 뜻
  */
</script>
<style scoped></style>
