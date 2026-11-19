import { createRouter, createWebHashHistory } from 'vue-router'
import MseCalculator from '../views/MseCalculator.vue'

const order = ['starters', 'movers', 'flyers', 'ket', 'pet', 'fce']
const titles = {
  starters: 'Starters',
  movers: 'Movers',
  flyers: 'Flyers',
  ket: 'KET',
  pet: 'PET',
  fce: 'FCE'
}

const routes = order.map(k => ({
  path: '/' + k,
  name: k[0].toUpperCase() + k.slice(1) + 'Calc',
  component: MseCalculator,
  props: { exam: k },
  meta: { title: titles[k] + ' 成绩计算器' }
})).concat([
  { path: '/', redirect: '/ket' },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: { title: '页面不存在' }
  }
])

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.afterEach(to => {
  if (to.meta.title) document.title = to.meta.title
})

export default router
