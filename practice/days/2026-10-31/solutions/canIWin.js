var canIWin = function(maxChoosableInteger, desiredTotal) {
    const sum = (maxChoosableInteger * (maxChoosableInteger + 1)) / 2;
    if (sum < desiredTotal) return false;
    if (desiredTotal <= 0) return true;

    const memo = new Map();

    const dfs = (mask, total) => {
        if (memo.has(mask)) return memo.get(mask);

        for (let i = 1; i <= maxChoosableInteger; i++) {
            const bit = 1 << i;
            if ((mask & bit) === 0) {
                if (total - i <= 0 || !dfs(mask | bit, total - i)) {
                    memo.set(mask, true);
                    return true;
                }
            }
        }

        memo.set(mask, false);
        return false;
    };

    return dfs(0, desiredTotal);
};
var solve = canIWin;

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    for (let i = 0; i < lines.length; i += 2) {
      const m = JSON.parse(lines[i]);
      const d = JSON.parse(lines[i + 1]);
      console.log(JSON.stringify(solve(m, d)));
    }
  }
}
module.exports = solve;
