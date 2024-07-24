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
      <p>投票數：{{ summary.totalVotes || '0,000' }} 票</p>
      <p>投票率：{{ summary.voterTurnout || '0.00' }}%</p>
      <p>有效票：{{ summary.validVotes || '0,000' }} 票</p>
      <p>無效票：{{ summary.invalidVotes || '0,000' }} 票</p>
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
    totalVotes: (currentSummary.value || {}).totalVotes.toLocaleString(),
    voterTurnout: (currentSummary.value || {}).voterTurnout.toFixed(2),
    validVotes: (currentSummary.value || {}).validVotes.toLocaleString(),
    invalidVotes: (currentSummary.value || {}).invalidVotes.toLocaleString(),
  }
})
</script>
