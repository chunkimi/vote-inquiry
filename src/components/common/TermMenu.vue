<style lang="scss">
@import '@/styles/main.scss';

.horizontalList {
  &__item {
    padding: 10px 16px;
    font-size: 1rem;
    font-weight: 500;
    color: $warning;
    cursor: pointer;
    border: 1px solid $warning;
    &:first-child {
      border-right: none;
      border-radius: 4px 0px 0px 4px;
    }
    &:last-child {
      border-left: none;
      border-radius: 0px 4px 4px 0px;
    }
    &:hover,
    &:active,
    &.active {
      color: $white;
      background-color: $warning;
    }
  }
}
</style>

<template>
  <div>
    <ul class="list-unstyled d-flex justify-content-center">
      <li
        class="horizontalList__item"
        v-for="year in electionYears"
        :key="year"
        :class="{ active: year === specifyYear }"
      >
        <span v-if="year === specifyYear"> {{ year }}</span>
        <span v-else @click.prevent="changeYear(year)"> {{ year }}</span>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { toRefs } from 'vue'

const props = defineProps({
  electionYears: Array,
  specifyYear: String,
})
const emit = defineEmits(['changeYear'])

const { electionYears, specifyYear } = toRefs(props)
const changeYear = (year) => emit('changeYear', year)
</script>
