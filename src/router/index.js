import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import CovidMap from '@/views/CovidMap.vue'
import histDataChart from '@/components/histDataChart'
import FlightInf from "@/components/FlightInf.vue";
import SickmanCheck from "@/components/SickmanCheck.vue";
import News from "@/components/News.vue"
import TipsList from "@/components/TipsList";
import QuestionList from "@/views/QuestionList.vue";
import Question from "@/components/Question.vue"
import EldersHome from "@/components/elders-home/elders-home.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'EldersHome',
    component: EldersHome,
    meta: {
      title: '主页-Oxide防疫信息站'
    }
  },
  {
    path: '/elders-home',
    name: 'EldersHome',
    component: EldersHome,
    meta: {
      title: '主页-Oxide防疫信息站'
    }
  },
  {
    path: '/debug',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Oxide防疫信息站'
    }
  },
  {
    path: '/CovidMap',
    name: 'CovidMap',
    component: CovidMap,
    meta: {
      title: 'Oxide防疫信息站'
    }
  },
  {
    path: '/HistDataChart',
    name: 'HistDataChart',
    component: histDataChart,
    meta: {
      title: 'Oxide防疫信息站'
    }
  },
  {
    path: '/FlightInf',
    name: 'FlightInf',
    component: FlightInf,
    meta: {
      title: 'Oxide防疫信息站'
    }
  },
  {
    path: '/SickmanCheck',
    name: 'SickmanCheck',
    component: SickmanCheck,
    meta: {
      title: 'Oxide防疫信息站'
    }
  },
  {
    path: '/News',
    name: 'News',
    component: News,
    meta: {
      title: '新闻通报-Oxide防疫信息站'
    }
  },
  {
    path: '/TipsList',
    name: 'TipsList',
    component: TipsList,
    meta: {
      title: '防疫常识与辟谣-Oxide防疫信息站'
    }
  },
  {
    path: '/Question',
    name: 'QuestionList',
    component: QuestionList,
    meta: {
      title: 'Oxide防疫信息站'
    }
  },
  {
    path: "/Question/:id",
    name: "Question",
    component: Question,
    meta: {
      title: 'Oxide防疫信息站'
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: 'Oxide防疫信息站'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
