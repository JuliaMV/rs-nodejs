#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const { pipeline } = require('stream');

const { encoding } = require('./src/config.js');
const { checkOpts, parseAction, parseNumber } = require('./src/utils.js');
const { createTransformStream } = require('./src/transformStream.js');

program
  .version('0.1.0')
  .option('-s, --shift <number>', 'a shift', parseNumber)
  .option('-i, --input <input>', 'an input file')
  .option('-o, --output <output>', 'an output file')
  .option('-a, --action <action>', 'an action encode/decode', parseAction);

program.parse(process.argv);

process.on('exit', (code) => console.log(chalk.blue('Process exit with code', code)));

try {
  checkOpts(program.opts());
} catch (err) {
  console.error(chalk.red(err));
  process.exit(9);
}

process.stdin.setEncoding(encoding);

const { shift, action, input, output } = program.opts();

const inputFile = input && path.resolve(__dirname, input);
const outputFile = output && path.resolve(__dirname, output);

const readStream = inputFile ? fs.createReadStream(inputFile, { encoding: encoding }) : process.stdin;
const writeStream = outputFile ? fs.createWriteStream(outputFile,{ encoding, flags: 'a'}) : process.stdout;

const transformStream = createTransformStream(action, shift);

pipeline(
  readStream,
  transformStream,
  writeStream,
  (err) => {
    if (err) {
      console.log(chalk.red('Something went wrong', err))
    } else {
      console.log(chalk.green('Finished'))
    }
  }
);
