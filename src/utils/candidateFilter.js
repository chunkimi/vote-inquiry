
// 
export const  filterDataType = (data, criteria) =>{
    let result = []
    data.forEach((item) => {
      if (result.indexOf(item[criteria]) < 0) {
        result.push(item[criteria])
      }
    })
    return result
  }

// 篩同一年度整組候選人
export const  filterYearCandidate =(parties, list) => {
    let result = {}
    parties.forEach((curParty) => {
      let sameParty = list.filter((item) => item.party === curParty)
      let main = sameParty.find((item) => item.role === 0)
      let vice = sameParty.find((item) => item.role === 1)
      let section = { main: main, vice: vice }
      result[curParty] = section
    })
    return result
  }

// 取avatar url
export const  getImageUrl = (path) => {
    return new URL(`${path}`, import.meta.url).href
  }

