function cipher(str, number) {
  const shift = number % 26;
  if (shift === 0) {
    return str;
  }
  return str
    .split('')
    .map(s => {
      let code = s.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        code += shift;
        if (code > 90) {
          code -= 26;
        }
        return String.fromCharCode(code);
      }
      if (code >= 97 && code <= 122) {
        code += shift;
        if (code > 122) {
          code -= 26;
        }
        return String.fromCharCode(code);
      }
      return s;
    })
    .join('');
}

function decipher(str, number) {
  const shift = number % 26;
  if (shift === 0) {
    return str;
  }
  return str
    .split('')
    .map(s => {
      let code = s.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        code -= shift;
        if (code < 65) {
          code += 26;
        }
        return String.fromCharCode(code);
      }
      if (code >= 97 && code <= 122) {
        code -= shift;
        if (code < 97) {
          code += 26;
        }
        return String.fromCharCode(code);
      }
      return s;
    })
    .join('');
}

module.exports = { cipher, decipher };
