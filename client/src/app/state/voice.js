// Say the given phrase in the given voice
export function sayIt(phrase, language_idx) {
  const voices = speechSynthesis.getVoices();
  let utterance = new window.SpeechSynthesisUtterance(phrase);
  utterance.voice = voices[language_idx];
  speechSynthesis.speak(utterance);
}
