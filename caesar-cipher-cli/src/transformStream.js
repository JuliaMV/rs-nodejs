const { Transform } = require('stream');
const { cipher, decipher } = require('./cipher.js');

function converter(str, action, shift) {
  if (action === 'encode') {
    return cipher(str, shift);
  }

  if (action === 'decode') {
    return decipher(str, shift);
  }
}

function createTransformStream(action, shift) {
  return new Transform({
    writableObjectMode: true,
    transform(chunk, encoding, callback) {
      const data = chunk.toString('utf8');
      const str = converter(data, action, shift);
      callback(null, str);
    }
  });
}

module.exports = { createTransformStream };
