<template>
  <span> {{ count }} {{ count > 1 ? plural : word }} </span>
</template>

<script setup lang="ts">
defineProps({
  word: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  plural: {
    type: String,
    required: true
  }
})
</script>

<style scoped></style>
