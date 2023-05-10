<template>
  <h1>Welcome to the Forum</h1>
  <ForumList :forums="forums" />
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import sourceData from '@/utils/data.json'
import type { Forum } from '@/utils/dtos'

import ForumList from '@/components/ForumList.vue'

const forums = reactive<Forum[]>(sourceData.forums)
</script>

<style scoped></style>
