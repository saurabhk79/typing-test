import { ref, computed, watch } from 'vue';
import { useSentences } from './useSentences';

const DEFAULT_TIME = 60;

const sentence = ref('');
const typedText = ref('');
const timer = ref(DEFAULT_TIME);
const isRunning = ref(false);
const errors = ref([]);
let timerInterval = null;

const { getRandomSentence } = useSentences();

export function useTypingTest() {

  const initializeTest = () => {
    sentence.value = getRandomSentence();
    typedText.value = '';
    timer.value = DEFAULT_TIME;
    isRunning.value = false;
    errors.value = [];
    stopTest();
  };

  const startTest = () => {
    if (!isRunning.value) {
      isRunning.value = true;
      timerInterval = setInterval(() => {
        if (timer.value > 0) {
          timer.value--;
        } else {
          stopTest();
        }
      }, 1000);
    }
  };

  const stopTest = () => {
    isRunning.value = false;
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  };

  const resetTest = () => {
    stopTest();
    initializeTest();
  };

  const wpm = computed(() => {
    if (timer.value === DEFAULT_TIME && !isRunning.value) return 0;
    const timeElapsedInSeconds = DEFAULT_TIME - timer.value;
    if (timeElapsedInSeconds === 0) return 0;

    let correctChars = 0;
    for (let i = 0; i < typedText.value.length; i++) {
      if (typedText.value[i] === sentence.value[i]) {
        correctChars++;
      }
    }
    return Math.round((correctChars / 5) / (timeElapsedInSeconds / 60));
  });

  const cpm = computed(() => {
    if (timer.value === DEFAULT_TIME && !isRunning.value) return 0;
    const totalChars = typedText.value.length;
    const timeElapsedInSeconds = DEFAULT_TIME - timer.value;

    if (timeElapsedInSeconds === 0) return 0;

    return Math.round(totalChars / (timeElapsedInSeconds / 60));
  });

  const accuracy = computed(() => {
    if (typedText.value.length === 0) return 100;

    let correctChars = 0;
    for (let i = 0; i < typedText.value.length; i++) {
      if (typedText.value[i] === sentence.value[i]) {
        correctChars++;
      }
    }
    return (correctChars / typedText.value.length) * 100;
  });

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
