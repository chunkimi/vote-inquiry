import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFile } from 'vuefire'
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
  const storage = useFirebaseStorage()


  async function setSpecifyYear(year) {
    console.log('觸發setSpecifyYear', year)
    specifyYear.value = year
    await getVotesData(true)
  }

  async function getVotesData(isUpdate) {
    if (!isUpdate) return;
  
    console.log('getVotesData');
    const path = combinePath(specifyYear.value);
    const votesFileRef = storageRef(storage, path);
  
    try {
      console.log('try');
      const { url } = await useStorageFile(votesFileRef);
      const { data } = await useFetch(url, { refetch: true });
      votes.value = data;
      console.log('here');
    } catch (error) {
      console.log('catch');
      console.error('獲取數據時發生錯誤：', error);
    }
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
