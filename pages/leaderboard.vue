<!-- pages/leaderboard.vue -->
<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4 bg-primary-50 dark:bg-primary-950">
    <h1 class="text-4xl md:text-5xl font-bold mb-8 text-accent-500">Leaderboard</h1>

    <!-- Leaderboard table component -->
    <LeaderboardTable :scores="scores" class="mb-8" />

    <!-- Back to Home button -->
    <NuxtLink
      to="/"
      class="bg-accent-500 hover:bg-accent-600 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent-300"
    >
      Back to Home
    </NuxtLink>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import LeaderboardTable from '~/components/LeaderboardTable.vue';
import { useLeaderboard } from '~/composables/useLeaderboard'; // Import leaderboard logic

// Use the leaderboard composable to access and load scores
const { scores, loadScores } = useLeaderboard();

// Load scores from localStorage when the component is mounted
onMounted(() => {
  loadScores();
});

// Set page title using Nuxt's useHead composable
useHead({
  title: 'Leaderboard - Typing Speed Test',
});
</script>

<style scoped>
/* No specific scoped styles needed as TailwindCSS handles all styling. */
</style>
