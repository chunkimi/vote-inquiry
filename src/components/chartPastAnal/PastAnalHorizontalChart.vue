<style lang="scss" scoped>
.horizontal-chart {
  width: 100%;
  height: 75vh;
}
</style>
<template>
  <div class="horizontal-chart text-center">
    <canvas :id="`horizontal-chart-${id}`"></canvas>
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
  data: {
    type: Object,
    required: true,
  },
})

let chart = null

watch(
  () => props.id,
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
    .getElementById(`horizontal-chart-${props.id}`)
    .getContext('2d')

  const config = {
    type: 'bar',
    data: props.data,
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        bar: {
          borderRadius: 4,
        },
      },
      plugins: {
        legend: {
          position: 'bottom',
          align: 'start',
        },
      },
      scales: {
        x: {
          stacked: true,
          max: 100,
        },
        y: {
          stacked: true,
        },
      },
    },
  }

  chart = new Chart(ctx, config)
}

function updateChart() {
  // const { labels, datasets } = props.data
  // ;(chart.data = {
  //   labels: labels,
  //   datasets: datasets,
  // }),
  chart.update()
}
</script>
