import generatePhrases from './util/generatePhrases';
import generateWords from './util/generateWords';

/**
 * Enter a phrase with wildcard characters, generate the rest from the english dictionary
 *
 * e.g. "a*" -> [ax, ab, am, aw, ag, ah, ay, ad, al, an, aa, ae, ai, ar, as, at]
 */
const generate = (phraseLike: string): string[] => {
  const wordLikes = phraseLike.split(' ');
  const wordsToZip = wordLikes.map(generateWords);
  const phrases = generatePhrases(wordsToZip);

  return phrases;
};

export default generate;
