import { WriteStream } from 'fs';
import generatePhrases from './util/generatePhrases';
import generateWords from './util/generateWords';

type GenerateOptions = {
  verbose?: boolean;
};

/**
 * Enter a phrase with wildcard characters, generate the rest from the english dictionary
 *
 * e.g. "a*" -> [ax, ab, am, aw, ag, ah, ay, ad, al, an, aa, ae, ai, ar, as, at]
 */
const generate = (
  phraseLike: string,
  ws: WriteStream,
  options?: GenerateOptions
): string[] => {
  const wordLikes = phraseLike.split(' ');
  const wordsToZip = wordLikes.map(generateWords);
  const phrases = generatePhrases(wordsToZip, ws, options?.verbose);

  return phrases;
};

export default generate;
