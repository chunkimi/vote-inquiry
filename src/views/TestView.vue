<template>
  <h2 class="h2">測試Test畫面</h2>
  <div>
    <TermMenu
      :election-years="allYears"
      :is-link-nav="true"
      v-model:selected-year="curYear"
    ></TermMenu>
    <h2 class="h2 mb-8 text-end">
      <span class="text-danger">這是元件內初始：{{ curYear }}</span>
    </h2>
    <h2 class="h2 mb-8 text-end">
      <span class="text-danger">這是鏡射回來的：{{ mirrorYear }}</span>
    </h2>
  </div>
  <div class="mt-8">
    <p>這是選票</p>
    <p class="mt-8">{{ votes }}</p>
  </div>
  <div class="mt-8">
    <p>這是候選人</p>
    <p class="mt-8">{{ currentCandidates }}</p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePastElectionStore } from '../stores/testStore.js'
import { allYears } from '@/utils/electionInfo.js'
import TermMenu from '@/components/common/TermMenu.vue'

const route = useRoute()
const yearId = computed(() => route.params.year)
const curYear = ref(yearId)

const pastElectionStore = usePastElectionStore()

watch(
  curYear,
  (newYear) => {
    pastElectionStore.setSpecifyYear(newYear)
  },
  { immediate: true },
)

const votes = computed(() => pastElectionStore.votes)
const currentCandidates = computed(() => pastElectionStore.currentCandidates)
// 測試，鏡射值
const mirrorYear = computed(() => pastElectionStore.mirrorYear)
</script>
