const chalk = require('chalk');
const { allowedActions } = require('./config.js');

function parseAction(str) {
  return str && str.toLowerCase();
}

function parseNumber(numb) {
  return +numb;
}

function checkOpts(opt) {
  console.log(opt);
  let { shift, action } = opt;
  if (!shift) {
    console.error(chalk.red('Shift is required'));
    process.exit(404);
  }

  if (shift < 0) {
    console.error(chalk.red('Shift must be more than 0'));
    process.exit(404)
  }

  if (!Number.isInteger(shift)) {
    console.error(chalk.red('Shift must be integer value'));
    process.exit(404)
  }

  if (!action) {
    console.error(chalk.red('Action is required'));
    process.exit(404);
  }

  if (!allowedActions.includes(action)) {
    console.error(chalk.red(`Action shuld be "encode" or "decode", but passed "${action}"`));
    process.exit(404);
  }
};


module.exports = {
  checkOpts,
  parseAction,
  parseNumber,
};
