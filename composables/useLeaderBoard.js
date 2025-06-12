import { ref } from 'vue';

const LOCAL_STORAGE_KEY = 'typingSpeedLeaderboard';

const scores = ref([]);

export function useLeaderboard() {
  const loadScores = () => {
    if (typeof localStorage !== 'undefined') {
      try {
        const storedScores = localStorage.getItem(LOCAL_STORAGE_KEY);
        scores.value = storedScores ? JSON.parse(storedScores) : [];
        scores.value.sort((a, b) => {
          if (b.wpm !== a.wpm) {
            return b.wpm - a.wpm;
          }
          return b.accuracy - a.accuracy;
        });
      } catch (e) {
        console.error("Failed to load scores from localStorage:", e);
        scores.value = [];
      }
    }
  };

  const saveScore = (newScore) => {
    if (typeof localStorage !== 'undefined') {
      if (newScore && typeof newScore.wpm === 'number' && typeof newScore.accuracy === 'number') {
        scores.value.push(newScore);
        scores.value.sort((a, b) => {
          if (b.wpm !== a.wpm) {
            return b.wpm - a.wpm;
          }
          return b.accuracy - a.accuracy;
        });
        scores.value = scores.value.slice(0, 5);
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(scores.value));
        } catch (e) {
          console.error("Failed to save score to localStorage:", e);
        }
      } else {
        console.warn("Attempted to save an invalid score:", newScore);
      }
    }
  };

  return {
    scores,
    loadScores,
    saveScore,
  };
}
