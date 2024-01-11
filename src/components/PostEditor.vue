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
import { defineEmits, ref } from 'vue'

import type { AddPost } from '@/utils/dtos'

const emit = defineEmits<{
  (e: 'save-post', post: AddPost): void
}>()

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const newPostText = ref('')

function addPost() {
  const post: AddPost = {
    text: newPostText.value,
    threadId: props.id
  }

  emit('save-post', post)

  newPostText.value = ''
}
</script>

<style scoped></style>
