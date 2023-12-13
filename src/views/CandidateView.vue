<template>
  <h1 class="h2 fw-bold text-center">歷屆候選公僕名單</h1>
  <div v-if="!isLoading">
    <div class="d-flex justify-content-center mb-8">
      <TermMenu
        :electionYears="allYears"
        v-model:selectedYear="curYear"
      ></TermMenu>
    </div>
    <CandidateInfo
      :electionParties="allParties"
      :specifyYear="curYear"
      :electionData="curData"
    ></CandidateInfo>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

import TermMenu from '@/components/common/TermMenu.vue'
import CandidateInfo from '@/components/CandidateInfo.vue'

import candidateData from '@/data/candidate.json'
import { allYears, allParties } from '@/utils/electionInfo'

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
