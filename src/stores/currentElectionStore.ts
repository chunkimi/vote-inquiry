import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
// import { useCollection, useDocument } from 'vuefire'
// import { collectionRefs, documentRefs } from '@/plugins/firebase'
import candidate from '@/data/candidate.json'
import type {
  VoteData,
  VoteMapData,
  CandidateVotes,
  CandidateInfo,
} from '@/types'

export const useCurrentElectionStore = defineStore(
  'currentElectionStore',
  () => {
    const electionSummary = ref<VoteData>()

    const currentElectionYear = ref('2020')
    const currentCandidates = computed<CandidateInfo[]>(() => {
      return candidate
        .filter(
          ({ election_year, role }) =>
            election_year === currentElectionYear.value && role === 0,
        )
        .sort(
          (a, b) => Number(a.candidate_id) - Number(b.candidate_id),
        ) as CandidateInfo[]
    })

    const city = ref<string>('')
    const district = ref<string>('')

    const votes = ref<VoteData[]>([])

    const voteMapData = computed<VoteMapData[]>(() => {
      return (votes.value ?? [])?.map((row) => {
        const winner = Object.keys(row.candidateVotes as CandidateVotes).reduce(
          (a, b) =>
            row.candidateVotes[a as keyof CandidateVotes] >
            row.candidateVotes[b as keyof CandidateVotes]
              ? a
              : b,
        ) as keyof CandidateVotes

        return {
          city: row.administrativeDivision,
          party: winner,
          count: row.candidateVotes[winner],
        }
      })
    })

    const currentSummary = computed(() => {
      return votes.value?.[0]
    })

    const pieChartData = computed(() => {
      const votes = currentSummary.value?.candidateVotes

      return currentCandidates.value.reduce(
        (res, { party_id }) => {
          res.data.push(votes?.[party_id] || 0)
          res.labels.push(party_id)
          return res
        },
        { data: [], labels: [] } as {
          data: number[]
          labels: (keyof CandidateVotes)[]
        },
      )
    })

    function reset() {
      city.value = ''
      district.value = ''
    }

    return {
      electionSummary,
      currentElectionYear,
      currentCandidates,
      city,
      district,
      votes,
      voteMapData,
      pieChartData,
      currentSummary,
      reset,
    }
  },
)
