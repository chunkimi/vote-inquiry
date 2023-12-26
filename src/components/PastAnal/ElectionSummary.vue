<style lang="scss" scoped>
.past-analysis-pie {
  width: 100%;
  max-width: 300px;
  max-height: 300px;
}
</style>
<template>
  <div class="d-md-flex justify-content-center align-items-md-end">
    <div class="past-analysis-pie mx-auto mx-md-2 mb-4">
      <VoteRatePie id="past-election" :data="pieData"></VoteRatePie>
    </div>
    <div>
      <div class="mb-4">
        <p class="fw-bold">選舉人數</p>
        <p class="text-danger">{{ commaNumber(votesData['選舉人數']) }}</p>
      </div>
      <div class="row mb-4">
        <div class="col-6">
          <p class="fw-bold">投票率</p>
          <p class="text-danger">{{ percentage(votesData['投票率']) }}</p>
        </div>
        <div class="col-6">
          <p class="fw-bold">投票數</p>
          <p class="text-danger">{{ commaNumber(votesData['投票數']) }}</p>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-6">
          <p class="fw-bold">有效票數</p>
          <p class="text-danger">{{ commaNumber(votesData['有效票數']) }}</p>
        </div>
        <div class="col-6">
          <p class="fw-bold">無效票數</p>
          <p class="text-danger">{{ commaNumber(votesData['無效票數']) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import VoteRatePie from '../chartPastAnal/VoteRatePie.vue'
import { commaNumber, percentage } from '@/utils/base'

const props = defineProps({
  votesData: {
    type: Object,
    required: true,
  },
})

const pieData = computed(() => {
  const { 投票數, 有效票數, 無效票數 } = props.votesData
  const validPercentage = (有效票數 / 投票數) * 100
  const invalidPercentage = (無效票數 / 投票數) * 100
  return {
    votes: [validPercentage, invalidPercentage],
    labels: ['有效票數', '無效票數'],
    color: ['#FAD961', '#E5E9EC'],
  }
})
</script>
