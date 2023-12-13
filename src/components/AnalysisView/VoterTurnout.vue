<style lang="scss" scoped>
.analysis-pie-chart {
  width: 100%;
  max-width: 450px;
  max-height: 450px;
}

p:nth-child(odd) {
  margin-bottom: 8px;
}
</style>

<template>
  <section class="position-relative d-flex flex-column gap-8">
    <div
      class="d-grid gap-2 fw-bolder"
      :class="{
        'position-absolute': !isMobile,
        'order-1': isMobile,
      }"
    >
      <p>開票率：100.0%</p>
      <p>投票數：{{ summary['投票數'] || '0,000' }} 票</p>
      <p>投票率：{{ summary['投票率'] || '0.00' }}%</p>
      <p>有效票：{{ summary['有效票數'] || '0,000' }} 票</p>
      <p>無效票：{{ summary['無效票數'] || '0,000' }} 票</p>
    </div>
    <VoteMap
      v-if="!city && !district && !isMobile"
      class="d-none d-md-block"
      :data="voteMapData"
    />
    <PieChart
      v-else
      id="analysis"
      class="analysis-pie-chart mx-auto"
      :data="pieChartData"
      :legend-position="isMobile ? 'bottom' : 'right'"
    />
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCurrentElectionStore } from '@/stores/currentElectionStore'
import { useMediaQuery } from '@vueuse/core'
import PieChart from '@/components/chart/PieChart.vue'
import VoteMap from '@/components/common/VoteMap.vue'

const isMobile = useMediaQuery('(max-width: 767px)')

const currentElectionStore = useCurrentElectionStore()
const { city, district, voteMapData, pieChartData, currentSummary } =
  storeToRefs(currentElectionStore)

const summary = computed(() => {
  if (!currentSummary.value) return {}
  return {
    投票數: (currentSummary.value || {})['投票數'].toLocaleString(),
    投票率: (currentSummary.value || {})['投票率'].toFixed(2),
    有效票數: (currentSummary.value || {})['有效票數'].toLocaleString(),
    無效票數: (currentSummary.value || {})['無效票數'].toLocaleString(),
  }
})
</script>
