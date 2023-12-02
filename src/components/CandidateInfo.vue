<template>
  <div class="row">
    <div
      class="col-12 mb-4"
      v-for="(candidate, index) in candidatesData"
      :key="index"
    >
      <div class="card w-100">
        <div class="card-header p-4 bg-secondary text-center">
          {{ candidate.candidate_id }}
        </div>
        <div class="card-body p-6 d-flex flex-column">
          <div class="card__content">
            <div class="row mb-4">
              <div
                class="col-12 col-md-3 mb-5 mb-mb-0 d-flex justify-content-center align-items-center"
              >
                <img
                  :src="getImageUrl(candidate.main.avatar_url)"
                  alt="avatar"
                  class="img-fluid avatar--md"
                />
              </div>
              <div class="col-12 col-md-9">
                <div class="row">
                  <p
                    class="col-4 d-flex justify-content-between border-end border-dark"
                  >
                    <span>總</span>
                    <span>統</span>
                    <span>候</span>
                    <span>選</span>
                    <span>人</span>
                  </p>
                  <p class="col-8">{{ candidate.main.name }}</p>
                </div>
                <div class="row">
                  <p
                    class="col-4 d-flex justify-content-between border-end border-dark"
                  >
                    <span>學</span><span>歷</span>
                  </p>
                  <p class="col-8">{{ candidate.main.education }}</p>
                </div>
                <div class="row">
                  <p
                    class="col-4 d-flex justify-content-between border-end border-dark"
                  >
                    <span>經</span><span>歷</span>
                  </p>
                  <p class="col-8">
                    {{ candidate.main.experience }}
                  </p>
                </div>
              </div>
            </div>
            <div class="row mb-4">
              <div
                class="col-12 col-md-3 mb-5 mb-mb-0 d-flex justify-content-center align-items-center"
              >
                <img
                  :src="getImageUrl(candidate.vice.avatar_url)"
                  alt="avatar"
                  class="img-fluid avatar--md"
                />
              </div>
              <div class="col-12 col-md-9">
                <div class="row">
                  <p
                    class="col-4 d-flex justify-content-between border-end border-dark"
                  >
                    <span>副</span>
                    <span>總</span>
                    <span>統</span>
                    <span>候</span>
                    <span>選</span>
                    <span>人</span>
                  </p>
                  <p class="col-8">{{ candidate.vice.name }}</p>
                </div>
                <div class="row">
                  <p
                    class="col-4 d-flex justify-content-between border-end border-dark"
                  >
                    <span>學</span><span>歷</span>
                  </p>
                  <p class="col-8">{{ candidate.vice.education }}</p>
                </div>
                <div class="row">
                  <p
                    class="col-4 d-flex justify-content-between border-end border-dark"
                  >
                    <span>經</span><span>歷</span>
                  </p>
                  <p class="col-8">
                    {{ candidate.vice.experience }}
                  </p>
                </div>
              </div>
            </div>
            <h5 class="card-title text-center m-0">
              所屬政黨｜{{ candidate.party }}
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { filterSameSession, getImageUrl } from '@/utils/candidateFilter.js'

/**
 * 解說：如果是必要的值，可以加上 required: true，這樣就不用在判斷是否有值，像是 if (!specifyYear) { return [] } 這樣的判斷
 */
const props = defineProps({
  specifyYear: {
    type: String,
    required: true,
  },
  electionParties: {
    type: Array,
    required: true,
  },
  electionData: {
    // 其實可以只保留 electionData 這個 prop 是因為他本身已經用 year 篩選過了
    type: Array,
    required: true,
  },
})

/**
 * 解說：這一行可以刪除，因為 props 的值不會被改變，所以不需要 toRefs
 */
// const { specifyYear, electionParties, electionData } = toRefs(props)

/**
 * 解說：可以改寫成 computed 的寫法，會看起來更簡潔
 * 如同 watch 監聽 electionData 一樣，只要 electionData 有變動，就會重新計算
 * https://vuejs.org/guide/essentials/computed.html#computed-properties
 */
const candidatesData = computed(() => {
  return filterSameSession(
    props.specifyYear,
    props.electionParties,
    props.electionData,
  )
})

/**
 * candidatesData 的其他寫法
 */
// const candidatesData = computed(() => {
//   // 先複製一份 electionData，避免直接修改到原本的值
//   const copyData = [...props.electionData]

//   // 先依照 candidate_id 來排序
//   copyData.sort((a, b) => Number(a.candidate_id) - Number(b.candidate_id))

//   // reduce 的功用可以將 6 筆 array 轉成 3 筆 array，原本的寫法 parties.forEach 也是將資料先變成 3 筆再來 for loop
//   return copyData.reduce((res, item) => {
//     // 找出是否已經有相同的 candidate_id
//     const index = res.findIndex(
//       ({ candidate_id }) => candidate_id === item.candidate_id,
//     )
//     // 判斷是 總統候選人 還是 副總統候選人
//     const role = item.role === 0 ? 'main' : 'vice'

//     // 如果沒有相同的 candidate_id，則將候選人加入 array
//     if (index < 0) {
//       res.push({
//         party: item.party,
//         candidate_id: item.candidate_id,
//         [role]: item, // object 的用法可以是變數
//       })
//       return res
//     }

//     // 如果有相同的 candidate_id，則將另外一位候選人(可能是副手)加入 object
//     res[index][role] = item
//     return res
//   }, [])
// })

/**
 * 解說：以下都可以刪除
 */
// const updateCandidatesData = () => {
//   if (!specifyYear.value || !electionParties.value || !electionData.value) {
//     return []
//   } else {
//     return filterSameSession(
//       specifyYear.value,
//       electionParties.value,
//       electionData.value,
//     )
//   }
// }

// watch([specifyYear], () => {
//   candidatesData.value = updateCandidatesData()
// })
// onMounted(() => {
//   candidatesData.value = updateCandidatesData()
// })
</script>
