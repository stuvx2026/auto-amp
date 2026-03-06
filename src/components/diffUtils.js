export function diffWords(oldWord, newWord, condition = '@OLD = true') {
  if (oldWord === newWord) return oldWord;

  const oldChars = oldWord.split('');
  const newChars = newWord.split('');
  let result = '';
  let i = 0;
  const maxLength = Math.max(oldChars.length, newChars.length);

  while (i < maxLength) {
    const o = oldChars[i] || '';
    const n = newChars[i] || '';

    if (o === n) {
      result += o;
      i++;
    } else {
      let oldDiff = '';
      let newDiff = '';
      while (i < maxLength && (oldChars[i] !== newChars[i])) {
        oldDiff += oldChars[i] || '';
        newDiff += newChars[i] || '';
        i++;
      }
      result += `%%[IF ${condition} THEN]${oldDiff}%%[ELSE]${newDiff}%%[ENDIF]%%`;
    }
  }

  return result;
}

export function compareTexts(oldText, newText, condition = '@OLD = true') {
  const oldWords = oldText.split(' ');
  const newWords = newText.split(' ');
  const maxLength = Math.max(oldWords.length, newWords.length);

  const result = [];
  for (let i = 0; i < maxLength; i++) {
    const oldWord = oldWords[i] || '';
    const newWord = newWords[i] || '';
    result.push(diffWords(oldWord, newWord, condition));
  }

  return result.join(' ').trim();
}