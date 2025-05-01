<script lang="ts" setup>
const props = defineProps<{
  priority: 'low' | 'medium' | 'high'
}>()

function priorityToJapanese(priority: 'low' | 'medium' | 'high') {
  switch (priority) {
    case 'low':
      return '低'
    case 'medium':
      return '中'
    case 'high':
      return '高'
  }
}

function priorityToColor(priority: 'low' | 'medium' | 'high') {
  switch (priority) {
    case 'low':
      return 'text-green-500'
    case 'medium':
      return 'text-yellow-500'
    case 'high':
      return 'text-red-500'
  }
}
</script>

<template>
      <p class="text-sm font-bold" :class="priorityToColor(props.priority)">{{ priorityToJapanese(props.priority) }}</p>
</template>