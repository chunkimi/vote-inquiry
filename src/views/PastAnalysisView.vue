<template>
  <div class="d-flex justify-content-center mb-8">
    <TermMenu
      :election-years="allYears"
      :is-link-nav="true"
      v-model:selected-year="curYear"
    ></TermMenu>
  </div>
  <h2 class="h2 mb-8 text-end">{{ curYear }}年總統大選</h2>
  <div class="mb-8">
    <h4 class="h4 mb-2"><i class="bi bi-compass me-2"></i>查看地區詳情</h4>
    <SearchBar
      :year="curYear"
      v-model:city="curCity"
      v-model:district="curDistrict"
    />
  </div>
  <div class="mb-8">
    <ElectionSummary :origin-votes="specifyVoteJson"></ElectionSummary>
  </div>
  <div class="mb-8">
    <CandidateSummary :origin-votes="specifyVoteJson"></CandidateSummary>
  </div>
  <div class="d-md-block mb-md-8" v-if="isDesktop">
    <VoteStatus :origin-votes="specifyVoteJson"></VoteStatus>
  </div>
  <div class="mb-8">
    <BallotAnalysis :origin-votes="specifyVoteJson"></BallotAnalysis>
  </div>
  <div class="mt-8">
    <p>這是選票</p>
    <p class="mt-8">{{ votes }}</p>
  </div>
</template>
<script setup>
console.clear()
import { computed, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { usePastElectionStore } from '@/stores/pastVotesStore.js'
import { allYears } from '@/utils/electionInfo.js'

import TermMenu from '@/components/common/TermMenu.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import ElectionSummary from '@/components/PastAnal/ElectionSummary.vue'
import CandidateSummary from '@/components/PastAnal/CandidateSummary.vue'
import VoteStatus from '@/components/PastAnal/VoteStatus.vue'
import BallotAnalysis from '@/components/PastAnal/BallotAnalysis.vue'
import { useMediaQuery } from '@vueuse/core'
const isDesktop = useMediaQuery('(min-width: 767px)')

const route = useRoute()
const yearId = computed(() => route.params.year)
const { curYear, curCity, curDistrict, votes } = storeToRefs(
  usePastElectionStore(),
)

watch(yearId, (year) => (curYear.value = year), { immediate: true })

// 先以本地端選票資料寫畫面
import vote2020 from '@/data/votes/2020/全國.json'
import vote2016 from '@/data/votes/2016/全國.json'
import vote2012 from '@/data/votes/2012/全國.json'
const allData = { vote2020, vote2016, vote2012 }

const specifyVoteJson = ref([])
watch(yearId, (year) => (specifyVoteJson.value = getPath(year)), {
  immediate: true,
})
function getPath(year) {
  return allData[`vote${year}`]
}
</script>
