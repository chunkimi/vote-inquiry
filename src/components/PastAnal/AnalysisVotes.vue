<template>
  <div>
    <h4 class="h4 mb-8"><i class="bi bi-clipboard-data me-2"></i>選票分析</h4>
    <div class="row">
      <div class="col-12 col-md-2 mb-8">
        <AnalysisMenu
          :menu-data="analysisMenuData"
          v-model:anal-status="curAnalStatus"
        ></AnalysisMenu>
      </div>
      <div class="col-12 col-md-10">
        <div class="mb-4">
          <VotingAnalysis
            v-if="curAnalStatus === analysisMenuData[0]"
          ></VotingAnalysis>
          <PartyAnalysis v-else></PartyAnalysis>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import AnalysisMenu from '@/components/PastAnal/AnalysisMenu.vue'
import VotingAnalysis from '@/components/PastAnal/VotingAnalysis.vue'
import PartyAnalysis from '@/components/PastAnal/PartyAnalysis.vue'

const analysisMenuData = ['投票情況分析', '政黨得票分析']
const curAnalStatus = ref(analysisMenuData[0])

// import { useMediaQuery } from '@vueuse/core'
// const isDesktop = useMediaQuery('(min-width: 767px)')
</script>
