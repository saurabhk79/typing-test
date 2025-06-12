// composables/useLeaderboard.js
import { ref } from 'vue';

// Key for storing leaderboard data in localStorage
const LOCAL_STORAGE_KEY = 'typingSpeedLeaderboard';

// Reactive reference to store the scores.
// It's initialized as an empty array and will be populated from localStorage.
const scores = ref([]);

/**
 * Custom composable for managing leaderboard data in localStorage.
 * Provides functions to load and save scores.
 */
export function useLeaderboard() {
  /**
   * Loads scores from localStorage and updates the `scores` reactive variable.
   * If no scores are found or parsing fails, `scores` will be an empty array.
   */
  const loadScores = () => {
    if (typeof localStorage !== 'undefined') {
      try {
        const storedScores = localStorage.getItem(LOCAL_STORAGE_KEY);
        // Parse the stored JSON string, or default to an empty array if null
        scores.value = storedScores ? JSON.parse(storedScores) : [];
        // Sort scores by WPM in descending order, then by accuracy in descending order for ties
        scores.value.sort((a, b) => {
          if (b.wpm !== a.wpm) {
            return b.wpm - a.wpm; // Sort by WPM descending
          }
          return b.accuracy - a.accuracy; // For tie-breaking, sort by accuracy descending
        });
      } catch (e) {
        console.error("Failed to load scores from localStorage:", e);
        scores.value = []; // Reset scores on error
      }
    }
  };

  /**
   * Saves a new score to the leaderboard.
   * It adds the new score, sorts the list, and keeps only the top 5 scores.
   * Finally, it saves the updated list back to localStorage.
   *
   * @param {Object} newScore - The score object to save (e.g., { wpm: 50, accuracy: 95.5, timestamp: Date.now() }).
   */
  const saveScore = (newScore) => {
    if (typeof localStorage !== 'undefined') {
      // Ensure the new score has necessary properties and is valid
      if (newScore && typeof newScore.wpm === 'number' && typeof newScore.accuracy === 'number') {
        scores.value.push(newScore); // Add the new score
        // Sort scores again to maintain order
        scores.value.sort((a, b) => {
          if (b.wpm !== a.wpm) {
            return b.wpm - a.wpm;
          }
          return b.accuracy - a.accuracy;
        });
        // Keep only the top 5 scores
        scores.value = scores.value.slice(0, 5);
        try {
          // Store the updated scores array as a JSON string in localStorage
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(scores.value));
        } catch (e) {
          console.error("Failed to save score to localStorage:", e);
        }
      } else {
        console.warn("Attempted to save an invalid score:", newScore);
      }
    }
  };

  // Return the reactive scores and the functions to interact with them
  return {
    scores,
    loadScores,
    saveScore,
  };
}
