var reconstructMatrix = function(upper, lower, colsum) {
  const n = colsum.length;
  const row0 = new Int8Array(n);
  const row1 = new Int8Array(n);
  for (let j = 0; j < n; j++) {
    if (colsum[j] === 2) {
      row0[j] = 1;
      row1[j] = 1;
      upper--;
      lower--;
    }
  }
  if (upper < 0 || lower < 0) return [];
  for (let j = 0; j < n; j++) {
    if (colsum[j] === 1) {
      if (upper > 0) {
        row0[j] = 1;
        upper--;
      } else if (lower > 0) {
        row1[j] = 1;
        lower--;
      } else {
        return [];
      }
    }
  }
  if (upper !== 0 || lower !== 0) return [];
  return [Array.from(row0), Array.from(row1)];
};

var solve = reconstructMatrix;
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
