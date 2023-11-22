<template>
  <div id="map-container" class="text-center">
    <svg id="map" class="mx-auto" width="800" height="600"></svg>
  </div>
</template>

<script setup>
import { watch, nextTick } from 'vue'
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import taiwanTopojson from '@/data/tw-topo.json'

const props = defineProps({
  data: {
    type: Object, // { [COUNTYID]: #hex }, e.g. { A: '#fbd189', F: '#fbd189' }
    required: true,
  },
})

watch(
  () => props.data,
  () => {
    drawMap()
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
    .attr('fill', (d) => props.data[d.properties.COUNTYID])
    .attr('stroke', 'black')
    .attr('stroke-width', 1)
}
</script>
