import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFileUrl } from 'vuefire'
import { useFetch } from '@vueuse/core'

import { filterSameSession } from '@/utils/candidateFilter'
import { combineVotePath } from '@/utils/votesAnal.js'
import candidate from '@/data/candidate.json'

export const usePastVotesStore = defineStore('pastElectionStore', () => {
  const curYear = ref('')
  const curCity = ref('')
  const curDistrict = ref('')
  const votes = ref([])

  const storage = useFirebaseStorage()
  const votesFileRef = computed(() => {
    if (!curYear.value) return
    const path = combineVotePath(
      curYear.value,
      curCity.value,
      curDistrict.value,
    )
    return storageRef(storage, path)
  })
  const { url } = useStorageFileUrl(votesFileRef)
  watch(url, (value) => {
    if (value) {
      const { data } = useFetch(url, { refetch: true }).get().json()
      votes.value = data
    }
  })

  const curStatus = computed(() => {
    if (!curCity.value && !curDistrict.value) {
      return `全國`
    } else if (!curDistrict.value) {
      return `${curCity.value}`
    } else {
      return `${curCity.value}${curDistrict.value}`
    }
  })
  const affiliatedArea = computed(() => {
    if (!curCity.value && !curDistrict.value) {
      return '縣市'
    } else if (!curDistrict.value) {
      return '鄉鎮市區'
    } else {
      return '村里'
    }
  })

  const curCandidates = computed(() =>
    filterSameSession(curYear.value, candidate),
  )

  watch(
    curYear,
    (newYear) => {
      curYear.value = newYear
      curCity.value = ''
      curDistrict.value = ''
    },
    { immediate: true },
  )

  function reset() {
    curYear.value = ''
    curCity.value = ''
    curDistrict.value = ''
  }

  return {
    curYear,
    curCity,
    curDistrict,
    votes,
    reset,
    curCandidates,
    curStatus,
    affiliatedArea,
  }
})
