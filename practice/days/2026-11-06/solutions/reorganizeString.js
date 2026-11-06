var reorganizeString = function(s) {
  const n = s.length;
  const count = new Int32Array(26);
  for (let i = 0; i < n; i++) {
    count[s.charCodeAt(i) - 97]++;
  }

  let maxCount = 0;
  let maxChar = 0;
  for (let c = 0; c < 26; c++) {
    if (count[c] > maxCount) {
      maxCount = count[c];
      maxChar = c;
    }
  }

  if (maxCount > Math.floor((n + 1) / 2)) {
    return "";
  }

  const ans = new Array(n);
  let idx = 0;

  while (count[maxChar] > 0) {
    ans[idx] = String.fromCharCode(maxChar + 97);
    idx += 2;
    count[maxChar]--;
  }

  for (let c = 0; c < 26; c++) {
    while (count[c] > 0) {
      if (idx >= n) idx = 1;
      ans[idx] = String.fromCharCode(c + 97);
      idx += 2;
      count[c]--;
    }
  }

  return ans.join('');
};

var solve = typeof reorganizeString !== 'undefined' ? reorganizeString : null;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i++) {
        const s = JSON.parse(lines[i]);
        console.log(JSON.stringify(solve(s)));
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = solve;

