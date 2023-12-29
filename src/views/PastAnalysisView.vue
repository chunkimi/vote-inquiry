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
    <h4 class="h4 mb-8">
      <i class="bi bi-pencil-fill me-2"></i>{{ curStatus }}選情概要
    </h4>
    <div class="container">
      <ElectionSummary :data="electionSummaryVotes"></ElectionSummary>
    </div>
  </div>
  <div class="mb-8">
    <h4 class="h4 mb-8">
      <i class="bi bi-person-raised-hand me-2"></i>候選人情況
    </h4>
    <CandidateSummary
      :vote="candidateSummaryVotes"
      :candidate="currentCandidates"
    ></CandidateSummary>
  </div>
  <div class="d-md-block mb-md-8" v-if="isDesktop">
    <h4 class="h4 mb-8">
      <i class="bi bi-joystick me-2"></i>{{ curStatus }}投票情況
    </h4>
    <div v-if="curStatus === '全國'">
      <VoteMap :data="voteMapData"></VoteMap>
    </div>
    <div v-else>"BarChart"</div>
  </div>
  <!--<div class="mb-8">
    <h4 class="h4 mb-8"><i class="bi bi-clipboard-data me-2"></i>選票分析</h4>
    <div class="row">
      <div class="col-12 col-md-2 mb-8"><AnalysisMenu></AnalysisMenu></div>
      <div class="col-12 col-md-10">
        <div class="mb-4">
          <VotingAnalysis></VotingAnalysis>
        </div>
        <div class="mb-4">
          <PartyAnalysis></PartyAnalysis>
        </div>
      </div>
    </div>
  </div> -->

  <div class="mt-8">
    <p>這是選票</p>
    <p class="mt-8">{{ votes }}</p>
  </div>
  <div class="mt-8">
    <p>這是候選人</p>
    <p class="mt-8">{{ currentCandidates }}</p>
  </div>
</template>
<script setup>
console.clear()
import { computed, watch, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useMediaQuery } from '@vueuse/core'

import { usePastElectionStore } from '@/stores/pastVotesStore.js'
import { filterSpecifyVotes } from '@/utils/votesAnal.js'
import { allYears } from '@/utils/electionInfo.js'

import TermMenu from '@/components/common/TermMenu.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import ElectionSummary from '@/components/PastAnal/ElectionSummary.vue'
import CandidateSummary from '@/components/PastAnal/CandidateSummary.vue'
import VoteMap from '@/components/common/VoteMap.vue'
// import AnalysisMenu from '@/components/PastAnal/AnalysisMenu.vue'
// import VotingAnalysis from '@/components/PastAnal/VotingAnalysis.vue'
// import PartyAnalysis from '@/components/PastAnal/PartyAnalysis.vue'

const isDesktop = useMediaQuery('(min-width: 767px)')

const route = useRoute()
const yearId = computed(() => route.params.year)
const {
  specifyYear: curYear,
  specifyCity: curCity,
  specifyDistrict: curDistrict,
  votes,
  currentCandidates,
} = storeToRefs(usePastElectionStore())

watch(yearId, (year) => (curYear.value = year), { immediate: true })

const curStatus = computed(() => {
  if (!curCity.value && !curDistrict.value) {
    return `全國`
  } else if (!curDistrict) {
    return `${curCity.value}`
  } else {
    return `${curCity.value}${curDistrict.value}`
  }
})

// 先以本地端選票資料寫畫面
import vote2020 from '@/data/votes/2020/全國.json'
import vote2016 from '@/data/votes/2016/全國.json'
import vote2012 from '@/data/votes/2012/全國.json'
const allData = { vote2020, vote2016, vote2012 }

const specifyVoteJson = ref([])
watch(yearId, (year) => (specifyVoteJson.value = getPath(year)), {
  immediate: true,
})

const electionSummaryVotes = computed(() => {
  const result = filterSpecifyVotes(specifyVoteJson.value, '行政區別', '總計')
  const { 有效票數, 無效票數, 投票數, 選舉人數, 投票率 } = result
  return { 有效票數, 無效票數, 投票數, 選舉人數, 投票率 }
})

const candidateSummaryVotes = computed(() => {
  return specifyVoteJson.value
})

const voteMapData = computed(() => {
  return (specifyVoteJson.value || []).map((row) => {
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

function getPath(year) {
  return allData[`vote${year}`]
}
</script>
