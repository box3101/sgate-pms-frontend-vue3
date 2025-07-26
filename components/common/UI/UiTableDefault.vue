<template>
	<!--
		UiTableDefault - 재사용 가능한 범용 테이블 컴포넌트

		주요 기능:
		- 행/열 선택 기능 (단일/다중 선택)
		- 동적 rowspan/colspan 지원
		- 로딩/빈 상태 UI
		- 반응형 가로 스크롤
		- 다양한 스타일 옵션 (테두리, 줄무늬, 호버 등)

		사용 예시:
		<UiTableDefault
			v-model="tableData"
			v-model:selected="selectedRows"
			:selectable="true"
			:bordered="true"
			:group-by-columns="['category', 'subcategory']"
		>
			<template #header="{ selectAllProps }">
				<tr>
					<th v-if="selectable">
						<UiCheckbox v-bind="selectAllProps" />
					</th>
					<th>이름</th>
					<th>카테고리</th>
				</tr>
			</template>
			<template #body="{ rows, selectRowProps }">
				<tr v-for="row in rows" :key="row.id">
					<td v-if="selectable">
						<UiCheckbox
							:model-value="selectRowProps.isRowSelected(row)"
							@update:model-value="selectRowProps.toggleRowSelection(row)"
						/>
					</td>
					<td>{{ row.name }}</td>
					<td>{{ row.category }}</td>
				</tr>
			</template>
		</UiTableDefault>
	-->
	<div class="ui-table-wrapper-default">
		<table class="ui-table-default" :class="tableClasses">
			<!--
				컬럼 그룹 정의 영역
				col 태그를 통해 각 컬럼의 너비나 스타일을 미리 정의할 수 있음

				사용 예시:
				<template #colgroup>
					<col style="width: 50px" />
					<col style="width: 200px" />
					<col />
				</template>
			-->
			<colgroup v-if="$slots.colgroup">
				<slot name="colgroup" />
			</colgroup>

			<!--
				테이블 헤더 영역
				selectAllProps: 전체선택 체크박스에 바인딩할 props
				hidden: 컬럼 숨김 상태 (향후 확장용)
			-->
			<thead v-if="$slots.header" class="ui-table-default__header">
				<slot name="header" :selectAllProps="selectable ? selectAllProps : null" :hidden="hidden" />
			</thead>

			<!--
				테이블 바디 영역 - 실제 데이터가 표시되는 부분

				Slot Props 설명:
				- rows: 그룹핑/필터링 처리된 최종 테이블 데이터
				- loading: 로딩 상태 (부모에서 데이터 fetch 중일 때 true)
				- selectRowProps: 행 선택 관련 함수들
				  - isRowSelected(row): 해당 행이 선택되었는지 확인
				  - toggleRowSelection(row): 해당 행의 선택 상태 토글
				- onRowClick: 행 클릭 이벤트 핸들러
				- hidden: 컬럼 숨김 상태
				- getCellSpan: 셀의 rowspan/colspan 계산 함수
				- shouldShowCell: 병합으로 인해 숨겨져야 할 셀인지 확인
				- shouldShowGroupCell: 그룹핑으로 인한 rowspan 적용 시 셀 표시 여부
				- getGroupRowspan: 그룹핑된 셀의 rowspan 값
			-->
			<tbody class="ui-table-default__body">
				<slot
					name="body"
					:rows="processedTableData"
					:loading="loading"
					:selectRowProps="selectable ? { isRowSelected, toggleRowSelection } : null"
					:onRowClick="handleRowClick"
					:hidden="hidden"
					:getCellSpan="getCellSpan"
					:shouldShowCell="shouldShowCell"
					:shouldShowGroupCell="shouldShowGroupCell"
					:getGroupRowspan="getGroupRowspan"
				/>

				<!--
					로딩 상태 표시
					데이터를 불러오는 중일 때 스피너와 함께 표시
					colspan으로 모든 컬럼을 차지하도록 설정
				-->
				<tr v-if="loading" class="ui-table-default__loading">
					<td :colspan="columnCount" class="text-center">
						<div class="loading-spinner">로딩 중...</div>
					</td>
				</tr>

				<!--
					빈 데이터 상태 표시 (현재 주석 처리됨)
					데이터가 없을 때 사용자에게 안내 메시지 표시
					필요에 따라 주석을 해제하고 사용
				-->
				<!-- <tr v-else-if="!processedTableData?.length" class="ui-table-default__empty">
					<td :colspan="columnCount" class="text-center">
						{{ emptyMessage }}
					</td>
				</tr> -->
			</tbody>

			<!--
				테이블 푸터 영역
				합계나 페이지네이션 등을 표시할 때 사용
			-->
			<tfoot v-if="$slots.footer" class="ui-table-default__footer">
				<slot name="footer" />
			</tfoot>
		</table>
	</div>
