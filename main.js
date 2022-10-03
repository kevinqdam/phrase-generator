#!/usr/bin/env node
const fs = require('fs');
const yargs = require('yargs');

const argv = yargs(process.argv.slice(2))
  .scriptName('phrase-generator')
  .scriptName('phrase-generator')
  .usage('$0 pattern')
  .example(
    '$0 "c*t *n **e **t"',
    'write out the possible phrases, one of which should be "cat in the hat"'
  )
  .alias('v', 'verbose')
  .alias('h', 'help')
  .help('help').argv;

/** Validate */
if (argv._.length === 0) {
  return console.warn(
    'No argument provided. Example of proper usage: phrase-generator "c*t *n **e **t"'
  );
}
if (!fs.existsSync('./dist/index.js')) {
  return console.warn(
    './dist/index.js is missing. This project may not be built yet. Please execute npm run build before executing.'
  );
}

/** Clean before generating */
if (fs.existsSync('out')) {
  fs.rmSync('out', { recursive: true });
}
fs.mkdirSync('out');

/** Generate */

/**
 * Reference: https://stackoverflow.com/questions/8313628/node-js-request-how-to-emitter-setmaxlisteners
 */
require('events').EventEmitter.prototype.setMaxListeners(20);

const writeStream = fs.createWriteStream('out/phrases.txt');
const generate = require('./dist/index').default;
const phraseLike = argv._[0].toLowerCase();
console.log(`Generating phrases for: "${phraseLike}"`);
generate(phraseLike, writeStream, { verbose: argv.verbose });

console.log('Success!');
console.log('Results written to out/phrases.txt');
