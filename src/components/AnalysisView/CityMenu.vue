<template>
  <div class="accordion" id="accordionExample">
    <div
      v-for="(cities, region) in regionData"
      :key="region"
      class="accordion-item"
    >
      <h2 class="accordion-header" :id="`header-${region}`">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="`#collapse-${region}`"
          aria-expanded="false"
          :aria-controls="`collapse-${region}`"
        >
          {{ region }}
        </button>
      </h2>
      <div
        :id="`collapse-${region}`"
        class="accordion-collapse collapse"
        :aria-labelledby="`header-${region}`"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body d-flex flex-wrap gap-2">
          <span
            v-for="(cityName, i) in cities"
            :key="i"
            class="badge bg-primary"
            @click="city = cityName"
          >
            {{ cityName }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCurrentElectionStore } from '@/stores/currentElectionStore'
import { useFetch } from '@vueuse/core'
import city_id_section_map from '@/data/city_id_section_map.json'
import city_id_map from '@/data/city_id_map.json'

const currentElectionStore = useCurrentElectionStore()
const { currentElectionYear, city } = storeToRefs(currentElectionStore)

const path = computed(
  () =>
    new URL(
      `../../data/administrative_area/${currentElectionYear.value}.json`,
      import.meta.url,
    ).href,
)

type City = keyof typeof city_id_map
type CityID = keyof typeof city_id_section_map

const { data } = useFetch(path, { refetch: true })
  .get()
  .json<{ [key in City]: string[] }>()

const regions = ['北部', '中部', '南部', '東部', '離島'] as const
const cityList = computed<City[]>(() => Object.keys(data.value || {}) as City[])
const regionData = computed(() => {
  return regions.reduce(
    (res, region) => {
      const cites = cityList.value.filter((city) => {
        const cityId = city_id_map[city] as CityID
        const regionName = city_id_section_map[cityId]
        return regionName === region
      })

      if (cites.length === 0) return res

      res[region] ??= []
      res[region].push(...cites)

      return res
    },
    {} as {
      [key in (typeof regions)[number]]: string[]
    },
  )
})
</script>
