import { createRouter, createWebHashHistory } from 'vue-router'
import MainLayout from '../views/MainLayout.vue'
import HomeView from '../views/HomeView.vue'
import AnalysisView from '../views/AnalysisView.vue'
import PastElectionsView from '../views/PastElectionsView.vue'
import PastAnalysisView from '../views/PastAnalysisView.vue'
import CandidateView from '../views/CandidateView.vue'
import PageNotFoundView from '../views/PageNotFoundView.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: HomeView,
      },
      {
        // 當屆選情分析
        path: 'analysis',
        name: 'Analysis',
        component: AnalysisView,
      },
      {
        // 歷屆選情－所有年份列表
        path: 'past-elections',
        name: 'PastElections',
        component: PastElectionsView,
      },
      {
        // 歷屆選情－所選年份選情分析
        path: 'past-elections/:year',
        name: 'PastAnalysis',
        component: PastAnalysisView,
      },
      {
        // 候選人名單
        path: 'candidate',
        name: 'Candidate',
        component: CandidateView,
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: PageNotFoundView,
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    window.scrollTo(0, 0)
  },
  // scrollBehavior() {
  //   return new Promise((resolve) => setTimeout(() => resolve({ top: 0 })))
  // },
})

// router.afterEach(() => {
//   window.scrollTo(0, 0)
// })

export default router
