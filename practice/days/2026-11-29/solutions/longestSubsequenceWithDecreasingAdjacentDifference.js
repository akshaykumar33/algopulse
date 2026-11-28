var longestSubsequence = function(nums) {
  const M = 301;
  const best = [];
  for (let v = 0; v < M; v++) best.push(new Int32Array(M));
  const cand = new Int32Array(M);
  let ans = 1;
  for (const x of nums) {
    cand.fill(0);
    for (let v = 1; v < M; v++) {
      const d = Math.abs(x - v);
      const l = best[v][d];
      if (l && l + 1 > cand[d]) cand[d] = l + 1;
    }
    const bx = best[x];
    let run = 1;
    for (let d = M - 1; d >= 0; d--) {
      if (cand[d] > run) run = cand[d];
      if (run > bx[d]) bx[d] = run;
    }
    if (bx[0] > ans) ans = bx[0];
  }
  return ans;
};
var solve = longestSubsequence;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = longestSubsequence;
