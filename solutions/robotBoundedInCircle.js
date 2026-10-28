var isRobotBounded = function(instructions) {
  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];
  let d = 0;
  let x = 0, y = 0;

  for (let i = 0; i < instructions.length; i++) {
    const ch = instructions[i];
    if (ch === 'G') {
      x += dx[d];
      y += dy[d];
    } else if (ch === 'L') {
      d = (d + 3) % 4;
    } else if (ch === 'R') {
      d = (d + 1) % 4;
    }
  }

  return (x === 0 && y === 0) || d !== 0;
};

var solve = function(instructions) {
  return isRobotBounded(instructions);
};

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

