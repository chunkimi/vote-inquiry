<template>
  <h4 class="h4 mb-4">{{ curStatus }}歷屆各政黨得票數</h4>
  <PastAnalBarChart
    :data="barChartData"
    id="party-voter-turnout-all"
  ></PastAnalBarChart>
</template>
<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePastVotesStore } from '@/stores/pastVotesStore.js'
import party from '@/data/party.json'
import PastAnalBarChart from '@/components/chartPastAnal/PastAnalBarChart.vue'

const { curStatus, curCandidates } = storeToRefs(usePastVotesStore())

const props = defineProps({
  sumVotes: {
    type: Object,
    required: true,
  },
})

const barChartData = computed(() => {
  const votesKeys = Object.keys(props.sumVotes)
  const labels = (votesKeys || [])
    .map((item) => item.replace('vote', ''))
    .sort((a, b) => parseFloat(a) - parseFloat(b))
  const datasets = (curCandidates.value || []).map(({ party: partyName }) => {
    return {
      label: partyName,
      data: labels.map(
        (year) => props.sumVotes[`vote${year}`]['候選人票數'][partyName],
      ),
      backgroundColor: party.colorMap[partyName],
    }
  })
  return {
    labels,
    datasets,
  }
})
</script>
