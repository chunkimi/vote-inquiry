<template>
  <div class="mb-4">
    <VoteSummary :data="summaryData"></VoteSummary>
  </div>
  <div v-if="isDesktop">
    <div class="mb-4">
      <VoterTurnout :origin-area-votes="originAreaVotes"></VoterTurnout>
    </div>
    <div class="mb-4">
      <VoteComparison></VoteComparison>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { filterSpecifyVotes, excludeTotalVotes } from '@/utils/votesAnal.js'
import VoteSummary from '@/components/PastAnal/VoteSummary.vue'
import VoterTurnout from '@/components/PastAnal/VoterTurnout.vue'
import VoteComparison from '@/components/PastAnal/VoteComparison.vue'

const isDesktop = useMediaQuery('(min-width: 767px)')

const props = defineProps({
  originVotes: {
    type: Array,
    required: true,
  },
  originAreaVotes: {
    type: Object,
    required: Array,
  },
})

const summaryData = computed(() => {
  const totalVoterTurnout = filterSpecifyVotes(
    props.originVotes,
    '行政區別',
    '總計',
  )['投票率']
  const sortVote = excludeTotalVotes(props.originVotes).sort(
    (a, b) => parseFloat(b['投票率']) - parseFloat(a['投票率']),
  )
  const highestArea = sortVote[0]['行政區別']

  const lowestArea = sortVote[sortVote.length - 1]['行政區別']

  return {
    totalVoterTurnout,
    highestArea,
    lowestArea,
  }
})
</script>
