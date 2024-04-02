<style lang="scss" scoped>
@import '@/styles/main.scss';
.winnerCard {
  width: 100%;
  min-width: 18.75rem;
  @include media-breakpoint-up(md) {
    min-width: 28.25rem;
  }
  &__year {
    text-align: center;
    @include media-breakpoint-up(md) {
      text-align: start;
    }
  }
}
</style>

<template>
  <div class="winnerCard px-6">
    <p class="display-2 fw-bold text-info mb-4 winnerCard__year">
      {{ winnerInfo.voteYear }}
    </p>
    <div class="row p-6 mb-4">
      <div class="col-12 col-md-6 mb-4 mb-md-0">
        <div class="d-flex flex-column align-items-center">
          <img
            :src="getImageUrl(winnerInfo.main.avatar_url)"
            alt="avatar"
            class="avatar--md"
          />
          <p>總統－{{ winnerInfo.main.name }}</p>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="d-flex flex-column align-items-center">
          <img
            :src="getImageUrl(winnerInfo.vice.avatar_url)"
            alt="avatar"
            class="avatar--md"
          />
          <p>副總統－{{ winnerInfo.vice.name }}</p>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column align-items-center">
      <p class="h3 fw-bold text-info">
        {{ commaNumber(winnerInfo.voteNum) }} 票
      </p>
      <RouterLink
        :to="{ name: 'PastAnalysis', params: { year: winnerInfo.voteYear } }"
        class="link-primary py-6"
        >查看本屆詳情</RouterLink
      >
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { commaNumber, getImageUrl } from '@/utils/base.js'

defineProps({
  winnerInfo: {
    type: Object,
    required: true,
  },
})
</script>
