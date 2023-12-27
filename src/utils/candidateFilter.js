

export const filterSameSession = (specifyYear, data) => {
  const specifyYearData = data.filter((item) => item.election_year == specifyYear)
  const candidateIds = [
    ...new Set(specifyYearData.map((item) => item.candidate_id)),
  ]
  candidateIds.sort((a, b) => Number(a.candidate_id) - Number(b.candidate_id))

  const result = candidateIds.map((id) => {
    const people = groupCandidates(specifyYearData, 'candidate_id', id)
    return {
      candidate_id: id,
      ...people,
      party: people.main.party,
    }
  })
  return result
}

export const filterWinner = (years, originData) => {
  const isSelected = [...originData.filter((item) => item.is_elected === true)]
  const result = years.map((year) => {
    const people = groupCandidates(isSelected, 'election_year', year)
    return {
      ...people,
      party: people.main.party,
      voteYear: year,
      voteNum:people.main.voteNum
    }
  })
  result.sort((a, b) => b.voteYear - a.voteYear)
  return result
}

export function groupCandidates(data, condition, conditionValue) {
  const main = data.find(
    (item) => item[condition] === conditionValue && item.role === 0,
  )
  const vice = data.find(
    (item) => item[condition] === conditionValue && item.role === 1,
  )
  const section = { main, vice }
  return section
}

// export function singleCandidates(data , role) {
//   let section = {}
//   if(role) {
//     let vice = data.find((item) => item.role === 1);
//     section.vice = vice
//   } else 
//     let main = data.find((item) => item.role === 0);
//     section.main = main
//   }
//   return section;
// }
