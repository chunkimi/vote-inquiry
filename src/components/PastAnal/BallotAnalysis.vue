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
          :origin-votes="originVotes"
          :origin-all-votes="originAllVotes"
          v-if="curAnalStatus === analysisMenuData[0]"
        ></VotingAnalysis>
        <PartyAnalysis
          :origin-votes="originVotes"
          :origin-all-votes="originAllVotes"
          v-else
        ></PartyAnalysis>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import BallotAnalysisMenu from '@/components/PastAnal/BallotAnalysisMenu.vue'
import VotingAnalysis from '@/components/PastAnal/VotingAnalysis.vue'
import PartyAnalysis from '@/components/PastAnal/PartyAnalysis.vue'

const analysisMenuData = ['投票情況分析', '政黨得票分析']
const curAnalStatus = ref(analysisMenuData[0])

const route = useRoute()
const yearId = computed(() => route.params.year)
watch(yearId, (year) => (curAnalStatus.value = analysisMenuData[0]), {
  immediate: true,
})

const props = defineProps({
  originVotes: {
    type: Array,
    required: true,
  },
})

// 先以本地端選票資料寫畫面
import vote2020 from '@/data/votes/2020/全國.json'
import vote2016 from '@/data/votes/2016/全國.json'
import vote2012 from '@/data/votes/2012/全國.json'

const originAllVotes = { vote2020, vote2016, vote2012 }
</script>
