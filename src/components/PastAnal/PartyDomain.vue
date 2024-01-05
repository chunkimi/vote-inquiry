<style lang="scss">
@import '@/styles/main.scss';

.domain__card {
  width: 100%;
  height: 100%;
  min-height: 236px;
}
</style>
<template>
  <h4 class="h4 mb-4">本屆政黨版圖變動區域</h4>
  <div class="row">
    <div
      class="col-6 col-md-3 mb-1 mb-md-4"
      v-for="area in domainData"
      :key="area['行政區別']"
    >
      <div
        :class="`bg-${area.backgroundColor}`"
        class="domain__card p-6 rounded"
      >
        <h3 class="h3 text-end mb-4">
          {{ area['行政區別'] }}
        </h3>
        <div class="mb-4">
          <p class="mb-2">本屆得票優勢政黨</p>
          <h4 class="h4">
            {{ area['本屆優勢政黨'] }}
          </h4>
        </div>
        <div class="mb-4">
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
import { storeToRefs } from 'pinia'
import { usePastElectionStore } from '@/stores/pastVotesStore.js'

import city_id_map from '@/data/city_id_map.json'
import party from '@/data/party.json'
import { allYears } from '@/utils/electionInfo.js'

const { curYear, curCity } = storeToRefs(usePastElectionStore())

const props = defineProps({
  areaVotes: {
    type: Object,
    required: true,
  },
})

const domainData = computed(() => {
  if (curYear.value === '2012') return []
  const areaDominantParty = getAreaDominantParty(props.areaVotes)
  const changedDomainData = getChangedDomain(areaDominantParty)

  return changedDomainData
})

function filterOldPlaceName(rawAllAreas, isAdministrativeDistrict) {
  let result = []
  if (isAdministrativeDistrict) {
    result = rawAllAreas.filter((area) => {
      if (area.endsWith('區')) {
        return true
      }
      if (area.endsWith('鄉') || area.endsWith('鎮') || area === '桃園市') {
        return false
      }
      return true
    })
  } else {
    result = rawAllAreas.filter((area) => area !== '桃園縣')
  }
  return result
}

function getAreaDominantParty(areaVotes) {
  const yearKeys = Object.keys(areaVotes)
  const rawAllAreas = Array.from(
    new Set(
      Object.values(areaVotes).flatMap((votes) =>
        votes.map((vote) => vote['行政區別']),
      ),
    ),
  )
  const allAreas = filterOldPlaceName(
    rawAllAreas,
    curCity.value.includes('桃園'),
  )
  const rawDominantParty = allAreas.map((area) => {
    const areaData = { 行政區別: area, 優勢政黨: {} }
    const areaName = curCity.value.includes('桃園')
      ? area.replace(/市$|鄉$|區$|鎮$/, '')
      : ''
    yearKeys.forEach((yearIndex) => {
      let matchedArea = {}
      if (curCity.value.includes('桃園')) {
        matchedArea = areaVotes[yearIndex].find((item) =>
          item['行政區別'].includes(areaName),
        )
      } else {
        const areaVotesOfYear = areaVotes[yearIndex].find((vote) => {
          if (area === '桃園市' && vote['行政區別'] === '桃園縣') {
            return city_id_map[area] === city_id_map[vote['行政區別']]
          } else {
            return vote['行政區別'] === area
          }
        })
        if (areaVotesOfYear) {
          matchedArea = areaVotesOfYear
        }
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
    const curYearDominantParty = area['優勢政黨'][`vote${curYear.value}`]
    const curYearIndex = sortedYears.indexOf(Number(curYear.value))
    const prevYear = sortedYears[curYearIndex + 1]
    const prevYearDominantParty = area['優勢政黨'][`vote${prevYear}`]

    if (curYearDominantParty !== prevYearDominantParty) {
      newData.push({
        行政區別: area['行政區別'],
        本屆優勢政黨: curYearDominantParty,
        前屆優勢政黨: prevYearDominantParty,
        backgroundColor: party.codeMap[curYearDominantParty],
      })
    }
  })

  return newData
}
</script>
