var matchsticksToSquare = function(matchsticks) {
    let sum = matchsticks.reduce((a, b) => a + b, 0);
    if (sum % 4 !== 0) return false;
    let target = sum / 4;
    matchsticks.sort((a, b) => b - a);
    if (matchsticks[0] > target) return false;
    let sides = [0, 0, 0, 0];
    
    function dfs(index) {
        if (index === matchsticks.length) {
            return sides[0] === target && sides[1] === target && sides[2] === target;
        }
        let val = matchsticks[index];
        for (let i = 0; i < 4; i++) {
            if (sides[i] + val <= target) {
                sides[i] += val;
                if (dfs(index + 1)) return true;
                sides[i] -= val;
            }
            if (sides[i] === 0) break;
        }
        return false;
    }
    
    return dfs(0);
};
var solve = typeof matchsticksToSquare !== 'undefined' ? matchsticksToSquare : null;

// ---------------- LOCAL TEST HARNESS ----------------
if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const result = Array.isArray(parsed) && solve.length > 1 ? solve(...parsed) : solve(parsed);
          console.log(JSON.stringify(result));
        } catch {
          console.log(JSON.stringify(solve(line)));
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
