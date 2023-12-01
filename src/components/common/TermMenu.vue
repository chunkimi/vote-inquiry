<template>
  <div
    class="btn-group"
    role="group"
    aria-label="Basic radio toggle button group"
  >
    <template v-for="year in electionYears" :key="year">
      <input
        type="radio"
        class="btn-check"
        autocomplete="off"
        :name="year"
        :id="year"
        :value="year"
        :class="{ active: year == selectedYear }"
        v-model="yearModal"
        @change="$emit('update:selected-Year', year)"
      />
      <label class="btn btn-outline-warning" :for="year">{{ year }}</label>
    </template>
  </div>
  <!-- <div>
    <ul class="list-unstyled d-flex justify-content-center">
      <li
        class="horizontalList__item"
        v-for="year in electionYears"
        :key="year"
        :class="{ checked: year === specifyYear }"
      >
        <span v-if="year === specifyYear"> {{ year }}</span>
        <span v-else @click.prevent="changeYear(year)"> {{ year }}</span>
      </li>
    </ul>
  </div> -->
</template>
<script setup>
import { ref, watch, toRefs } from 'vue'

const props = defineProps({
  electionYears: Array,
  selectedYear: String,
})
const { electionYears, selectedYear } = toRefs(props)
const emit = defineEmits(['update:selected-Year'])

const yearModal = ref(selectedYear.value)

watch(yearModal, (newValue) => {
  emit('update:selected-Year', newValue)
})

// import { toRefs } from 'vue'

// const props = defineProps({
//   electionYears: Array,
//   selectedYear: String,
// })
// const emit = defineEmits(['changeYear'])

// const { electionYears, selectedYear } = toRefs(props)
// const changeYear = (year) => emit('changeYear', year)
// console.log(selectedYear.value)
</script>
