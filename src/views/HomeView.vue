<template>
  <h2>This page is Home (index)</h2>
  <SearchBar v-model:city="city" v-model:district="district" year="2012" />
  <i class="bi bi-0-circle"></i>
  <div class="icon-vote-stamp"></div>
  <button type="button" class="btn btn-primary">Primary</button>
  <button type="button" class="btn btn-secondary">Secondary</button>
  <button type="button" class="btn btn-success">Success</button>
  <button type="button" class="btn btn-danger">Danger</button>
  <button type="button" class="btn btn-warning">Warning</button>
  <button type="button" class="btn btn-info">Info</button>
  <button type="button" class="btn btn-light">Light</button>
  <button type="button" class="btn btn-dark">Dark</button>
  <button type="button" class="btn btn-link">Link</button>
  <button type="button" class="btn btn-savannah">金色曠野同盟</button>
  <button type="button" class="btn btn-coast">蔚藍海岸陣線</button>
  <button type="button" class="btn btn-rainforest">鬱蔥雨林聯盟</button>
  <ul>
    <li v-for="(candidate, i) in candidateList" :key="i">
      {{ candidate.name }} - {{ candidate.party }}
    </li>
  </ul>
  <VoteMap :data="voteMapData" />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFirebaseStorage, useStorageFile } from 'vuefire'
import { ref as storageRef } from 'firebase/storage'
import { useFetch } from '@vueuse/core'
import VoteMap from '@/components/common/VoteMap.vue'
import SearchBar from '@/components/common/SearchBar.vue'

const storage = useFirebaseStorage()
const candidateFileRef = storageRef(storage, 'candidate/candidate.json')

const { url: candidate_url } = useStorageFile(candidateFileRef)

const { data } = useFetch(candidate_url, { refetch: true }).get().json()
const candidateList = computed(() =>
  (data.value || []).filter(({ election_year }) => election_year === '2020'),
)

const voteMapData = ref({
  A: '#fbd189',
  F: '#fbd189',
})

const city = ref('')
const district = ref('')
</script>
