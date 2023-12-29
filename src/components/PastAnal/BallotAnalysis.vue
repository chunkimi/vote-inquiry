<template>
  <div>
    <h4 class="h4 mb-8"><i class="bi bi-clipboard-data me-2"></i>選票分析</h4>
    <div class="row">
      <div class="col-12 col-md-2 mb-8">
        <BallotAnalysisMenu
          :menu-data="analysisMenuData"
          v-model:anal-status="curAnalStatus"
        ></BallotAnalysisMenu>
      </div>
      <div class="col-12 col-md-10">
        <VotingAnalysis
          :votesData="votes"
          v-if="curAnalStatus === analysisMenuData[0]"
        ></VotingAnalysis>
        <PartyAnalysis :votesData="votes" v-else></PartyAnalysis>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import BallotAnalysisMenu from '@/components/PastAnal/BallotAnalysisMenu.vue'
import VotingAnalysis from '@/components/PastAnal/VotingAnalysis.vue'
import PartyAnalysis from '@/components/PastAnal/PartyAnalysis.vue'

const analysisMenuData = ['投票情況分析', '政黨得票分析']
const curAnalStatus = ref(analysisMenuData[0])

const props = defineProps({
  votes: {
    type: Array,
    required: true,
  },
})
</script>
