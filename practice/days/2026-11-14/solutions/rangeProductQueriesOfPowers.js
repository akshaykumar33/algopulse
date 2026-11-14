var productQueries = function(n, queries) {
  const powers = [];
  for (let i = 0; i < 31; i++) {
    if ((n & (1 << i)) !== 0) powers.push(1 << i);
  }

  const MOD = 1000000007n;
  const ans = new Array(queries.length);
  for (let i = 0; i < queries.length; i++) {
    const [l, r] = queries[i];
    let prod = 1n;
    for (let j = l; j <= r; j++) {
      prod = (prod * BigInt(powers[j])) % MOD;
    }
    ans[i] = Number(prod);
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      console.log(JSON.stringify(productQueries(JSON.parse(lines[i]), JSON.parse(lines[i + 1]))));
    }
  }
}

module.exports = productQueries;
