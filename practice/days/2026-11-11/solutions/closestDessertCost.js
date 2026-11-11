var closestCost = function(baseCosts, toppingCosts, target) {
  let best = baseCosts[0];
  const m = toppingCosts.length;

  const dfs = (idx, cur) => {
    const diffCur = Math.abs(cur - target);
    const diffBest = Math.abs(best - target);
    if (diffCur < diffBest || (diffCur === diffBest && cur < best)) {
      best = cur;
    }
    if (cur >= target || idx === m) return;
    const cost = toppingCosts[idx];
    dfs(idx + 1, cur);
    dfs(idx + 1, cur + cost);
    dfs(idx + 1, cur + cost * 2);
  };

  for (let i = 0; i < baseCosts.length; i++) {
    dfs(0, baseCosts[i]);
  }
  return best;
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const arity = closestCost.length;
    const allPacked = lines.every((l) => {
      const p = JSON.parse(l);
      return Array.isArray(p) && p.length === arity;
    });
    if (allPacked) {
      for (const line of lines) {
        console.log(JSON.stringify(closestCost(...JSON.parse(line))));
      }
    } else {
      for (let i = 0; i + arity - 1 < lines.length; i += arity) {
        const args = lines.slice(i, i + arity).map((l) => JSON.parse(l));
        console.log(JSON.stringify(closestCost(...args)));
      }
    }
  }
}
