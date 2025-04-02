<template>
  <div class="ui-multi-select" :class="{ 'is-open': isOpen }">
    <!-- 선택된 태그들 표시 영역 -->
    <div class="ui-multi-select__tags">
      <div class="ui-multi-select__tags-container" @click="toggleDropdown">
        <template v-if="selectedOptions.length > 0">
          <UiTag
            v-for="option in selectedOptions"
            :key="option.value"
            :text="option.label"
            :variant="tagVariant"
            size="small"
            closable
            @close="removeOption(option)"
          />
        </template>
        <div v-else class="ui-multi-select__placeholder">
          {{ placeholder }}
        </div>
      </div>
      <div class="ui-multi-select__dropdown-toggle"  @click="toggleDropdown">
        <Icon
          :name="isOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'"
          class="ui-multi-select__toggle-icon"
        />
      </div>
    </div>

    <!-- 드롭다운 메뉴 -->
    <div
      v-show="isOpen"
      class="ui-multi-select__dropdown"
      :class="{ 'ui-multi-select__dropdown--open': isOpen }"
    >
      <div
        v-for="option in options"
        :key="option.value"
        class="ui-multi-select__option"
        :class="{ 'ui-multi-select__option--selected': isSelected(option) }"
        @click.stop="toggleOption(option)"
      >
        <span class="ui-multi-select__checkbox">
          <input type="checkbox" :checked="isSelected(option)" @click.stop />
          <span class="ui-multi-select__checkmark"></span>
        </span>
        {{ option.label }}
      </div>
      <div v-if="options.length === 0" class="ui-multi-select__no-options">
        옵션이 없습니다
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
    // 각 옵션은 { value: 'value', label: '표시될 텍스트' } 형태
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: "선택하세요",
  },
  tagVariant: {
    type: String,
    default: "primary",
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const selectedValues = ref([...props.modelValue]);

// 선택된 옵션들을 계산
const selectedOptions = computed(() => {
  return props.options.filter((option) =>
    selectedValues.value.includes(option.value)
  );
});

// 옵션이 선택되었는지 확인
const isSelected = (option) => {
  return selectedValues.value.includes(option.value);
};

// 옵션 토글 (선택/해제)
const toggleOption = (option) => {
  const index = selectedValues.value.indexOf(option.value);
  if (index === -1) {
    // 선택되지 않은 경우 추가
    selectedValues.value.push(option.value);
  } else {
    // 이미 선택된 경우 제거
    selectedValues.value.splice(index, 1);
  }
  emit("update:modelValue", selectedValues.value);
};

// 옵션 제거
const removeOption = (option) => {
  const index = selectedValues.value.indexOf(option.value);
  if (index !== -1) {
    selectedValues.value.splice(index, 1);
    emit("update:modelValue", selectedValues.value);
  }
};

// 드롭다운 토글
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// 외부 클릭 시 드롭다운 닫기
const closeDropdown = (event) => {
  const multiSelect = event.target.closest(".ui-multi-select");
  if (!multiSelect) {
    isOpen.value = false;
  }
};

// 모델 값 변경 시 내부 상태 업데이트
watch(
  () => props.modelValue,
  (newValue) => {
    selectedValues.value = [...newValue];
  },
  { deep: true }
);

// 컴포넌트 마운트 시 이벤트 리스너 추가
onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

// 컴포넌트 언마운트 시 이벤트 리스너 제거
onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdown);
});
</script>

<style lang="scss" scoped>
@use "sass:color";

.ui-multi-select {
  position: relative;
  width: 100%;

  &__tags {
    display: flex;
    align-items: center;
    min-height: $ui-height-md;
    padding: 4px 8px;
    border: 1px solid $border-color;
    border-radius: 4px;
    background-color: #fff;
    gap: 4px;
    position: relative;

    &:hover {
      border-color: $primary-color;
    }
  }

  &__tags-container {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    gap: 4px;
    z-index: 20;
  }

  &__dropdown-toggle {
    cursor: pointer;
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__placeholder {
    color: #999;
    padding: 4px 0;
    cursor: pointer;
  }

  &__toggle-icon{
    transition: transform 0.2s ease;
    margin-left: auto;
  }
  
  &.is-open &__toggle-icon {
    transform: rotate(180deg);
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    background-color: #fff;
    border: 1px solid $border-color;
    border-radius: 4px;
    margin-top: 4px;
    z-index: 5;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: none;
    z-index: 100;
    &--open {
      display: block;
    }
  }

  &__option {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    cursor: pointer;

    &:hover {
      background-color: rgba($primary-color, 0.05);
    }

    &--selected {
      background-color: rgba($primary-color, 0.1);
      font-weight: 500;
    }
  }

  &__checkbox {
    position: relative;
    display: inline-flex;
    align-items: center;
    margin-right: 8px;

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    .ui-multi-select__checkmark {
      position: relative;
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 1px solid $border-color;
      border-radius: 2px;
      background-color: #fff;

      &:after {
        content: "";
        position: absolute;
        display: none;
        left: 5px;
        top: 2px;
        width: 4px;
        height: 8px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }

    input:checked ~ .ui-multi-select__checkmark {
      background-color: $primary-color;
      border-color: $primary-color;

      &:after {
        display: block;
      }
    }
  }

  &__no-options {
    padding: 12px;
    text-align: center;
    color: #999;
  }
}
</style>
