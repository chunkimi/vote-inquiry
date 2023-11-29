<style lang="scss">
@import '@/styles/main.scss';

.partySum__card {
  width: 100%;
  height: 100%;
  min-height: 268px;
}

.text--gray600 {
  color: $gray-600;
}
</style>
<template>
  <div class="row">
    <div class="col-12 col-md-4 mb-4">
      <div class="partySum__card p-6 rounded border">
        <div class="text-end mb-4">
          <h4 class="h4 mb-4">
            <span class="text-danger">{{ dummyData.party }}</span>
          </h4>
          <h3 class="h3 mb-4">
            <span class="text-danger"
              >{{ commaNumber(dummyData.voteNum) }}票</span
            >
          </h3>
          <h4 class="h4 mb-4">
            <span class="text-danger">57.32%</span>
          </h4>
        </div>
        <ul class="list-unstyled">
          <li class="text--gray600">
            得票優勢縣市數：<span class="text-danger">{{
              dummyData.advantageCityNum
            }}</span>
          </li>
          <li class="text--gray600">
            得票率最高縣市：<span class="text-danger">{{
              dummyData.heightRateCity
            }}</span>
          </li>
          <li class="text--gray600">
            得票率最低縣市：<span class="text-danger">{{
              dummyData.lowestRateCit
            }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import { commaNumber } from '@/utils/base'
const dummyData = {
  party: '金色曠野同盟',
  voteNum: '123456789',
  advantageCityNum: 10,
  heightRateCity: '臺北市',
  lowestRateCity: '臺北市',
}
</script>
