<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import TodoCard from './TodoCard.vue';
import TodoForm from './TodoForm.vue';
import TodoEditForm from './TodoEditForm.vue';
import type { Todo } from '@/types/types';
import { useTodoStore } from '@/stores/todos';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const isEditingID = ref<number | null>(null)
const todostore = useTodoStore()
const sort = ref<'made' | 'priority' | 'progress'>('made')
const todoSorted = computed(() => {
  function priorityToNumber(priority: 'low' | 'medium' | 'high' | 'unselected') {
    switch (priority) {
      case 'low':
        return 1
      case 'medium':
        return 2
      case 'high':
        return 3
      default:
        return 0
    }
  }

  if (sort.value === 'made') {
    return todostore.todos.sort((a: Todo, b: Todo) => a.id - b.id)
  } else if (sort.value === 'priority') {
    return todostore.todos.sort((a: Todo, b: Todo) => priorityToNumber(b.priority) - priorityToNumber(a.priority))
  } else if (sort.value === 'progress') {
    return todostore.todos.sort((a: Todo, b: Todo) => a.progress - b.progress)
  }
})

onMounted(() => {
  todostore.todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')!) : []
  todostore.sort()
})

function editTask(edittodo : Todo) {
    todostore.todos = todostore.todos.filter((todo: Todo) => todo.id !== edittodo.id)
    todostore.todos.push(edittodo)
    localStorage.setItem('todos', JSON.stringify(todostore.todos))
    todostore.sort()
    isEditingID.value = null
  }

</script>

<template>
  <div class="p-4 flex flex-col gap-4 max-w-[800px] w-full h-full overflow-y-scroll">
    <p class="text-xl font-bold">タスク一覧</p>
    <div class="flex flex-row gap-4 items-center">
      <p class="text-md font-bold">ソート</p>
      <Select v-model="sort">
        <SelectTrigger class="w-[180px]">
          <SelectValue :placeholder="sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>ソート</SelectLabel>
            <SelectItem value="made">作成順</SelectItem>
            <SelectItem value="priority">優先度</SelectItem>
            <SelectItem value="progress">進捗度</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
      <div v-for="todo in todoSorted" :key="todo.id">
        <TodoCard v-if="isEditingID !== todo.id" :todo="todo" 
          @onedit="id => isEditingID = id" 
          @ondelete="(todo: Todo) => todostore.deleteTodo(todo)"
          />
        <TodoEditForm 
          v-else-if="isEditingID === todo.id" :todo="todo" 
          @oncancel="() => isEditingID = null" @onedit="todo => editTask(todo)"
          />
      </div>
      <TodoForm @onaddtask="pretodo => todostore.addTodo(pretodo)"></TodoForm>
  </div>
</template>