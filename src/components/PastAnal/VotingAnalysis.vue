<template>
  <div class="mb-4">
    <VoteSummary :analyzedData="summaryData"></VoteSummary>
  </div>
  <div v-if="isDesktop">
    <!-- <div class="mb-4 d-none d-md-gird">
    <h4 class="h4 mb-4">近三屆全國投票率變化</h4>
    <VoterTurnout></VoterTurnout>
  </div>
  <div class="mb-4 d-none d-md-gird">
    <h4 class="h4 mb-4">近三屆各縣市投票率變化</h4>
    <VoteComparison></VoteComparison>
  </div> -->
  </div>
</template>
<script setup>
import { computed } from 'vue'
import VoteSummary from '@/components/PastAnal/VoteSummary.vue'
import { filterSpecifyVotes, excludeTotalVotes } from '@/utils/votesAnal.js'

// import VoterTurnout from '@/components/PastAnal/VoterTurnout.vue'
// import VoteComparison from '@/components/PastAnal/VoteComparison.vue'
import { useMediaQuery } from '@vueuse/core'
const isDesktop = useMediaQuery('(min-width: 767px)')

const props = defineProps({
  votesData: {
    type: Array,
    required: true,
  },
})

const summaryData = computed(() => {
  const totalVoterTurnout = filterSpecifyVotes(
    props.votesData,
    '行政區別',
    '總計',
  )['投票率']
  const sortVote = excludeTotalVotes(props.votesData).sort(
    (a, b) => parseFloat(b['投票率']) - parseFloat(a['投票率']),
  )
  const hight = sortVote[0]['行政區別']

  const lowest = sortVote[sortVote.length - 1]['行政區別']

  return {
    totalVoterTurnout,
    hight,
    lowest,
  }
})
</script>
