import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFileUrl } from 'vuefire'
import { useFetch } from '@vueuse/core'

import { filterSameSession } from '@/utils/candidateFilter'
import candidate from '@/data/candidate.json'

export const usePastElectionStore = defineStore('pastElectionStore', () => {
  const specifyYear = ref('')
  const specifyCity = ref('')
  const specifyDistrict = ref('')
  const votes = ref([])

  const storage = useFirebaseStorage()
  const votesFileRef = computed(() => {
    if (!specifyYear.value) return
    const path = combinePath(
      specifyYear.value,
      specifyCity.value,
      specifyDistrict.value,
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


 
  function reset() {
    specifyYear.value = ''
    specifyCity.value = ''
    specifyDistrict.value = ''
  }
  const currentCandidates = computed(() =>
    filterSameSession(specifyYear.value, candidate),
  )
  return {
    specifyYear,
    specifyCity,
    specifyDistrict,
    votes,
    reset,
    currentCandidates,
  }
})

function combinePath(year, city, district) {
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
