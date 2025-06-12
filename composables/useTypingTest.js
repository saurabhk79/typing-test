// composables/useTypingTest.js
import { ref, computed } from 'vue';
import { useSentences } from './useSentences'; // Import the sentence provider

// Constants for the test
const DEFAULT_TIME = 60; // Default test duration in seconds

// Reactive state variables for the typing test
const sentence = ref('');          // The sentence to be typed
const typedText = ref('');         // The user's typed input
const timer = ref(DEFAULT_TIME);   // Countdown timer
const isRunning = ref(false);      // Flag to indicate if the test is active
const errors = ref([]);            // Array to mark error positions (true/false)
let timerInterval = null;          // Holds the interval ID for the timer

// Use the sentence composable to get a random sentence
const { getRandomSentence } = useSentences();

/**
 * Custom composable to encapsulate all typing test logic and state.
 */
export function useTypingTest() {

  /**
   * Initializes the typing test by setting a new random sentence
   * and resetting all test-related state.
   */
  const initializeTest = () => {
    sentence.value = getRandomSentence(); // Get a new random sentence
    typedText.value = '';                // Clear typed text
    timer.value = DEFAULT_TIME;          // Reset timer
    isRunning.value = false;             // Ensure test is not running
    errors.value = [];                   // Clear any error highlighting
    stopTest();                          // Clear any existing timer interval
  };

  /**
   * Starts the typing test.
   * This is typically called when the user types the first character.
   */
  const startTest = () => {
    if (!isRunning.value) {
      isRunning.value = true;
      // Start the timer countdown
      timerInterval = setInterval(() => {
        if (timer.value > 0) {
          timer.value--;
        } else {
          stopTest(); // Stop the test when timer reaches zero
        }
      }, 1000); // Update every second
    }
  };

  /**
   * Stops the typing test.
   * This is called when the timer runs out or the user finishes the sentence.
   */
  const stopTest = () => {
    isRunning.value = false;
    if (timerInterval) {
      clearInterval(timerInterval); // Clear the timer interval to stop countdown
      timerInterval = null;
    }
  };

  /**
   * Resets the typing test to its initial state.
   * Gets a new random sentence and clears all user input and stats.
   */
  const resetTest = () => {
    stopTest();          // Stop any active test
    initializeTest();    // Re-initialize for a fresh test
  };

  /**
   * Computed property for Words Per Minute (WPM).
   * Calculates WPM based on correctly typed words and elapsed time.
   * A "word" is typically defined as 5 characters, including spaces.
   */
  const wpm = computed(() => {
    if (timer.value === DEFAULT_TIME && !isRunning.value) return 0; // If test hasn't started or just reset
    const totalChars = typedText.value.length;
    const timeElapsedInMinutes = (DEFAULT_TIME - timer.value) / 60;

    if (timeElapsedInMinutes === 0) return 0; // Avoid division by zero

    // Calculate correctly typed characters
    let correctChars = 0;
    for (let i = 0; i < totalChars; i++) {
      if (typedText.value[i] === sentence.value[i]) {
        correctChars++;
      }
    }

    // WPM = (Correct Characters / 5) / Time Elapsed in Minutes
    return Math.round((correctChars / 5) / timeElapsedInMinutes);
  });

  /**
   * Computed property for Characters Per Minute (CPM).
   * Calculates CPM based on all typed characters (correct or incorrect) and elapsed time.
   */
  const cpm = computed(() => {
    if (timer.value === DEFAULT_TIME && !isRunning.value) return 0;
    const totalChars = typedText.value.length;
    const timeElapsedInMinutes = (DEFAULT_TIME - timer.value) / 60;

    if (timeElapsedInMinutes === 0) return 0;

    // CPM = Total Characters / Time Elapsed in Minutes
    return Math.round(totalChars / timeElapsedInMinutes);
  });

  /**
   * Computed property for Accuracy Percentage.
   * Calculates accuracy based on correctly typed characters vs. total typed characters.
   */
  const accuracy = computed(() => {
    if (typedText.value.length === 0) return 100; // 100% accuracy if nothing is typed yet

    let correctChars = 0;
    // Iterate only up to the length of the typed text
    for (let i = 0; i < typedText.value.length; i++) {
      if (typedText.value[i] === sentence.value[i]) {
        correctChars++;
      }
    }
    // Accuracy = (Correct Characters / Total Typed Characters) * 100
    return (correctChars / typedText.value.length) * 100;
  });

  // Return all reactive states and functions to be used by components
  return {
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
    resetTest,
    initializeTest,
  };
}
