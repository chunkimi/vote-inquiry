<template>
  <div class="mb-4">
    <VoteSummary
      :data="summaryData"
      :cur-status="curStatus"
      :affiliated-area="affiliatedArea"
    ></VoteSummary>
  </div>
  <div v-if="isDesktop">
    <div class="mb-4">
      <VoterTurnout
        :sum-votes="areaSumVotes"
        :cur-status="curStatus"
        :cur-year="curYear"
      ></VoterTurnout>
    </div>
    <div class="mb-4">
      <VoterTurnoutArea
        :various-regions-votes="variousRegionsVotes"
        :cur-city="curCity"
        :cur-status="curStatus"
        :affiliated-area="affiliatedArea"
        :data-field="dataField"
      ></VoterTurnoutArea>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { excludeTotalVotes } from '@/utils/votesAnal.js'
import VoteSummary from '@/components/PastAnal/VoteSummary.vue'
import VoterTurnout from '@/components/PastAnal/VoterTurnout.vue'
import VoterTurnoutArea from '@/components/PastAnal/VoterTurnoutArea.vue'

const isDesktop = useMediaQuery('(min-width: 767px)')

const props = defineProps({
  originVotes: {
    type: Array,
    required: true,
  },
  areaSumVotes: {
    type: Object,
    required: true,
  },
  variousRegionsVotes: {
    type: Object,
    required: true,
  },
  curYear: {
    type: String,
    required: true,
  },
  curCity: {
    type: String,
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

const summaryData = computed(() => {
  const totalVoterTurnout = (props.areaSumVotes || {})['投票率']
  const sortVote = excludeTotalVotes(props.originVotes, props.dataField).sort(
    (a, b) => parseFloat(b['投票率']) - parseFloat(a['投票率']),
  )
  const highestArea = (sortVote[0] || {})[props.dataField]

  const lowestArea = (sortVote[sortVote.length - 1] || {})[props.dataField]

  return {
    totalVoterTurnout,
    highestArea,
    lowestArea,
  }
})
</script>
