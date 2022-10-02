const fs = require('fs');
const cliArgs = process.argv.slice(2);

/** Validate */
if (!cliArgs || cliArgs.length === 0) {
  return console.warn(
    'No argument provided. Example of proper usage: node main.js "*at"'
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

/** Generate */
const generate = require('./dist/index').default;
const phraseLike = cliArgs[0].toLowerCase();
console.log(`Generating phrases for: "${phraseLike}"`);
const phrases = generate(phraseLike);

/** Write results */
console.log('Writing results...');
if (!fs.existsSync('out/')) {
  fs.mkdirSync('out/');
}
fs.writeFileSync('out/phrases.json', JSON.stringify(phrases, null, 4));

console.log('Success!');
console.log('Results written to out/phrases.json');
