import { createRouter, createWebHashHistory } from 'vue-router'
import MseCalculator from '../views/MseCalculator.vue'

const routes = [
  { path: '/', redirect: '/ket' },
  {
    path: '/ket',
    name: 'KetCalc',
    component: MseCalculator,
    props: { exam: 'ket' },
    meta: { title: 'KET 成绩计算器' }
  },
  {
    path: '/pet',
    name: 'PetCalc',
    component: MseCalculator,
    props: { exam: 'pet' },
    meta: { title: 'PET 成绩计算器' }
  },
  {
    path: '/fce',
    name: 'FceCalc',
    component: MseCalculator,
    props: { exam: 'fce' },
    meta: { title: 'FCE 成绩计算器' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.afterEach(to => {
  if (to.meta.title) document.title = to.meta.title
})

export default router
