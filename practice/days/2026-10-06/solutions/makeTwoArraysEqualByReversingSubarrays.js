var solve = function(target, arr) {
    if (target.length !== arr.length) return false;
    target.sort((a, b) => a - b);
    arr.sort((a, b) => a - b);
    for (let i = 0; i < target.length; i++) {
        if (target[i] !== arr[i]) return false;
    }
    return true;
};

if (require.main === module) {
  const fs = require('fs');
  try {
    const raw = fs.readFileSync(0, 'utf-8').trim();
    if (raw) {
      const lines = raw.split(/\r?\n/).filter(Boolean);
      for (let i = 0; i < lines.length; i += 2) {
        try {
          const target = JSON.parse(lines[i]);
          const arr = JSON.parse(lines[i + 1]);
          const result = solve(target, arr);
          console.log(JSON.stringify(result));
        } catch (err) {
          console.error(err);
        }
      }
    }
  } catch (err) {
    console.error('Local runner error:', err.message);
  }
}
module.exports = solve;
