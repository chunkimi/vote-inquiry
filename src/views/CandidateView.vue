<template>
  <h1 class="h2 fw-bold text-center">歷屆候選公僕名單</h1>
  <!-- <div v-if="!isLoading"> -->
  <div class="d-flex justify-content-center mb-8">
    <TermMenu :election-Years="years" v-model="curYear"></TermMenu>
  </div>
  <!--
    解說：這裡 property 的名稱有兩種載入方式，一個是 camelCase，一個是 kebab-case，例如：
    1. camelCase:
    <CandidateInfo
      :specifyYear="curYear"
      :electionParties="parties"
      :electionData="curData"
    ></CandidateInfo>

    2. kebab-case:
    <CandidateInfo
      :specify-year="curYear"
      :election-parties="parties"
      :election-data="curData"
    ></CandidateInfo>

    下列這個用法是有誤的:
    <CandidateInfo
      :specify-Year="curYear"
      :election-Parties="parties"
      :election-Data="curData"
    ></CandidateInfo>
  -->
  <CandidateInfo
    :specify-year="curYear"
    :election-parties="parties"
    :election-data="curData"
  ></CandidateInfo>
  <!-- </div> -->
</template>

<script setup>
import { ref, computed } from 'vue'

import TermMenu from '@/components/common/TermMenu.vue'
import CandidateInfo from '@/components/CandidateInfo.vue'

import candidateData from '@/data/candidate.json'
import { allYears as years, allParties as parties } from '@/utils/electionInfo'

/**
 * 解說：因為 years 跟 parties 的值不會變動，所以不需要用 ref，讓他變成 reactive value
 */
// const years = ref(allYears)
// const parties = ref(allParties)

/**
 * 解說：如果知道 curYear 的初始值，可以直接設定，用 years[0] 來表示初始值，這樣 years 有變動，這邊不用重新修改
 */
const curYear = ref(years[0])
// const curData = ref(null)
/**
 * 解說：isLoading 在這邊是沒有做用的，因為沒有用到 async/await function，在執行時都會直接變 false
 */
// const isLoading = ref(true)

/**
 * 解說：可以改寫成 computed 的寫法，會看起來更簡潔
 * 如同 watch 監聽 curYear 一樣，只要 curYear 有變動，就會重新計算
 * https://vuejs.org/guide/essentials/computed.html#computed-properties
 */
const curData = computed(() => {
  return candidateData.filter((item) => item.election_year == curYear.value)
})
// const getCandidateInfo = (year, candidate) => {
//   // isLoading.value = true
//   curData.value = candidate.filter((item) => item.election_year == year)
//   // isLoading.value = false
// }

// watch([curYear], () => {
//   getCandidateInfo(curYear.value, candidateData)
// })

/**
 * 解說：因為已經設定 curYear 的初始值，所以不需要再用 onMounted 來設定
 */
// onMounted(() => {
//   curYear.value = '2020'
// })
</script>
