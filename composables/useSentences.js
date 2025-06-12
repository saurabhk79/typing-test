const sentences = [
  "The rapid advancements in artificial intelligence are reshaping industries globally, offering new opportunities for innovation and efficiency. However, careful consideration of ethical implications and societal impacts is crucial for responsible development and deployment of these powerful technologies.",
  "Learning to code opens up a vast world of possibilities, enabling individuals to create, problem-solve, and contribute to the digital landscape. Consistent practice, collaboration with peers, and a curious mindset are key ingredients for mastering programming skills and building impactful applications.",
  "Climate change presents one of the most pressing challenges of our time, demanding urgent and coordinated global action. Transitioning to renewable energy sources, implementing sustainable practices, and fostering international cooperation are vital steps towards mitigating its effects and preserving the planet for future generations.",
  "The beauty of nature inspires awe and wonder, from majestic mountains to tranquil oceans and lush forests. Spending time outdoors has numerous benefits for physical and mental well-being, reminding us of the intricate balance of ecosystems and our role in protecting them.",
  "Effective communication is a cornerstone of success in both personal and professional spheres. Active listening, clear articulation of ideas, empathy, and constructive feedback are essential skills that foster understanding, strengthen relationships, and facilitate collaborative achievements.",
  "Reading is a powerful tool for expanding knowledge, enhancing critical thinking, and exploring diverse perspectives. Whether it's fiction, non-fiction, or poetry, immersing oneself in books can transport minds to different worlds and deepen understanding of the human experience.",
  "The internet has revolutionized access to information and connected billions of people worldwide. While it offers unprecedented opportunities for learning and communication, navigating its vastness responsibly and critically evaluating sources are important for discerning reliable information.",
  "Physical activity is fundamental for maintaining a healthy lifestyle, contributing to improved cardiovascular health, muscle strength, and mood. Incorporating regular exercise into daily routines, even in small increments, can lead to significant long-term benefits.",
  "Creativity thrives on imagination and the courage to explore new ideas without fear of failure. It's a process of experimentation, learning from mistakes, and pushing boundaries, ultimately leading to innovative solutions and unique expressions.",
  "The history of humanity is a rich tapestry woven with triumphs, challenges, and continuous evolution. Studying the past provides valuable insights into present circumstances and guides our aspirations for a more just and sustainable future.",
];

export function useSentences() {
  const getRandomSentence = () => {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    return sentences[randomIndex];
  };

  return {
    getRandomSentence,
  };
}
