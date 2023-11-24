<style lang="scss">
@import '@/styles/main.scss';

.timeLine {
  &__wrap {
    display: flex;
    justify-content: start;
    @include media-breakpoint-up(md) {
      justify-content: center;
    }
  }
  &__list {
    width: 0.25rem;
    background-color: $info;
    padding-top: 3rem;
  }
  &__card {
    &__wrap {
      position: relative;
      min-height: 26.5rem;
      margin-bottom: 4rem;
      &:before {
        content: '';
        display: block;
        width: 20px;
        height: 20px;
        background-color: $light;
        border-radius: 50%;
        border: 3px solid $info;
        top: 0;
        left: 50%;
        transform: translateX(-40%);
      }
      @include media-breakpoint-up(md) {
        &:nth-child(2n) {
          .timeLine__card__item {
            right: 2.75rem;
            left: initial;
            .winnerCard__year {
              text-align: end;
            }
          }
        }
      }
    }
    &__item {
      position: absolute;
      left: 2.75rem;
    }
  }
}
</style>

<template>
  <h2 class="h2 fw-bold gap-8 text-center">歷屆選情</h2>
  <div class="timeLine__wrap">
    <ul class="list-unstyled timeLine__list">
      <li
        v-for="candidate in winnerData"
        :key="candidate.voteYear"
        class="timeLine__card__wrap"
      >
        <WinnerCard
          :winner="candidate"
          class="timeLine__card__item"
        ></WinnerCard>
      </li>
    </ul>
  </div>
</template>

<script setup>
import WinnerCard from '@/components/WinnerCard.vue'
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
