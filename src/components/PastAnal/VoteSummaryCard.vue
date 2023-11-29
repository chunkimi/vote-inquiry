<style lang="scss">
@import '@/styles/main.scss';
.voteSum__card {
  width: 100%;
  height: 100%;
  min-height: 114px;
  @include media-breakpoint-up(md) {
    min-height: 244px;
  }
}
</style>
<template>
  <div class="row">
    <div class="col-12 col-md-4 mb-4">
      <div class="voteSum__card p-6 bg-primary rounded text-light">
        <h4 class="h4 mb-4 text-md-end">
          <span class="text-danger">全國</span>投票率
        </h4>
        <p class="display-3 text-end">
          <span class="text-danger">{{ dummyData.voteRate }}</span>
        </p>
      </div>
    </div>
    <div class="col-12 col-md-4 mb-4">
      <div class="voteSum__card p-6 bg-primary rounded text-end text-light">
        <h4 class="h4 mb-4 text-md-end">
          投票率最高<span class="text-danger">縣市</span>
        </h4>
        <p class="display-3 text-end">
          <span class="text-danger">{{ dummyData.heightRateCity }}</span>
        </p>
      </div>
    </div>
    <div class="col-12 col-md-4 mb-4">
      <div class="voteSum__card p-6 bg-primary rounded text-end text-light">
        <h4 class="h4 mb-4 text-md-end">
          投票率最低<span class="text-danger">縣市</span>
        </h4>
        <p class="display-3 text-end">
          <span class="text-danger">{{ dummyData.lowestRateCity }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
const dummyData = {
  voteRate: '75.46%',
  heightRateCity: '臺北市',
  lowestRateCity: '臺北市',
}
</script>
