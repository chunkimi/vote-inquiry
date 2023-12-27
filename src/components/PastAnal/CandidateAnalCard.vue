<template>
  <div class="row">
    <div
      class="col-12 col-md-4"
      v-for="candidate in data"
      :key="candidate.candidate_id"
    >
      <div class="card">
        <div class="card-header p-4 bg-secondary text-center">
          {{ candidate.candidate_id }}
        </div>
        <div class="card-body p-6">
          <div class="mb-6">
            <div class="mb-2 d-flex justify-content-between align-items-center">
              <h5 class="h5">總統候選人</h5>
              <div class="d-flex align-items-center">
                <img
                  :src="getImageUrl(candidate.main.avatar_url)"
                  alt="avatar"
                  class="me-1 avatar--sm"
                />
                <h5 class="h5">
                  {{ candidate.main.name }}
                </h5>
              </div>
            </div>
            <div class="mb-2 d-flex justify-content-between align-items-center">
              <h5 class="h5">副總統候選人</h5>
              <div class="d-flex align-items-center">
                <img
                  :src="getImageUrl(candidate.vice.avatar_url)"
                  alt="avatar"
                  class="me-1 avatar--sm"
                />
                <h5 class="h5">
                  {{ candidate.vice.name }}
                </h5>
              </div>
            </div>
            <div class="mb-2 d-flex justify-content-between align-items-center">
              <h5 class="h5">得票數</h5>
              <h5 class="h5">
                {{ commaNumber(candidate.voteNum) }}
              </h5>
            </div>
          </div>
          <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center">
              <p>得票率</p>
              <p>{{ candidate.voteRate }}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <p>所屬政黨</p>
              <div class="d-flex align-items-center">
                <PartyLogo :party="candidate.party" size="shorten" />
                <p>
                  {{ candidate.party }}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div class="d-flex justify-content-between align-items-center">
              <p>得票率<span class="fw-bold">最高</span>地區：</p>
              <p>{{ candidate.rateAnal.cityHighest['行政區別'] }}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <p>得票率<span class="fw-bold">最低</span>地區：</p>
              <p>{{ candidate.rateAnal.cityLowest['行政區別'] }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import PartyLogo from '@/components/common/PartyLogo.vue'
import { commaNumber, getImageUrl } from '@/utils/base'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})
// const dummyData = [
//   {
//     candidate_id: '1',
//     main: {
//       election_year: '2020',
//       candidate_id: '1',
//       role: 0,
//       name: '雅娜',
//       party: '金色曠野同盟',
//       party_logo_url: 'assets/party-logo/savannah.png',
//       education: '自由原野大學法學博士',
//       experience: '草原生態系統平和促進會主席',
//       avatar_url: 'assets/candidate/金色曠野同盟-雅娜.png',
//       is_elected: true,
//       voteNum: 8170231,
//     },
//     vice: {
//       election_year: '2020',
//       candidate_id: '1',
//       role: 1,
//       name: '莉莎',
//       party: '金色曠野同盟',
//       party_logo_url: 'assets/party-logo/savannah.png',
//       education: '廣袤草地大學草原生態學',
//       experience: '乾雨季水源管理部部長',
//       avatar_url: 'assets/candidate/金色曠野同盟-莉莎.png',
//       is_elected: true,
//       voteNum: 8170231,
//     },
//     party: '金色曠野同盟',
//     rateAnal: {
//       cityHighest: '臺北市',
//       cityLowest: '新北市',
//     },
//     voteNum: 8170231,
//     voteRate: 76.3098,
//   },
//   {
//     candidate_id: '2',
//     main: {
//       election_year: '2020',
//       candidate_id: '2',
//       role: 0,
//       name: '喬治',
//       party: '蔚藍海岸陣線',
//       party_logo_url: 'assets/party-logo/coast.png',
//       education: '海洋法學院國際海洋法博士',
//       experience: '海洋生態保護協會主席',
//       avatar_url: 'assets/candidate/蔚藍海岸陣線-喬治.png',
//       is_elected: false,
//       voteNum: 5522119,
//     },
//     vice: {
//       election_year: '2020',
//       candidate_id: '2',
//       role: 1,
//       name: '安德魯',
//       party: '蔚藍海岸陣線',
//       party_logo_url: 'assets/party-logo/coast.png',
//       education: '碧海蔚藍大學海洋生態學博士',
//       experience: '國際海洋保育聯盟執行董事',
//       avatar_url: 'assets/candidate/蔚藍海岸陣線-安德魯.png',
//       is_elected: false,
//       voteNum: 5522119,
//     },
//     party: '蔚藍海岸陣線',
//     rateAnal: {
//       cityHighest: '臺北市',
//       cityLowest: '新北市',
//     },
//     voteNum: 5522119,
//     voteRate: 76.3098,
//   },
//   {
//     candidate_id: '3',
//     main: {
//       election_year: '2020',
//       candidate_id: '3',
//       role: 0,
//       name: '賽門',
//       party: '鬱蔥雨林聯盟',
//       party_logo_url: 'assets/party-logo/rainforest.png',
//       education: '熱帶雨林環境學院熱帶植物學博士',
//       experience: '國際雨林保育聯盟執行董事',
//       avatar_url: 'assets/candidate/鬱蔥雨林聯盟-賽門.png',
//       is_elected: false,
//       voteNum: 608590,
//     },
//     vice: {
//       election_year: '2020',
//       candidate_id: '3',
//       role: 1,
//       name: '艾娃',
//       party: '鬱蔥雨林聯盟',
//       party_logo_url: 'assets/party-logo/rainforest.png',
//       education: '熱帶自然之美大學熱帶地理學博士',
//       experience: '生態開發工程監督主席',
//       avatar_url: 'assets/candidate/鬱蔥雨林聯盟-艾娃.png',
//       is_elected: false,
//       voteNum: 608590,
//     },
//     party: '鬱蔥雨林聯盟',
//     rateAnal: {
//       cityHighest: '臺北市',
//       cityLowest: '新北市',
//     },
//     voteNum: 608590,
//     voteRate: 76.3098,
//   },
// ]
</script>
