<style lang="scss" scoped>
.party-info-base {
  &__logo--shorten {
    width: 24px;
    height: 24px;
    line-height: 24px;
  }
}
</style>
<template>
  <div class="py-6 mb-8 d-flex justify-content-center">
    <div
      class="col-12 col-md-4 bg-danger rounded-circle"
      style="height: 246px; width: 246px"
    ></div>
  </div>
  <div class="row">
    <div class="col-12 col-md-4">
      <div class="card">
        <div class="card-header p-4 bg-secondary text-center">
          <span class="text-danger">1</span>
        </div>
        <div class="card-body p-6">
          <div class="mb-6">
            <div class="mb-2 d-flex justify-content-between align-items-center">
              <h5 class="h5">總統候選人</h5>
              <div class="d-flex align-items-center">
                <img
                  :src="getImageUrl(dummyData.candidate.main.avatar_url)"
                  alt="avatar"
                  class="me-1 avatar--sm"
                />
                <h5 class="h5">
                  <span class="text-danger">{{
                    dummyData.candidate.main.name
                  }}</span>
                </h5>
              </div>
            </div>
            <div class="mb-2 d-flex justify-content-between align-items-center">
              <h5 class="h5">副總統候選人</h5>
              <div class="d-flex align-items-center">
                <img
                  :src="getImageUrl(dummyData.candidate.vice.avatar_url)"
                  alt="avatar"
                  class="me-1 avatar--sm"
                />
                <h5 class="h5">
                  <span class="text-danger">{{
                    dummyData.candidate.vice.name
                  }}</span>
                </h5>
              </div>
            </div>
            <div class="mb-2 d-flex justify-content-between align-items-center">
              <h5 class="h5">得票數</h5>
              <h5 class="h5">
                <span class="text-danger">{{
                  commaNumber(dummyData.voteNum)
                }}</span
                >票
              </h5>
            </div>
          </div>
          <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center">
              <p>得票率</p>
              <p>
                <span class="text-danger">{{ dummyData.voteRate }}</span>
              </p>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <p>所屬政黨</p>
              <div class="d-flex align-items-center">
                <span
                  class="party-info-base__logo--shorten rounded-circle fs-7 d-inline-block text-center bg-warning"
                  >{{ dummyData.candidate.abbreviation }}</span
                >
                <p>
                  <span class="text-danger">{{
                    dummyData.candidate.party
                  }}</span>
                </p>
              </div>
            </div>
          </div>
          <div>
            <p>
              得票率<span class="fw-bold">最高</span>縣市：<span
                class="text-danger"
                >{{ dummyData.rateAnal.cityHighest }}</span
              >
            </p>
            <p>
              得票率<span class="fw-bold">最低</span>縣市：<span
                class="text-danger"
                >{{ dummyData.rateAnal.cityLowest }}</span
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { commaNumber } from '@/utils/base'
import { getImageUrl } from '@/utils/candidateFilter'

const dummyData = {
  candidate: {
    party: '金色曠野同盟',
    abbreviation: '野',
    main: {
      name: '雅娜',
      avatar_url: 'assets/candidate/金色曠野同盟-雅娜.png',
    },
    vice: {
      name: '莉莎',
      avatar_url: 'assets/candidate/金色曠野同盟-莉莎.png',
    },
  },
  voteNum: 14345678,
  voteRate: '75.45%',
  rateAnal: {
    cityHighest: '臺北市',
    cityLowest: '新北市',
  },
}
</script>
