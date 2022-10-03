import { WriteStream } from 'fs';
import generatePhrases from './util/generatePhrases';
import generateWords from './util/generateWords';

type GenerateOptions = {
  verbose?: boolean;
};

/**
 * Enter a phrase with wildcard characters, generate the rest from the english dictionary.
 * Phrases are written to a file.
 *
 * e.g. "a*" -> [ax, ab, am, aw, ag, ah, ay, ad, al, an, aa, ae, ai, ar, as, at]
 */
const generate = async (
  phraseLike: string,
  ws: WriteStream,
  options?: GenerateOptions
): Promise<void> => {
  const wordLikes = phraseLike.split(' ');
  const wordGenerators = wordLikes.map(generateWords);
  await generatePhrases(wordGenerators, ws, options?.verbose);
};

export default generate;
