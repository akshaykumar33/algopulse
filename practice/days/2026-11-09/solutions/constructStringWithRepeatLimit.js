var repeatLimitedString = function(s, repeatLimit) {
  const count = new Int32Array(26);
  for (let idx = 0; idx < s.length; idx++) {
    count[s.charCodeAt(idx) - 97]++;
  }
  const res = [];
  let i = 25;
  while (i >= 0) {
    if (count[i] === 0) {
      i--;
      continue;
    }
    const take = Math.min(count[i], repeatLimit);
    const ch = String.fromCharCode(97 + i);
    for (let k = 0; k < take; k++) {
      res.push(ch);
    }
    count[i] -= take;
    if (count[i] > 0) {
      let j = i - 1;
      while (j >= 0 && count[j] === 0) {
        j--;
      }
      if (j < 0) {
        break;
      }
      res.push(String.fromCharCode(97 + j));
      count[j]--;
    }
  }
  return res.join('');
};

var solve = repeatLimitedString;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {}
}

module.exports = solve;
