var prisonCellsAfterNDays = function(cells, n) {
  let cur = cells.slice();
  const seen = new Map();
  while (n > 0) {
    const key = cur.join('');
    if (seen.has(key)) {
      n %= (seen.get(key) - n);
      seen.clear();
    }
    if (n > 0) {
      seen.set(key, n);
      n--;
      const next = new Array(8).fill(0);
      for (let i = 1; i < 7; i++) {
        next[i] = cur[i - 1] === cur[i + 1] ? 1 : 0;
      }
      cur = next;
    }
  }
  return cur;
};

var solve = prisonCellsAfterNDays;

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
