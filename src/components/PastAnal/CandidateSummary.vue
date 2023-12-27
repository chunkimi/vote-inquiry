<template>
  <div class="mb-8">
    <div class="d-flex justify-content-center py-6 mb-8a">
      <PastAnalPie id="past-candidate-summary" :data="pieData"></PastAnalPie>
    </div>
    <CandidateAnalCard></CandidateAnalCard>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import CandidateAnalCard from '@/components/PastAnal/CandidateAnalCard.vue'

import PastAnalPie from '../chartPastAnal/PastAnalPie.vue'

import party from '@/data/party.json'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const pieData = computed(() => {
  const rawData = Object.entries(props.data)
  return {
    votes: rawData.map(([label, value]) => value),
    labels: rawData.map(([label, value]) => label),
    color: rawData.map(([label, value]) => party.colorMap[label]),
  }
})
</script>
