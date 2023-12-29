<template>
  <div class="mb-4">
    <VoteSummary :view="statusData" :analyzedData="votesData"></VoteSummary>
  </div>
  <!-- <div class="mb-4 d-none d-md-gird">
    <h4 class="h4 mb-4">近三屆全國投票率變化</h4>
    <VoterTurnout></VoterTurnout>
  </div>
  <div class="mb-4 d-none d-md-gird">
    <h4 class="h4 mb-4">近三屆各縣市投票率變化</h4>
    <VoteComparison></VoteComparison>
  </div> -->
</template>
<script setup>
import VoteSummary from '@/components/PastAnal/VoteSummary.vue'
// import VoterTurnout from '@/components/PastAnal/VoterTurnout.vue'
// import VoteComparison from '@/components/PastAnal/VoteComparison.vue'

const props = defineProps({
  statusData: {
    type: String,
    required: true,
  },
  votesData: {
    type: Array,
    required: true,
  },
})
</script>
