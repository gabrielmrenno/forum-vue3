<template>
  <h1>Welcome to the Forum</h1>
  <CategoryList :categories="categories" />
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import sourceData from '@/utils/data.json'
import type { Category } from '@/utils/dtos'

import CategoryList from '@/components/CategoryList.vue'

const categories = reactive<Category[]>(sourceData.categories)
</script>

<style scoped></style>
