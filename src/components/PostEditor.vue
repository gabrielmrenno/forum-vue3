<template>
  <div class="col-full push-top">
    <form @submit.prevent="addPost">
      <div class="form-group">
        <textarea
          v-model="newPostText"
          id="thread_content"
          class="form-input"
          name="content"
          rows="8"
          cols="140"
        ></textarea>
      </div>

      <div class="btn-group">
        <button class="btn btn-blue" type="submit" name="Publish">Submit post</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

import type { Post } from '@/utils/dtos'

const emit = defineEmits<{
  (e: 'save-post', post: Post): void
}>()

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const newPostText = ref('')

function addPost() {
  const postId = 'gggg' + Math.random()
  const post: Post = {
    text: newPostText.value,
    publishedAt: Math.floor(Date.now() / 1000),
    threadId: props.id,
    userId: '38St7Q8Zi2N1SPa5ahzssq9kbyp1',
    id: postId
  }

  emit('save-post', post)

  newPostText.value = ''
}
</script>

<style scoped></style>
