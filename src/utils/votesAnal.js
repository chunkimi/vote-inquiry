export function filterSpecifyVotes(dataArr, specifyKey, specifyValue) {
  return (dataArr || []).find((item) => item[specifyKey] === specifyValue)
}

export function excludeTotalVotes(votes, dataField) {
  return (votes || []).filter((item) => item[dataField] !== '總計')
}

export function getVoteRateMaxMix(voteData, dataField) {
  const { party, originVoteRate } = calAreaVoteRate(voteData, dataField)
  const PartyVoteRate = {}
  party.forEach((partyName) => {
    const partyData = excludeTotalVotes(originVoteRate, dataField).map(
      (item) => ({
        區域: item[dataField],
        得票率: item[partyName],
      }),
    )
    partyData.sort((a, b) => parseFloat(b.得票率) - parseFloat(a.得票率))
    PartyVoteRate[partyName] = {
      highestArea: partyData[0],
      lowestArea: partyData[partyData.length - 1],
    }
  })

  return PartyVoteRate
}

export function calAreaVoteRate(voteData, dataField) {
  const party = Object.keys(((voteData || [])[0] || {})['候選人票數'] || {})

  const originVoteRate = (voteData || []).map((item) => {
    const { 候選人票數, 有效票數 } = item
    const totalVoteRate = { [dataField]: item[dataField] }
    Object.entries(候選人票數).forEach(([key, value]) => {
      totalVoteRate[key] = ((value / 有效票數) * 100).toFixed(4)
    })

    return totalVoteRate
  })

  return {
    party,
    originVoteRate,
  }
}

export function filterTaoyuanOldPlaceName(rawAllAreas) {
  const result = rawAllAreas.filter((area) => {
    const lastChar = area.slice(-1)
    if (lastChar === '區') {
      return true
    }
    if (lastChar === '鄉' || lastChar === '鎮' || area === '桃園市') {
      return false
    }
    return true
  })
  return result
}
