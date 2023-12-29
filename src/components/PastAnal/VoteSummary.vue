<template>
  <h4 class="h4 mb-4">本屆{{ view }}投票摘要</h4>
  <div class="row">
    <div
      class="col-12 col-md-4 mb-4"
      v-for="data in cardData"
      :key="data.label"
    >
      <div class="voteSum__card p-6 rounded text-end bg-primary text-light">
        <h4 class="h4 mb-4 text-md-end fw-bold">
          {{ data.label }}
        </h4>
        <p class="display-3 text-end fw-bold">
          {{ data.text }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  view: {
    type: String,
    required: true,
  },
  analyzedData: {
    type: Array,
    required: true,
  },
})

const cardData = computed(() => {
  return [
    {
      label: '總投票率',
      text: '75.46%',
    },
    {
      label: '投票率最高區域',
      text: '臺北市',
    },
    {
      label: '投票率最低區域',
      text: '連江縣',
    },
  ]
})
</script>
