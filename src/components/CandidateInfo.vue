<style lang="scss">
@import '@/styles/main.scss';
.card {
  &__avatar {
    width: 100px;
    height: 100%;
  }
  &__content {
    width: 100%;
    max-width: 544px;
    margin: 0 auto;
    & p {
      margin-bottom: 0.25rem;
    }
  }
}
</style>
<template>
  <div class="row">
    <div
      class="col-12 mb-4"
      v-for="(party, index) in electionParties"
      :key="index"
    >
      <div class="card w-100">
        <div class="card-header p-4 bg-secondary text-center">
          {{ index + 1 }}
        </div>
        <div class="card-body p-6 d-flex flex-column">
          <div class="card__content">
            <div class="row mb-4">
              <div
                class="col-12 col-md-3 mb-5 mb-mb-0 d-flex justify-content-center align-items-center"
              >
                <img
                  :src="getImageUrl(candidateData[party].main.avatar_url)"
                  alt="avatar"
                  class="img-fluid card__avatar"
                />
              </div>
              <div class="col-12 col-md-9">
                <div class="row">
                  <p
                    class="col-4 d-flex justify-content-between border-end border-dark"
                  >
                    <span>總</span>
                    <span>統</span>
                    <span>候</span>
                    <span>選</span>
                    <span>人</span>
                  </p>
                  <p class="col-8">{{ candidateData[party].main.name }}</p>
                </div>
                <div class="row">
                  <p
                    class="col-4 d-flex justify-content-between border-end border-dark"
                  >
                    <span>學</span><span>歷</span>
                  </p>
                  <p class="col-8">{{ candidateData[party].main.education }}</p>
                </div>
                <div class="row">
                  <p
                    class="col-4 d-flex justify-content-between border-end border-dark"
                  >
                    <span>經</span><span>歷</span>
                  </p>
                  <p class="col-8">
                    {{ candidateData[party].main.experience }}
                  </p>
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div
                class="col-12 col-md-3 mb-5 mb-mb-0 d-flex justify-content-center align-items-center"
              >
                <img
                  :src="getImageUrl(candidateData[party].vice.avatar_url)"
                  alt="avatar"
                  class="img-fluid card__avatar"
                />
              </div>
              <div class="col-12 col-md-9">
                <div class="row">
                  <p
                    class="col-4 d-flex justify-content-between border-end border-dark"
                  >
                    <span>副</span>
                    <span>總</span>
                    <span>統</span>
                    <span>候</span>
                    <span>選</span>
                    <span>人</span>
                  </p>
                  <p class="col-8">{{ candidateData[party].vice.name }}</p>
                </div>
                <div class="row">
                  <p
                    class="col-4 d-flex justify-content-between border-end border-dark"
                  >
                    <span>學</span><span>歷</span>
                  </p>
                  <p class="col-8">{{ candidateData[party].vice.education }}</p>
                </div>
                <div class="row">
                  <p
                    class="col-4 d-flex justify-content-between border-end border-dark"
                  >
                    <span>經</span><span>歷</span>
                  </p>
                  <p class="col-8">
                    {{ candidateData[party].vice.experience }}
                  </p>
                </div>
              </div>
            </div>
            <h5 class="card-title text-center m-0">所屬政黨｜{{ party }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { toRefs, computed } from 'vue'
import { filterYearCandidate, getImageUrl } from '@/utils/candidateFilter.js'

const props = defineProps({
  electionParties: Array,
  electionData: Array,
})

const { electionParties, electionData } = toRefs(props)

const candidateData = computed(() => {
  if (!electionParties.value || !electionData.value) return []
  return filterYearCandidate(electionParties.value, electionData.value)
})
</script>
