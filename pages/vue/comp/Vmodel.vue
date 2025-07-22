<template>
  <input v-model="message" placeholder="메세지를 입력하세요" />
  <p>입력한 값 : {{ message }}</p>
</template>

<script setup>
  import { ref } from 'vue'

  const message = ref('기본 메시지')
  console.log('현재 값:', message.value)
  /*
    v-model이란?
    - 프로그래밍에서 Model이란?
    -> 애플리케이션의 '데이터 상태'를 의미 쉽게 말해, 사용자가 보고 조작할 수 있는 정보들을 저장하는곳!
       (ex.자바스크립트 -> 모든 종류의 데이터 (문자열, 숫자, 객체, 배열 등))
    -> vue에서 v-model이란 '양뱡향 데이터 바인딩'을 의미

    [ 모델 예시 ]
    // 예시: 사용자 정보 모델
    const userModel = {
      name: '김철수',
      email: 'kim@example.com',
      age: 25
    }

    데이터 바인딩이란?? 모델의 '데이터'와 '화면(View')을 연결하는 기술

    [ 단방향 데이터 바인딩 vs 양방향 데이터 바인딩 ]

    1. 단방향 데이터 바인딩
    - 모델 -> 화면으로만 데이터가 흐름
    - 모델이 변경되면 화면이 자동으로 업데이트

    <template>
      <p>{{ message }}</p> 모델 → 화면
    </template>

    const message = ref('안녕하세요') // 반응형 모델 데이터

    2. 양방향 데이터 바인딩 (v-model)
    - 모델 <-> 화면으로 데이터가 양방향으로 흐름
    - 화면에서 입력하면 모델이 자동으로 업데이트되고, 모델이 변경되면 화면도 자동으로 업데이트

    <template>
      <input v-model="message" /> // 양방향 바인딩
    </template>

    const message = ref('안녕하세요')

    [ 기본 사용법 ]
    <input v-model="username">

    const username = ref('')

    -> 사용자가 입력하면 username이 바로 업데이트 되고,
       코드에서 username을 바꾸면 화면도 바로 업데이트

    - 실제로는 이렇게 동작함 (문법 설탕)
    <input
     :value = "username"
     @input = "username = $event.target.value"
    >

    [ 왜 이렇게 만들었을까? ]

    폼 처리를 쉽게 만들기 위해!
    사용자 입력을 받는 것은 웹 개발의 기본인데,
    매번 이벤트 리스너 달고 값 업데이트하기 번거우니까
    이걸 자동화해서 개발자가 편하게 사용할 수 있도록!


    [ Props vs Emit vs v-model 비교 ]

    Props: 부모가 자식에게 "이거 써" (데이터 주기)
    Emit: 자식이 부모에게 "이런 일이 일어났어요!" (이벤트 알리기)
    v-model: "서로 실시간으로 연결해줘!" (양방향 연결)

  */
</script>
