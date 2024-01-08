<template>
  <ForumList
    v-for="category in categories"
    :key="category.id"
    :forums="getForumByCategory(category.id)"
    :title="category.name"
    :category-id="category.id"
  />
</template>

<script setup lang="ts">
import { reactive, type PropType } from 'vue'
import { useStore } from 'vuex'

import type { Category, Forum } from '@/utils/dtos'
import ForumList from './ForumList.vue'

defineProps({
  categories: {
    type: Array as PropType<Category[]>,
    required: true
  }
})

const store = useStore()

const forums = reactive(store.state.forums)

function getForumByCategory(categoryId: string) {
  return forums.filter((forum: Forum) => forum.categoryId === categoryId)
}
</script>

<style scoped></style>
