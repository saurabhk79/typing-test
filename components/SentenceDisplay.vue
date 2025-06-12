<template>
  <div
    class="sentence-display relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-4xl w-full text-left text-xl md:text-2xl leading-relaxed border border-gray-200 dark:border-gray-700 cursor-text overflow-hidden"
    tabindex="0"
    @click="focusInput"
    @keydown="handleKeyDown"
  >
    <textarea
      ref="hiddenInputRef"
      v-model="internalTypedText"
      @input="handleInput"
      @blur="isFocused = false"
      @focus="isFocused = true"
      class="absolute inset-0 opacity-0 z-0 cursor-text resize-none"
      aria-label="Typing input"
      autocapitalize="off"
      autocomplete="off"
      autocorrect="off"
      spellcheck="false"
    ></textarea>

    <span
      v-for="(char, index) in sentence"
      :key="index"
      :class="{
        'text-red-500': errors[index],
        'text-green-600':
          internalTypedText[index] === char &&
          !errors[index] &&
          internalTypedText.length > index,
        'text-gray-400': internalTypedText.length <= index && !errors[index],
        'text-gray-900 dark:text-gray-100':
          internalTypedText.length > index &&
          !errors[index] &&
          internalTypedText[index] !== char,
      }"
      class="relative inline-block transition-colors duration-100"
    >
      {{ char }}
      <span
        v-if="index === internalTypedText.length && isFocused && isRunning"
        class="absolute -bottom-1 left-0 w-0.5 h-full bg-blue-500 animate-blink"
        :style="{ left: '50%', transform: 'translateX(-50%)' }"
      ></span>
    </span>
    <span
      v-if="internalTypedText.length === 0 && isFocused && isRunning"
      class="absolute -bottom-1 left-0 w-0.5 h-full bg-blue-500 animate-blink"
      :style="{ left: '0', transform: 'translateX(-50%)' }"
    ></span>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, nextTick, computed } from "vue";

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
  isRunning: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:typedText", "start", "update:errors"]);

const hiddenInputRef = ref(null);
const isFocused = ref(false);

const internalTypedText = computed({
  get: () => props.typedText,
  set: (value) => {
    emit("update:typedText", value);
  },
});

const focusInput = () => {
  hiddenInputRef.value?.focus();
};

const handleInput = (event) => {
  const newText = event.target.value;

  if (newText.length > 0 && !props.isRunning) {
    emit("start");
  }

  if (newText.length <= props.sentence.length) {
    internalTypedText.value = newText;
    updateErrorHighlighting(newText);
  } else {
    event.target.value = props.typedText;
  }
};

const handleKeyDown = (event) => {
  if (event.key === "Backspace") {
    event.preventDefault();
    return;
  }

  if (
    event.key.length > 1 &&
    ![
      "Delete",
      "Enter",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
    ].includes(event.key)
  ) {
    return;
  }

  if (!props.isRunning) {
    if (internalTypedText.value.length === 0) {
      return;
    } else {
      event.preventDefault();
      return;
    }
  }

  if (event.key === " ") {
    const currentTypedChar =
      internalTypedText.value[internalTypedText.value.length - 1];
    const currentSentenceChar = props.sentence[internalTypedText.value.length];

    if (
      currentTypedChar === " " ||
      (currentSentenceChar !== " " &&
        internalTypedText.value.length < props.sentence.length)
    ) {
      event.preventDefault();
    }
  }

  if (
    internalTypedText.value.length === props.sentence.length &&
    internalTypedText.value === props.sentence
  ) {
    if (
      event.key !== "Delete" &&
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowRight"
    ) {
      event.preventDefault();
    }
  }
};

const updateErrorHighlighting = (currentTypedText) => {
  const newErrors = [];
  for (let i = 0; i < props.sentence.length; i++) {
    if (
      i < currentTypedText.length &&
      currentTypedText[i] !== props.sentence[i]
    ) {
      newErrors[i] = true;
    } else {
      newErrors[i] = false;
    }
  }
  emit("update:errors", newErrors);
};

watch(
  () => props.typedText,
  (newVal) => {
    if (newVal === "") {
      nextTick(() => {
        hiddenInputRef.value?.focus();
      });
      updateErrorHighlighting("");
    } else if (
      newVal.length > 0 &&
      newVal.length === props.sentence.length &&
      newVal === props.sentence
    ) {
      hiddenInputRef.value?.blur();
    }
  },
  { immediate: true }
);

onMounted(() => {
  hiddenInputRef.value?.focus();
});
</script>

<style scoped>
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.animate-blink {
  animation: blink 1s step-end infinite;
}

.sentence-display textarea {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  caret-color: transparent;
}

.sentence-display {
  white-space: pre-wrap;
}
</style>
