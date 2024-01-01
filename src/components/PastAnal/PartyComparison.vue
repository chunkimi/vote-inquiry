<template>
  <h4 class="h4 mb-4">歷屆{{ curStatus }}政黨得票數／得票率</h4>
  <div>
    <p>比較長條圖</p>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { usePastElectionStore } from '@/stores/pastVotesStore.js'

const { curStatus } = storeToRefs(usePastElectionStore())
</script>
