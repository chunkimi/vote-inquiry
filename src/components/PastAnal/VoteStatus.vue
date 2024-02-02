<template>
  <h4 class="h4 mb-8">
    <i class="bi bi-joystick me-2"></i>{{ curStatus }}投票情況
  </h4>
  <div v-if="curStatus === '全國'">
    <VoteMap :data="voteMapData"></VoteMap>
  </div>
  <div class="mx-auto" v-else>
    <PastAnalBarChart :data="barChartData" id="vote-status"></PastAnalBarChart>
  </div>
</template>
<script setup>
import { computed } from 'vue'

import VoteMap from '@/components/common/VoteMap.vue'
import PastAnalBarChart from '@/components/chartPastAnal/PastAnalBarChart.vue'
import party from '@/data/party.json'

const props = defineProps({
  originVotes: {
    type: Array,
    required: true,
  },
  curCandidates: {
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
})

const voteMapData = computed(() => {
  return (props.originVotes || []).map((row) => {
    const winner = Object.keys(row['候選人票數']).reduce((a, b) =>
      row['候選人票數'][a] > row['候選人票數'][b] ? a : b,
    )
    return {
      city: row[props.dataField],
      party: winner,
      count: row['候選人票數'][winner].toLocaleString(),
    }
  })
})

const barChartData = computed(() => {
  const votesData = (props.originVotes || []).filter(
    (item) => item[props.dataField] !== '總計',
  )
  const labels = votesData.map((d) =>
    d['村里別'] ? d['村里別'] : d[props.dataField],
  )
  const datasets = (props.curCandidates || []).map(({ party: partyName }) => {
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
