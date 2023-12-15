import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFile } from 'vuefire'
import { useFetch } from '@vueuse/core'

import { filterSameSession } from '@/utils/candidateFilter'
import candidate from '@/data/candidate.json'

export const usePastElectionStore = defineStore('pastElectionStore', () => {
  const specifyYear = ref(null)
  const specifyCity = ref(null)
  const specifyDistrict = ref(null)
  const votes = ref([])

  watch(
    [specifyYear, specifyCity, specifyDistrict],
    ([newYear, newCity, newDistrict]) => {
      const storage = useFirebaseStorage()
      const path = combinePath(newYear, newCity, newDistrict)
      const votesFileRef = storageRef(storage, path)
      const { url } = useStorageFile(votesFileRef)
      const { data } = useFetch(url, { refetch: true })
      votes.value = data
    },
  )

  function reset() {
    specifyYear.value = ''
    specifyCity.value = ''
    specifyDistrict.value = ''
  }
  const currentCandidates = computed(() =>
    filterSameSession(specifyYear.value, candidate),
  )
  const mirrorYear = computed(() => specifyYear.value)
  return {
    specifyYear,
    specifyCity,
    specifyDistrict,
    votes,
    reset,
    currentCandidates,
    mirrorYear,
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
