<!-- UiRating.vue -->
<template>
  <div class="ui-rating" :class="{ 'ui-rating--readonly': readonly }">
    <button
      v-for="star in max"
      :key="star"
      type="button"
      :class="[
        'ui-rating__star',
        {
          'ui-rating__star--filled': star <= currentRating,
          'ui-rating__star--hover': star <= hoverRating && !readonly
        }
      ]"
      :disabled="readonly"
      :aria-label="`${star}점 평점`"
      @click="setRating(star)"
      @mouseenter="setHover(star)"
      @mouseleave="clearHover"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        />
      </svg>
    </button>

    <span v-if="showValue" class="ui-rating__value"> {{ currentRating }}/{{ max }} </span>
  </div>
</template>

<script setup>
  import { ref, computed, watch } from 'vue'

  const props = defineProps({
    modelValue: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 5,
      validator: value => value > 0
    },
    readonly: {
      type: Boolean,
      default: false
    },
    showValue: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    }
  })

  const emit = defineEmits(['update:modelValue', 'change'])

  const currentRating = ref(props.modelValue)
  const hoverRating = ref(0)

  const setRating = rating => {
    if (props.readonly) return

    currentRating.value = rating
    emit('update:modelValue', rating)
    emit('change', rating)
  }

  const setHover = rating => {
    if (props.readonly) return
    hoverRating.value = rating
  }

  const clearHover = () => {
    if (props.readonly) return
    hoverRating.value = 0
  }

  // v-model 동기화
  watch(
    () => props.modelValue,
    newValue => {
      currentRating.value = newValue
    }
  )
</script>

<style lang="scss" scoped>
  $primary-color: #00aaff;
  $warning-color: #ffa500;
  $gray-30: #ccc;
  $gray-50: #666;

  .ui-rating {
    display: inline-flex;
    align-items: center;
    gap: 2px;
  }

  .ui-rating__star {
    border: none;
    background: none;
    padding: 2px;
    cursor: pointer;
    color: $gray-30;
    transition: color 0.2s ease, transform 0.1s ease;
    border-radius: 2px;

    &:hover {
      transform: scale(1.1);
    }

    &:focus {
      outline: 2px solid $primary-color;
      outline-offset: 2px;
    }

    &--filled {
      color: $warning-color;
    }

    &--hover {
      color: $warning-color;
      transform: scale(1.1);
    }

    svg {
      display: block;
      width: 20px;
      height: 20px;
    }
  }

  .ui-rating--readonly {
    .ui-rating__star {
      cursor: default;

      &:hover {
        transform: none;
      }

      &:focus {
        outline: none;
      }
    }
  }

  .ui-rating__value {
    margin-left: 8px;
    font-size: 14px;
    color: $gray-50;
    font-weight: 500;
  }

  // 크기 변형
  .ui-rating--small {
    .ui-rating__star svg {
      width: 16px;
      height: 16px;
    }

    .ui-rating__value {
      font-size: 12px;
    }
  }

  .ui-rating--large {
    gap: 4px;

    .ui-rating__star {
      padding: 4px;

      svg {
        width: 24px;
        height: 24px;
      }
    }

    .ui-rating__value {
      font-size: 16px;
      margin-left: 12px;
    }
  }
</style>
