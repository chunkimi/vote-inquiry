<template>
  <div id="map-container" class="text-center">
    <svg id="map" class="mx-auto" width="688" height="600"></svg>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import taiwanTopojson from '@/data/tw-topo.json'
import cityIdMap from '@/data/city_id_map.json'
import partyMap from '@/data/party.json'

const props = defineProps({
  data: {
    type: Array, // [{ city, party }], e.g. { city: '臺北市', party: '金色曠野同盟', count: 213 }
    required: true,
  },
})

const voteMapData = computed(() => {
  return (props.data || []).reduce((acc, { city, party, count }) => {
    acc[cityIdMap[city]] = {
      city,
      party,
      color: partyMap.colorMap[party],
      count,
    }
    return acc
  }, {})
})

const mapRendered = ref(false)

watch(
  () => props.data,
  () => {
    if (mapRendered.value) {
      updateMap()
    } else {
      drawMap()
      mapRendered.value = true
    }
  },
  { immediate: true },
)

async function drawMap() {
  await nextTick()

  const svg = d3.select('#map')
  const width = +svg.attr('width')
  const height = +svg.attr('height')

  const projection = d3
    .geoMercator()
    .center([121, 24])
    .scale(8000)
    .translate([width / 2, height / 2.5])

  const path = d3.geoPath().projection(projection)
  svg
    .selectAll('path')
    .data(
      topojson.feature(taiwanTopojson, taiwanTopojson.objects['tw']).features,
    )
    .enter()
    .append('path')
    .attr('d', path)
    .attr('fill', fillMap)
    .attr('stroke', '#fff')
    .attr('stroke-width', 1)
    .on('mouseover', showTooltip)
}

let timer = null
let tooltip = null
function showTooltip(event, d) {
  if (!tooltip) {
    tooltip = d3
      .select('#app main')
      .append('div')
      .style('position', 'absolute')
      .style('opacity', 0)
      .style('background-color', '#fff')
      .style('border', '1px solid #ccc')
      .style('padding', '5px 15px')
  }

  clearTimeout(timer)

  const row = voteMapData.value[d.properties.COUNTYID] ?? {}

  const { city, color, party, count } = row

  let content = `${city}最高票數為<span style="color: ${color}">${party}</span>，共獲得 ${count} 票`

  if (!city || !color || !party || !count) {
    content = '無資料'
  }

  tooltip.transition().duration(200).style('opacity', 0.9)
  tooltip
    .html(content)
    .style('left', event.pageX + 'px')
    .style('top', event.pageY - 28 + 'px')

  timer = setTimeout(
    () => tooltip.transition().duration(500).style('opacity', 0),
    1000,
  )
}

async function updateMap() {
  await nextTick()

  const svg = d3.select('#map')
  svg.selectAll('path').attr('fill', fillMap)
}

function fillMap(d) {
  const row = voteMapData.value[d.properties.COUNTYID]
  return row && row.color ? row.color : '#eee'
}
</script>
