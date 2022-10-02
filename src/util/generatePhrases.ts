import { WriteStream } from 'fs';

const generatePhrasesAux = (
  wordsToZip: string[][],
  i: number,
  phraseParts: string[],
  ws: WriteStream,
  verbose?: boolean
) => {
  if (i === wordsToZip.length) {
    const phrase = phraseParts.join(' ');
    if (verbose) {
      console.info(`Writing phrase: ${phrase}`);
    }
    ws.write(phraseParts.join(' '));
    ws.write('\n');

    return;
  }
  for (const word of wordsToZip[i]) {
    phraseParts.push(word);
    generatePhrasesAux(wordsToZip, i + 1, phraseParts, ws, verbose);
    phraseParts.pop();
  }
};

const generatePhrases = (wordsToZip: string[][], ws: WriteStream, verbose?: boolean): string[] => {
  const phrases: string[] = [];
  generatePhrasesAux(wordsToZip, 0, [], ws, verbose);

  return phrases;
};

export default generatePhrases;
