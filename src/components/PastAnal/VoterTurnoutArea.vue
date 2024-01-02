<template>
  <h4 class="h4 mb-4">歷屆各區域投票率變化</h4>
  <PastAnalBarChart
    :data="barChartData"
    id="area-voter-turnout"
  ></PastAnalBarChart>
</template>
<script setup>
import { computed } from 'vue'
import PastAnalBarChart from '@/components/chartPastAnal/PastAnalBarChart.vue'
const props = defineProps({
  areaVotes: {
    type: Object,
    required: true,
  },
})

const yearColor = {
  vote2020: '#75B798',
  vote2016: '#A3CFBB',
  vote2012: '#D1E7DD',
}

const barChartData = computed(() => {
  const votesKeys = Object.keys(props.areaVotes)
  const areaVoterTurnout = votesKeys.reduce((result, year) => {
    result[year] = props.areaVotes[year].map((entry) => ({
      行政區別: entry['行政區別'],
      投票率: entry['投票率'],
    }))
    return result
  }, {})
  const area = Array.from(
    new Set(
      Object.values(props.areaVotes).flatMap((votes) =>
        votes.map((vote) => vote.行政區別),
      ),
    ),
  )
  const datasets = []
  const sortVotesKeys = votesKeys
    .map((item) => item.replace('vote', ''))
    .sort((a, b) => parseFloat(a) - parseFloat(b))
  sortVotesKeys.forEach((item) => {
    const label = item
    const index = `vote${item}`
    const data = areaVoterTurnout[index].map((item) =>
      Number(item['投票率'].toFixed(2)),
    )
    const backgroundColor = yearColor[index]
    const result = {
      label,
      data,
      backgroundColor,
    }
    datasets.push(result)
  })

  return {
    labels: area,
    datasets,
  }
})
</script>
