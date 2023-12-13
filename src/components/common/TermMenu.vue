<style lang="scss" scoped>
.btn-outline-warning {
  --bs-btn-active-color: #fff;
}
</style>

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
</template>
<script setup>
import { ref, toRefs, watch } from 'vue'

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
</script>
