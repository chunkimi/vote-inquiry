<template>
  <div id="map-container" class="text-center">
    <svg id="map" class="mx-auto" width="688" height="600"></svg>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, nextTick } from 'vue'
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import { Feature, Geometry } from 'geojson'
import { Topology, Objects, GeometryCollection } from 'topojson-specification'
import taiwanTopojson from '@/data/tw-topo.json'
import city_id_map from '@/data/city_id_map.json'
import partyMap from '@/data/party.json'
import type { VoteMapData } from '@/types'

const props = defineProps<{
  data: VoteMapData[]
}>()

type City = typeof city_id_map

const voteMapData = computed(() => {
  return props.data.reduce(
    (res, { city, party, count }) => {
      res[city_id_map[city as keyof City]] = {
        city,
        party,
        color: partyMap.colorMap[party],
        count,
      }
      return res
    },
    {} as {
      [key in City[keyof City]]: {
        city: string
        party: string
        color: string
        count: number
      }
    },
  )
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

interface GeoJsonObjects extends Objects {
  tw: {
    type: 'GeometryCollection'
    geometries: {
      arcs: number[][][]
      type: 'MultiPolygon'
      properties: {
        COUNTYID: string
        COUNTYCODE: City[keyof City]
        COUNTYNAME: string
        COUNTYENG: string
      }
    }[]
  }
}

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
      topojson.feature(
        taiwanTopojson as Topology<GeoJsonObjects>,
        taiwanTopojson.objects['tw'] as GeometryCollection,
      ).features,
    )
    .enter()
    .append('path')
    .attr('d', path)
    .attr('fill', fillMap)
    .attr('stroke', '#fff')
    .attr('stroke-width', 1)
    .on('mouseover', (event: MouseEvent, d: Feature<Geometry, unknown>) =>
      showTooltip(event, d),
    )
}

let timer: ReturnType<typeof setTimeout> | null = null
let tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, null> | null =
  null

function showTooltip(event: MouseEvent, datum: Feature<Geometry, unknown>) {
  const d = datum as Pick<
    GeoJsonObjects['tw']['geometries'][number],
    'properties'
  >

  if (!tooltip) {
    tooltip = d3
      .select<HTMLElement | null, unknown>('#app main')
      .append('div')
      .style('position', 'absolute')
      .style('opacity', 0)
      .style('background-color', '#fff')
      .style('border', '1px solid #ccc')
      .style('padding', '5px 15px')
  }

  if (timer) clearTimeout(timer)

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
    () => tooltip?.transition().duration(500).style('opacity', 0),
    1000,
  )
}

async function updateMap() {
  await nextTick()

  const svg = d3.select('#map')
  svg.selectAll('path').attr('fill', fillMap)
}

const fillMap: d3.ValueFn<
  d3.BaseType,
  unknown,
  string | number | boolean | readonly (string | number)[] | null
> = function (datum) {
  const d = datum as GeoJsonObjects['tw']['geometries'][number]
  const row = voteMapData.value[d.properties.COUNTYID]
  return row && row.color ? row.color : '#eee'
}
</script>
