<!-- components/SentenceDisplay.vue -->
<template>
  <div class="sentence-display bg-white dark:bg-primary-800 p-6 rounded-lg shadow-md max-w-4xl w-full text-center text-xl md:text-2xl leading-relaxed border border-gray-200 dark:border-gray-700">
    <span v-for="(char, index) in sentence" :key="index"
      :class="{
        'text-danger': errors[index],        // Apply red color if character is an error
        'text-success': typedText[index] === char && !errors[index] && typedText.length > index, // Apply green if typed correctly
        'text-gray-400': typedText.length <= index && !errors[index], // Gray for untyped characters
        'text-gray-900 dark:text-gray-100': typedText.length > index && !errors[index] && typedText[index] !== char // Default for correct, but not fully typed chars, or characters beyond current input
      }"
      class="transition-colors duration-100"
    >
      {{ char }}
    </span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// Define the props that this component expects.
const props = defineProps({
  sentence: {
    type: String,
    required: true,
  },
  typedText: {
    type: String,
    required: true,
  },
  errors: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
/* No specific scoped styles needed as TailwindCSS handles all styling. */
/* The coloring logic is handled directly in the template using dynamic classes. */
</style>
