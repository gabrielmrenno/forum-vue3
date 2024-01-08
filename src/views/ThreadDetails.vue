<template>
  <div class="col-large push-top">
    <h1>{{ thread?.title }}</h1>

    <post-list :posts="threadPosts" />
    <post-editor :id="id" @save-post="addPost"></post-editor>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, reactive } from 'vue'
import { useStore } from 'vuex'

import PostEditor from '@/components/PostEditor.vue'
import PostList from '@/components/PostList.vue'
import type { Post, Thread } from '@/utils/dtos'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const store = useStore()
const posts: Post[] = reactive<Post[]>(store.state.posts)

const thread = computed(() => store.state.threads.find((thread: Thread) => thread.id === props.id))
const threadPosts = computed(() => posts.filter((post: Post) => post.threadId === props.id))

function addPost(post: Post) {
  posts.push(post)
  thread.value?.posts.push(post.id)
}
</script>

<style scoped></style>
