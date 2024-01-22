import { createStore } from 'vuex'

import { findById, upsert } from '@/helpers'
import type { AddPost, AddThread, Post, Thread, UpdateThread } from '@/utils/dtos'

interface HighOrderAppendChildToParentMutationParams {
  child: string
  parent: string
}

interface AppendChildToParentMutationParams {
  childId: string
  parentId: string
}

export default createStore({
  // application global data - to use in multiple components
  state: {
    categories: [],
    forums: [],
    posts: [],
    threads: [],
    users: [],
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },
  getters: {
    authUser(state, getters) {
      return getters.user(state.authId)
    },
    user(state) {
      return (id: string) => {
        const user = findById(id, state.users)
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
    thread(state) {
      return (id: string) => {
        const threadData = findById(id, state.threads)
        return {
          ...threadData,
          get author() {
            return findById(threadData?.userId, state.users)
          },
          get repliesCount() {
            return threadData?.posts.length - 1
          },
          get contributorsCount() {
            return threadData?.contributors.length
          }
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
      commit('appendPostToThread', { childId: newPost.id, parentId: newPost.threadId }) // append the post to the thread
      commit('appendContributorsToThread', { childId: state.authId, parentId: newPost.threadId })
    },
    async createThread({ commit, state, dispatch }, { text, title, forumId }) {
      const id = 'gggg' + Math.random()
      const publishedAt = Math.floor(Date.now() / 1000)
      const userId = state.authId
      const thread: AddThread = { id, forumId, title, publishedAt, userId }
      commit('setThread', { thread })
      commit('appendThreadToForum', { childId: id, parentId: forumId })
      commit('appendThreadToUser', { childId: id, parentId: userId })
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
    setPost(state, { post }) {
      upsert(state.posts, post)
    },
    setUser(state, { user }) {
      upsert(state.users, user)
    },
    setThread(state, { thread }) {
      upsert(state.threads, thread)
    },
    appendPostToThread: makeAppendChildToParentMutation({ child: 'posts', parent: 'threads' }),
    appendThreadToForum: makeAppendChildToParentMutation({ child: 'threads', parent: 'forums' }),
    appendThreadToUser: makeAppendChildToParentMutation({ child: 'threads', parent: 'users' }),
    appendContributorsToThread: makeAppendChildToParentMutation({
      child: 'contributors',
      parent: 'threads'
    })
  }
})

function makeAppendChildToParentMutation({
  parent,
  child
}: HighOrderAppendChildToParentMutationParams) {
  return (state: any, { childId, parentId }: AppendChildToParentMutationParams) => {
    const resource = findById(parentId, state[parent])
    if (!resource) return
    resource[child] = resource[child] || []
    if (!resource[child].includes(childId)) resource[child].push(childId)
  }
}
