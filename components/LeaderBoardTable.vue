<!-- components/LeaderboardTable.vue -->
<template>
  <div class="bg-white dark:bg-primary-800 rounded-lg shadow-xl p-6 w-full max-w-3xl border border-gray-200 dark:border-gray-700">
    <h2 class="text-2xl font-semibold mb-6 text-primary-800 dark:text-primary-100 text-center">Top Scores</h2>
    <div v-if="scores.length === 0" class="text-center text-gray-600 dark:text-gray-400 py-8">
      No scores recorded yet. Start typing to set a new record!
    </div>
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-primary-700">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-tl-lg">Rank</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">WPM</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Accuracy</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider rounded-tr-lg">Date</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-primary-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="(score, index) in scores" :key="index" class="hover:bg-gray-50 dark:hover:bg-primary-700 transition duration-150 ease-in-out">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
              {{ index + 1 }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
              {{ score.wpm }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
              {{ score.accuracy.toFixed(2) }}%
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
              {{ formatDate(score.timestamp) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// Define the props that this component expects.
// `scores` is an array of objects, where each object represents a score entry.
const props = defineProps({
  scores: {
    type: Array,
    required: true,
    default: () => [], // Default to an empty array if no scores are provided
  },
});

/**
 * Formats a Unix timestamp into a human-readable date and time string.
 * @param {number} timestamp - The Unix timestamp to format.
 * @returns {string} The formatted date string (e.g., "MM/DD/YYYY HH:MM AM/PM").
 */
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString(); // Uses default locale formatting
};
</script>

<style scoped>
/* Scoped styles are not strictly necessary with TailwindCSS, but can be added if custom styles are needed. */
/* For example, if you wanted to add a specific border-radius to the table itself not easily achievable with Tailwind classes */
</style>
