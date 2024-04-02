<template>
  <h4 class="h4 mb-4">{{ curStatus }}歷屆投票率變化</h4>
  <div class="row">
    <div class="col-md-8">
      <PastAnalLineChart
        id="voter-turnout"
        :data="lineData"
      ></PastAnalLineChart>
    </div>
    <div class="col-md-4" v-if="notEarliestYear">
      <p class="mb-1">本屆與{{ SummaryText.benchmark }}投票率比較</p>
      <p class="h2" :class="`text-${SummaryText.textStyle}`">
        {{ `${SummaryText.text}${SummaryText.num}%` }}
      </p>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import PastAnalLineChart from '@/components/chartPastAnal/PastAnalLineChart.vue'

const props = defineProps({
  sumVotes: {
    type: Object,
    required: true,
  },
  curStatus: {
    type: String,
    required: true,
  },
  curYear: {
    type: String,
    required: true,
  },
})

const notEarliestYear = computed(() => props.curYear !== '2012')

const lineData = computed(() => {
  const labels = Object.keys(props.sumVotes)
  const data = Object.values(props.sumVotes).map((item) =>
    Number(((item || {})['投票率'] || 0).toFixed(2)),
  )
  return {
    labels,
    data,
  }
})

const SummaryText = computed(() => {
  const allYear = Object.keys(props.sumVotes)
    .map((str) => str.match(/\d+/)[0])
    .sort((a, b) => b - a)

  const curVoterTurnoutIndex = allYear.indexOf(props.curYear)
  const isOldestYear =
    curVoterTurnoutIndex === allYear.length - 1 ? true : false
  const compYear = isOldestYear
    ? allYear[curVoterTurnoutIndex - 1]
    : allYear[curVoterTurnoutIndex + 1]
  const curVoterTurnout = (props.sumVotes[`vote${props.curYear}`] || {})[
    '投票率'
  ]
  const compVoterTurnout = props.sumVotes[`vote${compYear}`]['投票率']
  const isIncrease = curVoterTurnout > compVoterTurnout ? true : false
  let text = ''
  let textStyle = ''
  if (!isOldestYear) {
    text = isIncrease ? '成長' : '下降'
    textStyle = isIncrease ? 'success' : 'danger'
  }

  const result = {
    benchmark: '上屆',
    text,
    textStyle,
    num: isIncrease
      ? (parseFloat(curVoterTurnout) - parseFloat(compVoterTurnout)).toFixed(2)
      : (parseFloat(compVoterTurnout) - parseFloat(curVoterTurnout)).toFixed(2),
  }
  return result
})
</script>
