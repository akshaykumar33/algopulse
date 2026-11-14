var minStoneSum = function(piles, k) {
  const count = new Int32Array(10001);
  let total = 0;
  for (let i = 0; i < piles.length; i++) {
    count[piles[i]]++;
    total += piles[i];
  }

  let cur = 10000;
  while (k > 0 && cur > 1) {
    if (count[cur] === 0) {
      cur--;
      continue;
    }
    const take = Math.min(k, count[cur]);
    const remove = Math.floor(cur / 2);
    total -= take * remove;
    count[cur] -= take;
    count[cur - remove] += take;
    k -= take;
  }
  return total;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      console.log(JSON.stringify(minStoneSum(JSON.parse(lines[i]), JSON.parse(lines[i + 1]))));
    }
  }
}

module.exports = minStoneSum;
