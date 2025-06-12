<!-- pages/typing.vue -->
<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4 bg-primary-50 dark:bg-primary-950">
    <h1 class="text-4xl md:text-5xl font-bold mb-8 text-accent-500">Typing Test</h1>

    <!-- Timer display -->
    <TimerDisplay :time="timer" class="mb-6" />

    <!-- Current sentence display -->
    <SentenceDisplay :sentence="sentence" :typedText="typedText" :errors="errors" class="mb-8" />

    <!-- Input area for user typing -->
    <TypingInput
      v-model:typedText="typedText"
      :sentence="sentence"
      :isRunning="isRunning"
      @start="startTest"
      @update:errors="updateErrors"
      class="mb-8"
    />

    <!-- Real-time stats display -->
    <StatsDisplay :wpm="wpm" :cpm="cpm" :accuracy="accuracy" class="mb-8" />

    <!-- Action buttons -->
    <div class="flex space-x-4 mb-8">
      <button
        @click="resetTest"
        class="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-400"
      >
        Restart Test
      </button>
      <NuxtLink
        to="/leaderboard"
        class="bg-accent-500 hover:bg-accent-600 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent-300 flex items-center justify-center"
      >
        View Leaderboard
      </NuxtLink>
    </div>

    <!-- Modals for test completion and leaderboard save confirmation -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-xl text-center max-w-sm w-full mx-4">
        <h2 class="text-2xl font-bold mb-4 text-primary-800 dark:text-primary-100">Test Completed!</h2>
        <p class="text-lg mb-2 text-primary-700 dark:text-primary-200">WPM: <span class="font-semibold">{{ wpm }}</span></p>
        <p class="text-lg mb-2 text-primary-700 dark:text-primary-200">Accuracy: <span class="font-semibold">{{ accuracy.toFixed(2) }}%</span></p>
        <p class="text-lg mb-6 text-primary-700 dark:text-primary-200">CPM: <span class="font-semibold">{{ cpm }}</span></p>
        <button
          @click="closeModalAndReset"
          class="bg-accent-500 hover:bg-accent-600 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent-300"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import TimerDisplay from '~/components/TimerDisplay.vue';
import SentenceDisplay from '~/components/SentenceDisplay.vue';
import TypingInput from '~/components/TypingInput.vue';
import StatsDisplay from '~/components/StatsDisplay.vue';
import { useTypingTest } from '~/composables/useTypingTest'; // Import the main typing test logic
import { useLeaderboard } from '~/composables/useLeaderboard'; // Import leaderboard logic

// Initialize router for navigation
const router = useRouter();

// Use the typing test composable to manage test state and logic
const {
  sentence,
  typedText,
  timer,
  isRunning,
  errors,
  wpm,
  cpm,
  accuracy,
  startTest,
  stopTest,
  resetTest: typingTestReset, // Rename to avoid conflict with local resetTest
  initializeTest,
} = useTypingTest();

// Use the leaderboard composable to save scores
const { saveScore } = useLeaderboard();

// Reactive variable to control modal visibility
const showModal = ref(false);

// Function to update errors from TypingInput component
const updateErrors = (newErrors) => {
  errors.value = newErrors;
};

// Watch for the timer reaching 0 to stop the test and show results
watch(timer, (newVal) => {
  if (newVal <= 0 && isRunning.value) {
    stopTest(); // Stop the test when timer hits zero
    // Save the score if WPM is greater than 0
    if (wpm.value > 0) {
      saveScore({
        wpm: wpm.value,
        cpm: cpm.value,
        accuracy: accuracy.value,
        timestamp: Date.now(), // Use current timestamp
      });
    }
    showModal.value = true; // Show the completion modal
  }
});

// Function to close the modal and reset the test
const closeModalAndReset = () => {
  showModal.value = false;
  typingTestReset(); // Reset the typing test state
};

// Combined reset function for the button, also ensures modal is hidden
const resetTest = () => {
  showModal.value = false; // Hide the modal if it's open
  typingTestReset(); // Call the reset function from the composable
};

// Initialize the test when the component is mounted
onMounted(() => {
  initializeTest();
});

// Clean up any ongoing test (e.g., timer interval) when component is unmounted
onBeforeUnmount(() => {
  stopTest(); // Ensure timer is cleared if user navigates away
});

// Set page title using Nuxt's useHead composable
useHead({
  title: 'Typing Test - Speed App',
});
</script>

<style scoped>
/* No specific scoped styles needed as TailwindCSS handles all styling. */
</style>
