<template>
  <h1>Welcome to the Forum</h1>
  <ThreadList :threads="threads" />
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import sourceData from '@/utils/data.json'

import ThreadList from '@/components/ThreadList.vue'
import type { Thread } from '@/utils/dtos'

const threads = reactive<Thread[]>(sourceData.threads)
</script>

<style scoped></style>
