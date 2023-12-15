import vote2012 from '@/data/votes/2012/全國.json'
import vote2016 from '@/data/votes/2016/全國.json'
import vote2020 from '@/data/votes/2020/全國.json'

export const votesNationalData = {
  2012: filterNationalVote(vote2012),
  2016: filterNationalVote(vote2016),
  2020: filterNationalVote(vote2020),
}

function filterNationalVote(dataArr) {
  let result = {}
  dataArr.forEach((item) => {
    if (item['行政區別'] === '總計') {
      result = item
    }
  })
  return result
}
