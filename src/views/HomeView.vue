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
      :party-id="candidate.party_id"
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

<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCurrentElectionStore } from '@/stores/currentElectionStore'
import { useMediaQuery, useFetch } from '@vueuse/core'
import PieChart from '@/components/chart/PieChart.vue'
import IconLabel from '@/components/common/IconLabel.vue'
import VoteMap from '@/components/common/VoteMap.vue'
import VoteCounting from '@/components/HomeView/VoteCounting.vue'
import type { VoteData } from '@/types'

const isMobile = useMediaQuery('(max-width: 767px)')

const { currentCandidates, electionSummary, votes, voteMapData, pieChartData } =
  storeToRefs(useCurrentElectionStore())

const path = computed(
  () => new URL(`../data/votes/2020/all.json`, import.meta.url).href,
)
const { data, onFetchResponse } = useFetch(path).get().json<VoteData[]>()

onFetchResponse(() => {
  if (data.value) {
    electionSummary.value = data.value[0]
    votes.value = data.value.slice(1)
  }
})

const summary = computed(() =>
  currentCandidates.value.map(
    ({ candidate_id, name, party, party_id, avatar_url }) => {
      const count = electionSummary.value?.candidateVotes[party_id] || 0
      const validVotes = electionSummary.value?.validVotes || 0
      const percentage = (count / validVotes) * 100

      return {
        id: candidate_id,
        name,
        party,
        party_id,
        avatar: new URL(`../${avatar_url}`, import.meta.url).href,
        count: count.toLocaleString(),
        percentage: parseFloat(percentage.toFixed(2)),
      }
    },
  ),
)
</script>
