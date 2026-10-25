var countMagicalPairs = function(s) {
  const n = s.length;
  if (n < 2) return 0;

  const rightCount = new Int32Array((n + 1) * 27);
  const firstPos = new Int32Array(26).fill(-1);
  const buf = new Int32Array(26);

  for (let m = n - 1; m >= 0; m--) {
    firstPos[s.charCodeAt(m) - 97] = m;
    let cnt = 0;
    for (let c = 0; c < 26; c++) {
      if (firstPos[c] !== -1) {
        buf[cnt++] = firstPos[c];
      }
    }
    for (let i = 1; i < cnt; i++) {
      const key = buf[i];
      let k = i - 1;
      while (k >= 0 && buf[k] > key) {
        buf[k + 1] = buf[k];
        k--;
      }
      buf[k + 1] = key;
    }
    const offset = m * 27;
    for (let d = 1; d <= cnt; d++) {
      const right = (d < cnt ? buf[d] : n);
      rightCount[offset + d] = right - buf[d - 1];
    }
  }

  let ans = 0;
  const lastPos = new Int32Array(26).fill(-1);

  for (let j = 0; j < n - 1; j++) {
    lastPos[s.charCodeAt(j) - 97] = j;
    let cnt = 0;
    for (let c = 0; c < 26; c++) {
      if (lastPos[c] !== -1) {
        buf[cnt++] = lastPos[c];
      }
    }
    for (let i = 1; i < cnt; i++) {
      const key = buf[i];
      let k = i - 1;
      while (k >= 0 && buf[k] < key) {
        buf[k + 1] = buf[k];
        k--;
      }
      buf[k + 1] = key;
    }
    const rightOffset = (j + 1) * 27;
    for (let d = 1; d <= cnt; d++) {
      const left = (d < cnt ? buf[d] : -1);
      const L = buf[d - 1] - left;
      ans += L * rightCount[rightOffset + d];
    }
  }

  return ans;
};

var countPairs = countMagicalPairs;
var countMagicalSubstringPairs = countMagicalPairs;
var solve = countMagicalPairs;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        const s = JSON.parse(line);
        console.log(JSON.stringify(solve(s)));
      }
    }
  } catch (err) {}
}

module.exports = solve;
