<template>
  <h1>Welcome to the Forum</h1>
  <CategoryList :categories="categories" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

import CategoryList from '@/components/CategoryList.vue'

const store = useStore()

const categories = computed(() => store.state.categories)
</script>

<style scoped></style>
