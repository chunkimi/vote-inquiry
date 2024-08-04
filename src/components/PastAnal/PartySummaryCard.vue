<style lang="scss">
.partySum__card {
  width: 100%;
  height: 100%;
  min-height: 268px;
}
</style>
<template>
  <div class="row mb-4">
    <div
      class="col-12 col-md-4 mb-4"
      v-for="data in summaryCardData"
      :key="data.party"
    >
      <div class="partySum__card p-6 rounded border">
        <div class="text-end mb-4">
          <h4 class="h4 mb-4" :class="`text-${codeMap[data.party]}`">
            {{ data.party }}
          </h4>
          <h3 class="h3 mb-4">{{ commaNumber(data.voteNum) }}票</h3>
          <h4 class="h4 mb-4">
            {{ data.voterTurnout }}
          </h4>
        </div>
        <ul class="list-unstyled">
          <li class="text-gray-600">
            得票優勢{{ affiliatedArea }}數：{{
              !data.advantageAreaNum ? 0 : data.advantageAreaNum
            }}
          </li>
          <li class="text-gray-600">
            得票率最高{{ affiliatedArea }}：{{ data.highestArea }}
          </li>
          <li class="text-gray-600">
            得票率最低{{ affiliatedArea }}：{{ data.lowestArea }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'

import {
  filterSpecifyVotes,
  excludeTotalVotes,
  calAreaVoteRate,
  getVoteRateMaxMix,
} from '@/utils/votesAnal.js'
import { commaNumber } from '@/utils/base'

import party from '@/data/party.json'

const { codeMap } = party

const props = defineProps({
  originVotes: {
    type: Array,
    required: true,
  },
  dataField: {
    type: String,
    required: true,
  },
  affiliatedArea: {
    type: String,
    required: true,
  },
})
const summaryCardData = computed(() => {
  const specifyAnalysisVotes = filterSpecifyVotes(
    props.originVotes,
    props.dataField,
    '總計',
  )
  const partyVoteRate = getVoteRateMaxMix(props.originVotes, props.dataField)
  const party = Object.keys(specifyAnalysisVotes['候選人票數'])
  const eachAreaVotes = excludeTotalVotes(props.originVotes, props.dataField)
  const advantageData = filterPartyAdvantage(eachAreaVotes, props.dataField)
  const result = party.map((partyLabel) => {
    const partyVoteData = partyVoteRate[partyLabel]
    const advantageAreaNum = advantageData[partyLabel]
    const voteNum = parseFloat(specifyAnalysisVotes['候選人票數'][partyLabel])
    const voterTurnout =
      ((voteNum / specifyAnalysisVotes['有效票數']) * 100).toFixed(2) + '%'

    return {
      party: partyLabel,
      voteNum,
      voterTurnout,
      advantageAreaNum,
      highestArea: partyVoteData.highestArea['區域'],
      lowestArea: partyVoteData.lowestArea['區域'],
    }
  })

  result.sort((a, b) => parseFloat(b.voteNum) - parseFloat(a.voteNum))
  return result
})

function filterPartyAdvantage(voteData, dataField) {
  const { party, originVoteRate } = calAreaVoteRate(voteData, dataField)
  const result = {}
  const newData = party.map((partyName) => {
    const areas = originVoteRate
      .filter(
        (areaData) =>
          areaData[partyName] ===
          Math.max(
            areaData[party[0]],
            areaData[party[1]],
            areaData[party[2]],
          ).toFixed(4),
      )
      .map((areaData) => areaData[props.dataField])
    return {
      label: partyName,
      advantageArea: areas,
      advantageAreaNum: areas.length,
    }
  })
  newData.forEach((item) => {
    result[item.label] = item.advantageAreaNum
  })
  return result
}
</script>
