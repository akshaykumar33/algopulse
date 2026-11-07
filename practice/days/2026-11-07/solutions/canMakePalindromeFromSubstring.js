var canMakePaliQueries = function(s, queries) {
  const n = s.length;
  const pref = new Int32Array(n + 1);
  for (let i = 0; i < n; i++) {
    pref[i + 1] = pref[i] ^ (1 << (s.charCodeAt(i) - 97));
  }
  const ans = new Array(queries.length);
  for (let q = 0; q < queries.length; q++) {
    const [l, r, k] = queries[q];
    const mask = pref[r + 1] ^ pref[l];
    let odd = 0;
    let temp = mask;
    while (temp > 0) {
      odd += temp & 1;
      temp >>= 1;
    }
    ans[q] = Math.floor(odd / 2) <= k;
  }
  return ans;
};

var solve = typeof canMakePaliQueries !== 'undefined' ? canMakePaliQueries : null;

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
module.exports = { canMakePaliQueries, solve };
