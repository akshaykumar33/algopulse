var maxLength = function(arr) {
  const valid = [];
  for (const s of arr) {
    let mask = 0;
    let ok = true;
    for (let i = 0; i < s.length; i++) {
      const bit = 1 << (s.charCodeAt(i) - 97);
      if ((mask & bit) !== 0) {
        ok = false;
        break;
      }
      mask |= bit;
    }
    if (ok) valid.push([mask, s.length]);
  }
  let ans = 0;
  function bt(idx, curMask, curLen) {
    if (curLen > ans) ans = curLen;
    for (let i = idx; i < valid.length; i++) {
      if ((curMask & valid[i][0]) === 0) {
        bt(i + 1, curMask | valid[i][0], curLen + valid[i][1]);
      }
    }
  }
  bt(0, 0, 0);
  return ans;
};

var solve = maxLength;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      try {
        const parsed = JSON.parse(line);
        console.log(JSON.stringify(solve(parsed)));
      } catch (e) {
        console.error(e.message);
      }
    }
  }
}

module.exports = maxLength;
