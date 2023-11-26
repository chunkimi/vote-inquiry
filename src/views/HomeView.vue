<template>
  <IconLabel text="開票地圖" icon="bi-geo-alt-fill" />
  <PieChart
    v-if="isMobile"
    id="home"
    class="d-block d-md-none"
    :data="pieChartData"
  />
  <VoteMap v-else class="d-none d-md-block" :data="voteMapData" />
  <IconLabel text="選票即時報" icon="bi-rss" />
  <div class="d-grid gap-4">
    <VoteCounting
      v-for="candidate in summary"
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
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCurrentElectionStore } from '@/stores/currentElectionStore'
import { useMediaQuery } from '@vueuse/core'
import PieChart from '@/components/chart/PieChart.vue'
import IconLabel from '@/components/common/IconLabel.vue'
import VoteMap from '@/components/common/VoteMap.vue'
import VoteCounting from '@/components/HomeView/VoteCounting.vue'
import candidate from '@/data/candidate.json'

const isMobile = useMediaQuery('(max-width: 767px)')

const { currentElectionYear, electionSummary, voteMapData, pieChartData } =
  storeToRefs(useCurrentElectionStore())

const summary = computed(() =>
  candidate
    .filter(
      ({ election_year, role }) =>
        election_year === currentElectionYear.value && role === 0,
    )
    .map(({ candidate_id, name, party, party_logo_url, avatar_url }) => {
      const count = electionSummary.value['候選人票數'][party]
      const validVotes = electionSummary.value['有效票數']
      const percentage = (count / validVotes) * 100
      return {
        id: candidate_id,
        name,
        party,
        partyLogo: new URL(`../${party_logo_url}`, import.meta.url).href,
        avatar: new URL(`../${avatar_url}`, import.meta.url).href,
        count: count.toLocaleString(),
        percentage: parseFloat(percentage.toFixed(2)),
      }
    }),
)
</script>
