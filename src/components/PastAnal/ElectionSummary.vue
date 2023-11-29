<template>
  <div class="row d-md-flex justify-content-center align-items-md-center">
    <div
      class="col-12 col-md-4 bg-danger rounded-circle"
      style="height: 264px; width: 264px"
    ></div>
    <div class="col-12 col-md-4">
      <div class="mb-4">
        <p class="fw-bold">選舉人數</p>
        <p class="text-danger">{{ commaNumber(dummyData.votersNum) }}</p>
      </div>
      <div class="row mb-4">
        <div class="col-6">
          <p class="fw-bold">投票率</p>
          <p class="text-danger">{{ commaNumber(dummyData.voteRate) }}</p>
        </div>
        <div class="col-6">
          <p class="fw-bold">投票數</p>
          <p class="text-danger">{{ commaNumber(dummyData.voteNum) }}</p>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-6">
          <p class="fw-bold">有效票數</p>
          <p class="text-danger">{{ commaNumber(dummyData.validVote) }}</p>
        </div>
        <div class="col-6">
          <p class="fw-bold">無效票數</p>
          <p class="text-danger">{{ commaNumber(dummyData.invalidVote) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { commaNumber } from '@/utils/base'

const dummyData = {
  votersNum: 19311843,
  voteRate: '75.45%',
  voteNum: 14345678,
  validVote: 14300940,
  invalidVote: 163631,
}
</script>
