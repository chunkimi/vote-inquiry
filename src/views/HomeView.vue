<template>
  <IconLabel text="開票地圖" icon="bi-geo-alt-fill" />
  <VoteMap :data="voteMapData" />
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
</template>

<script setup>
import { ref, computed } from 'vue'
// import { useFirebaseStorage, useStorageFile } from 'vuefire'
// import { ref as storageRef } from 'firebase/storage'
// import { useFetch } from '@vueuse/core'
import VoteMap from '@/components/common/VoteMap.vue'
import RealtimeVoteCounting from '@/components/HomeView/RealtimeVoteCounting.vue'
import IconLabel from '@/components/common/IconLabel.vue'
import candidate from '@/data/candidate.json'

const currentElectionYear = '2020'

const realtimeSummary = computed(() =>
  candidate
    .filter(
      ({ election_year, role }) =>
        election_year === currentElectionYear && role === 0,
    )
    .map(({ candidate_id, name, party, party_logo_url, avatar_url }) => {
      return {
        id: candidate_id,
        name,
        party,
        partyLogo: new URL(`../${party_logo_url}`, import.meta.url).href,
        avatar: new URL(`../${avatar_url}`, import.meta.url).href,
        count: 123456,
        percentage: 10,
      }
    }),
)

// const storage = useFirebaseStorage()
// const candidateFileRef = storageRef(storage, 'candidate/candidate.json')

// const { url: candidate_url } = useStorageFile(candidateFileRef)

// const { data } = useFetch(candidate_url, { refetch: true }).get().json()
// const candidateList = computed(() =>
//   (data.value || []).filter(({ election_year }) => election_year === '2020'),
// )

const voteMapData = ref([
  { city: '臺北市', party: '金色曠野同盟', count: 213 },
  { city: '新北市', party: '金色曠野同盟', count: 123 },
  { city: '南投縣', party: '鬱蔥雨林聯盟', count: 1233 },
  { city: '嘉義縣', party: '鬱蔥雨林聯盟', count: 12334 },
  { city: '彰化縣', party: '蔚藍海岸陣線', count: 1233 },
])
</script>
