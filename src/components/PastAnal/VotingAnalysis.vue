<template>
  <div class="mb-4">
    <h4 class="h4 mb-4">本屆<span class="text-danger">全國</span>投票摘要</h4>
    <VoteSummaryCard></VoteSummaryCard>
  </div>
  <div class="mb-4 d-none d-md-flex flex-md-column">
    <h4 class="h4 mb-4">近三屆全國投票率變化</h4>
    <VoterTurnout></VoterTurnout>
  </div>
  <div class="mb-4 d-none d-md-flex flex-md-column">
    <h4 class="h4 mb-4">近三屆各縣市投票率變化</h4>
    <VoteComparison></VoteComparison>
  </div>
</template>
<script setup>
import VoteSummaryCard from '@/components/PastAnal/VoteSummaryCard.vue'
import VoterTurnout from '@/components/PastAnal/VoterTurnout.vue'
import VoteComparison from '@/components/PastAnal/VoteComparison.vue'
</script>
