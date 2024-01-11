<template>
  <h1>{{ category?.name }}</h1>
  <ForumList :title="category?.name" :forums="getForumByCategory(category?.id)" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

import ForumList from '@/components/ForumList.vue'
import { findById } from '@/helpers'
import type { Forum } from '@/utils/dtos'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const store = useStore()

const category = computed(() => findById(props.id, store.state.categories))

function getForumByCategory(categoryId: string | undefined) {
  return store.state.forums.filter((forum: Forum) => forum.categoryId === categoryId)
}
</script>

<style scoped></style>
