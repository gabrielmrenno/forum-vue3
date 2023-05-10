import { createRouter, createWebHistory } from 'vue-router'

import sourceData from '@/utils/data.json'

import PageHome from '@/views/PageHome.vue'
import ThreadDetails from '../views/ThreadDetails.vue'
import NotFound from '../views/NotFound.vue'
import ForumPage from '../views/ForumPage.vue'
import PageCategory from '../views/PageCategory.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: PageHome
    },
    {
      path: '/thread/:id',
      name: 'ThreadDetails',
      component: ThreadDetails,
      props: true,
      // next: resolve the navigation
      beforeEnter(to, from, next) {
        // check if thread exists
        const threadExists = sourceData.threads.find((thread) => thread.id === to.params.id)
        // if exists continue
        if (threadExists) {
          return next()
        }
        // if doesn't exist redirect to not found
        // it will not change the url when get NotFound page
        return next({
          name: 'NotFound',
          params: { patchMatch: to.path.substring(1).split('/') },
          query: to.query,
          hash: to.hash
        })
      }
    },
    {
      path: '/forum/:id',
      name: 'Forum',
      component: ForumPage,
      props: true
    },
    {
      path: '/category/:id',
      name: 'Category',
      component: PageCategory,
      props: true
    },
    {
      path: '/:patchMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

export default router
