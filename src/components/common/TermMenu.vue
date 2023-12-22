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
      <template v-if="isLinkNav">
        <router-link
          :to="{ name: 'PastAnalysis', params: { year: year } }"
          class="btn btn-outline-warning"
          :class="{ active: year === yearModal }"
        >
          <input
            type="radio"
            class="btn-check"
            autocomplete="off"
            :name="year"
            :id="year"
            :value="year"
            v-model="yearModal"
          />
          <label :for="year">{{ year }}</label>
        </router-link>
      </template>
      <template v-else>
        <input
          type="radio"
          class="btn-check"
          autocomplete="off"
          :name="year"
          :id="year"
          :value="year"
          v-model="yearModal"
        />
        <label class="btn btn-outline-warning" :for="year">{{ year }}</label>
      </template>
    </template>
  </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
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
</script>
