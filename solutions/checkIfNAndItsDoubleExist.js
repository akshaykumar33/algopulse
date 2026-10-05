var checkIfExist = function(arr) {
    const s = new Set();
    for (const x of arr) {
        if (s.has(x * 2) || (x % 2 === 0 && s.has(x / 2))) {
            return true;
        }
        s.add(x);
    }
    return false;
};

var solve = function(arr) {
    return checkIfExist(arr);
};

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
