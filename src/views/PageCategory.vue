<template>
  <h1>{{ category?.name }}</h1>
  <ForumList :title="category?.name" :forums="getForumByCategory(category?.id)" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

import ForumList from '@/components/ForumList.vue'
import type { Category, Forum } from '@/utils/dtos'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const store = useStore()

const category = computed(() =>
  store.state.categories.find((category: Category) => category.id === props.id)
)

function getForumByCategory(categoryId: string | undefined) {
  return store.state.forums.filter((forum: Forum) => forum.categoryId === categoryId)
}
</script>

<style scoped></style>
