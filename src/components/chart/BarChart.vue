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
  labels: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
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

  const ctx = document.getElementById(`bar-chart-${props.id}`).getContext('2d')

  const config = {
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
  chart.data.labels = props.labels
  chart.data.datasets = props.data
  chart.update()
}
</script>
