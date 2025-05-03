<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Todo } from '@/types/types';
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const props = defineProps<{
  todo: Todo
}>()

onMounted(() => {
  // Initialize the form with the todo data if editing
  if (props.todo) {
    task.value = props.todo.task
    priority.value = props.todo.priority
    progress.value = props.todo.progress.toString()
  }
})

const task = ref<string>('')
const priority = ref<'low' | 'medium' | 'high' | 'unselected'>('unselected')
const progress = ref<string>('0')

const emit = defineEmits(['onedit', 'oncancel'])

function cancel() {
  emit('oncancel', () => {})
}

function onEdit() {
  if (priority.value === 'unselected') {
    return
  }

  const todo : Todo = {
    id: props.todo.id,
    task: task.value,
    priority: priority.value,
    progress: Number(progress.value),
  }
  emit('onedit', todo)
}

function priorityToColor(priority: 'low' | 'medium' | 'high' | 'unselected') {
  switch (priority) {
    case 'low':
      return 'text-green-500'
    case 'medium':
      return 'text-yellow-500'
    case 'high':
      return 'text-red-500'
    default:
      return 'text-gray-500'
  }
}
</script>

<template>
  <div class=" w-full h-fit bg-orange-50 rounded-lg shadow-md p-4">
    <form @submit.prevent="onEdit()">
      <div class="flex flex-col gap-4">
        <div class=" min-w-[240px] ">
          <p class="text-xl font-bold">タスク</p>
          <Separator orientation="horizontal" class="my-2" />
          <Textarea v-model="task" class="bg-white" required placeholder="タスクを記入してください。"></Textarea>
        </div>
        <div class="flex h-5 items-center space-x-4">
          <Select v-model="priority" required>
            <SelectTrigger class="w-[100px] bg-white">
              <SelectValue placeholder="優先度" :class="priorityToColor(priority)"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel class="text-gray-500">優先度</SelectLabel>
                <SelectItem value="low" class=" text-green-500 focus:text-green-400">低</SelectItem>
                <SelectItem value="medium" class=" text-yellow-500 focus:text-yellow-400">中</SelectItem>
                <SelectItem value="high" class=" text-red-500 focus:text-red-400">高</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select v-model="progress"
           required>
            <SelectTrigger class="w-[100px] bg-white">
              <SelectValue placeholder="進捗度" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel class="text-gray-500">進捗度</SelectLabel>
                <SelectItem value="0">0%</SelectItem>
                <SelectItem value="20">20%</SelectItem>
                <SelectItem value="40">40%</SelectItem>
                <SelectItem value="60">60%</SelectItem>
                <SelectItem value="80">80%</SelectItem>
                <SelectItem value="100">100%</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Separator orientation="horizontal" class="my-2" />
        <div class="flex h-5 items-center space-x-4">
          <Button type="submit" class="text-xs">
            更新
          </Button>
          <Button @click="cancel()" class="text-xs bg-red-500">
            キャンセル
          </Button>
        </div>
      </div>
    </form>
  </div>
</template>