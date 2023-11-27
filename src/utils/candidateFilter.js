// 取圖片 url
export const getImageUrl = (path) => {
  return new URL(`../${path}`, import.meta.url).href
}

// 篩選指定類型的資料
export const filterCandidateDataType = (data, criteria) => {
  let result = []
  data.forEach((item) => {
    if (result.indexOf(item[criteria]) < 0) {
      result.push(item[criteria])
    }
  })
  return result
}

// 篩選同一年度整組候選人
export const filterSameSession = (year, parties, originData) => {
  let result = []
  let specifyYearData = originData.filter((item) => item.election_year == year)
  parties.forEach((curParty) => {
    let samePartyData = specifyYearData.filter(
      (item) => item.party === curParty,
    )
    let section = groupCandidates(samePartyData)
    result.push({
      party: curParty,
      candidate_id: section.main.candidate_id,
      ...section,
    })
  })
  result.sort((a, b) => a.candidate_id - b.candidate_id)
  return result
}

// 篩選勝出者
export const filterWinner = (years, originData) => {
  let result = []
  let isSelected = originData.filter((item) => item.is_elected === true)
  years.forEach((year) => {
    let specifyYearData = isSelected.filter(
      (item) => item.election_year === year,
    )
    let section = groupCandidates(specifyYearData)
    result.push({
      voteYear: year,
      party: specifyYearData[0].party,
      ...section,
    })
  })
  result.sort((a, b) => b.voteYear - a.voteYear)
  return result
}

// 篩出當年度全國"總計"的那一筆
export const filterNationalVote = (dataArr) => {
  let result = {}
  dataArr.forEach((item) => {
    if (item['行政區別'] === '總計') {
      result = item
    }
  })
  return result
}

// 找尋該勝選者在該年度的票數，重新組合陣列
export const getWinnerVotes = (yearsData, candidateData, voteData) => {
  let result = []
  yearsData.forEach((year) => {
    candidateData.forEach((candidate) => {
      if (candidate.voteYear === year) {
        let party = candidate.party
        candidate.voteNum = voteData[year]['候選人票數'][party]
        result.push(candidate)
      }
    })
  })
  return result
}

// 組合同政黨候選人
export function groupCandidates(data) {
  let main = data.find((item) => item.role === 0)
  let vice = data.find((item) => item.role === 1)
  let section = { main, vice }
  return section
}

// 輸出單一候選人資料（正、副）
// export function singleCandidates(data , role) {
//   let section = {}
//   if(role) {
//     let vice = data.find((item) => item.role === 1);
//     section.vice = vice
//   } else {
//     let main = data.find((item) => item.role === 0);
//     section.main = main
//   }
//   return section;
// }
