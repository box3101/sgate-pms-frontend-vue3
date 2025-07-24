<template>
  <div>
    <h1>로딩 중 UI 반응성 테스트</h1>

    <!-- 카운터 (UI 반응성 테스트용) -->
    <div class="counter-section">
      <h3>카운터 테스트 (UI 반응성 확인용)</h3>
      <p>현재 카운트: {{ counter }}</p>
      <button @click="counter++" class="counter-btn">카운터 증가 (+1)</button>
      <p class="info">👆 데이터 로딩 중에도 이 버튼이 작동하는지 확인해보세요!</p>
    </div>

    <hr />

    <!-- 비동기 API 호출 -->
    <div class="api-section">
      <h3>대용량 데이터 로딩 테스트</h3>

      <button @click="loadHeavyData" :disabled="loading" class="load-btn">
        {{ loading ? `로딩중... ${Math.floor(progress)}%` : '대용량 데이터 로딩 (3초)' }}
      </button>

      <div v-if="loading" class="loading-info">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
        <p>📡 서버에서 데이터를 가져오는 중...</p>
        <p class="highlight">⚡ 하지만 위의 카운터 버튼은 여전히 클릭 가능합니다!</p>
      </div>

      <div v-if="data && !loading" class="result">
        <h4>✅ 로딩 완료!</h4>
        <p>받은 데이터 개수: {{ data.length }}개</p>
        <p>첫 번째 항목: {{ data[0]?.title }}</p>
      </div>
    </div>

    <!-- 시뮬레이션된 "동기" 처리 (실제로는 불가능) -->
    <div class="sync-simulation">
      <h3>⚠️ 만약 동기 처리였다면?</h3>
      <button @click="simulateBlockingOperation" :disabled="isBlocked" class="danger-btn">
        {{ isBlocked ? '화면 완전 멈춤... (의도적)' : '동기 처리 시뮬레이션' }}
      </button>
      <p v-if="isBlocked" class="warning">
        🚫 현재 모든 UI가 멈춘 상태입니다. 카운터 버튼을 눌러보세요!
      </p>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  // UI 반응성 테스트용 카운터
  const counter = ref(0)

  // 비동기 데이터 로딩 상태
  const loading = ref(false)
  const data = ref(null)
  const progress = ref(0)

  // 동기 처리 시뮬레이션용
  const isBlocked = ref(false)

  // ✅ 비동기 데이터 로딩 - UI가 반응함
  const loadHeavyData = async () => {
    try {
      loading.value = true
      progress.value = 0
      data.value = null

      // 진행률 시뮬레이션
      const progressInterval = setInterval(() => {
        if (progress.value < 90) {
          progress.value += Math.random() * 20
        }
      }, 200)

      // 실제 API 호출 (3초 정도 걸리는 대용량 데이터)
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')

      // 추가 지연으로 로딩 시간 늘리기
      await new Promise(resolve => setTimeout(resolve, 2000))

      clearInterval(progressInterval)
      progress.value = 100

      if (!response.ok) {
        throw new Error('데이터 로딩 실패')
      }

      const result = await response.json()
      data.value = result
    } catch (error) {
      console.error('로딩 에러:', error)
    } finally {
      loading.value = false
    }
  }

  // ❌ 동기 처리 시뮬레이션 - UI가 완전히 멈춤
  const simulateBlockingOperation = () => {
    isBlocked.value = true

    // 의도적으로 메인 스레드를 블로킹 (실제로는 하면 안 되는 코드)
    const startTime = Date.now()
    while (Date.now() - startTime < 3000) {
      // 3초 동안 아무것도 하지 않고 CPU를 점유
      // 이 동안 모든 UI가 멈춤 (클릭, 스크롤, 애니메이션 등)
    }

    isBlocked.value = false
    alert('동기 처리 완료! 3초 동안 모든 UI가 멈췄습니다.')
  }

  /*
  핵심 차이점 정리:

  🔥 비동기 처리 (async/await)의 진짜 의미:

  1. "데이터 로딩이 빨라진다" ❌
     -> 로딩 시간 자체는 동일합니다!

  2. "UI 스레드가 블로킹되지 않는다" ✅
     -> 데이터 로딩 중에도 다른 버튼 클릭, 스크롤, 애니메이션 가능!

  📊 실제 측정:
  - 동기 처리: 로딩 시간 3초 + UI 완전 멈춤 3초 = 사용자 불편함 극대
  - 비동기 처리: 로딩 시간 3초 + UI 반응 가능 = 사용자 불편함 최소

  🎯 사용자 경험 차이:

  동기 처리:
  - 사용자: "앱이 멈췄나? 고장났나?" 😰
  - 결과: 답답함, 불안감

  비동기 처리:
  - 사용자: "로딩 중이구나. 다른 걸 해보자" 😊
  - 결과: 자연스러운 대기, 다른 작업 병행 가능

  💡 결론:
  비동기 처리는 "로딩을 빠르게 만드는 것"이 아니라
  "로딩 중에도 앱이 살아있게 만드는 것"입니다!
*/
</script>

<style scoped>
  .counter-section {
    background-color: #e8f5e8;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
  }

  .api-section {
    background-color: #e8f0ff;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
  }

  .sync-simulation {
    background-color: #ffe8e8;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
  }

  .counter-btn {
    background-color: #42b883;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    margin: 10px 0;
  }

  .load-btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    margin: 10px 0;
  }

  .danger-btn {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
    margin: 10px 0;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .loading-info {
    margin: 15px 0;
  }

  .progress-bar {
    width: 100%;
    height: 20px;
    background-color: #f0f0f0;
    border-radius: 10px;
    overflow: hidden;
    margin: 10px 0;
  }

  .progress-fill {
    height: 100%;
    background-color: #007bff;
    transition: width 0.3s ease;
  }

  .highlight {
    color: #007bff;
    font-weight: bold;
    font-size: 18px;
  }

  .warning {
    color: #dc3545;
    font-weight: bold;
    font-size: 18px;
  }

  .info {
    color: #666;
    font-style: italic;
  }

  .result {
    background-color: #d4edda;
    padding: 15px;
    border-radius: 6px;
    border: 1px solid #c3e6cb;
  }

  hr {
    margin: 30px 0;
    border: none;
    border-top: 2px solid #eee;
  }
</style>
