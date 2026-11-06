var evaluate = function(s, knowledge) {
  const map = new Map();
  for (let i = 0; i < knowledge.length; i++) {
    map.set(knowledge[i][0], knowledge[i][1]);
  }

  const out = [];
  let inBracket = false;
  let key = '';

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '(') {
      inBracket = true;
      key = '';
    } else if (ch === ')') {
      inBracket = false;
      out.push(map.has(key) ? map.get(key) : '?');
    } else if (inBracket) {
      key += ch;
    } else {
      out.push(ch);
    }
  }

  return out.join('');
};

var solve = typeof evaluate !== 'undefined' ? evaluate : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        const s = JSON.parse(lines[i]);
        const knowledge = JSON.parse(lines[i + 1]);
        console.log(JSON.stringify(solve(s, knowledge)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

