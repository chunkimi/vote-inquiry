export const getImageUrl = (path) => {
  return new URL(`../${path}`, import.meta.url).href
}

export const filterSameSession = (specifyYear, data) => {
  let specifyYearData = data.filter((item) => item.election_year == specifyYear)
  const candidateIds = [
    ...new Set(specifyYearData.map((item) => item.candidate_id)),
  ]
  candidateIds.sort((a, b) => Number(a.candidate_id) - Number(b.candidate_id))

  let result = candidateIds.map((id) => {
    let people = groupCandidates(specifyYearData, 'candidate_id', id)
    return {
      candidate_id: id,
      ...people,
      party: people.main.party,
    }
  })
  return result
}

export const filterWinner = (years, originData) => {
  let isSelected = [...originData.filter((item) => item.is_elected === true)]
  let result = years.map((year) => {
    let people = groupCandidates(isSelected, 'election_year', year)
    return {
      ...people,
      party: people.main.party,
      voteYear: year,
    }
  })
  result.sort((a, b) => b.voteYear - a.voteYear)
  return result
}

export const getWinnerVotes = (years, candidates, votes) => {
  let result = [...candidates].map((item) => {
    let voteNum = votes[item.voteYear]['候選人票數'][item.party]
    return {
      ...item,
      voteNum,
    }
  })
  result.sort((a, b) => b.voteYear - a.voteYear)
  return result
}

export function groupCandidates(data, condition, conditionValue) {
  let main = data.find(
    (item) => item[condition] === conditionValue && item.role === 0,
  )
  let vice = data.find(
    (item) => item[condition] === conditionValue && item.role === 1,
  )
  let section = { main, vice }
  return section
}

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
