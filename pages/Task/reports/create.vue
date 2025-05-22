처처<template>
  <div class="report-creation-container">
    <header class="report-header com-header">
      <div class="ct-top flex justify-between items-center">
        <ul class="my_menu flex gap-23 items-center">
          <li class="tbl-btn flex gap-5">
            <UiDatePicker
              class="w-270"
              v-model="dateRange"
              isRange
              startPlaceholder="시작일"
              endPlaceholder="마지막날짜"
              size="medium"
            />
            <UiButton variant="secondary" size="medium" icon-only>
              <i class="icon icon-md icon-search icon-white"></i>
            </UiButton>
          </li>
        </ul>
      </div>
    </header>
    <div class="report-content mt-20">
      <div class="flex-container">
        <div class="w-30p">
          <UiTable
            :title="'보고서 리스트'"
            v-model="tableData"
            hover
            editable
            striped
            scrollable
            maxHeight="calc(100vh - 180px)"
            :canAddRow="false"
            :canSave="false"
          >
            <!-- 추가 버튼 -->
            <template #action-button>
              <UiButton type="button" variant="primary" @click="showAddModal = true">
                데이터 추가
              </UiButton>
            </template>

            <!-- 열 너비 설정 -->
            <template #colgroup>
              <col v-if="useCheckbox" width="40px" />
              <col v-for="column in columns" :key="column.key" :width="column.width" />
              <col v-if="showEditButton" width="30px" />
              <col v-if="showEditButton" width="30px" />
            </template>

            <!-- 테이블 헤더 -->
            <template #header="{ selectAll, isAllSelected }">
              <tr>
                <th v-if="useCheckbox">
                  <UiCheckbox
                    :modelValue="isAllSelected"
                    @update:modelValue="selectAll"
                    size="large"
                    @click.stop
                  />
                </th>
                <th
                  v-for="column in columns"
                  :key="column.key"
                  :class="column.align ? `text-${column.align}` : ''"
                >
                  {{ column.title }}
                </th>
                <th v-if="showEditButton">조회</th>
                <th v-if="showEditButton">수정</th>
              </tr>
            </template>

            <!-- 테이블 본문 -->
            <template
              #body="{
                rows,
                toggleRowSelection,
                isRowSelected,
                handleDragStart,
                handleDragOver,
                handleDrop,
                handleDragEnd,
                sortable
              }"
            >
              <template v-for="(item, index) in rows" :key="item.id">
                <tr
                  @click="!sortable && toggleRowSelection(item)"
                  :class="{ selected: isRowSelected(item), 'sortable-row': sortable }"
                  :draggable="sortable"
                  @dragstart="e => handleDragStart(e, index)"
                  @dragover="e => handleDragOver(e)"
                  @drop="e => handleDrop(e, index)"
                  @dragend="handleDragEnd"
                >
                  <!-- 체크박스/드래그 핸들 -->
                  <td v-if="useCheckbox">
                    <div v-if="!sortable" class="row-checkbox">
                      <UiCheckbox
                        :modelValue="isRowSelected(item)"
                        @update:modelValue="toggleRowSelection(item)"
                        size="large"
                        @click.stop
                      />
                    </div>
                    <div v-else class="drag-handle">
                      <i class="icon-md icon-drag"></i>
                    </div>
                  </td>

                  <!-- 데이터 셀 -->
                  <td
                    v-for="(column, colIndex) in columns"
                    :key="colIndex"
                    :class="column.align ? `text-${column.align}` : ''"
                  >
                    {{ item[column.key] }}
                  </td>

                  <!-- 수정/조회 버튼 -->
                  <td v-if="showEditButton">
                    <div class="button-group flex items-center">
                      <UiButton variant="ghost" size="small" icon-only @click.stop="viewItem(item)">
                        <i class="icon-md icon-magnify icon-gray"></i>
                      </UiButton>
                    </div>
                  </td>

                  <td v-if="showEditButton">
                    <div class="button-group flex items-center">
                      <UiButton variant="ghost" size="small" icon-only @click.stop="editItem(item)">
                        <i class="icon-md icon-pencil icon-gray"></i>
                      </UiButton>
                    </div>
                  </td>
                </tr>
              </template>
            </template>
          </UiTable>
        </div>
        <div class="w-70p">
          <div class="header flex items-center justify-between">
            <p class="heading-4 mt-5">
              <span>주간보고</span>
              <span>2025.05.20</span>
              <span class="ml-5 mt-5">미설정</span>
              <span class="text-md mt-5 ml-10">제출대상 : srkim테스트</span>
            </p>
            <div class="tbl-btn flex gap-5">
              <UiButton variant="secondary-line">
                <i class="icon icon-sm icon-excel"></i>
                <span>엑셀 다운로드</span>
              </UiButton>
              <UiButton variant="primary" @click="reportConfigModal = true">
                <i class="icon icon-sm icon-create icon-white"></i>
                <span>보고서 작성</span>
              </UiButton>
            </div>
          </div>
          <UiTable v-model="tableData" scrollable striped bordered maxHeight="calc(100vh - 222px)" alignTop>
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
                    distinctio facilis iste atque fugiat iure repellendus dolorem, obcaecati dolores
                    nemo minus ipsa sit ipsum ratione omnis quasi doloremque fuga ex velit molestiae
                    nam? Quasi nam pariatur, quas doloribus accusamus, ullam, quam dolorem dolor et
                    minima adipisci? Harum ex tempora voluptatem aperiam expedita, repellat quis
                    illo asperiores qui. Quo magni eligendi maxime itaque corrupti, soluta similique
                    cumque quos recusandae fugiat, unde temporibus dolor iste sed numquam reiciendis
                    laborum provident natus ad culpa, non a assumenda voluptates! Minima autem ad at
                    sint, voluptatibus cupiditate dignissimos libero dicta! Sint, necessitatibus
                    dicta.
                  </div>
                </td>
                <td>
                  <div class="p-3">
                    <!-- 차주계획 내용 -->
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore dolorem quia
                    quam suscipit eos aperiam fuga sunt sequi, commodi fugit minima quas cum
                    assumenda perferendis officia illo magnam debitis enim neque, impedit tenetur
                    eius repudiandae quidem. Iste aliquid, possimus dicta ea eum at, repudiandae
                    voluptatem magnam minus maxime quisquam blanditiis nemo perferendis corrupti
                    nulla! Ratione, minima blanditiis. Nulla, doloremque? Distinctio eligendi,
                    accusamus obcaecati dignissimos corporis earum iste voluptatem adipisci nostrum
                    aperiam cumque dicta unde odit alias dolore quasi commodi perferendis molestias
                    accusantium perspiciatis praesentium, tempora corrupti. Quo officiis temporibus,
                    dolorum in ab nihil doloribus magni, aspernatur quisquam tempora inventore sit
                    ad. Autem, illo consequatur ullam rem rerum aut debitis commodi quisquam at
                    architecto dicta optio, odit soluta qui voluptas? Impedit numquam quas quisquam
                    voluptate quis aperiam voluptates necessitatibus reiciendis, laboriosam maxime
                    sed unde tenetur vel nihil enim illo deleniti at consequuntur eius repellendus
                    nisi debitis? Aut quaerat laudantium libero tempora voluptates, minus sed odio,
                    dicta assumenda tenetur pariatur neque. Debitis assumenda illo cum officiis
                    beatae quis iste repellat, quam nulla ipsum voluptates distinctio hic quod
                    deserunt recusandae dolorum, temporibus minima modi incidunt facilis magnam. At
                    unde in cumque distinctio laudantium dicta dolore aspernatur adipisci deleniti
                    deserunt molestiae error cupiditate quibusdam consequatur debitis dolores
                    aliquid qui, dignissimos quo expedita sunt! Incidunt quia quibusdam voluptatum?
                    Vel dolorem hic quas ad ullam similique eligendi corporis error molestiae sit
                    voluptatem quod culpa, modi commodi tempora alias perferendis, aliquam atque
                    sequi in, pariatur minus autem? Corrupti architecto beatae nisi accusamus,
                    laboriosam expedita vel sapiente ut esse nesciunt eius. Ex vitae pariatur quidem
                    suscipit ad quo fuga saepe numquam unde, incidunt, veritatis aspernatur
                    voluptatibus odio. Sequi, quo! Architecto rerum debitis mollitia perferendis
                    fugiat ea, cumque laboriosam ipsa repudiandae blanditiis in voluptas temporibus
                    consequuntur recusandae impedit corporis asperiores obcaecati doloribus? Minima
                    nihil excepturi omnis vitae tempora perferendis aperiam similique. Laboriosam,
                    unde illum illo fugiat eveniet ducimus consectetur praesentium ex quisquam
                    blanditiis dolor eaque, aut natus ipsa repellat vitae ratione distinctio magni
                    aliquam nesciunt soluta architecto sunt! Ullam sint accusamus fugit minima
                    incidunt minus distinctio eligendi hic quos eos voluptatem exercitationem,
                    officiis eius. Debitis harum, excepturi velit a porro ullam dignissimos saepe,
                    magnam eius perferendis vero quibusdam veritatis! Similique explicabo odio,
                    temporibus odit harum modi, magni sit cum saepe quod, minus placeat corrupti?
                    Asperiores molestiae illum, omnis officia exercitationem provident? Dignissimos,
                    impedit quos illo dolore pariatur cum sequi corporis iure? Minus voluptatibus
                    molestiae doloremque distinctio cupiditate, mollitia beatae, debitis velit ipsam
                    sequi consequatur ratione, architecto pariatur voluptatum voluptate id ex hic
                    temporibus rem quod libero aspernatur exercitationem. Ex natus facilis magni
                    molestiae fugit? Quas ullam deserunt ab maxime modi cupiditate, labore
                    laboriosam nesciunt veniam. Quod corporis asperiores rem deleniti ipsam. Modi
                    maiores at earum esse provident a rerum fuga voluptate maxime corrupti,
                    blanditiis, adipisci, quidem facere quia. Quasi cumque delectus aliquid, impedit
                    tempora molestiae tenetur voluptas dicta mollitia expedita iure voluptatibus ab
                    excepturi ducimus aut harum, numquam nesciunt? Quidem laborum facere nostrum
                    perferendis sint deleniti animi ullam alias voluptates reiciendis qui, soluta
                    eum consequuntur? Nobis, asperiores, libero repellendus similique minima
                    mollitia quaerat minus provident, quae unde excepturi in autem officiis aliquid
                    consequatur? Ea, ad? Doloribus, dicta est. Recusandae ea necessitatibus id culpa
                    praesentium deleniti explicabo vero minus natus ipsam, eaque eligendi officiis
                    similique doloribus impedit ad eum modi veniam incidunt voluptatem veritatis
                    nostrum. Sed commodi esse dolor ex, id incidunt quisquam vero reiciendis ipsum,
                    numquam sequi ut unde qui mollitia ea placeat quidem culpa laudantium. Pariatur
                    tempore modi corporis aut veritatis. Ullam ipsum omnis aspernatur saepe
                    voluptatem, expedita officiis deserunt, vel commodi aut corrupti facere impedit
                    amet, hic repellendus laudantium inventore consequuntur nisi voluptates dolore
                    quaerat nulla asperiores. Magni eaque odio neque officia voluptate distinctio
                    temporibus placeat excepturi, aut aperiam repellendus quasi voluptatum, iusto
                    nostrum quae enim tempora atque veniam, soluta esse architecto? Facilis
                    explicabo repudiandae animi dolore distinctio provident dolores eaque commodi
                    repellat tenetur. Quaerat, expedita eius blanditiis sint officia rem modi aut
                    doloribus nemo atque pariatur laboriosam tenetur minus veritatis temporibus cum
                    placeat ipsam dicta quis facere earum. Reiciendis, ad illum. Architecto
                    necessitatibus, quibusdam possimus nobis neque corrupti eligendi non quasi
                    mollitia veniam minima expedita provident! In consequatur autem nisi quasi,
                    corporis hic labore fugit aliquam distinctio sapiente impedit? In, voluptas
                    animi! Velit, ut fuga ex laudantium tempore odio hic, eligendi quis sapiente
                    quos similique! Ut obcaecati nobis tempora perferendis, nam ratione, pariatur
                    impedit in, nihil dolores dolorem ullam voluptates quisquam soluta tempore
                    possimus! Ipsa, nisi eaque incidunt sunt aperiam et, error soluta blanditiis
                    amet iure minima nihil excepturi libero aliquam recusandae numquam ducimus quasi
                    cupiditate vitae mollitia fugit voluptate non alias iusto. Aliquid in cumque
                    obcaecati amet consectetur, est cupiditate quisquam quod debitis quibusdam quam
                    impedit maxime possimus saepe animi dolore consequatur laborum ducimus, ab quo
                    ut. Adipisci sit corporis odio dolore dicta! Fugiat exercitationem accusantium
                    cum facilis facere, fugit amet! Quam provident veniam unde numquam, est
                    voluptates omnis atque ut excepturi! Odit quisquam ipsam placeat aliquid
                    deserunt, unde necessitatibus eos soluta fugiat amet perspiciatis praesentium,
                    magni quaerat error eligendi corporis fugit blanditiis. Fugit blanditiis
                    molestiae autem nemo qui quasi quaerat dolorum quas vitae, doloribus, dolorem
                    deserunt totam suscipit aspernatur laudantium nihil assumenda nobis est
                    consequatur. Officiis enim esse vero laboriosam maiores deleniti reprehenderit
                    dolorum sunt accusamus exercitationem mollitia laborum aliquam facere fuga,
                    incidunt ducimus nam deserunt excepturi, aspernatur culpa. Reprehenderit
                    incidunt voluptas harum modi maxime. Impedit dolores molestias soluta, dicta qui
                    tempora vero est doloribus laboriosam nam repellat quisquam eos aliquam vel at,
                    dolore officia adipisci nobis distinctio minus eum tempore! Veniam, blanditiis
                    tempore impedit, provident saepe earum quas sint velit quos, consequatur
                    similique? Eaque voluptas recusandae quas tempore delectus ipsam sint
                    accusantium iusto autem minus. Quis est at ad libero maxime, dolorum excepturi,
                    eaque repellat nobis illum necessitatibus quisquam ea. Impedit sit hic repellat,
                    facilis beatae quia assumenda accusantium voluptatem? Impedit, provident nihil.
                    Architecto, alias maxime deleniti vero dicta incidunt obcaecati voluptate
                    corporis ducimus nihil, esse repellendus unde suscipit ipsam quasi? Nesciunt
                    nihil nostrum distinctio ea officiis ipsa, ratione doloremque, nobis voluptates
                    minus illum tenetur obcaecati est corrupti dolorum, maxime fugiat quaerat.
                    Tenetur.
                  </div>
                </td>
              </tr>
            </template>
          </UiTable>

          <!-- 의건/기타 -->
          <UiTable class="mt-20" title="의건/기타" v-model="tableData2" layout="horizontal" striped bordered>
            <template #body>
              <tr>
                <th>의견/기타</th>
                <td>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum voluptatum deserunt voluptatem, corrupti veniam quasi sapiente vitae quas necessitatibus ut sint odio quod provident ipsum fugiat aliquam repudiandae ullam excepturi, consequuntur iure quibusdam harum. Quisquam, perspiciatis fuga provident, necessitatibus autem quod, in quasi illo quos velit officiis minima voluptatibus deserunt incidunt cumque repudiandae eligendi facere impedit labore? Ad sed quam nisi sunt voluptatibus in impedit fuga rem rerum similique maxime, corrupti aliquam quia enim provident perspiciatis commodi excepturi repellendus error magnam eius odio fugiat quisquam placeat? Nobis recusandae veniam earum. Quas aperiam dolorem rem modi, excepturi vel et sunt laboriosam eveniet, recusandae saepe aspernatur aut totam soluta eius maxime hic blanditiis fugiat esse dolorum veniam laudantium. Consectetur a, omnis voluptatem illo nostrum impedit cum, suscipit, voluptas qui eligendi commodi ullam vitae quis dolore necessitatibus accusamus minus debitis eius molestiae architecto. Officia, corporis ex ea sequi laboriosam aperiam ipsam culpa temporibus provident quo reprehenderit, reiciendis deleniti soluta, fugit odit illum eligendi dolores necessitatibus aliquam sit explicabo commodi ipsum. Iusto alias similique doloribus dolor odit repellat aliquam porro, ipsum sapiente libero velit debitis tempore quos vitae quam eligendi modi quod distinctio quis quisquam nemo? Soluta accusantium mollitia, odit maxime dolores numquam eveniet?
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
<UiTable class="mt-20" title="피드백" v-model="feedbackData" layout="horizontal" striped bordered>
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
            <p>보고서 내용이 매우 명확하게 작성되었습니다. 다음 보고서에서는 KPI 달성률에 대한
            자세한 분석도 추가해주시면 좋겠습니다.</p>
          </div>
          <div class="p-3 bg-gray-50 rounded">
            <div class="flex items-center gap-2 mb-2">
              <span class="font-bold">김철수</span>
              <span class="text-gray-500 text-sm">2024-06-02 09:15</span>
            </div>
            <p>주요 이슈 사항에 대한 해결 방안이 구체적으로 제시되어 있어 도움이 되었습니다.
            차주 계획에 일정 관련 세부 내용도 포함해주세요.</p>
          </div>
        </div>
      </td>
    </tr>
  </template>
