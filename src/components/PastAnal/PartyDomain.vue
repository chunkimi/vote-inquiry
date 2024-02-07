<style lang="scss">
@import '@/styles/main.scss';

.domain__card {
  width: 100%;
  height: 100%;
  min-height: 236px;
}
</style>
<template>
  <h4 class="h4 mb-4">{{ curStatus }}本屆{{ affiliatedArea }}政黨版圖變動</h4>
  <div class="row">
    <div
      class="col-6 col-md-3 mb-1 mb-md-4"
      v-for="area in domainData"
      :key="area[dataField]"
    >
      <div
        :class="`bg-${area.backgroundColor}`"
        class="domain__card p-6 rounded"
      >
        <h3 class="h3 text-end mb-4">
          {{ area[dataField] }}
        </h3>
        <div class="mb-4">
          <p class="mb-2">本屆得票優勢政黨</p>
          <h4 class="h4">
            {{ area['本屆優勢政黨'] }}
          </h4>
        </div>
        <div>
          <p class="mb-2">前屆得票優勢政黨</p>
          <h6 class="h6">
            {{ area['前屆優勢政黨'] }}
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import { filterOldPlaceName } from '@/utils/votesAnal.js'
import city_id_map from '@/data/city_id_map.json'
import taoyuan_id_map from '@/data/taoyuan_id_map.json'
import upgradedDistrict_id_map from '@/data/upgraded-district_id_map.json'

import party from '@/data/party.json'
import { allYears } from '@/utils/electionInfo.js'

const props = defineProps({
  variousRegionsVotes: {
    type: Object,
    required: true,
  },
  curYear: {
    type: String,
    required: true,
  },
  curCity: {
    type: String,
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
  dataField: {
    type: String,
    required: true,
  },
})

const domainData = computed(() => {
  if (props.curYear === '2012') return []
  const areaDominantParty = getAreaDominantParty(props.variousRegionsVotes)
  const changedDomainData = getChangedDomain(areaDominantParty)

  return changedDomainData
})

function getAreaDominantParty(areaVotes) {
  const yearKeys = Object.keys(areaVotes)
  const rawAllAreas = Array.from(
    new Set(
      Object.values(areaVotes).flatMap((votes) =>
        votes.map((vote) => vote[props.dataField]),
      ),
    ),
  )
  const allAreas = filterOldPlaceName(
    rawAllAreas,
    props.curCity.includes('桃園'),
  )
  const rawDominantParty = allAreas.map((area) => {
    const areaData = { 行政區別: area, 優勢政黨: {} }
    const isTaoyuanView = props.curCity.includes('桃園')
    const areaIdMap = isTaoyuanView ? taoyuan_id_map : city_id_map
    const isIncludeUpgradedDistrict =
      props.curCity.includes('彰化') || props.curCity.includes('苗栗')

    yearKeys.forEach((yearIndex) => {
      let matchedArea = {}

      const areaVotesOfYear = props.variousRegionsVotes[yearIndex].find(
        (vote) => {
          const isTaoyuanCity =
            area === '桃園市' && vote[props.dataField] === '桃園縣'
          if (isTaoyuanCity || isTaoyuanView) {
            return areaIdMap[area] === areaIdMap[vote[props.dataField]]
          } else if (isIncludeUpgradedDistrict) {
            const areaName = area.replace(/市$|鄉$|區$|鎮$/, '')
            const isUpgradedDistrict =
              upgradedDistrict_id_map[`${props.curCity}`].includes(areaName)
            if (isUpgradedDistrict) {
              return (
                upgradedDistrict_id_map[area] ===
                upgradedDistrict_id_map[vote[props.dataField]]
              )
            } else {
              return vote[props.dataField] === area
            }
          } else {
            return vote[props.dataField] === area
          }
        },
      )

      if (areaVotesOfYear) {
        matchedArea = areaVotesOfYear
      }
      areaData['優勢政黨'][yearIndex] = getDominantParty(
        matchedArea['候選人票數'],
      )
    })
    return areaData
  })

  return rawDominantParty
}

function getDominantParty(allVotes) {
  const candidatesArr = Object.keys(allVotes)
  let dominantParty = ''
  let maxVotes = 0

  candidatesArr.forEach((candidate) => {
    if (allVotes[candidate] > maxVotes) {
      maxVotes = allVotes[candidate]
      dominantParty = candidate
    }
  })

  return dominantParty
}

function getChangedDomain(rawVotes) {
  const newData = []

  const sortedYears = allYears.map((item) => Number(item)).sort((a, b) => b - a)

  rawVotes.forEach((area) => {
    const curYearDominantParty = area['優勢政黨'][`vote${props.curYear}`]
    const curYearIndex = sortedYears.indexOf(Number(props.curYear))
    const prevYear = sortedYears[curYearIndex + 1]
    const prevYearDominantParty = area['優勢政黨'][`vote${prevYear}`]

    if (curYearDominantParty !== prevYearDominantParty) {
      newData.push({
        行政區別: area[props.dataField],
        本屆優勢政黨: curYearDominantParty,
        前屆優勢政黨: prevYearDominantParty,
        backgroundColor: party.codeMap[curYearDominantParty],
      })
    }
  })

  return newData
}
</script>
