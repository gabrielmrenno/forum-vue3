import { createRouter, createWebHistory } from 'vue-router'

import { findById } from '@/helpers'
import store from '@/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/PageHome.vue')
    },
    {
      path: '/me',
      name: 'Profile',
      component: () => import('../views/PageProfile.vue'),
      meta: { toTop: true, smoothScroll: true }
    },
    {
      path: '/me/edit',
      name: 'ProfileEdit',
      component: () => import('../views/PageProfile.vue'),
      props: { edit: true }
    },
    {
      path: '/thread/:id',
      name: 'ThreadDetails',
      component: () => import('../views/ThreadDetails.vue'),
      props: true,
      // next: resolve the navigation
      beforeEnter(to, from, next) {
        // check if thread exists
        const threadExists = findById(to.params.id as string, store.state.threads)
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
      path: '/forum/:forumId/thread/create',
      name: 'ThreadCreate',
      component: () => import('../views/ThreadCreate.vue'),
      props: true
    },
    {
      path: '/thread/:id/edit',
      name: 'ThreadEdit',
      component: () => import('../views/ThreadEdit.vue'),
      props: true
    },
    {
      path: '/forum/:id',
      name: 'Forum',
      component: () => import('../views/ForumPage.vue'),
      props: true
    },
    {
      path: '/category/:id',
      name: 'Category',
      component: () => import('../views/PageCategory.vue'),
      props: true
    },
    {
      path: '/:patchMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue')
    }
  ],
  scrollBehavior(to) {
    return {
      top: to.meta.toTop ? 0 : undefined,
      behavior: to.meta.smoothScroll ? 'smooth' : 'auto'
    }
  }
})

export default router
