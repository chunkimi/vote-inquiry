<template>
  <div class="mb-4">
    <div class="mb-4"><PartySummary></PartySummary></div>
  </div>
  <div v-if="isDesktop" class="mb-4">
    <!-- 
    <h4 class="h4 mb-4">
      三屆內<span class="text-danger">全國</span>政黨得票數／得票率
    </h4>
    <PartyComparison></PartyComparison>
  </div>-->
  </div>
  <!--<div class="mb-4">
    <h4 class="h4 mb-4">
      本屆政黨版圖變動<span class="text-danger">縣市</span>
    </h4>
    <PartyShiftCard></PartyShiftCard>
  </div> -->
</template>
<script setup>
// import { computed } from 'vue'

import { useMediaQuery } from '@vueuse/core'
const isDesktop = useMediaQuery('(min-width: 767px)')

import PartySummary from '@/components/PastAnal/PartySummary.vue'

// import PartyComparison from '@/components/PastAnal/PartyComparison.vue'
// import PartyShiftCard from '@/components/PastAnal/PartyShiftCard.vue'

const props = defineProps({
  votesData: {
    type: Array,
    required: true,
  },
})
</script>
