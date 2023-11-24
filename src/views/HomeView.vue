<template>
  <IconLabel text="開票地圖" icon="bi-geo-alt-fill" />
  <PieChart
    v-if="isMobile"
    id="home-national"
    class="d-block d-md-none"
    :data="pieChartData"
  />
  <VoteMap v-else class="d-none d-md-block" :data="voteMapData" />
  <IconLabel text="選票即時報" icon="bi-rss" />
  <div class="d-grid gap-4">
    <RealtimeVoteCounting
      v-for="candidate in realtimeSummary"
      :key="candidate.id"
      :id="candidate.id"
      :name="candidate.name"
      :party="candidate.party"
      :partyLogo="candidate.partyLogo"
      :avatar="candidate.avatar"
      :count="candidate.count"
      :percentage="candidate.percentage"
    />
  </div>
  <router-link
    class="btn btn-outline-primary d-block d-md-none"
    role="button"
    :to="{ name: 'Analysis' }"
  >
    查看縣市選情版圖 》
  </router-link>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMedia } from '@vueuse/core'
import PieChart from '@/components/chart/PieChart.vue'
import VoteMap from '@/components/common/VoteMap.vue'
import RealtimeVoteCounting from '@/components/HomeView/RealtimeVoteCounting.vue'
import IconLabel from '@/components/common/IconLabel.vue'
import candidate from '@/data/candidate.json'

const isMobile = useMedia('(max-width: 768px)')

const currentElectionYear = '2020'

const realtimeSummary = computed(() =>
  candidate
    .filter(
      ({ election_year, role }) =>
        election_year === currentElectionYear && role === 0,
    )
    .map(({ candidate_id, name, party, party_logo_url, avatar_url }) => {
      const count = 123456
      return {
        id: candidate_id,
        name,
        party,
        partyLogo: new URL(`../${party_logo_url}`, import.meta.url).href,
        avatar: new URL(`../${avatar_url}`, import.meta.url).href,
        count: count.toLocaleString(),
        percentage: 40,
      }
    }),
)

const voteData = [
  { city: '臺北市', party: '金色曠野同盟', count: 213 },
  { city: '新北市', party: '金色曠野同盟', count: 123 },
  { city: '南投縣', party: '鬱蔥雨林聯盟', count: 1233 },
  { city: '嘉義縣', party: '鬱蔥雨林聯盟', count: 12334 },
  { city: '彰化縣', party: '蔚藍海岸陣線', count: 1233 },
]

const voteMapData = computed(() => {
  return voteData.map(({ city, party, count }) => ({
    city,
    party,
    count: count.toLocaleString(),
  }))
})

const pieChartData = ref({
  data: [213, 123, 1233],
  labels: ['金色曠野同盟', '鬱蔥雨林聯盟', '蔚藍海岸陣線'],
})
</script>
