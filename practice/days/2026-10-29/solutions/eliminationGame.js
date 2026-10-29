var lastRemaining = function(n) {
  let head = 1;
  let step = 1;
  let left = true;
  let rem = n;

  while (rem > 1) {
    if (left || (rem & 1) === 1) {
      head += step;
    }
    rem = Math.floor(rem / 2);
    step *= 2;
    left = !left;
  }
  return head;
};

var solve = typeof lastRemaining !== 'undefined' ? lastRemaining : null;

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
