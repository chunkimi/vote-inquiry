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
    <CandidateAnalCard :data="candidateAnalData"></CandidateAnalCard>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePastElectionStore } from '@/stores/pastVotesStore.js'
import { filterSpecifyVotes, getVoteRateMaxMix } from '@/utils/votesAnal.js'
import CandidateAnalCard from '@/components/PastAnal/CandidateAnalCard.vue'
import PastAnalPieChart from '../chartPastAnal/PastAnalPieChart.vue'

import party from '@/data/party.json'

const { curCandidates, curStatus } = storeToRefs(usePastElectionStore())

const props = defineProps({
  votes: {
    type: Array,
    required: true,
  },
})

const pieData = computed(() => {
  const specifyAnalysisVotes = filterSpecifyVotes(
    props.votes,
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
    props.votes,
    '行政區別',
    '總計',
  )
  const partyVoteRate = getVoteRateMaxMix(props.votes)
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
