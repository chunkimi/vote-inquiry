<style lang="scss">
.winnerCard {
  width: 100%;
  max-width: 450px;
  height: auto;
  padding: 0 1.5rem;
}
</style>

<template>
  <!-- <div v-for="winner in winnerData" :key="winner.voteYear"></div> -->
  <div class="winnerCard">
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
      <RouterLink
        :to="`past-elections/${winner.voteYear}`"
        class="link-primary py-4"
        >查看本屆詳情</RouterLink
      >
    </div>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
import { RouterLink } from 'vue-router'
import { commaNumber } from '@/utils/main.js'
import { getImageUrl } from '@/utils/candidateFilter.js'

const props = defineProps({
  winner: Object,
})
const { winner } = toRefs(props)
</script>
