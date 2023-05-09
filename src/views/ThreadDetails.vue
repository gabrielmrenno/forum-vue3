<template>
  <div class="col-large push-top">
    <h1>{{ thread?.title }}</h1>

    <post-list :posts="threadPosts" />
    <post-editor :id="id" @save-post="addPost"></post-editor>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, defineProps } from 'vue'
import sourceData from '@/utils/data.json'

import PostList from '@/components/PostList.vue'
import PostEditor from '@/components/PostEditor.vue'
import type { Post } from '@/utils/dtos'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const threads = reactive(sourceData.threads)
const posts: Post[] = reactive(sourceData.posts)

const thread = computed(() => threads.find((thread) => thread.id === props.id))
const threadPosts = computed(() => posts.filter((post) => post.threadId === props.id))

function addPost(post: Post) {
  posts.push(post)
  thread.value?.posts.push(post.id)
}
</script>

<style scoped></style>
