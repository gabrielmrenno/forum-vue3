<template>
  <span :title="humanFriendlyDay()">
    {{ diffForHumans() }}
  </span>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import localizedDate from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.extend(localizedDate)

const props = defineProps({
  timestamp: {
    type: Number,
    required: true,
    default: new Date().getTime()
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
