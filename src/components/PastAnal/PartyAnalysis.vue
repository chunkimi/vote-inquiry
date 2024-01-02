<template>
  <div class="mb-4">
    <div class="mb-4">
      <PartySummary :origin-votes="originVotes"></PartySummary>
    </div>
  </div>
  <div v-if="isDesktop">
    <div class="mb-4"><PartyComparison></PartyComparison></div>
    <div class="mb-4">
      <PartyDomain></PartyDomain>
    </div>
  </div>
</template>
<script setup>
import { useMediaQuery } from '@vueuse/core'
const isDesktop = useMediaQuery('(min-width: 767px)')

import PartySummary from '@/components/PastAnal/PartySummary.vue'

import PartyComparison from '@/components/PastAnal/PartyComparison.vue'
import PartyDomain from '@/components/PastAnal/PartyDomain.vue'

const props = defineProps({
  originVotes: {
    type: Array,
    required: true,
  },
})
</script>
