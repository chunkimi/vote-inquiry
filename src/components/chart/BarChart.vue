<style lang="scss" scoped>
.bar-chart {
  width: 100%;
  height: 300px;
}
</style>

<template>
  <div class="bar-chart text-center">
    <canvas :id="`bar-chart-${id}`"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { watch, nextTick, onBeforeUnmount } from 'vue'
import Chart, { LegendOptions } from 'chart.js/auto'

type BarChart = Chart<'bar', number[], string>

const props = defineProps<{
  id: string
  labels: BarChart['data']['labels']
  data: BarChart['data']['datasets']
  legendPosition?: LegendOptions<'bar'>['position']
}>()

let chart: BarChart | null = null

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
    `bar-chart-${props.id}`,
  ) as HTMLCanvasElement | null

  const ctx = canvasElement?.getContext('2d')
  if (!ctx) return

  const config: BarChart['config'] = {
    type: 'bar',
    data: {
      labels: props.labels,
      datasets: props.data,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        bar: {
          borderRadius: 4,
        },
      },
      plugins: {
        legend: {
          position: props.legendPosition,
          align: 'start',
          labels: {
            boxWidth: 21,
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
  chart.update()
}
</script>
