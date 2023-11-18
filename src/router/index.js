import { createRouter, createWebHashHistory } from 'vue-router'
// import App from '../App.vue'
import MainLayout from '../views/MainLayout.vue'
import HomeView from '../views/HomeView.vue'
import AnalysisView from '../views/AnalysisView.vue'
import PastElectionsView from '../views/PastElectionsView.vue'
import PastAnalysisView from '../views/PastAnalysisView.vue'
import CandidateView from '../views/CandidateView.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        component: HomeView
      },
      {
        // 當屆選情分析
        path: 'analysis',
        component: AnalysisView
        },
        {
        // 歷屆選情－所有年份列表
        path: 'past-elections',
        component: PastElectionsView
        },
        
        {
        // 歷屆選情－所選年份選情分析
        path: 'past-elections/:year',
        component: PastAnalysisView
        },
        {
        // 候選人名單
        path: 'candidate',
        component: CandidateView
        },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
