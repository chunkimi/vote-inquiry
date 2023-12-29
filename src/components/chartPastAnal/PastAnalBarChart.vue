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
  legendPosition: {
    type: String,
    default: 'bottom',
  },
})

let chart = null

watch(
  () => props.data,
  () => {
    if (chart) {
      updateBarChart()
    } else {
      renderBarChart()
    }
  },
  { deep: true, immediate: true },
)

onBeforeUnmount(() => {
  chart.destroy()
})

async function renderBarChart() {
  await nextTick()

  const ctx = document.getElementById(`bar-chart-${props.id}`).getContext('2d')

  const { labels, votesCount } = props.data

  const config = {
    type: 'bar',
    data: {
      labels: labels,
      datasets: votesCount,
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

function updateBarChart() {
  const { labels, votesCount } = props.data
  ;(chart.data = {
    labels: labels,
    datasets: votesCount,
  }),
    chart.update()
}
</script>
