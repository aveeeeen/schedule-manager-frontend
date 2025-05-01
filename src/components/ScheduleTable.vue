<script lang="ts" setup>

import { computed } from 'vue';
const props = defineProps(["schedule"])
const processedScheduleForDisplay = computed(() => {
  // スケジュールデータを props から取得
  const scheduleData = props.schedule || [];

  // 処理されたスケジュールデータを格納する配列
  const processed = [];

      for (let i = 0; i < scheduleData.length; i++) {
        const currentItem = scheduleData[i];
        const prevItem = i > 0 ? scheduleData[i - 1] : null;

        // 新しいタスクのブロックが始まるかどうかの判定
        // (最初の項目、または現在の項目のタスクが直前の項目のタスクと異なる場合)
        const isNewGroup = (i === 0 || currentItem.task !== prevItem.task);

        if (isNewGroup) {
          // 新しいブロックが始まる場合は、タスクセルを表示し、rowspanを計算する
          let spanCount = 0;
          // 現在の項目から見て、同じタスクがいくつ連続するかをカウント
          for (let j = i; j < scheduleData.length; j++) {
            if (scheduleData[j].task === currentItem.task) {
              spanCount++;
            } else {
              break; // タスクが変わったらカウント終了
            }
          }

          processed.push({
            time: currentItem.time,
            task: currentItem.task,
            rowspan: spanCount,
            renderTaskCell: true // この行でタスクセルを表示するフラグ
          });
        } else {
          // 新しいブロックの開始ではない場合は、タスクセルは表示しない
          // （上の行のタスクセルが結合して表示されるため）
          processed.push({
            time: currentItem.time,
            // task, rowspan, renderTaskCell: false は不要だが、明示的に書くなら以下
            // task: null, // または前の行と同じタスクだが表示しない
            // rowspan: 0, // rowspan 0 は無効か非推奨なので設定しない
            renderTaskCell: false // この行ではタスクセルを表示しないフラグ
          });
        }}
    return processed;
})
</script>

<template>
  <div class="p-2 mx-auto">
    <table>
        <thead>
          <tr>
            <th>時間</th>
            <th>タスク</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in processedScheduleForDisplay" :key="index">
            <td class="time-cell">{{ item.time }}~</td>
  
            <td
              v-if="item.renderTaskCell"
              :rowspan="item.rowspan"
              class="task-cell"
              :class="{ 'empty-task': item.task === null }"
            >
              {{ item.task === null ? '休憩' : item.task }}
            </td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<style scoped>
.schedule-container {
  font-family: sans-serif;
  padding: 20px;
}

table {
  width: 100%;
  max-width: 800px;
  border-collapse: collapse; /* セルの境界線を重ねる */
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd; /* 枠線 */
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f2f2f2; /* ヘッダーの背景色 */
}

.time-cell {
  width: 80px; /* 時刻セルの幅を固定 */
  text-align: center;
  font-weight: bold;
  background-color: #f9f9f9;
  /* rowspanによって縦に伸びる */
}

.task-cell {
  /* タスクセルのスタイル */
  /* rowspanによって縦に伸びる */
  vertical-align: top; /* セル結合されたタスクの内容を上揃えにする */
}

.empty-task {
  font-style: italic;
  color: #888;
  background-color: #eee; /* 休憩時間の背景色を変える */
}
</style>