<template>
  <h4 class="h4 mb-4">{{ curStatus }}歷屆{{ affiliatedArea }}投票率變化</h4>
  <PastAnalBarChart
    :data="barChartData"
    id="area-voter-turnout"
  ></PastAnalBarChart>
</template>
<script setup>
import { computed } from 'vue'

import { filterOldPlaceName } from '@/utils/votesAnal.js'
import city_id_map from '@/data/city_id_map.json'
import taoyuan_id_map from '@/data/taoyuan_id_map.json'
import upgradedDistrict_id_map from '@/data/upgraded-district_id_map.json'

import PastAnalBarChart from '@/components/chartPastAnal/PastAnalBarChart.vue'

const props = defineProps({
  areaVotes: {
    type: Object,
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
  dataField: {
    type: String,
    required: true,
  },
  affiliatedArea: {
    type: String,
    required: true,
  },
})

const yearColor = {
  vote2020: '#75B798',
  vote2016: '#A3CFBB',
  vote2012: '#D1E7DD',
}

const barChartData = computed(() => {
  const yearKeys = Object.keys(props.areaVotes)

  const rawAllAreas = Array.from(
    new Set(
      Object.values(props.areaVotes).flatMap((votes) =>
        votes.map((vote) => vote[props.dataField]),
      ),
    ),
  )
  const allAreas = filterOldPlaceName(
    rawAllAreas,
    props.curCity.includes('桃園'),
  )

  const rawAreaVoterTurnout = allAreas.map((area) => {
    const areaData = { 行政區別: area, 歷屆投票率: {} }
    const isTaoyuanView = props.curCity.includes('桃園')
    const areaIdMap = isTaoyuanView ? taoyuan_id_map : city_id_map
    const isIncludeUpgradedDistrict =
      props.curCity.includes('彰化') || props.curCity.includes('苗栗')

    yearKeys.forEach((yearIndex) => {
      let matchedArea = {}

      const areaVotesOfYear = props.areaVotes[yearIndex].find((vote) => {
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
      })

      if (areaVotesOfYear) {
        matchedArea = areaVotesOfYear
      }
      areaData['歷屆投票率'][yearIndex] = Number(
        matchedArea['投票率'].toFixed(2),
      )
    })
    return areaData
  })

  const datasets = []
  const sortVotesKeys = yearKeys
    .map((item) => item.replace('vote', ''))
    .sort((a, b) => parseFloat(a) - parseFloat(b))

  sortVotesKeys.forEach((yearNumber) => {
    const label = yearNumber
    const yearIndex = `vote${yearNumber}`
    const backgroundColor = yearColor[yearIndex]

    const data = rawAreaVoterTurnout.map(
      (area) => area['歷屆投票率'][yearIndex],
    )
    const result = {
      label,
      data,
      backgroundColor,
    }
    datasets.push(result)
  })

  return {
    labels: allAreas,
    datasets,
  }
})
</script>
