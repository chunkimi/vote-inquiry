<style lang="scss" scoped>
.party-info {
  &__logo--shorten {
    width: 24px;
    height: 24px;
    line-height: 24px;
  }
}

.icon-vote-stamp {
  width: 18px;
  height: 18px;
  background-image: url('src/assets/icons/vote-stamp.svg');
  background-size: cover;
  vertical-align: -3px;
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
            <span
              :class="`bg-${partyMap.codeMap[party]}`"
              class="party-info__logo--shorten rounded-circle fs-7 d-inline-block text-center"
            >
              {{ party.charAt(0) }}
            </span>
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

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCurrentElectionStore } from '@/stores/currentElectionStore'
import { useMediaQuery } from '@vueuse/core'
import DonutChart from '@/components/chart/DonutChart.vue'
import StackedBarChart from '@/components/chart/StackedBarChart.vue'
import partyMap from '@/data/party.json'

const isMobile = useMediaQuery('(max-width: 767px)')

const currentElectionStore = useCurrentElectionStore()
const { city, district, currentCandidates } = storeToRefs(currentElectionStore)

const props = defineProps({
  vote: {
    type: Object,
    required: true,
  },
})

const title = computed(() => {
  return props.vote['村里別'] ? props.vote['村里別'] : props.vote['行政區別']
})

const list = computed(() => {
  const votes = (props.vote || {})['候選人票數'] || {}
  return currentCandidates.value.reduce((res, { party: partyName }) => {
    res.push({
      party: partyName,
      count: votes[partyName],
    })
    return res
  }, [])
})

const donutChartData = computed(() => {
  const votes = (props.vote || {})['候選人票數'] || {}
  return currentCandidates.value.reduce(
    (res, { party: partyName }) => {
      res.data.push(votes[partyName] || 0)
      res.labels.push(partyName)
      return res
    },
    { data: [], labels: [] },
  )
})

const stackedBarChartData = computed(() => {
  return (currentCandidates.value || []).map(({ party: partyName }, i) => {
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
  const votes = (props.vote || {})['候選人票數'] || {}
  const max = Math.max(...Object.values(votes))
  return Object.keys(votes).find((party) => votes[party] === max)
})

const isLastLevel = computed(() => !!props.vote['村里別'])

function submit() {
  if (!city.value) {
    city.value = props.vote['行政區別']
    return
  }

  if (!district.value) {
    district.value = props.vote['行政區別']
    return
  }
}
</script>
