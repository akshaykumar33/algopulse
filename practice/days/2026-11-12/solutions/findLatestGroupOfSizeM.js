var findLatestStep = function(arr, m) {
  const n = arr.length;
  const len = new Int32Array(n + 2);
  let cnt = 0;
  let ans = -1;

  for (let i = 0; i < n; i++) {
    const pos = arr[i];
    const left = len[pos - 1];
    const right = len[pos + 1];
    const sum = left + right + 1;
    if (left === m) cnt--;
    if (right === m) cnt--;
    if (sum === m) cnt++;
    len[pos - left] = sum;
    len[pos + right] = sum;
    if (cnt > 0) ans = i + 1;
  }

  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const allPacked = lines.every((l) => {
      const p = JSON.parse(l);
      return Array.isArray(p) && p.length === 2 && Array.isArray(p[0]) && typeof p[1] === 'number';
    });
    if (allPacked) {
      for (const line of lines) {
        console.log(JSON.stringify(findLatestStep(...JSON.parse(line))));
      }
    } else {
      for (let i = 0; i + 1 < lines.length; i += 2) {
        const args = lines.slice(i, i + 2).map((l) => JSON.parse(l));
        console.log(JSON.stringify(findLatestStep(...args)));
      }
    }
  }
}

module.exports = findLatestStep;
