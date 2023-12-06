<style lang="scss" scoped>
.icon-vote-stamp {
  width: 18px;
  height: 18px;
}

.analysis-card__footer {
  span {
    cursor: pointer;
  }
}
</style>
<template>
  <div class="card">
    <div class="card-header text-center fs-5 fw-semibold">{{ title }}</div>
    <div class="card-body p-6 d-flex flex-column gap-4">
      <StackedBarChart
        v-if="isMobile"
        :id="title"
        :data="stackedBarChartData"
        :labels="['票數']"
      />
      <DonutChart v-else :id="title" :data="donutChartData" />
      <p class="fs-5 fw-semibold text-center">開票率：100.0%</p>
      <ul class="list-group list-group-flush">
        <li
          v-for="({ count, party }, i) in list"
          :key="i"
          class="list-group-item text-primary d-flex justify-content-between align-items-center gap-2"
        >
          <span class="party-info d-inline-flex align-items-center gap-2">
            <PartyLogo :party="party" size="shorten" />
            <span class="fs-5">{{ party }}</span>
            <span
              v-if="party === winner"
              class="d-inline-block icon-vote-stamp"
            ></span>
          </span>

          <span>{{ count.toLocaleString() }}</span>
        </li>
      </ul>
    </div>
    <div
      v-if="!isLastLevel"
      class="analysis-card__footer card-footer bg-white text-decoration-underline text-center"
    >
      <span @click="submit">查看詳細數據</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCurrentElectionStore } from '@/stores/currentElectionStore'
import { useMediaQuery } from '@vueuse/core'
import DonutChart from '@/components/chart/DonutChart.vue'
import StackedBarChart from '@/components/chart/StackedBarChart.vue'
import PartyLogo from '@/components/common/PartyLogo.vue'
import partyMap from '@/data/party.json'
import type { VoteData, CandidateVotes } from '@/types'

const isMobile = useMediaQuery('(max-width: 767px)')

const currentElectionStore = useCurrentElectionStore()
const { city, district, currentCandidates } = storeToRefs(currentElectionStore)

const props = defineProps<{
  vote: VoteData
}>()

const title = computed(() => {
  return props.vote['村里別'] ? props.vote['村里別'] : props.vote['行政區別']
})

const list = computed(() => {
  const votes = props.vote?.['候選人票數']
  return currentCandidates.value.reduce(
    (res, { party: partyName }) => {
      res.push({
        party: partyName,
        count: votes[partyName],
      })
      return res
    },
    [] as { party: keyof CandidateVotes; count: number }[],
  )
})

const donutChartData = computed(() => {
  const votes = props.vote?.['候選人票數']
  return currentCandidates.value.reduce(
    (res, { party: partyName }) => {
      res.data.push(votes[partyName])
      res.labels.push(partyName)
      return res
    },
    { data: [] as number[], labels: [] as (keyof CandidateVotes)[] },
  )
})

const stackedBarChartData = computed(() => {
  return currentCandidates.value.map(({ party: partyName }, i) => {
    const borderRadius =
      i === 0
        ? {
            topLeft: 4,
            bottomLeft: 4,
          }
        : i === currentCandidates.value.length - 1
          ? {
              topRight: 4,
              bottomRight: 4,
            }
          : 0
    return {
      label: partyName,
      data: [props.vote['候選人票數'][partyName]],
      backgroundColor: partyMap.colorMap[partyName],
      borderRadius,
      borderSkipped: false,
    }
  })
})

const winner = computed(() => {
  const votes = props.vote?.['候選人票數']
  const max = Math.max(...Object.values(votes))
  return Object.keys(votes).find(
    (party) => votes[party as keyof CandidateVotes] === max,
  )
})

const isLastLevel = computed(() => !!props.vote['村里別'])

function scrollTo() {
  setTimeout(() => {
    const element: HTMLHeadingElement | null =
      document.querySelector('#breakdown')
    const top = element?.getBoundingClientRect().top || 0
    window.scrollTo({
      top: window.scrollY + top,
      behavior: 'smooth',
    })
  }, 500)
}
function submit() {
  if (!city.value) {
    city.value = props.vote['行政區別']
    scrollTo()
    return
  }

  if (!district.value) {
    district.value = props.vote['行政區別']
    scrollTo()
  }
}
</script>
