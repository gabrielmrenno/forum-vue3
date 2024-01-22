<template>
  <div class="col-large push-top">
    <h1>
      {{ thread?.title }}
      <RouterLink :to="{ name: 'ThreadEdit', params: { id } }">
        <button @click="navigate" class="btn-green btn-small">Edit Thread</button>
      </RouterLink>
    </h1>

    <p>
      By <a href="#" class="link-unstyled">{{ thread.author?.name }}</a
      >, <BaseDate :timestamp="thread.publishedAt" />
      <span style="float: right; margin-top: 2px" class="hide-mobile text-faded text-small">
        <PluralComponent :count="thread.repliesCount" plural="replies" word="reply" /> by
        <PluralComponent
          :count="thread.contributorsCount"
          plural="contributors"
          word="contributor"
        />
      </span>
    </p>

    <post-list :posts="threadPosts" />
    <post-editor :id="id" @save-post="addPost"></post-editor>
  </div>
</template>

<script setup lang="ts">
import { doc, getFirestore, onSnapshot } from 'firebase/firestore'
import { computed, defineProps, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { useStore } from 'vuex'

import BaseDate from '@/components/BaseDate.vue'
import PluralComponent from '@/components/PluralComponent.vue'
import PostEditor from '@/components/PostEditor.vue'
import PostList from '@/components/PostList.vue'
import type { AddPost, Post, Thread, User } from '@/utils/dtos'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const store = useStore()
const db = getFirestore()

// onSnapshot: sets up a real-time listener on a document in your Firestore database
onSnapshot(doc(db, 'threads', props.id), (threadDoc) => {
  const docData = threadDoc.data() as Thread
  const thread = { ...docData, id: threadDoc.id }
  store.commit('setThread', { thread })

  // fetch the user data
  onSnapshot(doc(db, 'users', thread.userId), (userDoc) => {
    const userData = userDoc.data() as User
    const user = { ...userData, id: userDoc.id }
    store.commit('setUser', { thread: user })
  })

  // fetch the posts
  thread.posts.forEach((postId) => {
    onSnapshot(doc(db, 'posts', postId), (postDoc) => {
      const postData = postDoc.data() as Post
      const post = { ...postData, id: postDoc.id }
      // fetch the user for each post
      onSnapshot(doc(db, 'users', post.userId), (userDoc) => {
        const userData = userDoc.data() as User
        const user = { ...userData, id: userDoc.id }
        store.commit('setUser', { user })
        store.commit('setPost', { post })
      })
    })
  })
})

const posts: Post[] = reactive<Post[]>(store.state.posts)

const thread = computed(() => store.getters.thread(props.id))
const threadPosts = computed(() => posts.filter((post: Post) => post.threadId === props.id))

function addPost(post: AddPost) {
  const newPost: AddPost = {
    ...post,
    threadId: props.id
  }
  store.dispatch('addPost', newPost)
}

function navigate() {
  console.log('navigate')
}
</script>

<style scoped></style>
