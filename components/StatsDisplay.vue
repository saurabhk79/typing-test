<!-- components/StatsDisplay.vue -->
<template>
  <div class="stats-display grid grid-cols-1 md:grid-cols-3 gap-6 bg-white dark:bg-primary-800 p-6 rounded-lg shadow-md max-w-3xl w-full border border-gray-200 dark:border-gray-700">
    <!-- WPM display -->
    <div class="flex flex-col items-center p-4 bg-gray-50 dark:bg-primary-700 rounded-lg shadow-sm">
      <div class="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase mb-2">WPM</div>
      <div class="text-4xl font-bold text-accent-600 dark:text-accent-400">{{ wpm }}</div>
    </div>

    <!-- CPM display -->
    <div class="flex flex-col items-center p-4 bg-gray-50 dark:bg-primary-700 rounded-lg shadow-sm">
      <div class="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase mb-2">CPM</div>
      <div class="text-4xl font-bold text-accent-600 dark:text-accent-400">{{ cpm }}</div>
    </div>

    <!-- Accuracy display -->
    <div class="flex flex-col items-center p-4 bg-gray-50 dark:bg-primary-700 rounded-lg shadow-sm">
      <div class="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase mb-2">Accuracy</div>
      <div class="text-4xl font-bold text-accent-600 dark:text-accent-400">{{ accuracy.toFixed(2) }}%</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// Define the props that this component expects.
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
    default: 100, // Default accuracy to 100% when no typing has occurred
  },
});
</script>

<style scoped>
/* No specific scoped styles needed as TailwindCSS handles all styling. */
</style>
