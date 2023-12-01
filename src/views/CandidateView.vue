<template>
  <h1 class="h2 fw-bold text-center">歷屆候選公僕名單</h1>
  <p>選擇的值: {{ curYear }}</p>
  <div v-if="!isLoading">
    <div class="d-flex justify-content-center mb-8">
      <TermMenu
        :election-Years="years"
        v-model:selected-Year="curYear"
      ></TermMenu>
    </div>
    <!-- <CandidateInfo
      :specify-Year="curYear"
      :election-Parties="parties"
      :election-Data="curData"
    ></CandidateInfo> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// import CandidateInfo from '@/components/CandidateInfo.vue'
import TermMenu from '@/components/common/TermMenu.vue'

import candidateData from '@/data/candidate.json'
import { allYears, allParties } from '@/utils/electionInfo'

// 資料統計：年份、政黨
const years = ref(allYears)
const parties = ref(allParties)
// 指定年份數據
const curYear = ref('')
const curData = ref(null)
const isLoading = ref(true)

const getCandidateInfo = (year, candidate) => {
  isLoading.value = true
  curYear.value = year
  curData.value = candidate.filter(
    (item) => item.election_year == curYear.value,
  )
  isLoading.value = false
}

// const switchMenu = (year) => {
//   curYear.value = year
//   getCandidateInfo(year, candidateData)
// }

const init = () => {
  if (years.value.length > 0 && parties.value.length > 0) {
    getCandidateInfo('2020', candidateData)
    isLoading.value = false
  }
}

onMounted(() => {
  init()
})
</script>
