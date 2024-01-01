<style lang="scss">
@import '@/styles/main.scss';
</style>
<template>
  <h4 class="h4 mb-4">本屆政黨{{ curStatus }}得票</h4>
  <PartySummaryCard class="mb-4" :votes="votes"></PartySummaryCard>
  <PastAnalHorizontalChart
    v-if="isDesktop"
    id="past-party-summary"
    :data="horizontalChartData"
    class="mb-4"
  ></PastAnalHorizontalChart>
</template>
<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePastElectionStore } from '@/stores/pastVotesStore.js'
import { useMediaQuery } from '@vueuse/core'
import { calAreaVoteRate, excludeTotalVotes } from '@/utils/votesAnal.js'
import partyJson from '@/data/party.json'
import PartySummaryCard from '@/components/PastAnal/PartySummaryCard.vue'
import PastAnalHorizontalChart from '@/components/chartPastAnal/PastAnalHorizontalChart.vue'

const isDesktop = useMediaQuery('(min-width: 767px)')
const { curStatus } = storeToRefs(usePastElectionStore())

const props = defineProps({
  votes: {
    type: Array,
    required: true,
  },
})

const horizontalChartData = computed(() => {
  const { party, originVoteRate } = calAreaVoteRate(
    excludeTotalVotes(props.votes),
  )
  const area = originVoteRate.map((item) => item['行政區別'])
  const newData = []
  party.forEach((partyName) => {
    const result = {}
    result.label = partyName
    result.backgroundColor = partyJson.colorMap[partyName]
    const votesRate = originVoteRate.map((item) => Number(item[partyName]))
    result.data = votesRate
    newData.push(result)
  })
  newData.sort((a, b) => parseFloat(b.data[0]) - parseFloat(a.data[0]))
  return {
    labels: area,
    datasets: newData,
  }
})
</script>
