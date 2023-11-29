<style lang="scss">
@import '@/styles/main.scss';

.domain__card {
  width: 100%;
  height: 100%;
  min-height: 236px;
}
</style>
<template>
  <div class="row">
    <div class="col-6 col-md-3 mb-1 mb-md-4">
      <div class="domain__card p-6 rounded bg-danger bg-opacity-25">
        <h3 class="h3 text-end mb-4">
          <span class="text-danger">{{ dummyData.city }}</span>
        </h3>
        <div class="mb-4">
          <p class="mb-2">本屆得票優勢政黨</p>
          <h4 class="h4">
            <span class="text-dang"
              ><span class="text-danger">{{ dummyData.curParty }}</span></span
            >
          </h4>
        </div>
        <div class="mb-4">
          <p class="mb-2">前屆得票優勢政黨</p>
          <h6 class="h6">
            <span class="text-dang"
              ><span class="text-danger">{{ dummyData.perParty }}</span></span
            >
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const dummyData = {
  city: '臺北市',
  curParty: '金色曠野同盟',
  perParty: '蔚藍海岸陣線',
}
</script>
