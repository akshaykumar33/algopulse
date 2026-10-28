var asteroidCollision = function(asteroids) {
  const stack = [];

  for (let i = 0; i < asteroids.length; i++) {
    const a = asteroids[i];
    if (a > 0) {
      stack.push(a);
    } else {
      let exploded = false;
      while (stack.length > 0 && stack[stack.length - 1] > 0) {
        const top = stack[stack.length - 1];
        if (top < -a) {
          stack.pop();
        } else if (top === -a) {
          stack.pop();
          exploded = true;
          break;
        } else {
          exploded = true;
          break;
        }
      }
      if (!exploded) {
        stack.push(a);
      }
    }
  }

  return stack;
};

var solve = function(asteroids) {
  return asteroidCollision(asteroids);
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

