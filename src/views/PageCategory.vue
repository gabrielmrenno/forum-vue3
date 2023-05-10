<template>
  <h1>{{ category?.name }}</h1>
  <ForumList :title="category?.name" :forums="getForumByCategory(category?.id)" />
</template>

<script setup lang="ts">
import ForumList from '@/components/ForumList.vue'
import sourceData from '@/utils/data.json'
import { computed } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const category = computed(() => sourceData.categories.find((category) => category.id === props.id))

function getForumByCategory(categoryId: string | undefined) {
  return sourceData.forums.filter((forum) => forum.categoryId === categoryId)
}
</script>

<style scoped></style>
