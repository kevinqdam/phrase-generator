import { WriteStream } from 'fs';

const phraseGeneratorFromWordGenerators = function* (
  wordGenerators: (() => Generator<string>)[],
  i = 0,
  phraseParts: string[] = []
): Generator<string> {
  if (i === wordGenerators.length) {
    yield phraseParts.join(' ');
  } else {
    const words = wordGenerators[i]();
    for (const word of words) {
      phraseParts.push(word);
      yield* phraseGeneratorFromWordGenerators(
        wordGenerators,
        i + 1,
        phraseParts
      );
      phraseParts.pop();
    }
  }
};

const generatePhrases = async (
  wordGenerators: (() => Generator<string>)[],
  ws: WriteStream,
  verbose?: boolean
): Promise<void> => {
  const phraseGenerator = phraseGeneratorFromWordGenerators(wordGenerators);
  for (const phrase of phraseGenerator) {
    if (verbose) {
      console.info(`Writing phrase: ${phrase}`);
    }
    /**
     * Sometimes, WriteStream.write will return `false` when the internal buffer is greater
     * than the `highWaterMark`. When this happens, we should wait for Node to work through
     * the buffer so it can flush. This way, we can avoid maxing out on heap memory usage.
     *
     * Reference: https://stackoverflow.com/questions/50357777/why-does-attempting-to-write-a-large-file-cause-js-heap-to-run-out-of-memory
     */
    if (!ws.write(phrase + '\n')) {
      await new Promise((resolve) => ws.once('drain', resolve));
    }
  }
};

export default generatePhrases;
