<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-950">
    <h1 class="text-4xl md:text-5xl font-bold mb-8 text-blue-600">Leaderboard</h1>

    <LeaderboardTable :scores="scores" class="mb-8" />

    <NuxtLink
      to="/"
      class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
    >
      Back to Home
    </NuxtLink>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import LeaderboardTable from '~/components/LeaderboardTable.vue';
import { useLeaderboard } from '~/composables/useLeaderboard';

const { scores, loadScores } = useLeaderboard();

onMounted(() => {
  loadScores();
});

useHead({
  title: 'Leaderboard - Typing Speed Test',
});
</script>

<style scoped>
</style>