</template>

<script setup>
	import { computed, ref, watch } from 'vue'

	/**
	 * UiTableDefault 컴포넌트의 Props 정의
	 *
	 * 이 컴포넌트는 다양한 형태의 테이블을 생성할 수 있도록
	 * 풍부한 설정 옵션을 제공합니다.
	 */
	const props = defineProps({
		/**
		 * 테이블에 표시할 데이터 배열
		 *
		 * @type {Array<Object>}
		 * @description 각 객체는 테이블의 한 행을 나타냄
		 * @example
		 * [
		 *   { id: 1, name: '홍길동', age: 30 },
		 *   { id: 2, name: '김철수', age: 25 }
		 * ]
		 */
		modelValue: {
			type: Array,
			default: () => []
		},

		/**
		 * 행 선택 기능 활성화 여부
		 *
		 * @type {Boolean}
		 * @description true일 때 체크박스를 통한 행 선택이 가능해짐
		 * @default false
		 */
		selectable: {
			type: Boolean,
			default: false
		},

		/**
		 * 현재 선택된 행들의 배열 (v-model:selected로 바인딩)
		 *
		 * @type {Array<Object>}
		 * @description 선택된 행의 전체 객체가 포함된 배열
		 * @example
		 * [
		 *   { id: 1, name: '홍길동', age: 30 },
		 *   { id: 3, name: '박영희', age: 28 }
		 * ]
		 */
		selected: {
			type: Array,
			default: () => []
		},

		/**
		 * 각 행을 식별할 고유 키
		 *
		 * @type {String}
		 * @description 행 선택/비교 시 사용되는 필드명
		 * @default 'id'
		 * @example 'userId', 'code', 'uniqueKey' 등
		 */
		rowKey: {
			type: String,
			default: 'id'
		},

		/**
		 * 테이블 테두리 표시 여부
		 *
		 * @type {Boolean}
		 * @description true일 때 셀과 테이블 외곽에 테두리가 표시됨
		 * @default false
		 */
		bordered: {
			type: Boolean,
			default: false
		},

		/**
		 * 줄무늬 스타일 적용 여부
		 *
		 * @type {Boolean}
		 * @description true일 때 홀수/짝수 행에 다른 배경색 적용
		 * @default false
		 */
		striped: {
			type: Boolean,
			default: false
		},

		/**
		 * 행 호버 효과 적용 여부
		 *
		 * @type {Boolean}
		 * @description true일 때 마우스 오버 시 행 배경색 변경
		 * @default false
		 */
		hover: {
			type: Boolean,
			default: false
		},

		/**
		 * 테이블 크기 설정
		 *
		 * @type {String}
		 * @description 셀의 패딩과 폰트 크기를 결정
		 * @default 'medium'
		 * @options 'small' | 'medium' | 'large'
		 */
		size: {
			type: String,
			default: 'medium',
			validator: value => ['small', 'medium', 'large'].includes(value)
		},

		/**
		 * 로딩 상태 표시 여부
		 *
		 * @type {Boolean}
		 * @description true일 때 로딩 스피너와 메시지 표시
		 * @default false
		 */
		loading: {
			type: Boolean,
			default: false
		},

		/**
		 * 데이터가 없을 때 표시할 메시지
		 *
		 * @type {String}
		 * @description 빈 상태일 때 사용자에게 보여줄 안내 문구
		 * @default '데이터가 없습니다.'
		 */
		emptyMessage: {
			type: String,
			default: '데이터가 없습니다.'
		},

		/**
		 * 테이블의 총 컬럼 수
		 *
		 * @type {Number}
		 * @description 로딩/빈 상태 메시지의 colspan 값으로 사용
		 * @default 4
		 */
		columnCount: {
			type: Number,
			default: 4
		},

		/**
		 * 세로형 테이블 레이아웃 사용 여부
		 *
		 * @type {Boolean}
		 * @description true일 때 모바일 친화적인 세로 레이아웃으로 변경
		 * @default false
		 */
		vertical: {
			type: Boolean,
			default: false
		},

		/**
		 * 컬럼 숨김 기능 활성화 여부
		 *
		 * @type {Boolean}
		 * @description 향후 확장용 - 동적 컬럼 숨김/표시 기능
		 * @default false
		 */
		hidden: {
			type: Boolean,
			default: false
		},

		/**
		 * HTML 템플릿 사용 여부
		 *
		 * @type {Boolean}
		 * @description v-html 등을 통한 HTML 렌더링 허용 여부
		 * @default false
		 */
		htmlTemplate: {
			type: Boolean,
			default: false
		},

		/**
		 * 수동 행 병합 설정 객체
		 *
		 * @type {Object}
		 * @description 특정 조건에 따른 rowspan 설정 (향후 확장용)
		 * @default {}
		 */
		rowSpanConfig: {
			type: Object,
			default: () => ({})
		},

		/**
		 * 수동 열 병합 설정 객체
		 *
		 * @type {Object}
		 * @description 특정 조건에 따른 colspan 설정 (향후 확장용)
		 * @default {}
		 */
		colspanConfig: {
			type: Object,
			default: () => ({})
		},

		/**
		 * 자동 rowspan 그룹핑을 위한 컬럼 키 배열
		 *
		 * @type {Array<String>}
		 * @description 계층 구조 데이터를 자동으로 그룹핑하여 rowspan 적용
		 * @example ['competencyName', 'category'] // 상위 그룹부터 순서대로
		 * @default []
		 *
		 * 사용 시나리오:
		 * - 역량 평가 테이블에서 역량명 > 카테고리 > 세부항목 구조
		 * - 조직도에서 부서 > 팀 > 구성원 구조
		 * - 제품 분류에서 대분류 > 중분류 > 소분류 구조
		 */
		groupByColumns: {
			type: Array,
			default: () => []
		},

		/**
		 * 중첩 구조 데이터의 하위 배열 키명
		 *
		 * @type {String}
		 * @description 그룹 객체 내에서 실제 데이터 배열을 담고 있는 프로퍼티명
		 * @default 'items'
		 * @example
		 * // nestedDataKey가 'items'인 경우:
		 * {
		 *   competencyName: '리더십',
		 *   items: [
		 *     { category: '의사결정', name: '신속한 판단' },
		 *     { category: '의사결정', name: '책임감' }
		 *   ]
		 * }
		 */
		nestedDataKey: {
			type: String,
			default: 'items'
		}
	})

	/**
	 * 컴포넌트에서 발생시키는 이벤트들
	 *
	 * update:selected - 선택된 행이 변경될 때 발생
	 * row-click - 행이 클릭될 때 발생
	 */
	const emit = defineEmits(['update:selected', 'row-click'])

	/**
	 * 내부 선택 상태 관리를 위한 반응형 변수
	 *
	 * @type {Ref<Array>}
	 * @description props.selected와 동기화되며, 실제 선택 로직을 처리
	 */
	const internalSelected = ref([...props.selected])

	/**
	 * 부모 컴포넌트의 selected props 변경을 감지하여 내부 상태 동기화
	 *
	 * @description 외부에서 선택 상태가 변경되었을 때 내부 상태를 업데이트
	 */
	watch(
		() => props.selected,
		newVal => {
			internalSelected.value = [...newVal]
		},
		{ deep: true }
	)

	/**
	 * 내부 선택 상태 변경을 부모 컴포넌트로 전달
	 *
	 * @description 내부에서 선택이 변경되었을 때 부모에게 이벤트 발생
	 */
	watch(
		internalSelected,
		newVal => {
			emit('update:selected', newVal)
		},
		{ deep: true }
	)

	/**
	 * 현재 페이지의 모든 행이 선택되었는지 확인
	 *
	 * @returns {Boolean} 모든 행이 선택되었으면 true
	 * @description 전체선택 체크박스의 상태를 결정하는 데 사용
	 */
	const isAllSelected = computed(() => {
		if (!props.modelValue.length) return false
		return props.modelValue.every(row =>
			internalSelected.value.some(selected => selected[props.rowKey] === row[props.rowKey])
		)
	})

	/**
	 * 부분 선택 상태인지 확인 (일부만 선택된 상태)
	 *
	 * @returns {Boolean} 일부만 선택되었으면 true
	 * @description 전체선택 체크박스의 indeterminate 상태를 결정
	 */
	const isIndeterminate = computed(() => {
		const selectedCount = internalSelected.value.filter(selected =>
			props.modelValue.some(row => row[props.rowKey] === selected[props.rowKey])
		).length
		return selectedCount > 0 && selectedCount < props.modelValue.length
	})

	/**
	 * 전체 선택/해제 토글 함수
	 *
	 * @description
	 * - 모든 행이 선택된 상태: 현재 페이지의 모든 행 선택 해제
	 * - 일부 또는 아무것도 선택되지 않은 상태: 현재 페이지의 모든 행 선택
	 * - 다른 페이지에서 선택된 행들은 유지됨 (페이지네이션 고려)
	 */
	const toggleSelectAll = () => {
		if (isAllSelected.value) {
			// 현재 페이지의 모든 행 선택 해제
			internalSelected.value = internalSelected.value.filter(
				selected => !props.modelValue.some(row => row[props.rowKey] === selected[props.rowKey])
			)
		} else {
			// 현재 페이지의 모든 행 선택
			const currentPageKeys = props.modelValue.map(row => row[props.rowKey])
			const otherSelected = internalSelected.value.filter(
				selected => !currentPageKeys.includes(selected[props.rowKey])
			)
			internalSelected.value = [...otherSelected, ...props.modelValue]
		}
	}

	/**
	 * 특정 행이 선택되었는지 확인
	 *
	 * @param {Object} row - 확인할 행 데이터
	 * @returns {Boolean} 선택되었으면 true
	 */
	const isRowSelected = row => {
		return internalSelected.value.some(selected => selected[props.rowKey] === row[props.rowKey])
	}

	/**
	 * 개별 행의 선택 상태 토글
	 *
	 * @param {Object} row - 토글할 행 데이터
	 * @description
	 * - 선택된 행: 선택 해제
	 * - 선택되지 않은 행: 선택 목록에 추가
	 */
	const toggleRowSelection = row => {
		if (isRowSelected(row)) {
			internalSelected.value = internalSelected.value.filter(
				selected => selected[props.rowKey] !== row[props.rowKey]
			)
		} else {
			internalSelected.value.push(row)
		}
	}

	/**
	 * 전체선택 체크박스에 바인딩할 props 객체
	 *
	 * @returns {Object} 체크박스 컴포넌트에 전달할 props
	 * @property {Boolean} modelValue - 체크박스 선택 상태
	 * @property {Boolean} indeterminate - 부분 선택 상태 (하이픈 표시)
	 * @property {Function} onUpdate:modelValue - 상태 변경 핸들러
	 */
	const selectAllProps = computed(() => ({
		modelValue: isAllSelected.value,
		indeterminate: isIndeterminate.value,
		'onUpdate:modelValue': toggleSelectAll
	}))

	/**
	 * 행 클릭 이벤트 핸들러
	 *
	 * @param {Object} row - 클릭된 행의 데이터
	 * @param {Number} index - 행의 인덱스
	 * @param {Event} event - 클릭 이벤트 객체
	 * @description 부모 컴포넌트에서 행 클릭에 대한 추가 처리를 할 수 있도록 이벤트 전달
	 */
	const handleRowClick = (row, index, event) => {
		emit('row-click', { row, index, event })
	}

	/**
	 * 테이블에 적용될 CSS 클래스들을 계산
	 *
	 * @returns {Array} CSS 클래스 배열
	 * @description props에 따라 동적으로 클래스를 추가/제거
	 */
	const tableClasses = computed(() => {
		return [
			`ui-table-default--${props.size}`, // 크기별 클래스
			{
				'ui-table-default--bordered': props.bordered, // 테두리
				'ui-table-default--striped': props.striped, // 줄무늬
				'ui-table-default--hover': props.hover, // 호버 효과
				'ui-table-default--loading': props.loading, // 로딩 상태
				'ui-table-default--vertical': props.vertical, // 세로 레이아웃
				'ui-table-default--selectable': props.selectable // 선택 가능
			}
		]
	})

	/**
	 * 셀의 rowspan/colspan 값을 계산하는 함수
	 *
	 * @param {Object} row - 행 데이터
	 * @param {Number} rowIndex - 행 인덱스
	 * @param {String} columnKey - 컬럼 키
	 * @returns {Object} { rowspan: number, colspan: number }
	 * @description 향후 확장을 위한 셀 병합 기능 (현재는 기본값 반환)
	 */
	const getCellSpan = (row, rowIndex, columnKey) => {
		const result = { rowspan: 1, colspan: 1 }

		// 향후 수동 rowspan 설정 기능 추가 시 사용
		if (props.getRowSpan) {
			result.rowspan = props.getRowSpan(row, rowIndex, columnKey) || 1
		}

		// 향후 수동 colspan 설정 기능 추가 시 사용
		if (props.getColSpan) {
			result.colspan = props.getColSpan(row, rowIndex, columnKey) || 1
		}

		return result
	}

	/**
	 * 특정 셀이 표시되어야 하는지 확인하는 함수
	 *
	 * @param {Object} row - 행 데이터
	 * @param {Number} rowIndex - 행 인덱스
	 * @param {String} columnKey - 컬럼 키
	 * @returns {Boolean} 셀을 표시해야 하면 true
	 * @description 셀 병합으로 인해 숨겨져야 할 셀을 판단 (향후 확장용)
	 */
	const shouldShowCell = (row, rowIndex, columnKey) => {
		if (!props.shouldShowCell) return true
		return props.shouldShowCell(row, rowIndex, columnKey)
	}

	/**
	 * 그룹핑 처리된 최종 테이블 데이터
	 *
	 * @returns {Array} 처리된 테이블 데이터
	 * @description
	 * 1. groupByColumns가 설정되지 않은 경우: 원본 데이터 반환
	 * 2. groupByColumns가 설정된 경우: 자동 rowspan 정보가 추가된 데이터 반환
	 */
	const processedTableData = computed(() => {
		if (!props.groupByColumns.length) {
			return props.modelValue
		}

		const flattened = []

		props.modelValue.forEach(group => {
			// 중첩 구조 데이터 처리 (예: competencyData)
			if (group[props.nestedDataKey] && Array.isArray(group[props.nestedDataKey])) {
				processNestedData(group, flattened)
			} else {
				// 평면 구조 데이터 처리
				flattened.push(group)
			}
		})

		return addRowspanInfo(flattened)
	})

	/**
	 * 중첩된 데이터 구조를 평면화하고 그룹핑 정보를 추가
	 *
	 * @param {Object} group - 그룹 데이터 (상위 레벨)
	 * @param {Array} flattened - 결과를 저장할 배열
	 * @description
	 * 중첩 구조의 데이터를 평면화하면서 각 아이템에 그룹핑 정보를 추가합니다.
	 *
	 * 예시 입력:
	 * {
	 *   competencyName: '리더십',
	 *   items: [
	 *     { category: '의사결정', name: '신속한 판단' },
	 *     { category: '의사결정', name: '책임감' },
	 *     { category: '커뮤니케이션', name: '경청' }
	 *   ]
	 * }
	 *
	 * 예시 출력 (flattened 배열에 추가됨):
	 * [
	 *   {
	 *     category: '의사결정', name: '신속한 판단',
	 *     competencyName: '리더십',
	 *     iscompetencyNameFirst: true, competencyNameRowspan: 3,
	 *     iscategoryFirst: true, categoryRowspan: 2
	 *   },
	 *   {
	 *     category: '의사결정', name: '책임감',
	 *     competencyName: '리더십',
	 *     iscompetencyNameFirst: false, competencyNameRowspan: 3,
	 *     iscategoryFirst: false, categoryRowspan: 2
	 *   },
	 *   // ...
	 * ]
	 */
	const processNestedData = (group, flattened) => {
		const items = group[props.nestedDataKey]

		// 다중 레벨 그룹핑 처리 (예: competencyName > category)
		if (props.groupByColumns.length >= 2) {
			const [firstGroupKey, secondGroupKey] = props.groupByColumns

			// 두 번째 그룹핑 키로 하위 그룹 생성
			const subGroups = {}
			items.forEach(item => {
				const subGroupValue = item[secondGroupKey]
				if (!subGroups[subGroupValue]) {
					subGroups[subGroupValue] = []
				}
				subGroups[subGroupValue].push(item)
			})

			// 각 서브그룹 처리
			let isFirstInMainGroup = true

			Object.entries(subGroups).forEach(([subGroupValue, subItems]) => {
				subItems.forEach((item, subIndex) => {
					flattened.push({
						...item,
						[firstGroupKey]: group[firstGroupKey],
						// 첫 번째 그룹 rowspan 정보
						[`is${firstGroupKey}First`]: isFirstInMainGroup,
						[`${firstGroupKey}Rowspan`]: items.length,
						// 두 번째 그룹 rowspan 정보
						[`is${secondGroupKey}First`]: subIndex === 0,
						[`${secondGroupKey}Rowspan`]: subItems.length,
						[`${secondGroupKey}Value`]: subGroupValue
					})

					if (isFirstInMainGroup) isFirstInMainGroup = false
				})
			})
		} else {
			// 단일 레벨 그룹핑 처리
			const groupKey = props.groupByColumns[0]
			items.forEach((item, index) => {
				flattened.push({
					...item,
					[groupKey]: group[groupKey],
					[`is${groupKey}First`]: index === 0,
					[`${groupKey}Rowspan`]: items.length
				})
			})
		}
	}

	/**
	 * 평면 데이터에 rowspan 정보를 추가
	 *
	 * @param {Array} data - 평면화된 데이터 배열
	 * @returns {Array} rowspan 정보가 추가된 데이터
	 * @description
	 * 이미 평면화된 데이터에서 동일한 값을 가진 연속된 행들을 찾아
	 * rowspan 정보를 추가합니다.
	 *
	 * 알고리즘:
	 * 1. 각 그룹핑 키별로 값의 출현 횟수 계산
	 * 2. 각 행을 순회하면서 해당 그룹의 첫 번째 행인지 확인
	 * 3. 첫 번째 행에는 rowspan 값 설정, 나머지는 0으로 설정
	 */
	const addRowspanInfo = data => {
		if (!props.groupByColumns.length) return data

		const result = []
		const groupCounts = {}

		// 1단계: 각 그룹의 개수 계산
		data.forEach(item => {
			props.groupByColumns.forEach(groupKey => {
				const value = item[groupKey]
				if (!groupCounts[groupKey]) groupCounts[groupKey] = {}
				groupCounts[groupKey][value] = (groupCounts[groupKey][value] || 0) + 1
			})
		})

		// 2단계: rowspan 정보 추가
		const processed = {} // 이미 처리된 그룹을 추적
		data.forEach(item => {
			const processedItem = { ...item }

			props.groupByColumns.forEach(groupKey => {
				const value = item[groupKey]
				const key = `${groupKey}_${value}` // 그룹 고유 키

				if (!processed[key]) {
					// 해당 그룹의 첫 번째 행
					processedItem[`is${groupKey}First`] = true
					processedItem[`${groupKey}Rowspan`] = groupCounts[groupKey][value]
					processed[key] = true
				} else {
					// 해당 그룹의 후속 행 (rowspan으로 병합됨)
					processedItem[`is${groupKey}First`] = false
					processedItem[`${groupKey}Rowspan`] = 0
				}
			})

			result.push(processedItem)
		})

		return result
	}

	/**
	 * 그룹핑으로 인한 rowspan 적용 시 셀을 표시할지 확인
	 *
	 * @param {Object} row - 행 데이터
	 * @param {String} columnKey - 컬럼 키
	 * @returns {Boolean} 셀을 표시해야 하면 true
	 * @description
	 * rowspan이 적용된 셀의 경우, 첫 번째 행에서만 표시하고
	 * 나머지 행에서는 숨깁니다.
	 *
	 * 사용 예시:
	 * <td v-if="shouldShowGroupCell(row, 'competencyName')"
	 *     :rowspan="getGroupRowspan(row, 'competencyName')">
	 *   {{ row.competencyName }}
	 * </td>
	 */
	const shouldShowGroupCell = (row, columnKey) => {
		if (!props.groupByColumns.includes(columnKey)) return true
		return row[`is${columnKey}First`]
	}

	/**
	 * 그룹핑된 셀의 rowspan 값을 계산
	 *
	 * @param {Object} row - 행 데이터
	 * @param {String} columnKey - 컬럼 키
	 * @returns {Number} rowspan 값
	 * @description
	 * 그룹핑된 컬럼의 rowspan 값을 반환합니다.
	 * 첫 번째 행은 실제 rowspan 값, 나머지는 1을 반환합니다.
	 */
	const getGroupRowspan = (row, columnKey) => {
		if (!props.groupByColumns.includes(columnKey)) return 1
		return row[`${columnKey}Rowspan`] || 1
	}
