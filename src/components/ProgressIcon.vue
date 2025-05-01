<script lang="ts" setup>
import { Progress } from '@/components/ui/progress'

const props = defineProps<{
  progress: number
}>()

</script>

<template>
  <div class="grid grid-cols-2 gap-2 items-center w-24">
    <div>
      <Progress :model-value="Number(props.progress)" class="" ></Progress>
    </div>
    <p class=" text-sm">{{ props.progress }}%</p>
  </div>
</template>