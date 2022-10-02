import isInDictionary from './isInDictionary';

const ALPHABET: readonly string[] = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

const generateWordsAux = (letters: string[], i: number, words: string[]): void => {
  if (i === 0 && !letters.includes('*')) {
    words.push(letters.join(''));

    return;
  }
  if (i === letters.length) {
    const maybeWord = letters.join('');
    if (isInDictionary(maybeWord)) {
      words.push(maybeWord);
    }

    return;
  }

  if (letters[i] === '*') {
    for (const letter of ALPHABET) {
      letters[i] = letter;
      generateWordsAux(letters, i + 1, words);
      letters[i] = '*';
    }
  } else {
    generateWordsAux(letters, i + 1, words);
  }
};

const generateWords = (wordLike: string): string[] => {
  const words: string[] = [];
  const letters = wordLike.split('');
  generateWordsAux(letters, 0, words);

  return words;
};

export default generateWords;
