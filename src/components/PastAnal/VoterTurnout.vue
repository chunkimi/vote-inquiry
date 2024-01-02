<template>
  <h4 class="h4 mb-4">{{ curStatus }}歷屆投票率變化</h4>
  <div class="row">
    <div class="col-md-8">
      <PastAnalLineChart
        id="voter-turnout"
        :data="lineData"
      ></PastAnalLineChart>
    </div>
    <div class="col-md-4">
      <p class="mb-1">本屆與{{ SummaryText.benchmark }}投票率比較</p>
      <p class="h2" :class="`text-${SummaryText.textStyle}`">
        {{ `${SummaryText.text}${SummaryText.num}%` }}
      </p>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePastElectionStore } from '@/stores/pastVotesStore.js'
import PastAnalLineChart from '@/components/chartPastAnal/PastAnalLineChart.vue'

const { curStatus, curYear } = storeToRefs(usePastElectionStore())

const props = defineProps({
  originAreaVotes: {
    type: Object,
    required: true,
  },
})

const lineData = computed(() => {
  const labels = Object.keys(props.originAreaVotes)
  const data = Object.values(props.originAreaVotes).map((item) =>
    Number(item['投票率'].toFixed(2)),
  )
  return {
    labels,
    data,
  }
})

const SummaryText = computed(() => {
  const allYear = Object.keys(props.originAreaVotes)
    .map((str) => str.match(/\d+/)[0])
    .sort((a, b) => b - a)
  const curVoterTurnout =
    props.originAreaVotes[`vote${curYear.value}`]['投票率']
  const curVoterTurnoutIndex = allYear.indexOf(curYear.value)
  const isOldestYear =
    curVoterTurnoutIndex === allYear.length - 1 ? true : false
  const compYear = isOldestYear
    ? allYear[curVoterTurnoutIndex - 1]
    : allYear[curVoterTurnoutIndex + 1]
  const compVoterTurnout = props.originAreaVotes[`vote${compYear}`]['投票率']
  const isIncrease = curVoterTurnout > compVoterTurnout ? true : false

  const result = {
    benchmark: isOldestYear ? '下屆' : '上屆',
    text: isIncrease ? '成長' : '下降',
    textStyle: isIncrease ? 'success' : 'danger',
    num: isIncrease
      ? (parseFloat(curVoterTurnout) - parseFloat(compVoterTurnout)).toFixed(2)
      : (parseFloat(compVoterTurnout) - parseFloat(curVoterTurnout)).toFixed(2),
  }
  return result
})
</script>
