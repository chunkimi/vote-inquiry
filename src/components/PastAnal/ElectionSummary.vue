<template>
  <div class="d-md-flex justify-content-center align-items-md-end">
    <PastAnalPie id="past-election-summary" :data="pieData"></PastAnalPie>
    <div class="ms-md-4">
      <div class="mb-4">
        <p class="fw-bold">選舉人數</p>
        <p>{{ commaNumber(data['選舉人數']) }}</p>
      </div>
      <div class="row mb-4">
        <div class="col-6">
          <p class="fw-bold">投票率</p>
          <p>{{ percentage(data['投票率']) }}</p>
        </div>
        <div class="col-6">
          <p class="fw-bold">投票數</p>
          <p>{{ commaNumber(data['投票數']) }}</p>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-6">
          <p class="fw-bold">有效票數</p>
          <p>{{ commaNumber(data['有效票數']) }}</p>
        </div>
        <div class="col-6">
          <p class="fw-bold">無效票數</p>
          <p>{{ commaNumber(data['無效票數']) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import PastAnalPie from '../chartPastAnal/PastAnalPie.vue'
import { commaNumber, percentage } from '@/utils/base'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const labelColor = {
  有效票數: '#fad961',
  無效票數: '#e5e9ec',
}

const pieData = computed(() => {
  const { 有效票數, 無效票數 } = props.data
  return {
    votes: [有效票數, 無效票數],
    labels: Object.keys(labelColor),
    color: Object.keys(labelColor).map((label) => labelColor[label]),
  }
})
</script>
