<template>
  <form class="d-flex gap-2">
    <select v-model="cityModel" class="form-select" aria-label="City Selector">
      <option value="" disabled>選擇縣市</option>
      <option v-for="city in cityList" :key="city" :value="city">
        {{ city }}
      </option>
    </select>

    <select
      v-model="districtModel"
      class="form-select"
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

<script setup>
import { ref, computed, watch } from 'vue'
import { useFetch } from '@vueuse/core'

const emit = defineEmits(['update:city', 'update:district'])
const props = defineProps({
  year: {
    type: String, // '2020' | '2016' | '2012'
    default: '2020',
  },
  city: {
    type: String,
  },
  district: {
    type: String,
  },
})

const path = computed(
  () =>
    new URL(
      `../../data/administrative_area/${props.year}.json`,
      import.meta.url,
    ).href,
)

const cityModel = ref('')
const districtModel = ref('')

const { data } = useFetch(path, { refetch: true }).get().json()

const cityList = computed(() => Object.keys(data.value || {}))
const districtList = computed(() => (data.value || {})[cityModel.value])

watch(cityModel, () => (districtModel.value = ''))

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
