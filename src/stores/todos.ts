import { defineStore } from 'pinia';
import { ref } from 'vue';
import { type Todo } from '@/types/types';

export const useTodoStore = defineStore('todos', () => {
  const todos = ref<Todo[]>([]);
  
  type NewTodo = {
    task: string,
    priority: 'low' | 'medium' | 'high',
    progress: number,
  }
  
  function addTodo(newtodo: NewTodo) {
    const newID = todos.value.length > 0 ? Math.max(...todos.value.map(todo => todo.id)) + 1 : 0
    const todo = {
      id: newID,
      task: newtodo.task,
      priority: newtodo.priority,
      progress: newtodo.progress,
    }
    todos.value.push(todo)
    sort()
    localStorage.setItem('todos', JSON.stringify(todos.value))
  }
  
  function deleteTodo(deletetodo: Todo) {
    todos.value = todos.value.filter((todo: Todo) => todo.id !== deletetodo.id)
    localStorage.setItem('todos', JSON.stringify(todos.value))
  }

  function sort() {
    todos.value.sort((a: Todo, b: Todo) => a.id - b.id)
  }

  return { todos, addTodo, deleteTodo, sort };
});