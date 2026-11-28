var maxIceCream = function(costs, coins) {
  const cnt = new Int32Array(100001);
  for (const c of costs) cnt[c]++;
  let ans = 0;
  for (let c = 1; c <= 100000 && coins >= c; c++) {
    if (!cnt[c]) continue;
    const take = Math.min(cnt[c], Math.floor(coins / c));
    ans += take;
    coins -= take * c;
  }
  return ans;
};
var solve = maxIceCream;
if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const parsed = lines.map(l => JSON.parse(l));
    console.log(JSON.stringify(solve(...parsed)));
  }
}
module.exports = maxIceCream;
