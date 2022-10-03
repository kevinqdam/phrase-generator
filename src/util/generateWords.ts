import isWord from './isWord';

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

const generateWordsAux = function* (
  letters: string[],
  i = 0
): Generator<string> {
  if (i === 0 && !letters.includes('*')) {
    yield letters.join('');

    return;
  }
  if (i === letters.length) {
    const maybeWord = letters.join('');
    if (isWord(maybeWord)) {
      yield maybeWord;
    }

    return;
  }

  if (letters[i] === '*') {
    for (const letter of ALPHABET) {
      letters[i] = letter;
      yield* generateWordsAux(letters, i + 1);
      letters[i] = '*';
    }
  } else {
    yield* generateWordsAux(letters, i + 1);
  }
};

const generatorFromWordLike = function (
  wordLike: string
): () => Generator<string> {
  const letters = wordLike.split('');
  return () => generateWordsAux(letters);
};

export default generatorFromWordLike;
