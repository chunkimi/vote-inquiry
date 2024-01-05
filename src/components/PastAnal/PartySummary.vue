<style lang="scss">
@import '@/styles/main.scss';
</style>
<template>
  <h4 class="h4 mb-4">政黨本屆{{ curStatus }}得票</h4>
  <PartySummaryCard class="mb-4" :origin-votes="originVotes"></PartySummaryCard>
  <div class="mb-4">
    <PastAnalHorizontalChart
      v-if="isDesktop"
      id="past-party-summary"
      :data="horizontalChartData"
    ></PastAnalHorizontalChart>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePastVotesStore } from '@/stores/pastVotesStore.js'
import { useMediaQuery } from '@vueuse/core'
import { calAreaVoteRate, excludeTotalVotes } from '@/utils/votesAnal.js'
import partyJson from '@/data/party.json'
import PartySummaryCard from '@/components/PastAnal/PartySummaryCard.vue'
import PastAnalHorizontalChart from '@/components/chartPastAnal/PastAnalHorizontalChart.vue'

const isDesktop = useMediaQuery('(min-width: 767px)')
const { curStatus } = storeToRefs(usePastVotesStore())

const props = defineProps({
  originVotes: {
    type: Array,
    required: true,
  },
})
const horizontalChartData = computed(() => {
  const { party, originVoteRate } = calAreaVoteRate(
    excludeTotalVotes(props.originVotes),
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
