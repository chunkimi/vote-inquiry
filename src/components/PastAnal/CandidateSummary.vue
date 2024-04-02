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
    <CandidateSummaryCard
      :data="candidateAnalData"
      :affiliated-area="affiliatedArea"
      :data-field="dataField"
    ></CandidateSummaryCard>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { filterSpecifyVotes, getVoteRateMaxMix } from '@/utils/votesAnal.js'
import CandidateSummaryCard from '@/components/PastAnal/CandidateSummaryCard.vue'
import PastAnalPieChart from '../chartPastAnal/PastAnalPieChart.vue'

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
  affiliatedArea: {
    type: String,
    required: true,
  },
})

const pieData = computed(() => {
  const specifyAnalysisVotes = filterSpecifyVotes(
    props.originVotes,
    props.dataField,
    '總計',
  )
  const { 候選人票數 } = specifyAnalysisVotes || {}
  const rawData = Object.entries(候選人票數 || {})
  return {
    votes: rawData.map(([, value]) => value),
    labels: rawData.map(([label]) => label),
    color: rawData.map(([label]) => party.colorMap[label]),
  }
})

const candidateAnalData = computed(() => {
  const specifyAnalysisVotes =
    filterSpecifyVotes(props.originVotes, props.dataField, '總計') || {}
  const partyVoteRate = getVoteRateMaxMix(props.originVotes, props.dataField)
  const result = [...props.curCandidates].map((item) => {
    const voteNum = (specifyAnalysisVotes['候選人票數'] || {})[item.party]
    const voterTurnout =
      ((voteNum / specifyAnalysisVotes['有效票數'] || 0) * 100).toFixed(2) + '%'
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
