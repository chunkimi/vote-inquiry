<template>
  <div class="text-center">
    <canvas :id="`donut-chart-${id}`"></canvas>
  </div>
</template>

<script setup>
import { watch, nextTick } from 'vue'
import Chart from 'chart.js/auto'
import party from '@/data/party.json'

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

async function renderChart() {
  await nextTick()

  const ctx = document
    .getElementById(`donut-chart-${props.id}`)
    .getContext('2d')

  const config = {
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
  chart.data.labels = props.data.labels
  chart.data.datasets[0].data = props.data.data
  ;(chart.data.datasets[0].backgroundColor = props.data.labels.map(
    (name) => party.colorMap[name],
  )),
    chart.update()
}
</script>
