<template>
  <h4 class="h4 mb-8">
    <i class="bi bi-joystick me-2"></i>{{ status }}投票情況
  </h4>
  <div v-if="status === '全國'">
    <VoteMap :data="voteMapData"></VoteMap>
  </div>
  <div v-else>"BarChart"</div>
</template>
<script setup>
import { computed } from 'vue'
import VoteMap from '@/components/common/VoteMap.vue'

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
  votes: {
    type: Array,
    required: true,
  },
})

const voteMapData = computed(() => {
  return (props.votes || []).map((row) => {
    const winner = Object.keys(row['候選人票數']).reduce((a, b) =>
      row['候選人票數'][a] > row['候選人票數'][b] ? a : b,
    )
    return {
      city: row['行政區別'],
      party: winner,
      count: row['候選人票數'][winner].toLocaleString(),
    }
  })
})
// 目前先以全國資料跑圖表
// const voteStatusData = ''
</script>
