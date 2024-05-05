<style lang="scss" scoped>
.search-bar__form {
  max-width: 660px;
}
</style>

<template>
  <form class="d-grid d-sm-flex gap-2 search-bar__form">
    <select
      v-model="cityModel"
      class="form-select"
      id="city-select"
      aria-label="City Selector"
    >
      <option value="" disabled>選擇縣市</option>
      <option v-for="city in cityList" :key="city.id" :value="city.id">
        {{ city.historicalNames[year] ?? city.name }}
      </option>
    </select>

    <select
      v-model="districtModel"
      class="form-select"
      id="district-select"
      aria-label="District Selector"
    >
      <option value="" disabled>選擇行政區</option>
      <option
        v-for="district in districtList"
        :key="district.id"
        :value="district.id"
      >
        {{ district.historicalNames[year] ?? district.name }}
      </option>
    </select>

    <button type="button" class="btn btn-primary text-nowrap" @click="update">
      搜尋
    </button>

    <button
      type="button"
      class="btn btn-outline-primary text-nowrap"
      @click="clear"
    >
      清除搜尋
    </button>
  </form>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useFetch } from '@vueuse/core'
import type { AdministrativeArea } from '@/types'

const emit = defineEmits<{
  (e: 'update:modelValue', arg: string): void
  (e: 'update:city', arg: string): void
  (e: 'update:district', arg: string): void
}>()
withDefaults(
  defineProps<{
    modelValue: string
    year?: string
    city: string
    district: string
  }>(),
  { year: '2020' },
)

const path = computed(
  () => new URL(`../../data/administrative_area.json`, import.meta.url).href,
)

const cityModel = ref<string>('')
const districtModel = ref<string>('')

const { data } = useFetch(path).get().json<AdministrativeArea>()

const cityList = computed(() => Object.values(data.value ?? {}))
const districtList = computed(() =>
  Object.values(data.value?.[cityModel.value]?.districts ?? {}),
)

watch(cityModel, () => (districtModel.value = ''))

function update() {
  const searchId = districtModel.value || cityModel.value || ''
  emit('update:modelValue', searchId)

  emit('update:city', data.value?.[cityModel.value]?.name ?? '')
  emit(
    'update:district',
    data.value?.[cityModel.value]?.districts?.[districtModel.value]?.name ?? '',
  )
}

function clear() {
  cityModel.value = ''
  districtModel.value = ''
  update()
}
</script>
