<template>
  <div class="report-section">
    <h3 class="report-section-title">KPI 및 OKR 현황</h3>
    <UiTable bordered hover size="medium">
      <template #colgroup>
        <col style="width: 25%" />
        <col style="width: 25%" />
        <col style="width: 25%" />
        <col style="width: 25%" />
      </template>
      <template #header>
        <tr>
          <th>KPI</th>
          <th>OKR</th>
          <th>금일실적</th>
          <th>차주 계획</th>
        </tr>
      </template>
      <tr>
        <td rowspan="2">고객만족도 향상</td>
        <td>고객 피드백 분석 완료</td>
        <td>개선점 도출 및 적용</td>
        <td>피드백 수집 부족</td>
      </tr>
      <tr>
        <td>CS 교육 진행</td>
        <td>CS 매뉴얼 업데이트</td>
        <td>일정 지연</td>
      </tr>
      <tr>
        <td rowspan="2">매출 증대</td>
        <td>신규 고객 10% 증가</td>
        <td>마케팅 캠페인 확대</td>
        <td>경쟁사 프로모션</td>
      </tr>
      <tr>
        <td>기존 고객 유지율 90%</td>
        <td>충성 고객 프로그램 개발</td>
        <td>없음</td>
      </tr>
    </UiTable>

    <h3 class="report-section-title">프로젝트 현황</h3>
    <UiTable bordered hover size="medium">
      <template #colgroup>
        <col style="width: 25%" />
        <col style="width: 25%" />
        <col style="width: 25%" />
        <col style="width: 25%" />
      </template>
      <template #header>
        <tr>
          <th>프로젝트</th>
          <th>금일실적</th>
          <th>차주계획</th>
          <th>이슈</th>
        </tr>
      </template>
      <tr>
        <td>
          글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트글자테스트
        </td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </UiTable>

    <h3 class="report-section-title">의견 및 피드백</h3>

    <UiTable bordered hover size="medium" layout="horizontal">
      <template #colgroup>
        <col style="width: 25%" />
        <col style="width: 75%" />
      </template>
      <tr>
        <th>의견</th>
        <td></td>
      </tr>
      <tr>
        <th>첨부파일</th>
        <td>파일 첨부</td>
      </tr>
      <tr>
        <th>피드백</th>
        <td></td>
      </tr>
    </UiTable>
  </div>
</template>
