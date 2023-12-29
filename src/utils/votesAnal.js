export function filterSpecifyVotes(dataArr, specifyKey, specifyValue) {
  return [...dataArr].find((item) => item[specifyKey] === specifyValue)
}
