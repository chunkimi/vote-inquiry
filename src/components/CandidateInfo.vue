<template>
  <div class="row">
    <div
      class="col-12 mb-4"
      v-for="(candidateItem, index) in candidatesData"
      :key="index"
    >
      <div class="card w-100">
        <div class="card-header p-4 bg-secondary text-center">
          {{ candidateItem.candidate_id }}
        </div>
        <div class="card-body p-6 d-flex flex-column">
          <div class="card__content">
            <div class="row mb-4">
              <div
                class="col-12 col-md-3 mb-5 mb-mb-0 d-flex justify-content-center align-items-center"
              >
                <img
                  :src="getImageUrl(candidateItem.main.avatar_url)"
                  alt="avatar"
                  class="img-fluid avatar--md"
                />
              </div>
              <div class="col-12 col-md-9">
                <div class="row">
                  <p
                    class="col-5 col-md-4 d-flex justify-content-between border-end border-dark"
                  >
                    <span>總</span>
                    <span>統</span>
                    <span>候</span>
                    <span>選</span>
                    <span>人</span>
                  </p>
                  <p class="col-7 col-md-8">{{ candidateItem.main.name }}</p>
                </div>
                <div class="row">
                  <p
                    class="col-5 col-md-4 d-flex justify-content-between border-end border-dark"
                  >
                    <span>學</span><span>歷</span>
                  </p>
                  <p class="col-7 col-md-8">
                    {{ candidateItem.main.education }}
                  </p>
                </div>
                <div class="row">
                  <p
                    class="col-5 col-md-4 d-flex justify-content-between border-end border-dark"
                  >
                    <span>經</span><span>歷</span>
                  </p>
                  <p class="col-7 col-md-8">
                    {{ candidateItem.main.experience }}
                  </p>
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div
                class="col-12 col-md-3 mb-5 mb-mb-0 d-flex justify-content-center align-items-center"
              >
                <img
                  :src="getImageUrl(candidateItem.vice.avatar_url)"
                  alt="avatar"
                  class="img-fluid avatar--md"
                />
              </div>
              <div class="col-12 col-md-9">
                <div class="row">
                  <p
                    class="col-5 col-md-4 d-flex justify-content-between border-end border-dark"
                  >
                    <span>副</span>
                    <span>總</span>
                    <span>統</span>
                    <span>候</span>
                    <span>選</span>
                    <span>人</span>
                  </p>
                  <p class="col-7 col-md-8">{{ candidateItem.vice.name }}</p>
                </div>
                <div class="row">
                  <p
                    class="col-5 col-md-4 d-flex justify-content-between border-end border-dark"
                  >
                    <span>學</span><span>歷</span>
                  </p>
                  <p class="col-7 col-md-8">
                    {{ candidateItem.vice.education }}
                  </p>
                </div>
                <div class="row">
                  <p
                    class="col-5 col-md-4 d-flex justify-content-between border-end border-dark"
                  >
                    <span>經</span><span>歷</span>
                  </p>
                  <p class="col-7 col-md-8">
                    {{ candidateItem.vice.experience }}
                  </p>
                </div>
              </div>
            </div>
            <h5 class="card-title text-center m-0">
              所屬政黨｜{{ candidateItem.party }}
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { getImageUrl } from '@/utils/base'
import { filterSameSession } from '@/utils/candidateFilter.js'

const props = defineProps({
  specifyYear: {
    type: String,
    required: true,
  },
  electionData: {
    type: Array,
    required: true,
  },
})

const candidatesData = computed(() => {
  const copyData = [...props.electionData]
  return filterSameSession(props.specifyYear, copyData)
})
</script>
