var processStr = function(s) {
  const res = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '*') {
      if (res.length > 0) res.pop();
    } else if (c === '#') {
      const len = res.length;
      for (let j = 0; j < len; j++) {
        res.push(res[j]);
      }
    } else if (c === '%') {
      res.reverse();
    } else {
      res.push(c);
    }
  }
  return res.join('');
};

var solve = processStr;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const out = [];
    for (let i = 0; i < lines.length; i++) {
      const s = JSON.parse(lines[i]);
      out.push(JSON.stringify(processStr(s)));
    }
    console.log(out.join('\n'));
  }
}

module.exports = processStr;
