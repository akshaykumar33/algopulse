var maximizeSquareArea = function(m, n, hFences, vFences) {
  const hAll = [1, m, ...hFences].sort((a, b) => a - b);
  const vAll = [1, n, ...vFences].sort((a, b) => a - b);
  const hDiffs = new Set();

  for (let i = 0; i < hAll.length; i++) {
    for (let j = i + 1; j < hAll.length; j++) {
      hDiffs.add(hAll[j] - hAll[i]);
    }
  }

  let maxSide = -1;
  for (let i = 0; i < vAll.length; i++) {
    for (let j = i + 1; j < vAll.length; j++) {
      const d = vAll[j] - vAll[i];
      if (hDiffs.has(d) && d > maxSide) {
        maxSide = d;
      }
    }
  }

  if (maxSide === -1) return -1;
  const MOD = 1000000007n;
  const ans = (BigInt(maxSide) * BigInt(maxSide)) % MOD;
  return Number(ans);
};

var solve = maximizeSquareArea;

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const parsed = JSON.parse(raw);
      console.log(JSON.stringify(Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed)));
    }
  } catch (e) {}
}

module.exports = maximizeSquareArea;