</UiTable>

        </div>
      </div>
    </div>
  </div>

  <!-- ================== 보고서 설정 모달 ================== -->
  <UiModal title="보고서 설정" v-model="reportConfigModal" :size="'large'">
    <template #headerActions-right>
      <UiButton variant="primary" @click="reportCreateModal = true">
        <i class="icon icon-md icon-create icon-white"></i>
        <span>보고서생성</span>
      </UiButton>
    </template>

    <UiFormLayout>
      <UiFormItem label="보고서명">
        <div class="flex gap-10 items-center">
          <UiSelect
            class="w-150"
            placeholder="일간보고"
            :options="[
              { value: '일간보고', label: '일간보고' },
              { value: '주간보고', label: '주간보고' }
            ]"
          />
          <UiDatePicker class="w-150" />
        </div>
      </UiFormItem>
      <UiFormItem label="표시할내용">
        <div class="flex flex-col gap-5">
          <div class="flex gap-10 items-center">
            <UiCheckbox class="w-60" size="large" label="KPI" />
            <UiSelect
              class="w-150"
              placeholder="2025"
              :options="[
                { value: '2025', label: '2025' },
                { value: '2024', label: '2024' }
              ]"
            >
            </UiSelect>
          </div>
          <div class="flex gap-10 items-center">
            <UiCheckbox class="w-60" size="large" label="OKR" />
            <UiSelect
              class="w-150"
              placeholder="2025"
              :options="[
                { value: '2025', label: '2025' },
                { value: '2024', label: '2024' }
              ]"
            >
            </UiSelect>
            <UiSelect
              class="w-150"
              placeholder="1분기"
              :options="[
                { value: '1분기', label: '1분기' },
                { value: '2분기', label: '2분기' },
                { value: '3분기', label: '3분기' },
                { value: '4분기', label: '4분기' }
              ]"
            >
            </UiSelect>
          </div>
        </div>
      </UiFormItem>
      <UiFormItem label="실적작성방법">
        <div class="flex flex-col gap-5">
          <div class="flex gap-10 items-center">
            <UiRadio name="reportType" label="활동" />
            <div class="flex gap-10 is-border">
              <UiRadio name="reportType2" label="활동일" />
              <UiRadio name="reportType2" label="작성일" />
            </div>
            <div class="is-border">
              <UiCheckbox label="나의 활동만 가져오기" />
            </div>
            <div class="is-border">
              <UiCheckbox label="피드백도 포함해서 가져오기" />
            </div>
          </div>
          <UiRadio name="reportType" label="직접입력" />
        </div>
      </UiFormItem>
      <UiFormItem label="Project <br> 실적작성방법">
        <div class="flex flex-col gap-5">
          <div class="flex gap-10 items-center">
            <UiRadio name="reportType" label="활동" />
            <div class="flex gap-10 is-border">
              <UiRadio name="reportType2" label="활동일" />
              <UiRadio name="reportType2" label="작성일" />
            </div>
            <div class="is-border">
              <UiCheckbox label="나의 활동만 가져오기" />
            </div>
            <div class="is-border">
              <UiCheckbox label="피드백도 포함해서 가져오기" />
            </div>
          </div>
          <UiRadio name="reportType" label="직접입력" />
        </div>
      </UiFormItem>
    </UiFormLayout>
  </UiModal>

  <!-- ================== 보고서 생성 팝업 ======================-->
  <UiModal title="보고서 작성" v-model="reportCreateModal" :size="'xlarge'">
    <template #headerActions-right>
      <UiButton variant="primary" @click="isFilterModalOpen = false">제출</UiButton>
    </template>
    <UiFormLayout>
      <UiFormItem label="">
        <div class="flex gap-5 items-center com-header">
          <div class="user-label gap-5">
            <i class="icon icon-md icon-user"></i>
            <div class="user-name">김윤기</div>
          </div>
          <div>
            <ul class="daily-report">
              <li>일간보고</li>
              <li>2025.04.04 제출</li>
            </ul>
          </div>
          <div class="submit-target flex gap-5 items-center">
            <span class="label">제출대상:</span>
            <UiMultiSelect
              class="w-400"
              placeholder="협업자 이름을 입력해주세요"
              :options="[
                { value: 'value', label: '형광민[기업]' },
                { value: 'value', label: '땡땡땡[기업]' }
              ]"
            />
          </div>
          <UiButton variant="secondary" @click="aiSummaryModal = true">
            <img src="@/assets/images/ico_avatar_sai.svg" alt="sai" class="icon-md" />
            <span>AI 요약</span>
          </UiButton>
          <UiButton variant="secondary">
            <span>직접입력</span>
          </UiButton>
          <UiButton variant="secondary">
            <span>활동재생성</span>
          </UiButton>
          <UiButton variant="secondary" @click="addActivityPopup = true">
            <span>업무 활동 추가</span>
          </UiButton>
        </div>
      </UiFormItem>
    </UiFormLayout>

    <UiTable v-model="tableData" scrollable striped bordered maxHeight="calc(100vh - 220px)">
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
              내용을 입력하세요
            </div>
          </td>
          <td>
            <div class="p-3">
              <!-- 차주계획 내용 -->
              내용을 입력하세요
            </div>
          </td>
        </tr>
      </template>
    </UiTable>

     <!-- 의건/기타 -->
     <UiTable class="mt-20" title="의건/기타" v-model="tableData2" layout="horizontal" striped bordered>
            <template #body>
              <tr>
                <th>의견/기타</th>
                <td>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum voluptatum deserunt voluptatem, corrupti veniam quasi sapiente vitae quas necessitatibus ut sint odio quod provident ipsum fugiat aliquam repudiandae ullam excepturi, consequuntur iure quibusdam harum. Quisquam, perspiciatis fuga provident, necessitatibus autem quod, in quasi illo quos velit officiis minima voluptatibus deserunt incidunt cumque repudiandae eligendi facere impedit labore? Ad sed quam nisi sunt voluptatibus in impedit fuga rem rerum similique maxime, corrupti aliquam quia enim provident perspiciatis commodi excepturi repellendus error magnam eius odio fugiat quisquam placeat? Nobis recusandae veniam earum. Quas aperiam dolorem rem modi, excepturi vel et sunt laboriosam eveniet, recusandae saepe aspernatur aut totam soluta eius maxime hic blanditiis fugiat esse dolorum veniam laudantium. Consectetur a, omnis voluptatem illo nostrum impedit cum, suscipit, voluptas qui eligendi commodi ullam vitae quis dolore necessitatibus accusamus minus debitis eius molestiae architecto. Officia, corporis ex ea sequi laboriosam aperiam ipsam culpa temporibus provident quo reprehenderit, reiciendis deleniti soluta, fugit odit illum eligendi dolores necessitatibus aliquam sit explicabo commodi ipsum. Iusto alias similique doloribus dolor odit repellat aliquam porro, ipsum sapiente libero velit debitis tempore quos vitae quam eligendi modi quod distinctio quis quisquam nemo? Soluta accusantium mollitia, odit maxime dolores numquam eveniet?
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
        <UiAttachment v-model="attachmentFiles" />
      </td>
    </tr>
  </template>
