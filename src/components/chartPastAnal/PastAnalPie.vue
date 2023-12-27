<style lang="scss" scoped>
.past-pie {
  width: 100%;
  max-width: 300px;
  max-height: 300px;
}
</style>
<template>
  <div class="past-pie mx-md-2 mb-4">
    <div class="text-center"><canvas :id="`pie-chart-${id}`"></canvas></div>
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

  const config = {
    type: 'pie',
    data: {
      labels: props.data.labels,
      datasets: [
        {
          data: props.data.votes,
          backgroundColor: props.data.color,
        },
      ],
    },
    options: {
      plugins: {
        responsive: true,
        legend: {
          display: false,
        },
      },
    },
  }

  chart = new Chart(ctx, config)
}

function updatePieChart() {
  ;(chart.data = {
    labels: props.data.labels,
    datasets: [
      {
        data: props.data.votes,
        backgroundColor: props.data.color,
      },
    ],
  }),
    chart.update()
}
</script>
