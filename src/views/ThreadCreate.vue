<template>
  <div class="container">
    <div class="col-full push-top">
      <h1>
        Create new thread in <i>{{ forum.name }}</i>
      </h1>

      <ThreadEditor @save="save" @cancel="cancel" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import ThreadEditor from '@/components/ThreadEditor.vue'
import type { Forum } from '@/utils/dtos'

interface SaveThreadEvent {
  title: string
  content: string
}

const props = defineProps({
  forumId: {
    type: String,
    required: true
  }
})
const store = useStore()
const router = useRouter()

const forum = computed<Forum>(() =>
  store.state.forums.find((forum: Forum) => forum.id === props.forumId)
)

async function save({ title, content }: SaveThreadEvent) {
  const newThread = await store.dispatch('createThread', {
    title: title,
    text: content,
    forumId: props.forumId
  })
  router.push({ name: 'ThreadDetails', params: { id: newThread.id } })
}

function cancel() {
  router.push({ name: 'Forum', params: { id: props.forumId } })
}
</script>

<style scoped></style>
