const generatePhrasesAux = (wordsToZip: string[][], i: number, phrase: string[], phrases: string[]) => {
  if (i === wordsToZip.length) {
    return phrases.push(phrase.join(' '));
  }
  for (const word of wordsToZip[i]) {
    phrase.push(word);
    generatePhrasesAux(wordsToZip, i + 1, phrase, phrases);
    phrase.pop();
  }
};

const generatePhrases = (wordsToZip: string[][]): string[] => {
  const phrases: string[] = [];
  generatePhrasesAux(wordsToZip, 0, [], phrases);

  return phrases;
};

export default generatePhrases;
