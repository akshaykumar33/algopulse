var stoneGameIX = function(stones) {
  let c0 = 0, c1 = 0, c2 = 0;
  for (let i = 0; i < stones.length; i++) {
    const r = stones[i] % 3;
    if (r === 0) c0++;
    else if (r === 1) c1++;
    else c2++;
  }
  if (c0 % 2 === 0) {
    return c1 >= 1 && c2 >= 1;
  }
  return Math.abs(c1 - c2) > 2;
};

var solve = stoneGameIX;

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
  } catch (err) {}
}
module.exports = solve;
