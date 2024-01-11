<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <label for="thread_title">Title:</label>
      <input v-model="form.title" type="text" id="thread_title" class="form-input" name="title" />
    </div>

    <div class="form-group">
      <label for="thread_content">Content:</label>
      <textarea
        v-model="form.content"
        id="thread_content"
        class="form-input"
        name="content"
        rows="8"
        cols="140"
      ></textarea>
    </div>

    <div class="btn-group">
      <button @click="emit('cancel')" class="btn btn-ghost" type="button">Cancel</button>
      <button class="btn btn-blue" type="submit" name="Publish">
        {{ isNewPost ? 'Publish' : 'Update' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'

const emit = defineEmits(['save', 'cancel'])
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  }
})

const form = reactive({
  title: props.title,
  content: props.text
})
const isNewPost = computed(() => !props.title)

function save() {
  emit('save', { ...form })
}
</script>

<style scoped></style>
