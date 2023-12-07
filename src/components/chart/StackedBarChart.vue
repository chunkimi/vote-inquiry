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

<script lang="ts" setup>
import { watch, nextTick, onBeforeUnmount } from 'vue'
import Chart from 'chart.js/auto'

type StackedBarChart = Chart<'bar', number[], string>

const props = defineProps<{
  id: string
  labels: StackedBarChart['data']['labels']
  data: StackedBarChart['data']['datasets']
}>()

let chart: StackedBarChart | null = null

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
  chart?.destroy()
})

async function renderChart() {
  await nextTick()

  const canvasElement = document.getElementById(
    `stacked-chart-${props.id}`,
  ) as HTMLCanvasElement | null

  const ctx = canvasElement?.getContext('2d')
  if (!ctx) return

  const config: StackedBarChart['config'] = {
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
  if (!chart) return
  chart.data.labels = props.labels
  chart.data.datasets = props.data
  if (chart.options.scales?.x) {
    chart.options.scales.x.max = sumData(props.data)
  }
  chart.update()
}

function sumData(data: StackedBarChart['data']['datasets']) {
  return data.reduce((res, { data }) => (res += Number(data)), 0)
}
</script>
