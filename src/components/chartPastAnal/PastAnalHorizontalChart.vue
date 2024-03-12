<style lang="scss" scoped>
.horizontal-chart {
  height: 75vh;
  width: 100%;
  &__wrap {
    overflow-y: scroll;
    max-height: 400px;
  }
  &__container {
    position: relative;
    height: 75vh;
  }
}
</style>
<template>
  <div :class="{ 'horizontal-chart__wrap': isShowScrollY }">
    <div
      class="horizontal-chart text-center"
      :class="{ 'horizontal-chart__container': isShowScrollY }"
    >
      <canvas :id="`horizontal-chart-${id}`"></canvas>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, nextTick, onBeforeUnmount } from 'vue'
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

const scrollYRule = 10
const scrollYNum = props.data.labels.length
const isShowScrollY = computed(() => (scrollYNum > scrollYRule ? true : false))

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

  if (chart) {
    chart.destroy()
  }
  const ctx = document
    .getElementById(`horizontal-chart-${props.id}`)
    .getContext('2d')

  const config = {
    type: 'bar',
    data: props.data,
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: !isShowScrollY.value,
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
  const { labels, datasets } = props.data
  ;(chart.data = {
    labels: labels,
    datasets: datasets,
  }),
    chart.update()
}
</script>
