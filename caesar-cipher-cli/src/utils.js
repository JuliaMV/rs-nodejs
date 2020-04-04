/* eslint-disable */
const path = require('path');
const fs = require('fs');
const { allowedActions } = require('./config.js');

function parseAction(str) {
  return str && str.toLowerCase();
}

function parseNumber(numb) {
  return +numb;
}

function checkOpts(opt) {
  const { shift, action, input, output } = opt;
  if (!shift) {
    throw new Error('Shift is required');
  }

  if (shift < 0) {
    throw new Error('Shift must greater than 0');
  }

  if (!Number.isInteger(shift)) {
    throw new Error('Shift must be integer');
  }

  if (!action) {
    throw new Error('Action is required');
  }

  if (!allowedActions.includes(action)) {
    throw new Error(
      `Action shuld be "encode" or "decode", but passed "${action}"`
    );
  }

  if (input) {
    checkFileAccess(input, 'read');
  }

  if (output) {
    checkFileAccess(output, 'write');
  }
}

function checkFileAccess(str, method) {
  const file = path.resolve(
    __dirname
      .split(path.sep)
      .slice(0, -1)
      .join(path.sep),
    str
  );

  fs.accessSync(file, fs.constants.F_OK);

  if (method === 'read') {
    fs.accessSync(file, fs.constants.R_OK);
  }

  if (method === 'write') {
    fs.accessSync(file, fs.constants.W_OK);
  }
}

module.exports = {
  checkOpts,
  parseAction,
  parseNumber
};
