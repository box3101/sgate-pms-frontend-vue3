<template>
  <div class="report-page">
    <h1>보고서 조회</h1>

    <!-- 체크박스와 셀렉트 박스 -->
    <div class="report-controls">
      <div class="checkbox-group">
        <label class="checkbox-item">
          <input type="checkbox" v-model="dailyReport" value="d" />
          <span>일간보고</span>
        </label>
        <label class="checkbox-item">
          <input type="checkbox" v-model="weeklyReport" value="w" />
          <span>주간보고</span>
        </label>
      </div>
      <div class="select-group">
        <select v-model="dateGbnType" class="date-select">
          <option value="w">작성일 기준</option>
          <option value="r">보고일 기준</option>
        </select>
      </div>
    </div>

    <!-- FullCalendar 컴포넌트 -->
    <div class="calendar-container">
      <FullCalendar ref="fullCalendar" :options="calendarOptions" />
    </div>

    <!-- 선택된 날짜 정보 표시 -->
    <div v-if="selectedDate" class="selected-info">
      <h3>선택된 날짜: {{ formatDate(selectedDate) }}</h3>
      <p>이 날짜의 보고서를 조회합니다.</p>
    </div>
  </div>

  <UiModal v-model="reportDetailModal" title="보고서 조회" size="xlarge">
    <UiTable
      v-model="tableData"
      scrollable
      striped
      bordered
      maxHeight="calc(100vh - 222px)"
      alignTop
    >
      <!-- 테이블 구조 설정 -->
      <template #colgroup>
        <col width="50%" />
        <col width="50%" />
      </template>

      <!-- 테이블 헤더 -->
      <template #header>
        <tr>
          <th class="text-center">금주실적</th>
          <th class="text-center">차주계획</th>
        </tr>
      </template>

      <!-- 테이블 본문 -->
      <template #body>
        <tr>
          <td>
            <div class="p-3">
              <!-- 금주실적 내용 -->
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium non quas
              distinctio facilis iste atque fugiat iure repellendus dolorem, obcaecati dolores nemo
              minus ipsa sit ipsum ratione omnis quasi doloremque fuga ex velit molestiae nam? Quasi
              nam pariatur, quas doloribus accusamus, ullam, quam dolorem dolor et minima adipisci?
              Harum ex tempora voluptatem aperiam expedita, repellat quis illo asperiores qui. Quo
              magni eligendi maxime itaque corrupti, soluta similique cumque quos recusandae fugiat,
              unde temporibus dolor iste sed numquam reiciendis laborum provident natus ad culpa,
              non a assumenda voluptates! Minima autem ad at sint, voluptatibus cupiditate
              dignissimos libero dicta! Sint, necessitatibus dicta.
            </div>
          </td>
          <td>
            <div class="p-3">
              <!-- 차주계획 내용 -->
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore dolorem quia quam
              suscipit eos aperiam fuga sunt sequi, commodi fugit minima quas cum assumenda
              perferendis officia illo magnam debitis enim neque, impedit tenetur eius repudiandae
              quidem. Iste aliquid, possimus dicta ea eum at, repudiandae voluptatem magnam minus
              maxime quisquam blanditiis nemo perferendis corrupti nulla! Ratione, minima
              blanditiis. Nulla, doloremque? Distinctio eligendi, accusamus obcaecati dignissimos
              corporis earum iste voluptatem adipisci nostrum aperiam cumque dicta unde odit alias
              dolore quasi commodi perferendis molestias accusantium perspiciatis praesentium,
              tempora corrupti. Quo officiis temporibus, dolorum in ab nihil doloribus magni,
              aspernatur quisquam tempora inventore sit ad. Autem, illo consequatur ullam rem rerum
              aut debitis commodi quisquam at architecto dicta optio, odit soluta qui voluptas?
              Impedit numquam quas quisquam voluptate quis aperiam voluptates necessitatibus
              reiciendis, laboriosam maxime sed unde tenetur vel nihil enim illo deleniti at
              consequuntur eius repellendus nisi debitis? Aut quaerat laudantium libero tempora
              voluptates, minus sed odio, dicta assumenda tenetur pariatur neque. Debitis assumenda
              illo cum officiis beatae quis iste repellat, quam nulla ipsum voluptates distinctio
              hic quod deserunt recusandae dolorum, temporibus minima modi incidunt facilis magnam.
              At unde in cumque distinctio laudantium dicta dolore aspernatur adipisci deleniti
              deserunt molestiae error cupiditate quibusdam consequatur debitis dolores aliquid qui,
              dignissimos quo expedita sunt! Incidunt quia quibusdam voluptatum? Vel dolorem hic
              quas ad ullam similique eligendi corporis error molestiae sit voluptatem quod culpa,
              modi commodi tempora alias perferendis, aliquam atque sequi in, pariatur minus autem?
              Corrupti architecto beatae nisi accusamus, laboriosam expedita vel sapiente ut esse
              nesciunt eius. Ex vitae pariatur quidem suscipit ad quo fuga saepe numquam unde,
              incidunt, veritatis aspernatur voluptatibus odio. Sequi, quo! Architecto rerum debitis
              mollitia perferendis fugiat ea, cumque laboriosam ipsa repudiandae blanditiis in
              voluptas temporibus consequuntur recusandae impedit corporis asperiores obcaecati
              doloribus? Minima nihil excepturi omnis vitae tempora perferendis aperiam similique.
              Laboriosam, unde illum illo fugiat eveniet ducimus consectetur praesentium ex quisquam
              blanditiis dolor eaque, aut natus ipsa repellat vitae ratione distinctio magni aliquam
              nesciunt soluta architecto sunt! Ullam sint accusamus fugit minima incidunt minus
              distinctio eligendi hic quos eos voluptatem exercitationem, officiis eius. Debitis
              harum, excepturi velit a porro ullam dignissimos saepe, magnam eius perferendis vero
              quibusdam veritatis! Similique explicabo odio, temporibus odit harum modi, magni sit
              cum saepe quod, minus placeat corrupti? Asperiores molestiae illum, omnis officia
              exercitationem provident? Dignissimos, impedit quos illo dolore pariatur cum sequi
              corporis iure? Minus voluptatibus molestiae doloremque distinctio cupiditate, mollitia
              beatae, debitis velit ipsam sequi consequatur ratione, architecto pariatur voluptatum
              voluptate id ex hic temporibus rem quod libero aspernatur exercitationem. Ex natus
              facilis magni molestiae fugit? Quas ullam deserunt ab maxime modi cupiditate, labore
              laboriosam nesciunt veniam. Quod corporis asperiores rem deleniti ipsam. Modi maiores
              at earum esse provident a rerum fuga voluptate maxime corrupti, blanditiis, adipisci,
              quidem facere quia. Quasi cumque delectus aliquid, impedit tempora molestiae tenetur
              voluptas dicta mollitia expedita iure voluptatibus ab excepturi ducimus aut harum,
              numquam nesciunt? Quidem laborum facere nostrum perferendis sint deleniti animi ullam
              alias voluptates reiciendis qui, soluta eum consequuntur? Nobis, asperiores, libero
              repellendus similique minima mollitia quaerat minus provident, quae unde excepturi in
              autem officiis aliquid consequatur? Ea, ad? Doloribus, dicta est. Recusandae ea
              necessitatibus id culpa praesentium deleniti explicabo vero minus natus ipsam, eaque
              eligendi officiis similique doloribus impedit ad eum modi veniam incidunt voluptatem
              veritatis nostrum. Sed commodi esse dolor ex, id incidunt quisquam vero reiciendis
              ipsum, numquam sequi ut unde qui mollitia ea placeat quidem culpa laudantium. Pariatur
              tempore modi corporis aut veritatis. Ullam ipsum omnis aspernatur saepe voluptatem,
              expedita officiis deserunt, vel commodi aut corrupti facere impedit amet, hic
              repellendus laudantium inventore consequuntur nisi voluptates dolore quaerat nulla
              asperiores. Magni eaque odio neque officia voluptate distinctio temporibus placeat
              excepturi, aut aperiam repellendus quasi voluptatum, iusto nostrum quae enim tempora
              atque veniam, soluta esse architecto? Facilis explicabo repudiandae animi dolore
              distinctio provident dolores eaque commodi repellat tenetur. Quaerat, expedita eius
              blanditiis sint officia rem modi aut doloribus nemo atque pariatur laboriosam tenetur
              minus veritatis temporibus cum placeat ipsam dicta quis facere earum. Reiciendis, ad
              illum. Architecto necessitatibus, quibusdam possimus nobis neque corrupti eligendi non
              quasi mollitia veniam minima expedita provident! In consequatur autem nisi quasi,
              corporis hic labore fugit aliquam distinctio sapiente impedit? In, voluptas animi!
              Velit, ut fuga ex laudantium tempore odio hic, eligendi quis sapiente quos similique!
              Ut obcaecati nobis tempora perferendis, nam ratione, pariatur impedit in, nihil
              dolores dolorem ullam voluptates quisquam soluta tempore possimus! Ipsa, nisi eaque
              incidunt sunt aperiam et, error soluta blanditiis amet iure minima nihil excepturi
              libero aliquam recusandae numquam ducimus quasi cupiditate vitae mollitia fugit
              voluptate non alias iusto. Aliquid in cumque obcaecati amet consectetur, est
              cupiditate quisquam quod debitis quibusdam quam impedit maxime possimus saepe animi
              dolore consequatur laborum ducimus, ab quo ut. Adipisci sit corporis odio dolore
              dicta! Fugiat exercitationem accusantium cum facilis facere, fugit amet! Quam
              provident veniam unde numquam, est voluptates omnis atque ut excepturi! Odit quisquam
              ipsam placeat aliquid deserunt, unde necessitatibus eos soluta fugiat amet
              perspiciatis praesentium, magni quaerat error eligendi corporis fugit blanditiis.
              Fugit blanditiis molestiae autem nemo qui quasi quaerat dolorum quas vitae, doloribus,
              dolorem deserunt totam suscipit aspernatur laudantium nihil assumenda nobis est
              consequatur. Officiis enim esse vero laboriosam maiores deleniti reprehenderit dolorum
              sunt accusamus exercitationem mollitia laborum aliquam facere fuga, incidunt ducimus
              nam deserunt excepturi, aspernatur culpa. Reprehenderit incidunt voluptas harum modi
              maxime. Impedit dolores molestias soluta, dicta qui tempora vero est doloribus
              laboriosam nam repellat quisquam eos aliquam vel at, dolore officia adipisci nobis
              distinctio minus eum tempore! Veniam, blanditiis tempore impedit, provident saepe
              earum quas sint velit quos, consequatur similique? Eaque voluptas recusandae quas
              tempore delectus ipsam sint accusantium iusto autem minus. Quis est at ad libero
              maxime, dolorum excepturi, eaque repellat nobis illum necessitatibus quisquam ea.
              Impedit sit hic repellat, facilis beatae quia assumenda accusantium voluptatem?
              Impedit, provident nihil. Architecto, alias maxime deleniti vero dicta incidunt
              obcaecati voluptate corporis ducimus nihil, esse repellendus unde suscipit ipsam
              quasi? Nesciunt nihil nostrum distinctio ea officiis ipsa, ratione doloremque, nobis
              voluptates minus illum tenetur obcaecati est corrupti dolorum, maxime fugiat quaerat.
              Tenetur.
            </div>
          </td>
        </tr>
      </template>
    </UiTable>

    <!-- 의건/기타 -->
    <UiTable
      class="mt-20"
      title="의건/기타"
      v-model="tableData2"
      layout="horizontal"
      striped
      bordered
    >
      <template #body>
        <tr>
          <th>의견/기타</th>
          <td>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum voluptatum deserunt
            voluptatem, corrupti veniam quasi sapiente vitae quas necessitatibus ut sint odio quod
            provident ipsum fugiat aliquam repudiandae ullam excepturi, consequuntur iure quibusdam
            harum. Quisquam, perspiciatis fuga provident, necessitatibus autem quod, in quasi illo
            quos velit officiis minima voluptatibus deserunt incidunt cumque repudiandae eligendi
            facere impedit labore? Ad sed quam nisi sunt voluptatibus in impedit fuga rem rerum
            similique maxime, corrupti aliquam quia enim provident perspiciatis commodi excepturi
            repellendus error magnam eius odio fugiat quisquam placeat? Nobis recusandae veniam
            earum. Quas aperiam dolorem rem modi, excepturi vel et sunt laboriosam eveniet,
            recusandae saepe aspernatur aut totam soluta eius maxime hic blanditiis fugiat esse
            dolorum veniam laudantium. Consectetur a, omnis voluptatem illo nostrum impedit cum,
            suscipit, voluptas qui eligendi commodi ullam vitae quis dolore necessitatibus accusamus
            minus debitis eius molestiae architecto. Officia, corporis ex ea sequi laboriosam
            aperiam ipsam culpa temporibus provident quo reprehenderit, reiciendis deleniti soluta,
            fugit odit illum eligendi dolores necessitatibus aliquam sit explicabo commodi ipsum.
            Iusto alias similique doloribus dolor odit repellat aliquam porro, ipsum sapiente libero
            velit debitis tempore quos vitae quam eligendi modi quod distinctio quis quisquam nemo?
            Soluta accusantium mollitia, odit maxime dolores numquam eveniet?
          </td>
        </tr>
      </template>
    </UiTable>

    <!-- 첨부파일 -->
    <UiTable class="mt-20" title="첨부파일" layout="horizontal" striped bordered>
      <template #body>
        <tr>
          <th>첨부파일</th>
          <td>
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-3">
                <i class="icon icon-md icon-file"></i>
                <span>보고서_첨부자료.pdf</span>
                <UiButton size="small" variant="text">
                  <i class="icon icon-sm icon-download"></i>
                  <span class="text-underline">다운로드</span>
                </UiButton>
              </div>
              <div class="flex items-center gap-3">
                <i class="icon icon-md icon-file"></i>
                <span>회의록_20240601.docx</span>
                <UiButton size="small" variant="text">
                  <i class="icon icon-sm icon-download"></i>
                  <span class="text-underline">다운로드</span>
                </UiButton>
              </div>
            </div>
          </td>
        </tr>
      </template>
    </UiTable>

    <!-- 피드백 -->
    <UiTable
      class="mt-20"
      title="피드백"
      v-model="feedbackData"
      layout="horizontal"
      striped
      bordered
    >
      <template #body>
        <tr>
          <th>피드백</th>
          <td>
            <div class="flex flex-col gap-4">
              <div class="p-3 bg-gray-50 rounded">
                <div class="flex items-center gap-2 mb-2">
                  <span class="font-bold">홍길동</span>
                  <span class="text-gray-500 text-sm">2024-06-01 14:30</span>
                </div>
                <p>
                  보고서 내용이 매우 명확하게 작성되었습니다. 다음 보고서에서는 KPI 달성률에 대한
                  자세한 분석도 추가해주시면 좋겠습니다.
                </p>
              </div>
              <div class="p-3 bg-gray-50 rounded">
                <div class="flex items-center gap-2 mb-2">
                  <span class="font-bold">김철수</span>
                  <span class="text-gray-500 text-sm">2024-06-02 09:15</span>
                </div>
                <p>
                  주요 이슈 사항에 대한 해결 방안이 구체적으로 제시되어 있어 도움이 되었습니다. 차주
                  계획에 일정 관련 세부 내용도 포함해주세요.
                </p>
              </div>
            </div>
          </td>
        </tr>
      </template>
    </UiTable>
  </UiModal>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import FullCalendar from '@fullcalendar/vue3'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import listPlugin from '@fullcalendar/list'

  // 선택된 날짜와 보고서
  const selectedDate = ref(null)
  const selectedReport = ref(null)
  const fullCalendar = ref(null)

  // 보고서 필터 상태
  const dailyReport = ref(true)
  const weeklyReport = ref(true)
  const dateGbnType = ref('w')

  // 모달 상태
  const reportDetailModal = ref(true)

  // 테이블 데이터 (예시)
  const tableData = ref([])

  // FullCalendar 옵션 설정
  const calendarOptions = reactive({
    // 플러그인 설정 (리스트 플러그인 추가)
    plugins: [dayGridPlugin, listPlugin],

    // 초기 뷰 설정
    initialView: 'dayGridMonth',

    // 헤더 툴바 설정
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listMonth'
    },

    // 한국어 설정
    locale: 'ko',

    // 시작 요일 (일요일: 0, 월요일: 1)
    firstDay: 0,

    // 높이 설정
    height: 'auto',

    // 날짜 클릭 이벤트
    dateClick: handleDateClick,

    // 이벤트 데이터 (실제 보고서 데이터 형태)
    events: [
      {
        id: '1',
        title: '[이찬용]2025-05-09주간보고',
        date: '2025-05-09',
        allDay: true,
        backgroundColor: '#0084ff',
        borderColor: '#0084ff',
        extendedProps: {
          reportType: 'weekly'
        }
      },
      {
        id: '2',
        title: '[이찬용]2025-05-16주간보고',
        date: '2025-05-16',
        allDay: true,
        backgroundColor: '#0084ff',
        borderColor: '#0084ff',
        extendedProps: {
          reportType: 'weekly'
        }
      },
      {
        id: '3',
        title: '[이찬용]2025-05-21주간보고',
        date: '2025-05-21',
        allDay: true,
        backgroundColor: '#0084ff',
        borderColor: '#0084ff',
        extendedProps: {
          reportType: 'weekly'
        }
      },
      {
        id: '4',
        title: '[김철수]2025-05-10일간보고',
        date: '2025-05-10',
        allDay: true,
        backgroundColor: '#28a745',
        borderColor: '#28a745',
        extendedProps: {
          reportType: 'daily'
        }
      },
      {
        id: '5',
        title: '[박영희]2025-05-15일간보고',
        date: '2025-05-15',
        allDay: true,
        backgroundColor: '#28a745',
        borderColor: '#28a745',
        extendedProps: {
          reportType: 'daily'
        }
      }
    ],

    // 버튼 텍스트 커스터마이징
    buttonText: {
      today: '오늘',
      month: '월',
      listMonth: '일정목록'
    },

    // 날짜 포맷 설정
    dayHeaderFormat: { weekday: 'short' },

    // 이벤트 표시 설정
    eventDisplay: 'block',

    // 주말 강조
    weekends: true,

    // 리스트 뷰 설정
    listDayFormat: {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    },
    listDaySideFormat: {
      weekday: 'long'
    },

    // 이벤트 시간 표시 포맷
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: false
    },

    // 종일 이벤트 텍스트
    allDayText: '종일',

    // 이벤트가 없는 경우 메시지
    noEventsText: '표시할 이벤트가 없습니다'
  })

  // 날짜 클릭 핸들러
  function handleDateClick(info) {}

  // 보고서 타입 텍스트 변환
  function getReportTypeText(reportType) {
    switch (reportType) {
      case 'daily':
        return '일간보고'
      case 'weekly':
        return '주간보고'
      case 'monthly':
        return '월간보고'
      default:
        return '보고서'
    }
  }

  // 날짜 포맷팅 함수
  function formatDate(date) {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }).format(date)
  }

  // 프로그래밍 방식으로 캘린더 조작하는 함수들
  function goToToday() {
    const calendarApi = fullCalendar.value.getApi()
    calendarApi.today()
  }

  function goToDate(date) {
    const calendarApi = fullCalendar.value.getApi()
    calendarApi.gotoDate(date)
  }

  function addEvent(eventInfo) {
    const calendarApi = fullCalendar.value.getApi()
    calendarApi.addEvent(eventInfo)
  }

  // 뷰 변경 함수
  function changeView(viewName) {
    const calendarApi = fullCalendar.value.getApi()
    calendarApi.changeView(viewName)
  }

  // 외부에서 사용할 수 있도록 노출
  defineExpose({
    goToToday,
    goToDate,
    addEvent,
    changeView
  })
