<style lang="scss" scoped>
.line-chart {
  width: 100%;
  height: 300px;
}
</style>

<template>
  <div class="line-chart text-center">
    <canvas :id="`line-chart-${id}`"></canvas>
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

  const ctx = document.getElementById(`line-chart-${props.id}`).getContext('2d')

  const { labels, data } = props.data

  const config = {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: '投票率',
          data: data,
          borderColor: '#00BCF5',
          backgroundColor: '#00BCF5',
          tension: 0.2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          align: 'start',
        },
      },
      scales: {
        y: {
          stacked: true,
          min: 0,
          max: 100,
        },
      },
    },
  }

  chart = new Chart(ctx, config)
}

function updateChart() {
  const { labels, datasets } = props.data
  ;(chart.data = {
    labels: labels,
    datasets: datasets,
  }),
    chart.update()
}
</script>
