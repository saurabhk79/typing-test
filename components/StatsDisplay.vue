<template>
  <div class="stats-display grid grid-cols-1 md:grid-cols-3 gap-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-3xl w-full border border-gray-200 dark:border-gray-700">
    <div class="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
      <div class="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase mb-2">WPM</div>
      <div class="text-4xl font-bold text-blue-600 dark:text-blue-400">{{ wpm }}</div>
    </div>

    <div class="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
      <div class="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase mb-2">CPM</div>
      <div class="text-4xl font-bold text-blue-600 dark:text-blue-400">{{ cpm }}</div>
    </div>

    <div class="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
      <div class="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase mb-2">Accuracy</div>
      <div class="text-4xl font-bold text-blue-600 dark:text-blue-400">{{ accuracy.toFixed(2) }}%</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  wpm: {
    type: Number,
    required: true,
    default: 0,
  },
  cpm: {
    type: Number,
    required: true,
    default: 0,
  },
  accuracy: {
    type: Number,
    required: true,
    default: 100,
  },
});
</script>

<style scoped>
</style>
