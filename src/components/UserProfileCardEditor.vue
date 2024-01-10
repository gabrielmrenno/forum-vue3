<template>
  <div class="profile-card">
    <form @submit.prevent="saveEditions">
      <p class="text-center">
        <img
          :src="user.avatar"
          :alt="`${user.name} profile picture`"
          class="avatar-xlarge img-update"
        />
      </p>

      <div class="form-group">
        <input
          v-model="activeUser.username"
          type="text"
          placeholder="Username"
          class="form-input text-lead text-bold"
        />
      </div>

      <div class="form-group">
        <input
          v-model="activeUser.name"
          type="text"
          placeholder="Full Name"
          class="form-input text-lead"
        />
      </div>

      <div class="form-group">
        <label for="user_bio">Bio</label>
        <textarea
          v-model="activeUser.bio"
          class="form-input"
          id="user_bio"
          placeholder="Write a few words about yourself."
        ></textarea>
      </div>

      <div class="stats">
        <span>{{ userPostsCount() }}</span>
        <span>{{ userThreadsCount() }}</span>
      </div>

      <hr />

      <div class="form-group">
        <label class="form-label" for="user_website">Website</label>
        <input
          v-model="activeUser.website"
          autocomplete="off"
          class="form-input"
          id="user_website"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="user_email">Email</label>
        <input v-model="activeUser.email" autocomplete="off" class="form-input" id="user_email" />
      </div>

      <div class="form-group">
        <label class="form-label" for="user_location">Twitter</label>
        <input
          v-model="activeUser.twitter"
          autocomplete="off"
          class="form-input"
          id="user_location"
        />
      </div>

      <div class="btn-group space-between">
        <button type="button" class="btn-ghost" @click="cancelEditions">Cancel</button>
        <button type="submit" class="btn-blue">Save</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, reactive, type PropType } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import type { Post, User } from '@/utils/dtos'

const props = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true
  }
})
const store = useStore()
const router = useRouter()

const activeUser = reactive<User>({ ...props.user })

function getUserPosts(): Post[] {
  return store.state.posts.filter((post: Post) => post.userId === props.user.id)
}

function getUserThreads(): Post[] {
  return store.state.threads.filter((post: Post) => post.userId === props.user.id)
}

function userPostsCount(): number {
  return getUserPosts().length
}

function userThreadsCount(): number {
  return getUserThreads().length
}

async function saveEditions(): Promise<void> {
  await store.dispatch('updateUser', { ...activeUser })
  router.push({ name: 'Profile' })
}

function cancelEditions(): void {
  router.push({ name: 'Profile' })
}
</script>

<style scoped></style>
