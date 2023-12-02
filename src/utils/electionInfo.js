import candidateData from '@/data/candidate.json'
// import { filterCandidateDataType } from '@/utils/candidateFilter'

// export const allYears = filterCandidateDataType(candidateData, 'election_year')
// export const allParties = filterCandidateDataType(candidateData, 'party')

/**
 * 解說：相對簡單的做法，直接從 candidateData 中取出所有的年份與政黨
 */
function filterAndUniqueData(data, type) {
  /**
   * 解說：先 map 出所有的年份或政黨，再用 Set 去除重複的資料
   */
  const results = data.map((item) => item[type]) // example log: ['2020', '2020', '2020', '2020', '2020', '2020', '2016', '2016', '2016', '2016', '2016', '2016', '2012', '2012', '2012', '2012', '2012', '2012']

  /**
   * 解說：進階寫法，幫 年份 做遞減排序
   */
  if (type === 'election_year') {
    return [...new Set(results)].sort((a, b) => Number(b) - Number(a))
  }

  /**
   * 解說：政黨 or 其他 type 不做排序
   */
  return [...new Set(results)]
}
export const allYears = filterAndUniqueData(candidateData, 'election_year')
export const allParties = filterAndUniqueData(candidateData, 'party')
