<!-- components/TimerDisplay.vue -->
<template>
  <div class="timer-display bg-orange-400 dark:bg-primary-800 p-4 rounded-full shadow-md text-center inline-flex items-center justify-center text-4xl md:text-5xl font-bold text-accent-500 w-28 h-28 md:w-32 md:h-32 border-4 border-accent-400 dark:border-accent-600">
    <span :class="{ 'text-red-500 animate-pulse': time <= 10 && time > 0 }">
      {{ time }}
    </span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// Define the props that this component expects.
const props = defineProps({
  time: {
    type: Number,
    required: true,
    default: 60, // Default time to 60 seconds
  },
});
</script>

<style scoped>
/*
  The `animate-pulse` class from TailwindCSS will cause the timer to pulse
  red when the time is low, indicating urgency.
  No additional scoped CSS is needed.
*/
</style>
