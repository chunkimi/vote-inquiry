<style lang="scss">
.winnerCard {
  width: 100%;
  max-width: 450px;
  height: auto;
  padding: 0 1.5rem;
}
</style>

<template>
  <div class="winnerCard">
    <p class="display-2 fw-bold text-info mb-3 text-center text-md-start">
      {{ winnerData[0].voteYear }}
    </p>
    <div class="row p-4 mb-3">
      <div class="col-12 col-md-6 mb-2">
        <div class="d-flex flex-column align-items-center">
          <img
            :src="getImageUrl(winnerData[0].main.avatar_url)"
            alt="avatar"
            class="avatar--md"
          />
          <p>總統－{{ winnerData[0].main.name }}</p>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="d-flex flex-column align-items-center">
          <img
            :src="getImageUrl(winnerData[0].vice.avatar_url)"
            alt="avatar"
            class="avatar--md"
          />
          <p>副總統－{{ winnerData[0].vice.name }}</p>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column align-items-center">
      <p class="h3 fw-bold text-info mb-3">
        {{ commaNumber(winnerData[0].voteNum) }} 票
      </p>
      <a href="" class="link-primary py-4">查看本屆詳情</a>
    </div>
  </div>
</template>

<script setup>
// import { toRefs, computed } from 'vue'

import { commaNumber } from '@/utils/main.js'
import { getImageUrl } from '@/utils/candidateFilter.js'

// 要轉有千分號的函式
const winnerData = [
  {
    voteYear: '2020',
    voteNum: '123456789',
    party: '金色曠野聯盟',
    main: {
      election_year: '2020',
      candidate_id: '1',
      role: 0,
      name: '雅娜',
      party: '金色曠野同盟',
      education: '自由原野大學法學博士',
      experience: '草原生態系統平和促進會主席',
      avatar_url: 'assets/candidate/金色曠野同盟-雅娜.png',
      is_elected: true,
    },
    vice: {
      election_year: '2020',
      candidate_id: '1',
      role: 1,
      name: '莉莎',
      party: '金色曠野同盟',
      education: '廣袤草地大學草原生態學',
      experience: '乾雨季水源管理部部長',
      avatar_url: 'assets/candidate/金色曠野同盟-莉莎.png',
      is_elected: true,
    },
  },
]

// const props = defineProps({
//   winnerData: Array,
// })

// const { winnerData } = toRefs(props)

// const candidateData = computed(() => {
//   if (!electionParties.value || !electionData.value) return []
//   return filterYearCandidate(electionParties.value, electionData.value)
// })
</script>
