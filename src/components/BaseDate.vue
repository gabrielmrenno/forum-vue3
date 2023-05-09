<template>
  <span :title="humanFriendlyDay()">
    {{ diffForHumans() }}
  </span>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedDate from 'dayjs/plugin/localizedFormat'

dayjs.extend(relativeTime)
dayjs.extend(localizedDate)

const props = defineProps({
  timestamp: {
    type: Number,
    required: true
  }
})

function humanFriendlyDay() {
  return dayjs.unix(props.timestamp).format('llll')
}

function diffForHumans() {
  return dayjs.unix(props.timestamp).fromNow()
}
</script>

<style scoped></style>
