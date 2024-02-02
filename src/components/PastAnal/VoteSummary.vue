<template>
  <h4 class="h4 mb-4">本屆{{ curStatus }}投票摘要</h4>
  <div class="row">
    <div
      class="col-12 col-md-4 mb-4"
      v-for="data in cardData"
      :key="data.label"
    >
      <div class="h-100 p-6 rounded text-end bg-primary text-light">
        <h4 class="h4 mb-4 text-md-end fw-bold">
          {{ data.label }}
        </h4>
        <p class="display-4 text-end fw-bold">
          {{ data.text }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { percentage } from '@/utils/base.js'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  curStatus: {
    type: String,
    required: true,
  },

  affiliatedArea: {
    type: String,
    required: true,
  },
})

const cardData = computed(() => {
  return [
    {
      label: '總投票率',
      text: percentage(props.data.totalVoterTurnout),
    },
    {
      label: `投票率最高${props.affiliatedArea}`,
      text: props.data.highestArea,
    },
    {
      label: `投票率最低${props.affiliatedArea}`,
      text: props.data.lowestArea,
    },
  ]
})
</script>
