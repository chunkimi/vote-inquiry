import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useCollection, useDocument } from 'vuefire'
import { collectionRefs, documentRefs } from '@/plugins/firebase'
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
    const { data: electionSummary } = useDocument<VoteData>(
      documentRefs.electionRef(),
    )
    const currentElectionYear = computed(() => {
      return electionSummary.value?.['選舉年度']?.toString()
    })
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
    const currentElectionRef = computed(() => {
      return collectionRefs.currentElectionRef(city.value, district.value)
    })
    const { data: votes } = useCollection<VoteData>(currentElectionRef)

    const voteMapData = computed<VoteMapData[]>(() => {
      return votes.value?.map((row) => {
        const winner = Object.keys(row['候選人票數'] as CandidateVotes).reduce(
          (a, b) =>
            row['候選人票數'][a as keyof CandidateVotes] >
            row['候選人票數'][b as keyof CandidateVotes]
              ? a
              : b,
        ) as keyof CandidateVotes

        return {
          city: row['行政區別'],
          party: winner,
          count: row['候選人票數'][winner],
        }
      })
    })

    const currentSummaryRef = computed(() => {
      return documentRefs.electionRef(city.value, district.value)
    })
    const { data: currentSummary } = useDocument<VoteData>(currentSummaryRef)

    const pieChartData = computed(() => {
      const votes = currentSummary.value?.['候選人票數']

      return currentCandidates.value.reduce(
        (res, { party: partyName }) => {
          res.data.push(votes?.[partyName] || 0)
          res.labels.push(partyName)
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
      currentElectionYear,
      currentCandidates,
      electionSummary,
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
