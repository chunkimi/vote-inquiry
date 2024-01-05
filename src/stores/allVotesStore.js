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
  watch(
    viewStatus,
    (newStatus) => {
      if (newStatus) {
        getAllVotes()
      }
    },
    {
      immediate: true,
    },
  )

  //todo:取得指定地區，歷屆選舉資料，處理桃園例外情況
  function getAllVotes() {
    allYears.forEach((yearIndex) => {
      const storage = useFirebaseStorage()
      const votesFileRef = computed(() => {
        let path = ''
        if (specifyCity.value.includes('桃園')) {
          if (specifyCity.value === '桃園縣') {
            if (yearIndex != '2012') {
              const substituteDistrict = specifyDistrict.value.replace(
                /市$|鄉$|區$|鎮$/,
                '區',
              )
              path = combineVotePath(
                yearIndex,
                '桃園市',
                specifyCity.value,
                substituteDistrict,
              )
            } else {
              path = combineVotePath(
                yearIndex,
                specifyCity.value,
                specifyDistrict.value,
              )
            }
          } else {
            if (yearIndex != '2012') {
              path = combineVotePath(
                yearIndex,
                specifyCity.value,
                specifyDistrict.value,
              )
            } else {
              const substituteDistrict = ''
              //從"區"逆轉回為"鄉鎮市區"，要另外做對照表District_id
              path = combineVotePath(
                yearIndex,
                '桃園市',
                specifyCity.value,
                substituteDistrict,
              )
            }
          }
        } else {
          path = combineVotePath(
            yearIndex,
            specifyCity.value,
            specifyDistrict.value,
          )
        }
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
