<template>23</template>

<script setup>
	/*
     데이터베이스란?
     - 사전단어 : Data(데이터) + Base(저장소)
     - '정해진 틀에 맞춰 정리된 정보'를 저장하고 관리하는 시스템

    1-1. 테이블 (Table) 개념

    [ 구조 ]
    행(Row) = '하나의 완전한 정보 덩어리'
    -->  예를들어, 김철수의 모든 정보 (ID: 1, 이름: 김철수, 이메일: kim@example.com, 나이: 25)
    -->  즉, 한 사람에 대한 모든 정보!

    열(Column) = 그 정보를 구성하는 '속성'들
    -->  ID, 이름, 이메일, 나이
    -->  즉, 김철수 사람에 대한 설명하는 개별 특성들!

    ---> 데이터 항목은 "누구"이고, 속성은 "그 누구의 특징들"

    예시 : 사용자 테이블
    ┌────┬────────┬─────────────────────┬─────┐
    │ ID │  이름   │       이메일         │ 나이 │
    ├────┼────────┼─────────────────────┼─────┤
    │ 1  │ 김철수  │ kim@example.com     │ 25  │
    │ 2  │ 이영희  │ lee@example.com     │ 30  │
    │ 3  │ 박민수  │ park@example.com    │ 28  │
    └────┴────────┴─────────────────────┴─────┘

    [ 자바스크립트 배열표현방법 ]
`
    const users = [
      { id: 1, name: '김철수', email: 'kim@example.com' },
      { id: 2, name: '이영희', email: 'lee@example.com' },
      { id: 3, nmae: '박민수', email: 'park@example.com'}
    ]

    [ API 시뮬레이션 개념 ]

    3-1. API란? (Application Programing Interface)
    -> 프로그램끼리 대화하는 방법

    3-2. REST API
    -> 웹에서 프로그램들끼리 정보 어떻게 주고받는지 '약속된 방법'

    < 핵심 규칙들 >
    > Create (생성) : POST 요청
    > Read (조회) : GET 요청
    > Update (수정) : PUT/PATCH 요청
    > Delete (삭제) : DELETE 요청

    [ 실제 API 요청 예시 ]
    GET /api/users      -> 모든 사용자 조회
    GET /api/users/1    -> ID가 1인 사용자 조회
    POST /api/users     -> 새 사용자 생성
    DELETE /api/users/1 -> ID 가 1인 사용자 삭제

    [ 프론트엔드와 백엔드 관계 ]
    프론트엔드(VUE.JS) <-> API <-> 데이터베이스

    1. 사용자가 버튼을 클릭 ->
    2. 서버에게 HTTP 요청 ->
    3. 서버는 데이터베이스에서 데이터 가져옴 ->
    4. 화면에 표시됨

    = 1. 사용자가 버튼을 클릭 =
    <button @click="getData"> 데이터 가져오기 </button>

    = 4. 화면에 표시 =
    <div v-if="user">
      <p>이름 : {{ user.name }}</p>
      <p>이메일 : {{ user.email }}</p>
    </div>

    <script setup>
      const user = ref(null)

    = 2. API 요청 + 3. 데이터베이스 조회 + 4. 화면 표시 =
    const getData = async () => {
      // 2. API 요청 (서버로 HTTP 요청)
      const response = await fetch('/api/users/1')`

      // 3. 데이터베이스에서 가져온 데이터 받기
      const data = await response.json()

      // 4. 화면에 표시 (자동 업데이트)
      user.value = data
    }
  */
</script>
