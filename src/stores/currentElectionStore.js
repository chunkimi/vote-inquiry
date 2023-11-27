import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useCollection, useDocument } from 'vuefire'
import { collectionRefs, documentRefs } from '@/plugins/firebase'
import candidate from '@/data/candidate.json'
import party from '@/data/party.json'

export const useCurrentElectionStore = defineStore(
  'currentElectionStore',
  () => {
    const { data: electionSummary } = useDocument(documentRefs.electionRef())
    const currentElectionYear = computed(() => {
      return ((electionSummary.value || {})['選舉年度'] || '').toString()
    })
    const currentCandidates = computed(() => {
      return candidate
        .filter(
          ({ election_year, role }) =>
            election_year === currentElectionYear.value && role === 0,
        )
        .sort((a, b) => Number(a.candidate_id) - Number(b.candidate_id))
    })

    const city = ref('')
    const district = ref('')
    const currentElectionRef = computed(() => {
      return collectionRefs.currentElectionRef(city.value, district.value)
    })
    const { data: votes } = useCollection(currentElectionRef)

    const voteMapData = computed(() => {
      return (votes.value || []).map((row) => {
        const winner = Object.keys(row['候選人票數']).reduce((a, b) =>
          row['候選人票數'][a] > row['候選人票數'][b] ? a : b,
        )

        return {
          city: row['行政區別'],
          party: winner,
          count: row['候選人票數'][winner].toLocaleString(),
        }
      })
    })

    const currentSummaryRef = computed(() => {
      return documentRefs.electionRef(city.value, district.value)
    })
    const { data: currentSummary } = useDocument(currentSummaryRef)

    const pieChartData = computed(() => {
      const votes = (currentSummary.value || {})['候選人票數'] || {}

      return {
        data: Object.values(votes),
        labels: Object.keys(votes),
      }
    })

    const barChartLabels = computed(() => {
      const votesData = votes.value || []
      return votesData.map((d) => (d['村里別'] ? d['村里別'] : d['行政區別']))
    })
    const barChartData = computed(() => {
      const votesData = votes.value || []

      return (currentCandidates.value || []).map(({ party: partyName }) => {
        return {
          label: partyName,
          data: votesData.map((d) => d['候選人票數'][partyName]),
          backgroundColor: party.colorMap[partyName],
          borderRadius: 4,
        }
      })
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
      barChartLabels,
      barChartData,
      reset,
    }
  },
)
