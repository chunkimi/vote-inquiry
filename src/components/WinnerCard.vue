<style lang="scss">
.winnerCard {
  width: 100%;
  max-width: 450px;
  height: auto;
  padding: 0 1.5rem;
}
</style>

<template>
  <div class="winnerCard" v-for="winner in winnerData" :key="winner.voteYear">
    <p class="display-2 fw-bold text-info mb-3 text-center text-md-start">
      {{ winner.voteYear }}
    </p>
    <div class="row p-4 mb-3">
      <div class="col-12 col-md-6 mb-2">
        <div class="d-flex flex-column align-items-center">
          <img
            :src="getImageUrl(winner.main.avatar_url)"
            alt="avatar"
            class="avatar--md"
          />
          <p>總統－{{ winner.main.name }}</p>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="d-flex flex-column align-items-center">
          <img
            :src="getImageUrl(winner.vice.avatar_url)"
            alt="avatar"
            class="avatar--md"
          />
          <p>副總統－{{ winner.vice.name }}</p>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column align-items-center">
      <p class="h3 fw-bold text-info mb-3">
        {{ commaNumber('123456789') }} 票
        <!-- {{ commaNumber(winner.voteNum) }} 票 -->
      </p>
      <a href="" class="link-primary py-4">查看本屆詳情</a>
    </div>
  </div>
</template>

<script setup>
import { commaNumber } from '@/utils/main.js'
import { getImageUrl } from '@/utils/candidateFilter.js'

const winnerData = [
  {
    voteYear: '2020',
    party: '金色曠野同盟',
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
  {
    voteYear: '2016',
    party: '金色曠野同盟',
    main: {
      election_year: '2016',
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
      election_year: '2016',
      candidate_id: '1',
      role: 1,
      name: '艾德華',
      party: '金色曠野同盟',
      education: '無垠大地大學草原生態管理博士',
      experience: '草原草地生態修復協會主任」',
      avatar_url: 'assets/candidate/金色曠野同盟-艾德華.png',
      is_elected: true,
    },
  },
  {
    voteYear: '2012',
    party: '蔚藍海岸陣線',
    main: {
      election_year: '2012',
      candidate_id: '2',
      role: 0,
      name: '芭芭拉',
      party: '蔚藍海岸陣線',
      education: '深海探險學院海洋地質學博士',
      experience: '海溝環境監測部部長',
      avatar_url: 'assets/candidate/蔚藍海岸陣線-芭芭拉.png',
      is_elected: true,
    },
    vice: {
      election_year: '2012',
      candidate_id: '2',
      role: 1,
      name: '埃莉諾',
      party: '蔚藍海岸陣線',
      education: '海洋氣象學研究中心海洋氣象學博士',
      experience: '北方洋流運輸部部長',
      avatar_url: 'assets/candidate/蔚藍海岸陣線-埃莉諾.png',
      is_elected: true,
    },
  },
]
</script>
