var numMovesStonesII = function(stones) {
  stones.sort((a, b) => a - b);
  const n = stones.length;

  const maxMoves = Math.max(
    stones[n - 1] - stones[1] - n + 2,
    stones[n - 2] - stones[0] - n + 2
  );

  let minMoves = n;
  let i = 0;
  for (let j = 0; j < n; j++) {
    while (stones[j] - stones[i] + 1 > n) {
      i++;
    }
    const count = j - i + 1;
    if (count === n - 1 && stones[j] - stones[i] + 1 === n - 1) {
      minMoves = Math.min(minMoves, 2);
    } else {
      minMoves = Math.min(minMoves, n - count);
    }
  }

  return [minMoves, maxMoves];
};

var movingStonesUntilConsecutiveII = numMovesStonesII;
var solve = typeof movingStonesUntilConsecutiveII !== 'undefined' ? movingStonesUntilConsecutiveII : null;

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

