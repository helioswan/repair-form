import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import TransactionView from '@/views/TransactionView.vue'
import ResultView from '@/views/ResultView.vue'
import FormView from '@/views/FormView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import SuccessView from '@/views/SuccessView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'
import Footer from '@components/core/CoreFooter.vue'
import Header from '@components/core/CoreHeader.vue'
import { useRepairFormStore } from '@/stores/repairForm'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: HomeView,
        Footer: Footer
      }
    },
    {
      path: '/form/:type',
      name: 'form',
      components: {
        default: FormView,
        Header: Header,
        Footer: Footer
      }
    },
    {
      path: '/result',
      name: 'result',
      components: {
        default: ResultView,
        Header: Header,
        Footer: Footer
      },
      meta: { requireRepairForm: true }
    },
    {
      path: '/transaction',
      name: 'transaction',
      components: {
        default: TransactionView,
        Header: Header,
        Footer: Footer
      },
      meta: { requireRepairForm: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/success',
      name: 'success',
      components: {
        default: SuccessView,
        Header: Header,
        Footer: Footer
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      components: {
        default: NotFoundView,
        Header: Header,
        Footer: Footer
      }
    }
  ],
  scrollBehavior() {
    document.body.scrollIntoView({ behavior: 'smooth' })
  }
})
router.beforeEach((to, from, next) => {
  const repairFormStore = useRepairFormStore()
  if (to.matched.some((record) => record.meta.requireRepairForm)) {
    if (!repairFormStore.repairForm && to.name !== 'login' && to.name !== 'dashboard' && to.name !== 'register') {
      next({ name: 'home' })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