</UiTable>
  </UiModal>

  <!-- ================== 활동추가 팝업 ================== -->
  <UiModal title="활동추가" v-model="addActivityPopup" size="xlarge">
    <template #headerActions-right>
      <UiButton variant="primary">
        <i class="icon icon-md icon-create icon-white"></i>
        추가
      </UiButton>
    </template>

    <div class="activity-header com-header flex gap-30 items-center">
      <div class="activity-header__date-section">
        <div class="activity-header__date-picker">
          <UiDatePicker isRange />
        </div>
      </div>

      <div class="activity-header__radio-section">
        <div class="activity-header__radio-group flex gap-10">
          <UiRadio label="활동일" name="a1"></UiRadio>
          <UiRadio label="작성일" name="a1"></UiRadio>
        </div>
      </div>

      <div class="activity-header__checkbox-section flex gap-10">
        <UiCheckbox id="a1">나의 활동만 가져오기</UiCheckbox>
        <UiCheckbox id="a2">피드백도 포함해서 가져오기</UiCheckbox>
      </div>
    </div>

    <div class="activity-content mt-20">
      <!-- 테이블 제목 테이블 -->
      <UiTable
        title="테이블 제목"
        v-model="tableData2"
        hover
        scrollable
        bordered
        maxHeight="calc(100vh - 220px)"
      >
        <template #colgroup>
          <col style="width: 40px" v-if="useCheckbox" />
          <!-- 동적 열 너비 설정 -->
          <col
            v-for="(column, index) in columns2"
            :key="index"
            :style="column.width ? `width: ${column.width}` : ''"
          />
        </template>
        <template #header="{ selectAll, isAllSelected }">
          <tr>
            <th style="width: 40px" v-if="useCheckbox">
              <UiCheckbox :modelValue="isAllSelected" @update:modelValue="selectAll" size="large" />
            </th>
            <th v-for="(column, index) in columns2" :key="index">{{ column.title }}</th>
          </tr>
        </template>
        <template
          #body="{
            rows,
            toggleRowSelection,
            isRowSelected,
            handleDragStart,
            handleDragOver,
            handleDrop,
            handleDragEnd,
            sortable
          }"
        >
          <tr
            v-for="(item, index) in rows"
            :key="item.id"
            @click="!sortable && toggleRowSelection(item)"
            :class="{
              selected: isRowSelected(item),
              'sortable-row': sortable
            }"
            :draggable="sortable"
            @dragstart="e => handleDragStart(e, index)"
            @dragover="e => handleDragOver(e)"
            @drop="e => handleDrop(e, index)"
            @dragend="handleDragEnd"
          >
            <td v-if="useCheckbox">
              <div v-if="!sortable" class="row-checkbox">
                <UiCheckbox
                  :modelValue="isRowSelected(item)"
                  @update:modelValue="toggleRowSelection(item)"
                  size="large"
                  @click.stop
                />
              </div>
              <div v-else class="drag-handle">
                <i class="icon-md icon-drag"></i>
              </div>
            </td>
            <td
              v-for="(column, colIndex) in columns2"
              :key="colIndex"
              :class="column.align ? `text-${column.align}` : ''"
            >
              {{ item[column.key] }}
            </td>
          </tr>
        </template>
      </UiTable>
    </div>
  </UiModal>

  <UiModal title="AI 요약 전후 비교" v-model="aiSummaryModal" :size="'mlarge'">
    <UiFormLayout>
      <div class="flex flex-col">
        <ul class="flex flex-wrap w-full fx-header">
          <li class="flex justify-center items-center w-half"><span>금일실적</span></li>
          <li class="flex justify-center items-center w-half"><span>AI 요약 금일 실적</span></li>
        </ul>
        <ul class="flex flex-wrap w-full h-100p fx-body">
          <li class="flex justify-center w-half border-right">
            1-left 현 프로세스 분석 및 문제점 파악, 개선안 초안 작성현 프로세스 분석 및 문제점 파악,
            개선안 초안 작성현 프로세스 분석 및 문제점 파악, 개선안 초안 작성현 프로세스 분석 및
            문제점 파악, 개선안 초안 작성
          </li>
          <li class="flex justify-center w-half">
            2-right 현 프로세스 분석 및 문제점 파악, 개선안 초안 작성현 프로세스 분석 및 문제점
            파악, 개선안 초안 작성현 프로세스 분석 및 문제점 파악, 개선안 초안 작성현 프로세스 분석
            및 문제점 파악, 개선안 초안 작성현 프로세스 분석 및 문제점 파악, 개선안 초안 작성현
            프로세스 분석 및 문제점 파악, 개선안 초안 작성현 프로세스 분석 및 문제점 파악, 개선안
            초안 작성현 프로세스 분석 및 문제점 파악, 개선안 초안 작
          </li>
        </ul>
      </div>
    </UiFormLayout>
  </UiModal>
