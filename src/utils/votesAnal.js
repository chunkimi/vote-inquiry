export function filterSpecifyVotes(dataArr, specifyKey, specifyValue) {
  return [...dataArr].find((item) => item[specifyKey] === specifyValue)
}

export function excludeTotalVotes(votes) {
  return [...votes].filter((item) => item["行政區別"] !== "總計");
}

export function combineVotePath(year, city, district) {
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
