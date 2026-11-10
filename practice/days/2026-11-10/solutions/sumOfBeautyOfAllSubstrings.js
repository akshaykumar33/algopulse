var beautySum = function(s) {
  const n = s.length;
  let ans = 0;
  for (let i = 0; i < n; i++) {
    const cnt = new Int32Array(26);
    for (let j = i; j < n; j++) {
      cnt[s.charCodeAt(j) - 97]++;
      let min = 100000;
      let max = 0;
      for (let k = 0; k < 26; k++) {
        const c = cnt[k];
        if (c > 0) {
          if (c < min) min = c;
          if (c > max) max = c;
        }
      }
      ans += max - min;
    }
  }
  return ans;
};

var solve = beautySum;

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
