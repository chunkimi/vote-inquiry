<style>
.vote-breakdown-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>
<template>
  <div class="vote-breakdown-wrapper d-grid gap-8">
    <AnalysisCard v-for="(vote, i) in votes" :key="i" :vote="vote" />
  </div>
</template>

<script lang="ts" setup>
import AnalysisCard from '@/components/AnalysisView/AnalysisCard.vue'
import type { VoteData } from '@/types'

defineProps<{
  votes: VoteData[]
}>()
</script>
