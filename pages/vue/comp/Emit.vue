<template>
  <button @click="handleClick">클릭</button>
</template>

<script setup>
  const emit = defineEmits(['btnClick'])

  const handleClick = () => {
    emit('btnClick', 'abc')
  }
  /*
    Emit이란?
    - 사전단어 Emit -> 방출하다, 내보내다
    - vue에서 emit이란 컴포넌트의 '이벤트 발생'을 의미

    -> Vue에서 Emit 개념은
       자식 컴포넌트에서 부모 컴포넌트로 이벤트를 발생시키거나 데이터를 전달하는 방법

    [ 예시 ]
    현실로 비유하면, 자녀가 엄마한테 "엄마 배고파요!라고 알리는 것과 비슷하다
    자녀가 "엄마!"라고 부르면서 "배고파요"라는 정보를 전달하는 것
    그러면 엄마는 그 말을 듣고 밥을 해주거나 반응을 한다.

    [ Code ]

     - 자식 컴포넌트
    <button @click="sendMessage">메세지 보내기</button>

    -> emit 정의 - 이벤트를 미리 선언
    const emit = defineEmits(['message-sent'])
                                  ↑ 이벤트명
    const sendMessage = () => {
      -> 이벤트를 밖으로 내보낸다"는 의미
      emit('message-sent', '데이터입니다')
              ↑ 이벤트명       ↑ 함께 보낼 데이터
    }

    --> 버튼을 클릭하면 'message-sent' 이벤트를 발생시키고 데이터를 전달!


    - 부모 컴포넌트
    <ChildComponent @message-sent="handleMessage" />

    const handleMessage = (data) =>{
      console.log("자식 컴포넌트에서 버튼 클릭시 실행됨")
      console.log(data) -> '데이터입니다'
    }

    [ 핵심 특징 ]
    1. 단방향 통신 : 자식 -> 부모로만 데이터를 전달
    2. 이벤트 기반 : 자식이 부모에게 알림을 보낸다.
    3. 데이터 전달 : 이벤트와 함께 데이터를 보낼 수 있다.

    [ 왜 이렇게 만들었을까? ]
    컴포넌트 간 소통을 체계적으로 만들기 위해,
    자식이 부모에게 "뭔가 일어났어요!"라고 알려야 할 때가 많기 때문!

    [ Props vs Emit 비교 ]
    Props: 부모가 자식에게 "이거 써" (데이터 주기)
    Emit: 자식이 부모에게 "이런 일이 일어났어요!" (이벤트 알리거나 데이터를 전달해줄때)
 */
</script>
