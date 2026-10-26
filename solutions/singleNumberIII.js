var solve = function(nums) {
  let xor = 0;
  for (let x of nums) {
    xor ^= x;
  }
  let diff = xor & -xor;
  let a = 0, b = 0;
  for (let x of nums) {
    if ((x & diff) !== 0) {
      a ^= x;
    } else {
      b ^= x;
    }
  }
  return [a, b];
};

var singleNumber = solve;

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
