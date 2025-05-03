<script lang="ts" setup>
import { Skeleton } from './ui/skeleton';
</script>

<template>
  <div class="p-2 mx-auto "> 
    <div v-for="i in 28" class="flex gap-2 mb-2 w-full">
        <Skeleton class="h-6 w-28" />
        <Skeleton class="h-6 w-full min-w-[200px]" />
    </div>
  </div>
</template>