<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-950">
    <h1 class="text-4xl md:text-5xl font-bold mb-8 text-blue-600">Typing Test</h1>

    <TimerDisplay :time="timer" class="mb-6" />

    <SentenceDisplay
      :sentence="sentence"
      v-model:typedText="typedText"
      :errors="errors"
      :isRunning="isRunning"
      @start="startTest"
      @update:errors="updateErrors"
      class="mb-8"
    />

    <StatsDisplay :wpm="wpm" :cpm="cpm" :accuracy="accuracy" class="mb-8" />

    <div class="flex space-x-4 mb-8">
      <button
        @click="resetTest"
        class="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-400"
      >
        Restart Test
      </button>
      <NuxtLink
        to="/leaderboard"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-center"
      >
        View Leaderboard
      </NuxtLink>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-xl text-center max-w-sm w-full mx-4">
        <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Test Completed!</h2>
        <p class="text-lg mb-2 text-gray-700 dark:text-gray-200">WPM: <span class="font-semibold">{{ wpm }}</span></p>
        <p class="text-lg mb-2 text-gray-700 dark:text-gray-200">Accuracy: <span class="font-semibold">{{ accuracy.toFixed(2) }}%</span></p>
        <p class="text-lg mb-6 text-gray-700 dark:text-gray-200">CPM: <span class="font-semibold">{{ cpm }}</span></p>
        <button
          @click="closeModalAndReset"
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
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
import StatsDisplay from '~/components/StatsDisplay.vue';
import { useTypingTest } from '~/composables/useTypingTest';
import { useLeaderboard } from '~/composables/useLeaderboard';

const router = useRouter();

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
  resetTest: typingTestReset,
  initializeTest,
} = useTypingTest();

const { saveScore } = useLeaderboard();

const showModal = ref(false);

const updateErrors = (newErrors) => {
  errors.value = newErrors;
};

watch([timer, typedText], ([newTimerVal, newTypedTextVal]) => {
  if ((newTimerVal <= 0 && isRunning.value) || (newTypedTextVal.length === sentence.value.length && isRunning.value)) {
    stopTest();
    if (wpm.value > 0) {
      saveScore({
        wpm: wpm.value,
        cpm: cpm.value,
        accuracy: accuracy.value,
        timestamp: Date.now(),
      });
    }
    showModal.value = true;
  }
});


const closeModalAndReset = () => {
  showModal.value = false;
  typingTestReset();
};

const resetTest = () => {
  showModal.value = false;
  typingTestReset();
};

onMounted(() => {
  initializeTest();
});

onBeforeUnmount(() => {
  stopTest();
});

useHead({
  title: 'Typing Test - Speed App',
});
</script>

<style scoped>
</style>
