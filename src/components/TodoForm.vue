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

const task = ref<string>('')
const priority = ref<'low' | 'medium' | 'high' | 'unselected'>('unselected')
const progress = ref<number>(0)

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

const emit = defineEmits(['onaddtask'])

function addTask(){
  if (priority.value === 'unselected') {
    return
  }

  const pretodo = {
    task: task.value,
    priority: priority.value,
    progress: Number(progress.value),
  }
  // Emit the new task to the parent component or handle it here
  emit('onaddtask', pretodo)

  // Reset the form after adding the task
  task.value = ''
  priority.value = 'unselected'
  progress.value = 0
}
</script>

<template>
  <div class=" w-full h-fit bg-orange-50 rounded-lg shadow-md p-4">
    <form @submit.prevent="addTask()">
      <div class="flex flex-col gap-4">
        <div class=" min-w-[240px] ">
          <p class="text-xl font-bold">新規タスク</p>
          <Separator orientation="horizontal" class="my-2" />
          <Textarea required v-model="task" class="bg-white" placeholder="タスクを記入してください。"></Textarea>
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
        <Separator orientation="horizontal" class="" />
        <Button type="submit" class="text-xs">
          タスクを追加する
        </Button>
      </div>
    </form>
  </div>
</template>