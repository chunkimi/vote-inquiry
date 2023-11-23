// 取圖片 url
export const  getImageUrl = (path) => {
  return new URL(`../${path}`, import.meta.url).href
}

// 篩選指定類型的資料
export const  filterCandidateDataType = (data, criteria) =>{
    let result = []
    data.forEach((item) => {
      if (result.indexOf(item[criteria]) < 0) {
        result.push(item[criteria])
      }
    })
    return result
  }

// 篩選同一年度整組候選人
export const filterSameSession = (year, parties, originData) => {
  let result = {};
  let specifyYearData = originData.filter((item) => item.election_year == year);
  parties.forEach((curParty) => {
    let samePartyData = specifyYearData.filter(
      (item) => item.party === curParty
    );
    let section = groupCandidates(samePartyData);
    result[curParty] = section;
  });
  return result;
};

// 篩選勝出者


// 沒有要import出去
// 同政黨候選人
function groupCandidates(data) {
  let main = data.find((item) => item.role === 0);
  let vice = data.find((item) => item.role === 1);
  let section = { main, vice };
  return section;
}



