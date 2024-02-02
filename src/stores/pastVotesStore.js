import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFileUrl } from 'vuefire'
import { useFetch } from '@vueuse/core'

import { filterSameSession } from '@/utils/candidateFilter'
import candidate from '@/data/candidate.json'
import { allYears } from '@/utils/electionInfo'

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

  const { votes:curVotes } = getVotesData(curYear, curCity, curDistrict)
  function getVotesData(year, city, district) {
    const storage = useFirebaseStorage()
    const votesFileRef = computed(() => {
      if (!year.value) return
      const path = combineVotePath(year.value, city.value, district.value)
      return storageRef(storage, path)
    })
    const { url } = useStorageFileUrl(votesFileRef)

    const { data, onFetchResponse } = useFetch(url, {
      refetch: true,
      beforeFetch({ url, options, cancel }) {
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

  const allVotes = ref({})
  async function getAllVotes() {
    if (!curYear.value) return

    const result = {}
    const promises = allYears.map(async (year) => {
      const { votes } = await getVotesData(ref(year), curCity, curDistrict)
      result[`vote${year}`] = votes
    })

    await Promise.all(promises)
    allVotes.value = result
  }

  watch(
    [curYear, curCity, curDistrict],
    () => {
      getAllVotes()
    },
    { immediate: true },
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
    curCandidates,
    curStatus,
    curVotes,
    allVotes,
    reset,
    dataField,
    affiliatedArea,
  }
})

function combineVotePath(year, city, district) {
  let filePath = ''
  if (!year) return
  if (!!year && !!city && !!district) {
    filePath = `${year}/${city}-${district}`
  } else if (!!city && !district) {
    filePath = `${year}/${city}`
  } else if (!city) {
    filePath = `${year}/全國`
  }
  return `votes/${filePath}.json`
}
