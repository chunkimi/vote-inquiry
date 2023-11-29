<template>
  <div class="mb-4">
    <h4 class="h4 mb-4">
      本屆政黨<span class="text-danger">全國各縣市</span>得票
    </h4>
    <div class="mb-4"><PartyInfoCard></PartyInfoCard></div>
    <PartyTurnout></PartyTurnout>
  </div>
  <div class="mb-4 d-none d-md-flex flex-md-column">
    <h4 class="h4 mb-4">
      近三屆<span class="text-danger">全國</span>政黨得票數／得票率
    </h4>
    <PartyComparison></PartyComparison>
  </div>
  <div class="mb-4">
    <h4 class="h4 mb-4">
      本屆政黨版圖變動<span class="text-danger">縣市</span>
    </h4>
    <PartyShiftCard></PartyShiftCard>
  </div>
</template>
<script setup>
import PartyInfoCard from '@/components/PastAnal/PartyInfoCard.vue'
import PartyTurnout from '@/components/PastAnal/PartyTurnout.vue'
import PartyComparison from '@/components/PastAnal/PartyComparison.vue'
import PartyShiftCard from '@/components/PastAnal/PartyShiftCard.vue'
</script>
