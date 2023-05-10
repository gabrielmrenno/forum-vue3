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
import type { Category } from '@/utils/dtos'
import { reactive, type PropType } from 'vue'
import ForumList from './ForumList.vue'
import sourceData from '@/utils/data.json'

defineProps({
  categories: {
    type: Array as PropType<Category[]>,
    required: true
  }
})

const forums = reactive(sourceData.forums)

function getForumByCategory(categoryId: string) {
  return forums.filter((forum) => forum.categoryId === categoryId)
}
</script>

<style scoped></style>
