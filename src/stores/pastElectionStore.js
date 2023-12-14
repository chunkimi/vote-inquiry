import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useFirebaseStorage, useStorageFile } from 'vuefire'
// import { useCollection, useDocument } from 'vuefire'
// import { collectionRefs, documentRefs } from '@/plugins/firebase'
import { ref as storageRef } from 'firebase/storage'
import { useFetch } from '@vueuse/core'
import {filterSameSession} from '@/utils/candidateFilter'
import candidate from '@/data/candidate.json'
import { allParties } from '../utils/electionInfo'

export const usePastElectionStore = defineStore('pastElectionStore', () => {
  // 浮動變因
  const specifyYear = ref(null)
  const specifyCity = ref(null)
  const specifyDistrict = ref(null)

  // 遠端data：票數資料
  const storage = useFirebaseStorage()
  const votesFileRef = computed(() => {
    const path = combinePath(specifyYear.value)
    return storageRef(storage, path)
  })
  const { url } = useStorageFile(votesFileRef)
  const { data: votes } = useFetch(url, { refetch: true })

  // 本地端data：當屆候選人資訊，不含得票數
  const parties = ref(allParties)
  const currentCandidates = ref(null)
  currentCandidates.value = filterSameSession(
    specifyYear.value,
    parties.value,
    candidate,
  )

  function setSpecifyYear(year) {
    specifyYear.value = year
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
    votes,
    reset,
    setSpecifyYear,
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
