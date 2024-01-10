<template>
  <div class="profile-card">
    <p class="text-center">
      <img :src="user.avatar" :alt="`${user.name} profile picture`" class="avatar-xlarge" />
    </p>

    <h1 class="title">{{ user.username }}</h1>

    <p class="text-lead">{{ user.name }}</p>

    <p class="text-justify">{{ user.bio || 'No bio specified.' }}</p>

    <span class="online">{{ user.name }} is online</span>

    <div class="stats">
      <span>{{ userPostsCount() }} posts</span>
      <span>{{ userThreadsCount() }} threads</span>
    </div>

    <hr />

    <p class="text-large text-center">
      <i class="fa fa-globe"></i> <a :href="user.website">{{ user.website }}</a>
    </p>
  </div>

  <p class="text-xsmall text-faded text-center">Member since june 2003, last visited 4 hours ago</p>

  <div class="text-center">
    <hr />
    <router-link :to="{ name: 'ProfileEdit' }" class="btn-green btn-small"
      >Edit Profile</router-link
    >
  </div>
</template>

<script setup lang="ts">
import { defineProps, type PropType } from 'vue'
import { useStore } from 'vuex'

import type { Post, User } from '@/utils/dtos'

const props = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true
  }
})

const store = useStore()

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
</script>

<style lang="scss" scoped></style>
