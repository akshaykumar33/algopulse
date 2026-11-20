var clearStars = function(s) {
  const n = s.length;
  const stacks = Array.from({ length: 26 }, () => []);
  const removed = new Uint8Array(n);

  for (let i = 0; i < n; i++) {
    if (s[i] === '*') {
      removed[i] = 1;
      for (let c = 0; c < 26; c++) {
        if (stacks[c].length > 0) {
          const idx = stacks[c].pop();
          removed[idx] = 1;
          break;
        }
      }
    } else {
      stacks[s.charCodeAt(i) - 97].push(i);
    }
  }

  let ans = '';
  for (let i = 0; i < n; i++) {
    if (!removed[i]) ans += s[i];
  }
  return ans;
};

var solve = clearStars;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(solve(parsed)));
    }
  } catch (e) {}
}

module.exports = clearStars;