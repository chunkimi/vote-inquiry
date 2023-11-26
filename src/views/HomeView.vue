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
import { useMediaQuery } from '@vueuse/core'
import { useCollection, useDocument } from 'vuefire'
import { collectionRefs, documentRefs } from '@/plugins/firebase'
import PieChart from '@/components/chart/PieChart.vue'
import VoteMap from '@/components/common/VoteMap.vue'
import VoteCounting from '@/components/HomeView/VoteCounting.vue'
import IconLabel from '@/components/common/IconLabel.vue'
import candidate from '@/data/candidate.json'

const isMobile = useMediaQuery('(max-width: 768px)')

const { data } = useCollection(collectionRefs.countyRef)

const voteMapData = computed(() => {
  return (data.value || []).map((row) => {
    const winner = Object.keys(row['候選人票數']).reduce((a, b) =>
      row['候選人票數'][a] > row['候選人票數'][b] ? a : b,
    )

    return {
      city: row['行政區別'],
      party: winner,
      count: row['候選人票數'][winner].toLocaleString(),
    }
  })
})

const { data: elections } = useDocument(documentRefs.electionRef)
const currentElectionYear = computed(() => {
  return ((elections.value || {})['選舉年度'] || '').toString()
})

const pieChartData = computed(() => {
  const votes = (elections.value || {})['候選人票數'] || {}

  return {
    data: Object.values(votes),
    labels: Object.keys(votes),
  }
})

const summary = computed(() =>
  candidate
    .filter(
      ({ election_year, role }) =>
        election_year === currentElectionYear.value && role === 0,
    )
    .map(({ candidate_id, name, party, party_logo_url, avatar_url }) => {
      const count = elections.value['候選人票數'][party]
      const validVotes = elections.value['有效票數']
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
