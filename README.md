# SGATE - Performance Management Solution

## URL

[Sgate](https://box3101.github.io/ispark-sgate/))


## 🎯 Overview

**SGATE**는 기업의 복잡한 성과 관리 프로세스를 효율화하고,  
**사용자 친화적인 대시보드와 강력한 데이터 시각화**를 통해   
핵심 성과 지표(KPI)를 실시간으로 모니터링하고 분석할 수 있도록 돕는 **모던 프론트엔드 솔루션**입니다. 

직관적인 UI를 통해 목표 설정부터 진척도 관리, 결과 분석까지 전반적인 성과 관리 경험을 혁신합니다.

## ⚡ Tech Stack

| Category | Technology | Rationale / Key Benefit |
|----------|------------|-------------------------|
| **Framework** | Vue 3 + Composition API | 재사용 가능한 컴포넌트 개발 용이성 및 Composition API를 통한 **논리적인 코드 분리 및 재사용성 극대화** |  
| **SSR Framework** | Nuxt 3 | Vue.js 애플리케이션의 SSR(Server-Side Rendering) 및 SSG(Static Site Generation)를 통해 **초기 로딩 속도 최적화 및 SEO 성능 향상** |  
| **Language** | TypeScript | 대규모 프로젝트의 안정성과 유지보수성 확보, 컴파일 시점의 오류 감지를 통한 개발 생산성 향상 |   
| **State Mgmt.** | Pinia | Vue 3에 최적화된 경량 상태 관리 라이브러리로, **직관적인 API와 강력한 타입 추론**을 통해 전역 상태를 효율적이고 안전하게 관리 |  
| **Styling** | SCSS | CSS의 한계를 넘어선 변수, 믹스인, 중첩 등을 활용하여 **스타일 코드의 재사용성을 높이고 유지보수성 향상** |  
| **Build Tool** | Vite | **초고속 개발 서버 실행 및 빠른 HMR(Hot Module Replacement)**을 통해 개발 경험을 극대화 |  

## 🏗 Architecture

SGATE는 높은 확장성과 유지보수성을 목표로 다음과 같은 아키텍처 원칙에 따라 설계되었습니다.

### 컴포넌트 기반 아키텍처
재사용성과 유지보수성을 극대화하기 위해 **Atomic Design 원칙**을 기반으로 컴포넌트를 설계하고 개발했습니다.  
 Props 기반의 명확한 데이터 흐름과 이벤트 기반의 상호작용을 통해 컴포넌트 간의 독립성을 확보했습니다. 

이 프로젝트는 제가 직접 설계 및 개발한 고품질 컴포넌트들을 적극 활용하여 일관된 UI/UX와 높은 개발 생산성을 확보했습니다.

### 서버사이드 렌더링(SSR) 최적화
Nuxt 3의 SSR 기능을 활용하여 **초기 페이지 로딩 속도를 단축**하고,   
검색 엔진 크롤링 효율을 높여 **SEO 친화적인 애플리케이션**을 구축했습니다. 


### 모듈화된 상태 관리
Pinia 스토어를 기능별로 모듈화하여 관리했습니다.  
예를 들어, `authStore`, `performanceStore`, `userStore` 등으로 분리하여 **상태 관리의 명확성을 높이고 유지보수성을 향상**시켰습니다. 

이는 복잡한 데이터 흐름 속에서도 코드의 응집도를 높이는 데 기여합니다.  

## 🚀 Key Features & Technical Challenges  

### 주요 기능 구현

#### 사용자 정의 가능한 성과 대시보드  
사용자가 개인 및 팀 성과 지표 위젯을 자유롭게 추가하고 레이아웃을 변경할 수 있는 기능을 구현했습니다. 

이를 위해 Vue의 Dynamic Components와 드래그 앤 드롭 라이브러리를 활용했으며,  
사용자 설정값을 Pinia 스토어와 로컬 스토리지에 저장하여 경험의 지속성을 확보했습니다.

#### 실시간 데이터 모니터링 및 시각화
핵심 성과 지표(KPI) 및 목표 달성 현황을 실시간으로 모니터링하고,   
Chart.js 라이브러리를 Nuxt 환경에 맞게 통합 및 최적화하여 다양한 데이터를 직관적인 차트와 그래프로 표현했습니다. 

대용량 데이터 처리 시 성능 저하를 방지하기 위해 데이터 전처리 로직을 최적화했습니다.

#### 직관적인 성과 입력/관리
사용자가 간편하게 목표를 설정하고 진척도를 업데이트할 수 있는 사용자 친화적인 폼과 인터페이스를 제공하여, 성과 관리의 진입 장벽을 낮추고 효율성을 높였습니다.


#### 프론트엔드 성능 최적화  
Lighthouse 성능 지표 개선을 위해 다각적인 노력을 기울였습니다. 
Nuxt Image 모듈을 통해 모든 이미지를 WebP로 자동 변환하고 `loading='lazy'`를 적용하여 초기 로딩 시 이미지 관련 네트워크 요청을 최소화했습니다. 

또한, Vue 컴포넌트의 불필요한 재렌더링을 방지하기 위해 `v-memo` 및 `computed` 속성을 최적화하여 런타임 성능을 향상시켰습니다.

## 🛠 Getting Started

이 프로젝트를 로컬 환경에서 실행하고 테스트하는 방법입니다.

### 설치

```bash
npm install # 또는 yarn install
```

### 개발 서버 실행

```bash
npm run dev # 또는 yarn dev
```

브라우저에서 `http://localhost:3000`으로 접속

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build # 또는 yarn build

# SSG 모드인 경우 정적 파일 생성
npm run generate

# 프로덕션 빌드 실행
npm run start # 또는 yarn start
```

## 📁 Project Structure

```
sgate-performance-solution/
├── components/          # Vue 컴포넌트
├── composables/        # Vue 3 Composables
├── layouts/           # Nuxt 레이아웃
├── pages/             # 페이지 컴포넌트
├── plugins/           # Nuxt 플러그인
├── stores/            # Pinia 스토어
├── assets/            # 정적 자산
└── types/             # TypeScript 타입 정의
```

