import wordsArr from '../dictionary.json';

const words = new Set(wordsArr);

const isWord = (maybeWord: string) => {
  return words.has(maybeWord);
};

export default isWord;
