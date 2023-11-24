<style lang="scss">
@import '@/styles/main.scss';

.horizontalList {
  &__item {
    padding: 10px 16px;
    font-size: 1rem;
    font-weight: 500;
    color: $warning;
    cursor: pointer;
    border: 1px solid $warning;
    &:first-child {
      border-right: none;
      border-radius: 4px 0px 0px 4px;
    }
    &:last-child {
      border-left: none;
      border-radius: 0px 4px 4px 0px;
    }
    &:hover,
    &:active,
    &.active {
      color: $white;
      background-color: $warning;
    }
  }
}
</style>
<template>
  <h1 class="h2 fw-bold text-center">歷屆候選公僕名單</h1>

  <ul class="list-unstyled d-flex justify-content-center">
    <li
      class="horizontalList__item"
      v-for="year in years"
      :key="year"
      :class="{ active: year === curYear }"
    >
      <span v-if="year === curYear"> {{ year }}</span>
      <span v-else @click.prevent="getYearData(year)"> {{ year }}</span>
    </li>
  </ul>
  <div v-if="!isLoading">
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

// 資料統計：年份、政黨
const years = ref(filterCandidateDataType(candidateData, 'election_year'))
const parties = ref(filterCandidateDataType(candidateData, 'party'))
// 指定年份數據
const curYear = ref(null)
const curData = ref(null)
const isLoading = ref(true)

// methods
const getYearData = (year, candidate) => {
  curYear.value = year
  curData.value = candidate.filter(
    (item) => item.election_year == curYear.value,
  )
  isLoading.value = false
}

onMounted(() => {
  getYearData('2020', candidateData)
})
</script>
