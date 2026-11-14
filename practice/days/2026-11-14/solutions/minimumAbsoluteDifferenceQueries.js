var minDifference = function(nums, queries) {
  const n = nums.length;
  const pref = Array.from({ length: 101 }, () => new Int32Array(n + 1));

  for (let i = 0; i < n; i++) {
    const v = nums[i];
    for (let j = 1; j <= 100; j++) {
      pref[j][i + 1] = pref[j][i] + (j === v ? 1 : 0);
    }
  }

  const ans = new Int32Array(queries.length);
  for (let q = 0; q < queries.length; q++) {
    const [l, r] = queries[q];
    let prev = -1;
    let minDiff = 1000;

    for (let v = 1; v <= 100; v++) {
      if (pref[v][r + 1] - pref[v][l] > 0) {
        if (prev !== -1 && v - prev < minDiff) {
          minDiff = v - prev;
        }
        prev = v;
      }
    }
    ans[q] = minDiff === 1000 ? -1 : minDiff;
  }
  return Array.from(ans);
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      console.log(JSON.stringify(minDifference(JSON.parse(lines[i]), JSON.parse(lines[i + 1]))));
    }
  }
}

module.exports = minDifference;
