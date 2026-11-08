var minMoves = function(target, maxDoubles) {
  let ans = 0;
  while (target > 1) {
    if (maxDoubles === 0) {
      ans += target - 1;
      break;
    }
    if (target % 2 === 1) {
      target--;
      ans++;
    } else {
      target = Math.floor(target / 2);
      maxDoubles--;
      ans++;
    }
  }
  return ans;
};

var solve = minMoves;
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
