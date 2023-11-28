<style lang="scss" scoped>
.stacked-chart {
  width: 100%;
  height: 60px;
}
</style>

<template>
  <div class="stacked-chart text-center">
    <canvas :id="`stacked-chart-${id}`"></canvas>
  </div>
</template>

<script setup>
import { watch, nextTick, onBeforeUnmount } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  labels: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
})

let chart = null

watch(
  () => props.data,
  () => {
    if (chart) {
      updateChart()
    } else {
      renderChart()
    }
  },
  { deep: true, immediate: true },
)

onBeforeUnmount(() => {
  chart.destroy()
})

async function renderChart() {
  await nextTick()

  const ctx = document
    .getElementById(`stacked-chart-${props.id}`)
    .getContext('2d')

  const config = {
    type: 'bar',
    data: {
      labels: ['票數'],
      datasets: props.data,
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          stacked: true,
          display: false,
          grid: {
            display: false,
          },
          max: sumData(props.data),
        },
        y: {
          stacked: true,
          display: false,
          grid: {
            display: false,
          },
        },
      },
    },
  }

  chart = new Chart(ctx, config)
}

function updateChart() {
  chart.data.labels = props.labels
  chart.data.datasets = props.data
  chart.options.scales.x.max = sumData(props.data)
  chart.update()
}

function sumData(data) {
  return data.reduce((res, { data }) => (res += Number(data)), 0)
}
</script>
