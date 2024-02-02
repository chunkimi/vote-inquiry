<template>
  <div class="mb-4">
    <div class="mb-4">
      <PartySummary
        :origin-votes="originVotes"
        :cur-status="curStatus"
        :data-field="dataField"
        :affiliated-area="affiliatedArea"
      ></PartySummary>
    </div>
  </div>
  <div v-if="isDesktop">
    <div class="mb-4">
      <!-- <PartyComparison :sum-votes="areaSumVotes"></PartyComparison> -->
    </div>
    <div class="mb-4">
      <!-- <PartyDomain
        :area-votes="voterTurnoutAreaData"
        v-if="curYear !== '2012'"
      ></PartyDomain> -->
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'

import { filterSpecifyVotes, excludeTotalVotes } from '@/utils/votesAnal.js'

import PartySummary from '@/components/PastAnal/PartySummary.vue'
import PartyComparison from '@/components/PastAnal/PartyComparison.vue'
import PartyDomain from '@/components/PastAnal/PartyDomain.vue'

const isDesktop = useMediaQuery('(min-width: 767px)')

const props = defineProps({
  originVotes: {
    type: Array,
    required: true,
  },
  originAllVotes: {
    type: Object,
    required: true,
  },
  curCandidates: {
    type: Array,
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
  curCity: {
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

// const areaSumVotes = computed(() => {
//   const { vote2020, vote2016, vote2012 } = props.originAllVotes
//   return {
//     vote2020: filterSpecifyVotes(vote2020, props.dataField, '總計'),
//     vote2016: filterSpecifyVotes(vote2016, props.dataField, '總計'),
//     vote2012: filterSpecifyVotes(vote2012, props.dataField, '總計'),
//   }
// })

// const voterTurnoutAreaData = computed(() => {
//   const { vote2020, vote2016, vote2012 } = props.originAllVotes
//   return {
//     vote2020: excludeTotalVotes(vote2020, props.dataField),
//     vote2016: excludeTotalVotes(vote2016, props.dataField),
//     vote2012: excludeTotalVotes(vote2012, props.dataField),
//   }
// })
</script>
