<template>
  <div class="text-center">
    <canvas :id="`donut-chart-${id}`"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { watch, nextTick, onBeforeUnmount } from 'vue'
import Chart from 'chart.js/auto'
import party from '@/data/party.json'
import type { CandidateVotes } from '@/types'

type DonutChart = Chart<'doughnut', number[], keyof CandidateVotes>

const props = defineProps<{
  id: string
  data: {
    data: number[]
    labels: (keyof CandidateVotes)[]
  }
}>()

let chart: DonutChart | null = null

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
    `donut-chart-${props.id}`,
  ) as HTMLCanvasElement | null

  const ctx = canvasElement?.getContext('2d')
  if (!ctx) return

  const config: DonutChart['config'] = {
    type: 'doughnut',
    data: {
      labels: props.data.labels,
      datasets: [
        {
          data: props.data.data,
          backgroundColor: props.data.labels.map(
            (name) => party.colorMap[name],
          ),
        },
      ],
    },
    options: {
      responsive: true,
      layout: {
        padding: 30,
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  }

  chart = new Chart(ctx, config)
}

function updateChart() {
  if (!chart) return
  chart.data.labels = props.data.labels
  chart.data.datasets[0].data = props.data.data
  ;(chart.data.datasets[0].backgroundColor = props.data.labels.map(
    (name) => party.colorMap[name],
  )),
    chart.update()
}
</script>
