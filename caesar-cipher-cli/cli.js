#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');

const { cipher, decipher } = require('./cipher.js');
const { checkOpts, parseAction, parseNumber } = require('./utils.js')

program
  .version('0.1.0')
  .option('-s, --shift <number>', 'a shift', parseNumber)
  .option('-i, --input <input>', 'an input file')
  .option('-o, --output <output>', 'an output file')
  .option('-a, --action <action>', 'an action encode/decode', parseAction);

program.parse(process.argv);

process.on('exit', (code) => console.log(chalk.blue('Process exit with code', code)));

checkOpts(program.opts());
// if (program.test) {
//   console.log(cipher(program.opts().test))
// }
