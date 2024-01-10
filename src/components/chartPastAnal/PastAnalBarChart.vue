<style lang="scss" scoped>
.bar-chart {
  height: 300px;
  &__wrap {
    overflow-x: scroll;
    width: 100%;
    max-width: 596px;
  }
  &__container {
    position: relative;
    width: 1096px;
  }
}
</style>

<template>
  <div :class="{ 'bar-chart__wrap': isShowScrollbarX }">
    <div
      class="bar-chart text-center"
      :class="{ 'bar-chart__container': isShowScrollbarX }"
    >
      <canvas :id="`bar-chart-${id}`"></canvas>
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
  legendPosition: {
    type: String,
    default: 'bottom',
  },
})

const scrollXRule = 10
const scrollXNum = props.data.datasets[0].data.length
const isShowScrollbarX = computed(() =>
  scrollXNum > scrollXRule ? true : false,
)

let chart = null

watch(
  () => props.data || props.id,
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
  const options = {
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
    responsive: true,
    maintainAspectRatio: isShowScrollbarX.value.value ? true : false,
  }

  const config = {
    type: 'bar',
    data: props.data,
    options,
  }
  chart = new Chart(ctx, config)
}

function updateBarChart() {
  const { labels, datasets } = props.data
  ;(chart.data = {
    labels: labels,
    datasets: datasets,
  }),
    chart.update()
}
</script>
