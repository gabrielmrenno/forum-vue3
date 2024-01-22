<template>
  <h1 class="push-top">Welcome to the Forum</h1>
  <CategoryList :categories="categories" />
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

import CategoryList from '@/components/CategoryList.vue'

const store = useStore()

const categories = computed(() => store.state.categories)

onBeforeMount(() => {
  console.log('categories', categories.value)
})
</script>

<style scoped></style>
