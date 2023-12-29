<template>
  <h4 class="h4 mb-8">
    <i class="bi bi-person-raised-hand me-2"></i>候選人情況
  </h4>
  <div class="mb-8">
    <div class="d-flex justify-content-center py-6 mb-8a">
      <PastAnalPie id="past-candidate-summary" :data="pieData"></PastAnalPie>
    </div>
    <CandidateAnalCard :data="candidateAnalData"></CandidateAnalCard>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { filterSpecifyVotes } from '@/utils/votesAnal.js'
import CandidateAnalCard from '@/components/PastAnal/CandidateAnalCard.vue'
import PastAnalPie from '../chartPastAnal/PastAnalPie.vue'

import party from '@/data/party.json'

const props = defineProps({
  vote: {
    type: Array,
    required: true,
  },
  candidate: {
    type: Array,
    required: true,
  },
})

const pieData = computed(() => {
  const totalVotes = filterSpecifyVotes(props.vote, '行政區別', '總計')
  const { 候選人票數 } = totalVotes
  const rawData = Object.entries(候選人票數)
  return {
    votes: rawData.map(([label, value]) => value),
    labels: rawData.map(([label, value]) => label),
    color: rawData.map(([label, value]) => party.colorMap[label]),
  }
})

const candidateAnalData = computed(() => {
  const totalVotes = filterSpecifyVotes(props.vote, '行政區別', '總計')
  const partyVoteRate = getVoteRateMaxMix(props.vote)
  const result = [...props.candidate].map((item) => {
    const voteNum = totalVotes['候選人票數'][item.party]
    const voteRate = ((voteNum / totalVotes['有效票數']) * 100).toFixed(2) + '%'
    const rateAnal = partyVoteRate[item.party]
    return {
      ...item,
      voteNum,
      voteRate,
      rateAnal,
    }
  })

  return result
})

function getVoteRateMaxMix(voteData) {
  const party = Object.keys(voteData[0]['候選人票數'])
  const originVoteRate = voteData.map((item) => {
    const { 候選人票數, 有效票數, 行政區別 } = item
    const totalVoteRate = { 行政區別 }

    Object.entries(候選人票數).forEach(([key, value]) => {
      totalVoteRate[key] = ((value / 有效票數) * 100).toFixed(4)
    })

    return totalVoteRate
  })

  const PartyVoteRate = {}
  party.forEach((partyName) => {
    const partyData = originVoteRate
      .filter((item) => item['行政區別'] !== '總計')
      .map((item) => ({
        行政區別: item['行政區別'],
        得票率: item[partyName],
      }))

    partyData.sort((a, b) => parseFloat(b.得票率) - parseFloat(a.得票率))
    PartyVoteRate[partyName] = {
      cityHighest: partyData[0],
      cityLowest: partyData[partyData.length - 1],
    }
  })

  return PartyVoteRate
}
</script>
