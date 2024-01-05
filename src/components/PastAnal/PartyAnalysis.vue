<template>
  <div class="mb-4">
    <div class="mb-4">
      <PartySummary :origin-votes="originVotes"></PartySummary>
    </div>
  </div>
  <div v-if="isDesktop">
    <div class="mb-4">
      <PartyComparison :sum-votes="areaSumVotes"></PartyComparison>
    </div>
    <div class="mb-4">
      <PartyDomain
        :area-votes="voterTurnoutAreaData"
        v-if="curYear !== '2012'"
      ></PartyDomain>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'

import { storeToRefs } from 'pinia'
import { usePastVotesStore } from '@/stores/pastVotesStore.js'

import { filterSpecifyVotes, excludeTotalVotes } from '@/utils/votesAnal.js'

import PartySummary from '@/components/PastAnal/PartySummary.vue'
import PartyComparison from '@/components/PastAnal/PartyComparison.vue'
import PartyDomain from '@/components/PastAnal/PartyDomain.vue'

const isDesktop = useMediaQuery('(min-width: 767px)')
const { curYear } = storeToRefs(usePastVotesStore())

const props = defineProps({
  originVotes: {
    type: Array,
    required: true,
  },
  originAllVotes: {
    type: Object,
    required: true,
  },
})

const areaSumVotes = computed(() => {
  const { vote2020, vote2016, vote2012 } = props.originAllVotes
  return {
    vote2020: filterSpecifyVotes(vote2020, '行政區別', '總計'),
    vote2016: filterSpecifyVotes(vote2016, '行政區別', '總計'),
    vote2012: filterSpecifyVotes(vote2012, '行政區別', '總計'),
  }
})

const voterTurnoutAreaData = computed(() => {
  const { vote2020, vote2016, vote2012 } = props.originAllVotes
  return {
    vote2020: excludeTotalVotes(vote2020),
    vote2016: excludeTotalVotes(vote2016),
    vote2012: excludeTotalVotes(vote2012),
  }
})
</script>
