<template>
  <div class="d-flex justify-content-center mb-8">
    <TermMenu
      :election-years="allYears"
      :is-link-nav="true"
      v-model:selected-year="curYear"
    ></TermMenu>
  </div>
  <h2 class="h2 mb-8 text-end">
    <span class="text-danger">{{ curYear }}</span> 年總統大選
  </h2>
  <!-- <div class="my-8">
    <p>候選人：</p>
    <p>{{ currentCandidates }}</p>
  </div>
  <div class="my-8">
    <p>鏡射年份：</p>
    <p>{{ mirrorYear }}</p>
  </div>
  <div class="my-8">
    <p>選票：</p>
    <p>{{ votes }}</p>
  </div> -->
  <!-- <div>
    <p>以下測試數據是否帶入</p>
    <div class="mb-8">
      <h2 class="h2 mb-4">得票數</h2>
      {{ votes }}
    </div>
    <div class="mb-8">
      <h2 class="h2 mb-4">當前候選人</h2>
      {{ currentCandidates }}
    </div>
  </div> -->
  <!-- 以下是設計稿內容 -->
  <!-- <div class="mb-8">
    <h4 class="h4 mb-2"><i class="bi bi-compass me-2"></i>查看地區詳情</h4>
    <SearchBar></SearchBar>
  </div>
  <div class="mb-8">
    <h4 class="h4 mb-8">
      <i class="bi bi-pencil-fill me-2"></i
      ><span class="text-danger">全國</span>選情概要
    </h4>
    <div class="container"><ElectionSummary></ElectionSummary></div>
  </div>
  <div class="mb-8">
    <h4 class="h4 mb-8">
      <i class="bi bi-person-raised-hand me-2"></i>候選人情況
    </h4>
    <CandidateSummary></CandidateSummary>
  </div>
  <div class="d-none d-md-block mb-md-8">
    <h4 class="h4">
      <i class="bi bi-joystick me-2"></i
      ><span class="text-danger">全國</span>投票情況
    </h4>
    <p class="text-danger">"BarChart"</p>
  </div>
  <div class="mb-8">
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
</template>
<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePastElectionStore } from '@/stores/pastVotesStore.js'
import { allYears } from '@/utils/electionInfo.js'
import TermMenu from '@/components/common/TermMenu.vue'
// import SearchBar from '@/components/common/SearchBar.vue'
// import ElectionSummary from '@/components/PastAnal/ElectionSummary.vue'
// import CandidateSummary from '@/components/PastAnal/CandidateSummary.vue'
// import AnalysisMenu from '@/components/PastAnal/AnalysisMenu.vue'
// import VotingAnalysis from '@/components/PastAnal/VotingAnalysis.vue'
// import PartyAnalysis from '@/components/PastAnal/PartyAnalysis.vue'

const route = useRoute()
const yearId = computed(() => route.params.year)
const curYear = ref(yearId)
const curCity = ref(null)
const curDistrict = ref(null)

const pastElectionStore = usePastElectionStore()

watch(
  [curYear, curCity, curDistrict],
  ([newYear, newCity, newDistrict]) => {
    pastElectionStore.specifyYear = newYear
    pastElectionStore.specifyCity = newCity
    pastElectionStore.specifyDistrict = newDistrict
  },
  { immediate: true },
)
const currentCandidates = computed(() => pastElectionStore.currentCandidates)
const mirrorYear = computed(() => pastElectionStore.mirrorYear)

const votes = computed(() => pastElectionStore.votes)
</script>
