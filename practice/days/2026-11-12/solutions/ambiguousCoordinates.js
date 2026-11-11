var ambiguousCoordinates = function(s) {
  const digits = s.slice(1, -1);
  const n = digits.length;
  const res = [];

  const validParts = (str) => {
    const out = [];
    const m = str.length;
    if (m === 1 || str[0] !== '0') {
      out.push(str);
    }
    for (let i = 1; i < m; i++) {
      const intPart = str.slice(0, i);
      const fracPart = str.slice(i);
      if ((intPart.length === 1 || intPart[0] !== '0') && fracPart[fracPart.length - 1] !== '0') {
        out.push(intPart + '.' + fracPart);
      }
    }
    return out;
  };

  for (let i = 1; i < n; i++) {
    const left = validParts(digits.slice(0, i));
    const right = validParts(digits.slice(i));
    for (let a = 0; a < left.length; a++) {
      for (let b = 0; b < right.length; b++) {
        res.push('(' + left[a] + ', ' + right[b] + ')');
      }
    }
  }

  res.sort();
  return res;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      let arg;
      try {
        arg = JSON.parse(line);
      } catch (_) {
        arg = line;
      }
      console.log(JSON.stringify(ambiguousCoordinates(arg)));
    }
  }
}

module.exports = ambiguousCoordinates;
