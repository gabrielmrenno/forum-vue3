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

import sourceData from '@/utils/data.json'

import ThreadList from '@/components/ThreadList.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const forum = computed(() => sourceData.forums.find((forum) => forum.id === props.id))
const threads = computed(() => sourceData.threads.filter((thread) => thread.forumId === props.id))
</script>

<style scoped></style>
