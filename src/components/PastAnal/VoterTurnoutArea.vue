<template>
  <h4 class="h4 mb-4">歷屆各區域投票率變化</h4>
  <!-- <PastAnalBarChart
    :data="barChartData"
    id="area-voter-turnout"
  ></PastAnalBarChart> -->
</template>
<script setup>
// import { computed } from 'vue'
// import PastAnalBarChart from '@/components/chartPastAnal/PastAnalBarChart.vue'
const props = defineProps({
  areaVotes: {
    type: Object,
    required: true,
  },
})
// const barChartData = {}
</script>
