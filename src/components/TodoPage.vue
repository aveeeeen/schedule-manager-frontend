<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import TodoCard from './TodoCard.vue';
import TodoForm from './TodoForm.vue';
import TodoEditForm from './TodoEditForm.vue';
import type { Todo } from '@/types/types';
import { useTodoStore } from '@/stores/todos';

const isEditingID = ref<number | null>(null)
const todostore = useTodoStore()

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
      <div v-for="todo in todostore.todos" :key="todo.id">
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