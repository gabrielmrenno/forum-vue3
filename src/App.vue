<template>
  <the-navbar />
  <div class="container">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import TheNavbar from './components/TheNavbar.vue'
</script>

<style>
@import 'assets/styles.css';
</style>
