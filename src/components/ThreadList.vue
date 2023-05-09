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
            >, {{ thread.publishedAt }}.
          </p>
        </div>

        <div class="activity">
          <p class="replies-count">{{ thread.posts.length }} replies</p>

          <img class="avatar-medium" :src="userById(thread.userId)?.avatar" alt="" />

          <div>
            <p class="text-xsmall">
              <a href="#">{{ userById(thread.userId)?.name }}</a>
            </p>
            <p class="text-xsmall text-faded">{{ thread.publishedAt }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, defineProps, type PropType } from 'vue'

import type { Thread } from '@/utils/dtos'
import sourceData from '@/utils/data.json'

defineProps({
  threads: {
    type: Array as PropType<Thread[]>,
    required: true
  }
})

const users = reactive(sourceData.users)

function userById(userId: string) {
  return users.find((user) => user.id === userId)
}
</script>

<style scoped></style>
