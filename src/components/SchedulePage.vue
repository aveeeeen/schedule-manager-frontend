<script lang="ts" setup>
import axios from 'axios';
import Button from './ui/button/Button.vue';
import { useTodoStore } from '@/stores/todos';
import { ref, onMounted } from 'vue';
import ScheduleTable from './ScheduleTable.vue';
import { toast } from 'vue-sonner'
import { Toaster } from 'vue-sonner';

const todostore = useTodoStore()
const schedule = ref<any>(null)
const isLoading = ref<boolean>(false)

onMounted(() => {
  const storedSchedule = localStorage.getItem('schedule')
  if (storedSchedule) {
    schedule.value = JSON.parse(storedSchedule)
  } else {
    schedule.value = null
  }
})

async function generateSchedule() {
  const backendUrl = "https://thinkable-reminiscent-woolen.glitch.me"
  // const backendUrl = "http://localhost:3000/"

  if(!todostore.todos.length) {
    toast.error('タスクがありません', {
      description: 'タスクを追加してください',
    })
    return
  }
  const todos = { reqTodo : todostore.todos }
  isLoading.value = true
  try {
    const response = await axios.post( `${backendUrl}/api/schedule-prompt`, JSON.stringify(todos), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    schedule.value = response.data.schedule
    localStorage.setItem('schedule', JSON.stringify(schedule.value))
  } catch (error) {
    toast.error('スケジュールの取得に失敗しました', {
      description: `${error}`,
    })
    console.error('Error generating schedule:', error)
  } finally {
    isLoading.value = false
  }
}

</script>

<template>
  <div class="flex flex-col gap-4 p-4 w-full h-full overflow-y-auto">
    <div class="flex flex-row justify-center items-center">
      <Button v-if="!isLoading" @click="generateSchedule()" class="bg-green-200 w-3/5" variant="outline">スケジュールを生成する</Button>
      <div v-else class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
    <div class="flex flex-col gap-4 w-full h-full overflow-y-auto">
      <ScheduleTable :schedule="schedule" v-if="schedule" />
    </div>
  </div>
  <Toaster position="top-center" />
</template>