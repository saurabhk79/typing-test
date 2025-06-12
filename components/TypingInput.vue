<!-- components/TypingInput.vue -->
<template>
  <div class="typing-input-container w-full max-w-4xl">
    <textarea
      ref="textareaRef"
      :value="typedText"
      @input="handleInput"
      @keydown.space="handleSpace"
      @keydown.backspace="handleBackspace"
      :disabled="!isRunning && typedText.length > 0"
      rows="6"
      class="w-full p-6 text-2xl md:text-3xl bg-primary-100 dark:bg-primary-700 text-primary-900 dark:text-primary-100 rounded-lg shadow-inner focus:outline-none focus:ring-4 focus:ring-accent-400 transition duration-200 ease-in-out resize-none border-2 border-gray-300 dark:border-gray-600"
      :class="{ 'opacity-70 cursor-not-allowed': !isRunning && typedText.length > 0 }"
      placeholder="Start typing here..."
      autofocus
    ></textarea>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, nextTick } from 'vue';

// Define props passed from the parent component (pages/typing.vue)
const props = defineProps({
  sentence: {
    type: String,
    required: true,
  },
  typedText: {
    type: String,
    required: true,
  },
  isRunning: {
    type: Boolean,
    required: true,
  },
});

// Define custom events that this component can emit
const emit = defineEmits(['update:typedText', 'start', 'update:errors']);

// Reference to the textarea DOM element for focus management
const textareaRef = ref(null);

/**
 * Handles user input in the textarea.
 *
 * @param {Event} event - The input event object.
 */
const handleInput = (event) => {
  const newText = event.target.value;

  // Emit 'start' event only once when typing begins and test is not running
  if (newText.length > 0 && !props.isRunning) {
    emit('start');
  }

  // Ensure user can't type beyond the sentence length
  if (newText.length <= props.sentence.length) {
    emit('update:typedText', newText); // Update the typedText model in parent
    updateErrorHighlighting(newText); // Re-evaluate errors with new input
  } else {
    // If user tries to type past the sentence, revert to previous state
    event.target.value = props.typedText;
  }
};

/**
 * Handles the Spacebar key press.
 * Prevents adding extra spaces if the last character typed is already a space
 * or if the current sentence character is not a space but user pressed space.
 * This ensures accurate WPM calculation by treating space as a word separator.
 *
 * @param {Event} event - The keyboard event object.
 */
const handleSpace = (event) => {
  if (props.typedText.length === props.sentence.length && props.typedText === props.sentence) {
    // If the sentence is fully typed and correct, prevent further input
    event.preventDefault();
    return;
  }

  const currentTypedChar = props.typedText[props.typedText.length - 1];
  const currentSentenceChar = props.sentence[props.typedText.length];

  // Prevent adding multiple spaces or space if sentence doesn't have it at current position
  if (currentTypedChar === ' ' && event.key === ' ') {
    event.preventDefault();
  }
  // Prevent space if the expected character is not a space
  else if (event.key === ' ' && currentSentenceChar !== ' ' && props.typedText.length < props.sentence.length) {
    event.preventDefault();
  }
};

/**
 * Handles the Backspace key press.
 * Manually prevents typing past the beginning of the text,
 * although browsers usually handle this. This is more for consistency
 * and potential custom logic if needed.
 *
 * @param {Event} event - The keyboard event object.
 */
const handleBackspace = (event) => {
  if (props.typedText.length === 0) {
    event.preventDefault(); // Prevent backspacing when input is empty
  }
  // Error highlighting will automatically adjust via handleInput -> updateErrorHighlighting
};

/**
 * Updates the error highlighting by comparing typed text with the original sentence.
 * Emits an 'update:errors' event with an array indicating error positions.
 *
 * @param {string} currentTypedText - The current text entered by the user.
 */
const updateErrorHighlighting = (currentTypedText) => {
  const newErrors = [];
  for (let i = 0; i < currentTypedText.length; i++) {
    // Check if the typed character matches the corresponding character in the sentence
    // and if the character is not a space (spaces are often ignored for direct error highlighting visually, but count as errors for accuracy)
    if (currentTypedText[i] !== props.sentence[i] && props.sentence[i] !== ' ') {
      newErrors[i] = true; // Mark as an error
    } else {
      newErrors[i] = false; // Mark as correct
    }
  }
  emit('update:errors', newErrors); // Emit the updated errors array
};

// Watch for changes in the `typedText` prop.
// If `typedText` becomes empty (e.g., after a reset), focus the textarea.
watch(() => props.typedText, (newVal) => {
  if (newVal === '') {
    nextTick(() => {
      textareaRef.value?.focus(); // Focus the textarea after it's rendered
    });
    updateErrorHighlighting(''); // Clear errors when text is cleared
  } else if (newVal.length > 0 && newVal.length === props.sentence.length && newVal === props.sentence) {
    // If the entire sentence is typed correctly, blur the input
    textareaRef.value?.blur();
  }
}, { immediate: true }); // Run immediately on component mount to set initial focus
</script>

<style scoped>
/* No specific scoped styles needed as TailwindCSS handles all styling. */
</style>
 