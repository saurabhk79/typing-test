// composables/useSentences.js

/**
 * A collection of sentences for the typing test.
 * These are simple, common sentences to ensure variety.
 */
const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Never underestimate the power of a good book.",
  "The early bird catches the worm every single time.",
  "Innovation distinguishes between a leader and a follower.",
  "Learning new things can be a truly rewarding experience.",
  "Technology has transformed the way we live and work.",
  "The sun always shines brightest after the rain.",
  "Practice makes perfect in almost every situation.",
  "Creativity is intelligence having fun in its own way.",
  "Challenges are what make life interesting and overcoming them is what makes life meaningful.",
  "The greatest glory in living lies not in never falling, but in rising every time we fall.",
  "It is during our darkest moments that we must focus to see the light.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Strive not to be a success, but rather to be of value.",
  "The only way to do great work is to love what you do.",
  "If you can dream it, you can achieve it.",
  "The journey of a thousand miles begins with a single step.",
  "Do not go where the path may lead, go instead where there is no path and leave a trail.",
  "The best way to predict the future is to create it.",
  "Life is what happens when you're busy making other plans.",
];

/**
 * Custom composable to provide random sentences for the typing test.
 */
export function useSentences() {
  /**
   * Returns a random sentence from the predefined list.
   * @returns {string} A random sentence.
   */
  const getRandomSentence = () => {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    return sentences[randomIndex];
  };

  // Return the function that provides a random sentence
  return {
    getRandomSentence,
  };
}
