import { createStore } from 'vuex'

import sourceData from '@/utils/data.json'
import type { Post } from '@/utils/dtos'

export default createStore({
  // application global data - to use in multiple components
  state: sourceData,
  /* similar to mutations, but there are a few differences:
    - Instead of mutating the state, actions commit mutations (one or more).
    - Actions can contain arbitrary asynchronous operations, while mutations are strictly synchronous. */
  actions: {
    addPost({ commit }, post: Post) {
      post.id = 'gggg' + Math.random()
      commit('setPost', { newPost: post }) // set the post
      commit('appendPostToThread', { postId: post.id, thread: post.threadId }) // append the post to the thread
    }
  },
  // synchronous transactions that modify the state. They are the only way to change the state in the Vuex store
  mutations: {
    setPost(state, { newPost }) {
      state.posts.push(newPost)
    },
    appendPostToThread(state, { postId, threadId }) {
      const thread = state.threads.find((thread) => thread.id === threadId)
      thread?.posts.push(postId)
    }
  }
})
