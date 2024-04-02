import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFileUrl } from 'vuefire'
import { useFetch } from '@vueuse/core'

import { filterSameSession } from '@/utils/candidateFilter'
import candidate from '@/data/candidate.json'
import taoyuan_id_map from '@/data/taoyuan_id_map.json'
import upgradedDistrict_id_map from '@/data/upgraded-district_id_map.json'

const storage = useFirebaseStorage()

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

  /**
   * a composable function to get votes data from firebase storage
   * @param {string>} yearIndex
   * @param {Ref<string>} curYear
   * @param {Ref<string>} curCity
   * @param {Ref<string>} curDistrict
   * @returns {Ref<{ "行政區別": string, "候選人票數": { "鬱蔥雨林聯盟": number, "蔚藍海岸陣線": number, "金色曠野同盟": number }, "有效票數": number, "無效票數": number, "投票數": number, "已領未投票數": number, "發出票數": number, "用餘票數": number, "選舉人數": number, "投票率": number }>} votes data
   */
  function getVotesData(yearIndex, curYear, curCity, curDistrict) {
    const votesFileRef = computed(() => {
      const { city, district } = getRelatedCityAndDistrict(
        yearIndex,
        curYear,
        curCity,
        curDistrict,
      )

      const path = combineVotePath(yearIndex, city.value, district.value)
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

  watch(curYear, (newYear) => {
    curYear.value = newYear
    curCity.value = ''
    curDistrict.value = ''
  })

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
    dataField,
    affiliatedArea,
    getVotesData,
    reset,
  }
})

/**
 * get related city and district based on the year and current city and district
 * @param {string} yearIndex
 * @param {Ref<string>} curYear
 * @param {Ref<string>} curCity
 * @param {Ref<string>} curDistrict
 * @returns {city: Ref<string>, district: Ref<string>}
 */
function getRelatedCityAndDistrict(yearIndex, curYear, curCity, curDistrict) {
  const city = ref('')
  const district = ref('')

  const isCurTaoyuanCounty = curCity.value.includes('桃園')
  const isIncludeUpgradedDistrict =
    curCity.value.includes('彰化') || curCity.value.includes('苗栗')

  if (curYear.value !== '2012' && yearIndex !== '2012') {
    city.value = curCity.value
    district.value = curDistrict.value
  } else if (isCurTaoyuanCounty) {
    const result = getTaoyuanData(
      yearIndex,
      curYear.value,
      curCity.value,
      curDistrict.value,
    )
    city.value = result.city
    district.value = result.district
  } else if (isIncludeUpgradedDistrict) {
    const result = getIncludeUpgradedDistrict(
      yearIndex,
      curYear.value,
      curCity.value,
      curDistrict.value,
    )
    city.value = curCity.value
    district.value = result
  } else {
    city.value = curCity.value
    district.value = curDistrict.value
  }

  return { city, district }
}

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

function getTaoyuanData(yearIndex, curYear, curCity, curDistrict) {
  const result = { city: curCity, district: curDistrict }

  if (curYear !== '2012' && yearIndex === '2012') {
    result.city = '桃園縣'
    if (curDistrict === '') {
      return result
    } else {
      const rawDistrict = findMirrorKey(taoyuan_id_map, curDistrict)

      result.district = rawDistrict
      return result
    }
  } else if (curYear === '2012') {
    if (yearIndex === '2012') {
      return result
    } else {
      result.city = '桃園市'
      if (curDistrict === '') {
        return result
      } else {
        const rawDistrict = findMirrorKey(taoyuan_id_map, curDistrict)

        result.district = rawDistrict
        return result
      }
    }
  }
}

function getIncludeUpgradedDistrict(yearIndex, curYear, curCity, curDistrict) {
  const defaultDistrict = curDistrict
  if (curYear !== '2012' && yearIndex === '2012') {
    if (curDistrict === '') {
      return defaultDistrict
    } else {
      const rawDistrict = findMirrorKey(
        upgradedDistrict_id_map[curCity],
        curDistrict,
      )
      if (rawDistrict) {
        return rawDistrict
      } else {
        return defaultDistrict
      }
    }
  } else if (curYear === '2012') {
    if (yearIndex === '2012') {
      return defaultDistrict
    } else {
      const rawDistrict = findMirrorKey(
        upgradedDistrict_id_map[curCity],
        curDistrict,
      )
      if (rawDistrict) {
        return rawDistrict
      } else {
        return defaultDistrict
      }
    }
  }
}

function findMirrorKey(idMap, testKey) {
  for (const key in idMap) {
    if (key !== testKey && idMap[key] === idMap[testKey]) {
      return key
    }
  }
  return null
}
