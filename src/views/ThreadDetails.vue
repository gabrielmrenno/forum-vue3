<template>
  <div class="col-large push-top">
    <h1>
      {{ thread?.title }}
      <RouterLink :to="{ name: 'ThreadEdit', params: { id } }">
        <button @click="navigate" class="btn-green btn-small">Edit Thread</button>
      </RouterLink>
    </h1>

    <p>
      By <a href="#" class="link-unstyled">{{ thread.author.name }}</a
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
import { computed, defineProps, reactive } from 'vue'
import { useStore } from 'vuex'

import BaseDate from '@/components/BaseDate.vue'
import PluralComponent from '@/components/PluralComponent.vue'
import PostEditor from '@/components/PostEditor.vue'
import PostList from '@/components/PostList.vue'
import type { AddPost, Post } from '@/utils/dtos'
import { RouterLink } from 'vue-router'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const store = useStore()
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
