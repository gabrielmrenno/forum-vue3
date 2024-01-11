<template>
  <div class="container">
    <div class="col-full push-top">
      <h1>
        Editing <i>{{ thread.title }}</i>
      </h1>

      <ThreadEditor :title="thread.title" :text="text" @save="save" @cancel="cancel" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import ThreadEditor from '@/components/ThreadEditor.vue'
import type { Post, Thread } from '@/utils/dtos'

interface SaveThreadEvent {
  title: string
  content: string
}

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const store = useStore()
const router = useRouter()

const thread = computed<Thread>(() =>
  store.state.threads.find((thread: Thread) => thread.id === props.id)
)
const text = computed<string>(
  () => store.state.posts.find((post: Post) => post.id === thread.value.posts[0])?.text
)

async function save({ title, content }: SaveThreadEvent) {
  const newThread = await store.dispatch('updateThread', {
    id: props.id,
    title: title,
    text: content
  })
  router.push({ name: 'ThreadDetails', params: { id: newThread.id } })
}

function cancel() {
  router.push({ name: 'ThreadDetails', params: { id: props.id } })
}
</script>

<style scoped></style>
