<template>
  <h4 class="h4 mb-8">
    <i class="bi bi-pencil-fill me-2"></i>{{ curStatus }}選情概要
  </h4>
  <div class="container">
    <div class="d-md-flex justify-content-center align-items-md-end py-6 mb-8">
      <PastAnalPieChart
        id="past-election-summary"
        :data="pieData"
        class="mx-auto"
      ></PastAnalPieChart>
      <div class="ms-md-4">
        <div class="mb-4">
          <p class="fw-bold">選舉人數</p>
          <p>{{ commaNumber(votesData['選舉人數']) }}</p>
        </div>
        <div class="row mb-4">
          <div class="col-6">
            <p class="fw-bold">投票率</p>
            <p>{{ percentage(votesData['投票率']) }}</p>
          </div>
          <div class="col-6">
            <p class="fw-bold">投票數</p>
            <p>{{ commaNumber(votesData['投票數']) }}</p>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-6">
            <p class="fw-bold">有效票數</p>
            <p>{{ commaNumber(votesData['有效票數']) }}</p>
          </div>
          <div class="col-6">
            <p class="fw-bold">無效票數</p>
            <p>{{ commaNumber(votesData['無效票數']) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePastVotesStore } from '@/stores/pastVotesStore.js'
import { commaNumber, percentage } from '@/utils/base'
import { filterSpecifyVotes } from '@/utils/votesAnal.js'

import PastAnalPieChart from '../chartPastAnal/PastAnalPieChart.vue'

const { curStatus, dataField } = storeToRefs(usePastVotesStore())
const props = defineProps({
  originVotes: {
    type: Object,
    required: true,
  },
})

const votesData = computed(() => {
  const specifyAnalysisVotes = filterSpecifyVotes(
    props.originVotes,
    dataField.value,
    '總計',
  )
  const { 有效票數, 無效票數, 投票數, 選舉人數, 投票率 } =
    specifyAnalysisVotes || {}
  return { 有效票數, 無效票數, 投票數, 選舉人數, 投票率 }
})

const labelColor = {
  有效票數: '#fad961',
  無效票數: '#e5e9ec',
}

const pieData = computed(() => {
  const specifyAnalysisVotes = filterSpecifyVotes(
    props.originVotes,
    dataField.value,
    '總計',
  )
  const { 有效票數, 無效票數 } = specifyAnalysisVotes || {}
  return {
    votes: [有效票數, 無效票數],
    labels: Object.keys(labelColor),
    color: Object.keys(labelColor).map((label) => labelColor[label]),
  }
})
</script>
