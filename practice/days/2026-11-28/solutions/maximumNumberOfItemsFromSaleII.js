var maximumSaleItems = function(items, budget) {
  const n = items.length;
  const freq = new Int32Array(n + 1);
  for (const [f] of items) freq[f]++;
  const mult = new Int32Array(n + 1);
  for (let f = 1; f <= n; f++) {
    if (!freq[f]) continue;
    let c = 0;
    for (let g = f; g <= n; g += f) c += freq[g];
    mult[f] = c - 1;
  }
  let mn = Infinity;
  const arr = [];
  for (const [f, p] of items) {
    if (p < mn) mn = p;
    if (mult[f] > 0) arr.push([p, mult[f]]);
  }
  arr.sort((a, b) => a[0] - b[0]);
  let rem = budget, ans = 0;
  for (const [p, c] of arr) {
    if (p >= 2 * mn || p > rem) break;
    const take = Math.min(c, Math.floor(rem / p));
    ans += 2 * take;
    rem -= take * p;
    if (take < c) break;
  }
  return ans + Math.floor(rem / mn);
};
var solve = maximumSaleItems;
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
module.exports = maximumSaleItems;
