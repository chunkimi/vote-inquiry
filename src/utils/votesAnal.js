export function filterSpecifyVotes(dataArr, specifyKey, specifyValue) {
  return [...dataArr].find((item) => item[specifyKey] === specifyValue)
}

export function excludeTotalVotes(votes) {
  return [...votes].filter((item) => item["行政區別"] !== "總計");
}
