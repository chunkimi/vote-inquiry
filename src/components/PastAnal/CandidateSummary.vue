<template>
  <h4 class="h4 mb-8">
    <i class="bi bi-person-raised-hand me-2"></i>候選人{{ curStatus }}得票情況
  </h4>
  <div class="mb-8">
    <div class="d-flex justify-content-center py-6 mb-8a">
      <PastAnalPieChart
        id="past-candidate-summary"
        :data="pieData"
      ></PastAnalPieChart>
    </div>
    <CandidateSummaryCard :data="candidateAnalData"></CandidateSummaryCard>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePastVotesStore } from '@/stores/pastVotesStore.js'
import { filterSpecifyVotes, getVoteRateMaxMix } from '@/utils/votesAnal.js'
import CandidateSummaryCard from '@/components/PastAnal/CandidateSummaryCard.vue'
import PastAnalPieChart from '../chartPastAnal/PastAnalPieChart.vue'

import party from '@/data/party.json'

const { curCandidates, curStatus } = storeToRefs(usePastVotesStore())

const props = defineProps({
  originVotes: {
    type: Array,
    required: true,
  },
})

const pieData = computed(() => {
  const specifyAnalysisVotes = filterSpecifyVotes(
    props.originVotes,
    '行政區別',
    '總計',
  )
  const { 候選人票數 } = specifyAnalysisVotes
  const rawData = Object.entries(候選人票數)
  return {
    votes: rawData.map(([label, value]) => value),
    labels: rawData.map(([label, value]) => label),
    color: rawData.map(([label, value]) => party.colorMap[label]),
  }
})

const candidateAnalData = computed(() => {
  const specifyAnalysisVotes = filterSpecifyVotes(
    props.originVotes,
    '行政區別',
    '總計',
  )
  const partyVoteRate = getVoteRateMaxMix(props.originVotes)
  const result = [...curCandidates.value].map((item) => {
    const voteNum = specifyAnalysisVotes['候選人票數'][item.party]
    const voterTurnout =
      ((voteNum / specifyAnalysisVotes['有效票數']) * 100).toFixed(2) + '%'
    const rateAnal = partyVoteRate[item.party]
    return {
      ...item,
      voteNum,
      voterTurnout,
      rateAnal,
    }
  })

  return result
})
</script>
