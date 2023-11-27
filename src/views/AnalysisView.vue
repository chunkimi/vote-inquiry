<template>
  <IconLabel text="大家的選票投給誰？" icon="bi-search" />
  <SearchBar
    :year="currentElectionYear"
    v-model:city="city"
    v-model:district="district"
  />
  <template v-if="isMobile">
    <IconLabel text="戰況速報" icon="bi-bar-chart-line-fill" />
    <CityMenu />
  </template>
  <IconLabel :text="summaryLevel" icon="vote-stamp" source="中選會" />
  <VoterTurnout />
  <template v-if="!isMobile">
    <IconLabel :text="breakdownLevel" icon="vote-stamp" source="中選會" />
    <BarChart
      :labels="barChartLabels"
      :data="barChartData"
      id="戰況"
      class="mx-auto"
    />
  </template>

  <VoteBreakdown :votes="votes" />
</template>

<script setup>
import { computed, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useCurrentElectionStore } from '@/stores/currentElectionStore'
import { useMediaQuery } from '@vueuse/core'
import BarChart from '@/components/chart/BarChart.vue'
import CityMenu from '@/components/AnalysisView/CityMenu.vue'
import VoteBreakdown from '@/components/AnalysisView/VoteBreakdown.vue'
import VoterTurnout from '@/components/AnalysisView/VoterTurnout.vue'
import IconLabel from '@/components/common/IconLabel.vue'
import SearchBar from '@/components/common/SearchBar.vue'

const isMobile = useMediaQuery('(max-width: 767px)')

const currentElectionStore = useCurrentElectionStore()
const {
  currentElectionYear,
  city,
  district,
  barChartLabels,
  barChartData,
  votes,
} = storeToRefs(currentElectionStore)

const summaryLevel = computed(() => {
  const suffix = '選民的票投給誰？'
  if (city.value && district.value)
    return `${city.value}・${district.value}${suffix}`
  if (city.value) return city.value + suffix
  return '全台' + suffix
})

const breakdownLevel = computed(() => {
  if (city.value && district.value)
    return `${city.value}・${district.value}各村里戰況`
  if (city.value) return `${city.value}各區戰況`
  return '縣市戰況'
})

onBeforeUnmount(() => {
  currentElectionStore.reset()
})
</script>
