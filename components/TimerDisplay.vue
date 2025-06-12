<template>
  <div class="timer-display bg-white dark:bg-gray-800 p-4 rounded-full shadow-md text-center inline-flex items-center justify-center text-4xl md:text-5xl font-bold text-blue-600 w-28 h-28 md:w-32 md:h-32 border-4 border-blue-400 dark:border-blue-600">
    <span :class="{ 'text-red-500 animate-pulse': time <= 10 && time > 0 }">
      {{ time }}
    </span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  time: {
    type: Number,
    required: true,
    default: 60,
  },
});
</script>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
.animate-pulse {
  animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
