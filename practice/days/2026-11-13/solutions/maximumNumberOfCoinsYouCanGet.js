var maxCoins = function(piles) {
  piles.sort((a, b) => a - b);
  const n = piles.length / 3;
  let ans = 0;
  for (let i = piles.length - 2; i >= n; i -= 2) {
    ans += piles[i];
  }
  return ans;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      console.log(JSON.stringify(maxCoins(JSON.parse(line))));
    }
  }
}

module.exports = maxCoins;
