<template>
  <h1 class="h2 fw-bold text-center">歷屆候選公僕名單</h1>
  <div class="d-flex justify-content-center mb-8">
    <TermMenu
      :election-years="allYears"
      :is-link-nav="false"
      v-model:selected-year="curYear"
    ></TermMenu>
  </div>
  <CandidateInfo :specifyYear="curYear" :electionData="curData"></CandidateInfo>
</template>

<script setup>
import { ref, computed } from 'vue'
import candidateData from '@/data/candidate.json'
import { allYears } from '@/utils/electionInfo'

import TermMenu from '@/components/common/TermMenu.vue'
import CandidateInfo from '@/components/CandidateInfo.vue'

const curYear = ref(allYears[0])
const curData = computed(() => {
  return candidateData.filter((item) => item.election_year == curYear.value)
})
</script>
