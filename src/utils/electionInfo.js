import candidateData from '@/data/candidate.json'
import { filterCandidateDataType } from '@/utils/candidateFilter'

export const allYears = filterCandidateDataType(candidateData, 'election_year')
export const allParties = filterCandidateDataType(candidateData, 'party')

