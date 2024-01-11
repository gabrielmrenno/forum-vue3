import { createStore } from 'vuex'

import { findById, upsert } from '@/helpers'
import sourceData from '@/utils/data.json'
import type { AddPost, AddThread, Post, Thread, UpdateThread } from '@/utils/dtos'

export default createStore({
  // application global data - to use in multiple components
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },
  getters: {
    authUser(state) {
      const user = findById(state.authId, state.users)
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
    addPost({ commit, state }, post: AddPost) {
      const newPost: Post = {
        ...post,
        publishedAt: Math.floor(Date.now() / 1000),
        id: 'gggg' + Math.random(),
        userId: state.authId
      }
      commit('setPost', { newPost: newPost }) // set the post
      commit('appendPostToThread', { postId: newPost.id, threadId: newPost.threadId }) // append the post to the thread
    },
    async createThread({ commit, state, dispatch }, { text, title, forumId }) {
      const id = 'gggg' + Math.random()
      const publishedAt = Math.floor(Date.now() / 1000)
      const userId = state.authId
      const thread: AddThread = { id, forumId, title, publishedAt, userId }
      commit('setThread', { thread })
      commit('appendThreadToForum', { forumId, threadId: id })
      commit('appendThreadToUser', { userId, threadId: id })
      dispatch('addPost', { text, threadId: id })
      return findById(id, state.threads)
    },
    async updateThread({ commit, state }, threadData: UpdateThread) {
      const thread = findById(threadData.id, state.threads)
      const post = findById(thread?.posts[0], state.posts)
      const newThread = { ...thread, title: threadData.title }
      const newPost = { ...post, text: threadData.text }
      commit('setThread', { thread: newThread })
      commit('setPost', { newPost })
      return newThread
    },
    updateUser({ commit }, user) {
      commit('setUser', { user, userId: user.id })
    }
  },
  // synchronous transactions that modify the state. They are the only way to change the state in the Vuex store
  mutations: {
    setPost(state, { newPost }) {
      upsert(state.posts, newPost)
    },
    setUser(state, { user, userId }) {
      const userIndex = state.users.findIndex((user) => user.id === userId)
      state.users[userIndex] = user
    },
    setThread(state, { thread }) {
      upsert(state.threads, thread)
    },
    appendPostToThread(state, { postId, threadId }) {
      const thread = findById(threadId, state.threads)
      if (!thread) return
      thread.posts = thread.posts || []
      thread.posts.push(postId)
    },
    appendThreadToForum(state, { forumId, threadId }) {
      const forum = findById(forumId, state.forums)
      if (!forum) return
      forum.threads = forum.threads ?? []
      forum.threads.push(threadId)
    },
    appendThreadToUser(state, { userId, threadId }) {
      const user = findById(userId, state.users)
      if (!user) return
      user.threads = user.threads ?? []
      user.threads.push(threadId)
    }
  }
})
