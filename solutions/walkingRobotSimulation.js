var robotSim = function(commands, obstacles) {
  const obs = new Set();
  for (let i = 0; i < obstacles.length; i++) {
    obs.add(`${obstacles[i][0]},${obstacles[i][1]}`);
  }

  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];
  let d = 0;
  let x = 0, y = 0;
  let maxDist = 0;

  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    if (cmd === -1) {
      d = (d + 1) % 4;
    } else if (cmd === -2) {
      d = (d + 3) % 4;
    } else {
      for (let step = 0; step < cmd; step++) {
        const nx = x + dx[d];
        const ny = y + dy[d];
        if (obs.has(`${nx},${ny}`)) break;
        x = nx;
        y = ny;
        const dist = x * x + y * y;
        if (dist > maxDist) maxDist = dist;
      }
    }
  }

  return maxDist;
};

var solve = function(commands, obstacles) {
  return robotSim(commands, obstacles);
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

