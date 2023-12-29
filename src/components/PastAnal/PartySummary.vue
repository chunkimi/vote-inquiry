<style lang="scss">
@import '@/styles/main.scss';

.partySum__card {
  width: 100%;
  height: 100%;
  min-height: 268px;
}
</style>
<template>
  <h4 class="h4 mb-4">本屆政黨{{ curStatus }}得票</h4>
  <div class="row mb-4">
    <div
      class="col-12 col-md-4 mb-4"
      v-for="data in summaryCardData"
      :key="data.party"
    >
      <div class="p-6 rounded border">
        <div class="text-end mb-4">
          <h4 class="h4 mb-4" :class="`text-${codeMap[data.party]}`">
            {{ data.party }}
          </h4>
          <h3 class="h3 mb-4">{{ commaNumber(data.voteNum) }}票</h3>
          <h4 class="h4 mb-4">
            {{ percentage(data.voterTurnout) }}
          </h4>
        </div>
        <ul class="list-unstyled">
          <li class="text-gray-600">
            得票優勢縣市數：{{ data.advantageAreaNum }}
          </li>
          <li class="text-gray-600">得票率最高縣市：{{ data.heightArea }}</li>
          <li class="text-gray-600">得票率最低縣市：{{ data.lowestArea }}</li>
        </ul>
      </div>
    </div>
  </div>
  <PartyTurnout v-if="isDesktop" class="mb-4"></PartyTurnout>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { usePastElectionStore } from '@/stores/pastVotesStore.js'

import { commaNumber, percentage } from '@/utils/base'
import party from '@/data/party.json'

import { useMediaQuery } from '@vueuse/core'

import PartyTurnout from '@/components/PastAnal/PartyTurnout.vue'

const isDesktop = useMediaQuery('(min-width: 767px)')

const { curStatus } = storeToRefs(usePastElectionStore())
const { codeMap } = party

const summaryCardData = [
  {
    party: '金色曠野同盟',
    voteNum: '1234567',
    voterTurnout: 23.123,
    advantageAreaNum: 10,
    heightArea: '臺北市',
    lowestArea: '臺北市',
  },
  {
    party: '蔚藍海岸陣線',
    voteNum: '1234567',
    voterTurnout: 23.123,
    advantageAreaNum: 10,
    heightArea: '臺北市',
    lowestArea: '臺北市',
  },
  {
    party: '鬱蔥雨林聯盟',
    voteNum: '1234567',
    voterTurnout: 23.123,
    advantageCityNum: 10,
    heightArea: '臺北市',
    lowestArea: '臺北市',
  },
]
</script>
