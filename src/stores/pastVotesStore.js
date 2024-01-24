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
  
  const dataField = computed(() => (curDistrict.value ? '村里別' : '行政區別'))
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

  // const votes = ref([])
  // const storage = useFirebaseStorage()
  // const votesFileRef = computed(() => {
  //   if (!curYear.value) return
  //   const path = combineVotePath(
  //     curYear.value,
  //     curCity.value,
  //     curDistrict.value,
  //   )
  //   return storageRef(storage, path)
  // })
  // const { url } = useStorageFileUrl(votesFileRef)

  // const { data, onFetchResponse } = useFetch(url, {
  //   refetch: true,
  //   beforeFetch({ url, options, cancel }) {
  //     // avoid fetch when url is empty
  //     if (!url) cancel()
  //     return options
  //   },
  // })
  //   .get()
  //   .json()

  // onFetchResponse(() => {
  //   votes.value = data.value
  // })
  const { votes } = useVotesData(curYear, curCity, curDistrict)
  function useVotesData(year, city, district) {
    const storage = useFirebaseStorage()
    const votesFileRef = computed(() => {
      if (!year.value) return
      const path = combineVotePath(
        year.value,
        city.value,
        district.value,
      )
      return storageRef(storage, path)
    })
    const { url } = useStorageFileUrl(votesFileRef)
  
    const { data, onFetchResponse } = useFetch(url, {
      refetch: true,
      beforeFetch({ url, options, cancel }) {
        // 避免在 url 為空時進行 fetch
        if (!url) cancel()
        return options
      },
    })
      .get()
      .json()
  
    const votes = ref([])
  
    onFetchResponse(() => {
      votes.value = data.value
    })
  
    return { votes }
  }

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
    dataField,
    reset,
    curCandidates,
    curStatus,
    affiliatedArea,
  }
})
