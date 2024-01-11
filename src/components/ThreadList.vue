<template>
  <div class="col-full">
    <div class="thread-list">
      <h2 class="list-title">Threads</h2>

      <div v-for="thread in threads" :key="thread.id" class="thread">
        <div>
          <p>
            <router-link :to="{ name: 'ThreadDetails', params: { id: thread.id } }">{{
              thread.title
            }}</router-link>
          </p>
          <p class="text-faded text-xsmall">
            By <a href="#">{{ userById(thread.userId)?.name }}</a
            >, <base-date :timestamp="thread.publishedAt" />.
          </p>
        </div>

        <div class="activity">
          <p class="replies-count">{{ thread.posts.length }} replies</p>

          <img class="avatar-medium" :src="userById(thread.userId)?.avatar" alt="" />

          <div>
            <p class="text-xsmall">
              <a href="#">{{ userById(thread.userId)?.name }}</a>
            </p>
            <base-date class="text-xsmall text-faded" :timestamp="thread.publishedAt" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, type PropType } from 'vue'
import { useStore } from 'vuex'

import { findById } from '@/helpers'
import type { Thread, User } from '@/utils/dtos'

defineProps({
  threads: {
    type: Array as PropType<Thread[]>,
    required: true
  }
})

const store = useStore()

const users = computed(() => store.state.users)

function userById(userId: string): User | undefined {
  return findById(userId, users.value)
}
</script>

<style scoped></style>
