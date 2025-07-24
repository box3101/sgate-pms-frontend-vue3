<template>
  <div>
    <h1>Hello World</h1>
  </div>
</template>
<script setup>
  /*
    async/await/fetch란?

    async -> 비동기의 (Asynchronous)
    await -> 기다리다 (wait의 강조형)
    fetch -> 가져오다, 불러오다

    - JavaScript에서 '시간이 걸리는 작업'을 처리하는 방법
    (서버에서 데이터 가져오기 등)

    [ 기본 개념 ]

    1. async 함수
    - "이 함수는 비동기 작업을 할 거에요"라고 선언
    - 항상 Promise를 반환함

    const myFunction = async () => {
      // 비동기 작업들...
    }

    2. await 키워드
    - "이 작업이 끝날 때 까지 기다려주세요"
    - async 함수 안에서만 사용 가능

    const result = await someAsyncWork()

    3. fetch API
    - 서버에서 데이터를 가져오는 웹 표준 방법
    - 항상 Promise를 반환함

    const response = await fetch('/api/data')
    const data = await response.json()

    [ 실행 순서 ]

    1. async 함수 호출
    2. await를 만나면 해당 작업이 완료될 때까지 대기
    3. 완료되면 다음 줄 실행

    [ 코드 실행 예시 ]

    const getData = async () => {
      console.log('1. 데이터 요청 시작')

      try {
          console.log('2. 서버에 요청 보냄')
          const response = await fetch('/api/data') // 여기서 대기

          console.log('3. 서버 응답 받음')
          const data = await response.json() // 여기서도 대기

          console.log('4. 데이터 파싱 완료')
          return data

        } catch (error) {
          console.log('에러 발생:', error)
        }
      }

    [ 핵심 특징 ]
     1. 비차단적 : 다른 코드 실행을 막지 않음
     2. 순차적 작성 : 동기 코드처럼 위에서 아래로 읽기 쉬움

     [ 결론 ]
     비동기 처리는 "로딩 중에도 앱이 죽지 않게 만드는 기술"
  */
</script>
