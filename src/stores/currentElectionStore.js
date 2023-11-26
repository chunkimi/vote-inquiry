import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useCollection, useDocument } from 'vuefire'
import { collectionRefs, documentRefs } from '@/plugins/firebase'

export const useCurrentElectionStore = defineStore(
  'currentElectionStore',
  () => {
    const { data: electionSummary } = useDocument(documentRefs.electionRef())
    const currentElectionYear = computed(() => {
      return ((electionSummary.value || {})['選舉年度'] || '').toString()
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
    const { data: pieSummary } = useDocument(currentSummaryRef)

    const pieChartData = computed(() => {
      const votes = (pieSummary.value || {})['候選人票數'] || {}

      return {
        data: Object.values(votes),
        labels: Object.keys(votes),
      }
    })

    function reset() {
      city.value = ''
      district.value = ''
    }

    return {
      currentElectionYear,
      electionSummary,
      city,
      district,
      votes,
      voteMapData,
      pieChartData,
      reset,
    }
  },
)
