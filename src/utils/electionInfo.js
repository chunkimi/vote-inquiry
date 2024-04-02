import candidateData from '@/data/candidate.json'

function filterSpecifyType(data, type) {
  const result = data.map((item) => item[type])

  if (type === 'election_year') {
    result.sort((a, b) => Number(b) - Number(a))
  }
  return [...new Set(result)]
}

export const allYears = filterSpecifyType(candidateData, 'election_year')
export const allParties = filterSpecifyType(candidateData, 'party')
