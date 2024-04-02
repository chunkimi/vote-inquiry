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
      <PartyComparison
        :sum-votes="areaSumVotes"
        :cur-candidates="curCandidates"
        :cur-status="curStatus"
      ></PartyComparison>
    </div>
    <div class="mb-4">
      <PartyDomain
        v-if="curYear !== '2012'"
        :various-regions-votes="variousRegionsVotes"
        :cur-year="curYear"
        :cur-city="curCity"
        :cur-status="curStatus"
        :affiliated-area="affiliatedArea"
        :data-field="dataField"
      ></PartyDomain>
    </div>
  </div>
</template>
<script setup>
import { useMediaQuery } from '@vueuse/core'

import PartySummary from '@/components/PastAnal/PartySummary.vue'
import PartyComparison from '@/components/PastAnal/PartyComparison.vue'
import PartyDomain from '@/components/PastAnal/PartyDomain.vue'

const isDesktop = useMediaQuery('(min-width: 767px)')

defineProps({
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
  curDistrict: {
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
</script>
