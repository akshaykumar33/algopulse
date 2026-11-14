var strWithout3a3b = function(a, b) {
  const res = [];
  while (a > 0 || b > 0) {
    const len = res.length;
    let writeA = false;
    if (len >= 2 && res[len - 1] === 'a' && res[len - 2] === 'a') {
      writeA = false;
    } else if (len >= 2 && res[len - 1] === 'b' && res[len - 2] === 'b') {
      writeA = true;
    } else {
      writeA = a >= b;
    }

    if (writeA) {
      res.push('a');
      a--;
    } else {
      res.push('b');
      b--;
    }
  }
  return res.join('');
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      console.log(JSON.stringify(strWithout3a3b(JSON.parse(lines[i]), JSON.parse(lines[i + 1]))));
    }
  }
}

module.exports = strWithout3a3b;
