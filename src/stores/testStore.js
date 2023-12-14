import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { useFirebaseStorage, useStorageFile } from 'vuefire'
import { ref as storageRef } from 'firebase/storage'
import { useFetch } from '@vueuse/core'

import { filterSameSession } from '@/utils/candidateFilter'
import candidate from '@/data/candidate.json'

export const usePastElectionStore = defineStore('pastElectionStore', () => {
  const currentCandidates = computed(() =>
    filterSameSession(specifyYear.value, candidate),
  )
  const mirrorYear = computed(() => specifyYear.value)

  const specifyYear = ref(null)
  const specifyCity = ref(null)
  const specifyDistrict = ref(null)
  const votes = ref(null)

  function getVotesData(isUpdate) {
    if (!isUpdate) return 
    console.log("getVotesData")
    const storage = useFirebaseStorage()
    const path = combinePath(specifyYear.value)
    const votesFileRef = storageRef(storage, path)
    console.log("votesFileRef",votesFileRef)
    // const { url } = useStorageFile(votesFileRef)
    // votes.value = useFetch(url, { refetch: true })
  }

  function setSpecifyYear(year) {
    console.log('觸發setSpecifyYear', year)
    specifyYear.value = year
    getVotesData(true)
  }

  function reset() {
    specifyYear.value = ''
    specifyCity.value = ''
    specifyDistrict.value = ''
  }

  return {
    specifyYear,
    specifyCity,
    specifyDistrict,
    // votes,
    reset,
    currentCandidates,
    setSpecifyYear,
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