</script>

<style lang="scss" scoped>
	/**
	 * UiTableDefault 컴포넌트 스타일시트
	 *
	 * 주요 특징:
	 * - 반응형 디자인 지원
	 * - 가로 스크롤 처리
	 * - 다양한 테이블 스타일 옵션
	 * - 접근성 고려 (키보드 네비게이션, 스크린 리더 등)
	 * - 크로스 브라우저 호환성
	 */

	/**
	 * 테이블 래퍼 - 가로 스크롤 컨테이너
	 *
	 * 목적:
	 * - 테이블이 컨테이너보다 클 때 가로 스크롤 제공
	 * - 세로 스크롤은 페이지 레벨에서 처리하도록 visible 설정
	 * - 모바일에서도 테이블 내용을 볼 수 있도록 보장
	 */
	.ui-table-wrapper-default {
		width: 100%;
		overflow-x: auto; /* 가로 스크롤만 활성화 */
		overflow-y: visible; /* 세로는 부모에서 처리 */

		/*
		 * 커스텀 스크롤바 스타일링 (Webkit 브라우저)
		 * Chrome, Safari, Edge 등에서 더 나은 사용자 경험 제공
		 */
		&::-webkit-scrollbar {
			height: 8px; /* 가로 스크롤바 높이 */
		}

		&::-webkit-scrollbar-track {
			background: #f1f1f1; /* 스크롤 트랙 배경색 */
			border-radius: 4px;
		}

		&::-webkit-scrollbar-thumb {
			background: #c1c1c1; /* 스크롤 핸들 색상 */
			border-radius: 4px;

			&:hover {
				background: #a8a8a8; /* 호버 시 더 진한 색상 */
			}
		}

		/*
		 * Firefox 스크롤바 스타일링
		 * Firefox는 webkit 스타일을 지원하지 않으므로 별도 설정
		 */
		scrollbar-width: thin;
		scrollbar-color: #c1c1c1 #f1f1f1;
	}

	/**
	 * 기본 테이블 스타일
	 *
	 * border-collapse: separate를 사용하는 이유:
	 * - 셀 간격 제어가 가능
	 * - 모던한 디자인을 위한 둥근 모서리 적용 가능
	 * - 셀별 개별 스타일링이 용이
	 */
	.ui-table-default {
		width: 100%;
		border-collapse: separate;
		table-layout: fixed; /* 고정 테이블 레이아웃으로 성능 최적화 */

		/**
		 * 테두리가 있는 테이블 스타일
		 * bordered prop이 true일 때 적용
		 */
		&.ui-table-default--bordered {
			border: 1px solid #e0e0e0;

			th,
			td {
				border: 1px solid #e0e0e0;
			}
		}

		/**
		 * 선택 가능한 테이블 스타일
		 * selectable prop이 true일 때 적용
		 *
		 * 특징:
		 * - 행에 포인터 커서 적용
		 * - 부드러운 배경색 전환 효과
		 * - 선택된 행에 시각적 피드백 제공
		 */
		&.ui-table-default--selectable {
			tbody tr {
				cursor: pointer;
				transition: background-color 0.2s ease;

				&:hover {
					background-color: #f5f5f5;
				}

				&.selected-row {
					background-color: #e3f2fd; /* 선택된 행 강조 색상 */
				}
			}
		}

		/**
		 * 세로형 테이블 레이아웃
		 * vertical prop이 true일 때 적용
		 *
		 * 용도:
		 * - 모바일에서 가독성 향상
		 * - 상세 정보 표시 시 유용
		 * - 좁은 화면에서 테이블 구조 유지
		 */
		&.ui-table-default--vertical {
			border-collapse: collapse;

			th,
			td {
				display: block;
				width: 100%;
				text-align: left;

				&:first-child {
					font-weight: bold;
					background-color: #f8f9fa; /* 첫 번째 열 강조 */
				}
			}

			thead,
			tbody,
			tfoot {
				display: block;
			}

			tr {
				display: block;
				margin-bottom: 1rem;
				border: 1px solid #e0e0e0;
				border-radius: 4px; /* 카드 형태로 표시 */
			}
		}
	}

	/**
	 * 테이블 헤더 스타일
	 *
	 * 디자인 원칙:
	 * - 명확한 시각적 구분을 위한 배경색
	 * - 가독성을 위한 적절한 패딩
	 * - 텍스트 오버플로우 방지
	 */
	.ui-table-default__header {
		background-color: #f8f9fa; /* 연한 회색 배경 */

		th {
			padding: 12px 16px;
			font-weight: 600; /* 제목임을 강조 */
			text-align: left;
			color: #333;
			white-space: nowrap; /* 헤더 텍스트 줄바꿈 방지 */

			&:first-child {
				border-top-left-radius: 4px; /* 둥근 모서리 */
			}

			&:last-child {
				border-top-right-radius: 4px;
			}
		}
	}

	/**
	 * 테이블 바디 스타일
	 *
	 * 특징:
	 * - 데이터 가독성을 위한 적절한 패딩
	 * - 긴 텍스트 처리를 위한 옵션 제공
	 * - 행별 시각적 구분
	 */
	.ui-table-default__body {
		td {
			padding: 12px 16px;
			color: #666; /* 본문 텍스트 색상 */
			white-space: nowrap; /* 기본적으로 줄바꿈 방지 */

			/**
			 * 긴 텍스트가 있는 셀을 위한 래핑 클래스
			 * 필요에 따라 개별 셀에 적용
			 */
			&.wrap-text {
				white-space: normal;
				word-break: break-word; /* 단어 단위로 줄바꿈 */
			}
		}

		tr {
			/**
			 * 줄무늬 효과 (기본 적용)
			 * 짝수 행에 연한 배경색 적용
			 */
			&:nth-child(even) {
				background-color: #fafafa;
			}

			/**
			 * 호버 효과
			 * 마우스 오버 시 행 강조
			 */
			&:hover {
				background-color: #f0f0f0;
			}
		}
	}

	/**
	 * 테이블 푸터 스타일
	 *
	 * 용도:
	 * - 합계 정보 표시
	 * - 페이지네이션 컨트롤
	 * - 추가 액션 버튼
	 */
	.ui-table-default__footer {
		background-color: #f8f9fa;

		td {
			padding: 12px 16px;
			font-weight: 500; /* 일반 셀보다 약간 굵게 */
			color: #333;

			&:first-child {
				border-bottom-left-radius: 4px;
			}

			&:last-child {
				border-bottom-right-radius: 4px;
			}
		}
	}

	/**
	 * 로딩 상태 스타일
	 *
	 * 특징:
	 * - 사용자에게 명확한 로딩 상태 표시
	 * - 회전하는 스피너 애니메이션
	 * - 적절한 여백으로 시각적 여유 제공
	 */
	.ui-table-default__loading {
		td {
			padding: 40px 16px;
			text-align: center;
			color: #999;

			.loading-spinner {
				display: inline-flex;
				align-items: center;
				gap: 8px; /* 스피너와 텍스트 사이 간격 */

				/**
				 * CSS로 구현한 스피너 애니메이션
				 * JavaScript 없이 순수 CSS로 구현
				 */
				&::before {
					content: '';
					width: 16px;
					height: 16px;
					border: 2px solid #e0e0e0;
					border-top: 2px solid #007bff; /* 강조 색상 */
					border-radius: 50%;
					animation: spin 1s linear infinite;
				}
			}
		}
	}

	/**
	 * 빈 상태 스타일
	 *
	 * 사용자 경험 고려사항:
	 * - 명확한 안내 메시지
	 * - 충분한 여백으로 시각적 여유
	 * - 이탤릭체로 안내 성격 강조
	 */
	.ui-table-default__empty {
		td {
			padding: 40px 16px;
			text-align: center;
			color: #999;
			font-style: italic;
		}
	}

	/**
	 * 스피너 회전 애니메이션 정의
	 *
	 * 부드럽고 일정한 속도의 회전으로
	 * 사용자에게 진행 중임을 명확히 표시
	 */
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	/**
	 * 반응형 디자인 - 모바일 대응
	 *
	 * 768px 이하에서 적용되는 스타일:
	 * - 더 얇은 스크롤바로 터치 친화적 환경 제공
	 * - 작은 화면에 맞춘 패딩과 폰트 크기 조정
	 */
	@media (max-width: 768px) {
		.ui-table-wrapper-default {
			/* 모바일에서는 스크롤바를 더 얇게 */
			&::-webkit-scrollbar {
				height: 6px;
			}
		}

		.ui-table-default {
			th,
			td {
				padding: 8px 12px; /* 더 작은 패딩 */
				font-size: 14px; /* 더 작은 폰트 크기 */
			}
		}
	}
</style>
