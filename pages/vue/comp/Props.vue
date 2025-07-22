<template>
  <p>{{ message }}</p>
</template>

<script setup>
  const props = defineProps({
    message: {
      type: String,
      default: '기본 메세지'
    }
  })
  console.log('받은 props:', props.message) // 개발자 도구에서 확인

  /*
    Props란?
    - 사전단어 Properties -> 속성
    - vue에서 props란 컴포넌트의 '속성'을 의미
      (vue에서도 html처럼 속성(proprerties)를 줄 수 있다.)

    [ 예시 ]
    - html -
    <img src="image.jpg" alt="설명" width="100" />

    - vue -
    <Component name="홍길동" age="25" job="개발자" />

    --> Vue에서 Props 개념은 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 방법

    [ 예시 ]
    현실로 비유하면, 부모가 자녀에게 용돈을 주는 것과 비슷하다.
    부모가 "이거 써"라고 주면, 자녀는 그걸 받아서 사용하는 것
    하지만 자녀가 마음대로 부모 지갑에서 돈을 꺼낼 수는 없다.

    [ Code ]

    - 부모 컴포넌트
    <ChildComponent message="안녕하세요" />

    - 자식 컴포넌트
    <template>
      <p> {{ message }} </p>
    </template>

    scipt setup
    const props = defineProps(['message'])

    [ 핵심 특징 ]
    1. 단방향 통신신 : 부모 -> 자식으로만 데이터를 전달
    2. 읽기 전용 : 자식이 받은 props는 수정할 수 없다.
    3. 반응성 : 부모에서 데이터가 바뀌면 자식도 자동으로 업데이트

    [ 왜 이렇게 만들었을까? ]
    데이터 흐름을 예측가능하게 만들기 쉽게 하기 위해,
    만약 아무나 아무 데이터나 바꿀 수 있다면 혼란스러우니까!
 */
</script>
