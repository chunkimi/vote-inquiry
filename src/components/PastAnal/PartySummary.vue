<template>
  <h4 class="h4 mb-4">政黨本屆{{ curStatus }}得票</h4>
  <div class="mb-4">
    <PartySummaryCard
      :origin-votes="originVotes"
      :affiliated-area="affiliatedArea"
      :data-field="dataField"
    ></PartySummaryCard>
  </div>
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

import { useMediaQuery } from '@vueuse/core'
import { calAreaVoteRate, excludeTotalVotes } from '@/utils/votesAnal.js'
import partyJson from '@/data/party.json'
import PartySummaryCard from '@/components/PastAnal/PartySummaryCard.vue'
import PastAnalHorizontalChart from '@/components/chartPastAnal/PastAnalHorizontalChart.vue'

const isDesktop = useMediaQuery('(min-width: 767px)')

const props = defineProps({
  originVotes: {
    type: Array,
    required: true,
  },
  curStatus: {
    type: String,
    required: true,
  },
  dataField: {
    type: String,
    required: true,
  },
  affiliatedArea: {
    type: String,
    required: true,
  },
})

const horizontalChartData = computed(() => {
  const eachAreaVotes = excludeTotalVotes(props.originVotes, props.dataField)
  const { party, originVoteRate } = calAreaVoteRate(
    eachAreaVotes,
    props.dataField,
  )
  const area = originVoteRate.map((item) => item[props.dataField])
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
