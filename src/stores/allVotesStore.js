import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFileUrl } from 'vuefire'
import { useFetch } from '@vueuse/core'

import { combineVotePath } from '@/utils/votesAnal.js'
import { allYears } from '@/utils/electionInfo.js'

export const useAllVotesStore = defineStore('pastElectionStore', () => {
  const specifyCity = ref('')
  const specifyDistrict = ref('')
  const allVotes = ref({})

  const viewStatus = computed(() => {
    if (!specifyCity.value && !specifyDistrict.value) {
      return `全國`
    } else if (!specifyDistrict.value) {
      return `${specifyCity.value}`
    } else {
      return `${specifyCity.value}${specifyDistrict.value}`
    }
  })
  watch(viewStatus, (newStatus) => {
    if(newStatus) {
        getAllVotes()
    }
  }, {
    immediate: true,
  })

  function getAllVotes() {
    allYears.forEach((yearIndex) => {
        const storage = useFirebaseStorage()
        const votesFileRef = computed(() => {
          const path = combineVotePath(
            yearIndex,
            specifyCity.value,
            specifyCity.value,
          )
          return storageRef(storage, path)
        })
        const { url } = useStorageFileUrl(votesFileRef)
        if (url) {
          const { data } = useFetch(url, { refetch: true }).get().json()
          allVotes[`vote${yearIndex}`].value = data
        }
      })
  }

  return {
    specifyCity,
    specifyDistrict,
    allVotes,
  }
})
