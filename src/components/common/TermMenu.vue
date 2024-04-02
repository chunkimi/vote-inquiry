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
        v-model="yearModal"
        @change="redirectToPage(year)"
      />
      <label class="btn btn-outline-warning" :for="year">{{ year }}</label>
    </template>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const emit = defineEmits(['update:selectedYear'])

const props = defineProps({
  electionYears: {
    type: Array,
    required: true,
  },
  selectedYear: {
    type: String,
    required: true,
  },
  isLinkNav: {
    type: Boolean,
    required: true,
  },
})

const yearModal = computed({
  get() {
    return props.selectedYear
  },
  set(value) {
    emit('update:selectedYear', value)
  },
})

function redirectToPage(year) {
  if (props.isLinkNav) {
    router.push({ name: 'PastAnalysis', params: { year } })
  }
}
</script>
