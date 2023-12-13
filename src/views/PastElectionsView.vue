<style lang="scss" scoped>
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
      top: -2.25rem;
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
          :winnerInfo="candidate"
          class="timeLine__card__item"
        ></WinnerCard>
      </li>
    </ul>
  </div>
</template>

<script setup>
console.clear()
import { computed } from 'vue'
import candidateData from '@/data/candidate.json'
import { allYears } from '@/utils/electionInfo'
import { votesNationalData } from '@/utils/votesNational.js'
import { filterWinner, getWinnerVotes } from '@/utils/candidateFilter'
import WinnerCard from '@/components/WinnerCard.vue'

const winnerData = getWinnerData(allYears, candidateData, votesNationalData)

function getWinnerData(years, candidates, votes) {
  let winnerInfo = filterWinner(years, candidates)
  return getWinnerVotes(years, winnerInfo, votes)
}
</script>
