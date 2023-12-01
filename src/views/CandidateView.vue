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
    <CandidateInfo
      :specify-Year="curYear"
      :election-Parties="parties"
      :election-Data="curData"
    ></CandidateInfo>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

import TermMenu from '@/components/common/TermMenu.vue'
import CandidateInfo from '@/components/CandidateInfo.vue'

import candidateData from '@/data/candidate.json'
import { allYears, allParties } from '@/utils/electionInfo'

const years = ref(allYears)
const parties = ref(allParties)

const curYear = ref('')
const curData = ref(null)
const isLoading = ref(true)

const getCandidateInfo = (year, candidate) => {
  isLoading.value = true
  curData.value = candidate.filter((item) => item.election_year == year)
  isLoading.value = false
}

watch([curYear], () => {
  getCandidateInfo(curYear.value, candidateData)
})

onMounted(() => {
  curYear.value = '2020'
})
</script>
