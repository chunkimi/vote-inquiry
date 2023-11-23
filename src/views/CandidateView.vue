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
  <h1 class="h2 fw-bold text-center mb--32">歷屆候選公僕名單</h1>

  <ul class="list-unstyled d-flex justify-content-center mb--32">
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
      :election-Parties="parties"
      :election-Data="curData"
    ></CandidateInfo>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 原始資料
import originData from '@/data/dummyData.js'
import { filterDataType } from '../utils/candidateFilter'
import CandidateInfo from '@/components/CandidateInfo.vue'

// 資料統計：年份、政黨
const years = ref(filterDataType(originData, 'election_year'))
const parties = ref(filterDataType(originData, 'party'))
const curYear = ref(null)
const curData = ref(null)
const isLoaded = ref(false)
const isLoading = ref(true)

// methods
const getYearData = (year) => {
  // 內部改寫成 Promise
  curYear.value = year
  curData.value = originData.filter(
    (item) => item.election_year == curYear.value,
  )
  isLoading.value = false
  console.log(isLoaded.value)
}

onMounted(() => {
  getYearData('2020')
})
</script>
