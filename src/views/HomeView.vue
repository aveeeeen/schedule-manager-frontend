<script setup lang="ts">
import SchedulePage from '@/components/SchedulePage.vue';
import TodoPage from '@/components/TodoPage.vue';

</script>

<template>
  <main>
    <header class="flex items-center justify-center h-16 bg-green-100 text-black shadow-md">
      <h1 class="text-2xl font-bold">スケジュールマネージャー</h1>
    </header>
    <div class=" grid md:grid-cols-2 w-screen h-screen">
      <div class=" w-full h-full md:absolute md:w-1/2 md:overflow-y-hidden">
        <TodoPage></TodoPage>
      </div>
      <div class=" w-full h-full md:left-1/2 md:absolute md:w-1/2 md:overflow-y-hidden">
        <SchedulePage></SchedulePage>
      </div>
    </div>
  </main>
</template>
