<style lang="scss" scoped>
.past-analysis-pie {
  width: 100%;
  max-width: 246px;
  max-height: 246px;
  margin: 0 auto;
}
</style>
<template>
  <div class="row d-md-flex justify-content-center">
    <div class="col-12 col-md-4">
      <canvas id="pie-chart-past"></canvas>
    </div>
    <div class="col-12 col-md-4 d-md-flex align-items-md-center">
      <template>
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
      </template>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted } from 'vue'
import Chart from 'chart.js/auto'

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
    validPercentage,
    invalidPercentage,
  }
})

function renderPieChart() {
  const ctx = document.getElementById('pie-chart-past').getContext('2d')

  const chartData = {
    labels: ['有效票數', '無效票數'],
    datasets: [
      {
        data: [pieData.value.validPercentage, pieData.value.invalidPercentage],
        backgroundColor: ['#FAD961', '#E5E9EC'],
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
    },
  }

  new Chart(ctx, {
    type: 'pie',
    data: chartData,
    options: chartOptions,
  })
}
onMounted(() => {
  renderPieChart()
})
</script>
