<template>
  <h1 class="h2 fw-bold text-center">歷屆候選公僕名單</h1>
  <div v-if="!isLoading">
    <TermMenu
      :election-Years="years"
      :specify-Year="curYear"
      @change-Year="switchMenu"
    ></TermMenu>
    <CandidateInfo
      :specify-Year="curYear"
      :election-Parties="parties"
      :election-Data="curData"
    ></CandidateInfo>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 原始資料
import candidateData from '@/data/candidate.json'
import { filterCandidateDataType } from '@/utils/candidateFilter'
import CandidateInfo from '@/components/CandidateInfo.vue'
import TermMenu from '@/components/common/TermMenu.vue'

// 資料統計：年份、政黨
const years = ref(null)
const parties = ref(null)
// 指定年份數據
const curYear = ref(null)
const curData = ref(null)
const isLoading = ref(true)
// methods
const getYearData = (data) => {
  years.value = filterCandidateDataType(data, 'election_year')
}

const getPartyData = (data) => {
  parties.value = filterCandidateDataType(data, 'party')
}

const getCandidateInfo = (year, candidate) => {
  isLoading.value = true
  curYear.value = year
  curData.value = candidate.filter(
    (item) => item.election_year == curYear.value,
  )
  isLoading.value = false
}

const switchMenu = (year) => {
  curYear.value = year
  getCandidateInfo(year, candidateData)
}

const init = () => {
  getYearData(candidateData)
  getPartyData(candidateData)
  if (years.value.length > 0 && parties.value.length > 0) {
    getCandidateInfo('2020', candidateData)
    isLoading.value = false
  }
}

onMounted(() => {
  init()
})
</script>
