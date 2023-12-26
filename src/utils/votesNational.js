import vote2012 from '@/data/votes/2012/全國.json'
import vote2016 from '@/data/votes/2016/全國.json'
import vote2020 from '@/data/votes/2020/全國.json'
import {filterNationalVotes} from '@/utils/votesAnal.js'

export const votesNationalData = {
  2012: filterNationalVotes(vote2012),
  2016: filterNationalVotes(vote2016),
  2020: filterNationalVotes(vote2020),
}

