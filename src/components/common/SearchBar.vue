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
      <option v-for="city in cityList" :key="city" :value="city">
        {{ city }}
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
        :key="district"
        :value="district"
      >
        {{ district }}
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

const emit = defineEmits(['update:city', 'update:district'])
const props = withDefaults(
  defineProps<{
    year?: string
    city: string
    district: string
  }>(),
  {
    year: '2020',
  },
)

const path = computed(
  () =>
    new URL(
      `../../data/administrative_area/${props.year}.json`,
      import.meta.url,
    ).href,
)

const cityModel = ref<string>('')
const districtModel = ref<string>('')

const { data } = useFetch(path, { refetch: true })
  .get()
  .json<Record<string, string[]>>()

const cityList = computed(() => Object.keys(data.value || {}))
const districtList = computed(() => data.value?.[cityModel.value])

watch(cityModel, () => (districtModel.value = ''))
watch(
  () => [props.city, props.district],
  () => {
    cityModel.value = props.city
    districtModel.value = props.district
  },
)

function update() {
  emit('update:city', cityModel.value)
  emit('update:district', districtModel.value)
}

function clear() {
  cityModel.value = ''
  districtModel.value = ''
  update()
}
</script>