</script>

<style scoped>
  .report-page {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .calendar-container {
    margin: 20px 0;
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .selected-info {
    margin-top: 20px;
    padding: 15px;
    background-color: #f0f8ff;
    border-radius: 6px;
    border-left: 4px solid #0084ff;
  }

  .selected-info h3 {
    margin: 0 0 8px 0;
    color: #0066cc;
  }

  .selected-info p {
    margin: 0;
    color: #666;
  }

  /* FullCalendar 커스터마이징 */
  :deep(.fc) {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  :deep(.fc-toolbar-title) {
    font-size: 1.5em;
    font-weight: 600;
    color: #333;
  }

  :deep(.fc-button-primary) {
    background-color: #0084ff;
    border-color: #0084ff;
  }

  :deep(.fc-button-primary:hover) {
    background-color: #0066cc;
    border-color: #0066cc;
  }

  :deep(.fc-today-button) {
    background-color: #28a745;
    border-color: #28a745;
  }

  :deep(.fc-daygrid-day.fc-day-today) {
    background-color: rgba(0, 132, 255, 0.1);
  }

  :deep(.fc-daygrid-day:hover) {
    background-color: rgba(0, 132, 255, 0.05);
  }

  :deep(.fc-event) {
    border-radius: 4px;
    font-weight: 500;
  }

  /* 반응형 디자인 */
  @media (max-width: 768px) {
    .report-page {
      padding: 10px;
    }

    .calendar-container {
      padding: 10px;
    }

    :deep(.fc-toolbar) {
      flex-direction: column;
      gap: 10px;
    }

    :deep(.fc-toolbar-chunk) {
      display: flex;
      justify-content: center;
    }
  }
</style>
