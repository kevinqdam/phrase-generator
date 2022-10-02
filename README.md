# Phrase Generator

## Description
Phrase Generator is a CLI tool that generates possible phrases in English based on a provided pattern.

One strong use case is for word games and puzzles, for example.

## Installation
1. Clone the repo and navigate to the root directory `phrase-generator`
2. Execute `npm ci && npm run build && npm link`

## Usage
```sh
$ phrase-generator "appl* bana**"
```

This will write the following result to a file `out/phrases.txt`:
```txt
apple banaks
apple banana
apply banaks
apply banana
```
