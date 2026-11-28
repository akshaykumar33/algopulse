var canMakeSubsequence = function(s, t) {
  const n = s.length, m = t.length;
  if (n > m) return false;
  const pre = new Int32Array(n + 1).fill(m + 1);
  pre[0] = 0;
  for (let i = 0, j = 0; i < n; i++) {
    while (j < m && t[j] !== s[i]) j++;
    if (j === m) break;
    pre[i + 1] = ++j;
  }
  const suf = new Int32Array(n + 1).fill(-1);
  suf[n] = m;
  for (let i = n - 1, j = m - 1; i >= 0; i--) {
    while (j >= 0 && t[j] !== s[i]) j--;
    if (j < 0) break;
    suf[i] = j--;
  }
  for (let i = 0; i < n; i++) if (pre[i] < suf[i + 1]) return true;
  return false;
};
var solve = canMakeSubsequence;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    const res = solve(...parsed);
    console.log(JSON.stringify(res));
  }
}
module.exports = canMakeSubsequence;
