import { createStore } from 'vuex'

import sourceData from '@/utils/data.json'
import type { Post, Thread } from '@/utils/dtos'

export default createStore({
  // application global data - to use in multiple components
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },
  getters: {
    authUser(state) {
      const user = state.users.find((user) => user.id === state.authId)
      if (!user) return null

      return {
        ...user,
        get posts(): Post[] {
          return state.posts.filter((post: Post) => post.userId === user?.id)
        },
        get threads(): Thread[] {
          return state.threads.filter((thread: Thread) => thread.userId === user?.id)
        },
        get postsCount(): number {
          return this.posts.length
        },
        get threadsCount(): number {
          return this.threads.length
        }
      }
    }
  },
  /* similar to mutations, but there are a few differences:
    - Instead of mutating the state, actions commit mutations (one or more).
    - Actions can contain arbitrary asynchronous operations, while mutations are strictly synchronous. */
  actions: {
    addPost({ commit }, post: Post) {
      post.id = 'gggg' + Math.random()
      commit('setPost', { newPost: post }) // set the post
      commit('appendPostToThread', { postId: post.id, thread: post.threadId }) // append the post to the thread
    },
    updateUser({ commit }, user) {
      commit('setUser', { user, userId: user.id })
    }
  },
  // synchronous transactions that modify the state. They are the only way to change the state in the Vuex store
  mutations: {
    setPost(state, { newPost }) {
      state.posts.push(newPost)
    },
    setUser(state, { user, userId }) {
      const userIndex = state.users.findIndex((user) => user.id === userId)
      state.users[userIndex] = user
    },
    appendPostToThread(state, { postId, threadId }) {
      const thread = state.threads.find((thread) => thread.id === threadId)
      thread?.posts.push(postId)
    }
  }
})
