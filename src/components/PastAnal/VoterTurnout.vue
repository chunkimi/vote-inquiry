<style scoped>
lh-1point75 {
  line-height: 1.75rem;
}
</style>
<template>
  <h4 class="h4 mb-4">{{ curStatus }}歷屆投票率變化</h4>
  <div class="row">
    <div class="col-md-7">
      <PastAnalLineChart
        id="voter-turnout"
        :data="lineData"
      ></PastAnalLineChart>
    </div>
    <div class="col-md-5">
      <!-- <p class="lh-1point75">
        本屆與{{ voterTurnoutComparison.benchmark }}投票率比較
      </p>
      <p class="h2" :class="voterTurnoutComparison.textStyle">
        {{ `${voterTurnoutComparison.text}${voterTurnoutComparison.num}%` }}
      </p> -->
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
</script>
