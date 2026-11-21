var countOfSubstrings = function(word, k) {
  let ans = 0;
  const n = word.length;
  for (let i = 0; i < n; i++) {
    let mask = 0, cons = 0;
    for (let j = i; j < n; j++) {
      const ch = word[j];
      if (ch === 'a') mask |= 1;
      else if (ch === 'e') mask |= 2;
      else if (ch === 'i') mask |= 4;
      else if (ch === 'o') mask |= 8;
      else if (ch === 'u') mask |= 16;
      else cons++;
      if (cons > k) break;
      if (cons === k && mask === 31) ans++;
    }
  }
  return ans;
};

var solve = countOfSubstrings;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed[0], parsed[1])));
    }
  } catch (e) {}
}

module.exports = countOfSubstrings;