<template>
  <h4 class="h4 mb-8">
    <i class="bi bi-joystick me-2"></i>{{ curStatus }}投票情況
  </h4>
  <div v-if="curStatus === '全國'">
    <VoteMap :data="voteMapData"></VoteMap>
  </div>
  <div v-else>
    <PastAnalBarChart
      :data="barChartData"
      id="vote-status"
      class="mx-auto"
    ></PastAnalBarChart>
  </div>
</template>
<script setup>
import { computed } from 'vue'

import { storeToRefs } from 'pinia'
import { usePastElectionStore } from '@/stores/pastVotesStore.js'

import VoteMap from '@/components/common/VoteMap.vue'
import PastAnalBarChart from '@/components/chartPastAnal/PastAnalBarChart.vue'
import party from '@/data/party.json'

const { curCandidates, curStatus } = storeToRefs(usePastElectionStore())

const props = defineProps({
  votes: {
    type: Array,
    required: true,
  },
})

const voteMapData = computed(() => {
  return (props.votes || []).map((row) => {
    const winner = Object.keys(row['候選人票數']).reduce((a, b) =>
      row['候選人票數'][a] > row['候選人票數'][b] ? a : b,
    )
    return {
      city: row['行政區別'],
      party: winner,
      count: row['候選人票數'][winner].toLocaleString(),
    }
  })
})

// 目前先以全國資料跑圖表
const barChartData = computed(() => {
  const votesData = (props.votes || []).filter(
    (item) => item['行政區別'] !== '總計',
  )
  const labels = votesData.map((d) =>
    d['村里別'] ? d['村里別'] : d['行政區別'],
  )
  const datasets = (curCandidates.value || []).map(({ party: partyName }) => {
    return {
      label: partyName,
      data: votesData.map((d) => d['候選人票數'][partyName]),
      backgroundColor: party.colorMap[partyName],
    }
  })

  return {
    labels,
    datasets,
  }
})
</script>
