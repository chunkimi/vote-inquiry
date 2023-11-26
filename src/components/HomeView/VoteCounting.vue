<template>
  <div class="d-flex px-2 px-lg-12 py-4 gap-8 align-items-center">
    <p class="h3 d-none d-md-block">{{ id }}號</p>
    <img
      :src="partyLogo"
      class="rounded-circle d-none d-lg-block"
      alt="party-logo"
      width="100"
      height="100"
    />
    <div class="d-grid gap-1">
      <img
        :src="avatar"
        class="rounded-circle"
        alt="candidate-avatar"
        width="100"
        height="100"
      />
      <p class="fs-3 fw-bolder text-center">{{ name }}</p>
    </div>
    <div class="d-grid gap-2">
      <p class="h5">得票數：{{ count }} 票</p>
      <p class="h5">得票率：{{ percentage }}%</p>
    </div>
    <div
      class="progress flex-grow-1 d-none d-md-flex"
      role="progressbar"
      aria-label="Voting Percentage"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuenow="percentage"
      :title="`${percentage}%`"
    >
      <div
        ref="progressBarPercentage"
        class="progress-bar"
        :class="progressColor"
        :style="{ width: `${percentage}%` }"
      >
        <span v-if="progressBarWidth > 30" ref="progressBarPercentage">
          {{ percentage }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useElementSize } from '@vueuse/core'
import partyMap from '@/data/party.json'

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  party: {
    type: String,
    required: true,
  },
  partyLogo: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  count: {
    type: String,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
})

const progressBarPercentage = ref(null)
const { width: progressBarWidth } = useElementSize(progressBarPercentage)

const progressColor = computed(() => {
  const colorCode = partyMap.codeMap[props.party]
  return colorCode ? `bg-${colorCode}` : ''
})
</script>
