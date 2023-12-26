
export function filterNationalVotes(dataArr) {
    return dataArr.find((item) => item['行政區別'] ==="總計")
  }
  