</template>

<script setup>
  import { ref } from 'vue'

  // 로고 텍스트 접근
  const logoText = inject('logoText')

  // 원하는 시점에 로고 텍스트 변경
  logoText.value = '일일/주간보고'

  // 데이터 및 상태 관리
  const dateRange = ref([null, null])
  const useCheckbox = ref(true)
  const showEditButton = ref(true)
  const reportConfigModal = ref(false)
  const reportCreateModal = ref(false)
  const addActivityPopup = ref(false)
  const aiSummaryModal = ref(false)
  const attachmentFiles = ref([])

  const columns = ref([
    { key: 'date', title: '날짜', width: '140px', align: 'center' },
    { key: 'type', title: '보고서 유형', width: '80px', align: 'center' },
    { key: 'status', title: '상태', width: '80px', align: 'center' },
    { key: 'feedbackCount', title: '피드백', width: '50px', align: 'center' }
  ])

  const tableData = ref([
    {
      date: '2025-05-22',
      type: '일간보고',
      status: '대기',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-05-21',
      type: '일간보고',
      status: '제출',
      hasFeedback: true,
      feedbackCount: 2
    },
    {
      date: '2025-05-20',
      type: '일간보고',
      status: '제출',
      hasFeedback: true,
      feedbackCount: 1
    },
    {
      date: '2025-05-19',
      type: '일간보고',
      status: '제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-05-18',
      type: '주간보고',
      status: '제출',
      hasFeedback: true,
      feedbackCount: 3
    },
    {
      date: '2025-05-17',
      type: '일간보고',
      status: '미제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-05-16',
      type: '일간보고',
      status: '제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-05-15',
      type: '일간보고',
      status: '제출',
      hasFeedback: true,
      feedbackCount: 1
    },
    {
      date: '2025-05-14',
      type: '일간보고',
      status: '제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-05-13',
      type: '일간보고',
      status: '미제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-05-12',
      type: '일간보고',
      status: '제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-05-11',
      type: '주간보고',
      status: '제출',
      hasFeedback: true,
      feedbackCount: 2
    },
    {
      date: '2025-05-10',
      type: '일간보고',
      status: '제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-05-09',
      type: '일간보고',
      status: '제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-05-08',
      type: '일간보고',
      status: '미제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-05-07',
      type: '일간보고',
      status: '제출',
      hasFeedback: true,
      feedbackCount: 1
    },
    {
      date: '2025-05-06',
      type: '일간보고',
      status: '제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-05-05',
      type: '일간보고',
      status: '미제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-05-04',
      type: '주간보고',
      status: '제출',
      hasFeedback: true,
      feedbackCount: 2
    },
    {
      date: '2025-05-03',
      type: '일간보고',
      status: '제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-05-02',
      type: '일간보고',
      status: '제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-05-01',
      type: '일간보고',
      status: '제출',
      hasFeedback: true,
      feedbackCount: 1
    },
    {
      date: '2025-04-30',
      type: '일간보고',
      status: '미제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-04-29',
      type: '일간보고',
      status: '제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-04-28',
      type: '일간보고',
      status: '제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-04-27',
      type: '주간보고',
      status: '제출',
      hasFeedback: true,
      feedbackCount: 3
    },
    {
      date: '2025-04-26',
      type: '일간보고',
      status: '제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-04-25',
      type: '일간보고',
      status: '제출',
      hasFeedback: true,
      feedbackCount: 1
    },
    {
      date: '2025-04-24',
      type: '일간보고',
      status: '미제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-04-23',
      type: '일간보고',
      status: '제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-04-22',
      type: '일간보고',
      status: '제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-04-21',
      type: '일간보고',
      status: '제출',
      hasFeedback: true,
      feedbackCount: 1
    },
    {
      date: '2025-04-20',
      type: '주간보고',
      status: '제출',
      hasFeedback: true,
      feedbackCount: 2
    },
    {
      date: '2025-04-19',
      type: '일간보고',
      status: '제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-04-18',
      type: '일간보고',
      status: '미제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-04-17',
      type: '일간보고',
      status: '제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-04-16',
      type: '일간보고',
      status: '제출',
      hasFeedback: true,
      feedbackCount: 1
    },
    {
      date: '2025-04-15',
      type: '일간보고',
      status: '제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-04-14',
      type: '일간보고',
      status: '미제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-04-13',
      type: '주간보고',
      status: '제출',
      hasFeedback: true,
      feedbackCount: 2
    },
    {
      date: '2025-04-12',
      type: '일간보고',
      status: '제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-04-11',
      type: '일간보고',
      status: '제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-04-10',
      type: '일간보고',
      status: '제출',
      hasFeedback: true,
      feedbackCount: 1
    },
    {
      date: '2025-04-09',
      type: '일간보고',
      status: '미제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-04-08',
      type: '일간보고',
      status: '제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-04-07',
      type: '일간보고',
      status: '제출',
      hasFeedback: false,
      feedbackCount: 0
    },
    {
      date: '2025-04-06',
      type: '주간보고',
      status: '제출',
      hasFeedback: true,
      feedbackCount: 2
    },
    {
      date: '2025-04-05',
      type: '일간보고',
      status: '제출',
      hasFeedback: false,
      feedbackCount: 0
    }
  ])

  const columns2 = ref([
    { key: 'board', title: '보드', width: '150px', align: 'center' },
    { key: 'task', title: '업무', width: 'auto', align: 'center' },
    { key: 'activityDate', title: '활동일자', width: '120px', align: 'center' },
    { key: 'content', title: '활동내용', width: 'auto', align: 'left' },
    { key: 'author', title: '작성자', width: '80px', align: 'center' },
    { key: 'createdAt', title: '작성일자', width: '120px', align: 'center' }
  ])

  const tableData2 = ref([
    {
      board: '클라우드 서비스',
      task: '시스템 모니터링',
      activityDate: '2025-04-27',
      content: '클라우드 서버 성능 모니터링 및 로그 분석',
      author: '김개발',
      createdAt: '2025-04-27'
    },
    {
      board: 'RPA',
      task: '자동화 스크립트 개발',
      activityDate: '2025-04-26',
      content: '데이터 처리 자동화 스크립트 개발 및 테스트',
      author: '이자동',
      createdAt: '2025-04-26'
    },
    {
      board: '보안',
      task: '취약점 분석',
      activityDate: '2025-04-25',
      content: '시스템 보안 취약점 분석 및 개선방안 도출',
      author: '박보안',
      createdAt: '2025-04-25'
    },
    {
      board: 'QA',
      task: '통합 테스트',
      activityDate: '2025-04-24',
      content: '신규 기능 통합 테스트 및 버그 리포트 작성',
      author: '한품질',
      createdAt: '2025-04-24'
    },
    {
      board: '피드백',
      task: '사용자 피드백 수집',
      activityDate: '2025-04-23',
      content: '사용자 인터뷰 진행 및 피드백 정리',
      author: '최분석',
      createdAt: '2025-04-23'
    },
    {
      board: '클라우드 서비스',
      task: 'API 개발',
      activityDate: '2025-04-22',
      content: '클라우드 서비스 연동 API 개발 및 문서화',
      author: '김개발',
      createdAt: '2025-04-22'
    },
    {
      board: 'RPA',
      task: '워크플로우 최적화',
      activityDate: '2025-04-21',
      content: '자동화 워크플로우 성능 최적화 및 개선',
      author: '이자동',
      createdAt: '2025-04-21'
    },
    {
      board: '보안',
      task: '인증 시스템 개선',
      activityDate: '2025-04-20',
      content: '사용자 인증 시스템 보안 강화 작업',
      author: '박보안',
      createdAt: '2025-04-20'
    },
    {
      board: 'QA',
      task: '성능 테스트',
      activityDate: '2025-04-19',
      content: '시스템 부하 테스트 및 성능 분석',
      author: '임성능',
      createdAt: '2025-04-19'
    },
    {
      board: '피드백',
      task: '개선점 분석',
      activityDate: '2025-04-18',
      content: '사용자 피드백 기반 개선점 분석 보고서 작성',
      author: '최분석',
      createdAt: '2025-04-18'
    },
    {
      board: '클라우드 서비스',
      task: '시스템 모니터링',
      activityDate: '2025-04-27',
      content: '클라우드 서버 성능 모니터링 및 로그 분석',
      author: '김개발',
      createdAt: '2025-04-27'
    },
    {
      board: 'RPA',
      task: '자동화 스크립트 개발',
      activityDate: '2025-04-26',
      content: '데이터 처리 자동화 스크립트 개발 및 테스트',
      author: '이자동',
      createdAt: '2025-04-26'
    },
    {
      board: '보안',
      task: '취약점 분석',
      activityDate: '2025-04-25',
      content: '시스템 보안 취약점 분석 및 개선방안 도출',
      author: '박보안',
      createdAt: '2025-04-25'
    },
    {
      board: 'QA',
      task: '통합 테스트',
      activityDate: '2025-04-24',
      content: '신규 기능 통합 테스트 및 버그 리포트 작성',
      author: '한품질',
      createdAt: '2025-04-24'
    },
    {
      board: '피드백',
      task: '사용자 피드백 수집',
      activityDate: '2025-04-23',
      content: '사용자 인터뷰 진행 및 피드백 정리',
      author: '최분석',
      createdAt: '2025-04-23'
    },
    {
      board: '클라우드 서비스',
      task: 'API 개발',
      activityDate: '2025-04-22',
      content: '클라우드 서비스 연동 API 개발 및 문서화',
      author: '김개발',
      createdAt: '2025-04-22'
    },
    {
      board: 'RPA',
      task: '워크플로우 최적화',
      activityDate: '2025-04-21',
      content: '자동화 워크플로우 성능 최적화 및 개선',
      author: '이자동',
      createdAt: '2025-04-21'
    },
    {
      board: '보안',
      task: '인증 시스템 개선',
      activityDate: '2025-04-20',
      content: '사용자 인증 시스템 보안 강화 작업',
      author: '박보안',
      createdAt: '2025-04-20'
    },
    {
      board: 'QA',
      task: '성능 테스트',
      activityDate: '2025-04-19',
      content: '시스템 부하 테스트 및 성능 분석',
      author: '임성능',
      createdAt: '2025-04-19'
    },
    {
      board: '피드백',
      task: '개선점 분석',
      activityDate: '2025-04-18',
      content: '사용자 피드백 기반 개선점 분석 보고서 작성',
      author: '최분석',
      createdAt: '2025-04-18'
    }
  ])

</script>
