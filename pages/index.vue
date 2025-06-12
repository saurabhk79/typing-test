<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4 text-center">
    <h1 class="text-5xl md:text-6xl font-bold mb-6 text-blue-600">
      Typing Speed Test
    </h1>
    <p class="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl">
      Improve your typing skills and measure your speed and accuracy.
      Challenge yourself with a 60-second test!
    </p>
    <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
      <NuxtLink
        to="/typing"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Start Typing
      </NuxtLink>
      <NuxtLink
        to="/leaderboard"
        class="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-400"
      >
        View Leaderboard
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Home - Typing Speed Test',
});
</script>

<style scoped>
</style>
