<template>
  <div class="text-center">
    <canvas :id="`pie-chart-${id}`"></canvas>
  </div>
</template>
<script setup>
import { watch, nextTick } from 'vue'
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
      updatePieChart()
    } else {
      renderPieChart()
    }
  },
  { deep: true, immediate: true },
)

async function renderPieChart() {
  await nextTick()
  const ctx = document.getElementById(`pie-chart-${props.id}`).getContext('2d')
  const chartData = {
    labels: props.data.labels,
    datasets: [
      {
        data: props.data.votes,
        backgroundColor: props.data.color,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
    },
  }

  chart = new Chart(ctx, {
    type: 'pie',
    data: chartData,
    options: chartOptions,
  })
}

function updatePieChart() {
  chart.data.labels = props.data.labels
  chart.data.datasets[0].data = props.data.votes
  chart.data.datasets[0].data = props.data.color
  chart.update()
}
</script>
