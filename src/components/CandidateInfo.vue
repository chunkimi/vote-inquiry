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
    <div class="col-12 mb-3" v-for="(party, index) in parties" :key="index">
      <div class="card w-100">
        <div class="card-header p-3 bg-secondary text-center">
          {{ index + 1 }}
        </div>
        <div class="card-body p-4 d-flex flex-column">
          <div class="card__content">
            <div class="row mb-3">
              <div
                class="col-12 col-md-3 mb--20 mb-mb-0 d-flex justify-content-center align-items-center"
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
            <div class="row mb-3">
              <div
                class="col-12 col-md-3 mb--20 mb-mb-0 d-flex justify-content-center align-items-center"
              >
                <img
                  :src="getImageUrl(candidateData[party].vice.picture)"
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
<!-- <script>
import { ref } from 'vue'
import { filterYearCandidate, getImageUrl } from '@/utils/candidateFilter.js'

export default {
  props: ['electionParties', 'electionData'],

  setup(props) {
    const { electionParties, electionData } = ref(props)
    const candidateData = ref(
      filterYearCandidate(electionParties, electionData),
    )

    return { candidateData, getImageUrl }
  },
}
</script> -->
<script setup>
import { toRef, ref } from 'vue'
import { filterYearCandidate, getImageUrl } from '@/utils/candidateFilter.js'

const props = defineProps({
  electionParties: Array,
  electionData: Array,
})

const { electionParties, electionData } = toRef(props)

const candidateData = ref(filterYearCandidate(electionParties, electionData))
</script>
