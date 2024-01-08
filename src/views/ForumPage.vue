<template>
  <div class="col-full push-top">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum!.name }}</h1>
        <p class="text-lead">{{ forum!.description }}</p>
      </div>
      <a href="#" class="btn-green btn-small">Start a thread</a>
    </div>
  </div>

  <div class="col-full push-top">
    <ThreadList :threads="threads" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

import ThreadList from '@/components/ThreadList.vue'
import type { Forum, Thread } from '@/utils/dtos'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const store = useStore()

const forum = computed(() => store.state.forums.find((forum: Forum) => forum.id === props.id))
const threads = computed(() =>
  store.state.threads.filter((thread: Thread) => thread.forumId === props.id)
)
</script>

<style scoped></style>
