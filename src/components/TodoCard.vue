<script setup lang="ts">
import { ref, useTemplateRef, onMounted } from 'vue'
import type { Todo } from '@/types/types';
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import PriorityIcon from './PriorityIcon.vue';
import ProgressIcon from './ProgressIcon.vue';

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits(['onedit', 'ondelete'])
const taskRef = useTemplateRef('task-elem')

onMounted(() => {
  if(props.todo === undefined) {
    return
  }
  const taskElem = taskRef.value as HTMLElement
  taskElem.innerHTML = props.todo.task.split('\n').map(line => `<p>${line}</p>`).join('')
  taskElem.classList.add('text-md')
})

const emitEditTodo = () => {
  emit('onedit', props.todo.id)
}

const emitDeleteTodo = () => {
  emit('ondelete', props.todo)
}


</script>

<template>
  <div class=" w-full h-fit bg-white rounded-lg shadow-md p-4 flex flex-col gap-2">
    <div class=" min-w-[240px]">
      <p class="text-xl font-bold">タスク</p>
      <Separator orientation="horizontal" class="my-2" />
      <div ref="task-elem"></div>
    </div>
    <div class="flex h-5 items-center space-x-4">
      <p class=" text-md font-bold">優先度</p>
      <PriorityIcon :priority="props.todo.priority" />
      <Separator orientation="vertical" />
      <p class="text-md font-bold">進捗度</p>
      <ProgressIcon :progress="props.todo.progress" />
    </div>
    <Separator orientation="horizontal" class="my-2" />
    <div class="flex h-5 items-center space-x-4 mt-2">
      <Button @click="emitEditTodo()" class="  w-24 float-right" variant="outline">編集する</Button>
      <Button @click="emitDeleteTodo()" class=" bg-red-500 w-16 float-right">削除</Button>
    </div>
  </div>
</template>