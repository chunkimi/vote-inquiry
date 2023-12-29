<template>
  <div class="row">
    <div
      class="col-12 col-md-4 mb-4"
      v-for="candidate in data"
      :key="candidate.candidate_id"
    >
      <div class="card h-100">
        <div class="card-header p-4 bg-secondary text-center">
          {{ candidate.candidate_id }}
        </div>
        <div class="card-body p-6">
          <div class="mb-6">
            <div class="mb-2 d-flex justify-content-between align-items-center">
              <h5 class="h5">總統候選人</h5>
              <div class="d-flex align-items-center">
                <img
                  :src="getImageUrl(candidate.main.avatar_url)"
                  alt="avatar"
                  class="me-1 avatar--sm"
                />
                <h5 class="h5">
                  {{ candidate.main.name }}
                </h5>
              </div>
            </div>
            <div class="mb-2 d-flex justify-content-between align-items-center">
              <h5 class="h5">副總統候選人</h5>
              <div class="d-flex align-items-center">
                <img
                  :src="getImageUrl(candidate.vice.avatar_url)"
                  alt="avatar"
                  class="me-1 avatar--sm"
                />
                <h5 class="h5">
                  {{ candidate.vice.name }}
                </h5>
              </div>
            </div>
            <div class="mb-2 d-flex justify-content-between align-items-center">
              <h5 class="h5">得票數</h5>
              <h5 class="h5">
                {{ commaNumber(candidate.voteNum) }}
              </h5>
            </div>
          </div>
          <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center">
              <p>得票率</p>
              <p>{{ candidate.voteRate }}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <p>所屬政黨</p>
              <div class="d-flex align-items-center">
                <PartyLogo :party="candidate.party" size="shorten" />
                <p>
                  {{ candidate.party }}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div class="d-flex justify-content-between align-items-center">
              <p>得票率<span class="fw-bold">最高</span>地區：</p>
              <p>{{ candidate.rateAnal.cityHighest['行政區別'] }}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <p>得票率<span class="fw-bold">最低</span>地區：</p>
              <p>{{ candidate.rateAnal.cityLowest['行政區別'] }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import PartyLogo from '@/components/common/PartyLogo.vue'
import { commaNumber, getImageUrl } from '@/utils/base'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})
</script>
