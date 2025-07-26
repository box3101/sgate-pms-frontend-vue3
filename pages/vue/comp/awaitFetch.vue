<template>
	<div>
		<h1>Hello World</h1>
	</div>
</template>
<script setup>
	/*
    async/await/fetch란?

    - JavaScript에서 '시간이 걸리는 작업'을 처리하는 방법

    async -> 비동기의 (Asynchronous)
    await -> 기다리다 (wait의 강조형)
    fetch -> 가져오다, 불러오다

    [ 기본 개념 ]

    1. async 함수
    - "이 함수는 비동기 작업을 할 거에요"라고 선언
    - 항상 Promise(미래에 완료될 작업의 약속)를 반환함

    const myFunction = async () => {
      // 비동기 작업들...
    }

    2. await 키워드
    - "이 작업이 끝날 때 까지 기다려주세요"
    - async 함수 안에서만 사용 가능


    3. fetch API
    - 서버에서 데이터를 가져오는 웹 표준 방법
    - 항상 Promise를 반환함

    const response = await fetch('/api/data')

    // 출력 결과: -> 실제 데이터가 아니라 HTTP 응답에 대한 정보
    // Response {
    //   status: 200,
    //   statusText: 'OK',
    //   headers: Headers {},
    //   body: ReadableStream,  ← 실제 데이터는 여기 있음
    //   ok: true
    // }

    // 이 시점에서 할 수 있는 것들:
    console.log(response.status)     // 200, 404, 500 등
    console.log(response.ok)         // HTTP 응답이 성공했는지 실패했는지 -> true/false

    // true:  상태 코드가 200~299 범위 (성공)
    // false: 상태 코드가 400~599 범위 (에러)

    // 성공 케이스들 (response.ok = true)
    response.status = 200  // OK
    response.status = 201  // Created
    response.status = 204  // No Content
    response.ok = true

    // 실패 케이스들 (response.ok = false)
    response.status = 400  // Bad Request
    response.status = 401  // Unauthorized
    response.status = 404  // Not Found
    response.status = 500  // Internal Server Error
    response.ok = false

    // 이제 실제 데이터를 사용할 수 있음
    const data = await response.json()  // { id: 1, name: '김철수', email: 'kim@example.com' }

    [ 실행 순서 ]

    1. async 함수 호출
    2. await를 만나면 해당 작업이 완료될 때까지 대기
    3. 완료되면 다음 줄 실행

    [ 코드 실행 예시 ]

    const getData = async () => {
      console.log('1. 데이터 요청 시작')

      // trt, catch 쓰는건 함수 내부에서 에러 처리를 할 수 있게문(async/await 방식))
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

  */
</script>
