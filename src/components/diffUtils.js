// src/components/diffUtils.js

/**
 * Compares two words character by character and returns AMPscript-wrapped differences
 * @param {string} oldWord 
 * @param {string} newWord 
 * @returns {string} - AMPscript wrapped word
 */
export function diffWords(oldWord, newWord) {
  if (oldWord === newWord) return oldWord; // identical word

  let oldChars = oldWord.split('');
  let newChars = newWord.split('');
  let maxLength = Math.max(oldChars.length, newChars.length);

  let oldDiff = '';
  let newDiff = '';

  for (let i = 0; i < maxLength; i++) {
    const o = oldChars[i] || '';
    const n = newChars[i] || '';
    if (o !== n) {
      oldDiff += o;
      newDiff += n;
    }
  }

  // Wrap only differences in AMPscript
  return `[AMP IF @OLD = true] ${oldDiff} [else] ${newDiff} [endif]`;
}

/**
 * Compares two sentences and returns AMPscript-formatted output
 * @param {string} oldText 
 * @param {string} newText 
 * @returns {string}
 */
export function compareTexts(oldText, newText) {
  const oldWords = oldText.split(' ');
  const newWords = newText.split(' ');
  const maxLength = Math.max(oldWords.length, newWords.length);

  const result = [];

  for (let i = 0; i < maxLength; i++) {
    const oldWord = oldWords[i] || '';
    const newWord = newWords[i] || '';
    result.push(diffWords(oldWord, newWord));
  }

  return result.join(' ');
}